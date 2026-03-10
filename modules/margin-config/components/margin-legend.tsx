export function MarginLegend() {
  return (
    <div className="flex items-center gap-4 text-xs text-slate-500">
      <span className="font-medium">Márgenes:</span>
      <span className="flex items-center gap-1.5">
        <span className="inline-block h-3 w-3 rounded-sm bg-red-100 border border-red-300" />
        ≤ 5% crítico
      </span>
      <span className="flex items-center gap-1.5">
        <span className="inline-block h-3 w-3 rounded-sm bg-amber-100 border border-amber-300" />
        5–10% advertencia
      </span>
      <span className="flex items-center gap-1.5">
        <span className="inline-block h-3 w-3 rounded-sm bg-emerald-100 border border-emerald-300" />
        &gt; 10% normal
      </span>
      <span className="flex items-center gap-1.5">
        <span className="inline-block h-3 w-3 rounded-sm bg-slate-100 border border-slate-200" />
        sin configurar
      </span>
    </div>
  )
}
