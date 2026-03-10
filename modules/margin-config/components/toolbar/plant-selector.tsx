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
import type { Plant } from '@/shared/types/entities'

interface PlantSelectorProps {
  plants: Plant[]
  selectedPlantId: number | null
  loading: boolean
  onSelect: (plantId: number) => void
}

export function PlantSelector({
  plants,
  selectedPlantId,
  loading,
  onSelect,
}: PlantSelectorProps) {
  if (loading) {
    return <Skeleton className="h-10 w-72" />
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 text-slate-600">
        <Factory className="h-5 w-5" />
        <span className="text-sm font-medium">Planta</span>
      </div>
      <Select
        value={selectedPlantId?.toString() ?? ''}
        onValueChange={(v) => onSelect(parseInt(v, 10))}
      >
        <SelectTrigger className="w-72">
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
