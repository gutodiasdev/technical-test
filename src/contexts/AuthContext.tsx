"use client";

import { removeTokenFromCookies } from "@/data/actions/auth";
import { createContext, ReactNode, useContext, useState } from "react";

export interface SessionData {
  id: number;
  name: string;
  email: string;
}

interface AuthContextProps {
  session: SessionData;
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthProvider({
  children,
  session: initialSession
}: {
  children: ReactNode,
  session: SessionData
}) {
  const [session] = useState<SessionData>(initialSession);

  async function logout() {
    localStorage.removeItem("token");
    await removeTokenFromCookies()
  }

  return (
    <AuthContext.Provider value={{ session, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth só deve ser utilizando dentro do AuthProvider");

  return context;
}

export { useAuth };
