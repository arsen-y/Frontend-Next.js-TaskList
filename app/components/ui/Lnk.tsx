import clsx from 'clsx'
import Link from 'next/link'
import {
    DetailedHTMLProps,
    HTMLAttributes,
    PropsWithChildren,
    memo
} from 'react'

interface Props {
    href: string
    className?: string | undefined
}

const Lnk = ({
    children,
    href,
    className: cl,
    ...rest
}: PropsWithChildren<
    Props & DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
>) => {
    return (
        <Link href={href}>
            <span
                className={clsx(
                    'text-primary-600 dark:text-primary-500 font-medium underline-offset-4 hover:cursor-pointer hover:underline',
                    cl
                )}
                {...rest}
            >
                {children}
            </span>
        </Link>
    )
}

export default memo(Lnk)
