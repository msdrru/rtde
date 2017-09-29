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
    selectedProduct: Product;
    componentStatus: string = 'Hello!';

    //mode = 'Observable';

    constructor(private productsService: ProductsService, private productsSignalRService: ProductsSignalRService) {
        // this.subscribeToEvents();
        // this.canSendMessage = productsSignalRService.connectionExists;
    }

    public ngOnInit() {
        // this.subscribeToEvents();
        this.getProducts();
        this.productsSignalRService.startConnection();
    }

    public addNewProduct() {
        
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

    private getProducts() {
        this.products = this.productsService.products;

        this.productsService.getProducts()
            .subscribe((response: Product[]) => {
                    this.products = response;
                },
                (err: any) => console.log(err),
                () => console.log('getCustomersPage() retrieved customers'));
    }

    public setClickedRow(product: Product): void {
        //this.selectedRow = index;
        this.selectedProduct = product;
        console.log(product);
    }

    //private subscribeToEvents(): void {
    //    this.productsSignalRService.connectionEstablished.subscribe(() => {
    //        this.canSendMessage = true;
    //    });
    //}
}