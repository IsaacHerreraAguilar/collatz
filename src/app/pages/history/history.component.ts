import { Component } from '@angular/core';
import { HistoryService } from 'src/app/services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})

export class HistoryComponent {

  // Series de collatz de todos los números 
  collatzList: [number[]] = [[]];

  // Serie más grande
  greatestSerie: number = 0;

  constructor(private historyService: HistoryService) { }

  // Trae el historial completo del servicio
  ngOnInit(): void {
    this.collatzList = this.historyService.getHistory();

    this.verifyGreatestSerie();
  }

  // Verifica cual es la serie con mayor tamaño y guarda su indice
  verifyGreatestSerie() {
    for(let i=0; i<this.collatzList.length; i++){

      if(this.collatzList[i].length > this.collatzList[this.greatestSerie].length){
        this.greatestSerie = i;
      }
    }
  }
}
