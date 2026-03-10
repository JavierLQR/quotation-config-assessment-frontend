'use client'

import { useCallback } from 'react'
import { useMutation } from '@apollo/client/react'
import { UPDATE_CLIENT, CREATE_CLIENT } from '@/modules/clients/graphql/mutations'
import { UPDATE_CLIENT_TYPE } from '@/modules/client-types/graphql/mutations'
import { GET_ALL_CLIENTS } from '@/modules/clients/graphql/queries'
import { GET_CLIENT_TYPES } from '@/modules/client-types/graphql/queries'
import type { PricingStrategy } from '@/shared/types/enums'
import type {
  UpdateClientResult,
  CreateClientResult,
  UpdateClientTypeResult,
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

  const [updateClientTypeMutation] = useMutation<UpdateClientTypeResult>(UPDATE_CLIENT_TYPE, {
    refetchQueries: [{ query: GET_CLIENT_TYPES }],
  })

  const updateClientPricingStrategy = useCallback(
    async (clientId: number, strategy: PricingStrategy) => {
      await updateClientMutation({
        variables: { input: { id: clientId, pricingStrategy: strategy } },
      })
    },
    [updateClientMutation],
  )

  const updateClientTypePricingStrategy = useCallback(
    async (clientTypeId: number, strategy: PricingStrategy) => {
      await updateClientTypeMutation({
        variables: { input: { id: clientTypeId, pricingStrategy: strategy } },
      })
    },
    [updateClientTypeMutation],
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
    updateClientTypePricingStrategy,
    createClient,
    editClient,
  }
}
