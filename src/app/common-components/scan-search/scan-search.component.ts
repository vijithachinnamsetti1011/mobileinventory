import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonToolbar, IonLabel, IonButton, IonIcon, IonItem, IonInput } from "@ionic/angular/standalone";
import { Scanner } from 'src/app/services/scanner';
import { ToastService } from 'src/app/services/toast-service';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scan-search',
  templateUrl: './scan-search.component.html',
  imports: [IonInput, IonItem, IonIcon, IonButton, IonToolbar, IonLabel, SearchBarComponent, CommonModule],
  styleUrls: ['./scan-search.component.scss'],
})
export class ScanSearchComponent implements OnInit {


  @Input() pageTitle: string = 'Page';
  @Input() showBackButton: boolean = true;
  @Input() labelText: string = '';
  @Output() scan = new EventEmitter<string>();
  @Output() search = new EventEmitter<string>();
  @ViewChild('scanInput', { static: false }) scanInput!: IonInput;

  isSearchVisible = false;
  private scanTimeout?: any;
  scanValue: string = '';

  constructor(private barcode: Scanner, private toast: ToastService) { }

  ngOnInit() { }


  toggleSearch() {
    this.isSearchVisible = !this.isSearchVisible;
  }

  onScanInput(event: any) {
    clearTimeout(this.scanTimeout);
    this.scanValue = event.detail.value?.trim() || '';
    this.scanTimeout = setTimeout(() => {
      if (this.scanValue) {
        this.scan.emit(this.scanValue);
        this.scanValue = '';
        this.scanInput.value = '';
      }
    }, 1000);
  }
  onSearchChange(event: any) {
    this.search.emit(event);
    if (this.isSearchVisible) {
      setTimeout(() => {
        this.isSearchVisible = false;
      }, 5000);
    }
  }

  async openScanner() {
    try {
      const data = await this.barcode.scanCode();
      if (data) {
        this.scan.emit(data);
        this.toast.presentToast('top', 'success', `Scanned: ${data}`);
      } else {
        this.toast.presentToast('top', 'danger', 'No code detected');
      }
    } catch (err) {
      this.toast.presentToast('top', 'danger', 'Scan failed');
    }
  }

}
