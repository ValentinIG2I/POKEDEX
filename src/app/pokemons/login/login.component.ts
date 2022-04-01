import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../model-pokemon/pokemon.model';
import { ServicePokemonService } from '../service/service-pokemon.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private pokemonService:ServicePokemonService, private router : Router ) { }

  ngOnInit(): void {

  }

  hide : boolean=true;
  connexion : boolean=true;

  login: Login | undefined;

  loginButton(email: string, password: string) {
    this.pokemonService.login(email, password).subscribe(
      (res) => {
        this.login=res;
        var tempsTokenEnMs = Date.now() + res.expires_in;
        localStorage.clear();
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);
        localStorage.setItem('tempsTokenEnMs', String(tempsTokenEnMs));
        this.router.navigate(['pokemons']);

      },
      (error) => {
        this.connexion=false;
    });
  }
}
