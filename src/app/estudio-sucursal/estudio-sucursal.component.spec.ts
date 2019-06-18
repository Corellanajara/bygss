import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudioJudicialComponent } from './estudio-judicial.component';

describe('EstudioJudicialComponent', () => {
  let component: EstudioJudicialComponent;
  let fixture: ComponentFixture<EstudioJudicialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudioJudicialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudioJudicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
