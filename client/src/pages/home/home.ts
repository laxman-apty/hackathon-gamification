import { Component } from '@angular/core';
import {
  NavController,
  AlertController,
  ActionSheetController
} from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public afDatabase: AngularFireDatabase,
    public actionSheetCtrl: ActionSheetController,
    private _storage: Storage,
  ) {
    this.gamificationDB = afDatabase.list('/jira_actions')
    this.gamificationDB.valueChanges().subscribe(data => {
      this.scoreDetails = data;
      this._storage.set('actions', this.scoreDetails);
    });
    this.navCtrl.setRoot(TabsPage);
  }

  gamificationDB: AngularFireList<null>;
  scoreDetails: any[];
  object = Object;

  public logout(){
    this._storage.set('user', '');
    this._storage.set('actions', '');
    this.navCtrl.push(LoginPage);
  }
}
