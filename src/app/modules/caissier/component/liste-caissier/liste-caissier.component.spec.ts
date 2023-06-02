import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCaissierComponent } from './liste-caissier.component';

describe('ListeCaissierComponent', () => {
  let component: ListeCaissierComponent;
  let fixture: ComponentFixture<ListeCaissierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeCaissierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeCaissierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
