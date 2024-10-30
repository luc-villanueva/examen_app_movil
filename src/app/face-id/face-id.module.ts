import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FaceIDPageRoutingModule } from './face-id-routing.module';

import { FaceIDPage } from './face-id.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FaceIDPageRoutingModule
  ],
  declarations: [FaceIDPage]
})
export class FaceIDPageModule {}
