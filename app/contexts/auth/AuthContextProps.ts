import { User } from "@/app/lib/types/user";

export interface AuthContextProps {
    user: User | null;
    error: string | null;
    loading?: boolean;
    setError: (error: string | null) => void;
    handleRegister?: (user: User) => Promise<void>;
    handleLogin?: (email: string, password: string) => Promise<void>;
    handleResetPassword?: (email: string, newPassword: string) => Promise<void>;
}
