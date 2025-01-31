import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importation de useNavigate pour la navigation
import { Button, Typography, Box, Avatar, TextField, FormGroup, FormControl } from '@mui/material';
import { addUserToLocalStorage } from '/src/services/users'; // Importation de la fonction pour ajouter un utilisateur au stockage local
import Page from './Page'; // Importation du composant de page

function CreateUser() {
    const [selectedAvatar, setSelectedAvatar] = useState(null); // État pour suivre l'avatar sélectionné
    const [userName, setUserName] = useState(''); // État pour suivre le nom d'utilisateur saisi
    const navigate = useNavigate(); // Utilisation de useNavigate pour obtenir la fonction de navigation

    // Gère le clic sur un avatar en mettant à jour l'avatar sélectionné
    const handleAvatarClick = (index) => {
        setSelectedAvatar(index);
    };

    // Gère le changement du nom d'utilisateur en mettant à jour l'état correspondant
    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    };

    // Ajoute un nouvel utilisateur au stockage local avec le nom, l'avatar et une liste de numéros de Pokémon vides
    const handleAddUser = () => {
        if (!userName || selectedAvatar === null) { // Vérifie si un nom et un avatar ont été sélectionnés
            alert('Veuillez sélectionner un nom et un avatar.');
            return; // Annulation de la fonction si les conditions ne sont pas remplies
        }

        const newUser = { // Crée un nouvel utilisateur avec les données saisies
            name: userName,
            avatar: selectedAvatar,
            pokemonNumbers: []
        };

        addUserToLocalStorage(newUser); // Ajoute le nouvel utilisateur au stockage local
        
        setUserName(''); // Réinitialise le nom d'utilisateur après l'ajout
        setSelectedAvatar(null); // Réinitialise l'avatar sélectionné après l'ajout

        // Redirection vers la page de connexion seulement si les conditions sont remplies
        navigate('/login');
    };

    return (
        <Page> {/* Composant de la page */}
            <Box sx={{ marginBottom: 4, textAlign: 'center' }}> {/* Titre */}
                <Typography variant='h1'>Créer un utilisateur</Typography>
            </Box>
            <Box sx={{ marginBottom: 1 }}> {/* Sous-titre pour choisir un avatar */}
                <Typography variant='h2'>Choisir un avatar</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 4 }}> {/* Affichage des avatars */}
                {[1, 2, 3].map((index) => (
                    <Avatar
                        key={index}
                        alt={`Avatar ${index}`}
                        src={`/avatars/${index}.jpg`}
                        sx={{ width: 75, height: 75, opacity: selectedAvatar === index ? 1 : 0.5, cursor: 'pointer' }}
                        onClick={() => handleAvatarClick(index)}
                    />
                ))}
            </Box>

            {/* Formulaire pour saisir le nom d'utilisateur et créer un compte */}
            <FormGroup>
                <FormControl sx={{ marginBottom: 2 }}> {/* Champ de saisie du nom */}
                    <TextField fullWidth placeholder='Nom' value={userName} onChange={handleUserNameChange} />
                </FormControl>
                <FormControl> {/* Bouton pour créer un compte */}
                    <Button variant="contained" fullWidth onClick={handleAddUser}>Créer un compte</Button>
                </FormControl>
            </FormGroup>
        </Page>
    );
}

export default CreateUser;
