import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.page.html',
  styleUrls: ['./secciones.page.scss'],
})
export class SeccionesPage implements OnInit {

  constructor() { }

  handleAction(item: string) {
    console.log('Acción realizada en el elemento:', item);
  }

  ngOnInit() {
  }

}
