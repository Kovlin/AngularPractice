import { Component, OnInit } from '@angular/core';
import { POKEMONS } from './mock-pokemon-list';
import { Pokemon } from './pokemon';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  pokemonList: Pokemon[] = POKEMONS;
  pokemonSelected: Pokemon|undefined;

  ngOnInit(): void {
	  console.table(this.pokemonList)
  }

  selectPokemon(pokemonId: string) {
	const id = +pokemonId;
	const pokemon: Pokemon|undefined = this.pokemonList.find(pokemon => pokemon.id == +pokemonId);
	if (pokemon) 
		console.log(`vous avez cliqué sur le pokémon ${pokemon.name}.`);
	else 
		console.log(`vous avez demandé un pokémon qui n'existe pas.`)
	this.pokemonSelected = pokemon;
  }
}
