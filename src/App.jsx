import { ThemeProvider, createTheme } from '@mui/material'
import { defaultTheme } from './assets/defaultTheme'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getCurrentUser, getUsersFromLocalStorage } from './services/users';
import './App.css'
import CreateUser from './components/CreateUser'
import Login from './components/Login'
import Pokedex from './components/Pokedex'
import SearchPokemon from './components/SearchPokemon'
import PokemonView from './components/PokemonView'

function App() {

  const theme = createTheme(defaultTheme)
  const currentUser = getCurrentUser();

  return (
    <ThemeProvider theme={theme} >
      <BrowserRouter>
        <Routes>
          {!currentUser ? (
            <Route path="/" element={<Login />} />
          ) : (
            <Route path="/" element={<Pokedex />} />
          )}
          <Route path="/login" element={currentUser ? <Navigate to="/pokedex" /> : <Login />} />
          <Route path="/create-user" element={currentUser ? <Navigate to="/pokedex" /> : <CreateUser />} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/search-pokemon" element={<SearchPokemon />} />
          <Route path="/pokemon-view/:pokemonId" element={<PokemonView />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
