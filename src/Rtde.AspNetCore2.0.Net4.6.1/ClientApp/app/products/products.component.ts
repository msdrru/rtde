import { Component } from '@angular/core'
import { ProductsService } from './productsService'
//import { ProductsSignalRService } from './productsSignalRService'
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

    constructor(private productsService: ProductsService) {
        // this.subscribeToEvents();
        // this.canSendMessage = productsSignalRService.connectionExists;
    }

    public ngOnInit() {
        // this.subscribeToEvents();
        this.getProducts();
    }

    public addNewProduct() {
        
    }

    private getProducts() {
        this.products = this.productsService.products;
    }

    //private subscribeToEvents(): void {
    //    this.productsSignalRService.connectionEstablished.subscribe(() => {
    //        this.canSendMessage = true;
    //    });
    //}
}