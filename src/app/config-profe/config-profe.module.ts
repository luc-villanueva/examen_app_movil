import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfigProfePageRoutingModule } from './config-profe-routing.module';

import { ConfigProfePage } from './config-profe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigProfePageRoutingModule
  ],
  declarations: [ConfigProfePage]
})
export class ConfigProfePageModule {}
