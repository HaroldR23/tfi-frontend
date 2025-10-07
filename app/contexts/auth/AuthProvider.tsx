"use client";

import { AuthContext } from "./AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/app/lib/types/user";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleRegister = async (user: User) => {
    try {
      setLoading(true);
      // Aca debe de ir la logica de registro con el backend
      // Simulamos un retardo de 1 segundo
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUser(user);

      const userRole = user.role;
      if (userRole === "empleador") {
        router.push("/negocios");
      } else if (userRole === "trabajador") {
        router.push("/empleados");
      }
    } catch {
      setError("Error during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, loading, setError, handleRegister}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
