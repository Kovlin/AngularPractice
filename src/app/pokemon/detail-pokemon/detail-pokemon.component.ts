import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
})
export class DetailPokemonComponent implements OnInit {

	pokemonList: Pokemon[];
	pokemon: Pokemon|undefined;

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private pokemonService: PokemonService,
	) { }

	ngOnInit(): void {
		const pokemonId: string|null = this.activatedRoute.snapshot.paramMap.get('id');
		if (pokemonId)
			this.pokemon = this.pokemonService.getPokemonById(+pokemonId);
	}

	goToPokemonList(): void {
		this.router.navigate(['pokemons']);
	}

	goToEditPokemon(pokemon: Pokemon) {
		this.router.navigate(['edit/pokemon', pokemon.id]);
	}
}