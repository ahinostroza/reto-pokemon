import React from 'react'
import { AppBar, Toolbar } from '@mui/material'

import logo from '../assets/images/logo.png'

const Header = () => {
    return (
        <React.Fragment>
            <AppBar position='fixed' color='inherit'>
                <Toolbar sx={{ paddingTop: '10px', paddingBottom: '10px', borderBottom: 1, borderColor: 'divider', justifyContent: 'center' }}>
                    <img alt='Logo' width={160} src={logo} />
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default Header