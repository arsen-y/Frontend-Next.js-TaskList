'use client'

import {
    Fragment,
    MouseEventHandler,
    SVGProps,
    useEffect,
    useRef,
    useState
} from 'react'
import NavLink from '../ui/NavLink'
import { motion } from 'framer-motion'
import ThemeButton from '../ui/ThemeButton'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { appLogout } from '@/lib/slices/appSlice'
import ButtonAlt from '../ui/ButtonAlt'
import Link from 'next/link'
import { Bars3Icon, ChevronDownIcon } from '@heroicons/react/24/solid'
import Icon from '../ui/Icon'
import ButtonSimple from '../ui/ButtonSimple'
import { Menu, Transition } from '@headlessui/react'
import IconStatic from '../ui/IconStatic'
import { useRouter } from 'next/navigation'

const Header = () => {
    const dispatch = useAppDispatch()

    const logout = () => {
        dispatch(appLogout())
    }

    const router = useRouter()

    const { username } = useAppSelector(state => state.app)

    return (
        <header className='bg-gray-100 px-2 py-4 dark:bg-gray-700'>
            <nav className='flex h-14 items-center justify-between'>
                <div className='relative sm:hidden'>
                    <div>
                        <Menu as='div' className='relative inline-block'>
                            <div>
                                <Menu.Button className='inline-flex w-full justify-center rounded-md bg-gray-300 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 dark:bg-black/20'>
                                    <IconStatic
                                        Svg={Bars3Icon}
                                        className='h-12 w-12'
                                    />
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter='transition ease-out duration-100'
                                enterFrom='transform opacity-0 scale-95'
                                enterTo='transform opacity-100 scale-100'
                                leave='transition ease-in duration-75'
                                leaveFrom='transform opacity-100 scale-100'
                                leaveTo='transform opacity-0 scale-95'
                            >
                                <Menu.Items className='absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-700 rounded-md dark:bg-gray-900 bg-gray-500 shadow-lg ring-1 ring-black/5 focus:outline-none'>
                                    <MenuItem
                                        title='Main'
                                        onClick={() => {
                                            router.push('/')
                                        }}
                                    />
                                    <MenuItem
                                        title='Todos'
                                        onClick={() => {
                                            router.push('/todos')
                                        }}
                                    />
                                    <MenuItem
                                        title='About'
                                        onClick={() => {
                                            router.push('/about')
                                        }}
                                    />
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </div>

                <ul className='hidden flex-1 gap-3 sm:flex'>
                    <motion.li
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <NavLink href='/'>Main</NavLink>
                    </motion.li>

                    <motion.li
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <NavLink href='/todos'>Todos</NavLink>
                    </motion.li>

                    <motion.li
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <NavLink href='/about'>About</NavLink>
                    </motion.li>
                </ul>

                <div className='flex gap-3'>
                    {username !== null && (
                        <div className='flex items-center justify-center space-x-3'>
                            <div>{username}</div>
                            <div>
                                <ButtonAlt onClick={logout}>Logout</ButtonAlt>
                            </div>
                        </div>
                    )}
                    {username === null && (
                        <div>
                            <Link href='/login'>
                                <ButtonAlt>Login</ButtonAlt>
                            </Link>
                        </div>
                    )}

                    <ThemeButton />
                </div>
            </nav>
        </header>
    )
}

function MenuItem({
    title,
    onClick
}: {
    title: string
    onClick: MouseEventHandler<HTMLButtonElement>
}) {
    return (
        <>
            <div className='px-1 py-1'>
                <Menu.Item>
                    {({ active }) => (
                        <button
                            aria-label={title}
                            onClick={onClick}
                            className={`${
                                active
                                    ? 'bg-gray-400 text-white dark:bg-gray-600'
                                    : 'bg-gray-500 text-white dark:bg-gray-900'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                            {title}
                        </button>
                    )}
                </Menu.Item>
            </div>
        </>
    )
}

export default Header
