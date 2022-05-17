import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

// --- Ces méthodes et propriété sont commentées car elles ne nous sont plus utiles --- //

//   pokemonList: Pokemon[] = POKEMONS;
//   pokemonSelected: Pokemon|undefined;
//   ngOnInit(): void {
// 	  console.table(this.pokemonList)
//   }

//   selectPokemon(pokemonId: number) {
// 	const id = +pokemonId;
// 	const pokemon: Pokemon|undefined = this.pokemonList.find(pokemon => pokemon.id == +pokemonId);
// 	if (pokemon) 
// 		console.log(`vous avez cliqué sur le pokémon ${pokemon.name}.`);
// 	else 
// 		console.log(`vous avez demandé un pokémon qui n'existe pas.`)
// 	this.pokemonSelected = pokemon;
//   }
}
