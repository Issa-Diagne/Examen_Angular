import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaiement } from './add-paiement';

describe('AddPaiement', () => {
  let component: AddPaiement;
  let fixture: ComponentFixture<AddPaiement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPaiement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPaiement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
