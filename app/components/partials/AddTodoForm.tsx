'use client'

import ButtonAlt from '../ui/ButtonAlt'
import Header2 from '../ui/Header2'
import { memo, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector, useAuthGQLMutation } from '@/lib/hooks'
import { ADD_TODO, GET_FILTERED_TODOS } from '@/lib/apollo-api/todos'
import ErrorBlock from '../ui/ErrorBlock'
import { setFilterStatus, setFilterStr } from '@/lib/slices/appSlice'

const AddTodoForm = () => {
    const { filterStr, filterStatus } = useAppSelector(state => state.app)

    const dispatch = useAppDispatch()

    const loginRef = useRef<HTMLFormElement>(null)

    const [addTask, { loading, error, data }] = useAuthGQLMutation(ADD_TODO, [
        {
            query: GET_FILTERED_TODOS,
            variables: { search: filterStr, status: filterStatus }
        }
    ])

    useEffect(() => {
        if (data && data.createTask && data.createTask.title) {
            loginRef.current?.reset()
            dispatch(setFilterStatus(null))
            dispatch(setFilterStr(null))
        }
    }, [data])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const form = event.currentTarget
        const formData: FormData = new FormData(form as HTMLFormElement)

        const { title, description } = Object.fromEntries(formData)

        if (!title || !description) return

        addTask({
            variables: {
                title,
                description
            }
        })
    }

    return (
        <>
            <div className='mb-8 w-full rounded-lg bg-gradient-to-r from-teal-500 p-1 shadow dark:from-teal-800 sm:max-w-md md:mt-0 xl:p-0'>
                <div className='space-y-4 p-1 sm:p-6'>
                    <Header2>Add todo</Header2>

                    {error && <ErrorBlock>{error.message}</ErrorBlock>}

                    <form
                        className='space-y-4 md:space-y-6'
                        onSubmit={handleSubmit}
                        ref={loginRef}
                    >
                        <div>
                            <label
                                htmlFor='title'
                                className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                            >
                                Todo title
                            </label>
                            <input
                                type='text'
                                name='title'
                                className='focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm'
                                placeholder=''
                            />
                        </div>
                        <div>
                            <label
                                htmlFor='description'
                                className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                            >
                                Todo description
                            </label>
                            <input
                                type='text'
                                name='description'
                                placeholder=''
                                className='focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm'
                            />
                        </div>

                        <ButtonAlt type='submit' disabled={loading}>
                            Add
                        </ButtonAlt>
                    </form>
                </div>
            </div>
        </>
    )
}

export default memo(AddTodoForm)
