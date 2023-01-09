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

  // Entrada con el nuevo valor a graficar
  @Input() newValue: number = 0;

  // Entrada del Id de la serie a borrar
  @Input() deletedSerie: number = 0;

  // Salida de la lista de IDs de las series para el home
  @Output() outputList: EventEmitter<number[]> = new EventEmitter<number[]>();

  // Lista con los id de las series
  seriesId: number[] = [];

  // Número actual para aplicar conjetura
  collatzValue: number = 0;

  cicle = false;

  // Serie del número actual
  collatzSerie: number[] = [];

  Highcharts = Highcharts;

  // Control de los Id de las series
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
  //     text: 'GRAFICO'
  //   },
  //   series: [{
  //     name: 'linea1',
  //     type: 'line',
  //     data: [1, 2, 3]
  //   }]
  // });

  // Creación del graficador vacío
  chartW: Options = {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Pasos de la serie de Collatz de un número para llegar a 1 e iniciar un ciclo'
    },
    series: [
    ]
  };

  constructor(private historyService: HistoryService) { }

  // Asignación del graficador a una referencia (necesario para actualizarlo visualmente)
  chartCallback: Highcharts.ChartCallbackFunction = chart => {
    this.chartRef = chart;
  };

  updateChart(): void {
    this.chartRef.series[0].update({
      type: 'column'
    });
  }

  ngOnChanges(changes: SimpleChanges) {

    // Verifica si el valor newValue cambió para así iniciar un nuevo calculo
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

    // Verifica si el valor deletedSerie cambió para borrar la serie correspondiente
    if(typeof changes['deletedSerie'] != 'undefined'){
      if(changes['deletedSerie'].previousValue != undefined){
        if(changes['deletedSerie'].currentValue != changes['deletedSerie'].previousValue){
          this.removeSerie(this.deletedSerie);
        }
      }
    }

  }

  // Lógica de la conjetura de Collatz
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

  // Añade una nueva serie al graficador
  genGraph() {

    this.chartRef.addSeries({
      id: `${this.counter}`,
      type: 'line',
      data: this.collatzSerie,
      name: `#${this.counter}: ${this.collatzSerie[0]}`
    });

    // Actualiza la lista de IDs y la emite
    this.seriesId.push(this.counter);
    this.outputList.emit(this.seriesId);

    // Adición de la serie al historial (servicio)
    this.historyService.addSerie(this.collatzSerie);

    // Reinicio de la serie actual
    this.collatzSerie = [];

    // Aumento del contador
    this.counter++;
  }

  // Remueve una serie mediante su Id
  removeSerie(deletedSerie: number){
    this.chartRef.get(`${deletedSerie}`).remove();

    document.getElementById(`${deletedSerie}`)?.remove();
  }
}
