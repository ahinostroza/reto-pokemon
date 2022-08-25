import React from 'react'
import { Box, Typography } from '@mui/material'

const Empty = () => {
    return (
        <Box>
            <Typography textAlign='center'>Lista vacía, no hay</Typography>
            <Typography textAlign='center'>ningún pokemón</Typography>
            <Typography textAlign='center'>listo</Typography>
        </Box>
    )
}

export default Empty