import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamWorkComponent } from './team-work.component';

describe('TeamWorkComponent', () => {
  let component: TeamWorkComponent;
  let fixture: ComponentFixture<TeamWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
