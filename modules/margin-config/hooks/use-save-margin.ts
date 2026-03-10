'use client'

import { useCallback, useState } from 'react'
import { useMutation, useLazyQuery } from '@apollo/client/react'
import { SAVE_PLANT_CONFIG } from '../graphql/mutations'
import { GET_MARGINS_BY_PLANT } from '../graphql/queries'
import type { VolumeRange } from '@/shared/types/enums'
import type { MarginConfig } from '@/shared/types/entities'
import type {
  MarginDraft,
  MarginEntry,
  SavePlantConfigInput,
  SavePlantConfigPayload,
  SaveStatus,
} from '../types'

function parseMarginKey(key: string): Pick<MarginEntry, 'clientTypeId' | 'clientId'> {
  const [prefix, rawId] = key.split('_') as [string, string]
  const id = parseInt(rawId, 10)
  return prefix === 'type' ? { clientTypeId: id } : { clientId: id }
}

function buildMarginEntries(draft: MarginDraft): MarginEntry[] {
  return Object.entries(draft).flatMap(([key, volumeMap]) =>
    Object.entries(volumeMap)
      .filter((entry): entry is [string, number] => entry[1] != null)
      .map(([vr, margin]) => ({
        ...parseMarginKey(key),
        volumeRange: vr as VolumeRange,
        margin,
      })),
  )
}

export function useSaveMargin(plantId: number | null) {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const [saveMessage, setSaveMessage] = useState('')

  const [savePlantConfig] = useMutation<SavePlantConfigPayload>(SAVE_PLANT_CONFIG)
  const [fetchMargins] = useLazyQuery<{ marginsByPlant: { data: MarginConfig[] } }>(
    GET_MARGINS_BY_PLANT,
  )

  const save = useCallback(
    async (draft: MarginDraft) => {
      if (!plantId) return
      setSaveStatus('saving')

      const input: SavePlantConfigInput = {
        plantId,
        margins: buildMarginEntries(draft),
      }

      try {
        const { data } = await savePlantConfig({ variables: { input } })
        const payload = data?.savePlantConfig

        if (!payload?.success) {
          setSaveStatus('error')
          setSaveMessage(payload?.message ?? 'Error al guardar')
          return
        }

        setSaveStatus('success')
        setSaveMessage(`${payload.data} márgenes guardados`)
        await fetchMargins({ variables: { plantId } })
      } catch (err) {
        setSaveStatus('error')
        setSaveMessage(err instanceof Error ? err.message : 'Error desconocido')
      }
    },
    [plantId, savePlantConfig, fetchMargins],
  )

  const resetStatus = useCallback(() => setSaveStatus('idle'), [])

  return { saveStatus, saveMessage, save, resetStatus }
}
