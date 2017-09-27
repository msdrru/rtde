import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ProductsService } from './products/productsService'

@NgModule({
    declarations: [
        AppComponent,
        ProductsComponent,
        ProductsService
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule/*,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ])*/
    ]
})
export class AppModuleShared {
}
