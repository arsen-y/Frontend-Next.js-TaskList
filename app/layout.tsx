import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Todo client app',
    description: 'Todo client app with next.js'
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body
                className={[
                    inter.className,
                    'mx-auto grid min-h-screen max-w-screen-md grid-rows-[min-content_1fr_min-content] '
                ].join(' ')}
            >
                <Providers>
                    <Header />

                    <main className='bg-gray-200 px-2 py-4 dark:bg-gray-800'>
                        {children}
                    </main>

                    <Footer />
                </Providers>
            </body>
        </html>
    )
}
