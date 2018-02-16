import { Component, OnInit, OnDestroy } from '@angular/core';
import {ShoppingCardService} from '../services/shopping-card.service';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import {shoppingCard} from '../models/shopping-card';
import {UserInfoService} from '../services/user-info.service';
import {appUser} from '../models/app.user';

@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.css']
})
export class ShoppingCardComponent implements OnInit,OnDestroy {
	shoppingCardArray:any[] = [];
	shoppingCard;
	cardSubscription:Subscription;
  cardAgainSubscription:Subscription;
  totalPrice:number;
  isAdmin;
  isAdminSubscription:Subscription;

  constructor(
    private shoppingCardService:ShoppingCardService,
    private router:Router,
    public userInfoService:UserInfoService) { }

 async ngOnInit() {
  	let card = await this.shoppingCardService.getCardFromDatabase();

  	card.snapshotChanges().subscribe( card => {
  		this.shoppingCardArray = [];

  		for (let item in card.payload.val().items) {
  			this.shoppingCardArray.push(Object.assign({}, {key:item}, card.payload.val().items[item]))
  		}
  	});
   this.isAdminSubscription =  this.userInfoService.appUser.subscribe((user:appUser) => this.isAdmin = user.isAdmin);
  	
    await this.getShoppingCard();
    await this.totalPriceFunc();
  }

  //getting card from db
  async getShoppingCard (){    
     let card =  await this.shoppingCardService.getCardFromDatabase();
     this.cardSubscription =  card.valueChanges().subscribe((re) => {
        this.shoppingCard = re;
     });
  
  }

  clearCard(){
    this.shoppingCardService.clearCard();

    this.router.navigate(['/']);
  }
  async totalPriceFunc(){
     let card = await this.shoppingCardService.getCardFromDatabase();
    this.cardAgainSubscription = card.valueChanges().subscribe((result:shoppingCard) => {
       this.totalPrice = 0;
       for (let product in result.items) {
         this.totalPrice += (result.items[product].price * result.items[product].quantity)
       }
     });
  }
  ngOnDestroy(){
  	this.cardSubscription.unsubscribe();
    this.cardAgainSubscription.unsubscribe();
    this.isAdminSubscription.unsubscribe();
  }
  

  
}
