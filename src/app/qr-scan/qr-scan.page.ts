import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { LensFacing, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr-scan',
  templateUrl: './qr-scan.page.html',
  styleUrls: ['./qr-scan.page.scss'],
})
export class QrScanPage implements OnInit {
  segment = 'scan';
  scanResult = '';

  constructor(
    private modalController: ModalController,
    private platform: Platform,
    private router: Router,
  ) {}

  async startScan() {
    const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent,
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: {
        formats: [],
        lensFacing: LensFacing.Back,
      },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data?.barcode?.displayValue) {
      const scannedValue = data.barcode.displayValue;

      if (scannedValue === 'https://www.duoc.cl') {
        alert('Listo! Ya estas presente en matematicas.');
        this.router.navigate(['/menu']);
      } else {
      }

      if (scannedValue === 'https://www.progra.cl') {
        alert('Listo! Ya estas presente en programación.');
        this.router.navigate(['/menu']);
      } else {
      }

      if (scannedValue === 'https://www.si.cl') {
        alert('Listo! Ya estas presente en ciencias.');
        this.router.navigate(['/menu']);
      } else {
      }

    }
  }

  ngOnInit(): void {
    if (this.platform.is('capacitor')) {
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners();
    }
  }



}
