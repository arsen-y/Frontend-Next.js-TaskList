'use client'

import { useRef } from 'react'
import createApolloClient from '@/lib/apollo-client'
import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client'

export default function GraphqlProvider({ children }: { children: React.ReactNode }) {

    const graphqlRef = useRef<ApolloClient<NormalizedCacheObject>>()

    if (!graphqlRef.current) {
        graphqlRef.current = createApolloClient();
    }

    return (
        <ApolloProvider client={graphqlRef.current}>{children}</ApolloProvider>
    )

}
