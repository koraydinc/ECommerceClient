import { Component } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientService } from '../../../services/common/http-client.service';
import { Create_Product } from '../../../contracts/create_product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})

export class ProductsComponent extends BaseComponent {
  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService) {
    super(spinner);
  }

  ngOnInit(): void {
    //this.showSpinner(SpinnerType.Timer);

    // this.httpClientService.get<Product[]>({
    //   controller: "products"
    // }).subscribe(data => console.log(data[0].name));

    // this.httpClientService.post({
    //   controller: "products"
    // }, {
    //   name: "Kalem",
    //   stock: 5,
    //   price: 10
    // }).subscribe();

    // this.httpClientService.put({
    //   controller: "products"
    // },{
    //   id: "e7f3234b-6cf0-4c51-af55-5894c53a5004",
    //   name: "Silgi",
    //   stock: 6,
    //   price: 15
    // }).subscribe();

    // this.httpClientService.delete({
    //   controller: "products"
    // },"e7f3234b-6cf0-4c51-af55-5894c53a5004").subscribe();
  }
};
