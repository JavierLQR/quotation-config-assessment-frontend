import { gql } from '@apollo/client'

export const SAVE_PLANT_CONFIG = gql`
  mutation SavePlantConfig($input: SavePlantConfigInput!) {
    savePlantConfig(input: $input) {
      success
      message
      status
      data
    }
  }
`
