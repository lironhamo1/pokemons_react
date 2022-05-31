import React, { Component } from 'react'
import PokemonList from '../pokemon/pokemon js files/PokemonList'
import sound1 from './sounds/PokémonThemeSong.mp3'


export default class Screen extends Component {
  render() {
    return (
      <div>
        <audio loop autoPlay>
        <source src={sound1} type="audio/mpeg"/>
        </audio>
        <div className="row">
        <div className="col">
          <PokemonList />
        </div>
      </div>
      </div>
    )
  }
}
