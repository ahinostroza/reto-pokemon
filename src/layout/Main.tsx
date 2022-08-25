import React from 'react'
import { Alert, createTheme, Grid, Snackbar, ThemeProvider, useMediaQuery } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../store'
import { cleanError } from '../store/modules/pokemon/actions'

import Header from '../components/Header'
import Aside from '../components/Aside'

const theme = createTheme()

const MainLayout = () => {
    const isMobileOnly = useMediaQuery(theme.breakpoints.down('md'))
    const error = useSelector((state: RootState) => state.pokemon.error)
    const errorMessage = useSelector((state: RootState) => state.pokemon.errorMessage)

    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(cleanError())
    }

    return (
        <ThemeProvider theme={theme}>
            <Header />
            <Grid container component='main' sx={{ height: '100%', marginTop: '85px', overflow: 'hidden' }}>
                <Grid component='section' item xs={false} md={8} sx={{ width: '100%', padding: '15px', paddingBottom: isMobileOnly ? '65px': '' }}>
                    <Outlet />
                </Grid>
                <Aside />
            </Grid>
            <Snackbar open={Boolean(error)} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </ThemeProvider>
    )
}

export default MainLayout