import { Component, Input, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Options } from 'highcharts';

@Component({
  selector: 'app-graph-container',
  templateUrl: './graph-container.component.html',
  styleUrls: ['./graph-container.component.css'],
})

export class GraphContainerComponent {

  @Input() newValue: number = 0;

  collatzValue: number = 0;

  cicle = false;

  message: string = '';

  collatzSerie: number[] = [];

  collatzNumbers: any[] = [];

  Highcharts = Highcharts;

  aaa: number[] = [5,6,7,8,9,10];

  bbb: number[] = [1,2,3,4];

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
      {
        type: 'line',
        data: [1,2,3]
      }
    ]
  };

  chartCallback: Highcharts.ChartCallbackFunction = chart => {
    this.chartRef = chart;
  };

  updateChart(): void {
    this.chartRef.series[0].update({
      type: 'column'
    });
  }

  ngOnChanges(changes: SimpleChanges) {

    if(changes['newValue'].previousValue != undefined){

      if(changes['newValue'].currentValue != changes['newValue'].previousValue){

        this.message += 'Collatz ' + this.newValue + ': ';
        this.collatzValue = this.newValue;
        this.cicle = false;
        this.collatz();
      }
    }
  }

  collatz() {

    if(this.collatzValue % 2 == 0){
      this.collatzValue = this.collatzValue / 2;
      if(this.collatzValue == 4 && this.cicle){
        this.genGraph();
        // console.log(this.message);
        // this.message = '';
        return;
      } else if(this.collatzValue == 4){
        this.cicle = true;
      }
      this.collatzSerie.push(this.collatzValue);
      // this.message += this.collatzValue + ', ';
      this.collatz();
    } else {
      this.collatzValue = this.collatzValue * 3 + 1;
      if(this.collatzValue == 4 && this.cicle){
        this.genGraph();
        // console.log(this.message);
        return;
      } else if(this.collatzValue == 4){
        this.cicle = true;
      }
      this.collatzSerie.push(this.collatzValue);
      // this.message += this.collatzValue + ', ';
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
      type: 'line',
      data: this.collatzSerie
    });

    this.collatzSerie = [];
  }
}
