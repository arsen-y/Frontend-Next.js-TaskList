import clsx from 'clsx'
import { CSSProperties, memo } from 'react'

interface Props {
    Svg: React.ForwardRefExoticComponent<
        Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
            title?: string | undefined
            titleId?: string | undefined
        } & React.RefAttributes<SVGSVGElement>
    >
    style?: CSSProperties
    className?: string | undefined
}

const Icon = ({ Svg, className: cl, ...rest }: Props) => {
    return (
        <Svg
            className={clsx(
                'h-9 w-9 rounded-lg p-2 text-slate-800 transition-all duration-300 hover:bg-gray-300 dark:text-orange-300 dark:hover:bg-gray-500',
                cl
            )}
            {...rest}
        />
    )
}

export default memo(Icon)
