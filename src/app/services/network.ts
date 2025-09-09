import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Network {

  private status = new BehaviorSubject<boolean>(navigator.onLine);
  status$ = this.status.asObservable();

  constructor() {
    window.addEventListener('online', () => this.updateStatus(true));
    window.addEventListener('offline', () => this.updateStatus(false));
  }

  updateStatus(isOnline: boolean) {
    this.status.next(isOnline);
  }
  
}
