import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
appUserObser:Observable<firebase.User>;

  constructor(private auth:AngularFireAuth, private db:AngularFireDatabase,private route:ActivatedRoute, private router:Router) { 
  	this.appUserObser = this.auth.authState;
  }

  login(){
  	let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
  	localStorage.setItem('returnUrl',returnUrl);

  	this.auth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }


  logout(){
    this.auth.auth.signOut();
    
    this.router.navigate(['/'])
  }
}
