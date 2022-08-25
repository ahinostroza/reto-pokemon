import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { Card, CardContent, Fab, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

interface IProps {
    id: number
    name: string
    ready: boolean
    onReady: (e: any) => void
}

const Pokemon = ({
    id,
    name,
    ready,
    onReady
}: IProps) => {
    return (
        <React.Fragment>
            <Link to={`/pokemon/${name}`} style={{ textDecoration: 'none' }}>
                <Card sx={{ textAlign: 'center', paddingTop: '24px', position: 'relative', cursor: 'pointer' }}>
                    {ready ? (
                        <Fab onClick={(e: any) => onReady(e) } size='small' color='secondary' aria-label='remove' sx={{ position: 'absolute', top: '10px', right: '10px', zIndex: '10' }}>
                            <DeleteIcon />
                        </Fab>
                    ): (
                        <Fab onClick={(e: any) => onReady(e)} size='small' color='primary' aria-label='add' sx={{ position: 'absolute', top: '10px', right: '10px', zIndex: '10' }}>
                            <AddIcon />
                        </Fab>
                    )}
                    <img
                        width='120'
                        height='120'
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                        alt=''
                    />
                    <CardContent>
                        <Typography gutterBottom variant='h5' component='div' sx={{ marginBottom: '0px', textTransform: 'capitalize' }}>
                            {name}
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        </React.Fragment>
    )
}

export default Pokemon