'use client'

import { useState } from 'react'
import { ClientTypeHeader } from './client-type-header'
import { ClientTypeMarginRow } from './client-type-margin-row'
import { ClientRow } from './client-row'
import type { PricingStrategy } from '@/shared/types/enums'
import type { Client, ClientTypeRow, MarginDraft, VolumeRange } from '../../types'

interface ClientTypeGroupProps {
  row: ClientTypeRow
  draft: MarginDraft
  disabled: boolean
  onUpdateMargin: (key: string, volumeRange: VolumeRange, value: number | null) => void
  onAddClient?: (clientTypeId: number | null) => void
  onEditClient?: (client: Client) => void
  onChangePricingStrategy?: (clientId: number, strategy: PricingStrategy) => void
}

export function ClientTypeGroup({
  row,
  draft,
  disabled,
  onUpdateMargin,
  onAddClient,
  onEditClient,
  onChangePricingStrategy,
}: ClientTypeGroupProps) {
  const [expanded, setExpanded] = useState(true)
  const { clientType, clients } = row

  return (
    <div className="border-b border-slate-200">
      <div className="bg-slate-800 text-white">
        <ClientTypeHeader
          clientType={clientType}
          clients={clients}
          expanded={expanded}
          onToggle={() => setExpanded((prev) => !prev)}
          onAddClient={onAddClient}
        />
        <ClientTypeMarginRow clientType={clientType} />
      </div>

      {expanded && (
        <div>
          {clients.length === 0 ? (
            <p className="px-4 py-4 text-sm text-slate-400 text-center italic bg-slate-50">
              No hay clientes en este tipo
            </p>
          ) : (
            clients.map((client, idx) => (
              <ClientRow
                key={client.id}
                client={client}
                clientType={clientType}
                index={idx}
                draft={draft}
                disabled={disabled}
                onUpdateMargin={onUpdateMargin}
                onEditClient={onEditClient}
                onChangePricingStrategy={onChangePricingStrategy}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}
