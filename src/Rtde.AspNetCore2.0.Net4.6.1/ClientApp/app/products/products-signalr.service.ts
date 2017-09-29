import { Inject, Injectable} from '@angular/core';
import { HubConnection } from '@aspnet/signalr-client'
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Product } from './product'

//declare var $: any;

@Injectable()
export class ProductsSignalRService {

    //private proxy: any;
    //private connection: any;
    //public connectionExists: Boolean;

    private productMessageHub: HubConnection;

    private addObservable: ReplaySubject<Product>;
    private removeObservable: ReplaySubject<number>;

    public productAddedEvent = ()=> this.addObservable.asObservable();

    constructor( @Inject('BASE_URL') private baseUrl: string) {
        this.productMessageHub = new HubConnection('http://localhost:57421/ProductMessageHub');
        this.removeObservable = new ReplaySubject<number>();
        this.addObservable = new ReplaySubject<Product>();
    }

    public startConnection(): void {
        this.start();
    }

    private start() {
        this.productMessageHub.start().then(
            () => {
                console.log('Connected !!!');

                this.productMessageHub.on('ProductRemoved',
                    data => this.productRemoved(data));

                this.productMessageHub.on('ProductAdded',
                    data => this.productAdded(data));
            }
        );
    }

    public addProduct(product: Product) {
        this.productMessageHub.invoke('addProduct', product);
    }

    public saveProduct(product: Product) {
        this.productMessageHub.invoke('saveProduct', product);
    }

    public removeProduct(productId: number): Observable<number> {
        this.productMessageHub.invoke('removeProduct', productId);

        return this.removeObservable.asObservable();
    }

    private productAdded(product: Product): void {
        this.addObservable.next(product);
    }

    public productRemoved(productId: number): void {
        this.removeObservable.next(productId);
    }
}