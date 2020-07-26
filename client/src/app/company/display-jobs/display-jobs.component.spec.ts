import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayJobsComponent } from './display-jobs.component';

describe('DisplayJobsComponent', () => {
  let component: DisplayJobsComponent;
  let fixture: ComponentFixture<DisplayJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
