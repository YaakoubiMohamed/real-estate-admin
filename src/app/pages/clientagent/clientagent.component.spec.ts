import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientagentComponent } from './clientagent.component';

describe('ClientagentComponent', () => {
  let component: ClientagentComponent;
  let fixture: ComponentFixture<ClientagentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientagentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientagentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
