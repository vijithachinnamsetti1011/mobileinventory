import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { SqLiteService } from './services/sq-lite-service';
import { NetworkToastComponent } from "./common-components/network-toast/network-toast.component";
import { Network } from './services/network';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, NetworkToastComponent, CommonModule],
})
export class AppComponent implements OnInit{
  toastMessage: string = '';
  toastType: 'online' | 'offline' = 'online';

  constructor(private sql: SqLiteService, private network: Network) {}
  ngOnInit() {
    this.sql.ConnectToDatabase();
    this.networkConnection();
  }
  networkConnection(){
    this.network.status$.subscribe(isOnline => {
      if (isOnline) {
        this.showToast('✅ You are online. Data synced!', 'online');
      } else {
        this.showToast('❌ You are offline!', 'offline');
      }
    });
  }

  showToast(message: string, type: 'online' | 'offline') {
    this.toastMessage = message;
    this.toastType = type;
    setTimeout(() => this.toastMessage = '', 3000);
  } 
}
