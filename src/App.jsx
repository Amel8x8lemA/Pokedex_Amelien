import { ThemeProvider, createTheme } from '@mui/material'
import { defaultTheme } from './assets/defaultTheme'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import CreateUser from './components/CreateUser'
import Login from './components/Login'
import Pokedex from './components/Pokedex'
import SearchPokemon from './components/SearchPokemon'
import PokemonView from './components/PokemonView'

function App() {

  const theme = createTheme(defaultTheme)

  return (
    <ThemeProvider theme={theme} >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/search-pokemon" element={<SearchPokemon />} />
          <Route path="/pokemon-view/:pokemonId" element={<PokemonView />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
