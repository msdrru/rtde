import { Inject, Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Product } from './product';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProductsService {
    public products: Product[];

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
    }

    getProducts(): Observable<Product[]> {
        return this.http.get(this.baseUrl + 'api/Products')
            .map((result: Response) => {
                return result.json() as Product[];
            })
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('server error:', error);
        if (error instanceof Response) {
            let errMessage = '';
            try {
                errMessage = error.json().error;
            } catch (err) {
                errMessage = error.statusText || '';
            }
            return Observable.throw(errMessage);
            // Use the following instead if using lite-server
            //return Observable.throw(err.text() || 'backend server error');
        }

        return Observable.throw(error || 'ASP.NET Core server error');
    }
}