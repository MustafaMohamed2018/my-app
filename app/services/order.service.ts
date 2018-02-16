import { Injectable } from '@angular/core';
import {AngularFireDatabase,AngularFireList} from 'angularfire2/database';

@Injectable()
export class OrderService {

  constructor(private db:AngularFireDatabase) { }
  
  getOrders(){
  	return this.db.object('/orders/').valueChanges();
  }

 async requestOrder(formValues,userId,shoppingCard) {
	let result = await this.db.list('/orders/' + userId).push({
		date: this.timefunc(),
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
		
	return await this.db.object('/users/' + userId + '/my-orders/' + result.key).update({
		date: this.timefunc(),
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
}
