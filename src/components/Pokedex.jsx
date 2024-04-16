import React,{useEffect, useState} from 'react'
import {Container,Typography, Button, Box , Divider,Grid} from '@mui/material'
import ListPokemon from './ListPokemon'
import { getPokemonsInPokedex, removePokemonFromPokedex, } from '../services/pokedex'
import { useNavigate } from 'react-router-dom'
import Page from './Page'
import PokemonInPokedex from './PokemonInPokedex'

function Pokedex() {

   const [pokemonsInPokedex,setPokemonsInPokedex] = useState([])
   const navigate = useNavigate()

   useEffect(() => {
     const fetchPokemonsInPokedex = async () => {
         const _pokemonsInPokedex = await getPokemonsInPokedex()
         console.log('Pokemons in pokedex',_pokemonsInPokedex)
         setPokemonsInPokedex(_pokemonsInPokedex)
     }
     fetchPokemonsInPokedex()
    
   },[])

   const handleRefreshPokedex = async () => {
    const _pokemonsInPokedex = await getPokemonsInPokedex()
    setPokemonsInPokedex(_pokemonsInPokedex)
   }

   const handleDeletePokemon = async (pokemon) => {
    removePokemonFromPokedex(pokemon)
    const _pokemonsInPokedex = await getPokemonsInPokedex()
    setPokemonsInPokedex(_pokemonsInPokedex)
   }

   const handleViewPokemon = (pokemon) => {
    navigate(`/pokedex/${pokemon.name}`)
    console.log('View pokemon',pokemon)
   }



  return (
    <Page>

        <Box sx={{display:'flex',justifyContent:'center'}}>

            <Typography variant="h1">Pokedex</Typography>
       </Box>

       
    

       <Box sx={{marginY:4}}>
        {pokemonsInPokedex.length === 0 && <Typography variant="body1">Votre pokedex est vide</Typography>  }

        <Grid container spacing={2}> 
            {pokemonsInPokedex.map((pokemon,index) => (
                <PokemonInPokedex key={index} pokemon={pokemon} onDelete={handleDeletePokemon} onView={handleViewPokemon}/>
            ))}

        </Grid>

       </Box>

       <Divider sx={{marginBottom:2}} />


       <Button onClick={() => navigate('/pokedex/add')} variant="contained" color="primary" fullWidth>Chercher un pokemon</Button>

   

       



    </Page>
  )
}

export default Pokedex