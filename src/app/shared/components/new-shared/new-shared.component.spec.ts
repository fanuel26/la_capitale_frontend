import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSharedComponent } from './new-shared.component';

describe('NewSharedComponent', () => {
  let component: NewSharedComponent;
  let fixture: ComponentFixture<NewSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSharedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
