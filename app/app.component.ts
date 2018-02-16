import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './services/auth.service';
import {UserInfoService} from './services/user-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	constructor(private authService:AuthService,
		private router:Router,
		private UserInfo:UserInfoService){
		
		this.authService.appUserObser.subscribe(user => {
			if(user) {
				let url = localStorage.getItem('returnUrl');
				this.router.navigate([url]);
				this.UserInfo.saveUser(user)
			}
		})

	}
}
