import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-element-list',
  templateUrl: './element-list.component.html',
  styleUrls: ['./element-list.component.css']
})

export class ElementListComponent {

  @Input() seriesList: number[] = [];

  @Output() removedId: EventEmitter<number> = new EventEmitter<number>();

  deleteSignalFather(id: number) {
    this.removedId.emit(id);
  }
}
