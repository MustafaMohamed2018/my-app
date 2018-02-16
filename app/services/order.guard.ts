import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {UserInfoService} from './user-info.service';
import {appUser} from '../models/app.user';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';

@Injectable()
export class OrderGuard implements CanActivate {
	constructor(private userInfoService:UserInfoService, private router:Router){}

	canActivate(
	    next: ActivatedRouteSnapshot,
	    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		return this.userInfoService.appUser.map((user:appUser) => { 
			if(!user.isAdmin) return true;
			
			this.router.navigate(['/']);
			return false;
		});
	}
}
