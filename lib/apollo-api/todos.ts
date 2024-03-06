import { gql } from '@apollo/client'

export const GET_FILTERED_TODOS = gql`
    query ($search: String, $status: String) {
        tasks: getTasks(filterInput: { search: $search, status: $status }) {
            title
            description
            status
            id
        }
    }
`

export const UPDATE_TODO_STATUS = gql`
    mutation updateTaskStatus($id: String!, $status: String!) {
        updateTaskStatus(updateTaskStatusInput: { id: $id, status: $status }) {
            title
            status
        }
    }
`

export const DELETE_TODO = gql`
    mutation deleteTaskById($id: String!) {
        deleteTaskById(id: $id) {
            title
            status
        }
    }
`

export const ADD_TODO = gql`
    mutation createTask($title: String!, $description: String!) {
        createTask(
            createTaskInput: { title: $title, description: $description }
        ) {
            title
            description
            status
        }
    }
`
export const GET_TODO = gql`
    query getTaskById($id: String!) {
        task: getTaskById(id: $id) {
            title
            description
            status
        }
    }
`
