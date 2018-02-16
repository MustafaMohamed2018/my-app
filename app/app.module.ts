import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {RouterModule,Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {environment} from '../environments/environment';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'

//services and pipes
import {CategoryService} from './services/category.service';
import {ProductsService} from './services/products.service';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './services/auth-guard';
import {AdminGuard} from './services/admin.guard';
import {UserInfoService} from './services/user-info.service';
import {ShoppingCardService} from './services/shopping-card.service';
import {OrderService} from './services/order.service';
import {OrderGuard} from './services/order.guard';
import {AdminOrderFormService} from './services/admin-order-form.service';
import {MyOrdersService} from './services/my-orders.service';
import { HighlightPipe } from'./filter.pipe';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';

//admin components
import { AdminProductsComponent } from './admin/products/products.component';
import { AdminCategoriesComponent } from './admin/categories/categories.component';
import { ProductFormComponent } from './admin/products/product-form/product-form.component';
import { CategoryFormComponent } from './admin/categories/category-form/category-form.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { OrderFormComponent } from './admin/admin-orders/order-form/order-form.component';

import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { ShoppingCardComponent } from './shopping-card/shopping-card.component';
import { OrderComponent } from './order/order.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyOrdersFormComponent } from './my-orders/my-orders-form/my-orders-form.component';

const routes:Routes = [
  {path: '', component:HomeComponent},

  {path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard,AdminGuard]},
  {path: 'admin/products/product-form', component: ProductFormComponent, canActivate: [AuthGuard,AdminGuard]},
  {path: 'admin/products/product-form/:id', component: ProductFormComponent, canActivate: [AuthGuard,AdminGuard]},
  
  {path: 'admin/catrgories', component: AdminCategoriesComponent, canActivate: [AuthGuard,AdminGuard]},
  {path: 'admin/catrgories/category-form', component: CategoryFormComponent, canActivate: [AuthGuard,AdminGuard]},
  {path: 'admin/catrgories/category-form/:id', component: CategoryFormComponent, canActivate: [AuthGuard,AdminGuard]},
  {path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard,AdminGuard]},
  {path: 'admin/orders/:userId/:orderId', component: OrderFormComponent, canActivate: [AuthGuard,AdminGuard]},

  {path:'order',component:OrderComponent,canActivate:[AuthGuard,OrderGuard]},
  {path:'my-orders',component:MyOrdersComponent,canActivate:[AuthGuard,OrderGuard]},
  {path:'my-orders/:userId/:orderId',component:MyOrdersFormComponent,canActivate:[AuthGuard,OrderGuard]},
  {path:'order-success',component:OrderSuccessComponent,canActivate:[AuthGuard,OrderGuard]},

  {path:'shopping-card',component:ShoppingCardComponent},
  {path: 'login', component:LoginComponent},
  {path: '**', component:NotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AdminProductsComponent,
    AdminCategoriesComponent,
    ProductFormComponent,
    CategoryFormComponent,
    HighlightPipe,
    LoginComponent,
    NotFoundComponent,
    ProductQuantityComponent,
    ShoppingCardComponent,
    OrderComponent,
    OrderSuccessComponent,
    AdminOrdersComponent,
    OrderFormComponent,
    MyOrdersComponent,
    MyOrdersFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
    Angular2FontawesomeModule
  ],
  providers: [
    CategoryService,
    ProductsService,
    AuthService,
    AuthGuard,
    AdminGuard,
    OrderGuard,
    UserInfoService,
    ShoppingCardService,
    OrderService,
    AdminOrderFormService,
    MyOrdersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
