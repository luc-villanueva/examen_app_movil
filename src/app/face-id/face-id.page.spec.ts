import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FaceIDPage } from './face-id.page';

describe('FaceIDPage', () => {
  let component: FaceIDPage;
  let fixture: ComponentFixture<FaceIDPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceIDPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
