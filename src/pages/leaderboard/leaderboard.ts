import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, DateTime } from 'ionic-angular';
import { DataProvider } from '../../provider/data/data';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LeaderboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leaderboard',
  templateUrl: 'leaderboard.html',
})
export class LeaderboardPage {

  score: number;
  scoreList: any[] = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public dataService: DataProvider, 
    public storage: Storage,
    public platform: Platform) {

    this.score = this.navParams.get('score');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaderboardPage');
    // Platform.ready isn't required in the new Ionic
    this.platform.ready().then(() => {

      /*Storage get*/this.storage.get('leaderboard').then((result) => {
        let res;
        if(!result) {
          res = []
        } else {
          res = JSON.parse(result)
        }

        res.push({
          score: this.score,
          time: Date.now()
        })

        this.scoreList = res.filter((each) => each.score)

        this.scoreList = this.scoreList.sort(function(a, b) {
          if(a.score > b.score) {
            return -1;
          } else {
            return 1;
          }
        })

        

        /*Storage set*/this.storage.set('leaderboard', JSON.stringify(this.scoreList));
      })
    })
  }

}
