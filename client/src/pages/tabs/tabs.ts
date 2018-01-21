import { Component } from '@angular/core';
import {
  NavController,
} from 'ionic-angular';

import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ProfilePage;
  tab3Root = LoginPage;

  constructor(
    public navCtrl: NavController,
  ) {

  }
}
