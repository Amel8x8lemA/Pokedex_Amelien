
import React, { useState, useEffect } from 'react';
import Page from './Page';
import { Avatar, Typography, Box, Divider, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getUsersFromLocalStorage, removeUserFromLocalStorage } from '../services/users';
import { Link } from 'react-router-dom';
import { getCurrentUser, setCurrentUser, removeCurrentUser } from '../services/users'


function Login() {
    const [users, setUsers] = useState([]);

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
    };

    const handleSelectUser = (index) => {
        const selectedUser = users[index];
        setCurrentUser(selectedUser);
    };

    return (
        <Page>
            <Box sx={{ marginBottom: 5, textAlign: 'center' }}>
                <Typography variant='h1'>Connexion au Pokedex</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2}} >
                {users.map((user, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1}}>
                        <Link key={index} to={`/pokedex`} style={{ textDecoration: 'none' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={() => handleSelectUser(index)} >
                                <Avatar alt={`Avatar ${user.name}`} src={"/src/assets/"+user.avatar+".jpg"} sx={{ width: 40, height: 40 }} />
                                <Typography>{user.name}</Typography>
                            </Box>
                        </Link>
                        <IconButton aria-label="delete" color="primary" onClick={() => handleDeleteUser(index)}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                ))}
            </Box>
            <Divider sx={{ marginTop: 2, marginBottom: 2 }}/>
            <Link to="/create-user" style={{ textDecoration: 'none' }}>
                <Button variant="contained" fullWidth>Créer un utilisateur</Button>
            </Link>
        </Page>
    );
}

export default Login;