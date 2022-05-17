import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  getAllMaterials():  Observable<any>{
    return this.http.get<Observable<any>>(`${this.apiUrl}/material/all`);
  }

  getMaterialById(id: any): Observable<any> {
    return this.http.get<Observable<any>>(`${this.apiUrl}/material/` + id);
  } 

  searchMaterial(keyWord: string): Observable<any> {
    return this.http.get<Observable<any>>(`${this.apiUrl}/material/searchByName/` + keyWord);
  }

  
}
