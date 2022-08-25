interface IPokemon {
    name: string
    url: string
}

export const denormalizePokemons = (data: IPokemon[]) => {
    return data.map(({ name, url }) => {
        const regex = "https://pokeapi.co/api/v2/pokemon/"
        return {
            id: parseInt(url.replace(regex, '').replace('/', '')),
            name: name,
            isReady: false
        }
    })
}

export const denormalizePokemon = (data: any) => {
    return {
        ...data,
        stats_total: data.stats.reduce((a: any, b: any) => a + b.base_stat, 0)
    }
}