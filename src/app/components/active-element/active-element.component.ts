import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-active-element',
  templateUrl: './active-element.component.html',
  styleUrls: ['./active-element.component.css']
})

export class ActiveElementComponent {

  // Entrada con el Id del elemento
  @Input() id: number = 0;

  // Entrada con el 1er número de la serie del elemento
  @Input() element: number = 0;

  @Output() removedElement: EventEmitter<number> = new EventEmitter<number>();

  // Envia señal al padre (element list) de su Id para que sea eliminado
  deleteSignalChild(element: number) {
    this.removedElement.emit(element);
  }
}
