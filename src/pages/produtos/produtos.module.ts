import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProdutosPage } from './produtos';

import { ProdutosnovoPageModule } from '../produtosnovo/produtosnovo.module';
import { ProdutoseditPageModule } from '../produtosedit/produtosedit.module';

@NgModule({
  declarations: [
    ProdutosPage,
  ],
  imports: [
    IonicPageModule.forChild(ProdutosPage),
    ProdutosnovoPageModule,
    ProdutoseditPageModule
  ],
})
export class ProdutosPageModule {}
