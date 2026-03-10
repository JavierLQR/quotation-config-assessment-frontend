'use client'

import { useCallback } from 'react'
import { useMutation } from '@apollo/client/react'
import { UPDATE_CLIENT, CREATE_CLIENT } from '@/modules/clients/graphql/mutations'
import { GET_ALL_CLIENTS } from '@/modules/clients/graphql/queries'
import type { PricingStrategy } from '@/shared/types/enums'
import type {
  UpdateClientResult,
  CreateClientResult,
  CreateClientFormData,
  EditClientFormData,
} from '../types/client-actions.types'

export function useClientActions() {
  const [updateClientMutation] = useMutation<UpdateClientResult>(UPDATE_CLIENT, {
    refetchQueries: [{ query: GET_ALL_CLIENTS }],
  })

  const [createClientMutation] = useMutation<CreateClientResult>(CREATE_CLIENT, {
    refetchQueries: [{ query: GET_ALL_CLIENTS }],
  })

  const updateClientPricingStrategy = useCallback(
    async (clientId: number, strategy: PricingStrategy) => {
      await updateClientMutation({
        variables: { input: { id: clientId, pricingStrategy: strategy } },
      })
    },
    [updateClientMutation],
  )

  const createClient = useCallback(
    async (data: CreateClientFormData) => {
      await createClientMutation({ variables: { input: data } })
    },
    [createClientMutation],
  )

  const editClient = useCallback(
    async (data: EditClientFormData) => {
      await updateClientMutation({ variables: { input: data } })
    },
    [updateClientMutation],
  )

  return {
    updateClientPricingStrategy,
    createClient,
    editClient,
  }
}
