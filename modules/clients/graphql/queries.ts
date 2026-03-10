import { gql } from '@apollo/client'

export const GET_ALL_CLIENTS = gql`
  query GetAllClients {
    clients(pagination: { page: 1, perPage: 100 }) {
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
