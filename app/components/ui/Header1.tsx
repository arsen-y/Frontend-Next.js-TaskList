import {
    DetailedHTMLProps,
    HTMLAttributes,
    PropsWithChildren,
    memo
} from 'react'

interface Props {}

const Header1 = ({
    children,
    ...rest
}: PropsWithChildren<
    Props &
        DetailedHTMLProps<
            HTMLAttributes<HTMLHeadingElement>,
            HTMLHeadingElement
        >
>) => {
    return (
        <h1
            className='mb-5 flex items-center justify-start text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl'
            {...rest}
        >
            {children}
        </h1>
    )
}

export default memo(Header1)
