import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardNewTaskComponent } from './board-new-task.component';

describe('BoardNewTaskComponent', () => {
  let component: BoardNewTaskComponent;
  let fixture: ComponentFixture<BoardNewTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardNewTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardNewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
