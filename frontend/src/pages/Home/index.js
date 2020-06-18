import React, { Component } from "react";

import "./style.css";

import axios from "axios";

import Spinner from "react-bootstrap/Spinner";

import PokemonList from "../../components/PokemonList";

export default function Home(params) {
  return (
    <div>
      <h1 className="titleLabel">Pokédex</h1>
      <div className="dexList">
        <div className="col">
          <PokemonList></PokemonList>
          <div className="button">
            <button class="btn btn-outline-dark">Previous</button>
            <button class="btn btn-outline-dark">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
