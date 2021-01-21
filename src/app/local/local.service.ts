import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Local } from './local';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  private urlEndPoint: string = 'http://localhost:8080/api/local';

  constructor(private http: HttpClient) { }

  autocompleteList(term:string): Observable<Local[]> {
    if(!term){
      term="inexistente";
    }

    return this.http.get<Local[]>(`${this.urlEndPoint}/autocomplete/${term}`);
  }
}
