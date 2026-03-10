import { VOLUME_RANGES } from '@/shared/types/enums'
import { VOLUME_LABELS } from '@/shared/constants/volume-ranges'

export function TableHeader() {
  return (
    <div className="flex items-center bg-slate-50 border-b border-slate-200">
      <div className="sticky left-0 z-10 w-44 shrink-0 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500 pl-10 border-r border-slate-200">
        Cliente / Tipo
      </div>
      <div className="w-28 shrink-0 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right pr-4 py-2">
        Precio
      </div>
      <div className="w-36 shrink-0 text-xs font-semibold uppercase tracking-wider text-slate-500 pr-4 py-2">
        Vinculación
      </div>
      {VOLUME_RANGES.map((vr) => (
        <div
          key={vr}
          className="w-20 shrink-0 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 py-2"
        >
          {VOLUME_LABELS[vr]}
        </div>
      ))}
    </div>
  )
}
