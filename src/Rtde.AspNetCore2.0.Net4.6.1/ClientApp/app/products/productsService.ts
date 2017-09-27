﻿import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Product } from './product';

@Injectable()
export class ProductsService {
    public products: Product[];

    constructor(http: Http, @Injectable('BASE_URL') baseUrl: string) {
        http.get(baseUrl + 'api/Products').subscribe(result => {
            this.products = result.json() as Product[];
        }, error => console.error(error));
    }
}
