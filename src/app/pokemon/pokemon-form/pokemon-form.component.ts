import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
	styleUrls: ['./pokemon-form.component.css']
})
export class PokemonFormComponent implements OnInit {

	@Input() pokemon: Pokemon;
	types: string[];
	isAddForm: boolean;

  constructor(
		private pokemonService: PokemonService,
		private	router: Router,
	) { }

  ngOnInit(): void {
		// liste des types de pokémon chargée
		this.types = this.pokemonService.getPokemonTypeList();
		this.isAddForm = this.router.url.includes('add');
  }

  hasType(type: string): boolean {
		// renvoie si oui ou non le pokémon à le type passé en paramètre
		return (this.pokemon.types.includes(type));
  }

  selectType($event: Event, type: string) {
		// ajout du type si non présent
		// enlever le type si présent
		// 2 types maximum et 1 minimum
		const isChecked = ($event.target as HTMLInputElement).checked;

		if(isChecked)
			this.pokemon.types.push(type);
		else {
			const index = this.pokemon.types.indexOf(type);
			this.pokemon.types.splice(index, 1);
		}
  }

  onSubmit() {
		// lorsque l'utilisateur valide le formulaire
		if (this.isAddForm) {
			this.pokemonService.addPokemon(this.pokemon)
				.subscribe((pokemon) => this.router.navigate(['/pokemons', pokemon.id]));
		}
		else {
			this.pokemonService.updatePokemon(this.pokemon)
			.subscribe(() => this.router.navigate(['/pokemons', this.pokemon.id]));
		}
  }

	// TEST pour que l'image du pokémon corresponde à son ID
  // onSubmit() {
	// 	if (this.isAddForm) {
	// 		this.pokemonService.addPokemon(this.pokemon)
	// 			.subscribe((pokemon) => {
	// 				let ide: string;
	// 				if (pokemon.id < 10)
	// 					ide = "00" + pokemon.id.toString();
	// 				else if (pokemon.id < 100)
	// 					ide = "0" + pokemon.id.toString();
	// 				else
	// 					ide = pokemon.id.toString();
	// 				pokemon.picture =	pokemon.picture.replace("xxx", ide);
	// 				this.router.navigate(['/pokemons', pokemon.id]);})
	// 	}
	// 	else {
	// 		this.pokemonService.updatePokemon(this.pokemon)
	// 		.subscribe(() => this.router.navigate(['/pokemons', this.pokemon.id]));
	// 	}
  // }

	isTypesValid(type: string) : boolean {
		if (this.pokemon.types.length == 1  && this.hasType(type))
			return false;
		if (this.pokemon.types.length > 2 && !this.hasType(type))
			return false;
		return true;
	}

}
