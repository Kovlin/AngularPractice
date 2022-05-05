import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<h1>Welcome to {{ pokemonList[0] }}!</h1>`
})
export class AppComponent implements OnInit {
  pokemonList = [ 'Bulbizarre', 'Salaméche', 'Carapuce'];

  ngOnInit(): void {
	  console.table(this.pokemonList)
  }
}
