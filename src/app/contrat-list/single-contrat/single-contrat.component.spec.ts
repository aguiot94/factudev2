import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleContratComponent } from './single-contrat.component';

describe('SingleContratComponent', () => {
  let component: SingleContratComponent;
  let fixture: ComponentFixture<SingleContratComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleContratComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
