export const GET_POKEMONS_REQUESTED = 'reto/pokemon/GET_POKEMONS_REQUESTED'
export const GET_POKEMONS_SUCCESS = 'reto/pokemon/GET_POKEMONS_SUCCESS'
export const GET_POKEMONS_FAILURE = 'reto/pokemon/GET_POKEMONS_FAILURE'

export const GET_POKEMON_BY_NAME_REQUESTED = 'reto/pokemon/GET_POKEMON_BY_NAME_REQUESTED'
export const GET_POKEMON_BY_NAME_SUCCESS = 'reto/pokemon/GET_POKEMON_BY_NAME_SUCCESS'
export const GET_POKEMON_BY_NAME_FAILURE = 'reto/pokemon/GET_POKEMON_BY_NAME_FAILURE'

export const CHANGE_TERM = 'reto/pokemon/CHANGE_TERM'
export const SEARCH_POKEMON = 'reto/pokemon/SEARCH_POKEMON'
export const SELECT_POKEMON = 'reto/pokemon/SELECT_POKEMON'
export const CLEAN_ERROR = 'reto/pokemon/CLEAN_ERROR'

export function getPokemonsRequested(params: any) {
  return {
    type: GET_POKEMONS_REQUESTED,
    payload: params,
  }
}

export function getPokemonsSuccess(params: any) {
  return {
    type: GET_POKEMONS_SUCCESS,
    payload: params,
  }
}

export function getPokemonsFailure(params: any) {
  return {
    type: GET_POKEMONS_FAILURE,
    payload: params,
  }
}

export function getPokemonByNameRequested(params: any) {
  return {
    type: GET_POKEMON_BY_NAME_REQUESTED,
    payload: params,
  }
}

export function getPokemonByNameSuccess(params: any) {
  return {
    type: GET_POKEMON_BY_NAME_SUCCESS,
    payload: params,
  }
}

export function getPokemonByNameFailure(params: any) {
  return {
    type: GET_POKEMON_BY_NAME_FAILURE,
    payload: params,
  }
}

export function selectPokemon(params: any) {
  return {
    type: SELECT_POKEMON,
    payload: params
  }
}

export function searchPokemons(params: any) {
  return {
    type: SEARCH_POKEMON,
    payload: params
  }
}

export function changeTerm(params: any) {
  return {
    type: CHANGE_TERM,
    payload: params
  }
}

export function cleanError() {
  return {
    type: CLEAN_ERROR
  }
}