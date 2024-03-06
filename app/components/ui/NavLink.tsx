'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PropsWithChildren, memo } from 'react'

interface Props {
    href: string
    rest?: any
}

const NavLink = ({ href, ...rest }: PropsWithChildren<Props>) => {
    const pathname = usePathname()

    const isActive = href === pathname

    return (
        <Link
            className={clsx('underline-offset-4 hover:underline', isActive && 'text-cyan-500')}
            href={href}
            {...rest}
        />
    )
}

export default memo(NavLink)
