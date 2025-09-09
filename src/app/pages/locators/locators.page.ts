import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonButtons } from '@ionic/angular/standalone';
import { SqLiteService } from 'src/app/services/sq-lite-service';
import { BackButtonComponent } from 'src/app/common-components/back-button/back-button.component';
import { ModalController } from '@ionic/angular'

@Component({
  selector: 'app-locators',
  templateUrl: './locators.page.html',
  styleUrls: ['./locators.page.scss'],
  standalone: true,
  imports: [IonButtons, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, BackButtonComponent]
})
export class LocatorsPage implements OnInit {

  locatorsList : any[] = []
  @Input() subinv!: string;

  constructor(private sql : SqLiteService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.getLocatorsList();
  }

  async getLocatorsList(){
    this.locatorsList = await this.sql.locatorsList('locators', this.subinv)
    console.log("allLocatorsList:", this.locatorsList);
  }

  select(loc: string) {
    this.modalCtrl.dismiss({ loc });
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
