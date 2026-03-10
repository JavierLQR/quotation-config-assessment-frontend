export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-white py-32 text-slate-400">
      <div className="mb-4 h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center">
        <span className="text-2xl">🏭</span>
      </div>
      <p className="text-base font-medium text-slate-600 mb-1">Ninguna planta seleccionada</p>
      <p className="text-sm">
        Selecciona una planta en la barra superior para ver y editar sus márgenes
      </p>
    </div>
  )
}
