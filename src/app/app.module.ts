import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { BoardCardComponent } from './components/board-card/board-card.component';
import { BoardNewTaskComponent } from './components/board-new-task/board-new-task.component';
import { CardInterceptor } from './interceptors/Card.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    BoardCardComponent,
    BoardNewTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CardInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
