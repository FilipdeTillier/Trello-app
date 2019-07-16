import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs/internal/Subscription';

import { BoardService } from 'src/app/services/board.service';
import { Card } from 'src/app/interfaces/Card';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
  public showModal: boolean = false;
  public cardToUpdate: Card;
  public todo: Card[];
  public doing: Card[];
  public done: Card[];
  public cards: Card[] = [];
  private toDoListId: string = "5d289689edfbe259d1ae68f3";
  private doingListId: string = "5d2896899b381b8a08e8f1db";
  private doneListId: string = "5d2896890ae4ef44fa377ac6";

  private instanceSubscription: Subscription[] = [];

  constructor(private boardService: BoardService) { }

  ngOnInit() {
    this.getAllCards();
  }

  getAllCards(): void {
    this.instanceSubscription.push(
      this.boardService.getAllCards([this.toDoListId, this.doingListId, this.doneListId])
        .subscribe((cards: Card[]) => {
          this.cards = [...cards.flat()];
          this.todo = this.getCardsByBoardId(this.cards, this.toDoListId);
          this.doing = this.getCardsByBoardId(this.cards, this.doingListId);
          this.done = this.getCardsByBoardId(this.cards, this.doneListId);
        })
    );
  }

  drop(event: CdkDragDrop<string[]>): void {
    const { previousContainer, container, previousIndex, currentIndex, item } = event;
    if (previousContainer === container) {
      moveItemInArray(container.data, previousIndex, currentIndex);
    } else {
      transferArrayItem(previousContainer.data, container.data, previousIndex, currentIndex);
      item.data.idList = container.id;
      this.updateCard(item.data);
    }
  }

  getCardsByBoardId(cards: Card[], idList: String): Card[] {
    return cards.filter((card: Card) => card.idList === idList);
  }

  deleteCard(id: string) {
    this.instanceSubscription.push(
      this.boardService.deleteCardById(id).subscribe(() => this.getAllCards()),
    )
  }

  addCard(cardData: Card) {
    this.instanceSubscription.push(
      this.boardService.createCard(cardData).subscribe(() => {
        this.showModal = false;
        this.getAllCards();
      })
    );
  }

  editCard(card: Card) {
    this.cardToUpdate = card;
    this.showModal = true;
  }

  updateCard(cardData: Card): void {
    this.instanceSubscription.push(
      this.boardService.updateCard(cardData)
        .subscribe((card: Card) => this.cards.find(({ id }: Card) => id === card.id))
    );
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  ngOnDestroy() {
    this.instanceSubscription.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
