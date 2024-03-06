import Link from 'next/link'
import Header1 from '../components/ui/Header1'
import Paragraph from '../components/ui/Paragraph'

export default async function Page() {

    return (
        <>
            <Header1>About</Header1>

            <Paragraph>
                This is the next.js app with typescript, tailwind, app router,
                redux, graphql apollo.
            </Paragraph>

            <Paragraph>
                Written by Arseny Sokolovskiy, telegram:{' '}
                <a target='_blank' href='https://t.me/Arsenyy007'>
                    Arsenyy007
                </a>
            </Paragraph>
        </>
    )
}
