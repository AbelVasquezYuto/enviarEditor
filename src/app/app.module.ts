import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContenteditableModule } from '@ng-stack/contenteditable';
import { LoginComponent } from './usuarios/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { TokenInterceptor } from './usuarios/interceptors/token.interceptor';
import { AuthInterceptor } from './usuarios/interceptors/auth.interceptor';
import { HeaderComponent } from './header/header.component';
import { CentroCostoComponent } from './centro-costo/centro-costo.component';
import { TablaAuxiliarComponent } from './tabla-auxiliar/tabla-auxiliar.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { CentroCostoService } from './centro-costo/centro-costo.service';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TablaAuxiliarService } from './tabla-auxiliar/tabla-auxiliar.service';

import { AngularEditorModule } from '@kolkov/angular-editor';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { EmpresaComponent } from './empresa/empresa.component';
import { LocalComponent } from './local/local.component';
import { CargoComponent } from './cargo/cargo.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { LocalService } from './local/local.service';
import { CargoService } from './cargo/cargo.service';
import { EmpleadoService } from './empleado/empleado.service';
import { EmlComponent } from './eml/eml.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalemlComponent } from './modaleml/modaleml.component';
import { EditorComponent } from './editor/editor.component';

import { QuillConfig, QuillModule } from 'ngx-quill';
import * as Quill from 'quill';
import QuillBetterTable from 'quill-better-table';
import { TablepruebaComponent } from './tableprueba/tableprueba.component';
import { ResizableModule } from './resizable/resizable.module';

registerLocaleData(localeES, 'es');

Quill.register(
  {
    'modules/better-table': QuillBetterTable
  },
  true
);

const quillConfig: QuillConfig = {
  modules: {
    table: false, // disable table module
    "better-table": {
      operationMenu: {
        items: {
          unmergeCells: {
            text: "Another unmerge cells name"
          }
        },
        color: {
          colors: ["#fff", "red", "rgb(0, 0, 0)"], // colors in operationMenu
          text: "Background Colors" // subtitle
        }
      }
    }
    /*,
    keyboard: {
      bindings: QuillBetterTable.keyboardBindings
    }*/
  }
};

const routes: Routes = [
  {path: 'table', component: TablepruebaComponent},
  {path: 'editor', component: EditorComponent},
  {path: 'eml', component: EmlComponent},
  {path: 'login', component: LoginComponent},
  {path: 'centro_costo', component: CentroCostoComponent},
  {path: 'centro_costo/:id', component: CentroCostoComponent},
  {path: 'centro_costo/page/:codigo/:descripcion/:columnSort/:order/:page', component: CentroCostoComponent},
  {path: 'empleado', component: EmpleadoComponent},
  {path: 'empleado/:id', component: EmpleadoComponent},
  {path: 'empleado/page/:nroDocumentoIdentidad/:nombreCompleto/:columnSort/:order/:page', component: EmpleadoComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    CentroCostoComponent,
    TablaAuxiliarComponent,
    PaginatorComponent,
    EmpresaComponent,
    LocalComponent,
    CargoComponent,
    EmpleadoComponent,
    EmlComponent,
    ModalemlComponent,
    EditorComponent,
    TablepruebaComponent
  ],
  imports: [
    ResizableModule,
    QuillModule.forRoot(quillConfig),
    MatDialogModule,
    AngularEditorModule,
    BrowserModule,
    HttpClientModule,
    ContenteditableModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ReactiveFormsModule, MatAutocompleteModule, MatInputModule, MatFormFieldModule
  ],
  providers: [
    LocalService,
    CargoService,
    CentroCostoService,
    TablaAuxiliarService,
    EmpleadoService,
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
