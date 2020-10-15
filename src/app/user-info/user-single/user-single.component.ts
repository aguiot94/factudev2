import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import DataSnapshot = firebase.database.DataSnapshot;

@Component({
  selector: 'app-user-single',
  templateUrl: './user-single.component.html',
  styleUrls: ['./user-single.component.css']
})
export class UserSingleComponent implements OnInit {

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) { }

  user: User;
  isAuth: boolean;

  ngOnInit() {
    this.userService.getUser().then(
      (user: User) => {
        this.user = user;
      }
    );

//Récupère le statut de l'utilisateur
firebase.auth().onAuthStateChanged(
  (user) => {
    if(user) {
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }
  }
);

  }


}
