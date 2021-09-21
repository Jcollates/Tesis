import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  arrayofWords: any[] = [];
  constructor() { }

  ngOnInit(): void {
    this.setWords();
  }
  setWords(){
    this.arrayofWords = ["CALIDAD","CONFIABILIDAD","PUNTUALIDAD","RESPONSABILIDAD","ESFUERZO"]
  }

}
