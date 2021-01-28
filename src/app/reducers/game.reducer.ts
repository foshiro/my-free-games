import { Action, createReducer, on } from '@ngrx/store';
import { setGameDetail, setGameList } from '../actions/game.actions';
import { Game } from '../models/game';

export interface GameState {
    gameList: Game[];
    currentGameDetail: Game;
}

export const initialState: GameState = {
    gameList: [],
    currentGameDetail: {
        name: '',
        background_image: '',
        rating: '',
        slug: '',
        description: '',
    }
};

const gameReducer = createReducer(
    initialState,
    on(setGameList, (state, { gameList }) => {
        return { ...state, gameList };
    }),
    on(setGameDetail, (state, { gameDetail }) => {
        return { ...state, currentGameDetail: gameDetail};
    })
);

export function reducer(state: GameState, action: Action) {
    return gameReducer(state, action);
}
