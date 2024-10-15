import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrivacyNoticePage } from './privacy-notice.page';

describe('PrivacyNoticePage', () => {
  let component: PrivacyNoticePage;
  let fixture: ComponentFixture<PrivacyNoticePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyNoticePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
