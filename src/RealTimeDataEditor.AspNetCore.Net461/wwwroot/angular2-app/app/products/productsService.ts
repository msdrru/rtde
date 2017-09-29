import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Product } from './product'
import { ProductsSignalRService } from './ProductsSignalRService'

@Injectable()
export class ProductsService {
    private productsUrl = 'http://localhost:16930/api/Products';

    constructor(private http: Http, private productsSignalRService: ProductsSignalRService) {
        
    }

    getProducts(): Observable<Product[]> {
        return this.http.get(this.productsUrl)
            .map(this.handleResponseData)
            .catch(this.handleResponseError);
    }

    private handleResponseData(response: Response) {
        let data = response.json();
        return data || {};
    }

    private handleResponseError(response: Response | any) {
        let message: string;
        if (response instanceof Response) {
            const body = response.json() || '';
            const err = body.error || JSON.stringify(body);
            message = `${response.status} - ${response.statusText || ''} ${err}`;
        } else {
            message = response.message ? response.message : response.toString();
        }

        console.error(message);
        return Observable.throw(message);
    }
}