import clsx from 'clsx'
import {
    DetailedHTMLProps,
    HTMLAttributes,
    PropsWithChildren,
    memo
} from 'react'

interface Props {
    className?: string | undefined
}

const Span = ({
    children,
    className: cl,
    ...rest
}: PropsWithChildren<
    Props & DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
>) => {
    return (
        <span
            className={clsx(
                'text-sm font-light text-gray-500 dark:text-gray-400',
                cl
            )}
            {...rest}
        >
            {children}
        </span>
    )
}

export default memo(Span)
