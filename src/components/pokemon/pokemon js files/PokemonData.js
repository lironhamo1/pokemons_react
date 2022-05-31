import React, { Component } from 'react'
import { useParams } from "react-router-dom"
import axios from 'axios'
import '../pokemon css files/PokemonData.css'


export function withRouter(Children){
  return(props)=>{

     const match  = {params: useParams()};
     return <Children {...props}  match = {match}/>
 }
}

class PokemonData extends React.Component {
  constructor() {
    super()
    this.state = {
        isFavorite:false,
        name: '',
        pokemonID: '',
        imageUrl: '',
        types: [],
        moves:[],
        location_area_encounters:[],
        locationCounter: 0,
        evolution:'',
        evolutionCounter: 0,
        evolves_from_species:"",
        evolves_from_speciesCounter: 0,
        game_generation:"",
      };
    }


      async componentDidMount() {
      //get it from app.js when we move to path with pokemon index
        const { pokemonID } = this.props.match.params;
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonID}/`;

        const specieslUrl=`https://pokeapi.co/api/v2/pokemon-species/${pokemonID}/`;
        const pokemonResSpecies = await axios.get(specieslUrl);  

        //get pokemons data
        const pokemonsRes = await axios.get(pokemonUrl);
        const name=pokemonsRes.data.name;
        const imageUrl=pokemonsRes.data.sprites.front_default;
        this.setState({name, imageUrl,pokemonID});

       
        //for each type go to type field and there go to name field
        const moves=pokemonsRes.data.moves.map(move => move.move.name);
        this.setState({moves});
    
        //for each type go to type field and there go to name field
        const types=pokemonsRes.data.types.map(type => type.type.name);
        this.setState({types});
              
        let evolution="";
        let evolutionCounter=0;
        const evalChainUrl=await axios.get(pokemonResSpecies.data.evolution_chain.url);
        let result=evalChainUrl.data.chain;
        while(result.species.name !== this.state.name){
          result=result.evolves_to[0];
          if(result.evolves_to.length===0){
           console.log('there is no more evolution')
           break
          }
        }     
        if(result.evolves_to.length!==0){
          result=result.evolves_to[0].species.name;
            evolutionCounter++;
            evolution=result
            this.setState({evolution,evolutionCounter})
        }
        
        let evolves_from_species="";
        let evolves_from_speciesCounter=0;
        let checkEvolves;
        pokemonResSpecies.data.evolves_from_species===null ? checkEvolves=null : checkEvolves=pokemonResSpecies.data.evolves_from_species.name
        if(checkEvolves!=null){
            evolves_from_species=pokemonResSpecies.data.evolves_from_species.name
            evolves_from_speciesCounter++;
            this.setState({evolves_from_species,evolves_from_speciesCounter})
        }
        const locationAreaUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonID}/encounters`;
        const pokemonResArea = await axios.get(locationAreaUrl);
        let location_area_encounters=[];
        let locationCounter=0;
        for(let x in pokemonResArea.data){
                    location_area_encounters[x]=pokemonResArea.data[x].location_area.name;
                    locationCounter++;
                  }
         
         
         this.setState({location_area_encounters,locationCounter})
         
         let game_generation=pokemonResSpecies.data.generation.name
         this.setState({game_generation})
      }  

      

    



      async addPokemonToFavorite(pokemonID) {
        await this.setState({isFavorite:true});
        console.log("add to fav  " + pokemonID);
        console.log(this.state.isFavorite);
        window.localStorage.setItem(pokemonID, JSON.stringify(this.state));
      }

      handleClick(){

      }

  render() {
    return (
      <div>
        <div className='pokemon_data' >

        <h1>{this.state.name}</h1>
        <h1> ID: {this.state.pokemonID}</h1>
        <img src={this.state.imageUrl} alt=""/>
        <h1>types:</h1>
        <h3>{this.state.types.map((type,i) =>
        <li key={i}>
         {type}
         </li>
         )}
         </h3>

       


         <h1>Moves:</h1>
        <h3>{this.state.moves.map((move,i) =>
        <li key={i}>
         {move}
         </li>
         
         )}
         </h3>

        <h1>Location Areas:</h1>
         {this.state.locationCounter===0 ? (
         <h3>Same like {this.state.evolves_from_species} (his specie evolution)</h3>
         ): 
         (<div>
         <h3>{this.state.location_area_encounters.map((location,i) =>
        <li key={i}>
         {location}
         </li>
         )}
         </h3> 
         </div>)}
        


       {this.state.evolutionCounter===0 ? (<h1> No future evolution mentioned</h1>): 
         (<div>
           <h1>Future evolution:</h1>
         <h3>{this.state.evolution}
         </h3> 
         </div>)}


    {this.state.evolves_from_speciesCounter===0 ? (<h1> No Evolved from another pokemon</h1>): 
         (<div>
           <h1>Evolved from:</h1>
         <h3>{this.state.evolves_from_species}</h3> 
         </div>)}

        <h1>Game genertion:</h1>
        <h3>{this.state.game_generation}</h3>
        </div>

         <button className="btn_add_fav" onClick={()=>this.addPokemonToFavorite(this.state.pokemonID)} >
           add to favorite
           </button>

      </div>
      
    );
  }
};
 
      
export default withRouter(PokemonData);

      

    






