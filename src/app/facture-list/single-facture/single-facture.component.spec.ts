import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleFactureComponent } from './single-facture.component';

describe('SingleFactureComponent', () => {
  let component: SingleFactureComponent;
  let fixture: ComponentFixture<SingleFactureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleFactureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
