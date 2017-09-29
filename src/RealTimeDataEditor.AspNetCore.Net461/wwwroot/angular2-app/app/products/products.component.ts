import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms';
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

    selectedRow: Number;
    selectedProduct : Product;

    errorMessage: string;

    public products: Product[];
    mode = 'Observable';

    constructor(private productsService: ProductsService,
        private productsSignalRService: ProductsSignalRService) {
    }

    public ngOnInit() {
        this.subscribeToEvents();
        this.canSendMessage = this.productsSignalRService.connectionExists;
        this.getProducts();
    }

    public addNewProduct(): void {
        console.log("addNewProduct");
    }

    deleteProduct() {
        console.log("addNewProduct");
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

    public setClickedRow(/*index: any*/): void {
        //this.selectedRow = index;
        //this.selectedProduct = product;
    }
}