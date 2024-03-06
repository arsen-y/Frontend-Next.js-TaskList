import {
    ButtonHTMLAttributes,
    DetailedHTMLProps,
    PropsWithChildren,
    memo
} from 'react'

interface Props {}

const ButtonSimple = ({
    children,
    title,
    ...rest
}: PropsWithChildren<
    Props &
        DetailedHTMLProps<
            ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
        >
>) => {
    return (
        <button
            aria-label={title}
            title={title}
            type='button'
            className='flex items-center justify-center rounded-lg transition-all'
            {...rest}
        >
            {children}
        </button>
    )
}

export default memo(ButtonSimple)
