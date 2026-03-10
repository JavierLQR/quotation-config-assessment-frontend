import { gql } from '@apollo/client'

export const UPDATE_CLIENT_TYPE = gql`
  mutation UpdateClientType($input: UpdateClientTypeInput!) {
    updateClientType(input: $input) {
      success
      message
      data {
        id
        name
        basePrice
        pricingStrategy
      }
    }
  }
`
