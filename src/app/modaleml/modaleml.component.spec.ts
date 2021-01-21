import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalemlComponent } from './modaleml.component';

describe('ModalemlComponent', () => {
  let component: ModalemlComponent;
  let fixture: ComponentFixture<ModalemlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalemlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalemlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
