import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IonToolbar, IonHeader, IonButtons, IonBackButton, IonTitle, IonSearchbar, IonItem, IonInput, IonLabel, IonButton, IonIcon, IonNavLink } from "@ionic/angular/standalone";
import { BackButtonComponent } from '../back-button/back-button.component';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { scan, searchOutline } from 'ionicons/icons';
import { Scanner } from 'src/app/services/scanner';
import { ToastService } from 'src/app/services/toast-service';
import { ScanSearchComponent } from "../scan-search/scan-search.component";

@Component({
  selector: 'app-tile-header',
  templateUrl: './tile-header.component.html',
  styleUrls: ['./tile-header.component.scss'],
  standalone: true,
  imports: [IonTitle, IonButtons, IonHeader, IonToolbar, BackButtonComponent, CommonModule, ScanSearchComponent]
})
export class TileHeaderComponent {
  @Input() pageTitle: string = 'Page';
  @Input() showBackButton: boolean = true;
  @Output() scan = new EventEmitter<string>();
  @Output() search = new EventEmitter<string>();


  constructor(private barcode: Scanner, private toast: ToastService) {
    addIcons({ searchOutline, scan });
  }

  onScan(data: string) {
    console.log('Scanned Data:', data);
    this.toast.presentToast('top', 'success', `Scanned: ${data}`);
  }

  onSearch(query: string) {
    console.log('Search Query:', query);
  }

}
