import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from 'src/app/interfaces/Card';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss']
})
export class BoardCardComponent implements OnInit {
  @Input() card: Card;
  @Output() delete: EventEmitter<String> = new EventEmitter();
  @Output() edit: EventEmitter<Card> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  deleteCard() {
    this.delete.emit(this.card.id);
  }

  editCard() {
    this.edit.emit(this.card);
  }

}
