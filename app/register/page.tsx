import { Metadata } from 'next'
import RegisterForm from '../components/partials/RegisterForm'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Register',
    description: 'Register page'
}

export default async function Page() {

    return (
        <>
            <RegisterForm />
        </>
    )
}
