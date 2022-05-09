import { Component, OnInit } from '@angular/core';
import { POKEMONS } from './mock-pokemon-list';
import { Pokemon } from './pokemon';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  pokemonList: Pokemon[] = POKEMONS;

  ngOnInit(): void {
	  console.table(this.pokemonList)
	  this.selectPokemon(this.pokemonList[Math.floor(Math.random() * this.pokemonList.length)]);
  }

  selectPokemon(pokemon: Pokemon) {
	  console.log(`vous avez cliqué sur le pokémon ${pokemon.name}`);
  }
}
