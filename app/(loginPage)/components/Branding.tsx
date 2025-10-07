const Branding = () => {
  return (
      <div className="relative flex items-center justify-center p-8 md:p-12 order-1 md:order-none">
        <div className="max-w-lg w-full flex flex-col items-center md:items-start">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 rounded-2xl bg-emerald-600 flex items-center justify-center text-white font-bold text-2xl shadow-sm">M</div>
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">Manito</h1>
              <p className="text-sm md:text-base text-gray-600">Registrate para empezar a publicar avisos o tomar turnos.</p>
            </div>
          </div>
          <div className="w-full rounded-3xl border border-emerald-100 bg-white/60 backdrop-blur-sm p-6 shadow-sm hidden sm:block">
            <ul className="text-gray-700 text-sm space-y-2">
              <li>• Empleadores: gestionen publicaciones y pagos.</li>
              <li>• Trabajadores: encontrá turnos cerca y cobrales rápido.</li>
              <li>• Seguridad: pagos en garantía y calificaciones mutuas.</li>
            </ul>
          </div>
        </div>
      </div>
  )
}

export default Branding;
