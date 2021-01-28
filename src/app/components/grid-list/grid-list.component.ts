import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { GameState } from '../../reducers/game.reducer';
import { Game } from '../../models/game';
import { selectGameList } from '../../selectors/game.selectors';
import { GameDetailDialog } from '../dialog/game-detail-dialog';

@Component({
  selector: 'grid-list',
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.scss']
})
export class GridListComponent {
  public gameList$: Observable<Game[]> = this.store.pipe(select(selectGameList));

  constructor(
    private store: Store<GameState>,
    private dialog: MatDialog) {}

    openDetail(gameId: string) {
      this.dialog.open(GameDetailDialog, {
        data: {
          gameId: gameId
        }
      });
    }
}
