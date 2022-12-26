import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  correctNumber: number = 0;

  receiveValue(value: string): void {
    let tempValue = Number(value);
    if(tempValue <= 0){
      alert('Asegurese de insertar un número entero positivo');
    } else {
      this.correctNumber = Number(value);
    }
  }
}
