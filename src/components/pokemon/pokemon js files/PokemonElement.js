import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import "../pokemon css files/PokemonElement.css"


//every pokemon has a card, every element in the list is a card


//new style at name: PokemomImg- new element of pokemon image
const PokemomImg = styled.img`
  width: 12em;
  height: 12em;
`;

export default class PokemonElement extends Component {
    state = {
        name: '',
        imageUrl: '',
        pokemonID: '', //unique number of pokemon
      };
  
      componentDidMount() {

        //props it gets from the parent
        //its fills at the render in pokemons list with the attr
        //const name=this.props.name;
        //const url=this.props.imageUrl; same as: 
        const {name,url}=this.props;
        var id=url.split('/').length - 2
        const pokemonID = url.split('/')[id];
        //$ is the attr value of the state field in the {}
        const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonID}.png?raw=true`;
        this.setState({
            name:name,
            imageUrl:imageUrl,
            pokemonID:pokemonID
        });

        }

  
  
  
  
    render() {
    return (
      <div className="col-md-4  mb-6">
      <div className='pokemonElement'>

        <Link to={`./${this.state.pokemonID}`}>
              <div className='card-header' >
                  <h1>{this.state.name}</h1>
                  <h2>{this.state.pokemonID}</h2>
                  <PokemomImg className="img" src={this.state.imageUrl}></PokemomImg>
              </div>
        </Link>
        </div>

      </div>
    )
  }
}

