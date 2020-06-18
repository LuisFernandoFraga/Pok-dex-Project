import React, { Component } from "react";

import axios from "axios";

import styled from "styled-components";

import { Link } from "react-router-dom";

import Spinner from "react-bootstrap/Spinner";

const Card = styled.div`
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1), 0 5px 5px rgba(0, 0, 0, 0.15);
  -moz-user-select: none;
  -website-user-select: none;
  user-select: none;
  -o-user-select: none;
`;

const Sprite = styled.img`
  width: 15em;
  height: 15em;
`;

const TYPE_COLORS = {
  bug: "B1C12E",
  dark: "4F3A2D",
  dragon: "755EDF",
  electric: "FCBC17",
  fairy: "F4B1F4",
  fighting: "823551D",
  fire: "E73B0C",
  flying: "A3B3F7",
  ghost: "6060B2",
  grass: "74C236",
  ground: "D3B357",
  ice: "A3E7FD",
  normal: "C8C4BC",
  poison: "934594",
  psychic: "ED4882",
  rock: "B9A156",
  steel: "B5B5C3",
  water: "3295F6",
};

const StyledLink = styled(Link)`
  tex-decoration: none;
  color: black;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export default class Pokemon extends Component {
  state = {
    name: "",
    pokemonIndex: "",
    imageUrl: "",
    description: "",
    types: [],
    moves: [],
    stats: {
      hp: "",
      attack: "",
      specialAttack: "",
      defense: "",
      specialDefense: "",
      speed: "",
    },
    height: "",
    weight: "",
    eggGroup: "",
    abilities: "",
    genderRatioMale: "",
    genderRatioFemale: "",
    hatchSteps: "",
  };

  async componentDidMount() {
    const { pokemonIndex } = this.props.match.params;

    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

    const response = await axios.get(pokemonUrl);

    const name = response.data.name;
    const imageUrl = response.data.sprites.front_default;

    let { hp, attack, specialAttack, defense, specialDefense, speed } = "";

    response.data.stats.map((stat) => {
      switch (stat.stat.name) {
        case "hp":
          hp = stat["base_stat"];
          break;
        case "attack":
          attack = stat["base_stat"];
          break;
        case "special-attack":
          specialAttack = stat["base_stat"];
          break;
        case "defense":
          defense = stat["base_stat"];
          break;
        case "special-defense":
          specialDefense = stat["base_stat"];
          break;
        case "speed":
          speed = stat["base_stat"];
          break;
      }
    });

    const height =
      Math.round((response.data.height * 0.328084 + 0.0001) * 100) / 100;

    const weight =
      Math.round((response.data.weight * 0.220462 + 0.0001) * 100) / 100;

    const types = response.data.types.map((type) => type.type.name);

    const moves = response.data.moves.map((move) => move.move.name);

    const abilities = response.data.abilities
      .map((ability) => {
        return ability.ability.name
          .toLowerCase()
          .split("-")
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ");
      })
      .join(", ");

    await axios.get(pokemonSpeciesUrl).then((response) => {
      let description = "";
      response.data.flavor_text_entries.some((flavor) => {
        if (flavor.language.name === "en") {
          description = flavor.flavor_text;
          return;
        }
      });

      const femaleRate = response.data["gender_rate"];
      const genderRatioFemale = 12.5 * femaleRate;
      const genderRatioMale = 12.5 * (8 - femaleRate);

      const eggGroups = response.data["egg_groups"]
        .map((group) => {
          return group.name
            .toLowerCase()
            .split("-")
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ");
        })
        .join(", ");

      const hatchSteps = 255 * (response.data["hatch_counter"] + 1);

      this.setState({
        description,
        genderRatioFemale,
        genderRatioMale,
        eggGroups,
        hatchSteps,
      });
    });

    this.setState({
      imageUrl,
      pokemonIndex,
      name,
      types,
      moves,
      stats: {
        hp,
        attack,
        defense,
        speed,
        specialAttack,
        specialDefense,
      },
      height,
      weight,
      abilities,
    });
  }

  render() {
    return (
      <div>
        <h1 className="titleLabel">Pokédex</h1>
        <div className="dexList">
          <div className="col">
            <div className="card-deck">
              <Card className="card">
                <h5 className="card-header">#{this.state.pokemonIndex}</h5>
                <Sprite
                  className="card-img-top rounded mx-auto"
                  src={this.state.imageUrl}
                />
                <div className="card-body mx-auto">
                  <h6 className="card-title">
                    {this.state.name
                      .toLowerCase()
                      .split(" ")
                      .map(
                        (letter) =>
                          letter.charAt(0).toUpperCase() + letter.substring(1)
                      )
                      .join(" ")}
                  </h6>
                  <h6 class="card-subtitle mb-2">
                    <div className="row">
                      {this.state.types.map((type) => (
                        <span
                          key={type}
                          className="badge badge-primary badge-pill mr-1"
                          style={{
                            backgroundColor: `#${TYPE_COLORS[type]}`,
                            color: "white",
                          }}
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </h6>
                </div>
              </Card>
              <Card className="card">
                <div className="card-body">
                  <div className="row align-items-center">
                    <h6 className="col-12 col-md-2">Hp</h6>
                    <div className="col-12 col-md-10">
                      <div class="progress">
                        <div
                          class="progress-bar bg-success"
                          role="progressbar"
                          style={{ width: this.state.stats.hp }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          {this.state.stats.hp}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <h6 className="col-12 col-md-2">Attack</h6>
                    <div className="col-12 col-md-10">
                      <div class="progress">
                        <div
                          class="progress-bar bg-danger"
                          role="progressbar"
                          style={{ width: this.state.stats.attack }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          {this.state.stats.attack}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <h6 className="col-12 col-md-2">Defense</h6>
                    <div className="col-12 col-md-10">
                      <div class="progress">
                        <div
                          class="progress-bar bg-warning"
                          role="progressbar"
                          style={{ width: this.state.stats.defense }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          {this.state.stats.defense}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <h6 className="col-12 col-md-2">Special Attack</h6>
                    <div className="col-12 col-md-10">
                      <div class="progress">
                        <div
                          class="progress-bar bg-danger"
                          role="progressbar"
                          style={{ width: this.state.stats.specialAttack }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          {this.state.stats.specialAttack}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <h6 className="col-12 col-md-2">SpecialDefense</h6>
                    <div className="col-12 col-md-10">
                      <div class="progress">
                        <div
                          class="progress-bar bg-warning"
                          role="progressbar"
                          style={{ width: this.state.stats.specialDefense }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          {this.state.stats.specialDefense}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <h6 className="col-12 col-md-2">Speed</h6>
                    <div className="col-12 col-md-10">
                      <div class="progress">
                        <div
                          class="progress-bar bg-info"
                          role="progressbar"
                          style={{ width: this.state.stats.speed }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          {this.state.stats.speed}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="col">
                      <div className="row align-items-center">
                        <h6 className="col-12 col-md-2">Abilities:</h6>
                        <div>
                          <div className="row">
                            <div className="badge badge-primary badge-pill mr-1">
                              {this.state.abilities}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row align-items-center">
                        <h6 className="col-12 col-sm-2">Height:</h6>
                        <div className="col-12 col-sm-2">
                          {this.state.height} ft
                        </div>
                        <h6 className="col-12 col-md-2">Weight:</h6>
                        <div className="col-12 col-md-2">
                          {this.state.weight} lbs
                        </div>
                      </div>

                      <div className="row align-items-center">
                        <h6 className="col-12 col-md-2">Egg Groups:</h6>
                        <div className="col-12 col-md-2">
                          {this.state.eggGroups}{" "}
                        </div>
                        <h6 className="col-12 col-md-2">Hatch Steps:</h6>
                        <div className="col-12 col-md-2">
                          {this.state.hatchSteps}
                        </div>
                      </div>
                      <div className="row align-items-center">
                        <h6 className="col-12 col-sm-2">Gender Ratio:</h6>
                        <div className="col-12 col-md-10">
                          <div class="progress">
                            <div
                              class="progress-bar"
                              role="progressbar"
                              style={{
                                width: `${this.state.genderRatioFemale}%`,
                                backgroundColor: "#c2185b",
                              }}
                              aria-valuenow="15"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            >
                              <small>{this.state.genderRatioFemale}</small>
                            </div>
                            <div
                              class="progress-bar"
                              role="progressbar"
                              style={{
                                width: `${this.state.genderRatioMale}%`,
                                backgroundColor: "#1976d2",
                              }}
                              aria-valuenow="30"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            >
                              <small>{this.state.genderRatioMale}</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div className="col mb-4"></div>
            <div className="card-deck">
              <Card className="card">
                <div className="row mt-1">
                  <div className="col">
                    <p className="p-3">{this.state.description}</p>
                  </div>
                </div>
              </Card>
              <Card className="card">
                <div className="card-body">
                  <div className="listMoves">
                    <div className="card-body mx-auto">
                      <React.Fragment>
                        {this.state.moves.map((move) => (
                          <div className="row align-items-center">
                            <div class="col py-1 px-md-5">
                              <Card className="card">
                                <h6 className="card-title">
                                  {move
                                    .toLowerCase()
                                    .split(" ")
                                    .map(
                                      (letter) =>
                                        letter.charAt(0).toUpperCase() +
                                        letter.substring(1)
                                    )
                                    .join(" ")}
                                </h6>
                              </Card>
                            </div>
                          </div>
                        ))}
                      </React.Fragment>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
