'use client'

import { usePathname, useRouter } from 'next/navigation'
import { PropsWithChildren, memo } from 'react'

const ContactButton = () => {
    
    const router = useRouter()

    const handleClick = () => {
        router.push('/about')
    }

    return <button onClick={handleClick}>Contact</button>

}

export default memo(ContactButton)
