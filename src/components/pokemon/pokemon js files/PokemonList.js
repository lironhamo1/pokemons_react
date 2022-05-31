import React, { Component } from 'react'
import axios from 'axios'
import PokemonElement from '../pokemon js files/PokemonElement';


export default class PokemonList extends Component {
    state = {
        pokemon: null
      };
    async componentDidMount() {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=151');
        //when arrived to 'result' array => take data
        this.setState({ pokemon: res.data['results'] });
    }

    //work 151 times every pokemon is loded
  render() {
    return (
        <div>
        {this.state.pokemon ? 
        (<div className='row'>
          {this.state.pokemon.map(pokemon => 
          (
            <PokemonElement
            key={pokemon.name}
            name={pokemon.name}
            url={pokemon.url}
              />
              
          ),
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
