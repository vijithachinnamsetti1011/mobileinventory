import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient){}
  
 apicall<T>(method:'GET'|'POST'|'PUT'|'DELETE', endpoint:string, body?:any):Observable<T>{
  switch(method){
    case 'GET': return this.http.get<T>(endpoint)
    case 'POST': return this.http.post<T>(endpoint, body)
    case 'PUT': return this.http.put<T>(endpoint, body)
    case 'DELETE': return this.http.delete<T>(endpoint)
    default: throw new Error('Unsupported HTTP method');
  }
 }
}
