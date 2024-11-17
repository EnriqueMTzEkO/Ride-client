import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OfferAccepedPage } from './offer-acceped.page';

describe('OfferAccepedPage', () => {
  let component: OfferAccepedPage;
  let fixture: ComponentFixture<OfferAccepedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferAccepedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
