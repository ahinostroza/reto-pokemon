import React from 'react'
import { Fab } from '@mui/material'

interface IProps {
    item: any
}

const Type = ({
    item
}: IProps) => {

    const backgroundSelected = (type: string) => {
        switch (type) {
            case 'grass':
                return '#78c850'
            case 'fire':
                return '#f08030'
            case 'water':
                return '#6890f0'
            case 'bug':
                return '#a8b820'
            case 'normal':
                return '#a8a878'
            case 'poison':
                return '#a040a0'
            case 'electric':
                return '#f8d030'
            case 'ground':
                return '#e0c068'
            case 'fairy':
                return '#ee99ac'
            case 'fighting':
                return '#c03028'
            case 'psychic':
                return '#f85888'
            case 'rock':
                return '#b8a038'
            case 'ghost':
                return '#705898'
            case 'ice':
                return '#98d8d8'
            case 'dragon':
                return '#7038f8'
        }
    }

    return (
        <React.Fragment>
            <Fab variant='extended' size='small' color='secondary' aria-label='remove' sx={{ p: 2, backgroundColor: backgroundSelected(item.type.name) }}>
                {item.type.name}
            </Fab>
        </React.Fragment>
    )
}

export default Type