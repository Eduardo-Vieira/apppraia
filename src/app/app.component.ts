import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AluguelPage } from '../pages/aluguel/aluguel';
import { ProdutosPage } from '../pages/produtos/produtos';
import { LoginModel } from '../models/login/login-model';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, ico:string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private authLogin:LoginModel) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Aluguel', ico:'time', component: AluguelPage },
      { title: 'Produtos', ico:'archive',  component:ProdutosPage},
      { title: 'Sair', ico:'exit',  component:{logout:true}}
    ];

  }

  checklogin(){
    this.authLogin.isLogado().then((data)=>{
      if(data == true){
        this.rootPage = AluguelPage;
      }else{
        this.rootPage = LoginPage;
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checklogin();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.component.logout){
      this.authLogin.authLogout();
      this.nav.setRoot(LoginPage);
    }else{
      this.nav.setRoot(page.component);
    }
  }
}
