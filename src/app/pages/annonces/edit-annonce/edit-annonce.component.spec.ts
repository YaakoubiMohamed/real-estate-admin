import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAnnonceComponent } from './edit-annonce.component';

describe('EditAnnonceComponent', () => {
  let component: EditAnnonceComponent;
  let fixture: ComponentFixture<EditAnnonceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAnnonceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAnnonceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
