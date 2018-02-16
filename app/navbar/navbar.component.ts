import { Component, OnInit,OnDestroy } from '@angular/core';
import {AuthService} from './../services/auth.service';
import {UserInfoService} from '../services/user-info.service';
import {ShoppingCardService} from '../services/shopping-card.service';
import {shoppingCard} from '../models/shopping-card';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnDestroy {
  user;
  totalQuantity:number;
  cardSubscription:Subscription;

  constructor(
    private authService:AuthService,
    public userInfo:UserInfoService,
    private shoppingCard:ShoppingCardService) {

    this.user = this.userInfo.appUser;
  }

  async ngOnInit() {
    let card = await this.shoppingCard.getCardFromDatabase();

    this.cardSubscription =  card.valueChanges().subscribe( (result:shoppingCard) => {
      this.totalQuantity = 0;

      for (let item in result.items) {
        this.totalQuantity += result.items[item].quantity
      }
    });
  }

  logout(){
  	this.authService.logout();
  }
  
  ngOnDestroy(){
    this.cardSubscription.unsubscribe()
  }
}
