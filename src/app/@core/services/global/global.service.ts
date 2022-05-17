import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../model/material/user.model';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {
    this.user.asObservable();
   }

  apiUrl = 'http://localhost:3000/api'

  addToCart(id: any): Observable<any> {
    return this.http.post<Observable<any>>(`${this.apiUrl}/user/addToCart`, {
      idProduct: id
    });
  }

  deleteToCart(id: string): Observable<any> {
    return this.http.post<Observable<any>>(`${this.apiUrl}/user/deleteToCart`, {
      idProduct: id
    })
  }
}
