import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../model/material/user.model';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  user = new BehaviorSubject<User | null>(null);
  refreshStatus = false;

  constructor(private http: HttpClient) {
    this.user.asObservable();
   }

  apiUrl = 'http://localhost:3000/api'

  addToCart(id: any): Observable<any> {
    return this.http.post<Observable<any>>(`${this.apiUrl}/user/addToCart`, {
      idProduct: id
    });
  }

  createPayment(idUser: string, idProduct: string) {
    return this.http.post<Observable<any>>(`${this.apiUrl}/user/createPayment`, {
      idUser: idUser,
      idProduct: idProduct
    })
  }

  getPayment(idPayment: any): Observable<any> {
    return this.http.get<Observable<any>>(`${this.apiUrl}/user/getPayment/` + idPayment)
  }

  listPayment(): Observable<any>{
    return this.http.get<Observable<any>>(`${this.apiUrl}/user/listPayment`)
  }

  deleteToCart(id: string): Observable<any> {
    return this.http.post<Observable<any>>(`${this.apiUrl}/user/deleteToCart`, {
      idProduct: id
    })
  }

  onUpdateUser(name: string, username: string, wallet: number): Observable<any> {    
    return this.http.put<Observable<any>>(`${this.apiUrl}/user/updateUser`, {
      name: name,
      username: username,
      wallet: wallet
    })
  }
}
