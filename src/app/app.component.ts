import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { SqLiteService } from './services/sq-lite-service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit{
  constructor(private sql: SqLiteService) {}
  ngOnInit() {
    this.sql.ConnectToDatabase()
  }  
}
