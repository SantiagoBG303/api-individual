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
    <div>
      <h1>Favoritos</h1>

      {favoritos.map((joke, index) => (
        <p key={index}>{joke.value}</p>
      ))}
    </div>
  );
}

export default Favoritos;



