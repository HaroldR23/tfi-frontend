"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from "react";

// Dashboard para Negocios (Empleador)
// - TailwindCSS, diseño responsive
// - KPIs clave (publicaciones activas, fill rate, TTA, no-show)
// - Atajos rápidos (crear/pausar/cerrar, duplicar plantilla, hot fill)
// - Listas: Avisos activos, Próximos turnos
// - Widget de finanzas: pagos en garantía, liberaciones, comisión
// - Filtros por sede/rol/estado y rango de fechas
// - Preparado para integrar API real

export default function NegociosDashboard({
  plan = "Profesional", // Esencial | Profesional | Enterprise
  businessName = "Café Ribera",
  sites = [
    { id: "s1", name: "Sucursal Centro" },
    { id: "s2", name: "Sucursal Norte" },
    { id: "s3", name: "Sucursal Oeste" },
  ],
  roles = ["Mozo/a", "Cajero/a", "Cocina", "Delivery"],
  kpis = {
    activePosts: 7,
    fillRate: 86, // %
    tta: 1.8, // horas
    noShow: 3.2, // %
  },
  finance = {
    escrow: 125000,
    released: 378000,
    commissionRate: 0.05, // 8% / 5% / 3%
    month: "Septiembre 2025",
  },
  activePosts = [
    { id: "p1", role: "Mozo/a", site: "Sucursal Centro", status: "Activo", applicants: 12, createdAt: "2025-09-10" },
    { id: "p2", role: "Cocina", site: "Sucursal Norte", status: "Activo", applicants: 7, createdAt: "2025-09-12" },
    { id: "p3", role: "Cajero/a", site: "Sucursal Centro", status: "Pausado", applicants: 3, createdAt: "2025-09-07" },
    { id: "p4", role: "Delivery", site: "Sucursal Oeste", status: "Activo", applicants: 6, createdAt: "2025-09-14" },
  ],
  upcomingShifts = [
    { id: "t1", date: "2025-09-22", time: "18:00–23:00", role: "Mozo/a", worker: "M. López", site: "Sucursal Centro", status: "Confirmado" },
    { id: "t2", date: "2025-09-22", time: "12:00–16:00", role: "Cocina", worker: "S. Gómez", site: "Sucursal Norte", status: "Pendiente" },
    { id: "t3", date: "2025-09-23", time: "09:00–13:00", role: "Cajero/a", worker: "—", site: "Sucursal Oeste", status: "Sin cubrir" },
  ],
  onCreatePost,
  onPausePost,
  onClosePost,
  onDuplicateTemplate,
  onHotFill,
  onExport,
}: any) {
  const [filters, setFilters] = useState({ site: "all", role: "all", state: "all", from: "", to: "" });

  const planBadge = useMemo(() => {
    const map : any = {
      Esencial: "bg-gray-100 text-gray-700",
      Profesional: "bg-amber-100 text-amber-800",
      Enterprise: "bg-emerald-100 text-emerald-800",
    };
    return map[plan] || map.Profesional;
  }, [plan]);

  const filteredPosts = useMemo(() => {
    return activePosts.filter((p: any) => {
      if (filters.site !== "all" && p.site !== filters.site) return false;
      if (filters.role !== "all" && p.role !== filters.role) return false;
      if (filters.state !== "all" && p.status !== filters.state) return false;
      if (filters.from && new Date(p.createdAt) < new Date(filters.from)) return false;
      if (filters.to && new Date(p.createdAt) > new Date(filters.to)) return false;
      return true;
    });
  }, [activePosts, filters]);

  const currency = (n: any) => n?.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 p-4 md:p-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">M</div>
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Dashboard · {businessName}</h1>
            <p className="text-sm text-gray-500">Resumen operativo y financiero</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm ${planBadge}`}>Plan {plan}</span>
          <button onClick={() => onExport?.()} className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50">Exportar CSV</button>
        </div>
      </header>

      {/* Filtros */}
      <section className="bg-white/80 backdrop-blur-xl border border-emerald-100 rounded-2xl p-4 md:p-5 shadow-sm mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          <div>
            <label className="text-xs text-gray-600">Sede</label>
            <select className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-gray-900" value={filters.site} onChange={(e) => setFilters((f) => ({ ...f, site: e.target.value }))}>
              <option value="all">Todas</option>
              {sites.map((s: any) => (<option key={s.id} value={s.name}>{s.name}</option>))}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-600">Rol</label>
            <select className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-gray-900" value={filters.role} onChange={(e) => setFilters((f) => ({ ...f, role: e.target.value }))}>
              <option value="all">Todos</option>
              {roles.map((r: any) => (<option key={r} value={r}>{r}</option>))}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-600">Estado</label>
            <select className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-gray-900" value={filters.state} onChange={(e) => setFilters((f) => ({ ...f, state: e.target.value }))}>
              {(["all", "Activo", "Pausado", "Cerrado"]).map((e) => (<option key={e} value={e}>{e}</option>))}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-600">Desde</label>
            <input type="date" className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-gray-900" value={filters.from} onChange={(e) => setFilters((f) => ({ ...f, from: e.target.value }))} />
          </div>
          <div>
            <label className="text-xs text-gray-600">Hasta</label>
            <input type="date" className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-gray-900" value={filters.to} onChange={(e) => setFilters((f) => ({ ...f, to: e.target.value }))} />
          </div>
          <div className="flex items-end gap-2">
            <button onClick={() => setFilters({ site: "all", role: "all", state: "all", from: "", to: "" })} className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm hover:bg-gray-50">Limpiar</button>
          </div>
        </div>
      </section>

      {/* KPIs */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard title="Publicaciones activas" value={kpis.activePosts} subtitle={plan === "Esencial" ? "Límite 5" : plan === "Profesional" ? "Límite 20" : "Ilimitadas"} />
        <KpiCard title="Fill rate" value={`${kpis.fillRate}%`} subtitle="Últimos 30 días" />
        <KpiCard title="TTA (h)" value={kpis.tta} subtitle="Tiempo medio de cobertura" />
        <KpiCard title="No-show" value={`${kpis.noShow}%`} subtitle="Incidencias reportadas" />
      </section>

      {/* Acciones rápidas + Finanzas */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        {/* Quick actions */}
        <div className="xl:col-span-2 bg-white/80 backdrop-blur-xl border border-emerald-100 rounded-2xl p-4 md:p-5 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 mb-3">Acciones rápidas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button onClick={() => onCreatePost?.()} className="rounded-2xl bg-emerald-600 text-white font-medium px-3 py-2.5 hover:bg-emerald-700">Crear aviso</button>
            <button onClick={() => onDuplicateTemplate?.()} className="rounded-2xl border border-gray-300 bg-white px-3 py-2.5 hover:bg-gray-50">Duplicar plantilla</button>
            <button onClick={() => onPausePost?.()} className="rounded-2xl border border-gray-300 bg-white px-3 py-2.5 hover:bg-gray-50">Pausar aviso</button>
            <button onClick={() => onClosePost?.()} className="rounded-2xl border border-gray-300 bg-white px-3 py-2.5 hover:bg-gray-50">Cerrar aviso</button>
            <button onClick={() => onHotFill?.()} className="rounded-2xl border border-emerald-300 bg-emerald-50 px-3 py-2.5 text-emerald-800 hover:bg-emerald-100">Hot fill (urgente)</button>
          </div>
        </div>

        {/* Finance */}
        <div className="bg-white/80 backdrop-blur-xl border border-emerald-100 rounded-2xl p-4 md:p-5 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 mb-1">Finanzas</h3>
          <p className="text-xs text-gray-500 mb-3">{finance.month}</p>
          <div className="space-y-2">
            <FinanceRow label="En garantía" value={currency(finance.escrow)} />
            <FinanceRow label="Liberado" value={currency(finance.released)} />
            <FinanceRow label="Comisión" value={`${(finance.commissionRate * 100).toFixed(0)}%`} />
          </div>
          <div className="mt-3 text-right">
            <button onClick={() => onExport?.()} className="text-sm rounded-xl border border-gray-300 bg-white px-3 py-2 hover:bg-gray-50">Descargar comprobantes</button>
          </div>
        </div>
      </section>

      {/* Listas */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Avisos activos */}
        <div className="bg-white/80 backdrop-blur-xl border border-emerald-100 rounded-2xl p-4 md:p-5 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 mb-3">Avisos</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600">
                  <th className="py-2 pr-3">Rol</th>
                  <th className="py-2 pr-3">Sede</th>
                  <th className="py-2 pr-3">Estado</th>
                  <th className="py-2 pr-3">Postulantes</th>
                  <th className="py-2 pr-3">Creado</th>
                  <th className="py-2"></th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((p: any) => (
                  <tr key={p.id} className="border-t border-gray-100">
                    <td className="py-2 pr-3 font-medium text-gray-900">{p.role}</td>
                    <td className="py-2 pr-3">{p.site}</td>
                    <td className="py-2 pr-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${p.status === "Activo" ? "bg-emerald-100 text-emerald-800" : p.status === "Pausado" ? "bg-amber-100 text-amber-800" : "bg-gray-200 text-gray-700"}`}>{p.status}</span>
                    </td>
                    <td className="py-2 pr-3">{p.applicants}</td>
                    <td className="py-2 pr-3">{new Date(p.createdAt).toLocaleDateString("es-AR")}</td>
                    <td className="py-2 flex gap-2 justify-end">
                      <button className="rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 hover:bg-gray-50" onClick={() => onPausePost?.(p)}>Pausar</button>
                      <button className="rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 hover:bg-gray-50" onClick={() => onClosePost?.(p)}>Cerrar</button>
                    </td>
                  </tr>
                ))}
                {filteredPosts.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-gray-500">No hay avisos para los filtros seleccionados.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Próximos turnos */}
        <div className="bg-white/80 backdrop-blur-xl border border-emerald-100 rounded-2xl p-4 md:p-5 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 mb-3">Próximos turnos</h3>
          <div className="divide-y divide-gray-100">
            {upcomingShifts.map((t: any) => (
              <div key={t.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{t.role} · <span className="text-gray-600">{t.site}</span></p>
                  <p className="text-xs text-gray-600">{new Date(t.date).toLocaleDateString("es-AR")} · {t.time}</p>
                  <p className="text-xs text-gray-500">{t.worker && t.worker !== "—" ? `Asignado: ${t.worker}` : "Sin cubrir"}</p>
                </div>
                <div className="flex items-center gap-2">
                  {t.status === "Sin cubrir" && (
                    <button onClick={() => onHotFill?.(t)} className="rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-sm text-emerald-800 hover:bg-emerald-100">Hot fill</button>
                  )}
                  <span className={`px-2 py-0.5 rounded-full text-xs ${t.status === "Confirmado" ? "bg-emerald-100 text-emerald-800" : t.status === "Pendiente" ? "bg-amber-100 text-amber-800" : "bg-rose-100 text-rose-800"}`}>{t.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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

function FinanceRow({ label, value }: any) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
}
