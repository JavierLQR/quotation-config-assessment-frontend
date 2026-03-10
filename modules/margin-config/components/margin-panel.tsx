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
  onAddClient?: (clientTypeId: number) => void
  onEditClient?: (client: Client) => void
  onChangePricingStrategy?: (clientId: number, strategy: PricingStrategy) => void
  onChangeTypePricingStrategy?: (clientTypeId: number, strategy: PricingStrategy) => void
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
  onChangeTypePricingStrategy,
}: MarginPanelProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-700">
          Márgenes por tipo de cliente y volumen
        </h3>
        <p className="text-xs text-slate-400">
          Haz clic en una celda para editar · Enter para confirmar · Esc para cancelar
        </p>
      </div>
      <div className="p-4">
        <MarginTable
          clientTypeRows={clientTypeRows}
          draft={draft}
          loading={loading}
          disabled={disabled}
          onUpdateMargin={onUpdateMargin}
          onAddClient={onAddClient}
          onEditClient={onEditClient}
          onChangePricingStrategy={onChangePricingStrategy}
          onChangeTypePricingStrategy={onChangeTypePricingStrategy}
        />
      </div>
    </div>
  )
}
