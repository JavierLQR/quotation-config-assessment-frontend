'use client'

import type { ClientType } from '../../types'

interface ClientTypeMarginRowProps {
  clientType: ClientType
}

export function ClientTypeMarginRow({ clientType }: ClientTypeMarginRowProps) {
  return (
    <div className="flex items-center border-t border-slate-700 bg-slate-700/60">
      {/* Sticky name column - only shows the client type name */}
      <div className="sticky left-0 z-10 w-44 shrink-0 bg-slate-700 px-4 py-2 border-r border-slate-600">
        <span className="text-xs font-medium text-slate-300 truncate block">
          {clientType.name}
        </span>
      </div>
      {/* Empty space for alignment with client rows */}
      <div className="flex-1" />
    </div>
  )
}
