import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private router: Router) {}

  goToView(view: string) {
    switch(view) {
      case 'Secciones':
        this.router.navigate(['/secciones']);
        break;
      case 'Config':
        this.router.navigate(['/config']);
        break;
      case 'Vista 3':
        this.router.navigate(['/vista3']);
        break;
      default:
        console.log('Vista no definida');
    }
  }
  ngOnInit() {
  }
}



