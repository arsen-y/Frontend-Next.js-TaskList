import ViewTask from '@/app/components/partials/ViewTask';

export const generateStaticParams = async () => {
    const posts: Array<{ slug: Array<string>; content: string }> = [
        { slug: ['test'], content: '12345' }
    ]

    return posts.map(post => ({ slug: [...post.slug] }))
}

interface Props {
    params: { slug: Array<string> }
}

export default async function Page({ params }: Props) {
    const { slug } = params

    return (
        <>
            <ViewTask taskId={slug[0]} />
        </>
    )
}
