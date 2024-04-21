import React, { useEffect, useState } from 'react';
import { Typography, Box, Button, Card, CardMedia } from '@mui/material'; // Importation des composants depuis MUI
import { Link } from 'react-router-dom'; // Importation de Link depuis react-router-dom

function PokemonCard({ pokemonNumber }) {
    // Déclaration du composant PokemonCard qui prend le numéro du Pokémon comme argument

    const { pokemonId } = pokemonNumber; // Extraction du numéro du Pokémon

    // État pour stocker les données du Pokémon récupérées de l'API
    const [fetchedPokemon, setFetchedPokemon] = useState({
        id: pokemonId,
        nom: "",
        image: "https://i.ibb.co/LrzXsZy/30-A26310-E4-C9-4272-BF0-C-0-A8-D932-BB877.png" // Image par défaut
    });

    // Fonction pour récupérer les données du Pokémon depuis l'API
    const fetchPokemonApi = async () => {
        let r = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonNumber); // Appel à l'API pour récupérer les données du Pokémon
        let data = await r.json(); // Conversion de la réponse en JSON

        // Création de l'objet Pokémon avec les données récupérées
        const pokemon = {
            id: data["id"],
            nom: data["name"],
            image: data["sprites"]["other"]["official-artwork"]["front_default"]
        };

        setFetchedPokemon(pokemon); // Mise à jour de l'état avec les données du Pokémon
    };

    useEffect(() => { fetchPokemonApi(); }, []); // Effet pour appeler la fonction fetchPokemonApi au chargement du composant

    return (
        <Card variant="outlined" sx={{ p: 2 }}> {/* Carte pour afficher les détails du Pokémon */}
            <CardMedia
                component="img"
                image={fetchedPokemon.image} // Image du Pokémon
                alt={fetchedPokemon.nom} // Nom du Pokémon pour l'attribut alt de l'image
            />
            <Box sx={{ display: 'flex', flexDirection:'column', alignItems: 'center', gap: 1}}>
                {/* Section pour afficher le nom du Pokémon et un bouton pour voir les détails */}
                <Typography variant="h3">{fetchedPokemon.nom}</Typography> {/* Affichage du nom du Pokémon */}
                <Box sx={{ width:'100%' }}>
                    <Link to={`/pokemon-view/${fetchedPokemon.id}`} style={{ textDecoration: 'none' }}>
                        {/* Bouton pour voir les détails du Pokémon */}
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
