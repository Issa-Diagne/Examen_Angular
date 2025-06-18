import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDette } from './add-dette';

describe('AddDette', () => {
  let component: AddDette;
  let fixture: ComponentFixture<AddDette>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDette]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDette);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
