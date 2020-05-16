import React from "react";

import "./style.css";

import PokemonList from "../../components/PokemonList";

export default function Home(params) {
  return (
    <div>
      <h1 className="titleLabel">Pokédex</h1>
        <div className="dexList">
          <div className="col">
            <PokemonList></PokemonList>
          </div>
        </div>
    </div>
  );
}
