import {
    DetailedHTMLProps,
    HTMLAttributes,
    PropsWithChildren,
    memo
} from 'react'

interface Props {}

const ErrorsBlock = ({
    children,
    ...rest
}: PropsWithChildren<
    Props & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>) => {
    return (
        <div className='space-y-2' {...rest}>
            {children}
        </div>
    )
}

export default memo(ErrorsBlock)
