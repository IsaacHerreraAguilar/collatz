import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  correctNumber: number = 0;

  collatzList: number[] = [];

  homeDeletedSerie: number = 0;

  // Recibe valor del input y verifica si es correcto
  receiveValue(value: string) {
    let tempValue = Number(value);
    if(tempValue <= 0){
      Swal.fire({
        title: 'Atención',
        text: 'Asegurese de insertar un número entero positivo',
        icon: 'warning',
        confirmButtonText: 'Ok'
      })
      //alert('Asegurese de insertar un número entero positivo');
    } else {
      this.correctNumber = Number(value);
    }
  }

  // Recibe la lista actualizada por parte del graficador y la asigna para el uso de 'element-list'
  receiveList(value: number[]) {
    this.collatzList = value;
  }

  // Recibe Id de serie a borrar y la asigna para el uso de 'graph-container'
  receiveId(value: number) {
    this.homeDeletedSerie = value;
  }
}
