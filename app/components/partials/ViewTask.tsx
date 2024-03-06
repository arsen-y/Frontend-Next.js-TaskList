'use client'

import {
    GET_TODO,
} from '@/lib/apollo-api/todos'
import ErrorBlock from '../ui/ErrorBlock'
import { useAuthGQLQuery } from '@/lib/hooks'
import Paragraph from '../ui/Paragraph'
import Header1 from '../ui/Header1'
import Header2 from '../ui/Header2'
import { memo } from 'react'

interface Props {
    taskId: string
}

const ViewTask = ({taskId}: Props) => {

    const { data, loading, error } = useAuthGQLQuery(GET_TODO, { id: taskId })

    if (loading) {
        return <Header2>Loading...</Header2>
    }
    
    if (error) {
        return (
            <>
                <ErrorBlock>{error.message}</ErrorBlock>
            </>
        )
    }

    if (!data.task || !data.task.title) {
        return <Header1>Task not found</Header1>
    }

    return (
        <>
            <Header1>{data.task.title}</Header1>
            <Paragraph>Status: {data.task.status}</Paragraph>
            <Paragraph>{data.task.description}</Paragraph>
        </>
    )
}

export default memo(ViewTask)
