export const VOLUME_RANGES = [
  'KG_300',
  'KG_500',
  'T_1',
  'T_3',
  'T_5',
  'T_10',
  'T_20',
  'T_30',
] as const

export type VolumeRange = (typeof VOLUME_RANGES)[number]

export const PRICING_STRATEGY = {
  POR_ESTRUCTURA: 'POR_ESTRUCTURA',
  NO_VINCULAR: 'NO_VINCULAR',
} as const

export type PricingStrategy = keyof typeof PRICING_STRATEGY
