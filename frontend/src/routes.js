import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import PokemonPage from "./components/Pokemon";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:page?" exact component={Home} />
        <Route path="/pokemon/:pokemonIndex" component={PokemonPage} />
      </Switch>
    </BrowserRouter>
  );
}