import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalemlComponent } from '../modaleml/modaleml.component';

@Component({
  selector: 'app-eml',
  templateUrl: './eml.component.html',
  styleUrls: ['./eml.component.css']
})
export class EmlComponent implements OnInit {

  emlSeleccionado: File;
  fotoMostrar: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  cargarFoto(event) {
    this.emlSeleccionado = event.target.files[0];

    this.fotoMostrar = this.emlSeleccionado.name;

  }

  abrirModal(): void{
    this.dialog.open(ModalemlComponent, { data: "valor", disableClose: true, autoFocus: false });
  }

}
