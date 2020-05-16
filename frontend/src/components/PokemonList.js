import React, { Component } from "react";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner'

import PokemonCard from "./PokemonCard";

export default class PokemonList extends Component {
  state = {
    url: "https://pokeapi.co/api/v2/pokemon?limit=60&offset=0",
    pokemon: null,
  };

  async componentDidMount() {
    const response = await axios.get(this.state.url);
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
