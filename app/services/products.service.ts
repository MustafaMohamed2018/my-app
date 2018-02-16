import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ProductsService {

  constructor(private db:AngularFireDatabase) { }

  addProduct(productValues){
  	this.db.list('/products/').push({
  		title:productValues.title,
  		imageUrl:productValues.imageUrl,
  		price:productValues.price,
  		description:productValues.description,
  		category:productValues.category
  	});
  }

  updateProduct(productId,product){
     this.db.object('/products/' + productId).update(product);
  }

  getProducts(){
  	return this.db.object('/products/').snapshotChanges();
  }

  getProduct(id){
    return this.db.object('/products/' + id).valueChanges();
  }
  deletProduct(productId){
    this.db.object('/products/' + productId).remove();
  }
}
