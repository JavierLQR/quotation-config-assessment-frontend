'use client'

import { useState, useRef, useCallback } from 'react'
import { cn } from '@/shared/lib/utils'
import {
  getMarginColorClass,
  isCriticalMargin,
  formatMarginDisplay,
} from '@/shared/lib/margin-utils'
import { LOW_MARGIN_THRESHOLD } from '@/shared/constants/margin-thresholds'

interface MarginCellProps {
  value: number | null | undefined
  onChange: (value: number | null) => void
  disabled?: boolean
}

export function MarginCell({
  value,
  onChange,
  disabled = false,
}: MarginCellProps) {
  const [editing, setEditing] = useState(false)
  const [editBuffer, setEditBuffer] = useState('')
  const [showWarning, setShowWarning] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const isAlert = isCriticalMargin(value)
  const colorClass = getMarginColorClass(value)

  const startEditing = useCallback(() => {
    if (disabled) return
    setEditBuffer(value?.toString() ?? '')
    setShowWarning(false)
    setEditing(true)
    requestAnimationFrame(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    })
  }, [disabled, value])

  const commit = useCallback(() => {
    const parsed = parseFloat(editBuffer)
    if (editBuffer === '' || isNaN(parsed)) {
      setEditing(false)
      setShowWarning(false)
      onChange(null)
      return
    }

    const clamped = Math.max(0, Math.min(100, parsed))

    if (clamped <= LOW_MARGIN_THRESHOLD) setShowWarning(true)
    else setShowWarning(false)

    setEditing(false)
    onChange(clamped)
  }, [editBuffer, onChange])

  const cancel = useCallback(() => {
    setEditing(false)
    setShowWarning(false)
  }, [])

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') commit()
      if (e.key === 'Escape') cancel()
    },
    [commit, cancel],
  )

  if (editing) {
    return (
      <div className="relative flex items-center justify-center">
        <input
          ref={inputRef}
          type="number"
          min={0}
          max={100}
          step={0.1}
          value={editBuffer}
          onChange={(e) => setEditBuffer(e.target.value)}
          onBlur={commit}
          onKeyDown={onKeyDown}
          className={cn(
            'w-16 rounded border px-1.5 py-1 text-center text-xs font-medium focus:outline-none focus:ring-1',
            colorClass,
          )}
        />
      </div>
    )
  }

  if (isAlert) {
    return (
      <div className="relative flex items-center justify-center group">
        <button
          onClick={startEditing}
          disabled={disabled}
          className={cn(
            'flex w-16 items-center justify-center gap-0.5 rounded border px-1 py-1 text-xs font-bold transition-colors',
            'border-red-400 bg-red-100 text-red-800',
            !disabled && 'cursor-pointer hover:bg-red-200',
            disabled && 'cursor-not-allowed opacity-40',
          )}
          title={`Margen crítico: ${value}% (≤ ${LOW_MARGIN_THRESHOLD}%)`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-3 w-3 shrink-0 text-red-600"
          >
            <path
              fillRule="evenodd"
              d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          {value} %
        </button>
        <div
          className={cn(
            'pointer-events-none absolute -top-9 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded bg-red-700 px-2 py-1 text-[10px] font-semibold text-white shadow-lg',
            showWarning ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
            'transition-opacity',
          )}
        >
          El número no puede ser menor a {LOW_MARGIN_THRESHOLD}%
          <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-red-700" />
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex items-center justify-center">
      <button
        onClick={startEditing}
        disabled={disabled}
        className={cn(
          'w-16 rounded border px-1.5 py-1 text-center text-xs font-medium transition-colors',
          value != null
            ? colorClass
            : 'border-slate-200 bg-slate-50 text-slate-400 hover:bg-slate-100',
          !disabled && 'cursor-pointer hover:opacity-80',
          disabled && 'cursor-not-allowed opacity-40',
        )}
      >
        {formatMarginDisplay(value)}
      </button>
    </div>
  )
}
