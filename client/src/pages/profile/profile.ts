import { Component, OnInit } from '@angular/core';
import {
  NavController,
  AlertController,
  ActionSheetController
} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit {

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    private _storage: Storage,
  ) {

  }
  user: any;
  action: any;

  ngOnInit(){
    this._storage.get('profile').then((user) => {
      this.action = user;
      // this._storage.get('actions').then((actions) => {
      //   this.action = actions && actions.find(action => action.email === this.user);
      //   console.info(this.action);
      // });
    });
  }

  logout(){
    this._storage.set('user', '');
    this._storage.set('profile', '');
    this._storage.set('actions', '');
    this.navCtrl.push(LoginPage);
  }
}
