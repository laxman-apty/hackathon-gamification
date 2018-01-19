import { Component } from '@angular/core';
import {
  NavController,
  AlertController,
  ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList, AngularFireDatabaseModule  } from 'angularfire2/database';
import { FirebaseListObservable } from "angularfire2/database-deprecated";

interface Song {
  id?: number;
  title: string;
}
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
    this.songsDB = afDatabase.list('/songs')
    this.songsDB.valueChanges().subscribe(data => {
      console.info(data);
      this.songs = data;
    });
  }

  // songs: any;
  songs: Song[];
  songsDB: AngularFireList<Song>;

  addSong(){
    let prompt = this.alertCtrl.create({
      title: 'Song Name',
      message: "Enter a name for this new song you're so keen on adding",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.songs.push({id: 1, title: data.title});
            this.songsDB.push({ title: data.title });
          }
        }
      ]
    });
    prompt.present();
  }

  showOptions(song) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Delete Song',
          role: 'destructive',
          handler: () => {
            this.removeSong(song);
          }
        },{
          text: 'Update title',
          handler: () => {
            this.updateSong(song);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  removeSong(song: Song){
    // this.songsDB.remove(song);
  }

  updateSong(song: Song){
    let prompt = this.alertCtrl.create({
      title: 'Song Name',
      message: "Update the name for this song",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: song.title
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            // this.songsDB.update(this.songsDB.snapshotChanges(), song);
          }
        }
      ]
    });
    prompt.present();
  }
}
