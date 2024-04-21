import React from 'react'
import {Box, Container,Card, Typography, Avatar,Button} from '@mui/material'
import logo from '../assets/logo.png'
import { getCurrentUser, removeCurrentUser } from '../services/users';
import { Link,useNavigate } from 'react-router-dom';

function Page({children}) {

  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const handleLogout = () => {
    removeCurrentUser();
    navigate('/login');
  };

  return (
    <Box>
        <Box sx={{backgroundColor:"#F8F4F4",minHeight:'100vh'}}>
        <Container maxWidth="sm">
          <Box sx={{paddingTop:5,paddingBottom:6}}>
            <Box sx={{ marginBottom:5, maxWidth:'300px', marginX:'auto'}}>
              <img src={logo} alt="logo pokemon" />
            </Box>
            {currentUser && (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, marginBottom: 4 }}>
                  <Link to={`/pokedex`} style={{ textDecoration: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} >
                      <Avatar alt={`Avatar ${currentUser.name}`} src={"/src/assets/"+currentUser.avatar+".jpg"} sx={{ width: 40, height: 40 }} />
                      <Typography>Bonjour {currentUser.name}</Typography>
                    </Box>
                  </Link>
                  <Link to="/login" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" onClick={handleLogout}>Se déconnecter</Button>
                  </Link>
                </Box>
              )}
            <Card sx={{padding:2}}>
                {children}
            </Card>
          </Box>
        </Container>
        </Box>
    </Box>
  )
}

export default Page