import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';


import { BoardComponent } from './board.component';
import { BoardCardComponent } from '../board-card/board-card.component';
import { BoardNewTaskComponent } from '../board-new-task/board-new-task.component';
import { Card } from 'src/app/interfaces/Card';
import { BoardService } from 'src/app/services/board.service';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let boardService: BoardService;
  const dummyCard: Card = {
    name: 'test',
    id: 'test',
    idList: 'test',
    desc: 'test',
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [BoardService],
      imports: [DragDropModule, ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      declarations: [BoardComponent, BoardCardComponent, BoardNewTaskComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    boardService = TestBed.get(BoardService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find cards by list id ', () => {
    const dummyCards: Card[] = [{
      name: 'test',
      id: 'test',
      idList: 'test',
      desc: 'test',
    }, {
      name: 'test 2',
      id: 'test 2',
      idList: 'test 2',
      desc: 'test 2',
    }];
    expect(component.getCardsByBoardId(dummyCards, 'test 2')).toEqual([dummyCards[1]]);
  });

  it('open modal should set flag on true', () => {
    component.showModal = false;
    component.openModal();
    expect(component.showModal).toBeTruthy();
  });

  it('close modal should set flag on false', () => {
    component.showModal = true;
    component.closeModal();
    expect(component.showModal).toBeFalsy();
  });

  it('edit card should set current card to edit', () => {
    component.editCard(dummyCard);
    expect(component.showModal).toBeTruthy();
    expect(component.cardToUpdate).toEqual(dummyCard);
  });

  it('getAllCards method should call service method getAllCards', () => {
    spyOn(boardService, 'getAllCards').and.callThrough();
    component.getAllCards();
    expect(boardService.getAllCards).toHaveBeenCalled();
  });

  it('deleteCard method should call service method deleteCard', () => {
    spyOn(boardService, 'deleteCardById').and.callThrough();
    component.deleteCard('test');
    expect(boardService.deleteCardById).toHaveBeenCalled();
  });

  it('addCard method should call service method addCard', () => {
    spyOn(boardService, 'createCard').and.callThrough();
    component.addCard(dummyCard);
    expect(boardService.createCard).toHaveBeenCalled();
  });

  it('updateCard method should call service method updateCard', () => {
    spyOn(boardService, 'updateCard').and.callThrough();
    component.updateCard(dummyCard);
    expect(boardService.updateCard).toHaveBeenCalled();
  });

});
