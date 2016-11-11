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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var ProductsService = (function () {
    function ProductsService(http) {
        this.http = http;
        this.productsUrl = 'http://localhost:16930/api/Products';
    }
    ProductsService.prototype.getProducts = function () {
        return this.http.get(this.productsUrl)
            .map(this.handleResponseData)
            .catch(this.handleResponseError);
    };
    ProductsService.prototype.handleResponseData = function (response) {
        var data = response.json();
        return data || {};
    };
    ProductsService.prototype.handleResponseError = function (response) {
        var message;
        if (response instanceof http_1.Response) {
            var body = response.json() || '';
            var err = body.error || JSON.stringify(body);
            message = response.status + " - " + (response.statusText || '') + " " + err;
        }
        else {
            message = response.message ? response.message : response.toString();
        }
        console.error(message);
        return Observable_1.Observable.throw(message);
    };
    ProductsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ProductsService);
    return ProductsService;
}());
exports.ProductsService = ProductsService;
//# sourceMappingURL=productsService.js.map