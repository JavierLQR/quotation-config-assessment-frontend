import { gql } from '@apollo/client'

export const GET_PLANTS = gql`
  query GetPlants {
    plants(pagination: { page: 1, perPage: 100 }) {
      success
      message
      data {
        id
        name
      }
    }
  }
`
