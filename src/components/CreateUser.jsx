import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Ajout de useNavigate
import { Button, Typography, Box, Avatar, TextField, FormGroup, FormControl } from '@mui/material';
import { addUserToLocalStorage } from '/src/services/users';
import Page from './Page';

function CreateUser() {
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate(); // Utilisation de useNavigate pour obtenir la fonction de navigation

    const handleAvatarClick = (index) => {
        setSelectedAvatar(index);
    };

    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    };

    const handleAddUser = () => {
        if (!userName || selectedAvatar === null) {
            alert('Veuillez sélectionner un nom et un avatar.');
            return; // Annulation de la fonction si les conditions ne sont pas remplies
        }

        const newUser = {
            name: userName,
            avatar: selectedAvatar,
            pokemonNumbers: []
        };

        addUserToLocalStorage(newUser);
        
        setUserName('');
        setSelectedAvatar(null);

        // Redirection vers la page de connexion seulement si les conditions sont remplies
        navigate('/login');
    };

    return (
        <Page>
            <Box sx={{ marginBottom: 4, textAlign: 'center' }}>
                <Typography variant='h1'>Créer un utilisateur</Typography>
            </Box>
            <Box sx={{ marginBottom: 1 }}>
                <Typography variant='h2'>Choisir un avatar</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 4 }}>
                {[1, 2, 3].map((index) => (
                    <Avatar
                        key={index}
                        alt={`Avatar ${index}`}
                        src={`/src/assets/${index}.jpg`}
                        sx={{ width: 75, height: 75, opacity: selectedAvatar === index ? 1 : 0.5, cursor: 'pointer' }}
                        onClick={() => handleAvatarClick(index)}
                    />
                ))}
            </Box>

            <FormGroup>
                <FormControl sx={{ marginBottom: 2 }}>
                    <TextField fullWidth placeholder='Nom' value={userName} onChange={handleUserNameChange} />
                </FormControl>
                <FormControl>
                    <Button variant="contained" fullWidth onClick={handleAddUser}>Créer un compte</Button>
                </FormControl>
            </FormGroup>
        </Page>
    );
}

export default CreateUser;
