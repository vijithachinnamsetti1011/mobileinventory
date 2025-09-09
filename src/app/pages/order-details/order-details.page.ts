import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonList, IonItem, IonLabel, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { SqLiteService } from 'src/app/services/sq-lite-service';
import { BackButtonComponent } from 'src/app/common-components/back-button/back-button.component';
import { NavController } from '@ionic/angular'
import { addIcons } from 'ionicons';
import { chevronForwardSharp } from 'ionicons/icons';
import { SearchBarComponent } from 'src/app/common-components/search-bar/search-bar.component';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButtons, IonLabel, IonItem, IonList, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, BackButtonComponent, SearchBarComponent]
})
export class OrderDetailsPage implements OnInit {

  poNumber!: string;
  items?: any[] = [];
  headerdata: any = null;

  constructor(private route: ActivatedRoute, private sql: SqLiteService, private nav: NavController) {
    addIcons({ chevronForwardSharp});
  }

  ngOnInit() {
    this.poNumber = this.route.snapshot.paramMap.get('poNumber') || '';
    console.log("ponumber", this.poNumber);
    this.loadOrderDetails();

  }

  async loadOrderDetails() {
    this.headerdata = await this.sql.getPoHeaderByNumber('documentsforreceiving', this.poNumber);
    this.items = await this.sql.getItemsByPoNumber('documentsforreceiving', this.poNumber);
    console.log("Order details:", this.items);
    console.log("Order header:", this.headerdata);
  }

  navigateToDetails(item: any) {
  this.nav.navigateForward(['receive-order'], {
    state: {
      data: {
        poNumber: item.PoNumber,
        itemNumber: item.ItemNumber,
        description: item.ItemDesc,
        deliveryDate: item.NeedByDate,
        shipmentLineNum: item.ShipmentLineNum,
        qtyOrdered: item.QtyOrdered,
        itemUom: item.ItemUom,
        RoutingName: item.RoutingName
      }
    }
  });
}

}
