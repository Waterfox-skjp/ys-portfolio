import React, { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { client } from '@/libs/client'
import Header from '@/components/header'
import Polygon from '@/components/polygon'
import Heading from '@/components/heading'
import SkillList from '@/components/skillsList'
import WorksList from '@/components/worksList'
import Footer from '@/components/footer'
import type { Works, Category } from '@/types/works'

// Props（blogsとtags）の型
type Props = {
  works: Works[]
  category: Category[]
}

// microCMSへAPIリクエスト
export const getStaticProps = async () => {
  const works = await client.get({ endpoint: 'works', queries: { limit: 100 } })
  const categories = await client.get({ endpoint: 'categories' })

  return {
    props: {
      works: works.contents,
      category: categories.contents,
    },
  }
}

// ScrollTriggerの初期化
Gsap.registerPlugin(ScrollTrigger)
Gsap.config({
  nullTargetWarn: false,
})

export default function Home( { works, category } : Props ) {
  useEffect(() => {
    const animeHook = [
      'js-fadeinup-small',
      'js-fadeinup-middle',
      'js-fadeinup-large',
      'js-fadeinup-text',
      'js-fadeinup-title',
      'js-fadeinup-desc',
      'js-fadein-experience'
    ]
    ScrollTrigger.matchMedia({
      '(min-width: 751px)': function () {
        animeHook.forEach(value => {
          ScrollTrigger.batch('.' + value, {
            start: 'top 80%',
            end: 'bottom 20%',
            toggleClass: 'is-animation',
            once: true
          })
        })
      },
      '(max-width: 750px)': function () {
        animeHook.forEach(value => {
          ScrollTrigger.batch('.' + value, {
            start: 'top 90%',
            end: 'bottom 10%',
            toggleClass: 'is-animation',
            once: true
          })
        })
      },
    })
  })

  return (
    <>
      <Head>
        <title>Yuki Sumida Portfolio</title>
        <meta name="description" content="My portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="l-main">
        <Polygon />
        <section className="p-hero">
          <h1 className="p-hero__title">
            <span className="js-fadeinup-title"><span>Y</span><span>u</span><span>k</span><span>i</span> <span>S</span><span>u</span><span>m</span><span>i</span><span>d</span><span>a</span></span>
            <span className="js-fadeinup-title"><span>P</span><span>o</span><span>r</span><span>t</span><span>f</span><span>o</span><span>l</span><span>i</span><span>o</span></span>
          </h1>
          <p className="p-hero__desc js-fadeinup-desc"><span>Front-end</span> <span>Engineer</span></p>
          <div className="p-hero__scroll">
            <div className="p-hero__scroll-mouse"></div>
            <div className="p-hero__scroll-text">Scroll</div>
          </div>
        </section>
        <section className="p-about" id="a-about">
          <div className="l-inner-wrap">
            <Heading en="About" ja="私について" addClass="" />
            <div className="p-about__box js-fadeinup-middle">
              <div className="p-about__visual">
                <Image src="/images/img-portrait.webp" alt="" width="250" height="250" className="p-about__visual-img" />
              </div>
              <div className="p-about__contents">
                <p className="p-about__contents-text">千葉県松戸市在住の27歳。学生時代から趣味でWeb制作をしており、独学でHTML、CSS、JavaScriptを習得。また、Web制作会社で勤務していた経験からCSSアニメーションやJavaScriptを用いた“動き”のあるサイトの他、Core Web VitalsやセマンティックコーディングといったSEOに直結する分野においても多くの知見を持つ。<br />最近はNext.jsやNuxt.jsといったモダンな開発にも積極的に挑戦。</p>
                <dl className="p-about__contents-list">
                  <dt>趣味</dt>
                  <dd>ツーリング、ドライブ、カメラ、スノーボード</dd>
                </dl>
              </div>
            </div>
          </div>
        </section>
        <section className="p-experience" id="a-experience">
          <div className="l-inner-wrap">
            <Heading en="Experience" ja="経歴" addClass=" is-white" />
            <ul className="p-experience__list">
              <li className="p-experience__item js-fadein-experience">
                <div className="p-experience__item-box">
                  <div className="p-experience__item-label">2017/03</div>
                  <h3 className="p-experience__item-name">国際トラベル・ホテル・ブライダル専門学校 卒業</h3>
                  <p className="p-experience__item-post">鉄道科</p>
                </div>
              </li>
              <li className="p-experience__item js-fadein-experience">
                <div className="p-experience__item-box">
                  <div className="p-experience__item-label">2017/04～</div>
                  <h3 className="p-experience__item-name">東武インターテック株式会社</h3>
                  <p className="p-experience__item-post">川越工場</p>
                  <p className="p-experience__item-desc">鉄道車両の整備に従事。</p>
                </div>
              </li>
              <li className="p-experience__item js-fadein-experience">
                <div className="p-experience__item-box">
                  <div className="p-experience__item-label">2017/10～</div>
                  <h3 className="p-experience__item-name">株式会社インターライフメディア</h3>
                  <p className="p-experience__item-post">フロントエンドエンジニア</p>
                  <p className="p-experience__item-desc">Webサイトの新規構築やリニューアルなど、受託開発をメインに担当。その他月次作業などの保守運用も担当。</p>
                </div>
              </li>
              <li className="p-experience__item js-fadein-experience">
                <div className="p-experience__item-box">
                  <div className="p-experience__item-label">2021/02～</div>
                  <h3 className="p-experience__item-name">店舗流通ネット株式会社</h3>
                  <p className="p-experience__item-post">フロントエンドエンジニア</p>
                  <p className="p-experience__item-desc">自社Webサイトの新規構築やリニューアル、保守運用などインハウス業務をメインに担当。その他取引先からの受託開発なども担当。</p>
                </div>
              </li>
            </ul>
          </div>
        </section>
        <section className="p-skills" id="a-skills">
          <div className="l-inner-wrap">
            <Heading en="Skills" ja="スキル" addClass="" />
            <SkillList />
          </div>
        </section>
        <section className="p-works" id="a-works">
          <div className="l-inner-wrap">
            <Heading en="Works" ja="制作物" addClass=" is-white" />
            <WorksList works={works} category={category} />
          </div>
        </section>
        <div className="p-github">
          <Link href="https://github.com/Waterfox-skjp" target="_blank" rel="noopener" className="p-github__link">
            <Image src="images/logo-github.svg" alt="GitHub" width="50" height="50" />
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
