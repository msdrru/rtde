import { Inject, Injectable} from '@angular/core';
import { HubConnection } from '@aspnet/signalr-client'
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

//declare var $: any;

@Injectable()
export class ProductsSignalRService {

    //private proxy: any;
    //private connection: any;
    //public connectionExists: Boolean;

    private productMessageHub: HubConnection;

    private removeObservable: ReplaySubject<number>;

    constructor( @Inject('BASE_URL') private baseUrl: string) {
        this.productMessageHub = new HubConnection('http://localhost:57421/ProductMessageHub');
        this.removeObservable = new ReplaySubject<number>();
    }

    public startConnection(): void {
        this.productMessageHub.start().then(
            () => {
                console.log('Connected !!!');

                this.productMessageHub.on('ProductRemoved',
                    data => this.productRemoved(data));
            }
        );
    }

    public removeProduct(productId: number): Observable<number> {
        this.productMessageHub.invoke('removeProduct', productId);

        return this.removeObservable.asObservable();
    }

    public productRemoved(productId: number): void {
        this.removeObservable.next(productId);
    }
}