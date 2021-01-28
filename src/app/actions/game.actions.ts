import { createAction, props } from '@ngrx/store';
import { Game } from '../models/game';

export const searchGame = createAction(
    '[Game] Search Game',
    props<{ limit: number, searchString: string }>()
);

export const setGameList = createAction(
    '[Game] Set Game List',
    props<{ gameList: Game[] }>()
);

export const setNextPageUrl = createAction(
    '[Game] Set Next Page Url',
    props<{ next: string }>()
);


export const getGameById = createAction(
    '[Game] Get Game By Id',
    props<{ gameId: string }>()
);

export const setGameDetail = createAction(
    '[Game] Set Game Detail',
    props<{ gameDetail: Game }>()
);

export const loadNextGameList = createAction(
    '[Game] Load Next Game List'
);

export const concatGameList = createAction(
    '[Game] Concat Game List',
    props<{ gameList: Game[] }>()
);


