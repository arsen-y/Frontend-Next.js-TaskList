import {
    DetailedHTMLProps,
    HTMLAttributes,
    PropsWithChildren,
    memo
} from 'react'

interface Props {}

const Header2 = ({
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
        <h2
            className='mb-2 flex items-center justify-start text-lg text-gray-900 dark:text-white'
            {...rest}
        >
            {children}
        </h2>
    )
}

export default memo(Header2)
