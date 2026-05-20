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
    <div className="page-shell">
      <div className="info-card">
        <div className="page-hero">
          <div>
            <h1 className="page-title">Explora chistes épicos</h1>
            <p className="page-subtitle">Busca chistes de Chuck Norris y guarda los mejores en favoritos.</p>
          </div>
          <span className="card-badge">Gratis y totalmente divertido</span>
        </div>

        <div className="search-row">
          <label className="input-label">
            Buscar chiste
            <input
              className="content-input"
              type="text"
              placeholder="Buscar chiste"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <button className="button" onClick={fetchData}>
            Buscar
          </button>
        </div>

        <div className="joke-list">
          {jokes.map((joke) => (
            <div key={joke.id} className="joke-card">
              <p>{joke.value}</p>
              <button className="button button-ghost" onClick={() => guardarFavorito(joke)}>
                Guardar en favoritos
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;