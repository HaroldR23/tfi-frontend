"use client";

import { AuthContext } from "./AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/app/lib/types/user";
import { createUser, loginUser, resetPassword } from "@/app/services/userServices";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleRegister = async (user: User) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newUser = await createUser(user);
      setUser({
        email: newUser.email,
        name: newUser.username,
        role: newUser.role,
        ciudad: newUser.city,
        cp: newUser.postal_code,
        telefono: newUser.phone_number,
      });

      const userRole = newUser.role;
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
  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const loggedUser = await loginUser(email, password);
      setUser({
        email: loggedUser.email,
        name: loggedUser.username,
        role: loggedUser.role,
        ciudad: loggedUser.city,
        cp: loggedUser.postal_code,
        telefono: loggedUser.phone_number,
      });
    
      const userRole = loggedUser.role;
      if (userRole === "empleador") {
        router.push("/negocios");
      } else if (userRole === "trabajador") {
        router.push("/empleados");
      }

    } catch {
      setError("Error during login.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleResetPassword = async (email: string, newPassword: string) => {
    // Implement password reset logic here
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Assume password reset is successful
      await resetPassword(email, newPassword);

    } catch {
      setError("Error during password reset.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
        user, 
        error, 
        loading, 
        setError, 
        handleRegister, 
        handleLogin, 
        handleResetPassword 
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
