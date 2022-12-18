import { useState, useEffect } from "react";
import axios from "axios";

import { PokemonList } from "./components/PokemonList";
import { Pagination } from "./components/Pagination";
import { Loading } from "./components/Loading";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [page, setPage] = useState({
    count: 0,
    current: 1,
    currentUrl: "https://pokeapi.co/api/v2/pokemon",
    nextUrl: "",
    prevUrl: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let cancel = null;

    axios
      .get(page.currentUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setLoading(false);
        setPokemon(res.data.results);
        setPage((prevPage) => {
          return {
            ...prevPage,
            count: Math.ceil(res.data.count / 20),
            nextUrl: res.data.next,
            prevUrl: res.data.previous,
          };
        });
      });

    // useEffect cleanup function
    // Prevent old requests from running after a new request has been made
    return () => cancel;
  }, [page.currentUrl]);

  const goToNextPage = () =>
    setPage((prevPage) => {
      return {
        ...prevPage,
        current: prevPage.current + 1,
        currentUrl: prevPage.nextUrl,
      };
    });

  const goToPrevPage = () =>
    setPage((prevPage) => {
      return {
        ...prevPage,
        current: prevPage.current - 1,
        currentUrl: prevPage.prevUrl,
      };
    });

  if (loading) return <Loading />;
  return (
    <>
      <h1 className="text-4xl text-center">Pokemon List</h1>
      <PokemonList pokemon={pokemon} />
      <Pagination
        page={page}
        goToNextPage={page.nextUrl ? goToNextPage : null}
        goToPrevPage={page.prevUrl ? goToPrevPage : null}
      />
    </>
  );
}

export default App;
