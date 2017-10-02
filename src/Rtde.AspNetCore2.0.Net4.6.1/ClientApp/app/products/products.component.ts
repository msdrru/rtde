import { Component, OnInit } from '@angular/core'
import { ProductsService } from './products.service'
import { ProductsSignalRService } from './products-signalr.service'
import { Product } from './product'

@Component({
    selector: 'products',
    templateUrl: './products.component.html'
})

export class ProductsComponent implements OnInit {
    public canSendMessage: Boolean;
    errorMessage: string;
    public products: Product[];
    selectedProduct: Product;
    lastAddedProduct: Product;

    public componentStatus: string = 'Hello!';
    public addNewProductAllowed = true;

    constructor(private productsService: ProductsService,
        private productsSignalRService: ProductsSignalRService) {
        this.selectedProduct = new Product();

        this.productsSignalRService.productAddedEvent().subscribe(product => this.productAdded(product));
    }

    public ngOnInit() {
        this.getProducts();
        this.productsSignalRService.startConnection();
    }

    public addNewProduct() {
        this.addNewProductAllowed = false;

        this.lastAddedProduct = new Product();
        this.lastAddedProduct.name = 'New product';

        this.selectedProduct = this.lastAddedProduct;

        this.products.push(this.selectedProduct);
    }

    public deleteProduct(): void {
        if (this.selectedProduct != null) {
            this.productsSignalRService
                .removeProduct(this.selectedProduct.id)
                .subscribe(productId => {
                    console.log('deleteProduct() ' + productId);

                    this.products = this.products.filter(product => product.id !== productId);
                });
        } else {
            this.componentStatus = 'Please select a product from the table.';
        }
    }

    public saveProduct() {
        if (this.lastAddedProduct != null) {
            this.productsSignalRService.addProduct(this.lastAddedProduct);
            this.addNewProductAllowed = true;
        } else {
            this.productsSignalRService.saveProduct(this.selectedProduct);
        }
    }

    private getProducts() {
        this.products = this.productsService.products;

        this.productsService.getProducts()
            .subscribe((response: Product[]) => {
                    this.products = response;
                },
                (err: any) => console.log(err),
                () => console.log('getProducts() retrieved customers'));
    }

    public setClickedRow(product: Product): void {
        //this.selectedRow = index;
        this.selectedProduct = product;
        console.log(product);
    }

    private productAdded(product: Product) {
        console.log('productAdded() ' + product);
        this.products.push(product);
    }
}