'use client'

import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'
import { useEffect, useState, memo } from 'react'

const ThemeButton = () => {
    const { resolvedTheme, setTheme } = useTheme()

    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    if (!mounted) {
        return null
    }

    return (
        <button
            aria-label='Toogle Dark Mode'
            type='button'
            className='p2 flex items-center justify-center rounded-lg transition-all'
            onClick={() =>
                setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }
        >
            {resolvedTheme === 'dark' ? (
                <SunIcon className='h-10 w-10 rounded-lg p-2 text-orange-300 transition-all duration-300 hover:bg-gray-500' />
            ) : (
                <MoonIcon className='h-10 w-10 rounded-lg p-2 text-slate-800 transition-all duration-300 hover:bg-gray-200' />
            )}
        </button>
    )
}

export default memo(ThemeButton)
