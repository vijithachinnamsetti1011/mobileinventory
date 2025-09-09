import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonButtons } from '@ionic/angular/standalone';
import { SqLiteService } from 'src/app/services/sq-lite-service';
import { BackButtonComponent } from "src/app/common-components/back-button/back-button.component";
import { ModalController } from '@ionic/angular'

@Component({
  selector: 'app-sub-inventory',
  templateUrl: './sub-inventory.page.html',
  styleUrls: ['./sub-inventory.page.scss'],
  standalone: true,
  imports: [IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, BackButtonComponent]
})
export class SubInventoryPage implements OnInit {

  subInventory: any[] = []
  constructor(private sql : SqLiteService, private modalCtrl: ModalController) { }
  ngOnInit() {
    this.getSubInventory();
  }

  async getSubInventory(){
    this.subInventory = await this.sql.getAllSubInventoryAndLocators('subinventories')
    console.log("allSuninventories:", this.subInventory)
  }

  select(subinv: string) {
    this.modalCtrl.dismiss({ subinv });
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
