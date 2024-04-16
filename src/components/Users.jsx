import React, {useState} from 'react'
import { deleteUser, getUsers, setCurrentUser } from '../services/users'
import { Box,List, ListItem, ListItemText, ListItemButton,ListItemIcon,Divider,Button,Avatar} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import AddUser from './AddUser'
import DeleteIcon from '@mui/icons-material/Delete';



function Users() {

  const [users, setUsers] = useState(getUsers())
  console.log('Users',users)

  const navigate = useNavigate()

  const handleSelectUser = (user) => {
    console.log(user)
    setCurrentUser(user.name, user.avatar)
    navigate('/pokedex')
  }

  const handleDeleteUser = (user) => {
    deleteUser(user)
    setUsers(getUsers())
  }


  return (
    <Box>
       
        <List>
        {users.map((user,index) => (
            <ListItem key={index}>
                <ListItemButton onClick={()=>{handleSelectUser(user)}}>
                    <ListItemIcon>
                        <Avatar alt={user.name} src={user?.avatar?.src} />
                    </ListItemIcon>
                    <ListItemText primary={user.name} />
                </ListItemButton>
                <ListItemButton sx={{display:'flex',justifyContent:'flex-end'}} onClick={()=>{handleDeleteUser(user)}}>
                        <ListItemIcon>
                            <DeleteIcon />
                        </ListItemIcon>
                </ListItemButton>
            </ListItem>
        ))}

        <Box sx={{marginBottom:2}}>
            <Divider />
        </Box>

        <Button variant="contained" fullWidth onClick={()=>{navigate('/add-user')}}>Créer un utilisateur</Button>
        
        </List>
    </Box>

  )
}

export default Users