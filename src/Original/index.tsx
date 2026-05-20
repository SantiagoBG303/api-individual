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
    <div>
      <h1>Original</h1>
      <p>{joke?.value}</p>
    </div>
  );
}

export default Original;