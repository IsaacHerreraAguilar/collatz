import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-active-element',
  templateUrl: './active-element.component.html',
  styleUrls: ['./active-element.component.css']
})

export class ActiveElementComponent {

  @Input() element: number = 0;

  @Output() removedId: EventEmitter<number> = new EventEmitter<number>();

  deleteSignalChild(id: number) {
    this.removedId.emit(id);
  }
}
