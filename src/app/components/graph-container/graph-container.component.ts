import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Options } from 'highcharts';
import { HistoryService } from 'src/app/services/history.service';

@Component({
  selector: 'app-graph-container',
  templateUrl: './graph-container.component.html',
  styleUrls: ['./graph-container.component.css'],
})

export class GraphContainerComponent {

  @Input() newValue: number = 0;

  @Input() deletedSerie: number = 0;

  @Output() outputList: EventEmitter<number[]> = new EventEmitter<number[]>();

  seriesId: number[] = [];

  collatzValue: number = 0;

  cicle = false;

  collatzSerie: number[] = [];

  Highcharts = Highcharts;

  counter: number = 1;

  chartRef: any;
  updateFlag: any;

  // linechart: any = {
  //   series: [
  //     {
  //       data: [1,2,3]
  //     },
  //     {
  //       data: [10,50,5]
  //     },
  //   ],
  //   chart: {
  //     type: 'line',
  //   },
  //   title: {
  //     text: 'grafico de lineas',
  //   },
  // };

  // chart = new Highcharts.Chart({
  //   chart: {
  //     type: 'line'
  //   },
  //   title: {
  //     text: 'GRAFICO BLABLA'
  //   },
  //   series: [{
  //     name: 'linea1',
  //     type: 'line',
  //     data: [1, 2, 3]
  //   }]
  // });

  chartW: Options = {
    chart: {
      type: 'line'
    },
    title: {
      text: 'GRAFICO BLABLA'
    },
    series: [
      // {
      //   type: 'line',
      //   data: [1,2,3]
      // }
    ]
  };

  constructor(private historyService: HistoryService) { }

  chartCallback: Highcharts.ChartCallbackFunction = chart => {
    this.chartRef = chart;
  };

  updateChart(): void {
    this.chartRef.series[0].update({
      type: 'column'
    });
  }

  ngOnChanges(changes: SimpleChanges) {

    if(typeof changes['newValue'] != 'undefined'){
      if(changes['newValue'].previousValue != undefined){

        if(changes['newValue'].currentValue != changes['newValue'].previousValue){
  
          this.collatzValue = this.newValue;
  
          if(this.collatzValue != 4){
            this.cicle = false;
          } else {
            this.cicle = true;
          }
          
          this.collatz();
        }
      }
    }

    if(typeof changes['deletedSerie'] != 'undefined'){
      if(changes['deletedSerie'].previousValue != undefined){
        if(changes['deletedSerie'].currentValue != changes['deletedSerie'].previousValue){
          this.removeSerie(this.deletedSerie);
        }
      }
    }

  }

  collatz() {

    this.collatzSerie.push(this.collatzValue);

    if(this.collatzValue % 2 == 0){
      this.collatzValue = this.collatzValue / 2;
      if(this.collatzValue == 4 && this.cicle){
        this.genGraph();
        return;
      } else if(this.collatzValue == 4){
        this.cicle = true;
      }
      this.collatz();
    } else {
      this.collatzValue = this.collatzValue * 3 + 1;
      if(this.collatzValue == 4 && this.cicle){
        this.genGraph();
        return;
      } else if(this.collatzValue == 4){
        this.cicle = true;
      }
      this.collatz();
    }
  }

  genGraph() {
    // this.linechart = {
    //   series: [
    //     {
    //       data: this.collatzSerie,
    //     },
    //   ],
    //   chart: {
    //     type: 'line',
    //   },
    //   title: {
    //     text: 'grafico de lineas',
    //   },
    // };

    // this.linechart.addSeries({
    //   name: 'KKK',
    //   data: this.collatzSerie
    // });

    this.chartRef.addSeries({
      id: `${this.counter}`,
      type: 'line',
      data: this.collatzSerie,
      name: `#${this.counter}: ${this.collatzSerie[0]}`
    });

    this.seriesId.push(this.counter);
    this.outputList.emit(this.seriesId);

    this.historyService.addSerie(this.collatzSerie);

    this.collatzSerie = [];

    this.counter++;
  }

  removeSerie(deletedSerie: number){
    this.chartRef.get(`${deletedSerie}`).remove();

    document.getElementById(`${deletedSerie}`)?.remove();
  }
}
