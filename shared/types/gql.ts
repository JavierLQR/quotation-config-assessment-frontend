export interface PaginationMeta {
  total: number
  page: number
  limit: number
  lastPage: number
}

export interface GqlPayload<T> {
  success: boolean
  message: string
  status: string
  data: T
}

export interface GqlListPayload<T> {
  success: boolean
  message: string
  status: string
  data: T[]
}

export interface GqlPaginatedPayload<T> {
  success: boolean
  message: string
  status: string
  data: T[]
  meta: PaginationMeta
}
