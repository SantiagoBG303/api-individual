import { createContext } from "react";

type AuthUser = {
  uid: string;
  email: string | null;
  name: string | null;
};

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  register: (name: string, email: string, password: string) => Promise<AuthUser>;
  logout: () => Promise<void>;
};

export type { AuthUser, AuthContextValue };
export const AuthContext = createContext<AuthContextValue | null>(null);
