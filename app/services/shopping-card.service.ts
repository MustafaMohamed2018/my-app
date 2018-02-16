import { Injectable ,OnDestroy} from '@angular/core';
import {AngularFireDatabase,AngularFireObject} from 'angularfire2/database';
import {item} from '../models/item';
import 'rxjs/add/operator/take';
import {Subscription} from 'rxjs/Subscription';

@Injectable()

export class ShoppingCardService implements OnDestroy{
  cardId;
  cardSubscription:Subscription;

  constructor(private db:AngularFireDatabase) { }

  async getShoppingCardId() {
	  	let cartId = localStorage.getItem('cardId');
	  	if(cartId) return cartId;

	  	let newCardId = await this.createCard().key;
	  	localStorage.setItem('cardId', newCardId);
	  	return newCardId;
  }

  createCard() {
		 return this.db.list('/shopping-carts/').push({
			date: new Date().getTime()
		});
  }

  async getCardFromDatabase(){

		let cardId = await this.getShoppingCardId();

		return this.db.object('/shopping-carts/' + cardId)

  }

 async addProduct(product){
  	await this.addOrRemoveProduct(product, 1);
  }

  async removeProduct(product){
	await this.addOrRemoveProduct(product,-1)
  }

  async addOrRemoveProduct(product,change) {
  	let cardId = await this.getCardFromDatabase(),
	  	items:AngularFireObject<{}>;

	  cardId.snapshotChanges().switchMap( result => {
	  		this.cardId = result.key;
	  		items =  this.db.object('/shopping-carts/' + this.cardId + '/items/' + product.key);
	  		return items.valueChanges();
	  	}).take(1).subscribe( (item:item) => {	  			
			if(item) {
				//remove product if quantity == 0 
				let quan:number = item.quantity + change;
				if(quan == 0) {items.remove();}

				//increase quantity if quan != 0 and update the product
		  		else {
		  			items.update({
			  		title:product.title,
			  		imageUrl:product.imageUrl,
			  		price:product.price,
	                quantity: (item.quantity + change)
                	})
		  		}
			 }

			 //if we dont have item we will set product and make quantity = 1
			 else { items.set({
		  			title:product.title,
		  			imageUrl:product.imageUrl,
		  			price:product.price,
		  			quantity:1
		  		})
		  	}
	  });
  }
  
  async clearCard(){
  	let cardId = await this.getShoppingCardId();

  	this.cardSubscription = this.db.object('/shopping-carts/' + cardId + '/items/').valueChanges()
  	.take(1).subscribe( result => {
  		if(result) this.db.object('/shopping-carts/' + cardId + '/items/').remove();
  	})
  }
  ngOnDestroy(){
  	this.cardSubscription.unsubscribe();
  }

}
