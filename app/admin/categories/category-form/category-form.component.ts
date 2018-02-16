import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../../services/category.service';
import {ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  categoryId;
  constructor(private categoryService:CategoryService,private router:Router, private route:ActivatedRoute) { 
    this.categoryId =  this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  }
	addCategory(categoryValues){
		this.categoryService.AddCategory(categoryValues.category);
	}
  deleteCategory(){
    this.categoryService.deleteCategory(this.categoryId);
  }
}
