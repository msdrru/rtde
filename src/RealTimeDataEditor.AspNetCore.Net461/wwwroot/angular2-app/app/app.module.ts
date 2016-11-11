import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ProductsService } from './products/productsService';
import { ProductsSignalRService } from './products/productsSignalRService';

@NgModule({
    imports: [BrowserModule, HttpModule, JsonpModule],

    declarations: [AppComponent, ProductsComponent],

    providers: [
        ProductsService,
        ProductsSignalRService
    ],

    bootstrap: [AppComponent]
})

export class AppModule { }