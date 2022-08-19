import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'https://mac-market-app.herokuapp.com/api/user'

  connected = new BehaviorSubject<boolean>(false);
  error = new BehaviorSubject<any | null>(null);

  constructor(private http: HttpClient) { }

  getToken() {
    return localStorage.getItem('token')
  }

  onRegister(name: String, username: String, email: String, password: String): Observable<any> {
    return this.http.post<Observable<any>>(`${this.apiUrl}/register`, {
      name: name,
      username: username,
      email: email,
      password: password
    })
  }

  onLogin(username: String, password: String): Observable<any> {
    return this.http.post<Observable<any>>(`${this.apiUrl}/login`, {
      username: username,
      password: password
    })
  }
}
