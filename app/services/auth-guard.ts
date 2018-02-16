import { Injectable } from '@angular/core';
import {CanActivate,RouterStateSnapshot,Router} from '@angular/router';
import {AuthService} from './auth.service';
import'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable() 
export class AuthGuard implements CanActivate{

  constructor(private authService:AuthService,private router:Router) {

  }

  canActivate(route, state:RouterStateSnapshot){

  	return this.authService.appUserObser.map( user => {
  		if (user) return true;
  		
  		this.router.navigate(['/login'], {queryParams: {returnUrl:state.url} });
  		return false
  	});
  }

}