import { Component, OnInit} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {Observable} from 'rxjs/Observable';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {
categories:Observable<any[]>;
  constructor(private categoryService:CategoryService) { }

  ngOnInit() {
       this.categories = this.categoryService.getCategories;
  	}
  
}
