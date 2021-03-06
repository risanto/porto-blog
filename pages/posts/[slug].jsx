import { getAllPostIds, getPostData } from '../../lib/posts'
import { getAuthor, getLanguage, getTags } from '../../lib/meta'

import Layout from '../../components/Layout'
import TagList from '../../components/TagList'
import JobHuntChart from '../../components/JobHuntChart'
import Link from '../../components/MDXLink'

import { useEffect, useState } from 'react'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import Image from 'next/image'

const components = { JobHuntChart, a: (props) => <Link {...props} /> }

export default function Post(props) {
    const { postData } = props

    function formatImgSrc(thumbnail) {
        return thumbnail.includes('http')
            ? thumbnail : `/${thumbnail}`
    }

    let date = new Date(postData.date)
    date = date.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' })

    // When the user clicks on the button, scroll to the top of the document
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const [scrollPosition, setScrollPosition] = useState(0)

    // Calculates the scroll distance
    function calculateScrollDistance() {
        const scrollTop = window.pageYOffset
        const windowHeight = window.innerHeight

        const docHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        )

        const totalDocScrollLength = docHeight - windowHeight

        setScrollPosition(Math.floor(scrollTop / totalDocScrollLength * 100))
    }

    // Only show button when the scroll position is more than 0%
    function setScrollToTopBtnDisplay() {
        const scrollToTopBtn = document.getElementById("scrollToTopBtn")

        if (scrollPosition > 0) {
            scrollToTopBtn.style.display = "block"
        } else {
            scrollToTopBtn.style.display = "none"
        }
    }

    // Listen to page scroll
    function listenToScrollEvent() {
        // Calculate scroll distance
        document.addEventListener("scroll", () => {
            requestAnimationFrame(() => {
                calculateScrollDistance()
            })
        })

        // Set scrollPosition as progress bar's height
        document.getElementById("progressBar").style.height = scrollPosition + "%"
    }

    useEffect(() => {
        let mounted = true

        if (mounted) {
            setScrollToTopBtnDisplay()
            listenToScrollEvent()
        }

        return mounted = false
    }, [scrollPosition])

    return (
        <Layout
            pageTitle={postData.title}
            description={postData.description}
            previewImage={postData.thumbnail}
            siteName={"risan.dev"}
        >
            <header className={"-mb-4"}>
                <h1 className={"text-3xl font-bold"}>{postData.title}</h1>

                <div className={"my-4 flex justify-between"}>
                    <h6>{postData.author.name} / {date}</h6>
                    <h6>{postData.readingTime.text}</h6>
                </div>

                <Image
                    width={640} height={357}
                    src={formatImgSrc(postData.thumbnail)}
                />

                <div className={"pt-2 relative -top-6 -right-1"}>
                    <TagList tags={postData.tags} rowReverse={true} withBackground={true} />
                </div>
            </header>
            <article
                className={"cms-content"}
            >
                <MDXRemote {...postData.content} components={components} />
            </article>
            <button
                style={{ display: 'none' }}
                id={"scrollToTopBtn"}
                className={"h-8 w-8 fixed bottom-5 left-5 bg-white shadow rounded"}
                onClick={scrollToTop}
            >
                <div
                    id={"progressBar"}
                    className={"bg-indigo-100 absolute bottom-0 w-full rounded"}
                >
                </div>
                <img
                    id={"progressBar"}
                    className={"fixed bottom-6 left-6"}
                    src={"/img/arrow-up.svg"}
                />
            </button>
        </Layout>
    )
}

export async function getStaticProps({ params }) {
    let postData = await getPostData(params.slug)
    postData.author = getAuthor(postData.author)
    postData.language = getLanguage(postData.language)
    postData.tags = getTags(postData.tags)
    postData.content = await serialize(postData.content)

    return {
        props: { postData }
    }
}

export async function getStaticPaths() {
    return {
        paths: getAllPostIds(),
        fallback: false
    }
}