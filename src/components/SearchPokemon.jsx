import React, { useState, useEffect } from 'react';
import Page from './Page'; // Importation du composant Page pour la mise en page
import { Typography, Box, TextField, Grid, CircularProgress } from '@mui/material'; // Importation des composants depuis MUI
import PokemonCard from './PokemonCard'; // Importation du composant PokemonCard

function SearchPokemon() {
    const [pokemonList, setPokemonList] = useState([]); // État pour stocker la liste complète des Pokémon
    const [searchTerm, setSearchTerm] = useState(''); // État pour stocker le terme de recherche saisi par l'utilisateur
    const [filteredPokemonList, setFilteredPokemonList] = useState([]); // État pour stocker la liste filtrée des Pokémon

    useEffect(() => {
        // Fonction pour récupérer la liste complète des Pokémon depuis l'API
        const fetchPokemonList = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150'); // Appel à l'API pour récupérer la liste des Pokémon
                if (response.ok) {
                    const data = await response.json(); // Conversion de la réponse en JSON
                    setPokemonList(data.results); // Mise à jour de l'état avec la liste complète des Pokémon
                    setFilteredPokemonList(data.results); // Mise à jour de l'état avec la liste filtrée des Pokémon (initialement identique à la liste complète)
                } else {
                    console.error('Failed to fetch Pokemon list'); // Affichage d'une erreur si la récupération de la liste des Pokémon échoue
                }
            } catch (error) {
                console.error('Error fetching Pokemon list:', error); // Affichage d'une erreur en cas d'échec de la récupération de la liste des Pokémon
            }
        };

        fetchPokemonList(); // Appel de la fonction pour récupérer la liste des Pokémon au chargement du composant
    }, []);

    // Fonction pour gérer le changement du terme de recherche
    const handleSearchTermChange = (event) => {
        const searchTerm = event.target.value.toLowerCase(); // Conversion du terme de recherche en minuscules
        setSearchTerm(searchTerm); // Mise à jour de l'état avec le nouveau terme de recherche
        filterPokemonList(searchTerm); // Filtrage de la liste des Pokémon en fonction du terme de recherche
    };

    // Fonction pour filtrer la liste des Pokémon en fonction du terme de recherche
    const filterPokemonList = (searchTerm) => {
        if (!searchTerm) {
            setFilteredPokemonList(pokemonList); // Si le terme de recherche est vide, afficher la liste complète des Pokémon
            return;
        }

        // Filtrage de la liste des Pokémon en fonction du terme de recherche
        const filteredList = pokemonList.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm)
        );
        setFilteredPokemonList(filteredList); // Mise à jour de l'état avec la liste filtrée des Pokémon
    };

    return (
        <Page> {/* Utilisation du composant Page pour la mise en page */}
            <Box sx={{ marginBottom: 2, textAlign: 'center' }}>
                <Typography variant='h1'>Chercher un Pokémon</Typography> {/* Titre de la page */}
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <TextField fullWidth placeholder='Recherche ...' value={searchTerm} onChange={handleSearchTermChange} /> {/* Champ de recherche pour saisir le terme de recherche */}
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography>{filteredPokemonList.length} pokemons trouvés</Typography> {/* Affichage du nombre de Pokémon trouvés */}
            </Box>
            <Grid container spacing={2} columns={2}>
                {/* Affichage d'un indicateur de chargement si aucun Pokémon n'est trouvé. Sinon, affichage des cartes Pokémon */}
                {filteredPokemonList.length === 0 ? ( 
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    filteredPokemonList.map((pokemon, index) => (
                        <Grid key={pokemon.name} item xs={1}>
                            <PokemonCard pokemonNumber={index + 1} />
                        </Grid>
                    ))
                )}
            </Grid>
        </Page>
    );
}

export default SearchPokemon;
