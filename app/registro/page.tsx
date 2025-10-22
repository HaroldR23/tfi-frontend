"use client";

import Branding from "../components/Branding";
import RegisterForm from "./components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-emerald-50 via-white to-emerald-100 text-slate-900 items-center flex">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex gap-10">
        <Branding />
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;
