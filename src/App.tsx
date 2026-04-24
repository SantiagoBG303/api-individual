import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Favoritos from "./Favoritos";
import Original from "./Original";
import Informativa from "./Informativa";
import Usuario from "./Usuario";

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/favoritos">Favoritos</Link>
        <Link to="/original">Original</Link>
        <Link to="/informativa">Informativa</Link>
        <Link to="/usuario">Usuario</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/original" element={<Original />} />
        <Route path="/informativa" element={<Informativa />} />
        <Route path="/usuario" element={<Usuario />} />
      </Routes>
    </div>
  );
}

export default App;