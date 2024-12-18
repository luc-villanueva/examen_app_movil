import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  qrScannedToday = false;

  constructor(private router: Router) {}

  goToView(view: string) {
    switch(view) {
      case 'Secciones':
        this.router.navigate(['/secciones']);
        break;
      case 'Config':
        this.router.navigate(['/config']);
        break;
      default:
        console.log('Vista no definida');
    }
  }


  ngOnInit() {
    const qrScanned = localStorage.getItem('qrScanned') === 'true';
    const qrScannedDate = localStorage.getItem('qrScannedDate');
    const today = new Date().toISOString().split('T')[0];

    if (qrScanned && qrScannedDate) {
      const scannedDate = qrScannedDate.split('T')[0];
      this.qrScannedToday = scannedDate === today;
    }
 }
}



