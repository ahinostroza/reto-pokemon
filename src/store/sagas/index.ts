import { all, fork } from 'redux-saga/effects';

import pokemonWatcherSaga from './pokemon'

export default function* rootSaga() {
    yield all([
        fork(pokemonWatcherSaga)
    ])
}