import React, { useState, useEffect } from "react";
import axios from "axios";

import { Loading } from "./Loading";

const Pokemon = ({ pokemon }) => {
  const [pokemonJSON, setPokemonJSON] = useState({});

  useEffect(() => {
    axios.get(pokemon.url).then((res) => {
      setPokemonJSON(res.data);
    });
  }, []);

  if (!pokemonJSON.id) return <Loading />;

  return (
    <div className="flex flex-col justify-center items-center bg-slate-500 w-64 h-80 m-5 shadow-lg rounded-lg">
      <img
        src={pokemonJSON.sprites.front_default}
        width="128px"
        alt={pokemon.name}
      />
      <p className="relative bottom-[58%] right-[40%] font-bold text-white">
        #{pokemonJSON.id}
      </p>
      <p className="text-2xl text-white">{pokemon.name}</p>
    </div>
  );
};

export const PokemonList = ({ pokemon }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {pokemon.map((pokemon) => (
        <Pokemon key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
};
