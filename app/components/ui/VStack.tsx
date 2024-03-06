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

const VStack = ({
    children,
    className: cl,
    ...rest
}: PropsWithChildren<
    Props & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>) => {
    return <div className={clsx('flex-col space-y-3', cl)}>{children}</div>
}

export default memo(VStack)
