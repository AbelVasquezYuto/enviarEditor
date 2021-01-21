import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CentroCosto } from './centro-costo';
import { AuthService } from '../usuarios/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CentroCostoService } from './centro-costo.service';
import { TablaAuxiliarDetalle } from '../tabla-auxiliar/models/tabla-auxiliar-detalle';
import { TablaAuxiliarService } from '../tabla-auxiliar/tabla-auxiliar.service';
//import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
//import { map, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-centro-costo',
  templateUrl: './centro-costo.component.html',
  styleUrls: ['./centro-costo.component.css']
})
export class CentroCostoComponent implements OnInit {

  titulo:string = 'Centros de Costo';
  codigoFiltro: string = 'codigo';
  descripcionFiltro: string = 'descripcion';
  columnaOrdenada: string = 'id';
  orden: number = 0;
  rutaPaginador:string = ''//'centro_costo/page/'+this.codigoFiltro+'/'+this.descripcionFiltro+'/'+this.columnaOrdenada+'/'+this.orden+'/';

  centrosCosto: CentroCosto[];
  centroCostoSeleccionado: CentroCosto = new CentroCosto();
  paginador: any;
  errores: string[];
  editable: number = -1;

  //autocompleteControl = new FormControl();
  estados: Observable<TablaAuxiliarDetalle[]>;
  //displayAutocompletado: string = 'none';
  eventoNuevo: boolean = false;
  autoEstado: string;

  @ViewChild('tablaDetalle') tabla: ElementRef;

  constructor(private centroCostoService: CentroCostoService,
    private tablaAuxiliarService: TablaAuxiliarService,
    private router: Router,
    public _authService: AuthService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.rutaPaginador = 'centro_costo/page/'+this.codigoFiltro+'/'+this.descripcionFiltro+'/'+this.columnaOrdenada+'/'+this.orden+'/';
    this.activatedRoute.paramMap.subscribe(params => {
      let codigo:string = this.codigoFiltro;
      let descripcion:string = this.descripcionFiltro;
      let columnSort:string = this.columnaOrdenada //params.get('columnSort');
      let order:number = this.orden //+params.get('order');
      let page:number = +params.get('page');

      codigo = !codigo?"codigo":codigo;
      descripcion = !descripcion?"descripcion":descripcion;

      if(!columnSort){
        columnSort="id";
      }
      if(!order){
        order=0;
      }
      if (!page) {
        page = 0;
      }
      console.log("paramaetros: "+codigo+":"+descripcion+":"+columnSort+":"+order+":"+page)
      this.centroCostoService.getCentrosCosto(codigo,descripcion,columnSort,order,page)
      .subscribe(response => {
        this.centrosCosto = response.content as CentroCosto[];
        console.log("centro de costo")
        console.log( this.centrosCosto);
        this.paginador = response;
      });

    });
  }

  private _filter(value: string): Observable<TablaAuxiliarDetalle[]> {
    const filterValue = value.toUpperCase();
    return this.tablaAuxiliarService.autocompleteList("ESTGRL", filterValue);
  }

  mostrarNombre(estado?: TablaAuxiliarDetalle):string | undefined {
    return estado?estado.nombre:undefined;
  }

  cambiarValor(event): void {
    if (event.keyCode != 38 && event.keyCode != 40) {
      this.autoEstado = event.target.value;
      this.estados = this.autoEstado ? this._filter(this.autoEstado): new Observable<TablaAuxiliarDetalle[]>();
    }
  }

  limpiarValor(): void {
    this.autoEstado = null;
    this.estados = new Observable<TablaAuxiliarDetalle[]>();
  }

  ordenar(columna: string) {
    console.log("Entro")
    if (!this.eventoNuevo) {
      this.columnaOrdenada = columna;
      this.orden = 1 - this.orden;

      this.centroCostoService.getCentrosCosto(this.codigoFiltro,this.descripcionFiltro,this.columnaOrdenada,this.orden,0)
      .subscribe(response => {
        this.centrosCosto = response.content as CentroCosto[];
        this.paginador = response;
      });
    }
  }

