import { TablaAuxiliarDetalle } from '../tabla-auxiliar/models/tabla-auxiliar-detalle';

export class CentroCosto {
  nro: number = 0;
  id: number;
  codigo: string;
  descripcion: string;
  abreviatura: string;
  observacion: string;
  estado: TablaAuxiliarDetalle;
  idUsuarioCrea: number;
  fechaCrea: string;
}
