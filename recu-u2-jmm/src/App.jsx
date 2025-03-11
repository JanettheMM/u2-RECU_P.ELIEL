import { useState, useEffect } from "react";
import axios from "axios";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setoffset] = useState(0);
  const [error, setError] = useState(null);
  const limit = 10;

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
      .then((response) => {
        setPokemonList(response.data.results);
      })
      .catch(() => {
        setError("ERROR, pokemon no disponible");
      });
  }, [offset]);

  return (
    <div>
      <h1> --POKEMONES-- </h1>
      {error && <p> {error}</p>}
      <ul>
        {pokemonList.map((pokemon, index) => (
          <li key={pokemon.name}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                offset + index + 1
              }.png`}
              alt={pokemon.name}
            />
            <p> {pokemon.name}</p>
          </li>
        ))}
      </ul>
      <button onClick={() => setoffset(offset - limit)} disabled={offset === 0}>
        {" "}
        ATRÁS{" "}
      </button>
      <button onClick={() => setoffset(offset + limit)}> ADELANTE</button>
    </div>
  );
}

export default App;
