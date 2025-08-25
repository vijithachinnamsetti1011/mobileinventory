import { Component, EnvironmentProviders, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonNav, IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton, IonIcon, IonRow, IonCol } from '@ionic/angular/standalone';
import { ToastService } from 'src/app/services/toast-service';
import { addIcons } from 'ionicons';
import { lockClosed, people, peopleCircle } from 'ionicons/icons'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SqLiteService } from 'src/app/services/sq-lite-service';
import { Data, Metadata } from 'src/app/interfaces/login-details';
import { Preferences } from '@capacitor/preferences';
import { NavController } from '@ionic/angular'
import { Subscription } from 'rxjs';


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

  constructor(
    private fb: FormBuilder,
    private toast: ToastService,
    private http: HttpClient,
    private sql: SqLiteService,
    private nav: NavController
  ) {
    this.loginForm = this.fb.group({
      username: ['Manideep j', Validators.required],
      password: ['Propel@123', Validators.required]
    })
    addIcons({ peopleCircle, lockClosed });
  }
  ngOnInit() {
  }
  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.toast.presentToast("top", "danger", "Please fill the details!")
    }
    this.subscription = this.http.post(environment.baseURL, this.loginForm.value).subscribe({
      next: async (res: any) => {
        console.log('Login Response:', res);
        const metadata = res.metadata;
        const data = res.data.filter((e: { DEFAULT_ORG_ID: string; }) => e.DEFAULT_ORG_ID !== '');
        console.log(">>>metadata", metadata);
        console.log(">>>data", data);

        this.sql.createTableFromMetadata('LoginData', metadata);
        this.sql.insertData('LoginData', data);
        const orgId = data[0]?.DEFAULT_ORG_ID;
        console.log("orgid", orgId);

        if (orgId) {
          this.nav.navigateForward(['/organization', orgId]);
        } else {
          this.toast.presentToast("top", "warning", "Organization not found!");
        }
        await Preferences.set({
          key: 'login_metadata',
          value: JSON.stringify(metadata)
        })
        await Preferences.set({
          key: 'login_data',
          value: JSON.stringify(data)
        })

        this.toast.presentToast('top', 'success', 'Login successful!');
      },
      error: err => {
        console.error("Login error:", err);
        this.toast.presentToast("top", "danger", "Login failed!");
      }
    })
  }
  ngOnDestroy() {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }  
}
