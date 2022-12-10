import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AllProductsResponse } from "../../models/productBackend";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  getAllProductsUrl = "https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/items.json"

  constructor(private http: HttpClient) { }

  getProducts(): Observable<AllProductsResponse> {
    return this.http.get<any>(this.getAllProductsUrl)
  }
}
