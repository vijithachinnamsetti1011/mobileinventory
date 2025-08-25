import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IonSearchbar } from "@ionic/angular/standalone";


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  imports: [IonSearchbar],
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent  implements OnInit {

  constructor() { }

  @Output() searchChange = new EventEmitter<string>();

  onSearch(event: any) {
    const term = event.detail.value || ''; 
    this.searchChange.emit(term);
  }

  ngOnInit() {}

}
