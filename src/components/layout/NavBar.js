import React, { Component } from 'react'
import {  Link } from "react-router-dom";
import "./components css files/NavBar.css"
//rcc+tab shortcut

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar">
        <Link className="fav_page" to="/FavoritePage">Favorite Pokemons </Link>
        </nav>
      </div>
    )
  }
}
