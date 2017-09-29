import { Component } from '@angular/core'
import { ProductsService } from './products.service'
import { ProductsSignalRService } from './products-signalr.service'
import { Product } from './product'

@Component({
    selector: 'products',
    templateUrl: './products.component.html'
})

export class ProductsComponent /*implements OnInit*/ {
    public canSendMessage: Boolean;
    errorMessage: string;
    public products: Product[];
    //mode = 'Observable';

    constructor(private productsService: ProductsService, private productsSignalRService: ProductsSignalRService) {
        // this.subscribeToEvents();
        // this.canSendMessage = productsSignalRService.connectionExists;
    }

    public ngOnInit() {
        // this.subscribeToEvents();
        this.getProducts();
    }

    public addNewProduct() {
        
    }

    public deleteProduct(): void {
        console.log("deleteProduct");
    }

    private getProducts() {
        this.products = this.productsService.products;

        this.productsService.getProducts()
            .subscribe((response: Product[]) => {
                    this.products = response;
                },
                (err: any) => console.log(err),
                () => console.log('getCustomersPage() retrieved customers'));
    }

    //private subscribeToEvents(): void {
    //    this.productsSignalRService.connectionEstablished.subscribe(() => {
    //        this.canSendMessage = true;
    //    });
    //}
}