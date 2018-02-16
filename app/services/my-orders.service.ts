import { Injectable , OnDestroy} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {UserInfoService} from './user-info.service';
import {appUser} from '../models/app.user';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class MyOrdersService {
userName:string;
  userNameSubs:Subscription;
  constructor(private db:AngularFireDatabase,private userInfoService:UserInfoService) { 
  	this.userNameSubs = this.userInfoService.appUser.subscribe((user:appUser) => {
  		this.userName = user.userName
  	})
  }

	getOrderData(userId,orderId){
	 	return this.db.object('/orders/' + userId + '/' + orderId + '/').valueChanges();
	}

	updateOrder(formValues,userId,orderId,shoppingCard,date) {
		this.db.object('/orders/' + userId + '/' +orderId + '/').update({
			date:date,
			dateModified: this.timefunc(),
			modifier: this.userName,
			userId:userId,
			info: {
				email	: 	formValues.email,
				fullName: 	formValues.fullName,
				address	: 	formValues.address,
				city	: 	formValues.city,
				state	: 	formValues.state,
				zipCode	: 	formValues.zipCode
			},
			items:shoppingCard
		});

		this.db.object('/users/' + userId + '/my-orders/' + orderId).update({
			date: this.timefunc(),
			dateModified:this.timefunc(),
			info: {
				email	: 	formValues.email,
				fullName: 	formValues.fullName,
				address	: 	formValues.address,
				city	: 	formValues.city,
				state	: 	formValues.state,
				zipCode	: 	formValues.zipCode
			},
			items:shoppingCard
		});
	}

	timefunc(){
		function dateComponentPad(value) {
		  var format = String(value);

		  return format.length < 2 ? '0' + format : format;
		}

		 function formatDate(date) {
		  var datePart = [ date.getFullYear(), date.getMonth() + 1, date.getDate() ].map(dateComponentPad);
		  var timePart = [ date.getHours(), date.getMinutes(), date.getSeconds() ].map(dateComponentPad);

		  return datePart.join('-') + '  ' + timePart.join(':');
		}

		return formatDate(new Date())
	}

	deleteOrder(userId,orderId){
		this.db.object('/orders/' + userId + '/' +orderId + '/').remove();
		this.db.object('/users/' + userId + '/my-orders/' + orderId).remove();
	}

	ngOnDestroy(){
		this.userNameSubs.unsubscribe();
	}

}
