import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymenttypeChart } from './paymenttype-chart';

describe('PaymenttypeChart', () => {
  let component: PaymenttypeChart;
  let fixture: ComponentFixture<PaymenttypeChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymenttypeChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymenttypeChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
