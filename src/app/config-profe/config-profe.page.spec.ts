import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigProfePage } from './config-profe.page';

describe('ConfigProfePage', () => {
  let component: ConfigProfePage;
  let fixture: ComponentFixture<ConfigProfePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigProfePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