  filtrar(event, filtro: number) {
    this.soloNumeros(event);
    if (filtro == 1) {
      if (!event.target.value) {
        this.codigoFiltro = 'codigo';
      }else {
        this.codigoFiltro = event.target.value;
      }
    } else {
      if (!event.target.value) {
        this.descripcionFiltro = 'descripcion';
      } else {
        this.descripcionFiltro = event.target.value;
      }
    }

    this.centroCostoService.getCentrosCosto(this.codigoFiltro,this.descripcionFiltro,this.columnaOrdenada,this.orden,0)
    .subscribe(response => {
      this.centrosCosto = response.content as CentroCosto[];
      this.paginador = response;
    });
  }

  agregarFila(): void {
    this.centroCostoSeleccionado = new CentroCosto();
    this.centroCostoSeleccionado.nro = (this.paginador.size*this.paginador.pageable.pageNumber) + this.paginador.numberOfElements + 1;
    this.centroCostoSeleccionado.id = 0;
    /*
    this.tablaAuxiliarService.obtenerPorNombre('ESTGRL', 'ACTIVO').subscribe(
      (estado) => this.centroCostoSeleccionado.estado = estado
    );*/
    //this.centroCostoSeleccionado.idUsuarioCrea = this._authService.usuario.id;
    console.log(this.centroCostoSeleccionado)
    this.editable = this.paginador.numberOfElements;
    this.eventoNuevo = true;
    this.centrosCosto.push(this.centroCostoSeleccionado);
  }

  habilitarModificado(index: number, id: number): void {
    this.centroCostoService.getCentroCosto(id).subscribe(
      (centroCosto) => this.centroCostoSeleccionado = centroCosto
    );
    this.editable = index;
    this.eventoNuevo = true;

    //this.tabla.nativeElement.tBodies[0].rows[1].cells[1].children[0].focus();
  }

  deshabilitarModificado(): void {
    this.editable = -1;
    this.eventoNuevo = false;

    this.activatedRoute.paramMap.subscribe(params => {
      let page:number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.centroCostoService.getCentrosCosto(this.codigoFiltro,this.descripcionFiltro,this.columnaOrdenada,this.orden,page)
      .subscribe(response => {
        this.centrosCosto = response.content as CentroCosto[];
        this.paginador = response;
      });
    });

    this.centroCostoSeleccionado = null;
  }

  errorGuardado(centroCosto: CentroCosto): boolean {
    if (!centroCosto) {
      return true;
    }
    if (!centroCosto.codigo || !centroCosto.descripcion || !centroCosto.estado.tablaAuxiliarDetalleId) {
      return true;
    }
    return false;
  }

  guardar(centroCosto: CentroCosto): void {
    console.log("guardar click")
    //this.errorGuardado(null);
    if (centroCosto.id === 0) {
      this.crear(centroCosto);
      console.log("ESTTE ES EL REGUSTRO")
      console.log(centroCosto)
    } else {
      this.actualizar(centroCosto);
    }
  }

  crear(centroCosto: CentroCosto): void {
    this.centroCostoService.create(centroCosto).subscribe(
      centroCosto => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/centro_costo']);
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  actualizar(centroCosto: CentroCosto): void {
    console.log("ESTTE ES EL REGUSTRO PARA ACTUALIZAR")
      console.log(centroCosto)
    this.centroCostoService.update(centroCosto).subscribe(
      json => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/centro_costo']);
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  soloNumeros(event): void {
    if (event.keyCode < 48 || event.keyCode > 57) {
      event.preventDefault();
    }
  }

  noCaracteresEspeciales(event): void {
    let chr = String.fromCharCode(event.which);
    if ("></\"".indexOf(chr) >= 0) {
      event.preventDefault();
    }
  }
}
