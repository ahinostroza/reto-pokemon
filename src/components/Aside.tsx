import React from 'react'
import { blue } from '@mui/material/colors'
import { Global } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, styled, SwipeableDrawer, Typography, useMediaQuery, useTheme } from '@mui/material'

import { RootState } from '../store'
import { selectPokemon } from '../store/modules/pokemon/actions'

import Empty from './Empty'
import Pokemon from './Pokemon'

interface Props {
    window?: () => Window;
}

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? blue[600] : blue[300],
}));

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? blue[800] : blue[300],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}))

const Aside = ({
    window
}: Props) => {
    const theme = useTheme()
    const isMobileOnly = useMediaQuery(theme.breakpoints.down('md'))
    const pokemonData = useSelector((state: RootState) => state.pokemon.list)
    const dispatch = useDispatch()

    const drawerBleeding = 65
    const container = window !== undefined ? () => window().document.body : undefined

    const [open, setOpen] = React.useState(false)

    const toggleDrawer = (open: boolean) => () => {
        setOpen(open)
    }

    const handlePokemonSelected = (e: any, id: number, isReady: boolean) => {
        e.preventDefault()
        dispatch(selectPokemon({ id, isReady }))
    }

    return (
        <React.Fragment>
            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                        height: `calc(50% - ${drawerBleeding}px)`,
                        overflow: 'visible'
                    }
                }}
            />
            {isMobileOnly ? (
                <SwipeableDrawer
                    container={container}
                    anchor='bottom'
                    open={open}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                    swipeAreaWidth={drawerBleeding}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    <StyledBox
                        sx={{
                            position: 'absolute',
                            top: -drawerBleeding,
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8,
                            visibility: 'visible',
                            right: 0,
                            left: 0
                        }}
                    >
                        <Puller />
                        <Typography sx={{ p: '25px 16px 16px', color: '#fff', fontWeight: 'bold' }}>LISTOS PARA EL COMBATE</Typography>
                    </StyledBox>
                    <StyledBox
                        sx={{
                            px: 2,
                            pb: 2,
                            height: '100%',
                            overflow: 'auto',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Grid container xs={12} rowSpacing={2} columnSpacing={2} sx={{ p: '15px 20px', justifyContent: 'center', marginLeft: '0px' }}>
                            {pokemonData
                                .filter((item: any) => item.isReady)
                                .length ? (
                                <React.Fragment>
                                    {pokemonData
                                        .filter((item: any) => item.isReady)
                                        .map((item: any) => (
                                            <Grid item xs={6} md={false} lg={false}>
                                                <Pokemon
                                                    id={item.id}
                                                    name={item.name}
                                                    ready={item.isReady}
                                                    onReady={(e: any) => handlePokemonSelected(e, item.id, !item.isReady)} />
                                            </Grid>
                                        ))}
                                </React.Fragment>
                            ) : (
                                <Empty />
                            )}
                        </Grid>
                    </StyledBox>
                </SwipeableDrawer>
            ) : (
                <Grid item component='aside' xs={12} md={4} sx={{
                    width: '100%',
                    padding: '15px',
                    height: 'calc(100vh - 85px)',
                    position: 'fixed',
                    right: '0px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? blue[600] : blue[300],
                }}>
                    <Box sx={{ width: '100%' }}>
                        <Typography textAlign='center' sx={{ p: '25px 16px 16px', color: '#fff', fontWeight: 'bold', fontSize: '1.2rem' }}>LISTOS PARA EL COMBATE</Typography>
                        <Grid item container xs={12} rowSpacing={2} columnSpacing={2} sx={{ p: '15px 20px', justifyContent: 'center' }}>
                            {pokemonData
                                .filter((item: any) => item.isReady)
                                .length ? (
                                <React.Fragment>
                                    {pokemonData
                                        .filter((item: any) => item.isReady)
                                        .map((item: any) => (
                                            <Grid item xs={false} md={6} lg={5}>
                                                <Pokemon
                                                    id={item.id}
                                                    name={item.name}
                                                    ready={item.isReady}
                                                    onReady={(e: any) => handlePokemonSelected(e, item.id, !item.isReady)} />
                                            </Grid>
                                        ))}
                                </React.Fragment>
                            ) : (
                                <Empty />
                            )}
                        </Grid>
                    </Box>
                </Grid>
            )}
        </React.Fragment>
    )
}

export default Aside