import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlquilarProductoComponentComponent } from './alquilar-producto-component.component';

describe('AlquilarProductoComponentComponent', () => {
  let component: AlquilarProductoComponentComponent;
  let fixture: ComponentFixture<AlquilarProductoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlquilarProductoComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlquilarProductoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
