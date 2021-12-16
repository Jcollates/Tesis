import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-gestion-servicios',
  templateUrl: './gestion-servicios.component.html',
  styleUrls: ['./gestion-servicios.component.css']
})
export class GestionServiciosComponent implements OnInit {

  cols: any[];
  showDetail: boolean = false;
  dataFromdb: any[] = [];
  sizeRecords: number = 50;
  pageSize: number = 50;
  constructor() { }

  ngOnInit(): void {
    this.createCols()
  }

  createCols(){
    this.cols = [
      { field: 'codeCita', header: 'Código cita' },
      { field: 'date', header: 'Fecha' },
      { field: 'nameemplyee', header: 'Nombre empleado' },
      { field: 'client', header: 'Cliente'},
      { field: 'assigmenthour', header: 'Hora asignada'},
      { field: 'status', header: 'Estado'},
      { field: 'duration', header: 'Duración'},
      { field: 'price', header: 'Precio'},
      { field: 'seqservice', header: 'Seq. servicio'}
    ];
  }
  chargeData(event: LazyLoadEvent){
    setTimeout(() => {
      this.dataFromdb = [
        {codeCita: 1, date: '17/12/2021', nameemplyee: 'Carlos', client: 'Arana', assigmenthour: '10 am',status: 'COMPLETADO',duration: '2 horas', price: 1622.00,seqservice: 6},
        {codeCita: 2, date: '18/12/2021', nameemplyee: 'Pepe', client: 'Arana', assigmenthour: '10 am' ,status: 'COMPLETADO',duration: '3 meses', price: 1622.00,seqservice: 6},
        {codeCita: 3, date: '20/12/2021', nameemplyee: 'Jose', client: 'Arana', assigmenthour: '10 am' ,status: 'PENDIENTE',duration: '2 horas', price: 1622.00,seqservice: 6 },
      ]
    }, 1000);
    
  }
  onRowSelect(event: any){
    this.showDetail = true;

    // console.log(event);
  }

}
