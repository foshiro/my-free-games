import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { catchError, concatMap, withLatestFrom } from 'rxjs/operators';

import { GameService } from '../services/game.service';
import {
    searchGame,
    getGameById,
    setGameList,
    setGameDetail,
    loadNextGameList,
    setNextPageUrl, concatGameList
} from '../actions/game.actions';
import { Game, SearchResponse } from '../models/game';
import { GameState } from '../reducers/game.reducer';
import { selectNextPageUrl } from '../selectors/game.selectors';

@Injectable()
export class GameEffects {
    constructor(
        private actions$: Actions,
        private store: Store<GameState>,
        private gameService: GameService
    ) {}

    searchGame$ = createEffect(() =>
        this.actions$.pipe(
            ofType(searchGame),
            concatMap(({ limit, searchString }) => this.gameService.searchGame(limit, searchString)
                .pipe(
                    concatMap((response: SearchResponse) => {
                        return of(
                            setGameList({ gameList: response.results }),
                            setNextPageUrl({ next: response.next })
                        );
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

    loadNextGameList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadNextGameList),
            withLatestFrom(
                this.store.pipe(select(selectNextPageUrl))
            ),
            concatMap(([{}, nextUrl]) => this.gameService.loadNextGameList(nextUrl)
                .pipe(
                    concatMap((response: SearchResponse) => {
                        return of(
                            concatGameList({ gameList: response.results }),
                            setNextPageUrl({ next: response.next })
                        );
                    }),
                    catchError(() => EMPTY)
                )
            )
        )
    );
}
