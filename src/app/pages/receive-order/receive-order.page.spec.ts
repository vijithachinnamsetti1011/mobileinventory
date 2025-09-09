import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReceiveOrderPage } from './receive-order.page';

describe('ReceiveOrderPage', () => {
  let component: ReceiveOrderPage;
  let fixture: ComponentFixture<ReceiveOrderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiveOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
