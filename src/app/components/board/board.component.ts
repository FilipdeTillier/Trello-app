import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  public todo = [
    'task1',
    'task2',
    'task3',
  ];
  public doing = [
    'task4',
    'task5',
    'task6',

  ];
  public done = [
    'task7',
    'task8',
    'task9',

  ];

  constructor(private ViewportScroller: ViewportScroller) {
    this.ViewportScroller;
  }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    const { previousContainer, container, previousIndex, currentIndex } = event;
    if (previousContainer === container) {
      moveItemInArray(container.data, previousIndex, currentIndex);
    } else {
      transferArrayItem(previousContainer.data, container.data, previousIndex, currentIndex);
    }
  }

}
