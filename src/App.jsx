import { ThemeProvider, createTheme } from "@mui/material";
import { defaultTheme } from "./assets/defaultTheme";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider, useUser } from "./contexts/UserContext";
import "./App.css";

import CreateUser from "./components/CreateUser";
import Login from "./components/Login";
import Pokedex from "./components/Pokedex";
import SearchPokemon from "./components/SearchPokemon";
import PokemonView from "./components/PokemonView";

function App() {
  const theme = createTheme(defaultTheme);

  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <BrowserRouter>
          <RoutesComponent />
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  );
}

function RoutesComponent() {
  const { currentUser } = useUser();

  return (
    <Routes>
      {!currentUser ? (
        <Route path="/" element={<Navigate to="/login" />} />
      ) : (
        <Route path="/" element={<Pokedex />} />
      )}
      <Route path="/login" element={currentUser ? <Navigate to="/pokedex" /> : <Login />} />
      <Route path="/create-user" element={currentUser ? <Navigate to="/pokedex" /> : <CreateUser />} />
      <Route path="/pokedex" element={currentUser ? <Pokedex /> : <Navigate to="/login" />} />
      <Route path="/search-pokemon" element={currentUser ? <SearchPokemon /> : <Navigate to="/login" />} />
      <Route path="/pokemon-view/:pokemonId" element={currentUser ? <PokemonView /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
