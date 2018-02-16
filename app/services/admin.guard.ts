import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {UserInfoService} from './user-info.service';
import 'rxjs/add/operator/switchMap';
import'rxjs/add/operator/map';
import {appUser} from '../models/app.user';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private authService:AuthService,
  	private router:Router,
  	private userInfo:UserInfoService) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

  	return this.userInfo.appUser.map((user:appUser) => {return  user.isAdmin});    
  }
}
