import { all, call, put, take, takeLatest } from 'redux-saga/effects'
import { denormalizePokemons, denormalizePokemon } from '../../schemas/pokemon';
import { 
    getPokemonsFailure,
    getPokemonsSuccess,
    GET_POKEMONS_REQUESTED,
    getPokemonByNameSuccess,
    getPokemonByNameFailure,
    GET_POKEMON_BY_NAME_REQUESTED,
    SEARCH_POKEMON,
    SELECT_POKEMON,
    CHANGE_TERM,
    CLEAN_ERROR
} from '../modules/pokemon/actions'
import pokemonServices from '../../services/pokeServices'

export function* getPokemons(action: any): any {
    try {
        const response = yield call(pokemonServices.getPokemons, action.payload)
        const { results } = response.data
        yield put(getPokemonsSuccess(denormalizePokemons(results)))
    } catch (error: any) {
        const errorMessage =
            error.response && error.response.data ? { ...error.response.data, message: error.response.data.error } : error
        yield put(getPokemonsFailure(errorMessage))
    }
}

export function* getPokemonByName(action: any): any {
    try {
        const response = yield call(pokemonServices.getPokemonByName, action.payload)
        yield put(getPokemonByNameSuccess(denormalizePokemon(response.data)))
    } catch (error: any) {
        const errorMessage =
            error.response && error.response.data ? { ...error.response.data, message: error.response.data.error } : error
        yield put(getPokemonByNameFailure(errorMessage))
    }
}

export default function* pokemonWatcherSaga(): any {
    yield all([
        take(CHANGE_TERM),
        take(SEARCH_POKEMON),
        take(SELECT_POKEMON),
        take(CLEAN_ERROR),
        yield takeLatest(GET_POKEMONS_REQUESTED, getPokemons),
        yield takeLatest(GET_POKEMON_BY_NAME_REQUESTED, getPokemonByName)
    ])
}