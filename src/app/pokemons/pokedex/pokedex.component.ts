import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  constructor() { }

  user: string | null = null;
  refreshToken : string | null = null;
  pokemonToAdd : number = 0;

  ngOnInit(): void {
  }

  addPokemon(id: number){
    this.pokemonToAdd = id;
    setTimeout(()=>{this.pokemonToAdd=0},1000);
  }

}
