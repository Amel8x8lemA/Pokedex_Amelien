import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Typography, Box, Chip, Stack, Grid, CircularProgress } from '@mui/material';
import { getPokemonName, getPokemonImageUrl } from '../services/pokemons';
import { getCurrentUser } from '../services/users';
import { addPokemonToUser } from '../services/users';
import Page from './Page';

function PokemonView() {
    const { pokemonId } = useParams();
    const [pokemonName, setPokemonName] = useState(null);
    const [pokemonImgUrl, setPokemonImgUrl] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const name = await getPokemonName(pokemonId);
            const imgUrl = getPokemonImageUrl(pokemonId);
            setPokemonName(name);
            setPokemonImgUrl(imgUrl);
        };
        fetchData();
    }, [pokemonId]);

    const handleAddToPokedex = () => {
        const currentUser = getCurrentUser();
        if (currentUser) {
            addPokemonToUser(currentUser.id, pokemonId);
        }
    };

    return (
        <Page>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
                <Typography variant='h1' sx={{ width: '50%', textAlign: 'left' }}>{pokemonName}</Typography>
                <Typography variant='h3' sx={{ width: '50%', textAlign: 'right' }}>#{pokemonId}</Typography>
            </Box>
            <Stack direction="row" spacing={1} sx={{ marginBottom: 2 }}>
                <Chip label="Type 1" />
                <Chip label="Type 1" />
            </Stack>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                <img src={pokemonImgUrl} alt={"Image " + pokemonName} sx={{ width: '100%', Height: 'auto' }} />
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant='h3'>Statistiques</Typography>
            </Box>
            <Box sx={{ marginBottom: 3 }}>
                <Grid>
                    <div style={{ position: 'relative' }}>
                        <CircularProgress variant="determinate" value={25} >25</CircularProgress>
                        <Typography variant="caption" component="div" color="textSecondary" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>25</Typography>
                    </div>
                    <CircularProgress variant="determinate" value={25} >25</CircularProgress>
                    <CircularProgress variant="determinate" value={50} />
                    <CircularProgress variant="determinate" value={75} />
                </Grid>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Button variant="contained" fullWidth onClick={handleAddToPokedex}>Ajouter dans le pokedex</Button>
            </Box>
            <Box>
                <Link to="/pokedex" style={{ textDecoration: 'none' }}>
                    <Button variant="outlined" fullWidth>Retour au pokedex</Button>
                </Link>
            </Box>
        </Page>
    );
}

export default PokemonView;
