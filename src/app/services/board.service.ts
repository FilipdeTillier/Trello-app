import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

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
  private doingListId: string = "5d289689ce7e4180f580f392";
  private doneListId: string = "5d289689ce7e4180f580f392";

  constructor(private http: HttpClient) { }

  private getListById(listId: string) {
    const url = `https://api.trello.com/1/lists
      ${listId}?fields=all${this.auth}`;
  }

  public getCardsFromListById(listId: string) {
    const url = `https://api.trello.com/1/lists/${listId}/cards?fields=all${this.auth}`;

    return this.http.get(url);
  }
}
