import { Component, OnInit, OnDestroy} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
	valuesArray:any[];
	productsArray:any[]=[];
	productSubscription:Subscription;

  constructor(private productsService:ProductsService) { }

  ngOnInit() {
  	this.productSubscription =  this.productsService.getProducts().subscribe( action => {
  		//getting products objects { L4SdMfGa2r8KIkI5dGn{category: "food-category/breakfast", description: "fresh  ", imageUrl: "https://es?q=s", price: "7", title: "fresh"}, ...}
      //and turning it into array of [{key: "-L4SdMfGa2r8KIkI5dGn", category: "food-category/breakfast", description: "fresh ", imageUrl: "https://encr?q=tbn:A", price: "7"} ,..{}]

      let values = action.payload.val();
  		this.valuesArray = [];
  		for(let product in values) {
  			this.valuesArray.push([product, values[product]]);
  		}

  		this.productsArray = [];
  		for(let proArr of this.valuesArray) {
  			this.productsArray .push(Object.assign({},{key:proArr[0]},proArr[1]))
  		}
  	})
  }

  ngOnDestroy(){
  	this.productSubscription.unsubscribe();
  }

}
