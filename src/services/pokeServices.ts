import api from '../config/api'

const pokeServices = {
    getPokemons: (params: { limit: number, offset: number }, data = {}) =>
        api.get(`/api/v2/pokemon?limit=${params.limit}&offset=${params.offset}`, { data: data }),
    getPokemonByName: (name: string, data = {}) =>
        api.get(`/api/v2/pokemon/${name}`, { data: data })
}

export default pokeServices