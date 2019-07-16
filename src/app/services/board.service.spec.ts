import { TestBed } from '@angular/core/testing';

import { BoardService } from './board.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Card } from '../interfaces/Card';

describe('BoardService', () => {
  let boardService: BoardService;
  let httpMock: HttpTestingController;
  const toDoListId = '5d289689edfbe259d1ae68f3';
  const apiKey: string = '8aa63f81f1fc3ab9d055b169039084f7';
  const token: string = 'f4500b13b25f2ecadb6941a04e5fb8e298fc38a1586ebeb2ec7cbdb96c6d8140';
  const auth: string = `&key=${apiKey}&token=${token}`;
  const dummyCard: Card = {
    name: 'test',
    id: 'test',
    idList: 'test',
    desc: 'test',
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BoardService
      ],
      imports: [HttpClientTestingModule]
    })
    boardService = TestBed.get(BoardService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: BoardService = TestBed.get(BoardService);
    expect(service).toBeTruthy();
  });

  it('should return cards by list id from the API GET method', () => {
    const listId = 'test';
    const url = `https://api.trello.com/1/lists/${listId}/cards?fields=all${auth}`
    const dummyCards: Card[] = [dummyCard];

    boardService.getCardsFromListById(listId).subscribe((data: Card[]) => {
      expect(data.length).toBe(1);
      expect(data).toEqual(dummyCards);
    });

    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('GET');
    request.flush(dummyCards);
  });

  it('should create new card on API POST method', () => {
    const url = `https://api.trello.com/1/cards?idList=${toDoListId}&keepFromSource=all${auth}`;

    boardService.createCard(dummyCard).subscribe((data: Card) => {
      expect(data).toEqual(dummyCard);
    });

    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('POST');
    request.flush(dummyCard);
  });

  it('should delete card from list on API DELETE method', () => {
    const url = `https://api.trello.com/1/cards/${toDoListId}?${auth}`;

    boardService.deleteCardById(toDoListId).subscribe((data: Card) => {
      expect(data).toEqual(dummyCard);
    });

    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('DELETE');
    request.flush(dummyCard);
  });

});
