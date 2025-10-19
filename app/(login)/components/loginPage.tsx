"use client";
import React, { useState } from "react";

/**
 * Pantalla de Login – Manito (lado empresa)
 * - Layout dividido: mensaje de marca a la izquierda y tarjeta de login a la derecha
 * - TailwindCSS puro
 * - Accesible (labels, aria, focus states)
 */

export default function LoginManito() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const errs: typeof errors = {};
    if (!email) errs.email = "Ingresá tu correo";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Correo inválido";
    if (!password) errs.password = "Ingresá tu contraseña";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // Demo: mostrar valores en consola
    console.log({ email, password: "••••••", remember });
    alert("Sesión iniciada (demo)");
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-emerald-50 via-white to-emerald-100 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex items-center gap-10">
        {/* Columna izquierda: marca */}
        <section className="hidden md:flex flex-1 flex-col gap-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white grid place-items-center font-bold">M</div>
            <div>
              <h1 className="text-2xl font-semibold leading-tight">Manito</h1>
              <p className="text-sm text-slate-600 max-w-md">Conectamos locales gastronómicos con talento validado en minutos.</p>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-white/70 backdrop-blur px-5 py-4 shadow-sm max-w-md">
            <ul className="list-disc pl-5 text-sm space-y-1 text-slate-700">
              <li>Matching priorizado por skills y cercanía</li>
              <li>Publicaciones activas según tu plan</li>
              <li>Pagos en garantía y liberación según SLA</li>
            </ul>
          </div>
        </section>

        {/* Columna derecha: tarjeta login */}
        <section className="flex-1 flex justify-center">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-[0_6px_24px_rgba(16,185,129,0.15)] border border-emerald-100 p-6">
            <form onSubmit={onSubmit} className="space-y-4" noValidate>
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">Correo electrónico</label>
                <input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="usuario@empresa.com"
                  className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${errors.email ? 'border-rose-300 ring-rose-100' : 'border-slate-200'}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700">Contraseña</label>
                  <a href="#" className="text-xs text-emerald-700 hover:underline">¿Olvidaste tu contraseña?</a>
                </div>
                <div className={`mt-1 relative rounded-xl border ${errors.password ? 'border-rose-300' : 'border-slate-200'} focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500`}>
                  <input
                    id="password"
                    type={showPwd ? 'text' : 'password'}
                    autoComplete="current-password"
                    className="w-full rounded-xl px-3 py-2 pr-10 text-sm outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(s => !s)}
                    aria-label={showPwd ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    className="absolute inset-y-0 right-2 my-auto h-8 w-8 grid place-items-center rounded-md text-slate-500 hover:bg-slate-100"
                  >
                    {/* ícono ojo */}
                    {showPwd ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path d="M3 3l18 18"/><path d="M10.58 10.58A2 2 0 0012 14a2 2 0 001.42-3.42M21 12s-3.5 6-9 6-9-6-9-6 3.5-6 9-6c1.64 0 3.16.5 4.5 1.35"/></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-rose-600">{errors.password}</p>}
              </div>

              {/* Remember me */}
              <label className="flex items-center gap-2 text-sm select-none">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                Recordarme en este dispositivo
              </label>

              {/* Submit */}
              <button type="submit" className="w-full rounded-xl bg-emerald-600 text-white text-sm font-medium py-2.5 hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500">
                Iniciar sesión
              </button>

              {/* Crear cuenta */}
              <p className="text-center text-sm text-slate-600">
                ¿No tenés cuenta? <a className="text-emerald-700 hover:underline" href="#">Crear cuenta</a>
              </p>

              {/* Divider decorativo */}
              <div className="relative my-2 text-center text-xs text-slate-400">
                <span className="before:content-[''] before:absolute before:left-0 before:right-0 before:top-1/2 before:h-px before:bg-slate-200 block">
                  <span className="bg-white relative px-2">o</span>
                </span>
              </div>

              {/* Términos */}
              <p className="text-center text-[11px] text-slate-500">
                Al continuar, aceptás los <a className="underline" href="#">Términos y Condiciones</a> y la <a className="underline" href="#">Política de Privacidad</a>.
              </p>
            </form>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="px-6 pb-6 text-center text-xs text-slate-500">© {new Date().getFullYear()} Manito · CABA/AMBA</footer>
    </div>
  );
}