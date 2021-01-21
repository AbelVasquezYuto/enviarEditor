import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmlComponent } from './eml.component';

describe('EmlComponent', () => {
  let component: EmlComponent;
  let fixture: ComponentFixture<EmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
