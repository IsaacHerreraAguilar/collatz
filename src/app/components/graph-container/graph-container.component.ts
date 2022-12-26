import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-graph-container',
  templateUrl: './graph-container.component.html',
  styleUrls: ['./graph-container.component.css']
})
export class GraphContainerComponent {

  @Input() newValue: number = 0;

  collatzValue: number = 0;

  cicle = false;

  message: string = '';

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['newValue'].previousValue != undefined){

      if(changes['newValue'].currentValue != changes['newValue'].previousValue){

        this.message += 'Collatz ' + this.newValue + ': ';
        this.collatzValue = this.newValue;
        this.cicle = false;
        this.collatz();
      }
    }
  }

  collatz(): void {

    if(this.collatzValue % 2 == 0){
      this.collatzValue = this.collatzValue / 2;
      if(this.collatzValue == 4 && this.cicle){
        console.log(this.message);
        this.message = '';
        return;
      } else if(this.collatzValue == 4){
        this.cicle = true;
      }
      this.message += this.collatzValue + ', ';
      this.collatz();
    } else {
      this.collatzValue = this.collatzValue * 3 + 1;
      if(this.collatzValue == 4 && this.cicle){
        console.log(this.message);
        return;
      } else if(this.collatzValue == 4){
        this.cicle = true;
      }
      this.message += this.collatzValue + ', ';
      this.collatz();
    }
  }
}
