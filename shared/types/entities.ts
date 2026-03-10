import type { PricingStrategy, VolumeRange } from './enums'

export interface Plant {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}

export interface ClientType {
  id: number
  name: string
  basePrice: number
  pricingStrategy: PricingStrategy
  createdAt: string
  updatedAt: string
}

export interface Client {
  id: number
  name: string
  clientTypeId: number | null
  basePrice: number | null
  pricingStrategy: PricingStrategy | null
  createdAt: string
  updatedAt: string
}

export interface MarginConfig {
  id: number
  plantId: number
  clientTypeId: number | null
  clientId: number | null
  volumeRange: VolumeRange
  margin: number
  createdAt: string
  updatedAt: string
}
