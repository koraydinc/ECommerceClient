import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from '../../../contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from '../../../contracts/list_product';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { List_Product_Image } from '../../../contracts/list_product_image';

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

  async read(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalCount: number; products: List_Product[] }> {
    const promiseData: Promise<{ totalCount: number; products: List_Product[] }> = lastValueFrom(this.httpClientService.get<{ totalCount: number; products: List_Product[] }>({
      controller: "products",
      queryString: `page=${page}&size=${size}`
    }));

    promiseData
      .then(() => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.error));

    return await promiseData;
  }

  async delete(id: string) {
    await lastValueFrom(this.httpClientService.delete<any>({
      controller: "products"
    }, id));
  }

  async readImages(id: string, successCallBack?: () => void): Promise<List_Product_Image[]> {
    const getObservable: Observable<List_Product_Image[]> = this.httpClientService.get<List_Product_Image[]>({
      action: "getproductimages",
      controller: "products"
    }, id);

    const images: List_Product_Image[] = await firstValueFrom(getObservable);
    successCallBack();
    return images;
  }

  async deleteImage(id: string, imageId: string, successCallBack?: () => void) {
    const deleteObservable = this.httpClientService.delete({
      action: "deleteproductimage",
      controller: "products",
      queryString: `imageId=${imageId}`
    }, id);

    await firstValueFrom(deleteObservable);
    successCallBack();
  }
}

