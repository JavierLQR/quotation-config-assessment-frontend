import { gql } from '@apollo/client'

export const CREATE_CLIENT = gql`
  mutation CreateClient($input: CreateClientInput!) {
    createClient(input: $input) {
      success
      message
      data {
        id
        name
        clientTypeId
        basePrice
        pricingStrategy
      }
    }
  }
`

export const UPDATE_CLIENT = gql`
  mutation UpdateClient($input: UpdateClientInput!) {
    updateClient(input: $input) {
      success
      message
      data {
        id
        name
        clientTypeId
        basePrice
        pricingStrategy
      }
    }
  }
`
