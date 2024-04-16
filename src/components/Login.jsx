import React from 'react'
import {Container,Typography,Box, FormControl, FormLabel, FormGroup, FormHelperText, TextField, Button,Card} from '@mui/material'
import Users from './Users'
import AddUser from './AddUser'
import Page from './Page'

function Login() {
  return (
   <Page>
    <Box sx={{display:'flex',justifyContent:'center',marginBottom:3}}>
      <Typography variant='h1'>Connexion au Pokedex</Typography>
    </Box>


    <Users />

   </Page>
  )
}

export default Login