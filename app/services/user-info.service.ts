import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AuthService} from './auth.service';
import { empty } from "rxjs/observable/empty";
import {Observable} from 'rxjs/Observable';
import { of } from "rxjs/observable/of";

@Injectable()
export class UserInfoService {
  userId:string;
  constructor(private db:AngularFireDatabase, private authService:AuthService) { }
  
  saveUser(user){
  	this.db.object('/users/'+ user.uid).update({
  		userName:user.displayName,
  		email:user.email
  	})
  }

  getUserInfo(userId){
  	 return this.db.object('/users/'+ userId).valueChanges();
  }

  get appUser(){
  	return this.authService.appUserObser.switchMap( user =>{
      if(user) this.userId = user.uid;
  		if(user) return this.getUserInfo(user.uid);

  		return Observable.of('');
  	})
  }

}
