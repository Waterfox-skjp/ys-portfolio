import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import nl2br from 'react-nl2br'
import { client } from '../../libs/client'
import Header from '../../components/headerChild'
import Polygon from '../../components/polygon'
import Footer from '../../components/footer'
import UseFramework from '../../components/useFramework'
import type { Works } from '../../types/works'

// APIリクエストを行うパスを指定
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: 'works' })

  const paths = data.contents.map((content: Works) => `/works/${content.id}`)
  return { paths, fallback: false }
}

// microCMSへAPIリクエスト
export const getStaticProps = async (context: any) => {
  const id = context.params.id
  const data = await client.get({ endpoint: 'works', contentId: id })

  return {
    props: {
      works: data,
    },
  }
}

// Props（blog）の型
type Props = {
  works: Works
}

export default function BlogId({ works }: Props) {
  const screenshotRatio = works.screenshot.height / works.screenshot.width
  return (
    <>
      <Head>
        <title>{`${works.title} | 制作物 | Yuki Sumida Portfolio`}</title>
        <meta name="description" content="My portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="l-main">
        <Polygon />
        <section className="p-mainvisual">
          <div className="l-inner-wrap">
            <div className="p-mainvisual__wrap">
              <h1 className="p-mainvisual__title">{works.title}</h1>
              <p className="p-mainvisual__type">{works.site_type}</p>
            </div>
          </div>
        </section>
        <section className="p-article">
          <div className="l-inner-column">
            <div className={`p-article__screenshot${screenshotRatio >= 2 ? ' is-omission' : ''}`}>
              <Image src={works.screenshot.url} alt="" width={works.screenshot.width} height={works.screenshot.height} className="p-article__screenshot-img" />
            </div>
            <div className="p-article__contents">
              <section className="p-article__contents-wrap">
                <h2 className="p-article__contents-heading">概要</h2>
                <p className="p-article__contents-text">{nl2br(works.about)}</p>
              </section>
              <section className="p-article__contents-wrap">
                <h2 className="p-article__contents-heading">URL</h2>
                <p className="p-article__contents-text">
                  {works.url
                    ? <a href={works.url} target="_blank" rel="noopener noreferrer">{works.url}</a>
                    : '非公開'
                  }
                </p>
              </section>
              <section className="p-article__contents-wrap">
                <h2 className="p-article__contents-heading">担当</h2>
                <p className="p-article__contents-text">{works.role}</p>
              </section>
              <section className="p-article__contents-wrap">
                <h2 className="p-article__contents-heading">制作期間</h2>
                <p className="p-article__contents-text">{works.production_time}</p>
              </section>
              <section className="p-article__contents-wrap">
                <h2 className="p-article__contents-heading">使用フレームワークなど</h2>
                <UseFramework useFramework ={works.used_framework} />
              </section>
            </div>
          </div>
        </section>
        <div className="p-navigation">
          <div className="l-inner-wrap">
            <Link href="/" className="c-button is-back">TOPへ戻る</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
