import { gql } from '@apollo/client'

export const GET_CLIENT_TYPES = gql`
  query GetClientTypes {
    clientTypes(pagination: { page: 1, perPage: 100 }) {
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
