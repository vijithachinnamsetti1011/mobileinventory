import { Component, EnvironmentProviders, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton, IonIcon, IonRow, IonCol } from '@ionic/angular/standalone';
import { ToastService } from 'src/app/services/toast-service';
import { addIcons } from 'ionicons';
import { lockClosed, people, peopleCircle } from 'ionicons/icons'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SqLiteService } from 'src/app/services/sq-lite-service';
import { Data, Metadata } from 'src/app/interfaces/login-details';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
  standalone: true,
  imports: [IonRow, IonCol, IonIcon, IonList, CommonModule, FormsModule, ReactiveFormsModule, IonItem, IonInput, IonButton, IonContent, IonCol]
})
export class LoginPagePage implements OnInit {
  loginForm: FormGroup ;

  constructor(
    private fb: FormBuilder,
    private toast: ToastService,
    private http : HttpClient,
    private sql: SqLiteService
  ) {
    this.loginForm = this.fb.group({
      username:['Manideep j', Validators.required],
      password:['Propel@123', Validators.required]
    })
    addIcons({peopleCircle, lockClosed});
   }
  ngOnInit() {
  }
  login(){
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      this.toast.presentToast("top", "danger", "Please fill the details!")
    }
    this.http.post(environment.baseURL, this.loginForm.value).subscribe({
    next: async (res: any) => {
      console.log('Login Response:', res);
      const metadata = res.metadata;
      const data = res.data;
      this.toast.presentToast('top', 'success', 'Login successful!');
    },
  })
  }
}
