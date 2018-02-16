import { Component, OnInit,Input } from '@angular/core';
import {ShoppingCardService} from './../services/shopping-card.service';
import {shoppingCard} from '../models/shopping-card';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {
	@Input ('product')product;
	@Input('shoppingCard')shoppingCard:shoppingCard;

  constructor(private shoppingCardService:ShoppingCardService) { }

  ngOnInit() {
  }
 
 addProduct(product) {
    this.shoppingCardService.addProduct(product);
  }
  get productQuantity(){
  	if(!this.shoppingCard) return 0;
  	if(!this.shoppingCard.items) return 0;

  	let item = this.shoppingCard.items[this.product.key];
  	if(item) return item.quantity;
  	else return 0;
  }
  removeProduct(product){
  	this.shoppingCardService.removeProduct(product);
  }
}
