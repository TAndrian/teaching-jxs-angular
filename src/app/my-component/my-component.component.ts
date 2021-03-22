import { PokeInfo } from './../pokemon';
import { PokeAPIServicesService } from './../poke-apiservices.service';
import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { PokeShareInfoService } from '../poke-share-info.service';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css'],
  providers: [PokeAPIServicesService]

})
export class MyComponentComponent implements OnInit {


  id!: string;
  selectedPokeId! : string ;
  searchPokeName = '';
  pokeInfo!: PokeInfo;
  myDate!:Date;



  go(){
    if (this.selectedPokeId != ''){
      this.pokeService.getPokemonINfo(this.selectedPokeId).subscribe(data =>{
        this.pokeInfo = data;
        this.pokeShareInfoService.setValue(this.selectedPokeId);
      });
    }
  }

  pokes : Pokemon[] = [];
  constructor(private pokeService: PokeAPIServicesService, private pokeShareInfoService: PokeShareInfoService) {

  }

  ngOnInit(): void {
    this.pokeService.getPokemon().subscribe((data) => {
      data.results.forEach((e, index) => {
        this.pokes.push(new Pokemon('' + index, e.name, e.url));
      } );
    });
  }
}
