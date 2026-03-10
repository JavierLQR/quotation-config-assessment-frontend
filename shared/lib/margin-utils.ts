import { LOW_MARGIN_THRESHOLD, WARN_MARGIN_THRESHOLD } from '@/shared/constants/margin-thresholds'

export function getMarginColorClass(value: number | null | undefined): string {
  if (value == null) return ''
  if (value <= LOW_MARGIN_THRESHOLD)
    return 'bg-red-50 text-red-700 border-red-300 focus:ring-red-400'
  if (value <= WARN_MARGIN_THRESHOLD)
    return 'bg-amber-50 text-amber-700 border-amber-300 focus:ring-amber-400'
  return 'bg-emerald-50 text-emerald-700 border-emerald-300 focus:ring-emerald-400'
}

export function isCriticalMargin(value: number | null | undefined): boolean {
  return value != null && value <= LOW_MARGIN_THRESHOLD
}

export function formatMarginDisplay(value: number | null | undefined): string {
  return value != null ? `${value}%` : '—'
}
