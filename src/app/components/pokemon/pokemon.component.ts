
import { Component, Input, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { PokemonModel } from 'src/app/models/pokemonModel';
import { PokemonService } from "../../services/pokemon.service";
import {FormArray, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';



@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  pokem:any;
  paginadorAtras;
  paginadorAdelante;
  pokemonSelect:any=[];
  pokemonSelectChar:any=[];
  noImage:Boolean;
  forma:FormGroup;
  tamañoCampo;

  textoNombre;
  tamañoNombre;

  datosPokemon:any;
  

  constructor( private pokemonService:PokemonService,
               private fb: FormBuilder) {

    this.listPokemon();
   // this.seeFeatures('')

    this.noImage=false;
    this.crearFormulario();
  
   }



   get nombreTocado(){
    if (this.tamañoNombre<=0) {
      return this.forma.get('name').touched;
    }
  }
   get nombreNoValido(){
    this.textoNombre=this.forma.get('pokemon').value;
   
    //console.log( this.textoNombre.length);
    this.tamañoNombre=this.textoNombre.length;
    //console.log(this.tamañoNombre=this.textoNombre.length);
    
    
    if (this.tamañoNombre>0) {
      return this.forma.get('pokemon').invalid;
    }
   }




 

 


   crearFormulario(){
     this.forma = this.fb.group({
       pokemon: [ '',[Validators.required, Validators.pattern('[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$'), Validators.minLength(3)] ]
     })
   }


   

  ngOnInit(): void {

    
  }


  processData(data){


  


    this.pokem=data[3];
        
   // console.log("lista de paginador atras", data[2]);
    this.paginadorAtras=data[2];
    //console.log("lista de paginador adelante", data[1]);
    this.paginadorAdelante=data[1];

    //console.log("img pokemon", this.imgPokemon);
     const datos=[] 
     Object.keys(this.pokem).forEach( key=>{
       const urlKey = this.pokem[key].url;
       const nameKey = this.pokem[key].name;

      // console.log(datos);
       
       //console.log("url keys: ",this.datosPokemon[key].url);
       

       //datos.push({url:dato});

       //this.showFeatures(dato);

       this.pokemonService.getFeatures(urlKey).subscribe(

         data=>{



           

           datos.push( {imagen:data.sprites.front_default, urlFiltrada:urlKey, nombreFiltrado:nameKey})
           //console.log(datos);

           this.datosPokemon=datos;

           //console.log("imprimiendo datos nuevos", this.datosPokemon);
           
           
         })      

       
     })

  }



  listPokemon(){

   let p="getPokemons()"
    
    this.pokemonService.getPokemons().subscribe(


      data=>{


        this.processData(data);

        
      }


      
      
    )

   
    
    
  }



  nextPaginator(){

    this.pokemonService.getPokemonsNext(this.paginadorAdelante)
    .subscribe( data=>{
      this.processData(data)
      
    })

 
    
  }


  backPaginator(){

    if (this.paginadorAtras!=null) {

      this.pokemonService.getPokemonsNext(this.paginadorAtras)
      .subscribe( data=>{
  
        if (data===null) {
          console.log("no hay mas");
          
          
        }
        this.processData(data)
        
      })
      
  
      
      
    }else{

      alert("NO EXISTEN MÁS POKEMON ATRAS")
    }


    
  }

  seeFeatures(url){

    this.noImage=true;
    
    this.pokemonSelectChar=[];

    console.log(url);

    this.pokemonService.getOnePokemon(url).subscribe(
      data=>{
       // console.log("caracterostocas un pokemon",data);

        this.pokemonSelect=data;
        console.log(this.pokemonSelect)
        //this.pokemonSelect.push({id:data.})

   
     
console.log("immprimiendi tipos 1",this.pokemonSelect.types );




//Extrayendo types
const pokeTipos=[];

          Object.keys(this.pokemonSelect.types).forEach(
            key=>{
              const tipo = this.pokemonSelect.types[key].type;

              let tipos= JSON.stringify (tipo.name);
              console.log("imprimiendo tipos 2", tipos);
              pokeTipos.push(tipos);
     
 }
 )

          console.log("imprimiendo tipos 3", pokeTipos)
///////////////////////////////////////////////////////////



const pokeHabilidades=[];

          Object.keys(this.pokemonSelect.abilities).forEach(
            key=>{
              const habilidad = this.pokemonSelect.abilities[key].ability;

              let habilidades= JSON.stringify (habilidad.name);
              console.log("imprimiendo habilidades", habilidades);
              pokeHabilidades.push(habilidades);
     
 }
 )

 console.log("imprimiendo habilidades final", pokeHabilidades);
 

       

        this.pokemonSelectChar.push({img:this.pokemonSelect.sprites.front_default,id:this.pokemonSelect.id,name:this.pokemonSelect.name,type:pokeTipos,abilities:pokeHabilidades})
        console.log(this.pokemonSelectChar);
        
        
        
      }
    )



  }


  search(){
    if (this.forma.invalid) {

      console.log("invalido");
      

      return Object.values(this.forma.controls).forEach(
        control=>{//console.log(control);

          if (control instanceof FormGroup) {
            Object.values(control.controls).forEach(  control=>{ control.markAllAsTouched()})
            
          }else{
            control.markAsTouched();
          }
        }
      )
      
    }


    this.pokemonService.searchPokemon(this.forma.get('pokemon').value)
    .subscribe( 
      resp=>{

        //https://pokeapi.co/api/v2/pokemon/25/encounters
        //console.log("la respuesta es",resp);

        
        let urlOld=resp.location_area_encounters;
        const urlNew= urlOld.replace('/encounters','');

      //  console.log(urlNew);
        this.seeFeatures(urlNew);
      


        

        //const url=resp.location_area_encounters;
       // let ultima = url.slice(-5,0)

        //console.log("datos ",url)
       // console.log("datos cortado",ultima);

        //this.seeFeatures(resp.location_area_encounter);


        
        
      }
    )
    

   this.forma.reset({
    pokemon:''
  });

   

  }




 



}
