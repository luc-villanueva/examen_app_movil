import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-face-id',
  templateUrl: './face-id.page.html',
  styleUrls: ['./face-id.page.scss'],
})
export class FaceIDPage implements OnInit {

  constructor(private alertController: AlertController) {}

  async showSuccessMessage() {
    const alert = await this.alertController.create({
      header: 'Autenticación Exitosa',
      message: 'Has sido autenticado con Face ID (Simulado).',
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit() {
  }

}
