import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetteList } from './dette-list';

describe('DetteList', () => {
  let component: DetteList;
  let fixture: ComponentFixture<DetteList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetteList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetteList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
