'use client'

import { Loader2, Save } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import type { SaveStatus } from '../../types'

interface SaveToolbarProps {
  saveStatus: SaveStatus
  hasChanges: boolean
  selectedPlantId: number | null
  onSave: () => Promise<void>
}

export function SaveToolbar({
  saveStatus,
  hasChanges,
  selectedPlantId,
  onSave,
}: SaveToolbarProps) {
  const isSaving = saveStatus === 'saving'

  return (
    <Button
      variant="default"
      size="default"
      disabled={!selectedPlantId || isSaving}
      onClick={onSave}
      className="gap-2 shrink-0"
    >
      {isSaving ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Save className="h-4 w-4" />
      )}
      <span className="hidden sm:inline">
        {hasChanges ? 'Guardar cambios' : 'Guardar'}
      </span>
    </Button>
  )
}
