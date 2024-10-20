import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from '../../../contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from '../../../contracts/list_product';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpClientService: HttpClientService) { }

  create(product: Create_Product, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
      controller: "products"
    }, product)
      .subscribe({
        complete: () => successCallBack(),
        error: (errorResponse: HttpErrorResponse) => {
          const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
          let errorMessage = "";
          _error.forEach((v, index) => {
            v.value.forEach((_v, _index) => {
              errorMessage += `${_v}<br>`;
            })
          })
          errorCallBack(errorMessage);
        }
      })
  }

  async read(successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<List_Product[]> {
    const promiseData: Promise<List_Product[]> = lastValueFrom(this.httpClientService.get<List_Product[]>({
      controller: "products"
    }));

    promiseData
      .then(() => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.error));

    return await promiseData;
  }
}

