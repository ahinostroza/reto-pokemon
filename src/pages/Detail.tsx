import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Button, Container, createTheme, Fab, Grid, Skeleton, Typography, useMediaQuery } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'

import { RootState } from '../store'
import { getPokemonByNameRequested, selectPokemon } from '../store/modules/pokemon/actions';
import { KeyboardBackspace } from '@mui/icons-material'
import Type from '../components/Type'
import ProgressBar from '../components/ProgressBar'

const theme = createTheme()

const Detail = () => {
    const { name } = useParams()
    const dispatch = useDispatch()

    const isMobileOnly = useMediaQuery(theme.breakpoints.down('md'))
    const loading = useSelector((state: RootState) => state.pokemon.loading)
    const pokemonDetail = useSelector((state: RootState) => state.pokemon.pokemon)
    const pokemonData = useSelector((state: RootState) => state.pokemon.list)
    const ready: any = pokemonData.find((item: any) => item.name === name).isReady || false

    React.useEffect(() => {
        dispatch(getPokemonByNameRequested(name))
    }, [dispatch, name])

    const handlePokemonSelected = (id: number, isReady: boolean) => {
        dispatch(selectPokemon({ id, isReady }))
    }

    return (
        <React.Fragment>
            <Grid container component='div'>
                <Grid item container xs={12} sx={{ p: '10px' }} justifyContent='space-between'>
                    <Link to='/' style={{ textDecoration: 'none', color: '#1e88e5' }}>
                        <Button variant='text'>
                            <KeyboardBackspace sx={{ mr: 1 }} />
                            Regresar
                        </Button>
                    </Link>
                    {!loading && pokemonDetail ? (
                        <React.Fragment>
                            {ready ? (
                                <Fab onClick={() => handlePokemonSelected(pokemonDetail.id, !ready)} variant={isMobileOnly ? 'circular' : 'extended'} size='small' color='secondary' aria-label='remove' sx={{ p: 2 }}>
                                    <DeleteIcon />
                                    {!isMobileOnly && (`Eliminar de la lista`)}
                                </Fab>
                            ) : (
                                <Fab onClick={() => handlePokemonSelected(pokemonDetail.id, !ready)} variant={isMobileOnly ? 'circular' : 'extended'} size='small' color='primary' aria-label='add' sx={{ p: 2 }}>
                                    <AddIcon />
                                    {!isMobileOnly && (`Agregar a la lista`)}
                                </Fab>
                            )}
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Skeleton animation="wave" width={isMobileOnly ? 40 : 200} variant={isMobileOnly ? 'circular' : 'rounded'} height={40} />
                        </React.Fragment>
                    )}
                </Grid>
                <Container maxWidth='sm'>
                    <Grid item xs={12} sx={{ p: '10px' }} textAlign='center' justifyContent='center'>
                        {!loading && pokemonDetail ? (
                            <img
                                alt='Imagen Pokemón'
                                style={{ width: '100%', maxHeight: '250px' }}
                                src={pokemonDetail.sprites.other.dream_world.front_default}
                            />
                        ) : (
                            <Skeleton animation="wave" variant="rectangular" sx={{ height: 190 }} />
                        )}
                    </Grid>
                    <Grid item xs={12} sx={{ p: '10px' }} textAlign='center'>
                        {!loading && pokemonDetail ? (
                            <Typography gutterBottom variant='h1' component='div' sx={{ marginBottom: '0px', textTransform: 'capitalize', fontSize: '1.5rem', fontWeight: '500' }}>
                                {pokemonDetail.name}
                            </Typography>
                        ) : (
                            <Skeleton animation="wave" width='60%' sx={{ margin: '0px auto' }} />
                        )}
                    </Grid>
                    <Grid item container xs={12} rowSpacing={loading ? 0 : 2} columnSpacing={loading ? 0 : 2} sx={{ p: '10px' }} justifyContent='center'>
                        {!loading && pokemonDetail ? (
                            <React.Fragment>
                                {pokemonDetail.types.map((item: any) =>
                                    <Grid item xs={6} md={4} lg={3} textAlign='center'>
                                        <Type item={item} />
                                    </Grid>
                                )}
                            </React.Fragment>
                        ) : (
                            <Skeleton animation="wave" width='70%' sx={{ margin: '0px auto' }} />
                        )}

                    </Grid>
                    <Grid item container xs={12} sx={{ p: '10px' }} textAlign='center' justifyContent='center'>
                        <Grid item xs={6} textAlign='center'>
                            {!loading && pokemonDetail ? (
                                <Typography gutterBottom variant='inherit' component='div' sx={{ marginBottom: '0px', textTransform: 'capitalize', fontWeight: '500' }}>
                                    {pokemonDetail.weight} KG
                                </Typography>
                            ) : (
                                <Skeleton animation="wave" width='100px' sx={{ margin: '0px auto' }} />
                            )}
                            {!loading && pokemonDetail ? (
                                <Typography gutterBottom variant='inherit' component='div' sx={{ marginBottom: '0px', textTransform: 'capitalize', fontSize: '.6rem', marginTop: '10px' }}>
                                    Weight
                                </Typography>
                            ) : (
                                <Skeleton animation="wave" width='100px' sx={{ margin: '0px auto' }} />
                            )}
                        </Grid>
                        <Grid item xs={6} textAlign='center'>
                            {!loading && pokemonDetail ? (
                                <Typography gutterBottom variant='inherit' component='div' sx={{ marginBottom: '0px', textTransform: 'capitalize', fontWeight: '500' }}>
                                    {pokemonDetail.height} M
                                </Typography>
                            ) : (
                                <Skeleton animation="wave" width='100px' sx={{ margin: '0px auto' }} />
                            )}
                            {!loading && pokemonDetail ? (
                                <Typography gutterBottom variant='inherit' component='div' sx={{ marginBottom: '0px', textTransform: 'capitalize', fontSize: '.6rem', marginTop: '10px' }}>
                                    Height
                                </Typography>
                            ) : (
                                <Skeleton animation="wave" width='100px' sx={{ margin: '0px auto' }} />
                            )}
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} sx={{ p: '10px' }} textAlign='center' justifyContent='center'>
                        <Typography gutterBottom variant='inherit' component='div' sx={{ marginBottom: '0px', textTransform: 'capitalize', fontWeight: '500', fontSize: '1.2rem' }}>
                            Base Stats
                        </Typography>
                        {!loading && pokemonDetail ? (
                            <React.Fragment>
                                {pokemonDetail.stats.map((item: any) => (
                                    <Grid item xs={12} sx={{ p: '10px' }}>
                                        <ProgressBar value={item.base_stat} total={200} label={item.stat.name} />
                                    </Grid>
                                ))}
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {Array(6).fill(0).map((_: any) => (
                                    <Grid item xs={12} sx={{ p: '5px' }}>
                                        <Skeleton animation="wave" />
                                    </Grid>
                                ))}
                            </React.Fragment>
                        )}
                    </Grid>
                </Container>
            </Grid>
        </React.Fragment>
    )
}

export default Detail