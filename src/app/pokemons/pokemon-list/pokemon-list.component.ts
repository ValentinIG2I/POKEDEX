import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../model-pokemon/pokemon.model';
import { ServicePokemonService } from '../service/service-pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {


  constructor(private pokemonService:ServicePokemonService) {

  }

  sum : number = 0;
  pokemonList: Pokemon[]=[];

  ngOnInit(): void {
    this.pokemonService.getPokemons(this.sum).subscribe(res => {
      this.pokemonList=res.data;
    });
  }

  ElderScroll(){
    this.sum += 10;
    this.pokemonService.getPokemons(this.sum).subscribe(res => {this.pokemonList = this.pokemonList.concat(res.data)});
  }

  pokemonSearch(search: string){
    if(!search){
      this.pokemonService.getPokemons(this.sum).subscribe(res => {
        this.pokemonList=res.data;
      });
    }
    else{
      this.pokemonService.searchPokemons(search).subscribe(res=>{this.pokemonList=res.data});
    }
  }
}
