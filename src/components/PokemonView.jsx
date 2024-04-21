import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Typography, Box, Chip, Stack, Grid } from '@mui/material';
import { getCurrentUser, addPokemonToUser, removePokemonFromUser, isPokemonInPokedex } from '../services/users';
import Statistiques from './Statistiques'
import Page from './Page';

function PokemonView() {
    const currentUser = getCurrentUser();
    const { pokemonId } = useParams();
    const [isInPokedex, setIsInPokedex] = useState(false);

    const [fetchedPokemon, setFetchedPokemon] = useState({
        id: pokemonId,
        nom: "",
        image:
          "https://i.ibb.co/LrzXsZy/30-A26310-E4-C9-4272-BF0-C-0-A8-D932-BB877.png",
        stats: [],
        types: [],
    });

    const fetchPokemonApi = async () => {
        let r = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonId);
        let data = await r.json();

        const pokemon = {
            id: data["id"],
            nom: data["name"],
            image: data["sprites"]["other"]["official-artwork"]["front_default"],
            stats: data["stats"],
            types: data["types"],
        };

        setFetchedPokemon(pokemon);
    };

    useEffect(() => {
        fetchPokemonApi();
        setIsInPokedex(isPokemonInPokedex());
    }, []);


    const handleAddToPokedex = () => {
        addPokemonToUser(currentUser.id, pokemonId);
        setIsInPokedex(true);
    };

    const handleRemoveFromPokedex = () => {
        removePokemonFromUser(currentUser.id, pokemonId);
        setIsInPokedex(false);
    };

    return (
        <Page>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
                <Typography variant='h1' sx={{ width: '50%', textAlign: 'left' }}>{fetchedPokemon.nom}</Typography>
                <Typography variant='h3' sx={{ width: '50%', textAlign: 'right' }}>#{fetchedPokemon.id}</Typography>
            </Box>
            {fetchedPokemon["types"].length > 0 && (
                <Stack direction="row" spacing={1} sx={{ marginBottom: 2 }}>
                    {fetchedPokemon["types"].map((type) => (
                        <Chip key={type["type"]["name"]} label={type["type"]["name"]} />
                    ))}
                </Stack>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                <img src={fetchedPokemon.image} alt={"Image " + fetchedPokemon.nom} sx={{ width: '100%', Height: 'auto' }} />
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant='h3'>Statistiques</Typography>
            </Box>
            {fetchedPokemon["stats"].length > 0 && (
                <Box>
                    <Grid
                    sx={{
                        display: "flex",
                        marginBottom: 2,
                    }}
                    container
                    columns={3}
                    >
                    {fetchedPokemon["stats"].map((stat) => (
                        <Grid key={stat["stat"]["name"]} xs={1} sx={{ marginTop: 2, marginBottom: 2 }} item >
                            <Statistiques stat={stat} />
                        </Grid>
                    ))}
                    </Grid>
                </Box>
            )}
            {isInPokedex ? (
                <Box sx={{ marginBottom: 2 }}>
                    <Button variant="contained" fullWidth onClick={handleRemoveFromPokedex}>Supprimer du pokedex</Button>
                </Box>
            ) : (
                <Box sx={{ marginBottom: 2 }}>
                    <Button variant="contained" fullWidth onClick={handleAddToPokedex}>Ajouter dans le pokedex</Button>
                </Box>
            )}
            <Box>
                <Link to="/pokedex" style={{ textDecoration: 'none' }}>
                    <Button variant="outlined" fullWidth>Retour au pokedex</Button>
                </Link>
            </Box>
        </Page>
    );
}

export default PokemonView;
