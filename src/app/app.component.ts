import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { GameDetailDialog } from './dialog/game-detail-dialog';
import { environment } from '../environments/environment';
import { Game } from './models/game';
import { GameState } from './reducers/game.reducer';
import { selectGameList } from './selectors/game.selectors';
import { searchGame } from './actions/game.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  private searchSubject: Subject<string> = new Subject();
  public gameList$: Observable<Game[]> = this.store.pipe(select(selectGameList));

  constructor(
      private store: Store<GameState>,
      private dialog: MatDialog) {
    this.setSearchSubscription();
  }

  search(searchString: string): void {
    this.searchSubject.next(searchString);
  }

  openDetail(gameId: string) {
    this.dialog.open(GameDetailDialog, {
      data: {
        gameId: gameId
      }
    });
  }

  private setSearchSubscription(): void {
    this.searchSubject.pipe(
      debounceTime(environment.DEBOUNCE_TIME)
    ).subscribe(async (searchString: string) => {
      this.store.dispatch(searchGame({ limit: environment.ITEM_LIMIT, searchString }));
    });
  }

  ngOnDestroy(): void {
    this.searchSubject.unsubscribe();
  }
}
