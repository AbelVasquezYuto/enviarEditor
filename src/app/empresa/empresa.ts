import { Local } from '../local/local';
import { TablaAuxiliarDetalle } from '../tabla-auxiliar/models/tabla-auxiliar-detalle';

export class Empresa {
  id: number;
  ruc: string;
  razonSocial: string;
  nombreComercial: string;
  direccionFiscal: string;
  telefono1: string;
  telefono2: string;
  correo: string;
  urlWeb: string;
  locales: Local[];
  estado: TablaAuxiliarDetalle;
  idUsuarioCrea: number;
  fechaCrea: string;
}
