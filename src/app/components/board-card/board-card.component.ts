import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss']
})
export class BoardCardComponent implements OnInit {
  @Input() task;
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  deleteCard() {
    this.delete.emit(this.task.id);
  }

  editCard() {
    this.edit.emit(this.task.id);
  }

}
