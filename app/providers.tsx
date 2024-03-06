'use client'

import { ThemeProvider } from 'next-themes'
import StoreProvider from './StoreProvider'
import AuthProvider from './AuthProvider'
import GraphqlProvider from './GraphqlProvider'

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider attribute='class'>
            <StoreProvider>
                <AuthProvider>
                    <GraphqlProvider>{children}</GraphqlProvider>
                </AuthProvider>
            </StoreProvider>
        </ThemeProvider>
    )
}

export default Providers