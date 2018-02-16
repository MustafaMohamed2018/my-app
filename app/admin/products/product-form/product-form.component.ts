import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../../services/category.service';
import {ProductsService} from '../../../services/products.service';
import {ActivatedRoute,Router} from '@angular/router';
import 'rxjs/add/operator/take';
import {product} from '../../../models/product';
import{Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories:Observable<any[]>;
  product :product={};
  productId;

  constructor(
    private categoryService:CategoryService,
    private productsService:ProductsService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
	  this.categories =  this.categoryService.getCategories

      this.productId = this.route.snapshot.paramMap.get('id');
     if(this.productId) this.productsService.getProduct(this.productId).take(1).subscribe(p => this.product = p);
  }

  addProduct(formValues){
    
  	if(!this.productId) this.productsService.addProduct(formValues.value);
    this.productsService.updateProduct(this.productId,formValues.value);
  
    this.router.navigate(['/admin/products/'])
  }

  deletProduct() {
    let conf = confirm('Do You Want To Delete This?');
    if (!conf) return ;
    
    this.productsService.deletProduct(this.productId);
    this.router.navigate(['/admin/products/']);
  }
}

