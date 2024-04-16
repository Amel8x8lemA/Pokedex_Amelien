import React from 'react'
import { Card, Grid, Typography,Box,Button } from '@mui/material'
import { getPokemonImage } from '../services/pokedex'
import { useNavigate } from 'react-router-dom'

function PokemonInPokedex({pokemon}) {

  const navigate = useNavigate()

  const imageUrl = getPokemonImage(pokemon)
  const handleClick = () => {
    navigate(`/pokedex/${pokemon.name}`)
  }


  return (
    <Grid item xs={12} sm={6}>
        <Card sx={{border:'1px solid #00000040',padding:2}}>
          <Box sx={{maxWidth:'100px',marginX:'auto',marginBottom:2}}>
            <img src={imageUrl} alt={pokemon?.name} style={{width:'100%'}}/>
          </Box>
          <Box sx={{display:'flex',justifyContent:'center'}}>
            <Typography variant="h6" sx={{textTransform:'capitalize'}}>{pokemon?.name}</Typography>
          </Box>

          <Box sx={{width:'100%'}}>
            <Button variant="contained" onClick={handleClick} fullWidth>
                Voir le pokemon 
            </Button>
          </Box>

        </Card>
    </Grid>
  )
}

export default PokemonInPokedex