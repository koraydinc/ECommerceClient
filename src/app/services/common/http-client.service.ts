import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) {

  }

  private url(requestParameters: Partial<RequestParameters>): string {
    return `${requestParameters.baseUrl ? requestParameters.baseUrl : this.baseUrl}/${requestParameters.controller}${requestParameters.action ? `/${requestParameters.action}` : ""}`;
  }

  get<T>(requestParameters: Partial<RequestParameters>, id?: string): Observable<T> {
    let url: string = "";
    if (requestParameters.fullEndpoint) {
      url = requestParameters.fullEndpoint;
    } else {
      url = `${this.url(requestParameters)}${id ? `/${id}` : ""}${requestParameters.queryString ? `?${requestParameters.queryString}` : ""}`;
    }
    return this.httpClient.get<T>(url, { headers: requestParameters.header });
  }

  post<T>(requestParameters: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
    let url: string = "";
    if (requestParameters.fullEndpoint) {
      url = requestParameters.fullEndpoint;
    } else {
      url = `${this.url(requestParameters)}${requestParameters.queryString ? `?${requestParameters.queryString}` : ""}`;
    }
    return this.httpClient.post<T>(url, body, { headers: requestParameters.header });
  }

  put<T>(requestParameters: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
    let url: string = "";
    if (requestParameters.fullEndpoint) {
      url = requestParameters.fullEndpoint;
    } else {
      url = `${this.url(requestParameters)}${requestParameters.queryString ? `?${requestParameters.queryString}` : ""}`;
    }
    return this.httpClient.put<T>(url, body, { headers: requestParameters.header });
  }

  delete<T>(requestParameters: Partial<RequestParameters>, id: string): Observable<T> {
    let url: string = "";
    if (requestParameters.fullEndpoint) {
      url = requestParameters.fullEndpoint;
    } else {
      url = `${this.url(requestParameters)}/${id}${requestParameters.queryString ? `?${requestParameters.queryString}` : ""}`;
    }
    return this.httpClient.delete<T>(url, { headers: requestParameters.header });
  }
}

export class RequestParameters {
  controller?: string;
  action?: string;
  queryString?: string;
  header?: HttpHeaders;
  baseUrl?: string;
  fullEndpoint?: string;
}
