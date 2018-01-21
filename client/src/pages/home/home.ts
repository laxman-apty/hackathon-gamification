import { Component } from '@angular/core';
import {
  NavController,
  AlertController,
  ActionSheetController
} from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { LoginPage } from '../login/login';

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
  ) {
    this.gamificationDB = afDatabase.list('/jira_actions')
    this.gamificationDB.valueChanges().subscribe(data => {
      console.info(data);
      this.scoreDetails = data;
    });

  }
  gamificationDB: AngularFireList<null>;
  scoreDetails: any;
}
