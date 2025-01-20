import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BasketsModule } from './baskets/baskets.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { ProductsModule } from './products/products.module';
import { RegisterModule } from './register/register.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BasketsModule,
    HomeModule,
    ProductsModule,
    RegisterModule,
    LoginModule
  ],
  exports: [
  ]
})
export class ComponentsModule { }
