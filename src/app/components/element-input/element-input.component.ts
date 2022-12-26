import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-element-input',
  templateUrl: './element-input.component.html',
  styleUrls: ['./element-input.component.css']
})
export class ElementInputComponent {

  inputValue: string = '';

  @Output() outputValue: EventEmitter<string> = new EventEmitter<string>();

  sendNumber(): void {
    this.outputValue.emit(this.inputValue);
  }
}
