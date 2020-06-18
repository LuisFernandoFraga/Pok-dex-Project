import React, { Component } from "react";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner'

import PokemonCard from "./PokemonCard";

export default class PokemonList extends Component {
  state = {
    pokemon: null,
  };

  async componentDidMount() {
    const limit = 151;
    const offset = 0;
    const pokemonsUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    const response = await axios.get(pokemonsUrl);
    this.setState({ pokemon: response.data["results"] });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.pokemon ? (
          <div className="row">
            {this.state.pokemon.map((pokemon) => (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                url={pokemon.url}
              />
            ))}
          </div>
        ) : (
          <Spinner animation="grow" role="status" variant="danger">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
      </React.Fragment>
    );
  }
}
