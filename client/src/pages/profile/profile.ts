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
    this._storage.get('user').then((user) => {
      this.user = user;
      this._storage.get('actions').then((actions) => {
        this.action = actions && actions.find(action => action.email === this.user);
      });
    });
  }

  logout(){
    this._storage.set('user', '');
    this._storage.set('actions', '');
    this.navCtrl.push(LoginPage);
  }
}
