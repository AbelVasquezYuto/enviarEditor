import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Empleado } from './empleado';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private urlEndPoint: string = 'http://localhost:8080/api/empleado';

  constructor(private http: HttpClient, private router: Router) { }

  getEmpleados(nroDocumentoIdentidad: string, nombreCompleto: string, columnSort: string, order: number, page: number): Observable<any> {
    let i: number = 0;
    return this.http.get<Empleado[]>(`${this.urlEndPoint}/page/${nroDocumentoIdentidad}/${nombreCompleto}/${columnSort}/${order}/${page}`)
      .pipe(
        tap((response:any) => {
          i = (response.pageable.pageNumber)*response.size;
        }),
        map((response: any) => {
          (response.content as Empleado[]).map(emp => {
            emp.nro = ++i;
            return emp;
          });

          return response;
        })
      );
  }

  getEmpleado(id: number): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/']);
          console.error(e.error.mensaje);
        }

        return throwError(e);
      })
    );
  }

  create(empleado: Empleado): Observable<Empleado> {
    return this.http.post(this.urlEndPoint, empleado).pipe(
      map((response: any) => response.empleado as Empleado),
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

  update(empleado: Empleado): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${empleado.id}`, empleado).pipe(
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

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>>{
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true
    });

    return this.http.request(req);
  }
}
