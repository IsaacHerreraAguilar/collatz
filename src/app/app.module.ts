import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActiveElementComponent } from './components/active-element/active-element.component';
import { ElementListComponent } from './components/element-list/element-list.component';
import { ElementInputComponent } from './components/element-input/element-input.component';
import { GraphContainerComponent } from './components/graph-container/graph-container.component';
import { HomeComponent } from './pages/home/home.component';
import { HistoryComponent } from './pages/history/history.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ActiveElementComponent,
    ElementListComponent,
    ElementInputComponent,
    GraphContainerComponent,
    HomeComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
