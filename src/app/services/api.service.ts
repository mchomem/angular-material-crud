import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public server: string = "http://localhost:3000";
  public controller: string = 'products';

  constructor(private http: HttpClient) { }

  postProduct(data: any) {
    return this.http.post<any>(`${this.server}/${this.controller}`, data);
  }

  getProduct() {
    return this.http.get<any>(`${this.server}/${this.controller}`);
  }

  updateProduct(id: number, data: any) {
    return this.http.put<any>(`${this.server}/${this.controller}/${id}`, data);
  }

  deleteProduct(id: number) {
    return this.http.delete<any>(`${this.server}/${this.controller}/${id}`);
  }
}
