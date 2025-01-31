import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser, setCurrentUser, removeCurrentUser } from "../services/users";

// Crée le contexte utilisateur
const UserContext = createContext();

// Fournisseur du contexte utilisateur
export const UserProvider = ({ children }) => {
  const [currentUser, setUser] = useState(null);

  // Charge l'utilisateur actuel depuis le localStorage au montage
  useEffect(() => {
    const user = getCurrentUser();
    setUser(user);
  }, []);

  // Fonction pour se connecter
  const login = (user) => {
    setCurrentUser(user);
    setUser(user);
  };

  // Fonction pour se déconnecter
  const logout = () => {
    removeCurrentUser();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook pour accéder facilement au contexte
export const useUser = () => useContext(UserContext);
