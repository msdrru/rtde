import { Injectable, EventEmitter } from '@angular/core';

declare var $: any;

@Injectable()
export class ProductsSignalRService {

    private proxy: any;
    private connection: any;

    public productChanged: EventEmitter<any>;
    public messageReceived: EventEmitter<any>;
    public connectionEstablished: EventEmitter<Boolean>;
    public connectionExists: Boolean;

    constructor() {
        this.productChanged = new EventEmitter();
        this.connectionEstablished = new EventEmitter<Boolean>();
        this.messageReceived = new EventEmitter<any>();
        this.connectionExists = false;

        this.connection = $.hubConnection('http://localhost:16930/' + 'signalr/');
        this.proxy = this.connection.createHubProxy('productMessageHub');

        this.registerOnServerEvents();

        this.startConnection();
    }

    public sendChatMessage(message: any) {
        this.proxy.invoke('SendMessage', message);
    }

    private startConnection(): void {
        this.connection.start().done((data: any) => {
            console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id);
            this.connectionEstablished.emit(true);
            this.connectionExists = true;
        }).fail((error: any) => {
            console.log('Could not connect ' + error);
            this.connectionEstablished.emit(false);
        });
    }

    private registerOnServerEvents(): void {
        this.proxy.on('HandleProductMessage', (data: any) => {
            this.productChanged.emit(data);
        });
    }
}