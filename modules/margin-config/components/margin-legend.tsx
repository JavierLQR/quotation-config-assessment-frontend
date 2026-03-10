'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

const items = [
  { color: 'bg-red-100 border-red-300', label: '≤ 5% crítico' },
  { color: 'bg-amber-100 border-amber-300', label: '5–10% advertencia' },
  { color: 'bg-emerald-100 border-emerald-300', label: '> 10% normal' },
  { color: 'bg-slate-100 border-slate-200', label: 'sin configurar' },
]

export function MarginLegend() {
  const [open, setOpen] = useState(false)

  return (
    <div className="text-xs text-slate-500">
      {/* Mobile: collapsible toggle */}
      <div className="sm:hidden">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-1 text-slate-500 hover:text-slate-700 transition-colors"
        >
          <span className="font-medium">Leyenda</span>
          <ChevronDown className={cn('h-3 w-3 transition-transform', open && 'rotate-180')} />
        </button>
        {open && (
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1.5">
            {items.map((item) => (
              <span key={item.label} className="flex items-center gap-1">
                <span className={cn('inline-block h-3 w-3 rounded-sm border', item.color)} />
                {item.label}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Desktop: always visible */}
      <div className="hidden sm:flex items-center gap-3 flex-wrap">
        <span className="font-medium">Márgenes:</span>
        {items.map((item) => (
          <span key={item.label} className="flex items-center gap-1.5">
            <span className={cn('inline-block h-3 w-3 rounded-sm border', item.color)} />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  )
}
