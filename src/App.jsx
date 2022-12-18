import { useState, useEffect } from "react";
import { PokemonList } from "./components/PokemonList";

import axios from "axios";
import { Pagination } from "./components/Pagination";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let cancel = null;

    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setLoading(false);
        setPokemon(res.data.results.map((pokemon) => pokemon.name));
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);
      });

    // useEffect cleanup function
    // Prevent old requests from running after a new request has been made
    return () => cancel;
  }, [currentPageUrl]);

  const goToNextPage = () => setCurrentPageUrl(nextPageUrl);
  const goToPrevPage = () => setCurrentPageUrl(prevPageUrl);

  if (loading) return "Loading...";
  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination
        goToNextPage={nextPageUrl ? goToNextPage : null}
        goToPrevPage={prevPageUrl ? goToPrevPage : null}
      />
    </>
  );
}

export default App;
