import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WiskyProductsComponent } from './wisky-products.component';

describe('WiskyProductsComponent', () => {
  let component: WiskyProductsComponent;
  let fixture: ComponentFixture<WiskyProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WiskyProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WiskyProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
