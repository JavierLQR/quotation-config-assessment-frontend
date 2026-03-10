import { PlantSelector } from '@/modules/margin-config/components/toolbar/plant-selector'
import { SaveToolbar } from '@/modules/margin-config/components/toolbar/save-toolbar'
import type { Plant } from '@/shared/types/entities'
import type { SaveStatus } from '@/modules/margin-config/types'

interface PageHeaderProps {
  plants: Plant[]
  selectedPlantId: number | null
  loading: boolean
  saveStatus: SaveStatus
  hasChanges: boolean
  onSelectPlant: (plantId: number) => void
  onSave: () => Promise<void>
}

export function PageHeader({
  plants,
  selectedPlantId,
  loading,
  saveStatus,
  hasChanges,
  onSelectPlant,
  onSave,
}: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6">
        {/* Row 1: logo + save button */}
        <div className="flex items-center justify-between py-3 sm:py-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-xs">LT</span>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 leading-none">Laik Tech</p>
              <h1 className="text-sm font-bold text-slate-900 leading-tight">
                Configuración de márgenes
              </h1>
            </div>
          </div>

          {/* Desktop: divider + plant selector inline */}
          <div className="hidden sm:flex items-center gap-4 flex-1 ml-4">
            <div className="h-5 w-px bg-slate-200" />
            <PlantSelector
              plants={plants}
              selectedPlantId={selectedPlantId}
              loading={loading}
              onSelect={onSelectPlant}
            />
          </div>

          <SaveToolbar
            saveStatus={saveStatus}
            hasChanges={hasChanges}
            selectedPlantId={selectedPlantId}
            onSave={onSave}
          />
        </div>

        {/* Row 2 (mobile only): plant selector full width */}
        <div className="sm:hidden pb-3">
          <PlantSelector
            plants={plants}
            selectedPlantId={selectedPlantId}
            loading={loading}
            onSelect={onSelectPlant}
            fullWidth
          />
        </div>
      </div>
    </header>
  )
}
