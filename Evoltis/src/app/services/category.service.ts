import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { RequestResponseService } from "./requestResponse.service";
import { Observable } from "rxjs/internal/Observable";
import { Category } from "../interfaces/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories: string = `${environment.production}Category`;


  constructor(private requestResponseService: RequestResponseService) {
  }
  getCategories(): Observable<any> {
    return this.requestResponseService.makeGetRequest<any>(
      this.categories);
  }
  getAll(
    page: number,
    pageSize: number,
    idCategory: number,
    name: string
  ): Observable<any> {
    const body = {
      page: page,
      pageSize: pageSize,
      name: name,
      idCategory: idCategory ? idCategory : 0
    };
    return this.requestResponseService.makePostRequest<any>(
      this.categories, body);
  }
  delete(id?: number): Observable<any> {
    return this.requestResponseService.makeDeleteRequest<any>(this.categories + '/' + id);
  }
  add(category: Category): Observable<any> {
    return this.requestResponseService.makePutRequest<Category>(
      this.categories, category);
  }
}