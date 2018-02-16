import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import {AdminOrderFormService} from '../../services/admin-order-form.service';
import {order} from '../../models/order';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-my-orders-form',
  templateUrl: './my-orders-form.component.html',
  styleUrls: ['./my-orders-form.component.css']
})
export class MyOrdersFormComponent implements OnInit {
	order:order={};
	userId;
	orderId;
	orderSubs:Subscription;
	orderFullName;
  constructor(
  	 private route:ActivatedRoute,
  	 private adminOrderService:AdminOrderFormService,
  	 private router:Router) {}

  ngOnInit() {
  	this.userId = this.route.snapshot.paramMap.get('userId');
  	this.orderId = this.route.snapshot.paramMap.get('orderId');
  	   
  	this.orderSubs = this.adminOrderService.getOrderData(this.userId,this.orderId).subscribe( result => {
  	    this.order = result;
	});
	this.orderFullName = this.order.info.fullName ||'';
  }

  updateOrder(form){
  	this.adminOrderService.updateOrder(form.value,this.userId,this.orderId,this.order.items,this.order.date)
  	
  	this.router.navigate(['/my-orders']);
  }

  deleteOrder(){
  	let conf = confirm('Do You Want To Delete This Order?');
  	if(!conf)return;

  	this.adminOrderService.deleteOrder(this.userId,this.orderId);
  	this.router.navigateByUrl('/my-orders')
  }

  ngOnDestroy(){
  	this.orderSubs.unsubscribe()
  }
}
