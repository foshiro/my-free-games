import { Action, createReducer, on } from '@ngrx/store';
import { setGameDetail, setGameList, setNextPageUrl, concatGameList } from '../actions/game.actions';
import { Game } from '../models/game';

export interface GameState {
    gameList: Game[];
    currentGameDetail: Game;
    nextPageUrl: string;
}

export const initialState: GameState = {
    gameList: [],
    currentGameDetail: {
        name: '',
        background_image: '',
        rating: '',
        slug: '',
        description: '',
    },
    nextPageUrl: ''
};

const gameReducer = createReducer(
    initialState,
    on(setGameList, (state, { gameList }) => {
        return { ...state, gameList };
    }),
    on(setGameDetail, (state, { gameDetail }) => {
        return { ...state, currentGameDetail: gameDetail};
    }),
    on(setNextPageUrl, (state, { next }) => {
        return { ...state, nextPageUrl: next};
    }),
    on(concatGameList, (state, { gameList }) => {
        return { ...state, gameList: state.gameList.concat(gameList)}
    })
);

export function reducer(state: GameState, action: Action) {
    return gameReducer(state, action);
}
