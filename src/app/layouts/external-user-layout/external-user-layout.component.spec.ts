import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalUserLayoutComponent } from './external-user-layout.component';

describe('AdminLayoutComponent', () => {
  let component: ExternalUserLayoutComponent;
  let fixture: ComponentFixture<ExternalUserLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalUserLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalUserLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
