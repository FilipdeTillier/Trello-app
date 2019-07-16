import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { reduce } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { Card } from '../interfaces/Card';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private apiKey: string = '8aa63f81f1fc3ab9d055b169039084f7';
  private token: string = 'f4500b13b25f2ecadb6941a04e5fb8e298fc38a1586ebeb2ec7cbdb96c6d8140';
  private auth: string = `&key=${this.apiKey}&token=${this.token}`
  private toDoListId: string = "5d289689edfbe259d1ae68f3";

  constructor(private http: HttpClient) { }

  public getCardsFromListById(listId: string): Observable<Object> {
    const url = `https://api.trello.com/1/lists/${listId}/cards?fields=all${this.auth}`;

    return this.http.get(url);
  }

  public createCard(cardData: Card): Observable<Object> {
    const data = cardData;
    const url = `https://api.trello.com/1/cards?idList=${this.toDoListId}&keepFromSource=all${this.auth}`;
    return this.http.post(url, data)
  }

  public deleteCardById(id: string): Observable<Object> {
    const url = `https://api.trello.com/1/cards/${id}?${this.auth}`;
    return this.http.delete(url);
  }

  public updateCard(cardData: any): Observable<Object> {
    const { id } = cardData;
    const url = `https://api.trello.com/1/cards/${id}?${this.auth}`;
    return this.http.put(url, cardData);
  }

  public getAllCards(ids: string[]): Observable<Card[]> {
    return <Observable<any>>forkJoin(
      ids.map(id => {
        const url = `https://api.trello.com/1/lists/${id}/cards?fields=all${this.auth}`;
        return <Observable<any>>this.http.get(`${url}`);
      })
    ).pipe(
      reduce((a, b) => {
        return a.concat(b);
      }, [])
    );
  }
}
