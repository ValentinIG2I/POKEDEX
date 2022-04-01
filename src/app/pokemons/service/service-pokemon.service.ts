import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { PagedData } from '../model-pokemon/page-data.model';
import { Login, Pokemon, PokemonDetail, PokemonSearch, pokemonTeam, setPokemonTeam } from '../model-pokemon/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class ServicePokemonService {

  url = "http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io";
  constructor(private Httpclient:HttpClient ) { }

  getPokemons(offset: number):Observable<PagedData<Pokemon>>{
    return this.Httpclient.get<PagedData<Pokemon>>(this.url+"/pokemons?offset=" + offset);
  }

  getPokemonsById(id: number):Observable<PokemonDetail>{
    return this.Httpclient.get<PokemonDetail>(this.url+"/pokemons/" + id);
  }

  searchPokemons(search:string):Observable<PagedData<PokemonSearch>>{
    return this.Httpclient.get<PagedData<PokemonSearch>>(this.url+"/pokemons?search=" + search + "&limit=151");
  }

  login(emailLogin: string, passwordLogin: string):Observable<Login>{
    const body = { email: emailLogin , password: passwordLogin }
    return this.Httpclient.post<Login>(this.url+"/auth/login", body);
  }

  refreshToken(RefreshToken: string | null):Observable<Login>{
    const refresh = { refresh_token: RefreshToken }
    return this.Httpclient.post<Login>(this.url+"/auth/refresh", refresh);
  }

  myTeam(accessToken: string | null):Observable<pokemonTeam>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + accessToken
    })
    return this.Httpclient.get<pokemonTeam>(this.url+"/trainers/me/team", {headers});
  }

  setTeam(accessToken: string | null, idPokemon: number[]):Observable<setPokemonTeam>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + accessToken
    })
    return this.Httpclient.put<setPokemonTeam>(this.url+"/trainers/me/team", idPokemon, {headers});
  }
}
