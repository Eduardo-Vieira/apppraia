import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

import { DadosProvider } from '../providers/dados/dados';

/**
 * Modules Page
 */
import { AluguelPageModule } from '../pages/aluguel/aluguel.module';
import { ProdutosPageModule } from '../pages/produtos/produtos.module';
import { LoginPageModule } from '../pages/login/login.module';

/**
 * db Models
 */
import { AluguelModel } from '../models/aluguel/aluguel-model';
import { ProdutosModel } from '../models/produtos/produtos-model';
import { LoginModel } from '../models/login/login-model';
import { UsersModel } from '../models/users/users-model';


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__dbapppraia',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    LoginPageModule,
    AluguelPageModule,
    ProdutosPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DadosProvider,
    LoginModel,
    AluguelModel,
    ProdutosModel,
    UsersModel
  ]
})
export class AppModule {}
