import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { AppDispatch, RootState } from './store'
import { DocumentNode } from 'graphql'
import { ApolloError, useMutation, useQuery } from '@apollo/client'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAuthGQLQuery = (doc: DocumentNode, vars: {} = {}) => {
    const { accessToken } = useAppSelector(state => state.app)

    const { data, loading, error } = useQuery(doc, {
        context: {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        },
        variables: { ...vars }
    })

    return { data, loading, error }
}

export const useAuthGQLMutation = (
    doc: DocumentNode,
    refetchQueries: Array<{
        query: DocumentNode
        variables: any
    }> = []
): [any, { data: any; loading: any; error: ApolloError | undefined }] => {
    const { accessToken } = useAppSelector(state => state.app)

    const rQueries = refetchQueries.map(q => {
        return Object.assign({}, q, {
            context: { headers: { authorization: `Bearer ${accessToken}` } }
        })
    })

    const [funcMutate, { data, loading, error }] = useMutation(doc, {
        context: {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        },
        refetchQueries: [...rQueries]
    })

    return [funcMutate, { data, loading, error }]
}
