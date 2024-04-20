import React, { useEffect, useState } from 'react';
import { Avatar, Typography, Box, Button, Card, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import { getPokemonName, getPokemonImageUrl } from '../services/pokemons';

function PokemonCard({ pokemonNumber }) {

    const [pokemonName, setPokemonName] = useState('');
    const [pokemonImgUrl, setPokemonImgUrl] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const name = await getPokemonName(pokemonNumber);
            const imgUrl = getPokemonImageUrl(pokemonNumber);
            setPokemonName(name);
            setPokemonImgUrl(imgUrl);
        };
        fetchData();
    }, [pokemonNumber]);

    return (
        <Card>
            <CardMedia
                component="img"
                height="194"
                image={pokemonImgUrl}
                alt={pokemonName}
            />
            <Box sx={{ p: 2 }}>
                <Typography variant="h3">{pokemonName}</Typography>
                <Link to={`/pokemon-view/${pokemonNumber}`} style={{ textDecoration: 'none' }}>
                    <Button variant="contained" fullWidth>
                        Voir le pokemon
                    </Button>
                </Link>
            </Box>
        </Card>
    );
}

export default PokemonCard;