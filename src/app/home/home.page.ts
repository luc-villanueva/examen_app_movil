import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalImageComponent } from '../modal-image/modal-image.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private modalController: ModalController) {}

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalImageComponent,
      cssClass: 'custom-modal',
    });
    return await modal.present();
  }
}
