import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;
  informationsFulfilled: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {

    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuth = true;
          this.checkUser();
        } else {
          this.isAuth = false;
        }
      }
    );



  }

  checkUser(){
    //Vérifie que l'utilisateur a rempli ses informations
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value', (data: DataSnapshot) => {
          resolve(data.val());
        })
      }
    ).then(
      (data) => {
        if(data == null) {
          this.informationsFulfilled = false;
        } else {
          this.informationsFulfilled = true;
        }
        console.log(this.informationsFulfilled);
      }
    );
  }

  onSignOut(){
    this.authService.signOutUser();
  }

}
