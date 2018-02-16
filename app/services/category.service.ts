import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CategoryService {

  constructor(private db:AngularFireDatabase, private router:Router) { }

  AddCategory(categoryName){
  		this.db.object('/categories/' + categoryName).update({
  			name : categoryName
  		});

      this.router.navigate(['/admin/catrgories']);
  }

  get getCategories():Observable<any[]>{
    return this.db.list('/categories/').snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    })
  }

  deleteCategory(categoryId){
    let conf = confirm('Do You Want To Delete This Category?');
    if (!conf) return ;

    this.db.object('/categories/' + categoryId).remove();
     this.router.navigate(['/admin/catrgories/']);
  }
}
