import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { BoardNewTaskComponent } from './board-new-task.component';

describe('BoardNewTaskComponent', () => {
  let component: BoardNewTaskComponent;
  let fixture: ComponentFixture<BoardNewTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [BoardNewTaskComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardNewTaskComponent);
    component = fixture.componentInstance;
    component.card = {
      name: 'Task'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
