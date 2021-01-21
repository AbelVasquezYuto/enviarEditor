import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
//import emlformat from 'eml-format'

//import * as emlformat from 'eml-format';
//var emlformat = require('eml-format');

@Component({
  selector: 'app-modaleml',
  templateUrl: './modaleml.component.html',
  styleUrls: ['./modaleml.component.css']
})
export class ModalemlComponent implements OnInit {

  fotoSeleccionada: File
  fotoMostrar: string
  constructor() { }

  ngOnInit(): void {

  }

  cargarFoto(event) {

    /*
    this.fotoSeleccionada = event.target.files[0];

    if (this.fotoSeleccionada) {
      var r = new FileReader();
      r.onload = function (e) {
        var contents = e.target.result;
      }
      r.readAsText(this.fotoSeleccionada);
      console.log(emlformat)
      emlformat.parse(r, function (error, data) {
        if (error) return console.log(error);
        
        console.log(data);
        console.log("Done!");
      });


    } else {
      alert("Failed to load file");
    }



    this.fotoMostrar = this.fotoSeleccionada.name;
*/
  }

  subir(): void {
    console.log("ver")
  }
}
