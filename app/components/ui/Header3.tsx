import {
    DetailedHTMLProps,
    HTMLAttributes,
    PropsWithChildren,
    memo
} from 'react'

interface Props {}

const Header3 = ({
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
        <h3 className='mb-2 flex items-center justify-start text-base text-gray-900 dark:text-white' {...rest}>
            {children}
        </h3>
    )
}

export default memo(Header3)
