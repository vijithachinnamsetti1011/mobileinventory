import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonCol, IonGrid, IonRow, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonCard, IonMenu, IonList, IonItem, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { SqLiteService } from 'src/app/services/sq-lite-service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.page.html',
  styleUrls: ['./dashboard-page.page.scss'],
  standalone: true,
  imports: [ IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonRow, IonGrid, IonCol, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton, IonMenu]
})
export class DashboardPagePage implements OnInit {

  organizationcode = localStorage.getItem('InventoryOrgCode')

  constructor(private sql: SqLiteService, private nav: NavController) { }

  ngOnInit() {
  }
  goToGoodsReceipt() {
    this.nav.navigateForward(['Item-list']);
  }
  
}
