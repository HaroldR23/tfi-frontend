"use client";
import React, { useEffect, useState, useRef } from "react";

/**
 * Recuperar contraseña – con flujo "Ingresar código (OTP)"
 * - Paso 1: Solicitar instrucciones por email
 * - Paso 2: Ingresar OTP + nueva contraseña (en misma pantalla)
 * - Validaciones básicas, accesibilidad y estados de carga
 */

export default function RecuperarContraseña() {
  const [mode, setMode] = useState<"request" | "otp">("request");

  // --- Estado Paso 1 ---
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [reqError, setReqError] = useState<string | null>(null);

  // --- Estado Paso 2 ---
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [resetting, setResetting] = useState(false);
  const [resetOk, setResetOk] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);

  const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const passOk = (v: string) => v.length >= 8; // regla simple
  const otpOk = (v: string) => /^\d{6}$/.test(v);

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setReqError(null);
    if (!emailOk(email)) { setReqError("Ingresá un correo válido"); return; }
    setSending(true);
    // Mock API: enviar correo + OTP
    await new Promise(r => setTimeout(r, 900));
    setSending(false);
    setSentTo(email);
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError(null);
    if (!otpOk(otp)) { setOtpError("El código debe tener 6 dígitos"); return; }
    if (!passOk(password)) { setOtpError("La contraseña debe tener al menos 8 caracteres"); return; }
    if (password !== password2) { setOtpError("Las contraseñas no coinciden"); return; }
    setResetting(true);
    // Mock API: validar OTP y setear nueva contraseña
    await new Promise(r => setTimeout(r, 900));
    setResetting(false);
    setResetOk(true);
  };

  // Accesibilidad: enfocar primer input al cambiar de modo
  const emailRef = useRef<HTMLInputElement | null>(null);
  const otpRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => { (mode === "request" ? emailRef : otpRef).current?.focus(); }, [mode]);

  // Tests mínimos
  useEffect(() => {
    console.assert(emailOk("a@b.co"), "emailOk válido");
    console.assert(!emailOk("a@b"), "emailOk inválido");
    console.assert(otpOk("123456") && !otpOk("12345a"), "otpOk regla");
    console.assert(passOk("12345678") && !passOk("123"), "passOk regla");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
      {/* Header */}
      <header className="px-6 sm:px-10 py-6">
        <span className="inline-flex items-center gap-3">
          <span className="h-9 w-9 rounded-xl bg-emerald-600 text-white grid place-items-center font-semibold">M</span>
          <span className="text-lg sm:text-xl font-semibold">Manito</span>
        </span>
      </header>

      <main className="max-w-6xl mx-auto px-6 sm:px-10 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Columna izquierda */}
          <section className="order-2 lg:order-1">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Recuperá el acceso a tu cuenta en pocos pasos.</h1>
            <div className="mt-6 bg-white/60 backdrop-blur rounded-2xl border border-emerald-100 p-5 text-gray-700">
              <ul className="list-disc ml-5 space-y-2 text-sm sm:text-base">
                <li>Te enviamos un <span className="font-medium">enlace</span> y un <span className="font-medium">código (OTP)</span> al email.</li>
                <li>Podés pegar el código acá y definir tu nueva contraseña.</li>
                <li>Por seguridad, el código expira en minutos.</li>
              </ul>
            </div>
          </section>

          {/* Columna derecha */}
          <section className="order-1 lg:order-2 flex justify-center">
            <div className="w-full max-w-md bg-white rounded-2xl border border-emerald-100 shadow-sm p-6">
              {/* Tabs simples */}
              <div className="grid grid-cols-2 gap-2 text-sm">
                <button onClick={() => setMode("request")} className={`rounded-lg px-3 py-2 border ${mode==='request'? 'border-emerald-300 bg-emerald-50 text-emerald-900' : 'border-gray-200 bg-white text-gray-700'}`}>Enviar instrucciones</button>
                <button onClick={() => setMode("otp")} className={`rounded-lg px-3 py-2 border ${mode==='otp'? 'border-emerald-300 bg-emerald-50 text-emerald-900' : 'border-gray-200 bg-white text-gray-700'}`}>Ingresar código</button>
              </div>

              {mode === "request" ? (
                <div>
                  <h2 className="mt-4 text-lg font-semibold text-gray-900">Recuperar contraseña</h2>
                  {sentTo ? (
                    <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900" role="status" aria-live="polite">
                      Te enviamos instrucciones a <span className="font-medium">{sentTo}</span>. Revisá tu bandeja y, si no aparece, mirá en <span className="font-medium">spam</span>.
                    </div>
                  ) : null}
                  <form className="mt-4 space-y-3" onSubmit={handleRequest} noValidate>
                    <div>
                      <label htmlFor="email" className="block text-sm text-gray-700">Correo electrónico</label>
                      <input id="email" ref={emailRef} type="email" autoComplete="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="usuario@correo.com" className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-200" />
                      {reqError && <p className="mt-1 text-xs text-rose-600" role="alert">{reqError}</p>}
                    </div>
                    <button type="submit" disabled={sending} className="w-full rounded-lg bg-emerald-600 px-3 py-2 text-white text-sm font-medium hover:bg-emerald-700 disabled:opacity-60">{sending? 'Enviando…' : 'Enviar instrucciones'}</button>
                    <p className="text-xs text-gray-500">Te llegará un enlace y un código (OTP). Si no aparece, revisá spam.</p>
                  </form>
                </div>
              ) : (
                <div>
                  <h2 className="mt-4 text-lg font-semibold text-gray-900">Ingresar código</h2>
                  {resetOk ? (
                    <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900" role="status" aria-live="polite">
                      ¡Listo! Tu contraseña se actualizó. Ahora podés iniciar sesión.
                    </div>
                  ) : null}
                  <form className="mt-4 space-y-3" onSubmit={handleReset} noValidate>
                    <div>
                      <label htmlFor="otp" className="block text-sm text-gray-700">Código (6 dígitos)</label>
                      <input id="otp" ref={otpRef} inputMode="numeric" pattern="\\d*" maxLength={6} value={otp} onChange={(e)=>setOtp(e.target.value.replace(/[^0-9]/g, ""))} placeholder="••••••" className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm tracking-widest outline-none focus:ring-2 focus:ring-emerald-200" />
                    </div>
                    <div>
                      <label htmlFor="pass1" className="block text-sm text-gray-700">Nueva contraseña</label>
                      <input id="pass1" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Mínimo 8 caracteres" className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-200" />
                    </div>
                    <div>
                      <label htmlFor="pass2" className="block text-sm text-gray-700">Repetir contraseña</label>
                      <input id="pass2" type="password" value={password2} onChange={(e)=>setPassword2(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-200" />
                    </div>
                    {otpError && <p className="text-xs text-rose-600" role="alert">{otpError}</p>}
                    <button type="submit" disabled={resetting} className="w-full rounded-lg bg-emerald-600 px-3 py-2 text-white text-sm font-medium hover:bg-emerald-700 disabled:opacity-60">{resetting? 'Actualizando…' : 'Actualizar contraseña'}</button>
                  </form>
                  <div className="mt-3 text-xs text-gray-500">¿No tenés el código? <button className="text-emerald-700 hover:underline" onClick={()=>setMode('request')}>Volver a solicitar</button></div>
                </div>
              )}

              <div className="mt-4 space-y-2 text-sm">
                {mode === 'request' ? (
                  <button className="text-emerald-700 hover:underline" onClick={() => setMode('otp')}>¿Ya lo recibiste? Ingresar código</button>
                ) : (
                  <button className="text-emerald-700 hover:underline" onClick={() => alert('Ir a iniciar sesión')}>Volver a iniciar sesión</button>
                )}
              </div>
            </div>
          </section>
        </div>

        <p className="mt-10 text-xs text-gray-500">© {new Date().getFullYear()} Manito · CABA/AMBA</p>
      </main>
    </div>
  );
}
