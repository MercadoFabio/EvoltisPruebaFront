import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  items?: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Product',
        icon: 'pi pi-fw pi-file',
        routerLink: '/product'
      },
      {
        label: 'Category',
        icon: 'pi pi-fw pi-file',
        routerLink: '/category'
      }
    ];
  }
}
