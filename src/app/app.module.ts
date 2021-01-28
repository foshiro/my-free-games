import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GameDetailDialog } from './dialog/game-detail-dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { GameService } from './services/game.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GameEffects } from './effects/game.effects';
import { reducer } from './reducers/game.reducer';

@NgModule({
  declarations: [
    AppComponent,
    GameDetailDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatGridListModule,
    NoopAnimationsModule,
    MatDialogModule,
    StoreModule.forRoot({ game: reducer }, {}),
    EffectsModule.forRoot([GameEffects])
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
