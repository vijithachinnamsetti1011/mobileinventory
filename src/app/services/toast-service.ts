import { Injectable } from '@angular/core';
import { ToastController} from '@ionic/angular'

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toastMessage: ToastController) { }
  async presentToast( position: 'top' | 'middle' | 'bottom', color: 'success' | 'danger' | 'warning', message = "Contact saved!", duration: number=2000) {
    const toast = await this.toastMessage.create({
      message: message,
      duration: 1000,
      position: position,
      color:color
    });
    await toast.present();
  }
}
