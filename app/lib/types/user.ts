import { Role } from "./common";

export type User = {
  role: Role;
  name: string;
  password?: string;
  email: string;
  telefono?: string;
  ciudad?: string;
  cp?: string;
};
