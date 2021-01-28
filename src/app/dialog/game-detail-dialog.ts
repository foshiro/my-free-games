import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Game } from '../models/game';
import { getGameById, setGameDetail } from '../actions/game.actions';
import { GameState } from '../reducers/game.reducer';
import { selectCurrentGameDetail } from '../selectors/game.selectors';

@Component({
    selector: 'game-detail-dialog',
    templateUrl: 'game-detail-dialog.html',
})
export class GameDetailDialog implements OnInit {
    public gameDetail$: Observable<Game> = this.store.pipe(select(selectCurrentGameDetail));;

    constructor(
        private store: Store<GameState>,
        private dialogRef: MatDialogRef<GameDetailDialog>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {}

    ngOnInit() {
        this.store.dispatch(setGameDetail({ gameDetail: null }));
        this.store.dispatch(getGameById({ gameId: this.data.gameId }));
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
