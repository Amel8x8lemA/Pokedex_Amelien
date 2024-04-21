/* Gestion users */

export const setUsersInLocalStorage = (users) => {
    const stringifiedUsers = users.map(user => ({
        ...user,
        avatar: String(user.avatar)
    }));
    localStorage.setItem('users', JSON.stringify(stringifiedUsers));
}


export const getUsersFromLocalStorage = () => {
    const localStorageUsers = localStorage.getItem('users');
    return JSON.parse(localStorageUsers) || [];
};

export const addUserToLocalStorage = (newUser) => {
    const users = getUsersFromLocalStorage();
    const isUniqueName = users.every(user => user.name !== newUser.name);
    if (!isUniqueName) {
        alert('Ce nom d\'utilisateur est déjà pris. Veuillez choisir un autre nom.');
        return;
    }    
    const updatedUser = { ...newUser, pokemonNumbers: [] };
    const updatedUsers = [...users, updatedUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
};

export const removeUserFromLocalStorage = (index) => {
    const storedUsers = getUsersFromLocalStorage();
    if (storedUsers) {
        const updatedUsers = storedUsers.filter((user, i) => i !== index);
        setUsersInLocalStorage(updatedUsers);
    }
};

/* Gestion pokemons des users */

export const addPokemonToUser = (userId, pokemonNumber) => {
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.id === userId) {
        const updatedUser = { ...currentUser, pokemonNumbers: [...currentUser.pokemonNumbers, pokemonNumber] };
        setCurrentUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
};

export const removePokemonFromUser = (userId, pokemonNumber) => {
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.id === userId) {
        const updatedPokemonNumbers = currentUser.pokemonNumbers.filter(num => num !== pokemonNumber);
        const updatedUser = { ...currentUser, pokemonNumbers: updatedPokemonNumbers };
        setCurrentUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
};


export const isPokemonInPokedex = (userId, pokemonId) => {
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.pokemonNumbers) {
        return currentUser.pokemonNumbers.includes(pokemonId);
    }
    return false;
};

/* Gestion current User */

export const getCurrentUser = () => {
    const currentUser = localStorage.getItem('currentUser');
    return JSON.parse(currentUser);
}

export const setCurrentUser = (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

export const removeCurrentUser = () => {
    const currentUser = getCurrentUser();
    if (currentUser) {
        const userName = currentUser.name; // Récupère le nom de l'utilisateur
        let users = getUsersFromLocalStorage();
        const updatedUsers = users.map(user => (user.name === userName ? currentUser : user));
        setUsersInLocalStorage(updatedUsers);
    }
    localStorage.removeItem('currentUser');
}


export const getCurrentUserPokemons = () => {
    const currentUser = getCurrentUser();
    return currentUser ? currentUser.pokemonNumbers || [] : [];
};