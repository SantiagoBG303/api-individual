import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

function Usuario() {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    setLoading(false);
  };

  return (
    <div className="page-shell">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <div>
            <h1>Panel Usuario</h1>
            <p>Administra tu sesión y revisa tu información.</p>
          </div>
          <span className={`status-chip ${user ? "online" : "offline"}`}>
            {user ? "Logueado ✅" : "Desconectado ❌"}
          </span>
        </div>

        <div className="dashboard-grid">
          <div className="info-block">
            <span>Nombre</span>
            <p>{user?.name || "Sin nombre"}</p>
          </div>
          <div className="info-block">
            <span>Correo</span>
            <p>{user?.email || "Sin correo"}</p>
          </div>
          <div className="info-block wide">
            <span>UID</span>
            <p>{user?.uid}</p>
          </div>
        </div>

        <button className="button button-ghost" onClick={handleLogout} disabled={loading}>
          {loading ? "Cerrando sesión…" : "Cerrar sesión"}
        </button>
      </div>
    </div>
  );
}

export default Usuario;
