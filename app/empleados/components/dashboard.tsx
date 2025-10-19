"use client";

// NOTE: Fixed duplicated/nested <section> and ensured all sections are properly closed.
// Mock de useAuthContext para previsualización en canvas
const useAuthContext = () => ({ user: { name: "Daniel Pérez", role: "trabajador" } });
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";

// Dashboard para Empleados (Trabajador)
// - TailwindCSS, responsive
// - KPIs: próximos turnos, ingresos del mes, horas trabajadas, tasa de aceptación
// - Listas: Próximos turnos, Oportunidades sugeridas
// - Widgets: Balance, Documentación, Reputación

export default function EmpleadosDashboard({
  kpis = {
    nextShifts: 3,
    monthEarnings: 152000,
    workedHours: 48,
    acceptanceRate: 92, // %
  },
  upcomingShifts = [
    { id: "s1", date: "2025-09-22", time: "18:00–23:00", role: "Mozo/a", site: "Bar Centro", status: "Confirmado", address: "Av. Siempre Viva 123" },
    { id: "s2", date: "2025-09-23", time: "12:00–16:00", role: "Cocina", site: "Resto Norte", status: "Pendiente", address: "Av. Libertad 456" },
    { id: "s3", date: "2025-09-24", time: "09:00–13:00", role: "Cajero/a", site: "Café Oeste", status: "Confirmado", address: "Calle Sol 789" },
  ],
  suggestedJobs = [
    { id: "j1", role: "Mozo/a", site: "Bistró Palermo", date: "2025-09-22", time: "19:00–23:30", distanceKm: 2.1, pay: 18000 },
    { id: "j2", role: "Cocina", site: "Parrilla Centro", date: "2025-09-22", time: "11:30–15:30", distanceKm: 3.8, pay: 16000 },
    { id: "j3", role: "Delivery", site: "Pizza Norte", date: "2025-09-23", time: "20:00–00:00", distanceKm: 5.2, pay: 21000 },
  ],
  documents = [
    { id: "d1", name: "DNI", status: "Vigente" },
    { id: "d2", name: "Libreta sanitaria", status: "Vence en 12 días" },
    { id: "d3", name: "Cert. Manipulación", status: "Vencido" },
  ],
  reputation = {
    rating: 4.7,
    punctuality: 98,
    completion: 97,
    reviews: [
      { id: "r1", by: "Resto Norte", text: "Excelente predisposición y rapidez." },
      { id: "r2", by: "Café Centro", text: "Muy puntual y prolija." },
    ],
  },
  onAcceptJob,
  onRejectJob,
  onViewDetails,
  onCheckIn,
  onCheckOut,
  onUpdateDocs,
  onViewClaim,
  onExport,
}: any) {
  const currency = (n: any) => n?.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });
  const formatDate = (isoDate: string) => {
    if (!isoDate) return "";
    const [year, month, day] = isoDate.split("-");
    if (!year || !month || !day) return isoDate;
    return `${day}/${month}/${year}`;
  };

  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // Reclamos abiertos (mock si no vienen por props)
  const openClaims = [
    { id: "RP-20250920-AB12", categoria: "Pago/propina", severidad: "Media", creado: "2025-09-20", resumen: "Diferencia en el monto acreditado", estado: "Abierto" },
    { id: "RP-20250921-ZX34", categoria: "Dirección incorrecta", severidad: "Baja", creado: "2025-09-21", resumen: "El mapa indicaba otra puerta de ingreso", estado: "En revisión" },
  ];

  const handleViewDetails = (job: any) => {
    onViewDetails?.(job);
    setSelectedJob(job);
  };

  const handleAcceptJob = (job: any) => {
    onAcceptJob?.(job);
    setSelectedJob(null);
  };

  const handleRejectJob = (job: any) => {
    onRejectJob?.(job);
    setSelectedJob(null);
  };

  const handleCloseModal = () => setSelectedJob(null);

  // --- Dev test-cases (simple runtime assertions) ---
  useEffect(() => {
    try {
      console.assert(formatDate("2025-09-01") === "01/09/2025", "formatDate debería devolver dd/mm/yyyy");
      const c = currency(12345);
      console.assert(typeof c === "string" && /\$|ARS/.test(c), "currency debería formatear en ARS");
      console.assert(Array.isArray(openClaims) && openClaims.length >= 0, "openClaims debe ser un array");
    } catch {}
  }, []);

  const { user } = useAuthContext();
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto flex gap-6">
        <aside id="sidebar" className={`${sidebarVisible ? (sidebarCollapsed ? 'w-16' : 'w-64') : 'w-0'} ${sidebarVisible ? 'block' : 'hidden'} ${sidebarVisible ? 'xl:block' : 'xl:hidden'}`}>
          <nav className="bg-white/80 backdrop-blur-xl border border-emerald-100 rounded-2xl p-4 md:p-5 shadow-sm h-full flex flex-col justify-between">
            <ul className="space-y-2 text-sm">
              <li><button className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-50">{sidebarCollapsed ? 'MC' : 'Mi cuenta'}</button></li>
              <li><button className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-50">{sidebarCollapsed ? 'Doc' : 'Documentación'}</button></li>
              <li><button className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-50">{sidebarCollapsed ? 'PT' : 'Próximos turnos'}</button></li>
              <li><button className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-50">{sidebarCollapsed ? 'OS' : 'Oportunidades sugeridas'}</button></li>
              <li><button className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-50">{sidebarCollapsed ? 'RP' : 'Reputación'}</button></li>
              <li><button className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-50 text-rose-700">{sidebarCollapsed ? 'CS' : 'Cerrar sesión'}</button></li>
            </ul>
            <div>
              <button onClick={() => setSidebarCollapsed((s) => !s)} className="w-full text-left px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50">{sidebarCollapsed ? '»' : '«'} {sidebarCollapsed ? 'Expandir' : 'Colapsar'}</button>
            </div>
          </nav>
        </aside>

        <main className="flex-1">
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarCollapsed((s) => !s)} className="rounded-md p-1 bg-white/60 hover:bg-white hidden xl:inline">{sidebarCollapsed ? '»' : '«'}</button>
              <button onClick={() => setSidebarVisible(v => !v)} aria-expanded={sidebarVisible} aria-controls="sidebar" className="h-10 w-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">M</button>
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Hola, {user?.role == "trabajador" ? user?.name.split(" ")[0] : user?.name}</h1>
                <p className="text-sm text-gray-500">Tu actividad y oportunidades</p>
              </div>
            </div>
        </header>

          {/* KPIs */}
          <section className="grid grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
            <KpiCard title="Próximos turnos" value={kpis.nextShifts} subtitle="Confirmados/Pendientes" />            <KpiCard title="Horas trabajadas" value={kpis.workedHours} subtitle="Últimos 30 días" />
          </section>

          {/* Grid principal: Próximos turnos + (Balance & Mis reclamos abiertos) */}
          <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            {/* Próximos turnos */}
            <div className="xl:col-span-2 bg-white/80 backdrop-blur-xl border border-emerald-100 rounded-2xl p-4 md:p-5 shadow-sm">
              <h3 className="text-base font-semibold text-gray-900 mb-3">Próximos turnos</h3>
              <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto pr-1">
                {upcomingShifts.map((t: any) => (
                  <div key={t.id} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{t.role} · <span className="text-gray-600">{t.site}</span></p>
                      <p className="text-xs text-gray-600">{formatDate(t.date)} · {t.time}</p>
                      <p className="text-xs text-gray-500">{t.address}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {t.status === "Confirmado" ? (
                        <button onClick={() => onCheckIn?.(t)} className="rounded-xl bg-emerald-600 px-3 py-1.5 text-sm text-white hover:bg-emerald-700">Check-in</button>
                      ) : t.status === "Pendiente" ? (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-amber-100 text-amber-800">Pendiente</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-gray-200 text-gray-700">—</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Columna derecha: Balance + Mis reclamos abiertos */}
            <div className="space-y-4">
              {/* Balance */}
              <div className="bg-white/80 backdrop-blur-xl border border-emerald-100 rounded-2xl p-4 md:p-5 shadow-sm">
                <h3 className="text-base font-semibold text-gray-900 mb-1">Balance</h3>
                <p className="text-xs text-gray-500 mb-3">Ingresos del mes en curso</p>
                <div className="text-3xl font-semibold text-gray-900">{currency(kpis.monthEarnings)}</div>
                <p className="text-xs text-gray-500 mt-1">Bruto estimado a hoy</p>
                <div className="mt-3 text-right">
                  <button onClick={() => onExport?.()} className="text-sm rounded-xl border border-gray-300 bg-white px-3 py-2 hover:bg-gray-50">Ver detalle</button>
                </div>
              </div>

              {/* Mis reclamos abiertos */}
              <div className="bg-white/80 backdrop-blur-xl border border-emerald-100 rounded-2xl p-4 md:p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-gray-900">Mis reclamos abiertos</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">{openClaims.length}</span>
                </div>
                <ul className="mt-2 space-y-2 text-sm">
                  {openClaims.map((c) => (
                    <li key={c.id} className="border-t border-gray-100 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{c.categoria}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${c.estado === 'Abierto' ? 'bg-amber-100 text-amber-800' : 'bg-sky-100 text-sky-800'}`}>{c.estado}</span>
                      </div>
                      <div className="text-gray-600">{c.resumen}</div>
                      <div className="text-xs text-gray-500">{c.id} · {c.severidad} · {c.creado}</div>
                      <div className="mt-2 text-right">
                        <button
                          onClick={() => (typeof onViewClaim === 'function' ? onViewClaim(c) : (window.location.href = `/reclamos/${encodeURIComponent(c.id)}`))}
                          className="rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-gray-700 hover:bg-gray-50"
                        >
                          Ver detalle
                        </button>
                      </div>
                    </li>
                  ))}
                  {openClaims.length === 0 && (
                    <li className="text-gray-500">No tenés reclamos abiertos.</li>
                  )}
                </ul>
              </div>
            </div>
          </section>

          {/* Oportunidades + Documentos + Reputación */}
          <section className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-4">
            {/* Oportunidades */}
            <div className="xl:col-span-2 bg-white/80 backdrop-blur-xl border border-emerald-100 rounded-2xl p-4 md:p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-gray-900">Oportunidades sugeridas</h3>
                <span className="text-xs text-gray-500">Basadas en tu perfil y zona</span>
              </div>
              <div className="overflow-x-auto max-h-72 overflow-y-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-600">
                      <th className="py-2 pr-3">Rol</th>
                      <th className="py-2 pr-3">Lugar</th>
                      <th className="py-2 pr-3">Fecha</th>
                      <th className="py-2 pr-3">Horario</th>
                      <th className="py-2 pr-3">Distancia</th>
                      <th className="py-2 pr-3">Pago</th>
                      <th className="py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {suggestedJobs.map((j: any) => (
                      <tr key={j.id} className="border-top border-gray-100">
                        <td className="py-2 pr-3 font-medium text-gray-900">{j.role}</td>
                        <td className="py-2 pr-3">{j.site}</td>
                        <td className="py-2 pr-3">{formatDate(j.date)}</td>
                        <td className="py-2 pr-3">{j.time}</td>
                        <td className="py-2 pr-3">{j.distanceKm} km</td>
                        <td className="py-2 pr-3">{currency(j.pay)}</td>
                        <td className="py-2 flex gap-2 justify-end">
                          <button onClick={() => handleViewDetails(j)} className="rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-gray-700 hover:bg-gray-50">Ver detalles</button>
                          <button onClick={() => handleAcceptJob(j)} className="rounded-lg bg-emerald-600 text-white px-2.5 py-1.5 hover:bg-emerald-700">Aceptar</button>
                          <button onClick={() => handleRejectJob(j)} className="rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 hover:bg-gray-50">Rechazar</button>
                        </td>
                      </tr>
                    ))}
                    {suggestedJobs.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-6 text-center text-gray-500">No hay oportunidades disponibles en este momento.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Documentos & Reputación */}
            <div className="space-y-4">
              <div className="bg-white/80 backdrop-blur-xl border border-emerald-100 rounded-2xl p-4 md:p-5 shadow-sm">
                <h3 className="text-base font-semibold text-gray-900 mb-2">Documentación</h3>
                <ul className="space-y-2 text-sm">
                  {documents.map((d: any) => (
                    <li key={d.id} className="flex items-center justify-between">
                      <span className="text-gray-700">{d.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${d.status.includes("Vence") ? "bg-amber-100 text-amber-800" : d.status === "Vencido" ? "bg-rose-100 text-rose-800" : "bg-emerald-100 text-emerald-800"}`}>{d.status}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 text-right">
                  <button onClick={() => onUpdateDocs?.()} className="text-sm rounded-xl border border-gray-300 bg-white px-3 py-2 hover:bg-gray-50">Actualizar documentos</button>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-xl border border-emerald-100 rounded-2xl p-4 md:p-5 shadow-sm">
                <h3 className="text-base font-semibold text-gray-900 mb-2">Reputación</h3>
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-semibold text-gray-900">{reputation.rating.toFixed(1)}</span>
                  <span className="text-xs text-gray-600">Puntualidad {reputation.punctuality}% · Finalización {reputation.completion}%</span>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={handleCloseModal} aria-hidden="true"></div>
          <div role="dialog" aria-modal="true" className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{selectedJob.role}</h4>
                <p className="text-sm text-gray-600">{selectedJob.site}</p>
              </div>
              <button onClick={handleCloseModal} className="rounded-xl border border-gray-200 px-2 py-1 text-sm text-gray-600 hover:bg-gray-50" aria-label="Cerrar">Cerrar</button>
            </div>
            <div className="mt-4 space-y-2 text-sm text-gray-700">
              <p><span className="font-medium text-gray-600">Fecha:</span> {formatDate(selectedJob.date)}</p>
              <p><span className="font-medium text-gray-600">Horario:</span> {selectedJob.time}</p>
              {selectedJob.distanceKm !== undefined && (
                <p><span className="font-medium text-gray-600">Distancia estimada:</span> {selectedJob.distanceKm} km</p>
              )}
              <p><span className="font-medium text-gray-600">Pago:</span> {currency(selectedJob.pay)}</p>
            </div>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button onClick={() => handleRejectJob(selectedJob)} className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">Rechazar</button>
              <button onClick={() => handleAcceptJob(selectedJob)} className="rounded-lg bg-emerald-600 px-3 py-2 text-sm text-white hover:bg-emerald-700">Aceptar</button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-xs text-gray-400 mt-6">© {new Date().getFullYear()} Manito · CABA/AMBA</footer>
    </div>
  );
}

function KpiCard({ title, value, subtitle }: any) {
  return (
    <div className="bg-white/80 backdrop-blur-xl border border-emerald-100 rounded-2xl p-4 md:p-5 shadow-sm">
      <p className="text-xs text-gray-600 mb-1">{title}</p>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
  );
}

function Row({ label, value }: any) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
}
