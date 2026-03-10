import type { VolumeRange } from '@/shared/types/enums'
import type { Client, ClientType } from '@/shared/types/entities'

export type { VolumeRange } from '@/shared/types/enums'
export type {
  Client,
  ClientType,
  Plant,
  MarginConfig,
} from '@/shared/types/entities'

export type MarginKey = `type_${number}` | `client_${number}`
export type MarginMap = Record<VolumeRange, number | null>
export type MarginDraft = Record<string, Partial<MarginMap>>

export interface ClientTypeRow {
  clientType: ClientType
  clients: Client[]
}

export interface MarginEntry {
  clientTypeId?: number
  clientId?: number
  volumeRange: VolumeRange
  margin: number
}

export interface SavePlantConfigInput {
  plantId: number
  margins: MarginEntry[]
}

export type SaveStatus = 'idle' | 'saving' | 'success' | 'error'

export interface SavePlantConfigPayload {
  savePlantConfig: {
    success: boolean
    message: string
    status: string
    data: number
  }
}
