import { Component } from '@angular/core';
import { HistoryService } from 'src/app/services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})

export class HistoryComponent {

  collatzList: [number[]] = [[]];

  greatestSerie: number = 0;

  constructor(private historyService: HistoryService) { }

  ngOnInit(): void {
    this.collatzList = this.historyService.getHistory();

    this.verifyGreatestSerie();
  }

  verifyGreatestSerie() {
    for(let i=0; i<this.collatzList.length-1; i++){
      if(this.collatzList[i+1].length > this.collatzList[i].length){
        this.greatestSerie = i+1;
      }
    }

    console.log(this.greatestSerie);
  }
}
