import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BoardService } from 'src/app/services/board.service';
import { Card } from 'src/app/interfaces/Card';

export const FORM_PARAMS = {
  cardName: 'name',
  cardDescription: 'desc'
};

@Component({
  selector: 'app-board-new-task',
  templateUrl: './board-new-task.component.html',
  styleUrls: ['./board-new-task.component.scss']
})
export class BoardNewTaskComponent implements OnInit, OnDestroy {
  @Input() card: Card | any;
  @Output() add: EventEmitter<Card> = new EventEmitter();
  @Output() cancel: EventEmitter<boolean> = new EventEmitter();
  @Output() resetCard: EventEmitter<Object> = new EventEmitter();
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      [FORM_PARAMS.cardName]: [this.card ? this.card.name : '', [
        Validators.required
      ]],
      [FORM_PARAMS.cardDescription]: [this.card ? this.card.desc : '', [
      ]],
    });
  }

  isFormValid(): boolean {
    return this.form.valid;
  }

  isInvalid(inputName: string): boolean {
    const currentInput = this.form.get(inputName);
    return !currentInput.valid && currentInput.touched;
  }

  submit(e) {
    e.preventDefault();
    if (this.form.valid) {
      this.add.emit(this.form.value)
    }
  }

  close(): void {
    this.cancel.emit(true);
  }

  ngOnDestroy() {
    this.form.reset();
    this.resetCard.emit({});
  }

}
