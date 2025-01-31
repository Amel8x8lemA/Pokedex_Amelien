import React from 'react';
import { Box, Container, Card, Typography, Avatar, Button } from '@mui/material'; // Importation des composants depuis MUI
import logo from '../assets/logo.png'; // Importation du logo Pokemon
import { Link, useNavigate } from 'react-router-dom'; // Importation de Link et useNavigate depuis react-router-dom
import { useUser } from '../contexts/UserContext';

function Page({ children }) {
  // Déclaration de la fonction de composant Page qui prend des enfants en paramètre

  const navigate = useNavigate();
  const { currentUser, logout } = useUser();

  const handleLogout = () => {   // Fonction pour gérer la déconnexion de l'utilisateur
    logout();           // Appel de la fonction logout du UserContext
    navigate('/login'); // Redirection vers la page de connexion
  };

  return (
    <Box>
      {/* Conteneur principal */}
      <Box sx={{ backgroundColor: '#F8F4F4', minHeight: '100vh' }}>
        {/* Boîte avec fond de couleur */}
        <Container maxWidth="sm">
          {/* Conteneur avec largeur maximale */}
          <Box sx={{ paddingTop: 5, paddingBottom: 6 }}>
            {/* Boîte avec padding en haut et en bas */}
            <Box sx={{ marginBottom: 5, maxWidth: '300px', marginX: 'auto' }}>
              {/* Logo Pokemon */}
              <img src={logo} alt="logo pokemon" />
            </Box>
            {/* Condition pour afficher le message de bienvenue et le bouton de déconnexion */}
            {currentUser && (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, marginBottom: 4 }}>
                <Link to={`/pokedex`} style={{ textDecoration: 'none' }}>
                  {/* Lien vers le Pokédex */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} >
                    {/* Avatar de l'utilisateur */}
                    <Avatar alt={`Avatar ${currentUser.name}`} src={`/avatars/${currentUser.avatar}.jpg`} sx={{ width: 40, height: 40 }} />
                    {/* Message de bienvenue */}
                    <Typography>Bonjour {currentUser.name}</Typography>
                  </Box>
                </Link>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  {/* Lien pour se déconnecter */}
                  <Button variant="contained" onClick={handleLogout}>Se déconnecter</Button>
                </Link>
              </Box>
            )}
            {/* Carte contenant les enfants */}
            <Card sx={{ padding: 2 }}>
              {children}
            </Card>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Page;
