import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrganizationPagePage } from './organization-page.page';

describe('OrganizationPagePage', () => {
  let component: OrganizationPagePage;
  let fixture: ComponentFixture<OrganizationPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
