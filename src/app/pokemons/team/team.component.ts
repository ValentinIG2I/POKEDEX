import { Component, Input, OnInit } from '@angular/core';
import { Login } from '../model-pokemon/pokemon.model';
import { ServicePokemonService } from '../service/service-pokemon.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  constructor(private pokemonService:ServicePokemonService) { }

  @Input() input:number=0;
  idPokemon: any=[];
  accessToken: string | null = null;
  login: Login | undefined;

ngOnInit(): void {
  if(Date.now() > Number(sessionStorage.getItem('tempsTokenEnMs')) ){
    this.pokemonService.refreshToken(sessionStorage.getItem('refresh_token')).subscribe(
      (res) => {
        this.login=res;
        var tempsTokenEnMs = Date.now() + res.expires_in;
        localStorage.clear();
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);
        localStorage.setItem('tempsTokenEnMs', String(tempsTokenEnMs));
    });
  }

  this.accessToken = localStorage.getItem('access_token');

  this.pokemonService.myTeam(this.accessToken).subscribe(res=>{this.idPokemon=res;
    console.log(res);});

}

ngOnChanges(): void{
  if(Date.now() > Number(sessionStorage.getItem('tempsTokenEnMs')) ){
    this.pokemonService.refreshToken(sessionStorage.getItem('refresh_token')).subscribe(
      (res) => {
        this.login=res;
        var tempsTokenEnMs = Date.now() + res.expires_in;
        localStorage.clear();
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);
        localStorage.setItem('tempsTokenEnMs', String(tempsTokenEnMs));
    });
  }
  if(this.input!=0){
    if(this.idPokemon.length < 6){
      this.idPokemon.push(this.input);
      this.pokemonService.setTeam(this.accessToken, this.idPokemon).subscribe(res=>{});
    }
  };
}

supprPokemon(id: number){
  if(Date.now() > Number(sessionStorage.getItem('tempsTokenEnMs')) ){
    this.pokemonService.refreshToken(sessionStorage.getItem('refresh_token')).subscribe(
      (res) => {
        this.login=res;
        var tempsTokenEnMs = Date.now() + res.expires_in;
        localStorage.clear();
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);
        localStorage.setItem('tempsTokenEnMs', String(tempsTokenEnMs));
    });
  }
  this.idPokemon.splice(id,1);
  this.pokemonService.setTeam(this.accessToken, this.idPokemon).subscribe(res=>{});
}

}
