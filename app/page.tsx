'use client'

import { useState } from 'react'
import { useMarginConfig } from '@/modules/margin-config/hooks/use-margin-config'
import { useClientActions } from '@/modules/margin-config/hooks/use-client-actions'
import { MarginPanel } from '@/modules/margin-config/components/margin-panel'
import { PageHeader } from '@/shared/components/layout/page-header'
import { ContextBar } from '@/shared/components/layout/context-bar'
import { EmptyState } from '@/shared/components/layout/empty-state'
import { CreateClientDialog } from '@/modules/margin-config/components/dialogs/create-client-dialog'
import { EditClientDialog } from '@/modules/margin-config/components/dialogs/edit-client-dialog'
import type { Client, ClientType } from '@/shared/types/entities'
import type { PricingStrategy } from '@/shared/types/enums'
import type { CreateClientFormData, EditClientFormData } from '@/modules/margin-config/types/client-actions.types'

export default function MarginConfigPage() {
  const {
    plants,
    clientTypeRows,
    draft,
    selectedPlantId,
    isLoading,
    marginsLoading,
    saveStatus,
    saveMessage,
    hasChanges,
    selectPlant,
    updateMargin,
    save,
  } = useMarginConfig()

  const {
    updateClientPricingStrategy,
    updateClientTypePricingStrategy,
    createClient,
    editClient,
  } = useClientActions()

  const [createDialogTypeId, setCreateDialogTypeId] = useState<number | null>(null)
  const [editingClient, setEditingClient] = useState<Client | null>(null)

  const selectedPlant = plants.find((p) => p.id === selectedPlantId)
  const clientTypes: ClientType[] = clientTypeRows.map((r) => r.clientType)

  async function handleCreateSubmit(data: CreateClientFormData) {
    await createClient(data)
  }

  async function handleEditSubmit(data: EditClientFormData) {
    await editClient(data)
  }

  function handleChangePricingStrategy(clientId: number, strategy: PricingStrategy) {
    void updateClientPricingStrategy(clientId, strategy)
  }

  function handleChangeTypePricingStrategy(clientTypeId: number, strategy: PricingStrategy) {
    void updateClientTypePricingStrategy(clientTypeId, strategy)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader
        plants={plants}
        selectedPlantId={selectedPlantId}
        loading={isLoading}
        saveStatus={saveStatus}
        saveMessage={saveMessage}
        hasChanges={hasChanges}
        onSelectPlant={selectPlant}
        onSave={save}
      />

      <main className="mx-auto max-w-screen-2xl px-6 py-6 space-y-4">
        <ContextBar
          selectedPlant={selectedPlant}
          clientTypeRows={clientTypeRows}
          hasChanges={hasChanges}
        />

        {!selectedPlantId && !isLoading && <EmptyState />}

        {(selectedPlantId || isLoading) && (
          <MarginPanel
            clientTypeRows={clientTypeRows}
            draft={draft}
            loading={marginsLoading || isLoading}
            disabled={!selectedPlantId || saveStatus === 'saving'}
            onUpdateMargin={updateMargin}
            onAddClient={(clientTypeId) => setCreateDialogTypeId(clientTypeId)}
            onEditClient={(client) => setEditingClient(client)}
            onChangePricingStrategy={handleChangePricingStrategy}
            onChangeTypePricingStrategy={handleChangeTypePricingStrategy}
          />
        )}
      </main>

      <CreateClientDialog
        open={createDialogTypeId !== null}
        clientTypeId={createDialogTypeId ?? 0}
        clientTypes={clientTypes}
        onClose={() => setCreateDialogTypeId(null)}
        onSubmit={handleCreateSubmit}
      />

      <EditClientDialog
        open={editingClient !== null}
        client={editingClient}
        onClose={() => setEditingClient(null)}
        onSubmit={handleEditSubmit}
      />
    </div>
  )
}
