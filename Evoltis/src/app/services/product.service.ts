import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { RequestResponseService } from './requestResponse.service';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})
export class ProductService {


    private products: string = `${environment.production}Product`;
    private categories: string = `${environment.production}Category`;


    constructor(private requestResponseService: RequestResponseService) { }

    getAll(
        page: number,
        pageSize: number,
        name: string,
        idCategory: number
    ): Observable<any> {
        const body = {
            page: page,
            pageSize: pageSize,
            name: name,
            idCategory: idCategory ? idCategory : 0
        };
        return this.requestResponseService.makePostRequest<any>(
            this.products, body);
    }
    get(): Observable<any> {
        return this.requestResponseService.makeGetRequest<Product>(
            this.products);
    }

    add(product: Product): Observable<any> {
        return this.requestResponseService.makePutRequest<Product>(
            this.products, product);
    }

    delete(id?: number): Observable<any> {
        return this.requestResponseService.makeDeleteRequest<any>(this.products + '/' + id);
    }

}
