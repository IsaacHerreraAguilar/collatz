import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-element-list',
  templateUrl: './element-list.component.html',
  styleUrls: ['./element-list.component.css']
})

export class ElementListComponent {

  // Entrada con la lista de IDs de los elementos activos
  @Input() seriesList: number[] = [];

  @Output() removedId: EventEmitter<number> = new EventEmitter<number>();

  // Recibe señal del elemento y la envía al padre (home)
  deleteSignalFather(id: number) {
    this.removedId.emit(id);
  }
}
