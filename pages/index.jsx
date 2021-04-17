import Head from "next/head"

import Layout from '../components/Layout'
import PostItem from '../components/PostItem'
import LanguageDropdown from '../components/LanguageDropdown'
import TagList from '../components/TagList'

import { fetchAllPostContent } from '../lib/posts'
import { getAllLanguages, getAllTags } from '../lib/meta'

import { useRouter } from 'next/router'

export default function Index({ posts, languages, tags }) {
    const router = useRouter()
    const query = router.query

    if (query.language && query.language !== 'all') {
        posts = posts.filter(post => {
            return post.data.language === query.language
        })
    }

    if (query.tag) {
        posts = posts.filter(post => {
            return post.data.tags.filter(tag => {
                return tag.slug === query.tag
            }).length
        })
    }

    return (
        <>
            <Head>
                <title>Risan's Blog</title>
            </Head>
            <Layout>
                <main>
                    {/* Languages & tags section */}
                    <section className={"flex"}>

                        {/* Languages */}
                        <LanguageDropdown languages={languages} />

                        {/* Tags */}
                        <img
                            className={"bg-indigo-50 rounded-l p-1"}
                            src="/img/tag.svg" height={25} width={25}
                        />
                        <TagList tags={tags} />
                    </section>

                    {/* Posts */}
                    <section className={"mt-16"}>
                        {!!posts.length && (
                            <ul>
                                {posts.map((post, idx) => {
                                    return <li
                                        className={"mt-8"}
                                        key={idx}
                                    >
                                        <PostItem post={post} />
                                    </li>
                                })}
                            </ul>
                        )}

                        {!posts.length && (
                            <p className={"text-center"}
                            >No posts found.</p>
                        )}
                    </section>
                </main>
            </Layout>
        </>
    )
}

export async function getStaticProps() {
    const posts = await fetchAllPostContent()
    const tags = await getAllTags()
    let languages = await getAllLanguages()

    languages.push({ slug: 'all', name: 'All' })

    return {
        props: {
            posts, languages, tags
        }
    }
}