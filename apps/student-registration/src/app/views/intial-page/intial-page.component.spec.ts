import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntialPageComponent } from './intial-page.component';

describe('IntialPageComponent', () => {
  let component: IntialPageComponent;
  let fixture: ComponentFixture<IntialPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IntialPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IntialPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
