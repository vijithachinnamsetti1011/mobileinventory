import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoodsReceiptPage } from './Item-list.page';

describe('GoodsReceiptPage', () => {
  let component: GoodsReceiptPage;
  let fixture: ComponentFixture<GoodsReceiptPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsReceiptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
