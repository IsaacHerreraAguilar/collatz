import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-element-input',
  templateUrl: './element-input.component.html',
  styleUrls: ['./element-input.component.css']
})

export class ElementInputComponent {

  inputValue: string = '';

  // Salida del valor del input hacia el home
  @Output() outputValue: EventEmitter<string> = new EventEmitter<string>();

  // Envía el valor del input
  sendNumber(): void {
    this.outputValue.emit(this.inputValue);
  }
}
