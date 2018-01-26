import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AluguelPage } from './aluguel';

import { AluguelcadPageModule } from '../aluguelcad/aluguelcad.module';

@NgModule({
  declarations: [
    AluguelPage,
  ],
  imports: [
    IonicPageModule.forChild(AluguelPage),
    AluguelcadPageModule
  ],
})
export class AluguelPageModule {}
