'use client'

import { Users, ChevronRight, Plus } from 'lucide-react'
import { Badge } from '@/shared/components/ui/badge'
import { cn } from '@/shared/lib/utils'
import type { Client, ClientType } from '../../types'

interface ClientTypeHeaderProps {
  clientType: ClientType
  clients: Client[]
  expanded: boolean
  onToggle: () => void
  onAddClient?: (clientTypeId: number | null) => void
}

export function ClientTypeHeader({
  clientType,
  clients,
  expanded,
  onToggle,
  onAddClient,
}: ClientTypeHeaderProps) {
  return (
    <div className="flex w-full items-center gap-2 px-2 py-2">
      <button
        onClick={onToggle}
        className="flex flex-1 items-center gap-2 text-left hover:bg-slate-700 transition-colors rounded px-1 py-0.5 min-w-0"
      >
        <ChevronRight
          className={cn(
            'h-4 w-4 transition-transform text-slate-400 shrink-0',
            expanded && 'rotate-90',
          )}
        />
        <Users className="h-4 w-4 text-slate-300 shrink-0" />
        <span className="font-semibold text-sm truncate">{clientType.name}</span>
        <Badge
          variant="secondary"
          className="ml-1 text-xs bg-slate-600 text-slate-200 border-0 shrink-0"
        >
          {clients.length}
        </Badge>
      </button>
      {onAddClient && (
        <button
          onClick={() => onAddClient(clientType.id === -1 ? null : clientType.id)}
          className="flex items-center justify-center rounded p-1.5 text-slate-300 hover:bg-slate-600 hover:text-white transition-colors shrink-0"
          title={`Agregar cliente${clientType.id !== -1 ? ` a ${clientType.name}` : ''}`}
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  )
}
