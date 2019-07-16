import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { BoardNewTaskComponent } from './board-new-task.component';

describe('BoardNewTaskComponent', () => {
  let component: BoardNewTaskComponent;
  let fixture: ComponentFixture<BoardNewTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [BoardNewTaskComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardNewTaskComponent);
    component = fixture.componentInstance;
    component.card = {
      name: 'Task'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid without name of task', () => {
    component.form.controls.name.setValue('');
    component.form.controls.desc.setValue('Desc');
    expect(component.form.valid).toBeFalsy();
  });

  it('form should be valid without desc of task but with name', () => {
    component.form.controls.name.setValue('Name');
    expect(component.form.valid).toBeTruthy();
  });

  it('cancel button should emit event', () => {
    spyOn(component.cancel, 'emit');
    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('.task__button-cancel');
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.cancel.emit).toHaveBeenCalled();
  });

  it('submit button should emit event', () => {
    component.form.controls.name.setValue('Name');
    spyOn(component.add, 'emit');
    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('.task__submit');
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.add.emit).toHaveBeenCalled();
  });

  it('isformvalid method should return false if name is empty', () => {
    component.form.controls.name.setValue('');
    expect(component.isFormValid()).toBeFalsy();
  });

  it('isformvalid method should return true if name is fill', () => {
    component.form.controls.name.setValue('Name');
    expect(component.isFormValid()).toBeTruthy();
  });

  it('isInvalid method should return true if name controll is empty', () => {
    component.form.controls.name.setValue('');
    component.form.controls.name.markAsTouched();
    expect(component.isInvalid('name')).toBeTruthy();
  });

  it('isInvalid method should return false if name controll is fill', () => {
    component.form.controls.name.setValue('Name');
    component.form.controls.name.markAsTouched();
    expect(component.isInvalid('name')).toBeFalsy();
  });

});
