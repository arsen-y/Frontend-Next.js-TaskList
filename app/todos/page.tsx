import { Metadata } from 'next'
import Header1 from '../components/ui/Header1'
import TodoList from '../components/partials/TodoList'
import FilterTasksForm from '../components/partials/FilterTasksForm'
import VStack from '../components/ui/VStack'
import AddTodoForm from '../components/partials/AddTodoForm'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Todo list',
    description: 'Todo list'
}

export default async function Page() {
    
    return (
        <VStack>
            <Header1>Todos</Header1>

            <AddTodoForm />

            <FilterTasksForm />

            <TodoList />
        </VStack>
    )
}
