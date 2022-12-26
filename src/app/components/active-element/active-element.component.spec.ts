import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveElementComponent } from './active-element.component';

describe('ActiveElementComponent', () => {
  let component: ActiveElementComponent;
  let fixture: ComponentFixture<ActiveElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
