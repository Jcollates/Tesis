import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navigatebar',
  templateUrl: './navigatebar.component.html',
  styleUrls: ['./navigatebar.component.css']
})
export class NavigatebarComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) document
  ) { }

  ngOnInit(): void {
    //preguntarpor el login 
  }

  styleAdd() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('navbar-mobile');
  }
}
