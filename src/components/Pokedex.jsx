import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Divider, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Page from './Page';
import PokemonCard from './PokemonCard';
import { getCurrentUserPokemons } from '../services/users';

function Pokedex() {
    const [userPokemons, setUserPokemons] = useState([]);

    useEffect(() => {
        const fetchUserPokemons = async () => {
            try {
                const userPokemons = getCurrentUserPokemons();
                setUserPokemons(userPokemons);
            } catch (error) {
                console.error('Error fetching user pokemons:', error);
            }
        };

        fetchUserPokemons();
    }, []);

    return (
        <Page>
            <Box sx={{ marginBottom: 5, textAlign: 'center' }}>
                <Typography variant='h1'>Pokedex</Typography>
            </Box>
            <Grid container spacing={2} columns={2}>
                {userPokemons && userPokemons.length > 0 ? (
                    userPokemons.map((pokemonId) => (
                        <Grid key={pokemonId} item xs={1} >
                            <PokemonCard pokemonNumber={pokemonId} />
                        </Grid>
                    ))
                ) : (
                    <Box>
                        <Typography>Votre pokedex est vide</Typography>
                    </Box>
                )}
            </Grid>
            <Divider sx={{ marginTop: 4, marginBottom: 2 }} />
            <Link to="/search-pokemon" style={{ textDecoration: 'none' }}>
                <Button variant="contained" fullWidth>Chercher un pokemon</Button>
            </Link>
        </Page>
    );
}

export default Pokedex;
