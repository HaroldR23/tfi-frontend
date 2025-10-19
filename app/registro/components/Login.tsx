import React from "react";
import Branding from "./Branding";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 grid grid-cols-1 md:grid-cols-2">
      <Branding />
      <LoginForm />
    </div>
  );
}

export default Login;
