import { Component } from '@angular/core';
import {
  NavController,
  AlertController,
  ActionSheetController
} from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public afDatabase: AngularFireDatabase,
    public actionSheetCtrl: ActionSheetController,
  ) {
    // this.songsDB = afDatabase.list('/')
    // this.songsDB.valueChanges().subscribe(data => {
    //   console.info(data);
    //   this.songs = data;
    // });
  }

  // songs: any;
  // songsDB: AngularFireList<null>;


  public gotoHome() {
    console.info('comming');
    this.navCtrl.push(HomePage);
  }
}
