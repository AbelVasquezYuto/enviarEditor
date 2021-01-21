import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { CentroCosto } from './centro-costo';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CentroCostoService {
  private urlEndPoint: string = 'http://localhost:8080/api/centro_costo';

  constructor(private http: HttpClient, private router: Router) { }

  autocompleteList(term:string): Observable<CentroCosto[]> {
    if(!term){
      term="inexistente";
    }

    return this.http.get<CentroCosto[]>(`${this.urlEndPoint}/autocomplete/${term}`);
  }

  getCentrosCosto(codigo: string, descripcion: string, columnSort: string, order: number, page: number): Observable<any>{
    let i: number = 0;
    return this.http.get<CentroCosto[]>(`${this.urlEndPoint}/page/${codigo}/${descripcion}/${columnSort}/${order}/${page}`)
    .pipe(
      tap((response:any) => {
        i = (response.pageable.pageNumber)*response.size;
      }),
      map((response: any) => {
        (response.content as CentroCosto[]).map(cc => {
          cc.nro = ++i;
          return cc;
        });
        return response;
      })
    );
  }

  getCentroCosto(id: number): Observable<CentroCosto> {
    return this.http.get<CentroCosto>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/']);
          console.error(e.error.mensaje);
        }

        return throwError(e);
      })
    );
  }

  create(centroCosto: CentroCosto): Observable<CentroCosto> {
    return this.http.post(this.urlEndPoint, centroCosto).pipe(
      map((response: any) => response.centroCosto as CentroCosto),
      catchError(e => {
        if (e.status==400){
          return throwError(e);
        }

        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }

        return throwError(e);
      })
    )
  }

  update(centroCosto: CentroCosto): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${centroCosto.id}`, centroCosto).pipe(
      catchError(e => {
        if (e.status==400){
          return throwError(e);
        }

        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }

        return throwError(e);
      })
    );
  }
}
