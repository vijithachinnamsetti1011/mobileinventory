import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonToolbar, IonHeader, IonButtons, IonBackButton, IonTitle, IonSearchbar, IonItem, IonInput, IonLabel, IonButton, IonIcon, IonNavLink } from "@ionic/angular/standalone";
import { BackButtonComponent } from '../back-button/back-button.component';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tile-header',
  templateUrl: './tile-header.component.html',
  styleUrls: ['./tile-header.component.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonLabel, IonInput, IonItem, IonTitle, IonButtons, IonHeader, IonToolbar, BackButtonComponent, SearchBarComponent, CommonModule]
})
export class TileHeaderComponent {

  @Input() pageTitle: string = 'Page';
  @Input() showBackButton: boolean = true;
  @Output() scan = new EventEmitter<string>();
  @Output() search = new EventEmitter<string>();

  isSearchVisible = false;
  private debounceTimer?: any;

  toggleSearch() {
    this.isSearchVisible = !this.isSearchVisible;
  }

  onScanInput(event: any) {
    clearTimeout(this.debounceTimer);
    const scanTerm = event.detail.value || '';
    this.debounceTimer = setTimeout(() => {
      this.scan.emit(scanTerm);
    }, 300); 
  }

  onSearchChange(event: any) {
    this.search.emit(event);
  }
}
