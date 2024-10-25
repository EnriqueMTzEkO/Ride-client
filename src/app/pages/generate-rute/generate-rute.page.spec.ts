import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenerateRutePage } from './generate-rute.page';

describe('GenerateRutePage', () => {
  let component: GenerateRutePage;
  let fixture: ComponentFixture<GenerateRutePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateRutePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
