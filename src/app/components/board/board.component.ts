import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ViewportScroller } from '@angular/common';
import { BoardService } from 'src/app/services/board.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  public todo: any = [];
  public doing: any = [];
  public done: any = [];
  private toDoListId: string = "5d289689edfbe259d1ae68f3";
  private doingListId: string = "5d289689ce7e4180f580f392";
  private doneListId: string = "5d2896890ae4ef44fa377ac6";


  private instanceSubscription: Subscription[] = [];

  constructor(private boardService: BoardService) {

  }

  // constructor(private ViewportScroller: ViewportScroller) {
  //   this.ViewportScroller;
  // }

  ngOnInit() {
    this.instanceSubscription.push(
      this.boardService.getCardsFromListById(this.toDoListId).subscribe(cards => this.todo = cards),
      this.boardService.getCardsFromListById(this.doingListId).subscribe(cards => this.doing = cards),
      this.boardService.getCardsFromListById(this.doneListId).subscribe(cards => this.done = cards)
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    const { previousContainer, container, previousIndex, currentIndex } = event;
    console.log(previousContainer, container, previousIndex, currentIndex);
    if (previousContainer === container) {
      moveItemInArray(container.data, previousIndex, currentIndex);
    } else {
      transferArrayItem(previousContainer.data, container.data, previousIndex, currentIndex);
    }
  }

  OnDestroy() {
    this.instanceSubscription.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
