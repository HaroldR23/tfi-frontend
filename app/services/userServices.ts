import { TFI_BACKEND_URL } from "../lib/settings/constants";
import { User } from "../lib/types/user";

export const createUser = async (userData: User) => {
  const response = await fetch(`${TFI_BACKEND_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: userData.name,
      password: userData.password,
      company_name: userData.name,
      phone_number: userData.telefono,
      email: userData.email,
      city: userData.ciudad,
      postal_code: userData.cp,
      role: userData.role,  
    }), 
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json();
};

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${TFI_BACKEND_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Failed to login");
  }

  return response.json();
};
