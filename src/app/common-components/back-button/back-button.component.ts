import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { IonButton, IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
  imports: [IonIcon, IonButton],
})
export class BackButtonComponent  implements OnInit {

  constructor(private location: Location) { 
    addIcons({arrowBack})
  }

  ngOnInit() {}

  goBack() {
    this.location.back(); 
  }

}
