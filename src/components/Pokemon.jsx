import React,{useState,useEffect} from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useParams } from 'react-router-dom'
import { getPokemonDetails } from '../services/pokeapi'
import { addPokemonInPokedex, getPokemonImage, isInPokemonsInPokedex, removePokemonFromPokedex } from '../services/pokedex'
import Button from '@mui/material/Button'
import Page from './Page'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'
import { Chip, Grid } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

function Pokemon() {

  const {slug} = useParams()

  const [pokemon,setPokemon] = useState({})
  const [isInPokedex,setIsInPokedex] = useState(false)
  const [image,setImage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPokemon = async () => {

      const _pokemon = await getPokemonDetails(slug)
      console.log('Pokemon',_pokemon)
      setIsInPokedex(isInPokemonsInPokedex(_pokemon))
      setPokemon(_pokemon)
      setImage(getPokemonImage(_pokemon))
    }
    fetchPokemon()
  },[])

  const handleAdd = () => {
    addPokemonInPokedex(pokemon)
    navigate('/pokedex')

  }

  const handleDelete = () => {
    removePokemonFromPokedex(pokemon)
    navigate('/pokedex')
  }

  return (
    <Page>

        <Box sx={{display:'flex',justifyContent:'space-between',marginBottom:2}}>
          <Typography variant="h1" sx={{textTransform:'capitalize'}}>
            {pokemon?.name}
          </Typography>
          <Typography variant='h2'>
            #{pokemon?.id}
          </Typography>
        </Box>

        <Box>
          {pokemon.types?.map((type,index) => (
            <Chip key={index} label={type.type.name} sx={{marginRight:1,textTransform:'capitalize'}}/>
          ))}
        </Box>

        <Box sx={{width:'300px',marginX:'auto',marginY:4}}>
          <img src={image} alt={pokemon?.name} style={{width:'100%'}}/>
        </Box>

        <Typography variant="h3" sx={{marginBottom:2}}>Statistiques</Typography>
        <Box sx={{display:'flex',gap: 2}}>
         
         <Grid container spacing={4}>
          {pokemon.stats?.map((stat,index) => (
            <Grid key={index} item xs={12} sm={4}>
              <Box  sx={{position:'relative',display:'flex',flexDirection:'column',alignItems:'center',gap:1}}>
                <Box sx={{position:'relative'}}>
                  <Typography sx={{position:'absolute',top:10,left:10}}variant="body1">{stat.base_stat}</Typography>
                  <CircularProgress variant="determinate" value={stat.base_stat} />
                </Box>
                <Typography variant="body1">{stat.stat.name}</Typography>
              </Box>
            </Grid>
          ))}
          </Grid>
        </Box>
        
        <Box sx={{marginTop:4}}>
          {isInPokedex ? 
          <Button variant="contained" fullWidth onClick={handleDelete}>Supprimer du pokedex</Button> : 
          <Button variant="contained" fullWidth onClick={handleAdd}>Ajouter dans le pokedex</Button>
          }
        </Box>
        <Box sx={{marginTop:2}}>
          <Button variant="outlined" fullWidth onClick={() => navigate('/pokedex')}>Retour au pokedex</Button>
        </Box>
    </Page>
  )
}

export default Pokemon