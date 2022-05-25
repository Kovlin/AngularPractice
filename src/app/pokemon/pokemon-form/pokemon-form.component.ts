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

  constructor(
		private pokemonService: PokemonService,
		private	router: Router,
	) { }

  ngOnInit(): void {
		// liste des types de pokémon chargée
		this.types = this.pokemonService.getPokemonTypeList();
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
		console.log("Form Submit !");
		this.router.navigate(['/pokemons', this.pokemon.id]);
  }

	isTypesValid(type: string) : boolean {
		if (this.pokemon.types.length == 1  && this.hasType(type))
			return false;
		if (this.pokemon.types.length > 2 && !this.hasType(type))
			return false;
		return true;
	}

}
