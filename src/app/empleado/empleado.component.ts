import { Component, OnInit } from '@angular/core';
import { Empleado } from './empleado';
import { EmpleadoService } from './empleado.service';
import { TablaAuxiliarService } from '../tabla-auxiliar/tabla-auxiliar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';
import { TablaAuxiliarDetalle } from '../tabla-auxiliar/models/tabla-auxiliar-detalle';
import { FormControl } from '@angular/forms';
import { Cargo } from '../cargo/cargo';
import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { CargoService } from '../cargo/cargo.service';
import { CentroCosto } from '../centro-costo/centro-costo';
import { Local } from '../local/local';
import { CentroCostoService } from '../centro-costo/centro-costo.service';
import { LocalService } from '../local/local.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {

  titulo:string = 'Empleados';
  nroDocumentoIdentidadFiltro: string = 'nroDocumentoIdentidad';
  nombreCompletoFiltro: string = 'nombreCompleto';
  columnaOrdenada: string = 'id';
  orden: number = 0;
  rutaPaginador:string = ''

  empleados: Empleado[];
  empleadoSeleccionado: Empleado = new Empleado();
  tiposDI: TablaAuxiliarDetalle[];
  contratos: TablaAuxiliarDetalle[];
  sexos: TablaAuxiliarDetalle[];
  estadosCiviles: TablaAuxiliarDetalle[];
  estados: TablaAuxiliarDetalle[];
  paginador: any;
  errores: string[];
  editable: number = -1;

  eventoNuevo: boolean = false;
  eventoModificar: boolean = false;
  autocompleteCargoControl = new FormControl();
  autocompleteCCControl = new FormControl();
  autocompleteLocalControl = new FormControl();

  cargosFiltrados: Observable<Cargo[]>;
  centrosCostoFiltrados: Observable<CentroCosto[]>;
  localesFiltrados: Observable<Local[]>;

  fotoSeleccionada: File;
  imagenVistaPrevia: string;


  constructor(private empleadoService: EmpleadoService,
    private cargoService: CargoService,
    private centroCostoService: CentroCostoService,
    private localService: LocalService,
    private tablaAuxiliarService: TablaAuxiliarService,
    private router: Router,
    public _authService: AuthService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.rutaPaginador = 'empleado/page/'+this.nroDocumentoIdentidadFiltro+'/'+this.nombreCompletoFiltro+'/'+this.columnaOrdenada+'/'+this.orden+'/';
    this.activatedRoute.paramMap.subscribe(params => {
      let nroDocumentoIdentidad:string = this.nroDocumentoIdentidadFiltro;
      let nombreCompleto:string = this.nombreCompletoFiltro;
      let columnSort:string = this.columnaOrdenada //params.get('columnSort');
      let order:number = this.orden //+params.get('order');
      let page:number = +params.get('page');

      nroDocumentoIdentidad = !nroDocumentoIdentidad?"nroDocumentoIdentidad":nroDocumentoIdentidad;
      nombreCompleto = !nombreCompleto?"descripcion":nombreCompleto;

      if(!columnSort){
        columnSort="id";
      }
      if(!order){
        order=0;
      }
      if (!page) {
        page = 0;
      }

      this.empleadoService.getEmpleados(nroDocumentoIdentidad,nombreCompleto,columnSort,order,page)
      .subscribe(response => {
        this.empleados = response.content as Empleado[];
        this.paginador = response;
      });

    });

    this.tablaAuxiliarService.getComboBox("TIPDID").subscribe(aux => this.tiposDI = aux);
    this.tablaAuxiliarService.getComboBox("TIPCON").subscribe(aux => this.contratos = aux);
    this.tablaAuxiliarService.getComboBox("TIPSEX").subscribe(aux => this.sexos = aux);
    this.tablaAuxiliarService.getComboBox("ESTCIV").subscribe(aux => this.estadosCiviles = aux);
    this.tablaAuxiliarService.getComboBox("ESTGRL").subscribe(aux => this.estados = aux);

    this.cargosFiltrados = this.autocompleteCargoControl.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.descripcion),
        flatMap(value => value ? this._filterCargos(value) : [])
      );
    this.centrosCostoFiltrados = this.autocompleteCCControl.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.descripcion),
        flatMap(value => value ? this._filterCC(value) : [])
      );
    this.localesFiltrados = this.autocompleteLocalControl.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.nombre),
        flatMap(value => value ? this._filterLocales(value) : [])
      );
  }

  private _filterCargos(value: string): Observable<Cargo[]> {
    return this.cargoService.autocompleteList(value);
  }

  private _filterCC(value: string): Observable<CentroCosto[]> {
    return this.centroCostoService.autocompleteList(value);
  }

  private _filterLocales(value: string): Observable<Local[]> {
    return this.localService.autocompleteList(value);
  }

  mostrarNombreCargo(cargo?: Cargo):string | undefined {
    return cargo?cargo.descripcion:undefined;
  }

  mostrarNombreCC(centroCosto?: CentroCosto):string | undefined {
    return centroCosto?centroCosto.descripcion:undefined;
  }

  mostrarNombreLocal(local?: Local):string | undefined {
    return local?local.nombre:undefined;
  }

  ordenar(columna: string) {
    if (!this.eventoNuevo) {
      this.columnaOrdenada = columna;
      this.orden = 1 - this.orden;

      this.empleadoService.getEmpleados(this.nroDocumentoIdentidadFiltro,this.nombreCompletoFiltro,this.columnaOrdenada,this.orden,0)
      .subscribe(response => {
        this.empleados = response.content as Empleado[];
        this.paginador = response;
      });
    }
  }

  filtrar(event, filtro: number) {
    //this.soloNumeros(event);
    if (filtro == 1) {
      if (!event.target.value) {
        this.nroDocumentoIdentidadFiltro = 'nroDocumentoIdentidad';
      }else {
        this.nroDocumentoIdentidadFiltro = event.target.value;
      }
    } else {
      if (!event.target.value) {
        this.nombreCompletoFiltro = 'nombreCompleto';
      } else {
        this.nombreCompletoFiltro = event.target.value;
      }
    }

    this.empleadoService.getEmpleados(this.nroDocumentoIdentidadFiltro,this.nombreCompletoFiltro,this.columnaOrdenada,this.orden,0)
    .subscribe(response => {
      this.empleados = response.content as Empleado[];
      this.paginador = response;
    });
  }

  mostrarEmpleado(empleado: Empleado, i: number): void {
    if (!this.eventoNuevo) {
      this.editable = i;
      this.eventoModificar = true;
      this.empleadoService.getEmpleado(empleado.id).subscribe(emp => {
        this.empleadoSeleccionado = emp;

        if (this.empleadoSeleccionado.foto) {
          this.imagenVistaPrevia = 'http://localhost:8080/api/uploads/img/'+ this.empleadoSeleccionado.foto;
        } else {
          this.fotoSeleccionada = null;
          this.imagenVistaPrevia = null;
        }
      });
    }
  }

  nuevo() {
    this.editable = -1;
    this.empleadoSeleccionado = new Empleado();
    this.eventoNuevo = true;
  }

  modificar() {
    this.eventoNuevo = true;
    this.eventoModificar = false;
  }

  cancelar() {
    this.empleadoSeleccionado = null;
    this.eventoNuevo = false;
    this.eventoModificar = false;
    this.editable = 0;
  }

  guardar(): void {
    //this.errorGuardado(null);
    if (this.empleadoSeleccionado.id === 0) {
      this.crear(this.empleadoSeleccionado);
    } else {
      this.actualizar(this.empleadoSeleccionado);
    }
  }

  crear(empleado: Empleado): void {
    this.empleadoService.create(empleado).subscribe(
      emp => {
        if (this.fotoSeleccionada) {
          this.empleadoService.subirFoto(this.fotoSeleccionada, emp.id).subscribe();
        }

        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/empleado']);
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  actualizar(empleado: Empleado): void {
    this.empleadoService.update(empleado).subscribe(
      json => {
        if (this.fotoSeleccionada) {
          this.empleadoService.subirFoto(this.fotoSeleccionada, empleado.id).subscribe();
        }

        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/empleado']);
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  compararAux(o1:TablaAuxiliarDetalle, o2:TablaAuxiliarDetalle):boolean {
    if (o1 === undefined && o2 === undefined){
      return true;
    }

    return o1 === null || o2 === null || o1 === undefined || o2 === undefined? false: o1.tablaAuxiliarDetalleId.id===o2.tablaAuxiliarDetalleId.id;
  }

  cargarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.fotoSeleccionada);
    reader.onloadend = () => this.imagenVistaPrevia = reader.result as string;
  }

  quitarFoto() {
    this.fotoSeleccionada = null;
    this.imagenVistaPrevia = null;
    this.empleadoSeleccionado.foto = null;
  }

}
