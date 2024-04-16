export function createUser(name,avatar) {
  const users = getUsers()
  users.push({name:name,avatar,createdAt: new Date(),pokemons:[]})
  localStorage.setItem('users',JSON.stringify(users))
}



export function getUsers() {
    const usersLocalStorage = localStorage.getItem('users')
    const users = usersLocalStorage ? JSON.parse(usersLocalStorage) : []
    return users
}

export function deleteUser(user){
    const users = getUsers()
    const index = users.findIndex((u) => u.name === user.name)
    users.splice(index,1)
    localStorage.setItem('users',JSON.stringify(users))
}

export function setCurrentUser(user,avatar){
    localStorage.setItem('currentUser',JSON.stringify({name:user,avatar}))
}

export function removeCurrentUser(){
    localStorage.removeItem('currentUser')
}

export function getCurrentUser(){
    const user = localStorage.getItem('currentUser')
    return user ? JSON.parse(user) : null
}

export function getPokemonsInCurrentUserInUsers(){
    const user = getCurrentUser()
    const users = getUsers()
    const index = users.findIndex((u) => u.name === user.name)  
    const pokemons = users[index].pokemons || []
    console.log('Pokemons in current user',pokemons)
    return users[index].pokemons || []
}

export function setPokemonInCurrentUserInUsers(pokemon){
    const user = getCurrentUser()
    const users = getUsers()
    const index = users.findIndex((u) => u.name === user.name)

    users[index].pokemons.push(pokemon)
    console.log('Users',users)
    
    localStorage.setItem('users',JSON.stringify(users))
}

export function setPokemonsInCurrentUserInUsers(pokemons){
    const user = getCurrentUser()
    const users = getUsers()
    const index = users.findIndex((u) => u.name === user.name)
    users[index].pokemons = pokemons
    localStorage.setItem('users',JSON.stringify(users))
}

export function removePokemonInCurrentUserInUsers(pokemon){
    const user = getCurrentUser()
    const users = getUsers()
    const index = users.findIndex((u) => u.name === user.name)
    const indexPokemon = users[index].pokemons.findIndex((p) => p.name === pokemon.name)
    users[index].pokemons.splice(indexPokemon,1)
    localStorage.setItem('users',JSON.stringify(users))
}
