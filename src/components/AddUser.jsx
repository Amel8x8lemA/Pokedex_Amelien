import React, {useState} from 'react'
import {Container,Typography,Box, FormControl, FormLabel, FormGroup, FormHelperText, TextField, Button,Avatar} from '@mui/material'
import { createUser, setCurrentUser } from '../services/users'
import Page from './Page'
import { avatars } from '../services/avatars'
import { useNavigate } from 'react-router-dom'


function AddUser() {

   const [name, setName] = useState('')
   const [avatarSelect, setAvatarSelect] = useState(null)
   const navigate = useNavigate()


  const handleAddUser = () => {
    console.log('Add user',name)
    createUser(name,avatarSelect)
    setCurrentUser(name,avatarSelect)
    navigate('/pokedex')
    setName('')
  }

  const handleSelectAvatar = (avatar) => {
    setAvatarSelect(avatar)
  }


  



  return (
        <Page>

            <Box sx={{marginBottom:2,display:'flex',justifyContent:'center'}}>
                <Typography variant='h1'>Créer un utilisateur</Typography>
            </Box>

            <Box sx={{marginBottom:4}}>
                <Box sx={{marginBottom:1}}>
                    <Typography variant='h4'>Choisir un avatar</Typography>
                </Box>
                <Box sx={{display:'flex',gap:1}}>
                    {avatars.map((avatar,index) => (
                        <Avatar key={index} alt={avatar.name} src={avatar.src} 
                            sx={{width:75,height:75,opacity:avatarSelect?.id === avatar.id ? 1 : 0.5,cursor:'pointer'}}
                            onClick={() => {handleSelectAvatar(avatar)}}
                        />
                    ))}
                </Box>
            </Box>


            <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend"></FormLabel>
                <FormGroup fullWidth sx={{marginBottom:2}}>
                <TextField
                    id="name"
                    label="Nom"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    fullWidth
                />
                </FormGroup>
                <FormGroup>
                <Button variant="contained" onClick={handleAddUser}>
                    Créer un compte
                </Button>
                </FormGroup>
            </FormControl>  
        </Page> 
  )
}

export default AddUser