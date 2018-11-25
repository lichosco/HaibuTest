import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UserDetailsPage } from '../user-details/user-details';

/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  constructor(public navCtrl: NavController, public restProvider: RestProvider) {
    this.getUsers();
    
  }
  descending: boolean = false;
  order: number;
  column: string = 'name';  

  users: any;

  sort(){
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }

  getUsers() {
    this.restProvider.getUsers()
    .then(data => {
      this.users = data;
      console.log(this.users);
    });
  }
  
  goUsersDetails(){
    this.navCtrl.push(UserDetailsPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
  }

}
