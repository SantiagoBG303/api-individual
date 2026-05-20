import { NavLink, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Favoritos from "./Favoritos";
import Original from "./Original";
import Informativa from "./Informativa";
import Usuario from "./Usuario";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";
import "./App.css";

function App() {
  const { user, loading } = useAuth();

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand-block">
          <span className="brand">Chuck Norris App</span>
          <p className="brand-description">Navega, guarda favoritos y administra tu sesión.</p>
        </div>

        <nav className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/favoritos">Favoritos</NavLink>
          <NavLink to="/original">Original</NavLink>
          <NavLink to="/informativa">Informativa</NavLink>
          <NavLink to="/usuario">Usuario</NavLink>
        </nav>

        <div className="status-block">
          <span className={`status-chip ${user ? "online" : "offline"}`}>
            {loading ? "Cargando…" : user ? "Logueado ✅" : "Desconectado ❌"}
          </span>
          <p className="status-text">
            {user ? `${user.name || user.email}` : "Inicia sesión para acceder al panel"}
          </p>
        </div>
      </header>

      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/original" element={<Original />} />
          <Route path="/informativa" element={<Informativa />} />
          <Route path="/usuario" element={<ProtectedRoute><Usuario /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
