'use client'

import { CheckCircle2, AlertCircle, Loader2, Save } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import type { SaveStatus } from '../../types'

interface SaveToolbarProps {
  saveStatus: SaveStatus
  saveMessage: string
  hasChanges: boolean
  selectedPlantId: number | null
  onSave: () => Promise<void>
}

const statusConfig: Record<
  SaveStatus,
  { icon: React.ReactNode; label: string; className: string } | null
> = {
  idle: null,
  saving: {
    icon: <Loader2 className="h-4 w-4 animate-spin" />,
    label: 'Guardando...',
    className: 'text-slate-500',
  },
  success: {
    icon: <CheckCircle2 className="h-4 w-4" />,
    label: 'Guardado correctamente',
    className: 'text-emerald-600',
  },
  error: {
    icon: <AlertCircle className="h-4 w-4" />,
    label: 'Error al guardar',
    className: 'text-red-600',
  },
}

export function SaveToolbar({
  saveStatus,
  saveMessage,
  hasChanges,
  selectedPlantId,
  onSave,
}: SaveToolbarProps) {
  const status = statusConfig[saveStatus]

  return (
    <div className="flex items-center gap-4">
      {status && (
        <div className={cn('flex items-center gap-2 text-sm', status.className)}>
          {status.icon}
          <span>{status.label}</span>
          {saveMessage && (
            <span className="text-slate-400 text-xs">({saveMessage})</span>
          )}
        </div>
      )}
      <Button
        variant={saveStatus === 'success' ? 'success' : 'default'}
        size="default"
        disabled={!selectedPlantId || saveStatus === 'saving'}
        onClick={onSave}
        className="gap-2"
      >
        {saveStatus === 'saving' ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Save className="h-4 w-4" />
        )}
        {hasChanges ? 'Guardar cambios' : 'Guardar'}
      </Button>
    </div>
  )
}
