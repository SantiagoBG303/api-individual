import { useEffect, useState } from "react";

function Favoritos() {
  const [favoritos, setFavoritos] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("favoritos") || "[]");
    setFavoritos(data);
  }, []);

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