"use client";
import React, { useEffect, useState, useRef } from "react";


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
    <div>
      <section className="order-1 lg:order-2 flex justify-center">
        <div className="w-full max-w-md bg-white rounded-2xl border border-emerald-100 shadow-sm p-6">
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
                <p className="text-xs text-gray-500">Asegurate de recordar tu nueva contraseña para futuros inicios de sesión.</p>
              </form>
              <div className="mt-3 text-xs text-gray-500">¿No tenés el código? <button className="cursor-pointer text-emerald-700 hover:underline" onClick={()=>setMode('request')}>Volver a solicitar</button></div>
            </div>
          )}

          <div className="mt-4 space-y-2 text-sm">
            {mode === 'request' ? (
              <button className="text-emerald-700 hover:underline cursor-pointer" onClick={() => setMode('otp')}>¿Ya lo recibiste? Ingresar código</button>
            ) : (
              <button className="text-emerald-700 hover:underline cursor-pointer" onClick={() => alert('Ir a iniciar sesión')}>Volver a iniciar sesión</button>
            )}
          </div>
        </div>
      </section>
    <p className="mt-10 text-xs text-gray-500">© {new Date().getFullYear()} Manito · CABA/AMBA</p>
    </div>
  );
}
