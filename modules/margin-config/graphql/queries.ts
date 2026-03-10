import { gql } from '@apollo/client'

export const GET_MARGINS_BY_PLANT = gql`
  query GetMarginsByPlant($plantId: Int!) {
    marginsByPlant(plantId: $plantId, pagination: { page: 1, perPage: 100 }) {
      success
      message
      data {
        id
        plantId
        clientTypeId
        clientId
        volumeRange
        margin
      }
    }
  }
`
