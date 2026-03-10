'use client'

import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import { useMutation } from '@apollo/client/react'
import { SAVE_PLANT_CONFIG } from '../graphql/mutations'
import { GET_MARGINS_BY_PLANT } from '../graphql/queries'
import type { VolumeRange } from '@/shared/types/enums'
import type {
  MarginDraft,
  MarginEntry,
  SavePlantConfigInput,
  SavePlantConfigPayload,
  SaveStatus,
} from '../types'

function parseMarginKey(
  key: string,
): Pick<MarginEntry, 'clientTypeId' | 'clientId'> {
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

export function useSaveMargin(
  plantId: number | null | undefined,
  onRefetch: () => Promise<void>,
) {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')

  const [savePlantConfig] = useMutation<SavePlantConfigPayload>(
    SAVE_PLANT_CONFIG,
    {
      refetchQueries: [
        {
          query: GET_MARGINS_BY_PLANT,
          variables: { plantId },
        },
      ],
      awaitRefetchQueries: true,
    },
  )

  const save = useCallback(
    async (userEdits: MarginDraft): Promise<void> => {
      if (!plantId) return
      setSaveStatus('saving')

      const margins = buildMarginEntries(userEdits)

      const input: SavePlantConfigInput = {
        plantId,
        margins,
      }

      try {
        const { data } = await savePlantConfig({ variables: { input } })
        const payload = data?.savePlantConfig

        if (!payload?.success) {
          setSaveStatus('error')
          toast.error('Error al guardar', {
            description: payload?.message ?? 'Intenta nuevamente',
          })
          return
        }

        await onRefetch()

        setSaveStatus('success')
        toast.success('Cambios guardados')
      } catch (err) {
        setSaveStatus('error')
        toast.error('Error al guardar', {
          description: err instanceof Error ? err.message : 'Error desconocido',
        })
      }
    },
    [plantId, savePlantConfig, onRefetch],
  )

  const resetStatus = useCallback(() => setSaveStatus('idle'), [])

  return { saveStatus, save, resetStatus }
}
