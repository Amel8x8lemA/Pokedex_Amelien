import React,{useEffect, useState} from 'react'
import { getPokemonsinPokeAPI } from '../services/pokeapi'
import { Box, Typography } from '@mui/material'
import { TextField, Button, Grid } from '@mui/material'
import { addPokemonInPokedex } from '../services/pokedex'
import PokemonInPokedex from './PokemonInPokedex'

function ListPokemon({onAddPokemon,pokemonsInPokedex}) {

   const [pokemons,setPokemons] = useState([])
   const [search,setSearch] = useState('')

   useEffect(() => {
    const fetchPokemons = async () => {
        const _pokemons = await getPokemonsinPokeAPI()
        setPokemons(_pokemons)
    }
    fetchPokemons()
   
   },[])


   const handleSearch = (e) => setSearch(e.target.value)

   const filterPokemons = (pokemons) => {


        //Pokedex filter
        pokemons = pokemons.filter(pokemon => !pokemonsInPokedex.find(p => p.name === pokemon.name))
        // Search Filter
        if(search.length > 0){
            pokemons = pokemons.filter(pokemon => {
                const name = pokemon?.name.toLowerCase()
                const searchValue = search.toLowerCase()
                return name.includes(searchValue)
            }) 
        }

       return pokemons
   }

   const handleAddPokemon = (pokemon) => {
       addPokemonInPokedex(pokemon)
       onAddPokemon()
   }


  return (
    <Box>
        <Box sx={{marginBottom:2}}>
            <TextField value={search} onChange={handleSearch} fullWidth placeholder='Recherche ...'/>
        </Box>
        <Box>
            <Typography sx={{marginBottom:2}}>{filterPokemons(pokemons).length} pokemons trouvés</Typography> 
            <Grid container spacing={2}>
            {filterPokemons(pokemons).map((pokemon,index) => (
                <PokemonInPokedex key={index} pokemon={pokemon} addPokemonInPokedex={handleAddPokemon}/>
            ))}
            </Grid>
        </Box>
    </Box>
  )
}

export default ListPokemon