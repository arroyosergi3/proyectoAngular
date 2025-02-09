import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisProductosComponent } from './mis-productos.component';

describe('MisProductosComponent', () => {
  let component: MisProductosComponent;
  let fixture: ComponentFixture<MisProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisProductosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
