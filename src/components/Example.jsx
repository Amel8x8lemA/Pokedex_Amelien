import React from 'react'
import Page from './Page'
import { Button, Typography, Box } from '@mui/material'

function Example() {
  return (
    <Page>
        <Box sx={{marginBottom:1}}>
            <Typography variant='h1'>Page d'exemple</Typography>
        </Box>
        <Box sx={{marginBottom:1}}>
            <Typography>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum inventore, fugit nesciunt nemo quae accusantium ab fuga! Minima iste, beatae soluta assumenda tempore eum dolorem animi deserunt accusantium cumque nesciunt.</Typography>
        </Box>
        <Box sx={{marginBottom:1}}>
            <Button variant="contained">Cliquer ici</Button>
        </Box>

        <Box sx={{marginBottom:1}}>
            <Button variant="contained" fullWidth>Cliquer ici</Button>
        </Box>

    </Page>
  )
}

export default Example