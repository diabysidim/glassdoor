import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyReviewsComponent } from './company-reviews.component';

describe('CompanyReviewsComponent', () => {
  let component: CompanyReviewsComponent;
  let fixture: ComponentFixture<CompanyReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
