import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-active-element',
  templateUrl: './active-element.component.html',
  styleUrls: ['./active-element.component.css']
})

export class ActiveElementComponent {

  // Entrada con el Id del elemento
  @Input() element: number = 0;

  @Output() removedId: EventEmitter<number> = new EventEmitter<number>();

  // Envia señal al padre (element list) de su Id para que sea eliminado
  deleteSignalChild(id: number) {
    this.removedId.emit(id);
  }
}
