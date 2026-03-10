'use client'

import { Factory } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { cn } from '@/shared/lib/utils'
import type { Plant } from '@/shared/types/entities'

interface PlantSelectorProps {
  plants: Plant[]
  selectedPlantId: number | null
  loading: boolean
  onSelect: (plantId: number) => void
  fullWidth?: boolean
}

export function PlantSelector({
  plants,
  selectedPlantId,
  loading,
  onSelect,
  fullWidth = false,
}: PlantSelectorProps) {
  if (loading) {
    return <Skeleton className={cn('h-9', fullWidth ? 'w-full' : 'w-64')} />
  }

  return (
    <div className={cn('flex items-center gap-2', fullWidth && 'w-full')}>
      <div className="flex items-center gap-1.5 text-slate-600 shrink-0">
        <Factory className="h-4 w-4" />
        <span className="text-sm font-medium hidden xs:block">Planta</span>
      </div>
      <Select
        value={selectedPlantId?.toString() ?? ''}
        onValueChange={(v) => onSelect(parseInt(v, 10))}
      >
        <SelectTrigger className={cn(fullWidth ? 'w-full' : 'w-56 sm:w-64')}>
          <SelectValue placeholder="Selecciona una planta..." />
        </SelectTrigger>
        <SelectContent>
          {plants.map((plant) => (
            <SelectItem key={plant.id} value={plant.id.toString()}>
              {plant.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
