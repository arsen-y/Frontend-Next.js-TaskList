import {
    DetailedHTMLProps,
    HTMLAttributes,
    PropsWithChildren,
    memo
} from 'react'

interface Props {}

const ErrorBlock = ({
    children,
    ...rest
}: PropsWithChildren<
    Props & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>) => {
    return (
        <div
            className='text-sm font-light text-red-500 dark:text-red-300'
            {...rest}
        >
            {children}
        </div>
    )
}

export default memo(ErrorBlock)
