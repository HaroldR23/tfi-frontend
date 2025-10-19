import React, { useMemo } from "react";

/**
 * Manito · Dashboard (versión simplificada)
 * Cambios pedidos por el usuario:
 * - Quitar el "buscador" (filtros superiores: sede/rol/estado/fechas/limpiar).
 * - Quitar el KPI de "Fill rate".
 * - Quitar el bloque de "Acciones rápidas".
 * - En Finanzas mostrar SOLO el mes y el "Total pagado".
 *
 * Notas:
 * - Mock de datos para previsualización.
 * - TailwindCSS para estilos.
 */

export default function NegociosDashboard() {
  // Mocks para la vista
  const mesActual = "Septiembre 2025";
  const totalPagado = 378000; // ARS

  const publicacionesActivas = 7;
  const limitePublicaciones = 20;

  const ttaPromedio = 1.8; // horas
  const noShow = 3.2; // %

  const avisos = [
    { rol: "Mozo/a", sede: "Sucursal Centro", estado: "Activo", postulantes: 12, creado: "9/9/2025" },
    { rol: "Cocina", sede: "Sucursal Norte", estado: "Activo", postulantes: 7, creado: "11/9/2025" },
    { rol: "Cajero/a", sede: "Sucursal Centro", estado: "Pausado", postulantes: 3, creado: "6/9/2025" },
    { rol: "Delivery", sede: "Sucursal Oeste", estado: "Activo", postulantes: 6, creado: "13/9/2025" },
  ];

  const proximosTurnos = [
    {
      rol: "Mozo/a",
      sede: "Sucursal Centro",
      fecha: "21/9/2025",
      hora: "18:00–23:00",
      asignado: "M. López",
      estado: "Confirmado",
    },
    {
      rol: "Cocina",
      sede: "Sucursal Norte",
      fecha: "21/9/2025",
      hora: "12:00–16:00",
      asignado: "S. Gómez",
      estado: "Pendiente",
    },
    {
      rol: "Cajero/a",
      sede: "Sucursal Oeste",
      fecha: "22/9/2025",
      hora: "09:00–13:00",
      asignado: null,
      estado: "Sin cubrir",
    },
  ];

  const currency = useMemo(
    () => new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }),
    []
  );

  return (
    <div className="min-h-screen w-full bg-white text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-emerald-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-emerald-600 text-white grid place-items-center font-bold">M</div>
            <div>
              <h1 className="text-xl font-semibold">Dashboard · casa</h1>
              <p className="text-xs text-slate-500">Resumen operativo y financiero</p>
            </div>
          </div>
          <span className="rounded-full bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 text-xs font-medium">
            Plan Profesional
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* KPIs Superiores (sin buscador / sin fill rate / sin acciones rápidas) */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Publicaciones activas */}
          <KpiCard title="Publicaciones activas">
            <div className="text-2xl font-semibold">{publicacionesActivas}</div>
            <div className="text-xs text-slate-500">Límite {limitePublicaciones}</div>
          </KpiCard>

          {/* TTA promedio */}
          <KpiCard title="TTA (h)" subtitle="Tiempo medio de cobertura">
            <div className="text-2xl font-semibold">{ttaPromedio}</div>
          </KpiCard>

          {/* No-show */}
          <KpiCard title="No-show" subtitle="Incidencias reportadas">
            <div className="text-2xl font-semibold">{noShow}%</div>
          </KpiCard>

          {/* Finanzas (solo mes y total pagado) */}
          <div className="rounded-2xl border border-emerald-100 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-slate-700">Finanzas</h3>
                <p className="text-xs text-slate-500">{mesActual}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs text-slate-500 mb-1">Total pagado</p>
              <p className="text-2xl font-semibold">{currency.format(totalPagado)}</p>
            </div>
          </div>
        </section>

        {/* Contenido inferior */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Avisos */}
          <div className="lg:col-span-2 rounded-2xl border border-emerald-100 bg-white">
            <div className="px-5 py-4 border-b border-emerald-100 flex items-center justify-between">
              <h3 className="text-sm font-medium text-slate-700">Avisos</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="text-left text-slate-500">
                  <tr>
                    <th className="px-5 py-3">Rol</th>
                    <th className="px-5 py-3">Sede</th>
                    <th className="px-5 py-3">Estado</th>
                    <th className="px-5 py-3">Postulantes</th>
                    <th className="px-5 py-3">Creado</th>
                  </tr>
                </thead>
                <tbody>
                  {avisos.map((a, i) => (
                    <tr key={i} className="border-t border-emerald-50 hover:bg-emerald-50/50">
                      <td className="px-5 py-3 font-medium">{a.rol}</td>
                      <td className="px-5 py-3">{a.sede}</td>
                      <td className="px-5 py-3">
                        <EstadoPill estado={a.estado} />
                      </td>
                      <td className="px-5 py-3">{a.postulantes}</td>
                      <td className="px-5 py-3">{a.creado}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Próximos turnos */}
          <div className="rounded-2xl border border-emerald-100 bg-white">
            <div className="px-5 py-4 border-b border-emerald-100 flex items-center justify-between">
              <h3 className="text-sm font-medium text-slate-700">Próximos turnos</h3>
            </div>
            <ul className="divide-y divide-emerald-50">
              {proximosTurnos.map((t, i) => (
                <li key={i} className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-slate-800">
                        {t.rol} · <span className="text-slate-600">{t.sede}</span>
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {t.fecha} · {t.hora}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {t.asignado ? `Asignado: ${t.asignado}` : "Sin cubrir"}
                      </p>
                    </div>
                    <EstadoTurnoPill estado={t.estado} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

function KpiCard({ title, subtitle, children }) {
  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-4">
      <h3 className="text-sm font-medium text-slate-700">{title}</h3>
      {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
      <div className="mt-2">{children}</div>
    </div>
  );
}

function EstadoPill({ estado }) {
  const styles = {
    "Activo": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Pausado": "bg-amber-50 text-amber-700 border-amber-200",
    "Cerrado": "bg-slate-100 text-slate-700 border-slate-200",
  };
  const cls = styles[estado] || styles["Cerrado"];
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${cls}`}>
      {estado}
    </span>
  );
}

function EstadoTurnoPill({ estado }) {
  const styles = {
    "Confirmado": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Pendiente": "bg-amber-50 text-amber-700 border-amber-200",
    "Sin cubrir": "bg-rose-50 text-rose-700 border-rose-200",
  };
  const cls = styles[estado] || styles["Pendiente"];
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${cls}`}>
      {estado}
    </span>
  );
}
