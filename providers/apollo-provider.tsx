'use client'

import { ApolloProvider } from '@apollo/client/react'
import { getApolloClient } from '@/shared/lib/apollo-client'

export function ApolloClientProvider({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={getApolloClient()}>{children}</ApolloProvider>
}
