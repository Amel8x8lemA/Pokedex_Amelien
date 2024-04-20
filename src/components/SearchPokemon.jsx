import React, { useState, useEffect } from 'react';
import Page from './Page';
import { Typography, Box, TextField, Grid, CircularProgress } from '@mui/material';
import PokemonCard from './PokemonCard';
import { getPokemonNumberByName } from '../services/pokemons';

function SearchPokemon() {
    const [pokemonList, setPokemonList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPokemonList, setFilteredPokemonList] = useState([]);

    useEffect(() => {
        // Fonction pour récupérer la liste de tous les Pokémon depuis l'API
        const fetchPokemonList = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
                if (response.ok) {
                    const data = await response.json();
                    setPokemonList(data.results);
                    setFilteredPokemonList(data.results);
                } else {
                    console.error('Failed to fetch Pokemon list');
                }
            } catch (error) {
                console.error('Error fetching Pokemon list:', error);
            }
        };

        fetchPokemonList();
    }, []);

    const handleSearchTermChange = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        filterPokemonList(searchTerm);
    };

    const filterPokemonList = (searchTerm) => {
        if (!searchTerm) {
            setFilteredPokemonList(pokemonList);
            return;
        }

        const filteredList = pokemonList.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm)
        );
        setFilteredPokemonList(filteredList);
    };

    return (
        <Page>
            <Box sx={{ marginBottom: 2, textAlign: 'center' }}>
                <Typography variant='h1'>Chercher un Pokémon</Typography>
            </Box>
            <Box sx={{ marginBottom: 2, textAlign: 'center' }}>
                <TextField fullWidth placeholder='Recherche ...' value={searchTerm} onChange={handleSearchTermChange} />
            </Box>
            <Grid container spacing={2}>
                {filteredPokemonList.length === 0 ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    filteredPokemonList.map((pokemon) => (
                        <Grid key={pokemon.name} item xs={12} sm={6} md={4} lg={3} xl={2}>
                            <PokemonCard pokemonNumber={getPokemonNumberByName(pokemon.name)} />
                        </Grid>
                    ))
                )}
            </Grid>
        </Page>
    );
}

export default SearchPokemon;
