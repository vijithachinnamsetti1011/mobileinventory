import { Injectable } from '@angular/core';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerOptions } from "@capacitor/barcode-scanner"

@Injectable({
  providedIn: 'root'
})
export class Scanner {

  async scanCode() {
    try {
      let options: CapacitorBarcodeScannerOptions = {
        hint: 17,
        web: {
          showCameraSelection: true
        }
      }
      let result = await CapacitorBarcodeScanner.scanBarcode(options)
      console.log(result)
      return result.ScanResult
    }
    catch (err) {
      console.log(err)
      return 'something went wrong'
    }
  }
}
