import React, {useState,useEffect} from 'react'
import Page from './Page'
import Typography from '@mui/material/Typography'
import ListPokemon from './ListPokemon'
import { useNavigate } from 'react-router-dom'
import { getPokemonsInPokedex } from '../services/pokedex'
import { Box } from '@mui/material'

function AddPokedex() {

   const [pokemonsInPokedex,setPokemonsInPokedex] = useState([])
   const navigate = useNavigate()

   useEffect(() => {
     const fetchPokemonsInPokedex = async () => {
         const _pokemonsInPokedex = await getPokemonsInPokedex()
         setPokemonsInPokedex(_pokemonsInPokedex)
     }
     fetchPokemonsInPokedex()
    
   },[])


  return (
    <Page>
        <Box sx={{marginBottom:2,display:'flex',justifyContent:'center'}}>
            <Typography variant="h1">Chercher un pokemon</Typography>
        </Box>
        <ListPokemon pokemonsInPokedex={pokemonsInPokedex}/>
    </Page>
  )
}

export default AddPokedex