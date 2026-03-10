'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client/react'
import { GET_PLANTS } from '@/modules/plants/graphql/queries'
import { GET_CLIENT_TYPES } from '@/modules/client-types/graphql/queries'
import { GET_ALL_CLIENTS } from '@/modules/clients/graphql/queries'
import { GET_MARGINS_BY_PLANT } from '../graphql/queries'
import { useMarginDraft } from './use-margin-draft'
import { useSaveMargin } from './use-save-margin'
import type {
  Plant,
  ClientType,
  Client,
  MarginConfig,
} from '@/shared/types/entities'
import type { ClientTypeRow, VolumeRange } from '../types'

const UNASSIGNED_CLIENT_TYPE: ClientType = {
  id: -1,
  name: 'Sin tipo de cliente',
  basePrice: 0,
  pricingStrategy: 'POR_ESTRUCTURA',
  createdAt: '',
  updatedAt: '',
}

export function useMarginConfig() {
  const [userSelectedPlantId, setUserSelectedPlantId] = useState<number | null>(null)

  const { data: plantsData, loading: plantsLoading } = useQuery<{
    plants: { data: Plant[] }
  }>(GET_PLANTS)

  const { data: clientTypesData, loading: clientTypesLoading } = useQuery<{
    clientTypes: { data: ClientType[] }
  }>(GET_CLIENT_TYPES)

  const { data: clientsData, loading: clientsLoading } = useQuery<{
    clients: { data: Client[] }
  }>(GET_ALL_CLIENTS)

  const [fetchMargins, { data: marginsData, loading: marginsLoading }] =
    useLazyQuery<{ marginsByPlant: { data: MarginConfig[] } }>(
      GET_MARGINS_BY_PLANT,
    )

  const plants = useMemo<Plant[]>(
    () => plantsData?.plants?.data ?? [],
    [plantsData],
  )
  const clientTypes = useMemo<ClientType[]>(
    () => clientTypesData?.clientTypes?.data ?? [],
    [clientTypesData],
  )
  const allClients = useMemo<Client[]>(
    () => clientsData?.clients?.data ?? [],
    [clientsData],
  )
  const margins = useMemo<MarginConfig[]>(
    () => marginsData?.marginsByPlant?.data ?? [],
    [marginsData],
  )

  const selectedPlantId = userSelectedPlantId ?? plants[0]?.id ?? null

  const clientTypeRows = useMemo<ClientTypeRow[]>(() => {
    const clientTypeIds = new Set(clientTypes.map((ct) => ct.id))

    const rows: ClientTypeRow[] = clientTypes.map((ct) => ({
      clientType: ct,
      clients: allClients.filter((c) => c.clientTypeId === ct.id),
    }))

    const unassigned = allClients.filter(
      (c) => !clientTypeIds.has(c.clientTypeId),
    )

    if (unassigned.length > 0) {
      rows.push({
        clientType: UNASSIGNED_CLIENT_TYPE,
        clients: unassigned,
      })
    }

    return rows
  }, [clientTypes, allClients])

  const { draft, updateMargin, resetDraft, hasChanges } =
    useMarginDraft(margins)
  const { saveStatus, saveMessage, save, resetStatus } =
    useSaveMargin(selectedPlantId)

  useEffect(() => {
    if (!selectedPlantId) return
    void fetchMargins({ variables: { plantId: selectedPlantId } })
  }, [selectedPlantId, fetchMargins])

  const selectPlant = useCallback(
    (plantId: number) => {
      setUserSelectedPlantId(plantId)
      resetDraft()
      resetStatus()
    },
    [resetDraft, resetStatus],
  )

  const handleUpdateMargin = useCallback(
    (key: string, volumeRange: VolumeRange, value: number | null) => {
      updateMargin(key, volumeRange, value)
      resetStatus()
    },
    [updateMargin, resetStatus],
  )

  const handleSave = useCallback(() => save(draft), [save, draft])

  return {
    plants,
    clientTypeRows,
    draft,
    selectedPlantId,
    isLoading: plantsLoading || clientTypesLoading || clientsLoading,
    marginsLoading,
    saveStatus,
    saveMessage,
    hasChanges,
    selectPlant,
    updateMargin: handleUpdateMargin,
    save: handleSave,
  }
}
