import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementInputComponent } from './element-input.component';

describe('ElementInputComponent', () => {
  let component: ElementInputComponent;
  let fixture: ComponentFixture<ElementInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
