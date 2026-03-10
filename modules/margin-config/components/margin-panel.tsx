'use client'

import { MarginTable } from './table/margin-table'
import type { PricingStrategy } from '@/shared/types/enums'
import type { Client, ClientTypeRow, MarginDraft, VolumeRange } from '@/modules/margin-config/types'

interface MarginPanelProps {
  clientTypeRows: ClientTypeRow[]
  draft: MarginDraft
  loading: boolean
  disabled: boolean
  onUpdateMargin: (key: string, volumeRange: VolumeRange, value: number | null) => void
  onAddClient?: (clientTypeId: number | null) => void
  onEditClient?: (client: Client) => void
  onChangePricingStrategy?: (clientId: number, strategy: PricingStrategy) => void
}

export function MarginPanel({
  clientTypeRows,
  draft,
  loading,
  disabled,
  onUpdateMargin,
  onAddClient,
  onEditClient,
  onChangePricingStrategy,
}: MarginPanelProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-slate-100 flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-slate-700 shrink-0">
          Márgenes por volumen
        </h3>
        <p className="hidden md:block text-xs text-slate-400 text-right">
          Clic en celda para editar · Enter confirmar · Esc cancelar
        </p>
      </div>
      <div className="p-2 sm:p-4">
        <MarginTable
          clientTypeRows={clientTypeRows}
          draft={draft}
          loading={loading}
          disabled={disabled}
          onUpdateMargin={onUpdateMargin}
          onAddClient={onAddClient}
          onEditClient={onEditClient}
          onChangePricingStrategy={onChangePricingStrategy}
        />
      </div>
    </div>
  )
}
