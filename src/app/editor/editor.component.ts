import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';

interface Quill {
  getModule(moduleName: string);
}

interface BetterTableModule {
  insertTable(rows: number, columns: number): void;
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent implements OnInit {

  public quill: Quill;

  private get tableModule(): BetterTableModule {
    return this.quill.getModule("better-table");
  }

  public editorCreated(event: Quill): void {
    this.quill = event;
    // Example on how to add new table to editor
    this.addNewtable();
  }

  private addNewtable(): void {
    this.tableModule.insertTable(3, 3);
  }

  htmlContent = '<font face="Arial">sasdsd<b>sdsds<i>sdsds</i></b></font><p><font face="Arial"><b><i>sdsdsd<strike>sdsdsdsdsd</strike></i></b></font></p>';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text dddddddddddhere...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['undo',
        'redo', 'subscript',
        'superscript', 'heading', 'fontName']
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  htmlContent2 = ''

  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'direction': 'rtl' }],                         // text direction 
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean'],                                         // remove formatting button

      ['link', 'image']                         // link and image, video
    ]
  };

  editorStyle = {
    height: '200px'
  };

  constructor() { }

  ngOnInit(): void {

    this.config.placeholder = "dwdwd";


  }

  enviar(): void {
    console.log(this.htmlContent)
  }

  enviarQuill(): void {
    console.log(this.htmlContent2)
  }


  verCambio(event): void {
    console.log("afawf")
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    console.log('el evento', event)
  }

}
