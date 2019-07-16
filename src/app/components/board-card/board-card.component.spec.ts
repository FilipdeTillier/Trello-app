import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardCardComponent } from './board-card.component';

describe('BoardCardComponent', () => {
  let component: BoardCardComponent;
  let fixture: ComponentFixture<BoardCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BoardCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardCardComponent);
    component = fixture.componentInstance;
    component.card = {
      id: 'test',
      idList: 'test',
      name: 'Card',
      desc: 'test'
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deleteCard method should emit event', () => {
    spyOn(component.delete, 'emit');
    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('.card__button-delete');
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.delete.emit).toHaveBeenCalled();
  });

  it('editCard method should emit event', () => {
    spyOn(component.edit, 'emit');
    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('.card__button-edit');
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.edit.emit).toHaveBeenCalled();
  });
});
