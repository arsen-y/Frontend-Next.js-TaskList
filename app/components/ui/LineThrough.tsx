import { PropsWithChildren, memo } from 'react'

interface Props {}

const LineThrough = ({ children }: PropsWithChildren<Props>) => {
    return <span className='line-through'>{children}</span>
}

export default memo(LineThrough)
