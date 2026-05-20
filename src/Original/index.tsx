import { useEffect, useState } from "react";

type Joke = {
  value: string;
};

function Original() {
  const [joke, setJoke] = useState<Joke | null>(null);

  useEffect(() => {
    fetch("https://api.chucknorris.io/jokes/random")
      .then((res) => res.json())
      .then((data) => setJoke(data));
  }, []);

  return (
    <div className="page-shell">
      <div className="info-card">
        <div className="page-hero">
          <div>
            <h1 className="page-title">Original</h1>
            <p className="page-subtitle">Descubre un chiste aleatorio de Chuck Norris para animar tu día.</p>
          </div>
          <span className="card-badge">Un nuevo chiste cada vez</span>
        </div>

        <div className="joke-card">
          <p>{joke?.value || "Cargando un chiste épico..."}</p>
        </div>
      </div>
    </div>
  );
}

export default Original;