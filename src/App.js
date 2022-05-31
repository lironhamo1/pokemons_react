import React, { Component } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/layout/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Screen from './components/layout/Screen';
import PokemonData from './components/pokemon/pokemon js files/PokemonData';
import FavoritePage from './components/pages/FavoritePage';




class App extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      play: true,
    }
  }
  
  
  render(){

    return (
      <div className="App" >   
        <NavBar/>
    <div className='container'>
            <Routes>
              <Route exact  path="/" element={<Screen/>} />
              <Route exact  path="/:pokemonID" element={<PokemonData/>}  state={{ pokemonID: "pokemonID" }} />
              <Route exact  path="FavoritePage/:pokemonID" element={<PokemonData/>}  state={{ pokemonID: "pokemonID" }} />

              <Route exact path="/FavoritePage" element={<FavoritePage />} /> 
            </Routes>

            </div> 
           </div>
   
  );
  } 
}

export default App;
//                            <Route exact  path="/favoritePage" element={<favoritePage/>} />
//<button onClick={()=>{this.audio()}}>check</button>
/* <Sound
      url="PokémonThemeSong.mp3"
      playStatus={Sound.status.PLAYING}
      
    
    />**/


    /**/