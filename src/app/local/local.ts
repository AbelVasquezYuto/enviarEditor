import { Empresa } from '../empresa/empresa';
import { TablaAuxiliarDetalle } from '../tabla-auxiliar/models/tabla-auxiliar-detalle';

export class Local {
  id: number;
  nombre: string;
  abreviatura: string;
  nroPisos: number;
  direccion: string;
  telefono1: string;
  telefono2: string;
  observacion: string;
  empresa: Empresa;
  estado: TablaAuxiliarDetalle;
  idUsuarioCrea: number;
  fechaCrea: string;
}
