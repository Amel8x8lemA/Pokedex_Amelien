import React, { useEffect, useState } from 'react';
import { Typography, Box, Button, Card, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import { WidthFull } from '@mui/icons-material';

function PokemonCard({ pokemonNumber }) {
    
    const { pokemonId } = pokemonNumber;

    const [fetchedPokemon, setFetchedPokemon] = useState({
        id: pokemonId,
        nom: "",
        image:
          "https://i.ibb.co/LrzXsZy/30-A26310-E4-C9-4272-BF0-C-0-A8-D932-BB877.png"
    });

    const fetchPokemonApi = async () => {
        let r = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonNumber);
        let data = await r.json();

        const pokemon = {
            id: data["id"],
            nom: data["name"],
            image: data["sprites"]["other"]["official-artwork"]["front_default"]
        };

        setFetchedPokemon(pokemon);
    };

    useEffect(() => { fetchPokemonApi(); }, []);

    return (
        <Card variant="outlined" sx={{ p: 2 }}>
            <CardMedia
                component="img"
                image={fetchedPokemon.image}
                alt={fetchedPokemon.nom}
            />
            <Box sx={{ display: 'flex', flexDirection:'column', alignItems: 'center', gap: 1}}>
                <Typography variant="h3">{fetchedPokemon.nom}</Typography>
                <Box sx={{ width:'100%' }}>
                    <Link to={`/pokemon-view/${fetchedPokemon.id}`} style={{ textDecoration: 'none' }} sx={{WidthFull}}>
                        <Button variant="contained" fullWidth>
                            Voir le pokemon
                        </Button>
                    </Link>
                </Box>
                
            </Box>
        </Card>
    );
}

export default PokemonCard;