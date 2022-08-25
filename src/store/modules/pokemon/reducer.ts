
import {
    GET_POKEMONS_FAILURE,
    GET_POKEMONS_SUCCESS,
    GET_POKEMONS_REQUESTED,
    GET_POKEMON_BY_NAME_REQUESTED, 
    GET_POKEMON_BY_NAME_SUCCESS, 
    GET_POKEMON_BY_NAME_FAILURE,
    SEARCH_POKEMON,
    SELECT_POKEMON,
    CLEAN_ERROR,
    CHANGE_TERM
} from './actions'

const initialState = {
    list: [],
    filterList: [],
    term: '',
    pokemon: null,
    loading: false,
    error: false,
    errorMessage: ''
}

const searchPokemons = (state: any, action: any) => {
    const term = action.payload
    let searchList = [...state.list]
    searchList = (+term) ?
        searchList.filter(item => `${item.id}`.includes(`${term}`)) :
        searchList.filter(item => item.name.toLocaleLowerCase().includes(`${term}`.toLocaleLowerCase()))
    return {
        ...state,
        filterList: [...searchList]
    }
}

const updatePokemonSelected = (state: any, action: any) => {
    const { id, isReady } = action.payload
    const pokemonData = [...state.list]
    const filterData = [...state.filterList]
    const readyList = pokemonData.filter(item => item.isReady)
    if (isReady) {
        if (readyList.length === 6) {
            return {
                ...state,
                error: true,
                errorMessage: 'Se debe seleccionar máximo 6 pokemones'
            }
        } else {
            const iList = pokemonData.findIndex(item => item.id === id)
            const iFilterList = filterData.findIndex(item => item.id === id)
            pokemonData[iList].isReady = isReady
            filterData[iFilterList].isReady = isReady
            return {
                ...state,
                list: [...pokemonData],
                filterList: [...filterData]
            }
        }
    } else {
        const iList = pokemonData.findIndex(item => item.id === id)
        const iFilterList = filterData.findIndex(item => item.id === id)
        pokemonData[iList].isReady = isReady
        filterData[iFilterList].isReady = isReady
        return {
            ...state,
            list: [...pokemonData],
            filterList: [...filterData]
        }
    }
}

export function reducer(state = initialState, action: any) {
    switch (action.type) {
        case GET_POKEMONS_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case GET_POKEMONS_SUCCESS:
            return {
                ...state,
                loading: false,
                list: action.payload,
                filterList: action.payload
            }
        case GET_POKEMONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: action.payload
            }
        case GET_POKEMON_BY_NAME_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case GET_POKEMON_BY_NAME_SUCCESS:
            return {
                ...state,
                loading: false,
                pokemon: action.payload
            }
        case GET_POKEMON_BY_NAME_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: action.payload
            }
        case SEARCH_POKEMON:
            return searchPokemons(state, action)
        case SELECT_POKEMON:
            return updatePokemonSelected(state, action)
        case CHANGE_TERM:
            return {
                ...state,
                term: action.payload
            }
        case CLEAN_ERROR:
            return {
                ...state,
                error: false,
                errorMessage: ''
            }
        default:
            return state
    }
}