import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs/internal/Subscription';

import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
  public showModal: boolean = false;
  public taskToUpdate: any;
  public todo: any;
  public doing: any;
  public done: any;
  public cards: any = [];
  private toDoListId: string = "5d289689edfbe259d1ae68f3";
  private doingListId: string = "5d2896899b381b8a08e8f1db";
  private doneListId: string = "5d2896890ae4ef44fa377ac6";

  private instanceSubscription: Subscription[] = [];

  constructor(private boardService: BoardService) {

  }

  ngOnInit() {
    this.getAllCards();
  }

  getAllCards(): void {
    this.instanceSubscription.push(
      this.boardService.getItems([this.toDoListId, this.doingListId, this.doneListId])
        .subscribe(cards => {
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

  getCardsByBoardId(cards, idList) {
    return cards.filter(card => card.idList === idList);
  }

  deleteCard(id: string) {
    this.instanceSubscription.push(
      this.boardService.deleteCardById(id).subscribe(res => this.getAllCards()),
    )
  }

  addCard(cardData: any) {
    this.instanceSubscription.push(
      this.boardService.createCard(cardData).subscribe(res => {
        this.showModal = false;
        this.getAllCards();
      })
    );
  }

  editCard(task: any) {
    this.taskToUpdate = task;
    this.showModal = true;

  }

  updateCard(cardData: any): void {
    this.instanceSubscription.push(
      this.boardService.updateCard(cardData)
        .subscribe((res: any) => {
          const index = this.cards.find(({ id }) => id === res.id);
        })
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
