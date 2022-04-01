export interface Pokemon
{
  id: number,
  name:string
}

export interface PokemonDetail
{
 id: number,                 // software ces fameux créateurs de fps
 name: string,
 description: string,
 height: number,
 weight: number,
 types: string[]
}

export interface PokemonSearch
{
  id: number,
  name:string
}

export interface Login
{
    access_token: string,
    refresh_token: string,
    expires_in: number
}

export interface pokemonTeam
{
    idPokemon : number[]
}

export interface setPokemonTeam
{
    idReturn : number
}
