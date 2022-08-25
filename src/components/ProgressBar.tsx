import React from 'react'
import { Box, LinearProgress, Typography } from '@mui/material'

interface IProps {
    value: number
    total: number
    label: string
}

const ProgressBar = ({
    value,
    total,
    label
}: IProps) => {
    
    const abbreviateName = (name: string) => {
        switch (name) {
            case 'hp':
                return 'HP'
            case 'attack':
                return 'ATK'
            case 'defense':
                return 'DEF'
            case 'special-attack':
                return 'STK'
            case 'special-defense':
                return 'SEF'
            case 'speed':
                return 'SPD'
        }
    }

    return (
        <Box display='flex' alignItems='center' justifyContent='center'>
            <Box width='15px' mr={2}>
                <Typography gutterBottom variant='inherit' component='div' sx={{ marginBottom: '0px', textTransform: 'capitalize', fontSize: '.7rem' }}>
                    {abbreviateName(label)}
                </Typography>
            </Box>
            <Box width='100%'>
                <LinearProgress variant='determinate' value={((value * 100) / total)} sx={{ height: '9px', borderRadius: '4px' }} />
            </Box>
            <Box width='80px' ml={1}>
                <Typography gutterBottom variant='inherit' component='div' sx={{ marginBottom: '0px', textTransform: 'capitalize', fontSize: '.7rem' }}>
                    {value} / {total}
                </Typography>
            </Box>
        </Box>
    )
}

export default ProgressBar