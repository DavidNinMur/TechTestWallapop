import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ProductService } from './product.service';

import { DEFAULT_RESPONSE } from "./test-data/productTestData"


describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getProducts --> when call getProducts, should return data', () => {
    service.getProducts().subscribe((res) => {
      expect(res).toEqual(DEFAULT_RESPONSE);
    })
  })
});
