import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonToolbar, IonItem, IonLabel, IonList, IonCard, IonIcon, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { TileHeaderComponent } from 'src/app/common-components/tile-header/tile-header.component';
import { addIcons } from 'ionicons';
import { filterOutline, searchOutline } from 'ionicons/icons';
import { SqLiteService } from 'src/app/services/sq-lite-service';
import { NavController } from '@ionic/angular'
import { ToastService } from 'src/app/services/toast-service';
import { DeltaSync } from 'src/app/services/delta-sync';
import { ScanSearchComponent } from "src/app/common-components/scan-search/scan-search.component";
import { API_CODES, InventoryOrgId } from 'src/app/constants/constants';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-goods-receipt',
  templateUrl: './Item-list.page.html',
  styleUrls: ['./Item-list.page.scss'],
  standalone: true,
  imports: [IonRefresherContent, IonRefresher, TileHeaderComponent, IonIcon, IonCard, IonList, IonLabel, IonItem, IonContent, IonToolbar, CommonModule, FormsModule]
})
export class ItemListPage implements OnInit {
  allPoHeaders: any[] = [];
  filteredPoHeaders: any[] = [];
  isFilteredByLatest = false;


  @Output() scan = new EventEmitter<string>();
  @Output() search = new EventEmitter<string>();


  constructor(private sql: SqLiteService, private nav: NavController, private toast: ToastService, private delsyn: DeltaSync) {
    addIcons({ searchOutline, filterOutline });
  }

  ngOnInit() {
    this.callsqlqury();
  }

  trackByPoNumber(index: number, item: any): string {
    return item.PoNumber;
  }

  async callsqlqury() {
    this.allPoHeaders = await this.sql.groupByData('documentsforreceiving');
    this.filteredPoHeaders = [...this.allPoHeaders];
  }

  async handleSearch(searchTerm: string) {
    if (!searchTerm || !searchTerm.trim()) {
      this.filteredPoHeaders = await this.sql.groupByData('documentsforreceiving');
      return;
    }
    this.filteredPoHeaders = await this.sql.searchGroupByPoNumber('documentsforreceiving', searchTerm);
  }

  async handleScan(poNumber: string) {
    console.log("Scanned Doc#: ", poNumber);

    const found = this.allPoHeaders.find(doc => doc.PoNumber == poNumber);

    if (found) {
      this.getOrderDetails(poNumber);
      this.toast.presentToast('top', 'success', 'Ponumber found');
    } else {
      this.toast.presentToast('top', 'danger', 'No ponumber found!');
    }
  }

  async toggleLatestDateFilter() {
    try {
      if (!this.isFilteredByLatest) {
        this.allPoHeaders = await this.sql.getLatestPoHeaders('documentsforreceiving');
        this.filteredPoHeaders = [...this.allPoHeaders];
        this.toast.presentToast('top', 'success', 'Filtered by latest date');
      } else {
        this.allPoHeaders = await this.sql.groupByData('documentsforreceiving');
        this.filteredPoHeaders = [...this.allPoHeaders];
        this.toast.presentToast('top', 'success', 'Showing all records');
      }

      this.isFilteredByLatest = !this.isFilteredByLatest;
    } catch (err) {
      console.error('Toggle filter failed:', err);
      this.toast.presentToast('top', 'danger', 'Action failed');
    }
  }


  async doRefresh(event: any) {
    try {
      const lastSyncDate = localStorage.getItem('LastSyncDate') || '1970-01-01';
      const url = `${environment.commonurl}${API_CODES._20D}/getDocumentsForReceiving/${InventoryOrgId}/${lastSyncDate}/Y`;
      await this.delsyn.syncTable(url, 'documentsforreceiving');
      await this.callsqlqury();
      localStorage.setItem('LastSyncDate', new Date().toISOString());
      this.toast.presentToast('top', 'success', 'Docs synced successfully');
    } catch (err) {
      console.error('Delta sync failed:', err);
      this.toast.presentToast('top', 'danger', 'Sync failed');
    } finally {
      event.target.complete();
    }
  }


  getOrderDetails(poNumber: string) {
    this.nav.navigateForward(['order-details', poNumber])
  }

}
