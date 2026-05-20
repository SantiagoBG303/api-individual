import "./style.css";
import { useCallback, useEffect, useState } from "react";

type Joke = {
  id: string;
  value: string;
};

function Home() {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [search, setSearch] = useState("chuck");

  const fetchData = useCallback(async () => {
    const response = await fetch(
      `https://api.chucknorris.io/jokes/search?query=${search}`
    );
    const data = await response.json();
    setJokes(Array.isArray(data.result) ? data.result : []);
  }, [search]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchData();
  }, [fetchData]);

  const guardarFavorito = (joke: Joke) => {
    const favoritos = JSON.parse(localStorage.getItem("favoritos") || "[]") as unknown;
    const nextFavorites = Array.isArray(favoritos) ? [...favoritos, joke] : [joke];
    localStorage.setItem("favoritos", JSON.stringify(nextFavorites));
  };

  return (
    <div>
      <h1>Home</h1>

      <input
        type="text"
        placeholder="Buscar chiste"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={fetchData}>Buscar</button>

      {jokes.map((joke) => (
        <div key={joke.id}>
          <p>{joke.value}</p>
          <button onClick={() => guardarFavorito(joke)}>
            Guardar en favoritos
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;