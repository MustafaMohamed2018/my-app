import { Component, OnInit, OnDestroy} from '@angular/core';
import {UserInfoService} from '../services/user-info.service';
import {OrderService} from '../services/order.service';
import {ShoppingCardService} from '../services/shopping-card.service';
import {shoppingCard} from '../models/shopping-card';
import {appUser} from '../models/app.user';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit,OnDestroy {
shoppingCard;
userId;
cardSubscription:Subscription;

  constructor(
  	private userInfo:UserInfoService,
  	private orderService:OrderService,
  	private shoppingCardService:ShoppingCardService,
  	private router:Router) {    
    	this.userId = this.userInfo.userId
  }

  async ngOnInit() {
  	let card = await this.shoppingCardService.getCardFromDatabase();
  	this.cardSubscription = card.valueChanges().subscribe((result:shoppingCard) => {
  		this.shoppingCard = result.items;
  	});
  }

 async requestOrder(form){
  	await this.orderService.requestOrder(form.value,this.userId, this.shoppingCard);

  	this.router.navigate(['/order-success'])
  }

  ngOnDestroy(){
    this.cardSubscription.unsubscribe();
  }
}
