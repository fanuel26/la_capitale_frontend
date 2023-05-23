import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionnaireProduitComponent } from './gestionnaire-produit.component';

describe('GestionnaireProduitComponent', () => {
  let component: GestionnaireProduitComponent;
  let fixture: ComponentFixture<GestionnaireProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionnaireProduitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionnaireProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
