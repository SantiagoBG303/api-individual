import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/usuario", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor completa todos los campos.");
      return;
    }

    setLoading(true);

    try {
      await login(email.trim(), password);
      navigate("/usuario", { replace: true });
    } catch (error: unknown) {
      const message =
        typeof error === "object" && error !== null && "message" in error
          ? String((error as { message?: string }).message)
          : "";

      setError(
        message.includes("user-not-found")
          ? "El usuario no existe."
          : message.includes("wrong-password")
          ? "Contraseña incorrecta."
          : "No se pudo iniciar sesión. Revisa tus datos."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-title">
            <span className="auth-icon">🔐</span>
            <div>
              <h1>Iniciar sesión</h1>
              <p className="subtitle">Accede a tu panel y guarda tus favoritos.</p>
            </div>
          </div>
          <div className="auth-pill">Acceso seguro con email y contraseña</div>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Correo electrónico
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="tucorreo@ejemplo.com"
            />
          </label>

          <label>
            Contraseña
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Tu contraseña"
            />
          </label>

          {error && <div className="alert-message">{error}</div>}

          <button type="submit" className="button" disabled={loading}>
            {loading ? "Validando…" : "Entrar"}
          </button>
        </form>

        <div className="helper-line">
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
