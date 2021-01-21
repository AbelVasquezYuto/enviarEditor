import { TablaAuxiliarDetalle } from '../tabla-auxiliar/models/tabla-auxiliar-detalle';
import { Cargo } from '../cargo/cargo';
import { CentroCosto } from '../centro-costo/centro-costo';
import { Local } from '../local/local';

export class Empleado {
  nro: number = 0;
  id: number;
  tipoDocumentoIdentidad: TablaAuxiliarDetalle;
  nroDocumentoIdentidad: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nombre: string;
  nombreCompleto: string;
  sexo: TablaAuxiliarDetalle;
  estadoCivil: TablaAuxiliarDetalle;
  fechaNacimiento: string;
  correo: string;
  telefono1: string;
  telefono2: string;
  direccionActual: string;
  cargo: Cargo;
  centroCosto: CentroCosto;
  local: Local;
  tipoContrato: TablaAuxiliarDetalle;
  fechaInicioTrabajo: string;
  fechaFinTrabajo: string;
  foto: string;
  estado: TablaAuxiliarDetalle;
  idUsuarioCrea: number;
  fechaCrea: string;

  public obtenerNombreCompleto(): string {
    return this.apellidoPaterno + ' ' + this.apellidoMaterno + ' ' + this.nombre;
  }
}
