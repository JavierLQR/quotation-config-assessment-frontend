'use client'

import { useState, useEffect } from 'react'
import { Pencil } from 'lucide-react'
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
import type { Client } from '@/shared/types/entities'
import type { EditClientFormData } from '../../types/client-actions.types'

interface EditClientDialogProps {
  client: Client | null
  open: boolean
  onClose: () => void
  onSubmit: (data: EditClientFormData) => Promise<void>
}

export function EditClientDialog({
  client,
  open,
  onClose,
  onSubmit,
}: EditClientDialogProps) {
  const [name, setName] = useState('')
  const [basePrice, setBasePrice] = useState('')
  const [strategy, setStrategy] = useState<PricingStrategy>('POR_ESTRUCTURA')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (client) {
      setName(client.name)
      setBasePrice(client.basePrice?.toString() ?? '')
      setStrategy((client.pricingStrategy as PricingStrategy) ?? 'POR_ESTRUCTURA')
      setError('')
    }
  }, [client])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) {
      setError('El nombre es obligatorio')
      return
    }
    if (!client) return
    setError('')
    setLoading(true)
    try {
      await onSubmit({
        id: client.id,
        name: name.trim(),
        basePrice: basePrice ? parseFloat(basePrice) : undefined,
        pricingStrategy: strategy,
      })
      onClose()
    } catch {
      setError('Error al guardar. Intente nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      setError('')
      onClose()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800">
              <Pencil className="h-4 w-4 text-white" />
            </div>
            <div>
              <DialogTitle>Editar cliente</DialogTitle>
              <DialogDescription>
                Modifica los datos de{' '}
                <span className="font-medium text-slate-700">{client?.name}</span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="edit-name">Nombre del cliente *</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
            {error && <p className="text-xs text-red-600">{error}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-price">
              Precio base <span className="text-slate-400 font-normal">(USD, opcional)</span>
            </Label>
            <Input
              id="edit-price"
              type="number"
              min={0}
              step={0.01}
              placeholder="Heredado del tipo de cliente"
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
              {loading ? 'Guardando...' : 'Guardar cambios'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
