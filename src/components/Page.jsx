import React from 'react'
import {Box, Container,Card, Typography, Avatar,Button} from '@mui/material'
import logo from '../assets/logo.png'
import { getCurrentUser, removeCurrentUser } from '../services/users'
import { useNavigate } from 'react-router-dom'

function Page({children}) {

    const navigate = useNavigate()


    const currentUser = getCurrentUser()
    console.log(currentUser)
    const logout = () => {
        console.log('logout')
        removeCurrentUser()
        navigate('/')

    }


    return (
        <Box>
            <Box sx={{backgroundColor:"#F8F4F4",minHeight:'100vh'}}>
            <Container maxWidth="sm">
              <Box sx={{paddingTop:5,paddingBottom:6}}>
                <Box sx={{marginBottom:5,maxWidth:'300px',marginX:'auto'}}>
                    <img src={logo} alt="logo pokemon" />
                </Box>
                {currentUser && (
                  <Box sx={{marginBottom:2, display:'flex',alignItems:'center',gap:2,justifyContent:'center'}}>
                    <Avatar sx={{width:50,height:50}} src={currentUser.avatar.src} />
                    <Typography variant='body1'>
                      Bonjour {currentUser.name}
                    </Typography>
                    <Button onClick={logout} variant="contained">Se deconnecter</Button>
                    
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