import { Component, OnInit } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-tableprueba',
  templateUrl: './tableprueba.component.html',
  styleUrls: ['./tableprueba.component.css']
})


export class TablepruebaComponent implements OnInit {

  readonly rows = [
    ["King Arthur", "-", "Arrested"],
    ["Sir Bedevere", "The Wise", "Arrested"],
    ["Sir Lancelot", "The Brave", "Arrested"],
    ["Sir Galahad", "The Chaste", "Killed"],
    ["Sir Robin", "The Not-Quite-So-Brave-As-Sir-Lancelot", "Killed"],
  ];

  constructor() { }

  ngOnInit(): void {

    (<any>$("#sample")).colResizable({ liveDrag: true })(jQuery);

    (<any>$("#sample2")).colResizable({
      liveDrag: true,
      gripInnerHtml: "<div class='grip'></div>",
      draggingClass: "dragging"
    })(jQuery);


    (<any>$("#nonFixedSample")).colResizable({
      fixed: false,
      liveDrag: true,
      gripInnerHtml: "<div class='grip2'></div>",
      draggingClass: "dragging"
    })(jQuery);

  }

}
