import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BoardService } from 'src/app/services/board.service';

export const FORM_PARAMS = {
  taskName: 'name',
  description: 'desc'
};

@Component({
  selector: 'app-board-new-task',
  templateUrl: './board-new-task.component.html',
  styleUrls: ['./board-new-task.component.scss']
})
export class BoardNewTaskComponent implements OnInit, OnDestroy {
  @Input() task: any;
  @Output() add: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() resetTask: EventEmitter<any> = new EventEmitter();
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    const { name, desc } = this.task;
    this.form = this.formBuilder.group({
      [FORM_PARAMS.taskName]: [name || '', [
        Validators.required
      ]],
      [FORM_PARAMS.description]: [desc || '', [
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
    this.resetTask.emit({});
  }

}
