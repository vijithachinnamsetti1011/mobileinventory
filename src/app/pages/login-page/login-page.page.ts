import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton, IonIcon, IonRow, IonCol } from '@ionic/angular/standalone';
import { ToastService } from 'src/app/services/toast-service';
import { addIcons } from 'ionicons';
import { lockClosed, peopleCircle } from 'ionicons/icons'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SqLiteService } from 'src/app/services/sq-lite-service';
import { NavController } from '@ionic/angular'
import { Subscription } from 'rxjs';
import { LIST_OF_APIS } from 'src/app/constants/constants';
import { LoginResponse, Data } from 'src/app/interfaces/i-login-details';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
  standalone: true,
  imports: [IonRow, IonCol, IonIcon, IonList, CommonModule, FormsModule, ReactiveFormsModule, IonItem, IonInput, IonButton, IonContent, IonCol]
})
export class LoginPagePage implements OnInit, OnDestroy {
  loginForm: FormGroup;
  subscription!: Subscription;
  apisBasedOnResponsibility: any[] = []; 

allApiNames = {
  goodReceipt: [
    'getItems',
    'getSubinventories',
    'getLocatorsTable',
    'getGLPeriods',
    'getInventoryPeriods',
    'getLotsTableType',
    'getDocumentsForReceiving'
  ],

};

  constructor(
    private fb: FormBuilder,
    private toast: ToastService,
    private http: HttpClient,
    private sql: SqLiteService,
    private nav: NavController,
    private loadingCtrl: LoadingController
  ) {
    this.loginForm = this.fb.group({
      username: ['Manideep j', Validators.required],
      password: ['Propel@123', Validators.required]
    })
    addIcons({ peopleCircle, lockClosed });
  }

  ngOnInit() {
    const stored = localStorage.getItem("Responsibilities");
    if (stored) {
      const responsibilities: string[] = JSON.parse(stored);
      this.getListOfApisBasedOnResponsibility(responsibilities);
    }
  }
  

  async login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.toast.presentToast("top", "danger", "Please fill the details!")
      return;
    }

    const loading = await this.loadingCtrl.create({
    message: 'Logging in...',
    spinner: 'crescent',
    cssClass: 'custom-loading'  
  });
  await loading.present();
    this.subscription = this.http.post<LoginResponse>(environment.baseURL, this.loginForm.value).subscribe({ 
      next: async (res: LoginResponse) => {
        console.log('Login Response:', res);
        const metadata = res.metadata;
        const data = res.data.filter((e: Data) => e.DEFAULT_ORG_ID !== '');
        const org_id = res.data.find((e: Data) => e.DEFAULT_ORG_ID !== '');
        if (org_id) {
          localStorage.setItem('org_Id', org_id.DEFAULT_ORG_ID);
          console.log(">>>org_id", org_id.DEFAULT_ORG_ID);

          localStorage.setItem('res_Id', org_id.RESPONSIBILITY_ID);
          localStorage.setItem('user_Id', org_id.USER_ID);
          localStorage.setItem('person_Id', org_id.PERSON_ID);
        } else {
          console.warn("No default organization ID was found in the user data.");
        }

        const responsibilities = [...new Set(data.map((e: Data) => e.RESPONSIBILITY))];
        console.log(">>> Responsibilities:", responsibilities);
        localStorage.setItem("Responsibilities", JSON.stringify(responsibilities));

        this.getListOfApisBasedOnResponsibility(responsibilities);

        await this.sql.createTableFromMetadata('LoginData', metadata);
        await this.sql.insertData('LoginData', data);
        const orgId = data[0]?.DEFAULT_ORG_ID;
        console.log("orgid", orgId);

        // organization creation
        this.http.get<any>(`${environment.organizationURL}${orgId}`).subscribe({
          next: async (res) => {
            console.log('API Response:', res);
            await this.sql.createAndInsertOrganization('Organization', res);
          },
          error: async (err) => {
            console.error('API Error:', err);
          }
        });
        if (orgId) {
          this.nav.navigateForward(['/organization', orgId]);
          await loading.dismiss();
        } else {
          await loading.dismiss();
          this.toast.presentToast("top", "warning", "Organization not found!");
        }
        this.toast.presentToast('top', 'success', 'Login successful!');
      },
      error: async err => {
        console.error("Login error:", err);
        this.toast.presentToast("top", "danger", "Login failed!");
      }
    })
  }

  getListOfApisBasedOnResponsibility(responsibilities: string[]) {
    this.apisBasedOnResponsibility = LIST_OF_APIS.filter(api =>
      this.allApiNames.goodReceipt.includes(api.apiname));
    console.log("Filtered APIs based on responsibilities:", this.apisBasedOnResponsibility);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}