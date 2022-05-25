import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.less']
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  currentPage = 1;
  pokemonCount = 120;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(){
    this.dataService.getPokemons(12, this.currentPage * 12)
    .subscribe((response: any) => {
      response.results.forEach((result: any) => {
        this.dataService.getPokemonData(result.name)
        .subscribe((sepResponse: any) => {
          this.pokemons.push(sepResponse);          
        });
      });
    });
  }

}
