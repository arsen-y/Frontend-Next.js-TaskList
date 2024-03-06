'use client'

import {
    DELETE_TODO,
    GET_FILTERED_TODOS,
    GET_TODO,
    UPDATE_TODO_STATUS
} from '@/lib/apollo-api/todos'
import ErrorBlock from '../ui/ErrorBlock'
import {
    useAppSelector,
    useAuthGQLMutation,
    useAuthGQLQuery
} from '@/lib/hooks'
import Header2 from '../ui/Header2'
import LineThrough from '../ui/LineThrough'
import { ClockIcon, CheckIcon, TrashIcon } from '@heroicons/react/24/solid'
import { memo } from 'react'
import ButtonSimple from '../ui/ButtonSimple'
import Icon from '../ui/Icon'
import IconStatic from '../ui/IconStatic'
import Paragraph from '../ui/Paragraph'
import Div from '../ui/Div'
import LnkColored from '../ui/LnkColored'
import { TaskStatus } from '@/lib/interfaces'
import { ApolloError } from '@apollo/client'

interface TodoItem {
    id: string
    title: string
    status: TaskStatus
}

const TodoList = () => {
    const { filterStr, filterStatus } = useAppSelector(state => state.app)

    const {
        data,
        loading,
        error: getTasksError
    } = useAuthGQLQuery(GET_FILTERED_TODOS, {
        search: filterStr,
        status: filterStatus
    })

    const [updateTaskStatus, { error: updateTaskError }] = useAuthGQLMutation(
        UPDATE_TODO_STATUS,
        [
            {
                query: GET_FILTERED_TODOS,
                variables: { search: filterStr, status: filterStatus }
            }
        ]
    )

    const [deleteTask, { error: deleteTaskError }] = useAuthGQLMutation(
        DELETE_TODO,
        [
            {
                query: GET_FILTERED_TODOS,
                variables: { search: filterStr, status: filterStatus }
            }
        ]
    )

    const handleUpdateTaskStatus = (id: string, status: TaskStatus) => {
        updateTaskStatus({
            variables: {
                id,
                status
            },
            update(cache: any, { data: { updateTaskStatus } }: any) {
                console.log('updateTaskStatus', updateTaskStatus)

                const cached = cache.readQuery({
                    query: GET_TODO,
                    variables: { id }
                })

                console.log('cached', cached)

                if (cached) {
                    cache.writeQuery({
                        query: GET_TODO,
                        variables: { id },
                        data: {
                            task: Object.assign(
                                {},
                                cached.task,
                                updateTaskStatus
                            )
                        }
                    })
                }
            }
        })
    }

    if (loading) {
        return <Header2>Loading...</Header2>
    }

    let error: ApolloError | undefined = getTasksError
        ? getTasksError
        : updateTaskError
          ? updateTaskError
          : deleteTaskError
            ? deleteTaskError
            : undefined

    if (error) {
        return (
            <>
                <ErrorBlock>{error.message}</ErrorBlock>
            </>
        )
    }

    return (
        <>
            <Header2>Todo list</Header2>

            {(!data.tasks || data.tasks.length == 0) && (
                <Paragraph>No tasks found</Paragraph>
            )}

            {data.tasks &&
                data.tasks.length > 0 &&
                data.tasks.map((task: TodoItem) => (
                    <Div
                        key={task.id}
                        className='items-center justify-start sm:flex'
                    >
                        <div className='h-9'>
                            {task.status == 'DONE' && (
                                <LnkColored href={`/task/${task.id}`}>
                                    <LineThrough>{task.title}</LineThrough>
                                </LnkColored>
                            )}
                            {(task.status == 'OPEN' ||
                                task.status == 'IN_PROGRESS') && (
                                <LnkColored href={`/task/${task.id}`}>
                                    {task.title}
                                </LnkColored>
                            )}
                        </div>

                        <div className='flex h-9 items-center justify-start'>
                            {(task.status == 'OPEN' ||
                                task.status == 'IN_PROGRESS') && (
                                <>
                                    {' '}
                                    <ButtonSimple
                                        title='Done task'
                                        onClick={() => {
                                            handleUpdateTaskStatus(
                                                task.id,
                                                'DONE'
                                            )
                                        }}
                                    >
                                        <Icon
                                            Svg={CheckIcon}
                                            className='mr-2'
                                        />
                                    </ButtonSimple>
                                </>
                            )}

                            {task.status == 'IN_PROGRESS' && (
                                <>
                                    <IconStatic
                                        Svg={ClockIcon}
                                        className='mr-2'
                                    />
                                </>
                            )}

                            {task.status == 'OPEN' && (
                                <>
                                    <ButtonSimple
                                        title='Start task'
                                        onClick={() => {
                                            handleUpdateTaskStatus(
                                                task.id,
                                                'IN_PROGRESS'
                                            )
                                        }}
                                    >
                                        <Icon
                                            Svg={ClockIcon}
                                            className='mr-2'
                                        />
                                    </ButtonSimple>
                                </>
                            )}

                            <ButtonSimple
                                title='Delete task'
                                onClick={() => {
                                    deleteTask({
                                        variables: {
                                            id: task.id
                                        }
                                    })
                                }}
                            >
                                <Icon Svg={TrashIcon} className='mr-2' />
                            </ButtonSimple>
                        </div>
                    </Div>
                ))}
        </>
    )
}

export default memo(TodoList)
