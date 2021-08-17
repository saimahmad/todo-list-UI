import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyGraphComponent } from './policy-graph.component';

describe('PolicyGraphComponent', () => {
  let component: PolicyGraphComponent;
  let fixture: ComponentFixture<PolicyGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
