import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Pokedex from './components/Pokedex'
import Pokemon from './components/Pokemon'
import { ThemeProvider,Typography,createTheme } from '@mui/material'
import { defaultTheme } from './assets/defaultTheme'
import './App.css'
import AddUser from './components/AddUser'
import AddPokedex from './components/AddPokedex'

function App() {

  const theme = createTheme(defaultTheme)
  


  return (
    <>
      <ThemeProvider theme={theme} >
        <BrowserRouter>
          <Routes>
            <Route index element={<Login />}/>
            <Route path="/add-user" element={<AddUser />}/>
            <Route path="/pokedex" element={<Pokedex />}/>
            <Route path="/pokedex/add" element={<AddPokedex />}/>
            <Route path="/pokedex/:slug" element={<Pokemon />}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
