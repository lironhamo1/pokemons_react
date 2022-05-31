import React, { Component , createElement, useEffect} from 'react';
import PokemonElement from '../pokemon/pokemon js files/PokemonElement';


export default class FavoritePage extends Component {
    state = { 
        numberOfFavorite:0,
        pokemon: null,
        url: 'https://pokeapi.co/api/v2/pokemon/?limit=151'
     };

async componentDidMount(){
    const url= `https://pokeapi.co/api/v2/pokemon/?limit=151`;
            const local=await localStorage;
         
            const pokemon1=[];
            for(var i=0;i<6;i++){
                var key=local.key(i)
                if (key!=null){
                    try{
                        var element=JSON.parse(local[key])
                        }
                        catch{
                            console.log("error")
                        }        
                        pokemon1.push(element);
                }
            }
            this.setState({pokemon:pokemon1});                         
    }


    render() {
            return (
                <div> 
                {this.state.pokemon ? 
                (<div className='row'>
                    {this.state.pokemon.map((pokemon1) => 
                    (
                   <PokemonElement
                   key={pokemon1.pokemonID}
                   name={pokemon1.name}
                   url={`https://pokeapi.co/api/v2/pokemon/${pokemon1.pokemonID}/`}
                     />
                    )
                    )}
                      
            
                  </div>
                     
            ) :
            (
                <h1>loading</h1>
            )}
            
            </div>
            );
            
               
    }
}
