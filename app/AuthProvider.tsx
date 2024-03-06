'use client'

import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useLayoutEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { jwtObj } from '@/lib/interfaces'
import { cleanAppSlice, setAccessToken, setUsername } from '@/lib/slices/appSlice'

export default function AuthProvider({
    children
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const pathname = usePathname()

    const dispatch = useAppDispatch()
    const { accessToken } = useAppSelector(state => state.app)

    useEffect(() => {

        const token: string | null = localStorage.getItem('accessToken')

        if (token) {
            const decoded: jwtObj = jwtDecode(token)
            dispatch(setUsername(decoded.username))
            dispatch(setAccessToken(token))
        }

        if (
            !token &&
            accessToken === null &&
            !pathname?.startsWith('/login') &&
            !pathname?.startsWith('/about') &&
            !pathname?.startsWith('/register')
        ) {
            router.push('/login')
        }
        
    }, [accessToken, pathname])

    useEffect(() => {
        dispatch(cleanAppSlice())
    }, [pathname])

    return <>{children}</>
}
