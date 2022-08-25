import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, IconButton, InputBase, Paper, Skeleton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

import { RootState } from '../store'
import { changeTerm, getPokemonsRequested, searchPokemons, selectPokemon } from '../store/modules/pokemon/actions'

import Pokemon from '../components/Pokemon'

const Home = () => {
    const term = useSelector((state: RootState) => state.pokemon.term)
    const loading = useSelector((state: RootState) => state.pokemon.loading)
    const pokemonData = useSelector((state: RootState) => state.pokemon.filterList)
    const dispatch = useDispatch()

    React.useEffect(() => {
        if (!pokemonData.length) {
            dispatch(getPokemonsRequested({ limit: 151, offset: 0 }))
        }
    }, [dispatch])

    const handlePokemonSelected = (e: any, id: number, isReady: boolean) => {
        e.preventDefault()
        dispatch(selectPokemon({ id, isReady }))
    }

    const handlePokemonSearch = (e: any) => {
        dispatch(changeTerm(e.target.value))
        dispatch(searchPokemons(e.target.value))
    }

    return (
        <React.Fragment>
            <Grid container component='div'>
                <Grid item xs={12} sx={{ p: '10px' }}>
                    <Paper
                        elevation={3}
                        variant="outlined"
                        sx={{ m: '0px auto', p: '2px 4px', display: 'flex', alignItems: 'center', maxWidth: 500 }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            onChange={(e) => handlePokemonSearch(e)}
                            value={term}
                            placeholder='Qué pokemón buscas...'
                            inputProps={{ 'aria-label': 'qué pokemón buscas...' }}
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </Grid>
                <Grid item container xs={12} rowSpacing={2} columnSpacing={2} sx={{ p: '15px 20px', justifyContent: 'center' }}>
                    {!loading ? (
                        <React.Fragment>
                            {pokemonData.map((item: any) => (
                                <Grid item xs={6} md={4} lg={3}>
                                    <Pokemon
                                        id={item.id}
                                        name={item.name}
                                        ready={item.isReady}
                                        onReady={(e: any) => handlePokemonSelected(e, item.id, !item.isReady)}
                                    />
                                </Grid>
                            ))}
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {Array(151).fill(0).map((_: any) => (
                                <Grid item xs={6} md={4} lg={3}>
                                    <Box sx={{ pt: 0.5 }}>
                                        <Skeleton animation="wave" variant="rectangular" height={180} />
                                        <Skeleton animation="wave" height={40} />
                                    </Box>
                                </Grid>
                            ))}
                        </React.Fragment>
                    )}
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Home