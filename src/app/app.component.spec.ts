import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BoardCardComponent } from './components/board-card/board-card.component';
import { BoardComponent } from './components/board/board.component';
import { BoardNewTaskComponent } from './components/board-new-task/board-new-task.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';



describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        DragDropModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent,
        BoardComponent,
        BoardCardComponent,
        BoardNewTaskComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
