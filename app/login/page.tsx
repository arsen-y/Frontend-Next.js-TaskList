import { Metadata } from 'next'
import LoginForm from '../components/partials/LoginForm'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Login',
    description: 'Login page'
}

export default async function Page() {

    return (
        <>
            <LoginForm />
        </>
    )
}
