import { AlertTriangle, Info } from 'lucide-react'
import { Badge } from '@/shared/components/ui/badge'
import { MarginLegend } from '@/modules/margin-config/components/margin-legend'
import type { ClientTypeRow } from '@/modules/margin-config/types'
import type { Plant } from '@/shared/types/entities'

interface ContextBarProps {
  selectedPlant: Plant | undefined
  clientTypeRows: ClientTypeRow[]
  hasChanges: boolean
}

export function ContextBar({ selectedPlant, clientTypeRows, hasChanges }: ContextBarProps) {
  const totalClients = clientTypeRows.reduce((acc, r) => acc + r.clients.length, 0)

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        {selectedPlant ? (
          <>
            <h2 className="text-base font-semibold text-slate-800">{selectedPlant.name}</h2>
            <Badge variant="secondary">
              {clientTypeRows.length} tipo{clientTypeRows.length !== 1 ? 's' : ''}
            </Badge>
            <Badge variant="secondary">{totalClients} clientes</Badge>
            {hasChanges && (
              <Badge variant="warning" className="gap-1">
                <AlertTriangle className="h-3 w-3" />
                <span className="hidden xs:inline">Cambios sin guardar</span>
                <span className="xs:hidden">Sin guardar</span>
              </Badge>
            )}
          </>
        ) : (
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <Info className="h-4 w-4" />
            Selecciona una planta para comenzar
          </div>
        )}
      </div>
      <MarginLegend />
    </div>
  )
}
