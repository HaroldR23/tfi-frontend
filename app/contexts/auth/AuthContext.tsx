"use client";

import { createContext } from "react";
import { AuthContextProps } from "./AuthContextProps";


export const AuthContext = createContext<AuthContextProps>({
		user: null,
		error: null,
		loading: true,
		setError: () => {},
		handleRegister: async () => {}
});
