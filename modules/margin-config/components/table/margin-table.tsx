'use client'

import { useState, useMemo } from 'react'
import { Users, Filter } from 'lucide-react'
import { TableSkeleton } from './table-skeleton'
import { TableHeader } from './table-header'
import { ClientTypeGroup } from './client-type-group'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/shared/components/ui/select'
import type { PricingStrategy } from '@/shared/types/enums'
import type { Client, ClientTypeRow, MarginDraft, VolumeRange } from '../../types'

interface MarginTableProps {
  clientTypeRows: ClientTypeRow[]
  draft: MarginDraft
  loading: boolean
  disabled: boolean
  onUpdateMargin: (key: string, volumeRange: VolumeRange, value: number | null) => void
  onAddClient?: (clientTypeId: number) => void
  onEditClient?: (client: Client) => void
  onChangePricingStrategy?: (clientId: number, strategy: PricingStrategy) => void
  onChangeTypePricingStrategy?: (clientTypeId: number, strategy: PricingStrategy) => void
}

export function MarginTable({
  clientTypeRows,
  draft,
  loading,
  disabled,
  onUpdateMargin,
  onAddClient,
  onEditClient,
  onChangePricingStrategy,
  onChangeTypePricingStrategy,
}: MarginTableProps) {
  const [filterTypeId, setFilterTypeId] = useState<string>('all')

  const filteredRows = useMemo(() => {
    if (filterTypeId === 'all') return clientTypeRows
    return clientTypeRows.filter((r) => r.clientType.id === Number(filterTypeId))
  }, [clientTypeRows, filterTypeId])

  if (loading) return <TableSkeleton />

  if (clientTypeRows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 py-20 text-slate-400">
        <Users className="h-10 w-10 mb-3 opacity-40" />
        <p className="text-sm">No hay tipos de clientes configurados</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-slate-400" />
        <span className="text-xs font-medium text-slate-500">Filtrar por tipo:</span>
        <Select value={filterTypeId} onValueChange={setFilterTypeId}>
          <SelectTrigger className="h-8 w-52 text-xs">
            <SelectValue placeholder="Todos los tipos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-xs">Todos los tipos</SelectItem>
            {clientTypeRows.map((r) => (
              <SelectItem key={r.clientType.id} value={String(r.clientType.id)} className="text-xs">
                {r.clientType.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1 overflow-x-auto pb-2">
        <TableHeader />
        {filteredRows.map((row) => (
          <ClientTypeGroup
            key={row.clientType.id}
            row={row}
            draft={draft}
            disabled={disabled}
            onUpdateMargin={onUpdateMargin}
            onAddClient={onAddClient}
            onEditClient={onEditClient}
            onChangePricingStrategy={onChangePricingStrategy}
            onChangeTypePricingStrategy={onChangeTypePricingStrategy}
          />
        ))}
      </div>
    </div>
  )
}
