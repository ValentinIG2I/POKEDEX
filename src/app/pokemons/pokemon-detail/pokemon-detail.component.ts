import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { PokemonDetail } from '../model-pokemon/pokemon.model';
import { ServicePokemonService } from '../service/service-pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  constructor(private pokemonService:ServicePokemonService, private router: Router, private actRoute: ActivatedRoute) {
    router.events.forEach((event) => {
      if(event instanceof NavigationEnd) {
        this.refresh();
      }
    });
   }

   @Output() addPokemonEvent = new EventEmitter<number>();
   id ?: number;
   pokemonDetail ?: PokemonDetail;

  ngOnInit(): void {
    this.id=Number(this.actRoute.snapshot.paramMap.get('id'));
    if(this.id != 0)
      this.pokemonService.getPokemonsById(this.id).subscribe(res=>{this.pokemonDetail=res});
  }

  refresh(){
    this.id=Number(this.actRoute.snapshot.paramMap.get('id'));
    if(this.id != 0)
      this.pokemonService.getPokemonsById(this.id).subscribe(res=>{this.pokemonDetail=res});
  }

  addPokemon(id: number){
    this.addPokemonEvent.emit(id);
}
}
