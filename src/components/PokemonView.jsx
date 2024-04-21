import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Importation de useParams et Link depuis react-router-dom
import { Button, Typography, Box, Chip, Stack, Grid } from '@mui/material'; // Importation des composants depuis MUI
import { getCurrentUser, addPokemonToUser, removePokemonFromUser, isPokemonInPokedex } from '../services/users'; // Importation des fonctions liées à l'utilisateur depuis le service users
import Statistiques from './Statistiques'; // Importation du composant Statistiques
import Page from './Page'; // Importation du composant Page

function PokemonView() {
    const currentUser = getCurrentUser(); // Récupération de l'utilisateur actuel
    const { pokemonId } = useParams(); // Récupération du paramètre pokemonId de l'URL
    const [isInPokedex, setIsInPokedex] = useState(false); // État pour indiquer si le Pokémon est dans le Pokédex de l'utilisateur

    // État pour stocker les données du Pokémon récupérées de l'API
    const [fetchedPokemon, setFetchedPokemon] = useState({
        id: pokemonId,
        nom: "",
        image: "https://i.ibb.co/LrzXsZy/30-A26310-E4-C9-4272-BF0-C-0-A8-D932-BB877.png",
        stats: [],
        types: [],
    });

    // Fonction pour récupérer les données du Pokémon depuis l'API
    const fetchPokemonApi = async () => {
        let r = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonId); // Appel à l'API pour récupérer les données du Pokémon
        let data = await r.json(); // Conversion de la réponse en JSON

        // Création de l'objet Pokémon avec les données récupérées
        const pokemon = {
            id: data["id"],
            nom: data["name"],
            image: data["sprites"]["other"]["official-artwork"]["front_default"],
            stats: data["stats"],
            types: data["types"],
        };

        setFetchedPokemon(pokemon); // Mise à jour de l'état avec les données du Pokémon
    };

    useEffect(() => {
        fetchPokemonApi(); // Appel de la fonction fetchPokemonApi au chargement du composant
        setIsInPokedex(isPokemonInPokedex(pokemonId)); // Vérification si le Pokémon est dans le Pokédex de l'utilisateur
    }, []);

    // Fonction pour ajouter le Pokémon au Pokédex de l'utilisateur
    const handleAddToPokedex = () => {
        addPokemonToUser(currentUser.id, pokemonId); // Appel de la fonction pour ajouter le Pokémon au Pokédex de l'utilisateur
        setIsInPokedex(true); // Mise à jour de l'état pour indiquer que le Pokémon est maintenant dans le Pokédex
    };

    // Fonction pour supprimer le Pokémon du Pokédex de l'utilisateur
    const handleRemoveFromPokedex = () => {
        removePokemonFromUser(currentUser.id, pokemonId); // Appel de la fonction pour supprimer le Pokémon du Pokédex de l'utilisateur
        setIsInPokedex(false); // Mise à jour de l'état pour indiquer que le Pokémon n'est plus dans le Pokédex
    };

    return (
        <Page> {/* Utilisation du composant Page pour la mise en page */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
                <Typography variant='h1' sx={{ width: '50%', textAlign: 'left' }}>{fetchedPokemon.nom}</Typography> {/* Affichage du nom du Pokémon */}
                <Typography variant='h3' sx={{ width: '50%', textAlign: 'right' }}>#{fetchedPokemon.id}</Typography> {/* Affichage de l'identifiant du Pokémon */}
            </Box>
            {/* Affichage des types du Pokémon */}
            {fetchedPokemon["types"].length > 0 && ( 
                <Stack direction="row" spacing={1} sx={{ marginBottom: 2 }}>
                    {fetchedPokemon["types"].map((type) => (
                        <Chip key={type["type"]["name"]} label={type["type"]["name"]} />
                    ))}
                </Stack>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                <img src={fetchedPokemon.image} alt={"Image " + fetchedPokemon.nom} sx={{ width: '100%', Height: 'auto' }} /> {/* Affichage de l'image du Pokémon */}
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant='h3'>Statistiques</Typography> {/* Titre pour les statistiques du Pokémon */}
            </Box>
            {/* Affichage des statistiques du Pokémon */}
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
                            <Statistiques stat={stat} /> {/* Affichage des statistiques du Pokémon */}
                        </Grid>
                    ))}
                    </Grid>
                </Box>
            )}
            {/* Affichage du bouton pour supprimer ou pour ajouter, selon si le pokemon est présent dans le pokedex */}
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
                    <Button variant="outlined" fullWidth>Retour au pokedex</Button> {/* Bouton pour retourner au Pokédex */}
                </Link>
            </Box>
        </Page>
    );
}

export default PokemonView;
