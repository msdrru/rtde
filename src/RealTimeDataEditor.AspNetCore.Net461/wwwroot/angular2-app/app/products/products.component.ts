import { Component, OnInit } from '@angular/core'
import { ProductsService } from './productsService'
import { ProductsSignalRService } from './productsSignalRService'
import { Product } from './product'

@Component({
    moduleId: module.id,
    selector: 'products',
    templateUrl: 'products.component.html'
})

export class ProductsComponent implements OnInit {
    public canSendMessage: Boolean;
    errorMessage: string;
    public products: Product[];
    mode = 'Observable';

    constructor(private productsService: ProductsService,
        private productsSignalRService: ProductsSignalRService) {
        this.subscribeToEvents();
        this.canSendMessage = productsSignalRService.connectionExists;
    }

    public ngOnInit() {
        this.subscribeToEvents();
        this.getProducts();
    }

    public addNewProduct() {
        
    }

    private getProducts() {
        this.productsService.getProducts()
            .subscribe(
                (products: any) => this.products = products,
                error => this.errorMessage = <any>error);
    }

    private subscribeToEvents(): void {
        this.productsSignalRService.connectionEstablished.subscribe(() => {
            this.canSendMessage = true;
        });
    }
}