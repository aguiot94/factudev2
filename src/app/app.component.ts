import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'factudev2';
  constructor(){
    var firebaseConfig = {
      apiKey: "AIzaSyDoCeBy_Xy9-sFkmoqVvIyzBMfHDhMqUrY",
      authDomain: "factudev.firebaseapp.com",
      databaseURL: "https://factudev.firebaseio.com",
      projectId: "factudev",
      storageBucket: "factudev.appspot.com",
      messagingSenderId: "597368041162",
      appId: "1:597368041162:web:1a4efc516bdd00aa124e33"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
