import { TablaAuxiliarDetalle } from '../tabla-auxiliar/models/tabla-auxiliar-detalle';

export class Cargo {
  id: number;
  descripcion: string;
  abreviatura: string;
  observacion: string;
  estado: TablaAuxiliarDetalle;
  idUsuarioCrea: number;
  fechaCrea: string;  
}
