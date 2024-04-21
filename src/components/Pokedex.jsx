import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Divider, Grid } from '@mui/material'; // Importation des composants depuis MUI
import { Link } from 'react-router-dom'; // Importation de Link depuis react-router-dom
import Page from './Page'; // Importation du composant de page
import PokemonCard from './PokemonCard'; // Importation du composant PokemonCard
import { getCurrentUserPokemons } from '../services/users'; // Importation de la fonction pour récupérer les Pokémons de l'utilisateur

function Pokedex() {
    // Déclaration du composant Pokedex

    const [userPokemons, setUserPokemons] = useState([]); // État pour stocker les Pokémons de l'utilisateur

    useEffect(() => {
        // Effet pour charger les Pokémons de l'utilisateur lors du chargement de la page
        const fetchUserPokemons = async () => {
            try {
                const userPokemons = getCurrentUserPokemons(); // Récupération des Pokémons de l'utilisateur
                setUserPokemons(userPokemons); // Mise à jour de l'état avec les Pokémons de l'utilisateur
            } catch (error) {
                console.error('Error fetching user pokemons:', error); // Gestion des erreurs lors du chargement des Pokémons
            }
        };

        fetchUserPokemons(); // Appel de la fonction pour charger les Pokémons de l'utilisateur
    }, []);

    return (
        <Page> {/* Composant de la page */}
            <Box sx={{ marginBottom: 5, textAlign: 'center' }}>
                <Typography variant='h1'>Pokedex</Typography> {/* Titre de la page */}
            </Box>
            <Grid container spacing={2} columns={2}>
                {/* Grille pour afficher les cartes de Pokémons */}
                {userPokemons && userPokemons.length > 0 ? (
                    // Condition pour vérifier si l'utilisateur a des Pokémons
                    userPokemons.map((pokemonId) => (
                        // Mapping des Pokémons de l'utilisateur pour afficher les cartes
                        <Grid key={pokemonId} item xs={1} >
                            <PokemonCard pokemonNumber={pokemonId} /> {/* Affichage de la carte du Pokémon */}
                        </Grid>
                    ))
                ) : (
                    // Affichage si le Pokedex de l'utilisateur est vide
                    <Box>
                        <Typography sx={{ marginLeft: 2 }}>Votre pokedex est vide</Typography>
                    </Box>
                )}
            </Grid>
            <Divider sx={{ marginTop: 4, marginBottom: 2 }} /> {/* Séparateur */}
            <Link to="/search-pokemon" style={{ textDecoration: 'none' }}>
                {/* Bouton pour chercher un nouveau Pokémon */}
                <Button variant="contained" fullWidth>Chercher un pokemon</Button>
            </Link>
        </Page>
    );
}

export default Pokedex;
