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

const Paragraph = ({
    children,
    className: cl, 
    ...rest
}: PropsWithChildren<
    Props &
        DetailedHTMLProps<
            HTMLAttributes<HTMLParagraphElement>,
            HTMLParagraphElement
        >
>) => {
    return (
        <p
            className={clsx(
                'text-sm font-light text-gray-500 dark:text-gray-400',
                cl
            )}
            {...rest}
        >
            {children}
        </p>
    )
}

export default memo(Paragraph)
