import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OnRoutePage } from './on-route.page';

describe('OnRoutePage', () => {
  let component: OnRoutePage;
  let fixture: ComponentFixture<OnRoutePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OnRoutePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
