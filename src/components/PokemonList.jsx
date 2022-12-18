import React from "react";

export const PokemonList = ({ pokemon }) => {
  return pokemon.map((pokemon) => <div key={pokemon}>{pokemon}</div>);
};
