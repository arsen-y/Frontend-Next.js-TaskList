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

const LnkColored = ({
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
                    'text-primary-600 dark:text-primary-500 block w-full rounded-sm bg-gradient-to-r from-fuchsia-700 p-1 pl-2 font-medium text-white underline-offset-4 transition-all duration-300 hover:cursor-pointer hover:from-fuchsia-500 hover:underline dark:from-fuchsia-700 hover:dark:from-fuchsia-900 sm:min-w-80',
                    cl
                )}
                {...rest}
            >
                {children}
            </span>
        </Link>
    )
}

export default memo(LnkColored)
