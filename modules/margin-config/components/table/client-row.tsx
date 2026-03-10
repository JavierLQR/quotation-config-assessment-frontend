'use client'

import { Pencil } from 'lucide-react'
import { MarginCell } from '../margin-cell'
import { cn } from '@/shared/lib/utils'
import { VOLUME_RANGES } from '@/shared/types/enums'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/shared/components/ui/select'
import { PRICING_STRATEGY_LABELS } from '@/shared/constants/pricing-strategy'
import type { PricingStrategy } from '@/shared/types/enums'
import type { Client, ClientType, MarginDraft, VolumeRange } from '../../types'

interface ClientRowProps {
  client: Client
  clientType: ClientType
  index: number
  draft: MarginDraft
  disabled: boolean
  onUpdateMargin: (
    key: string,
    volumeRange: VolumeRange,
    value: number | null,
  ) => void
  onEditClient?: (client: Client) => void
  onChangePricingStrategy?: (
    clientId: number,
    strategy: PricingStrategy,
  ) => void
}

export function ClientRow({
  client,
  clientType,
  index,
  draft,
  disabled,
  onUpdateMargin,
  onEditClient,
  onChangePricingStrategy,
}: ClientRowProps) {
  const clientKey = `client_${client.id}`
  const isEven = index % 2 === 0

  const effectiveBasePrice =
    client.basePrice ?? (clientType.id !== -1 ? clientType.basePrice : null)

  const effectiveStrategy =
    client.pricingStrategy ??
    (clientType.id !== -1 ? clientType.pricingStrategy : 'POR_ESTRUCTURA')

  const rowBg = isEven ? 'bg-white' : 'bg-slate-50/50'

  return (
    <div
      className={cn(
        'flex items-center border-t border-slate-100 hover:bg-blue-50/30 transition-colors',
        rowBg,
      )}
    >
      {/* Sticky name column */}
      <div
        className={cn(
          'sticky left-0 z-10 w-44 shrink-0 px-4 py-2.5 flex items-center gap-1.5 border-r border-slate-100',
          rowBg,
        )}
      >
        <span className="text-sm text-slate-700 font-medium truncate flex-1">
          {client.name}
        </span>
        {onEditClient && (
          <button
            onClick={() => onEditClient(client)}
            className="p-0.5 rounded hover:bg-slate-200 text-slate-300 hover:text-slate-600 transition-colors shrink-0"
            title="Editar cliente"
          >
            <Pencil className="h-3 w-3" />
          </button>
        )}
      </div>
      <div className="w-28 shrink-0 text-sm text-slate-600 text-right pr-4 py-2.5 tabular-nums">
        {effectiveBasePrice !== null ? (
          <>
            {effectiveBasePrice.toLocaleString('en-US', {
              minimumFractionDigits: 0,
            })}
            <span className="text-[10px] text-slate-400 ml-0.5">USD</span>
          </>
        ) : (
          <span className="text-slate-300">—</span>
        )}
      </div>
      <div className="w-36 shrink-0 pr-4 py-2.5">
        {onChangePricingStrategy ? (
          <Select
            value={effectiveStrategy}
            onValueChange={(val) =>
              onChangePricingStrategy(client.id, val as PricingStrategy)
            }
            disabled={disabled}
          >
            <SelectTrigger className="h-7 text-xs border-slate-200 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(PRICING_STRATEGY_LABELS).map(([key, label]) => (
                <SelectItem key={key} value={key} className="text-xs">
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <span className="text-xs text-slate-500">
            {PRICING_STRATEGY_LABELS[effectiveStrategy]}
          </span>
        )}
      </div>
      {VOLUME_RANGES.map((vr) => (
        <div key={vr} className="w-20 shrink-0 flex justify-center py-1.5">
          <MarginCell
            value={draft[clientKey]?.[vr] ?? null}
            onChange={(val) => onUpdateMargin(clientKey, vr, val)}
            disabled={disabled}
          />
        </div>
      ))}
    </div>
  )
}
