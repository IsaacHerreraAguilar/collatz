import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-element-input',
  templateUrl: './element-input.component.html',
  styleUrls: ['./element-input.component.css']
})

export class ElementInputComponent {

  input = document.getElementById('input');

  inputValue: string = '';

  // Salida del valor del input hacia el home
  @Output() outputValue: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(){

    this.input = document.getElementById('input');

    // Listener para que se puedan ingresar series con 'Enter'
    this.input?.addEventListener("keypress", function(event){
      if(event.key === "Enter"){
        document.getElementById("button")?.click();
      }
    })
  }

  // Envía el valor del input
  sendNumber(): void {
    this.outputValue.emit(this.inputValue);
    this.inputValue = '';

    this.input?.focus();
  }
}
