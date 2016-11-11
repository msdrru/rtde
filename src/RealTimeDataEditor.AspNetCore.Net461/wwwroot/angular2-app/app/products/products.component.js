"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var productsService_1 = require('./productsService');
var productsSignalRService_1 = require('./productsSignalRService');
var ProductsComponent = (function () {
    function ProductsComponent(productsService, productsSignalRService) {
        this.productsService = productsService;
        this.productsSignalRService = productsSignalRService;
        this.mode = 'Observable';
        this.subscribeToEvents();
        this.canSendMessage = productsSignalRService.connectionExists;
    }
    ProductsComponent.prototype.ngOnInit = function () {
        this.subscribeToEvents();
        this.getProducts();
    };
    ProductsComponent.prototype.addNewProduct = function () {
    };
    ProductsComponent.prototype.getProducts = function () {
        var _this = this;
        this.productsService.getProducts()
            .subscribe(function (products) { return _this.products = products; }, function (error) { return _this.errorMessage = error; });
    };
    ProductsComponent.prototype.subscribeToEvents = function () {
        var _this = this;
        this.productsSignalRService.connectionEstablished.subscribe(function () {
            _this.canSendMessage = true;
        });
    };
    ProductsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'products',
            templateUrl: 'products.component.html'
        }), 
        __metadata('design:paramtypes', [productsService_1.ProductsService, productsSignalRService_1.ProductsSignalRService])
    ], ProductsComponent);
    return ProductsComponent;
}());
exports.ProductsComponent = ProductsComponent;
//# sourceMappingURL=products.component.js.map