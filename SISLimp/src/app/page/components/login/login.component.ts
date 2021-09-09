import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  active;
  cities: any[] = [];
  provinces: any[] = [];
  constructor() { }

  ngOnInit() {
    this.active = 1;
    this.cities = [
      {name: 'Ciudad 1', code: 1},
      {name: 'Ciudad 2', code: 2},
      {name: 'Ciudad 3', code: 3},
    ]
    this.provinces = [
      {name: 'Provincia 1', code: 1},
      {name: 'Provincia 2', code: 2},
      {name: 'Provincia 3', code: 3},
    ]
    console.log(this.cities);
  }

}
