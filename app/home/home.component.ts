import { Component, OnInit, OnDestroy } from '@angular/core';
import {CategoryService} from '../services/category.service';
import {ProductsService} from '../services/products.service';
import {Subscription} from 'rxjs/Subscription';
import {Router,ActivatedRoute} from '@angular/router';
import {ShoppingCardService} from './../services/shopping-card.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
categories:any[];
valuesArray:any[];
productsArray:any[]=[];
productSubscription:Subscription;
show=0;
filteredproductsArray =[];
active=true;
toggle = {};
categoryUrl;
quantity:number;
shoppingCard;
cardSubscription:Subscription;

  constructor(private categoryService:CategoryService,
   private productsService:ProductsService,
   private route:ActivatedRoute,
   private router:Router,
   private ShoppingCard:ShoppingCardService) { }

 async ngOnInit() {
	  this.categoryService.getCategories.subscribe(categories => {
	  	 	this.categories = categories;
	  });

  	this.productSubscription =  this.productsService.getProducts().switchMap( action => {
  		let values = action.payload.val();
  		this.valuesArray = [];

  		for(let product in values) {
  			this.valuesArray.push([product, values[product]]);
  		}
  		this.productsArray= [];
  		for(let proArr of this.valuesArray) {
  			this.productsArray.push(Object.assign({},{key:proArr[0]},proArr[1]))
  		}
  		return this.route.queryParamMap;

		}).subscribe(x => {
		this.categoryUrl = x.get('categoryUrl');

			this.filteredproductsArray = (this.categoryUrl)? this.productsArray.filter(item => item.category == this.categoryUrl) : this.productsArray;
  	});

    this.getShoppingCard();
 }

  	searchProduct(query){
  		this.filteredproductsArray =  (query)? this.productsArray.filter(item => item.title.toLowerCase().includes(query.toLowerCase())) : this.productsArray;
      
      if(query) this.active = false;
      else this.active = true;
    }

   	showActive(index){
  	 	this.show = index;
   	}  

  async getShoppingCard (){    
     let card =  await this.ShoppingCard.getCardFromDatabase();
     this.cardSubscription =  card.valueChanges().subscribe((re) => {
        this.shoppingCard = re;
     });
  }
  ngOnDestroy(){
    this.cardSubscription.unsubscribe();
    this.productSubscription.unsubscribe();
  }
}