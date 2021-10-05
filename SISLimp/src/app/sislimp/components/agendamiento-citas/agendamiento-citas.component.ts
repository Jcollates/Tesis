import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agendamiento-citas',
  templateUrl: './agendamiento-citas.component.html',
  styleUrls: ['./agendamiento-citas.component.css']
})
export class AgendamientoCitasComponent implements OnInit {

  cars: any[] = [];
  products: any[] = [];
  drop: any[] = [];
  fordropt: any
  constructor() { }

  ngOnInit(): void {
    this.products = [
      { code: 1, name: 'NAME', category: 'TESTING', quantity: 1000 },
      { code: 1, name: 'NAME', category: 'TESTING', quantity: 1000 },
      { code: 1, name: 'NAME', category: 'TESTING', quantity: 1000 },
    ]
    this.drop = [
      { code: 1, name: 'NAME 1', text: 'Aki' },
      { code: 2, name: 'NAME 2', text: 'No' },
      { code: 3, name: 'NAME ', text: 'Se' },
    ]
    console.log(this.products);
    console.log(this.drop);
  }

}
