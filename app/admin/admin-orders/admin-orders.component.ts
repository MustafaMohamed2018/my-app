import { Component, OnInit, OnDestroy } from '@angular/core';
import {OrderService} from '../../services/order.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit,OnDestroy {
	ordersArray:any[];
  ordersSubs:Subscription;
  
  constructor(private orderService:OrderService) { }

  ngOnInit() {
    this.ordersSubs =	this.orderService.getOrders().subscribe((orders:{any}) => {
  		this.ordersArray = [];

  		for(let order in orders){
  			for (let o in orders[order]) {
  				this.ordersArray.push(Object.assign({},{userId:order},{orderKey:o},orders[order][o]));
  			}
  		}
  	});
  }

  ngOnDestroy(){
    this.ordersSubs.unsubscribe()
  }
}
