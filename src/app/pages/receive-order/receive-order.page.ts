import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonCardTitle, IonCardContent, IonCard, IonCardHeader, IonCardSubtitle, IonLabel, IonItem, IonNote, IonGrid, IonRow, IonCol, IonButton, IonInput, IonIcon } from '@ionic/angular/standalone';
import { BackButtonComponent } from 'src/app/common-components/back-button/back-button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SqLiteService } from 'src/app/services/sq-lite-service';
import { NavController, ModalController } from '@ionic/angular'
import { SubInventoryPage } from '../sub-inventory/sub-inventory.page';
import { LocatorsPage } from '../locators/locators.page';
import { InventoryOrgId, OrganizationID, Person_Id, Responsibility_Id, User_Id, URLS } from 'src/app/constants/constants';
import { addIcons } from 'ionicons';
import { chevronForwardSharp, create } from 'ionicons/icons';
import { register } from 'swiper/element/bundle';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
register();



@Component({
  selector: 'app-receive-order',
  templateUrl: './receive-order.page.html',
  styleUrls: ['./receive-order.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ModalController],
  imports: [ IonIcon, IonInput, FormsModule, ReactiveFormsModule, IonItem, IonLabel, IonCardSubtitle, IonCardHeader, IonCard, IonCardContent, IonCardTitle, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, BackButtonComponent, IonButton]
})
export class ReceiveOrderPage implements OnInit, OnDestroy {

  itemNumber!: string;
  subinventorycode!: string;
  locator: string = '';
  currentIndex = 0;
  poNumber!: string;
  items: any = [];
  itemdetails: FormGroup;
  subscription!: Subscription;

  constructor(private http : HttpClient,private route: ActivatedRoute, private sql: SqLiteService, private router: Router, private fb: FormBuilder, private nav: NavController, private modalCtrl: ModalController) {
    this.itemdetails = this.fb.group({
      coo: ['', Validators.required],
      subinv: ['', Validators.required],
      loc: ['', Validators.required],
      qty: ['', Validators.required]
    }),
    addIcons({chevronForwardSharp, create})
  }

  ngOnInit() {
    this.callparams();
  }
  async callparams() {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state?.['data']) {
      const data = nav.extras.state['data'];
      this.itemNumber = data.itemNumber;
      this.poNumber = data.poNumber;
      this.items = await this.sql.receiveOrderData('documentsforreceiving', this.itemNumber, this.poNumber);
      console.log('Fetched items:', this.items);
    }
  }

  onSlideChange(event: any) {
    this.currentIndex = event.detail[0].activeIndex ?? 0;
    console.log('Current index:', this.currentIndex);
  }

  async openSubInventory() {
    const modal = await this.modalCtrl.create({
      component: SubInventoryPage
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.subinventorycode = data.subinv;
      console.log("subinventory", this.subinventorycode);

      this.itemdetails.patchValue({
        subinv: this.subinventorycode
      })
    }
  }

  async openLocators() {
    const selectedSubinv = this.itemdetails.get('subinv')?.value;
    if (!selectedSubinv) {
      alert("Please select SubInventory first");
      return;
    }

    const modal = await this.modalCtrl.create({
      component: LocatorsPage,
      componentProps: { subinv: selectedSubinv }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.locator = data.loc;
      console.log("loc", this.locator);

      this.itemdetails.patchValue({
        loc: this.locator
      })
    }
  }

  Receive() {
    const formData = this.itemdetails.value;
    console.log("Form Data:", formData);
  }

  Reset(){
    const resetForm = this.itemdetails.reset;
  }

  submitGoodsReceipt() {
    const payload = this.createPayLoad();
    this.subscription = this.http.post<any>(URLS.POST_TRANSACTION,payload).subscribe({
      next: async (res) => {
        console.log('Goods Receipt created successfully:', res);
      },
      error: async (err) => {
        console.error('Error creating Goods Receipt:', err);
      }
    });
  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  dateFormat(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

  }

  createPayLoad() {
    const mobileId = Date.now()
    const CurrentDate = this.dateFormat(new Date())
    const PayLoad = {
      "Input": {
        "parts": [
          {
            "id": "part1",
            "path": "/receivingReceiptRequests",
            "operation": "create",
            "payload": {
              "ReceiptSourceCode": "",
              "OrganizationCode": "",
              "EmployeeId": Person_Id,
              "BusinessUnitId": OrganizationID,
              "ReceiptNumber": "",
              "BillOfLading": "",
              "FreightCarrierName": "",
              "PackingSlip": "",
              "WaybillAirbillNumber": "",
              "ShipmentNumber": "",
              "ShippedDate": "",
              "VendorSiteId": "",
              "VendorId": 41178,
              "attachments": [],
              "CustomerId": "",
              "InventoryOrgId": InventoryOrgId,
              "DeliveryDate": this.items.DeliveryDate,
              "ResponsibilityId": Responsibility_Id,
              "UserId": User_Id,
              "DummyReceiptNumber": mobileId,
              "BusinessUnit": "Vision Operations",
              "InsertAndProcessFlag": "true",
              "lines": [
                {
                  "ReceiptSourceCode": "",
                  "MobileTransactionId": mobileId,
                  "TransactionType": "RECEIVE",
                  "AutoTransactCode": "DELIVER",
                  "OrganizationCode": "",
                  "DocumentNumber": this.items.PoNumber,
                  "DocumentLineNumber": this.items.index,
                  "ItemNumber": this.items.ItemNumber,
                  "TransactionDate": CurrentDate,
                  "Quantity": this.itemdetails.get('qty')?.value,
                  "UnitOfMeasure": this.items.ItemUom,
                  "SoldtoLegalEntity": "",
                  "SecondaryUnitOfMeasure": "",
                  "ShipmentHeaderId": "",
                  "ItemRevision": "",
                  "POHeaderId": this.items.POHeaderId,
                  "POLineLocationId": this.items.POLineLocationId,
                  "POLineId": this.items.POLineId,
                  "PODistributionId": this.items.PODistributionId,
                  "ReasonName": "",
                  "Comments": "",
                  "ShipmentLineId": "",
                  "transactionAttachments": [],
                  "lotItemLots": [
                    // {
                    //   "TransactionQuantity": "",
                    //   "LotNumber": "",
                    //   "ParentLotNumber": "",
                    //   "GradeCode": "",
                    //   "SecondaryTransactionQuantity": "",
                    //   "LotExpirationDate": CurrentDate
                    // }
                  ],
                  "serialItemSerials": [],
                  "lotSerialItemLots": [],
                  "ExternalSystemTransactionReference": "Mobile Transaction",
                  "ReceiptAdviceHeaderId": "",
                  "ReceiptAdviceLineId": "",
                  "TransferOrderHeaderId": "",
                  "TransferOrderLineId": "",
                  "PoLineLocationId": this.items.PoLineLocationId,
                  "DestinationTypeCode": "Inventory",
                  "Subinventory": this.itemdetails.get('subinv')?.value,
                  "Locator": this.itemdetails.get('loc')?.value,
                  "ShipmentNumber": "",
                  "LpnNumber": "",
                  "OrderLineId": ""
                }
              ]
            }
          }
        ]
      }
    }
    return PayLoad;
  }
}

