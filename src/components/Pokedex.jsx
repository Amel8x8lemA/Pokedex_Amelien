import React from 'react';
import { useParams } from 'react-router-dom';
import Page from './Page';
import { Avatar, Typography, Box, Divider, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getUsersFromLocalStorage, removeUserFromLocalStorage } from '../services/users';
import { getCurrentUser, removeCurrentUser } from '../services/users';
import { Link } from 'react-router-dom';

function Pokedex() {

    const currentUser = getCurrentUser();

    return (
        <Page>
            <Box sx={{ marginBottom: 5, textAlign: 'center' }}>
                <Typography variant='h1'>Pokedex</Typography>
            </Box>
            <Link to="/search-pokemon" style={{ textDecoration: 'none' }}>
                <Button variant="contained" fullWidth>Chercher un pokemon</Button>
            </Link>
        </Page>
    );
}

export default Pokedex;
