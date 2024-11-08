import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InitializeRoutePage } from './initialize-route.page';

describe('InitializeRoutePage', () => {
  let component: InitializeRoutePage;
  let fixture: ComponentFixture<InitializeRoutePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InitializeRoutePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
