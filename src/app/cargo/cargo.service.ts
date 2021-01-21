import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cargo } from './cargo';

@Injectable({
  providedIn: 'root'
})
export class CargoService {
  private urlEndPoint: string = 'http://localhost:8080/api/cargo';

  constructor(private http: HttpClient) { }

  autocompleteList(term:string): Observable<Cargo[]> {
    if(!term){
      term="inexistente";
    }

    return this.http.get<Cargo[]>(`${this.urlEndPoint}/autocomplete/${term}`);
  }
}
