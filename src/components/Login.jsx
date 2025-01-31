import React, { useState, useEffect } from "react";
import Page from "./Page";
import { Avatar, Typography, Box, Divider, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getUsersFromLocalStorage, removeUserFromLocalStorage } from "../services/users";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function Login() {
    const [users, setUsers] = useState([]);
    const { login } = useUser(); // Utilise la fonction login du contexte

    useEffect(() => {
        const storedUsers = getUsersFromLocalStorage();
        if (storedUsers) {
            setUsers(storedUsers);
        }
    }, []);

    const handleDeleteUser = (index) => {
        removeUserFromLocalStorage(index);
        const updatedUsers = [...users];
        updatedUsers.splice(index, 1);
        setUsers(updatedUsers);
        if (updatedUsers.length === 0) {
            window.location.href = "/create-user";
        }
    };

    const handleSelectUser = (index) => {
        const selectedUser = users[index];
        login(selectedUser); // Met à jour l'utilisateur dans le contexte
    };

    return (
        <Page> {/* Composant de la page */}
            <Box sx={{ marginBottom: 5, textAlign: 'center' }}>
                <Typography variant='h1'>Connexion au Pokedex</Typography> {/* Titre de la page */}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} >
                {/* Affichage de la liste des utilisateurs */}
                {users && users.length > 0 ? ( // Vérification si la liste des utilisateurs n'est pas vide
                    users.map((user, index) => ( // Boucle pour afficher chaque utilisateur
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Link key={index} to={`/pokedex`} style={{ textDecoration: 'none' }}>
                                {/* Lien pour sélectionner un utilisateur */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', width: '70%', justifyItems: 'left' }} onClick={() => handleSelectUser(index)} >
                                    <Avatar alt={`Avatar ${user.name}`} src={`/src/assets/${user.avatar}.jpg`} sx={{ width: 40, height: 40 }} />
                                    {/* Affichage de l'avatar et du nom de l'utilisateur */}
                                    <Typography>{user.name}</Typography>
                                </Box>
                            </Link>
                            <Box sx={{ width: '100%' }}></Box>
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
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
            <Link to="/create-user" style={{ textDecoration: 'none' }}>
                {/* Lien pour créer un nouvel utilisateur */}
                <Button variant="contained" fullWidth>Créer un utilisateur</Button>
            </Link>
        </Page>
    );
}

export default Login;
