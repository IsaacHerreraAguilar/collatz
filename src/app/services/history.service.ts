import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class HistoryService {

  collatzHistory: [number[]] = [[]];

  activeSeries: [number[]] = [[]];

  addSerie(serie: number[]){
    this.collatzHistory.push(serie);
  }

  pivote: [number[]] = [[]];

  getHistory(): [number[]] {
    return this.collatzHistory;
  }

  addActiveSerie(serie: number[]){
    this.activeSeries.push(serie);
  }

  deleteActiveSerie(serie: number[]){

    // Se usó un arreglo pivote, ya que al parecer el método splice corrompia el arreglo
    this.pivote = [[]];

    for(let i=1; i<this.activeSeries.length; i++){
      if(this.activeSeries[i] != serie){
        this.pivote.push(this.activeSeries[i]);
      }
    }

    this.activeSeries = this.pivote;

    // let index = this.activeSeries.indexOf(serie);

    //this.activeSeries.splice(index, 1);  //ESTO NO FUNCIONA BIEN
  }

  getActiveSeries(): [number[]]{
    return this.activeSeries;
  }

  clearActiveSeries() {
    this.activeSeries = [[]];
  }
}
