import { VOLUME_RANGES } from '@/shared/types/enums'
import { VOLUME_LABELS } from '@/shared/constants/volume-ranges'

export function TableHeader() {
  return (
    <div className="flex items-center px-4 py-2 min-w-max">
      <div className="w-44 shrink-0 text-xs font-semibold uppercase tracking-wider text-slate-500 pl-6">
        Cliente / Tipo
      </div>
      <div className="w-28 shrink-0 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right pr-4">
        Precio base
      </div>
      <div className="w-36 shrink-0 text-xs font-semibold uppercase tracking-wider text-slate-500 pr-4">
        Vinculación
      </div>
      {VOLUME_RANGES.map((vr) => (
        <div
          key={vr}
          className="w-20 shrink-0 text-center text-xs font-semibold uppercase tracking-wider text-slate-500"
        >
          {VOLUME_LABELS[vr]}
        </div>
      ))}
    </div>
  )
}
