import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LIST_OF_APIS, API_STATUS } from 'src/app/constants/constants'; // Import master list
import { Iapiresponse } from 'src/app/interfaces/i-apilist';
import { ApiService } from 'src/app/services/api-service';
import { ToastService } from 'src/app/services/toast-service';
import { addIcons } from 'ionicons';
import { checkmarkCircle, closeCircle, refresh } from 'ionicons/icons';
import { IonHeader, IonList, IonIcon, IonItem, IonLabel, IonSpinner, IonToolbar, IonTitle, IonContent, IonButton, IonCard } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activity-page',
  templateUrl: './activity-page.page.html',
  styleUrls: ['./activity-page.page.scss'],
  imports: [IonCard, IonButton, IonContent, IonTitle, IonToolbar, IonLabel, IonList, IonItem, IonIcon, IonHeader, CommonModule],
})
export class ActivityPage implements OnInit {

  apiState:any[]=[];
  isLoading = false;
  hasFailedApis = false;
  apisToRun = LIST_OF_APIS;
  
  constructor(
    private apiService: ApiService,
    private nav: NavController,
    private toast: ToastService
  ) {
    this.apiService.apiCallStates$.subscribe({
      next:(res)=>{
        this.apiState=res;
        console.log(">>>apist", this.apiState);
      }
    })
    addIcons({ checkmarkCircle, closeCircle, refresh });
  }

  ngOnInit() {
    this.apiState.filter(states=>{
       this.hasFailedApis = states.some((s: { api_status: API_STATUS; })  => s.api_status !== API_STATUS.SUCCESS);
    })
  }

  ionViewDidEnter() {
    if (this.apiService.getCurrentApiStates().length === 0) {
      this.startInitialSync();
    }
  }

  async startInitialSync() {
    this.isLoading = true;
    const results = await this.apiService.TrackApis(this.apisToRun);
    this.isLoading = false;
    this.checkSyncStatusAndNavigate(results);
  }

  async reSync() {
    this.isLoading = true;
    const results = await this.apiService.retryFailedApis();
    this.isLoading = false;
    this.checkSyncStatusAndNavigate(results);
  }

  private checkSyncStatusAndNavigate(results: Iapiresponse[]) {
    const failedCount = results.filter(r => r.api_status !== API_STATUS.SUCCESS).length;
    if (failedCount === 0) {
      this.toast.presentToast('top', 'success', 'All data synced successfully!');
      setTimeout(() => {
        this.nav.navigateForward(['dashboard']);
      }, 5000);
    } else {
      this.toast.presentToast('top', 'danger', `${failedCount} sync task(s) failed. Please retry.`);
    }
  }
}