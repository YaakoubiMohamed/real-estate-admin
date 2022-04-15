import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAgentComponent } from './detail-agent.component';

describe('DetailAgentComponent', () => {
  let component: DetailAgentComponent;
  let fixture: ComponentFixture<DetailAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
