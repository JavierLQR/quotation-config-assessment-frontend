import type { PricingStrategy } from '@/shared/types/enums'

// ── Mutation payloads ────────────────────────────────────────────────────────

export interface ClientPayloadData {
  id: number
  name: string
  clientTypeId: number | null
  basePrice: number | null
  pricingStrategy: string | null
}

export interface ClientMutationPayload {
  success: boolean
  message: string
  data: ClientPayloadData
}

// ── Mutation result wrappers (Apollo generics) ───────────────────────────────

export interface UpdateClientResult {
  updateClient: ClientMutationPayload
}

export interface CreateClientResult {
  createClient: ClientMutationPayload
}

// ── Action inputs ────────────────────────────────────────────────────────────

export interface CreateClientFormData {
  name: string
  clientTypeId?: number | null
  basePrice?: number
  pricingStrategy?: PricingStrategy
}

export interface EditClientFormData {
  id: number
  name: string
  clientTypeId?: number | null
  basePrice?: number
  pricingStrategy?: PricingStrategy
}
