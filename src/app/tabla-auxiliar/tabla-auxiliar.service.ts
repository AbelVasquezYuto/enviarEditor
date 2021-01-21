import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { TablaAuxiliarDetalle } from './models/tabla-auxiliar-detalle';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TablaAuxiliarService {
  private urlEndPoint: string = 'http://localhost:8080/api/tabla_auxiliar_detalle';

  constructor(private http: HttpClient, private router: Router) { }

  autocompleteList(codTablaAuxiliar: string, nombre:string): Observable<TablaAuxiliarDetalle[]> {
    if(!nombre){
      nombre="inexistente";
    }
    return this.http.get<TablaAuxiliarDetalle[]>(`${this.urlEndPoint}/autocomplete/${codTablaAuxiliar}/${nombre}`);
  }

  getComboBox(codTablaAuxiliar: string): Observable<TablaAuxiliarDetalle[]> {
    return this.http.get<TablaAuxiliarDetalle[]>(`${this.urlEndPoint}/combo_box/${codTablaAuxiliar}`);
  }

  obtenerPorNombre(codTablaAuxiliar: string, nombre:string): Observable<TablaAuxiliarDetalle> {
    return this.http.get<TablaAuxiliarDetalle>(`${this.urlEndPoint}/${codTablaAuxiliar}/${nombre}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/']);
          console.error(e.error.mensaje);
        }

        return throwError(e);
      })
    );
  }
}
