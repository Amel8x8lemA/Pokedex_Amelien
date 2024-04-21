import React, { useState, useEffect } from 'react';
import Page from './Page';
import { Avatar, Typography, Box, Divider, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getUsersFromLocalStorage, removeUserFromLocalStorage } from '../services/users';
import { Link, useNavigate } from 'react-router-dom'; // Importation de Link et Navigate depuis react-router-dom
import { setCurrentUser } from '../services/users'; // Importation de la fonction setCurrentUser depuis le service users

function Login() {
    const [users, setUsers] = useState([]); // Déclaration de l'état users pour stocker les utilisateurs
    const navigate = useNavigate(); // Utilisation de useNavigate pour obtenir la fonction de navigation

    useEffect(() => {
        // Effet de côté pour récupérer les utilisateurs depuis le stockage local au chargement de la page
        const storedUsers = getUsersFromLocalStorage();
        if (storedUsers) {
            setUsers(storedUsers); // Mise à jour de l'état users avec les utilisateurs récupérés
        }
    }, []);

    const handleDeleteUser = (index) => {
        // Fonction pour supprimer un utilisateur de la liste
        removeUserFromLocalStorage(index); // Suppression de l'utilisateur du stockage local
        const updatedUsers = [...users]; // Création d'une copie de la liste des utilisateurs
        updatedUsers.splice(index, 1); // Suppression de l'utilisateur de la liste
        setUsers(updatedUsers); // Mise à jour de l'état users avec la liste mise à jour
        if (updatedUsers.length === 0) {
            window.location.href = "/create-user"; // Redirection vers la création d'utilisateur si la liste est vide
        }
    };

    const handleSelectUser = (index) => {
        // Fonction pour sélectionner un utilisateur
        const selectedUser = users[index]; // Récupération de l'utilisateur sélectionné
        setCurrentUser(selectedUser); // Définition de l'utilisateur sélectionné comme utilisateur actuel
        navigate("/pokedex");
    };

    return (
        <Page> {/* Composant de la page */}
            <Box sx={{ marginBottom: 5, textAlign: 'center' }}>
                <Typography variant='h1'>Connexion au Pokedex</Typography> {/* Titre de la page */}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2}} >
                {/* Affichage de la liste des utilisateurs */}
                {users && users.length > 0 ? ( // Vérification si la liste des utilisateurs n'est pas vide
                    users.map((user, index) => ( // Boucle pour afficher chaque utilisateur
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1}}>
                            <Link key={index} to={`/pokedex`} style={{ textDecoration: 'none' }}>
                                {/* Lien pour sélectionner un utilisateur */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', width: '70%', justifyItems:'left' }} onClick={() => handleSelectUser(index)} >
                                    <Avatar alt={`Avatar ${user.name}`} src={`/src/assets/${user.avatar}.jpg`} sx={{ width: 40, height: 40 }} />
                                    {/* Affichage de l'avatar et du nom de l'utilisateur */}
                                    <Typography>{user.name}</Typography>
                                </Box>
                            </Link>
                            <Box sx={{ width:'100%'}}></Box>
                            <IconButton aria-label="delete" onClick={() => handleDeleteUser(index)}>
                                {/* Bouton pour supprimer un utilisateur */}
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ))
                ) : (
                    <Box>
                        <Typography sx={{ marginLeft: 2 }}>Vous n'avez pas de compte utilisateur</Typography>
                        {/* Message si aucun utilisateur n'est trouvé */}
                    </Box>
                )}
            </Box>
            <Divider sx={{ marginTop: 2, marginBottom: 2 }}/>
            <Link to="/create-user" style={{ textDecoration: 'none' }}>
                {/* Lien pour créer un nouvel utilisateur */}
                <Button variant="contained" fullWidth>Créer un utilisateur</Button>
            </Link>
        </Page>
    );
}

export default Login;
