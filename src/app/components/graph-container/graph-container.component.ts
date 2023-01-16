import { Component, EventEmitter, Input, Output, SimpleChanges, OnInit, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Options } from 'highcharts';
import { HistoryService } from 'src/app/services/history.service';

@Component({
  selector: 'app-graph-container',
  templateUrl: './graph-container.component.html',
  styleUrls: ['./graph-container.component.css'],
})

export class GraphContainerComponent implements OnInit {

  // Entrada con el nuevo valor a graficar
  @Input() newValue: number = 0;

  // Entrada del Id de la serie a borrar
  @Input() deletedSerie: number = 0;

  // Señal para saber si se debe limpiar el grafico
  @Input() clearSignal: boolean = false;

  // Salida de la lista de 1ros numeros de cada serie para el home
  @Output() outputList: EventEmitter<number[]> = new EventEmitter<number[]>();

  // Lista con los números iniciales de las series
  seriesNumber: number[] = [];

  // Número actual para aplicar conjetura
  collatzValue: number = 0;

  // Lista para almacenar las series activas
  actualSeries: [number[]] = [[]];

  // Booleano para saber si una conjetura va a entrar en un ciclo
  cicle = false;

  // Serie del número actual
  collatzSerie: number[] = [];

  Highcharts = Highcharts;

  chartRef: any;
  updateFlag: any;

  // Creación del graficador con una linea de prueba
  chartW: Options = {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Pasos de la serie de Collatz de un número para llegar a 1 e iniciar un ciclo'
    },
    credits: {
      enabled: false
    },
    xAxis: {
      allowDecimals: false
    },
    yAxis: {
      allowDecimals: false
    },
    series: [{
      name: 'test-line',
      type: 'line',
      data: [1,2,3]
    }
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

  ngOnInit(){

    // Actualiza las series activas trayendolas del history service
    this.actualSeries = this.historyService.getActiveSeries();

    // Toma los 1ros números de cada serie y envia la lista al home
    for(let i=1; i<this.actualSeries.length; i++){
      this.seriesNumber.push(this.actualSeries[i][0]);
    }

    this.outputList.emit(this.seriesNumber);
  }

  ngAfterViewInit() {

    // Si había series previamente, se elimina la serie de prueba
    if(this.seriesNumber.length > 0){
      this.chartRef.series[0].remove();
    }

    // Añade las series que estaban activas al graficador
    if(this.chartRef){
      for(let i=1; i<this.actualSeries.length; i++){

        this.chartRef.addSeries({
          id: `${this.actualSeries[i][0]}`,
          type: 'line',
          data: this.actualSeries[i],
          name: `${this.actualSeries[i][0]}`
        });
      }
    }
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

    // Verifica si el valor de clearSignal cambió para así limpiar el gráfico
    if(typeof changes['clearSignal'] != 'undefined'){
      if(changes['clearSignal'].previousValue != undefined){
        if(changes['clearSignal'].currentValue != changes['clearSignal'].previousValue){
          this.clearGraph();
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

    // Si no habían series previamente, se elimina la serie de prueba
    if(this.seriesNumber.length == 0){
      this.chartRef.series[0].remove();
    }

    this.chartRef.addSeries({
      id: `${this.collatzSerie[0]}`,
      type: 'line',
      data: this.collatzSerie,
      name: `${this.collatzSerie[0]}`
    });

    // Actualiza la lista de numeros y la emite
    this.seriesNumber.push(this.collatzSerie[0]);
    this.outputList.emit(this.seriesNumber);

    // Adición de la serie al historial (servicio)
    this.historyService.addSerie(this.collatzSerie);

    // Adición de la serie al servicio como serie activa
    this.historyService.addActiveSerie(this.collatzSerie);

    // Reinicio de la serie actual
    this.collatzSerie = [];
  }

  // Remueve una serie mediante el 1er elemento de esta
  removeSerie(deletedSerie: number) {

    this.chartRef.get(`${deletedSerie}`).remove();

    let index = this.seriesNumber.indexOf(deletedSerie);
    this.seriesNumber.splice(index, 1);
    this.outputList.emit(this.seriesNumber);

    // Elimina la serie activa del history service
    this.historyService.deleteActiveSerie(this.actualSeries[index+1]);

    this.actualSeries.splice(index, 1);

    // Si el grafico se queda sin series se añade la serie de prueba
    if(this.seriesNumber.length == 0){
      this.chartRef.addSeries({
        type: 'line',
        data: [1,2,3],
        name: 'test-line'
      });
    }
  }

  // Remueve todas las series del gráfico
  clearGraph() {

    while(this.chartRef.series.length){
      this.chartRef.series[0].remove();
    }

    // Limpia las lista y envia la lista de números al home
    this.seriesNumber = [];

    this.actualSeries = [[]];

    this.historyService.clearActiveSeries();

    this.outputList.emit(this.seriesNumber);

    // Se vuelve a añadir la serie de prueba
    this.chartRef.addSeries({
      type: 'line',
      data: [1,2,3],
      name: 'test-line'
    });
  }

}
