import clsx from 'clsx'
import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren, memo } from 'react'

interface Props {
    className?: string | undefined
}

const Div = ({
    children,
    className: cl,
    ...rest
}: PropsWithChildren<
    Props & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>) => {
    return (
        <div
            className={clsx(
                'text-sm font-light text-gray-500 dark:text-gray-400',
                cl
            )}
            {...rest}
        >
            {children}
        </div>
    )
}

export default memo(Div)
