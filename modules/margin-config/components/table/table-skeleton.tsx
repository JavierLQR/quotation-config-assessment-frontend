import { Skeleton } from '@/shared/components/ui/skeleton'
import { VOLUME_RANGES } from '@/shared/types/enums'

export function TableSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2].map((g) => (
        <div key={g} className="rounded-lg border border-slate-200 overflow-hidden">
          <Skeleton className="h-11 w-full rounded-none" />
          {[1, 2, 3].map((r) => (
            <div key={r} className="flex items-center gap-3 px-4 py-3 border-t border-slate-100">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-24" />
              {VOLUME_RANGES.map((vr) => (
                <Skeleton key={vr} className="h-7 w-16" />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
