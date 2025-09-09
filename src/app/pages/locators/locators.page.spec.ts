import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocatorsPage } from './locators.page';

describe('LocatorsPage', () => {
  let component: LocatorsPage;
  let fixture: ComponentFixture<LocatorsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LocatorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
