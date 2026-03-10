'use client'

import { useState } from 'react'
import { UserPlus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/shared/components/ui/dialog'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { Button } from '@/shared/components/ui/button'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/shared/components/ui/select'
import { PRICING_STRATEGY_LABELS } from '@/shared/constants/pricing-strategy'
import type { PricingStrategy } from '@/shared/types/enums'
import type { ClientType } from '@/shared/types/entities'
import type { CreateClientFormData } from '../../types/client-actions.types'

interface CreateClientDialogProps {
  open: boolean
  clientTypeId: number
  clientTypes: ClientType[]
  onClose: () => void
  onSubmit: (data: CreateClientFormData) => Promise<void>
}

export function CreateClientDialog({
  open,
  clientTypeId,
  clientTypes,
  onClose,
  onSubmit,
}: CreateClientDialogProps) {
  const [name, setName] = useState('')
  const [basePrice, setBasePrice] = useState('')
  const [strategy, setStrategy] = useState<PricingStrategy>('POR_ESTRUCTURA')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const clientType = clientTypes.find((ct) => ct.id === clientTypeId)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) {
      setError('El nombre es obligatorio')
      return
    }
    setError('')
    setLoading(true)
    try {
      await onSubmit({
        name: name.trim(),
        clientTypeId,
        basePrice: basePrice ? parseFloat(basePrice) : undefined,
        pricingStrategy: strategy,
      })
      setName('')
      setBasePrice('')
      setStrategy('POR_ESTRUCTURA')
      onClose()
    } catch {
      setError('Error al crear el cliente. Intente nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      setName('')
      setBasePrice('')
      setStrategy('POR_ESTRUCTURA')
      setError('')
      onClose()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900">
              <UserPlus className="h-4 w-4 text-white" />
            </div>
            <div>
              <DialogTitle>Nuevo cliente</DialogTitle>
              <DialogDescription>
                Tipo: <span className="font-medium text-slate-700">{clientType?.name ?? '—'}</span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="create-name">Nombre del cliente *</Label>
            <Input
              id="create-name"
              placeholder="Ej. Empresa ABC S.A."
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
            {error && <p className="text-xs text-red-600">{error}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="create-price">
              Precio base <span className="text-slate-400 font-normal">(USD, opcional)</span>
            </Label>
            <Input
              id="create-price"
              type="number"
              min={0}
              step={0.01}
              placeholder="Ej. 250"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label>Vinculación de precio</Label>
            <Select value={strategy} onValueChange={(v) => setStrategy(v as PricingStrategy)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(PRICING_STRATEGY_LABELS).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={loading}>
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? 'Guardando...' : 'Crear cliente'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
