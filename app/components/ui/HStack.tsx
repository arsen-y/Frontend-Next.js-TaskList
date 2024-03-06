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

const HStack = ({
    children,
    className: cl,
    ...rest
}: PropsWithChildren<
    Props & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>) => {
    return <div className={clsx('sm:flex w-full sm:space-x-3', cl)}>{children}</div>
}

export default memo(HStack)
