import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonToolbar, IonItem, IonLabel, IonList, IonCard, IonIcon, IonInput, IonSearchbar, IonButton, IonTitle } from '@ionic/angular/standalone';
import { TileHeaderComponent } from 'src/app/common-components/tile-header/tile-header.component';
import { addIcons } from 'ionicons';
import { filterOutline, searchOutline } from 'ionicons/icons';
import { SqLiteService } from 'src/app/services/sq-lite-service';
import { NavController } from '@ionic/angular'

@Component({
  selector: 'app-goods-receipt',
  templateUrl: './Item-list.page.html',
  styleUrls: ['./Item-list.page.scss'],
  standalone: true,
  imports: [TileHeaderComponent, IonIcon, IonCard, IonList, IonLabel, IonItem, IonContent, IonToolbar, CommonModule, FormsModule]
})
export class ItemListPage implements OnInit {
  allPoHeaders: any[] = [];
  filteredPoHeaders: any[] = [];

  constructor(private sql: SqLiteService, private nav: NavController) {
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

  async handleSearch(searchTerm: string | null | undefined) {
  if (!searchTerm || !searchTerm.trim()) {
    this.filteredPoHeaders = await this.sql.groupByData('documentsforreceiving');
    return;
  }
  this.filteredPoHeaders = await this.sql.searchGroupByPoNumber('documentsforreceiving', searchTerm);
}


  getOrderDetails(poNumber: string) {
    this.nav.navigateForward(['order-details', poNumber])
  }

}
