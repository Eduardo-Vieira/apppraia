import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProdutosnovoPage } from './produtosnovo';

@NgModule({
  declarations: [
    ProdutosnovoPage,
  ],
  imports: [
    IonicPageModule.forChild(ProdutosnovoPage),
  ],
})
export class ProdutosnovoPageModule {}
