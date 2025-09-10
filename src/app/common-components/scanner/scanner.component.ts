import { Component, OnInit } from '@angular/core';
// import { BarcodeScanner } from '@capacitor/barcode-scanner';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  // async startScan() {
  //     await BarcodeScanner.prepare();
  //     const status = await BarcodeScanner.checkPermission({ force: true });
  //     if (status.granted) {
  //       const result = await BarcodeScanner.startScan();
  //       if (result.hasContent) {
  //         console.log('Scanned content:', result.content);
  //       }
  //     } else {
  //       console.error('Camera permission denied');
  //     }
  //   }
  //   async stopScan() {
  //     await BarcodeScanner.stopScan();
  //   }

}
