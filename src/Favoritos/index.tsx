import { useState } from "react";

type Joke = {
  id: string;
  value: string;
};

function Favoritos() {
  const [favoritos] = useState<Joke[]>(() => {
    const stored = localStorage.getItem("favoritos");
    if (!stored) return [];

    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? (parsed as Joke[]) : [];
    } catch {
      return [];
    }
  });

  return (
    <div className="page-shell">
      <div className="info-card">
        <div className="page-hero">
          <div>
            <h1 className="page-title">Favoritos</h1>
            <p className="page-subtitle">Guarda tus chistes favoritos y vuelve a verlos cuando quieras.</p>
          </div>
          <span className="card-badge">Tu colección personal</span>
        </div>

        {favoritos.length === 0 ? (
          <div className="empty-state">No tienes favoritos guardados aún. Busca chistes y agrégalos para verlos aquí.</div>
        ) : (
          <div className="joke-list">
            {favoritos.map((joke, index) => (
              <div key={index} className="joke-card">
                <p>{joke.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favoritos;



