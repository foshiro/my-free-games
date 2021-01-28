import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, concatMap } from 'rxjs/operators';

import { GameService } from '../services/game.service';
import { searchGame, getGameById, setGameList, setGameDetail } from '../actions/game.actions';
import { Game } from '../models/game';

@Injectable()
export class GameEffects {
    constructor(
        private actions$: Actions,
        private gameService: GameService
    ) {}

    searchGame$ = createEffect(() =>
        this.actions$.pipe(
            ofType(searchGame),
            concatMap(({ limit, searchString }) => this.gameService.searchGame(limit, searchString)
                .pipe(
                    concatMap((gameList: Game[]) => {
                        return of(setGameList({ gameList }));
                    }),
                    catchError(() => EMPTY)
                )
            )
        )
    );

    getGameById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getGameById),
            concatMap(({ gameId }) => this.gameService.getGameById(gameId)
                .pipe(
                    concatMap((gameDetail: Game) => {
                        return of(setGameDetail({ gameDetail }));
                    }),
                    catchError(() => EMPTY)
                )
            )
        )
    );
}
