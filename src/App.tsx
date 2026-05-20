import { useEffect, useState } from "react";
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
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme-mode");
    if (storedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme-mode", darkMode ? "dark" : "light");
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  return (
    <div className={`app-shell ${darkMode ? "dark-mode" : ""}`}>
      <header className="app-header">
        <div className="brand-block">
          <span className="brand">Chuck Norris App</span>
          <p className="brand-description">Navega, guarda favoritos y administra tu sesión.</p>
          <div className="brand-pill">Firebase + Capacitor + diseño premium</div>
        </div>

        <nav className="nav-links">
          <NavLink to="/" end data-icon="home">
            Home
          </NavLink>
          <NavLink to="/favoritos" data-icon="star">
            Favoritos
          </NavLink>
          <NavLink to="/original" data-icon="sparkles">
            Original
          </NavLink>
          <NavLink to="/informativa" data-icon="info">
            Informativa
          </NavLink>
          <NavLink to="/usuario" data-icon="user">
            Usuario
          </NavLink>
        </nav>

        <div className="status-block">
          <div className="theme-switcher">
            <button
              type="button"
              className="button button-ghost button-small"
              onClick={() => setDarkMode((prev) => !prev)}
            >
              {darkMode ? "Modo claro" : "Modo oscuro"}
            </button>
          </div>
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
