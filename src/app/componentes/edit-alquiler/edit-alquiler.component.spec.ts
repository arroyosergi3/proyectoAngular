import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAlquilerComponent } from './edit-alquiler.component';

describe('EditAlquilerComponent', () => {
  let component: EditAlquilerComponent;
  let fixture: ComponentFixture<EditAlquilerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAlquilerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAlquilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
