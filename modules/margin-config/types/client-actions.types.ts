import type { PricingStrategy } from '@/shared/types/enums'

// ── Mutation payloads ────────────────────────────────────────────────────────

export interface ClientPayloadData {
  id: number
  name: string
  clientTypeId: number
  basePrice: number | null
  pricingStrategy: string | null
}

export interface ClientMutationPayload {
  success: boolean
  message: string
  data: ClientPayloadData
}

export interface ClientTypePayloadData {
  id: number
  name: string
  basePrice: number
  pricingStrategy: string
}

export interface ClientTypeMutationPayload {
  success: boolean
  message: string
  data: ClientTypePayloadData
}

// ── Mutation result wrappers (Apollo generics) ───────────────────────────────

export interface UpdateClientResult {
  updateClient: ClientMutationPayload
}

export interface CreateClientResult {
  createClient: ClientMutationPayload
}

export interface UpdateClientTypeResult {
  updateClientType: ClientTypeMutationPayload
}

// ── Action inputs ────────────────────────────────────────────────────────────

export interface CreateClientFormData {
  name: string
  clientTypeId: number
  basePrice?: number
  pricingStrategy?: PricingStrategy
}

export interface EditClientFormData {
  id: number
  name: string
  basePrice?: number
  pricingStrategy?: PricingStrategy
}
