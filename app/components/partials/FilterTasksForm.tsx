'use client'

import Div from '../ui/Div'
import { ChangeEvent, Fragment, memo, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import HStack from '../ui/HStack'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { setFilterStatus, setFilterStr } from '@/lib/slices/appSlice'
import { TaskStatus } from '@/lib/interfaces'

const todosFilterOpt = [
    { id: 'ALL', name: 'All', unavailable: false },
    { id: 'OPEN', name: 'Open', unavailable: false },
    { id: 'IN_PROGRESS', name: 'In progress', unavailable: false },
    { id: 'DONE', name: 'Done', unavailable: true }
]

const FilterTasksForm = () => {
    const dispatch = useAppDispatch()

    const { filterStr, filterStatus } = useAppSelector(state => state.app)

    const [selected, setSelected] = useState(
        todosFilterOpt.find(el => el.id == filterStatus) ?? todosFilterOpt[0]
    )

    let [tmpValue, setTmpValue] = useState<string>(filterStr ?? '')

    useEffect(() => {
        if (selected.id == 'ALL') {
            dispatch(setFilterStatus(null))
        } else {
            dispatch(setFilterStatus(selected.id as TaskStatus))
        }
    }, [selected])

    useEffect(() => {
        setSelected(
            todosFilterOpt.find(el => el.id == filterStatus) ??
                todosFilterOpt[0]
        )
    }, [filterStatus])

    useEffect(() => {
        setTmpValue(filterStr ?? '')
    }, [filterStr])

    useEffect(() => {
        const handler = setTimeout(() => {
            if (tmpValue == '') {
                dispatch(setFilterStr(null))
            } else {
                dispatch(setFilterStr(tmpValue))
            }
        }, 500)

        return () => {
            clearTimeout(handler)
        }
    }, [tmpValue])

    return (
        <HStack className=''>
            <Div className='my-4 w-full sm:w-48'>
                <input
                    type='text'
                    name='filter'
                    className='focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-md dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm'
                    placeholder='filter'
                    value={tmpValue}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setTmpValue(e.target.value)
                    }}
                />
            </Div>

            <Div className='my-4 w-full sm:w-40'>
                <Listbox value={selected} onChange={setSelected}>
                    <div className='relative'>
                        <Listbox.Button className='focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-left text-gray-900  shadow-md dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400'>
                            <span className='block truncate'>
                                {selected.name}
                            </span>
                            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                                <ChevronUpDownIcon
                                    className='h-5 w-5 text-gray-400'
                                    aria-hidden='true'
                                />
                            </span>
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            leave='transition ease-in duration-100'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'
                        >
                            <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-50 p-2.5 py-1 text-base text-gray-900 shadow-lg ring-1 ring-black/5 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm'>
                                {todosFilterOpt.map((opt, index) => (
                                    <Listbox.Option
                                        key={index}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active
                                                    ? 'bg-amber-100 text-amber-900 dark:bg-gray-500 dark:text-white'
                                                    : 'text-gray-900 dark:text-white'
                                            }`
                                        }
                                        value={opt}
                                    >
                                        {({ selected }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${
                                                        selected
                                                            ? 'font-medium'
                                                            : 'font-normal'
                                                    }`}
                                                >
                                                    {opt.name}
                                                </span>
                                                {selected ? (
                                                    <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                                                        <CheckIcon
                                                            className='h-5 w-5'
                                                            aria-hidden='true'
                                                        />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </Listbox>
            </Div>
        </HStack>
    )
}

export default memo(FilterTasksForm)
