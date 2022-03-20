import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  arrayofWords: any[] = [];
  showLogin: boolean = true;
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.setWords();
    this.isUser();
  }
  setWords() {
    this.arrayofWords = ["CALIDAD", "CONFIABILIDAD", "PUNTUALIDAD", "RESPONSABILIDAD", "ESFUERZO"]
  }
  isUser() {
    let role = localStorage.getItem('role');
    if (role == 'USER') {
      this.showLogin = false;
    }
  }
  goToLogin() {
    if (!this.showLogin) {
      this.router.navigate(['page/products']);
    } else {
      this.router.navigate(['page/login']);
    }
  }

}
