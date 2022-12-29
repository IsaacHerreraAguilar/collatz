import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class HistoryService {

  collatzHistory: [number[]] = [[]];

  addSerie(serie: number[]){
    this.collatzHistory.push(serie);
  }

  getHistory(): [number[]] {
    return this.collatzHistory;
  }
}
