import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GameDetailDialog } from './components/dialog/game-detail-dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { GameService } from './services/game.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GameEffects } from './effects/game.effects';
import { reducer } from './reducers/game.reducer';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { GridListComponent } from './components/grid-list/grid-list.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    AppComponent,
    GameDetailDialog,
    SearchBarComponent,
    GridListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatGridListModule,
    NoopAnimationsModule,
    MatDialogModule,
    MatIconModule,
    InfiniteScrollModule,
    StoreModule.forRoot({game: reducer}, {}),
    EffectsModule.forRoot([GameEffects])
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
