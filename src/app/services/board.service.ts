import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, concatAll, combineLatest, endWith, zip, mergeAll, reduce } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private apiKey: string = '8aa63f81f1fc3ab9d055b169039084f7';
  private oAuth: string = '9d78b6e7c2c44eb43a98b508bbb0cbd06ec2c3bb0c9eb19f25096c3747c88bee';
  private token: string = 'f4500b13b25f2ecadb6941a04e5fb8e298fc38a1586ebeb2ec7cbdb96c6d8140';
  private auth: string = `&key=${this.apiKey}&token=${this.token}`
  private boardId: string = '5d289689ce7e4180f580f392';
  private API_URL: string = `https://api.trello.com/1/boards/${this.boardId}?key=
  ${this.apiKey}&token=${this.token}`;
  private toDoListId: string = "5d289689edfbe259d1ae68f3";
  private doingListId: string = "5d2896899b381b8a08e8f1db";
  private doneListId: string = "5d2896890ae4ef44fa377ac6";

  constructor(private http: HttpClient) { }

  private getListById(listId: string) {
    const url = `https://api.trello.com/1/lists
      ${listId}?fields=all${this.auth}`;
  }

  public getCardsFromListById(listId: string) {
    const url = `https://api.trello.com/1/lists/${listId}/cards?fields=all${this.auth}`;

    return this.http.get(url);
  }

  public createCard(cardData) {
    const data = cardData;
    const url = `https://api.trello.com/1/cards?idList=${this.toDoListId}&keepFromSource=all${this.auth}`;
    return this.http.post(url, data)
  }

  public deleteCardById(id: string) {
    const url = `https://api.trello.com/1/cards/${id}?${this.auth}`;
    return this.http.delete(url);
  }

  public updateCard(cardData: any) {
    const { id } = cardData;
    const url = `https://api.trello.com/1/cards/${id}?${this.auth}`;
    return this.http.put(url, cardData);
  }

  public getItems(ids: string[]): Observable<any> {

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
