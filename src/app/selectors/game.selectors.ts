import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GameState } from '../reducers/game.reducer';


export const selectGameState = createFeatureSelector<GameState>('game');

export const selectGameList = createSelector(
    selectGameState,
    (state: GameState) => state.gameList
);

export const selectCurrentGameDetail = createSelector(
    selectGameState,
    (state: GameState) => state.currentGameDetail
);
