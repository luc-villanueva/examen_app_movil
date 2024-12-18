import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.scss'],
})
export class ModalImageComponent {
  selectedSubject: string | null = null;
  qrCodeUrl: string | null = null;

  constructor(private modalCtrl: ModalController) {}

  close() {
    this.modalCtrl.dismiss();
  }

  selectSubject(subject: string) {
    this.selectedSubject = subject;
    this.qrCodeUrl = this.getQrCodeUrl(subject);
  }

  private getQrCodeUrl(subject: string): string {
    switch (subject) {
      case 'Matemáticas':
        return 'assets/matematicas.png';
      case 'Programación':
        return 'assets/programacion.png';
      case 'Ciencias':
        return 'assets/ciencias.png';
      default:
        return '';
    }
  }
}
