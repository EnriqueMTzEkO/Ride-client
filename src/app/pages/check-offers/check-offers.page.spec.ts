import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckOffersPage } from './check-offers.page';

describe('CheckOffersPage', () => {
  let component: CheckOffersPage;
  let fixture: ComponentFixture<CheckOffersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOffersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
