'use client'

import { useCallback, useMemo, useState } from 'react'
import type { MarginConfig } from '@/shared/types/entities'
import type { VolumeRange } from '@/shared/types/enums'
import type { MarginDraft } from '../types'

function buildDraftFromMargins(margins: MarginConfig[]): MarginDraft {
  return margins.reduce<MarginDraft>((acc, margin) => {
    const key = margin.clientId
      ? `client_${margin.clientId}`
      : `type_${margin.clientTypeId}`

    return {
      ...acc,
      [key]: { ...acc[key], [margin.volumeRange]: margin.margin },
    }
  }, {})
}

function marginsToKey(margins: MarginConfig[]): string {
  return margins.map((m) => `${m.id}:${m.margin}`).join(',')
}

export function useMarginDraft(margins: MarginConfig[]) {
  const [userEdits, setUserEdits] = useState<MarginDraft>({})
  const [lastMarginsKey, setLastMarginsKey] = useState('')

  const currentKey = marginsToKey(margins)

  const serverDraft = useMemo(() => {
    if (margins.length === 0) return {}
    return buildDraftFromMargins(margins)
  }, [margins])

  if (currentKey !== lastMarginsKey) {
    setLastMarginsKey(currentKey)
    if (Object.keys(userEdits).length > 0) {
      setUserEdits({})
    }
  }

  const draft = useMemo(() => {
    const merged = { ...serverDraft }
    for (const [key, volumeMap] of Object.entries(userEdits)) {
      merged[key] = { ...merged[key], ...volumeMap }
    }
    return merged
  }, [serverDraft, userEdits])

  const updateMargin = useCallback(
    (key: string, volumeRange: VolumeRange, value: number | null) => {
      setUserEdits((prev) => ({
        ...prev,
        [key]: { ...prev[key], [volumeRange]: value },
      }))
    },
    [],
  )

  const resetDraft = useCallback(() => {
    setUserEdits({})
    setLastMarginsKey('')
  }, [])

  return {
    draft,
    userEdits,
    updateMargin,
    resetDraft,
    hasChanges: Object.keys(userEdits).length > 0,
  }
}
