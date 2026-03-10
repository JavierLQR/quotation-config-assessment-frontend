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
  onAddClient?: (clientTypeId: number) => void
}

export function ClientTypeHeader({
  clientType,
  clients,
  expanded,
  onToggle,
  onAddClient,
}: ClientTypeHeaderProps) {
  return (
    <div className="flex w-full items-center gap-2 px-4 py-2">
      <button
        onClick={onToggle}
        className="flex flex-1 items-center gap-2 text-left hover:bg-slate-700 transition-colors rounded px-1 py-0.5"
      >
        <ChevronRight
          className={cn(
            'h-4 w-4 transition-transform text-slate-400',
            expanded && 'rotate-90',
          )}
        />
        <Users className="h-4 w-4 text-slate-300" />
        <span className="font-semibold text-sm">{clientType.name}</span>
        <Badge
          variant="secondary"
          className="ml-1 text-xs bg-slate-600 text-slate-200 border-0"
        >
          {clients.length} cliente{clients.length !== 1 ? 's' : ''}
        </Badge>
      </button>
      {onAddClient && (
        <button
          onClick={() => onAddClient(clientType.id)}
          className="flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-slate-300 hover:bg-slate-600 hover:text-white transition-colors"
          title={`Agregar cliente a ${clientType.name}`}
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  )
}
