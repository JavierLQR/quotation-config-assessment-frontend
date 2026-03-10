'use client'

import { MarginCell } from '../margin-cell'
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
import type { ClientType, MarginDraft, VolumeRange } from '../../types'

interface ClientTypeMarginRowProps {
  clientType: ClientType
  draft: MarginDraft
  disabled: boolean
  onUpdateMargin: (key: string, volumeRange: VolumeRange, value: number | null) => void
  onChangeTypePricingStrategy?: (clientTypeId: number, strategy: PricingStrategy) => void
}

export function ClientTypeMarginRow({
  clientType,
  draft,
  disabled,
  onUpdateMargin,
  onChangeTypePricingStrategy,
}: ClientTypeMarginRowProps) {
  const typeKey = `type_${clientType.id}`

  return (
    <div className="flex items-center border-t border-slate-700 bg-slate-700/60 px-4 py-2 min-w-max">
      <div className="w-44 shrink-0">
        <span className="text-xs font-medium text-slate-300">Tipo: {clientType.name}</span>
      </div>
      <div className="w-28 shrink-0 text-xs text-slate-300 text-right pr-4 tabular-nums">
        {clientType.basePrice.toLocaleString('en-US', { minimumFractionDigits: 0 })}
        <span className="text-[10px] text-slate-500 ml-0.5">USD</span>
      </div>
      <div className="w-36 shrink-0 pr-4">
        {onChangeTypePricingStrategy ? (
          <Select
            value={clientType.pricingStrategy}
            onValueChange={(val) =>
              onChangeTypePricingStrategy(clientType.id, val as PricingStrategy)
            }
            disabled={disabled}
          >
            <SelectTrigger className="h-7 text-xs border-slate-500 bg-slate-600 text-slate-200 w-full">
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
          <span className="text-xs text-slate-400">
            {PRICING_STRATEGY_LABELS[clientType.pricingStrategy]}
          </span>
        )}
      </div>
      {VOLUME_RANGES.map((vr) => (
        <div key={vr} className="w-20 shrink-0 flex justify-center">
          <MarginCell
            value={draft[typeKey]?.[vr] ?? null}
            onChange={(val) => onUpdateMargin(typeKey, vr, val)}
            disabled={disabled}
          />
        </div>
      ))}
    </div>
  )
}
