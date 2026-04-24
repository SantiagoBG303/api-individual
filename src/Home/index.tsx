import "./style.css";
import { useEffect, useState } from "react";

function Home() {
  const [jokes, setJokes] = useState<any[]>([]);
  const [search, setSearch] = useState("chuck");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`https://api.chucknorris.io/jokes/search?query=${search}`)
      .then((res) => res.json())
      .then((data) => setJokes(data.result));
  };

  const guardarFavorito = (joke: any) => {
    const favoritos = JSON.parse(localStorage.getItem("favoritos") || "[]");
    favoritos.push(joke);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
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