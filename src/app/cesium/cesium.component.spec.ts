import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CesiumComponent } from './cesium.component';

describe('CesiumComponent', () => {
  let component: CesiumComponent;
  let fixture: ComponentFixture<CesiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CesiumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CesiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
