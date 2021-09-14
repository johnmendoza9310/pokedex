import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { PokemonModel } from '../models/pokemonModel';
import { throwError } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor( private http: HttpClient) {}

  private URL= `https://pokeapi.co/api/v2/pokemon`;


  getPokemons(){

    return this.http.get(this.URL).
    pipe (
      map(data=> this.crearArreglo(data))
       );

  }

  getPokemonsNext(url){

    return this.http.get(url).
    pipe (
      map(data=> this.crearArreglo(data))
       );

  }

  getOnePokemon(url){

    return this.http.get(url)
    .pipe(map(
      data=>{
        return data;
        
      }
    ),
      
    catchError(this.manejarError))


  }

  manejarError(err:HttpErrorResponse){

    console.log("Sucedio un error");
    console.warn(err);

    console.log("imprimiendo error",err.error);

    if (err.error==="Not Found") {

      alert("NO EXISTE POKEMON CON EL NOMBRE: ")
      
    }
    

    return throwError( "errorhttp")
    

  }
  



  getFeatures(url){

    return this.http.get(url)
    .pipe(
      map((data:any)=>{
        {return data}
      })
    )



  
}




 private crearArreglo( pokemonsObj:Object ){
   
  const pokemons: PokemonModel[]= [];

  Object.keys( pokemonsObj ).forEach( key=>{

     const pokemon: PokemonModel = pokemonsObj[key];
   
     pokemons.push( pokemon )

    } )

  
    if ( pokemonsObj === null){ return []; }
    
    return pokemons;

  
  }


  searchPokemon(pokename:string){

  //  console.log("print desde el servicio", pokename);
    

    return this.http.get(`${this.URL}/${pokename}`)
    .pipe(map(
      (data:any)=>{
        return data;
      }
    ),catchError(
      

      (err:HttpErrorResponse)=>{

        console.log("Sucedio un error");
        console.warn(err);
    
        console.log("imprimiendo error",err.error);
    
        if (err.error==="Not Found") {
    
          alert(`NO EXISTE EL POKEMON CON EL NOMBRE: ${pokename} `)
          
        }
        
    
        return throwError( "errorhttp")
        
    
      }
    )
      
    )
  }






}
