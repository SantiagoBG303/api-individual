import { useEffect, useMemo, useState, type ReactNode } from "react";
import { loginUser, logoutUser, registerUser, subscribeAuthState } from "../services/authService";
import { AuthContext, type AuthUser } from "./authContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = subscribeAuthState((authUser) => {
      if (authUser) {
        setUser({
          uid: authUser.uid,
          email: authUser.email,
          name: authUser.displayName || authUser.email,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const authenticatedUser = await loginUser(email, password);
    setUser(authenticatedUser);
    return authenticatedUser;
  };

  const register = async (name: string, email: string, password: string) => {
    const authenticatedUser = await registerUser(name, email, password);
    setUser(authenticatedUser);
    return authenticatedUser;
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  const value = useMemo(() => ({ user, loading, login, register, logout }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
