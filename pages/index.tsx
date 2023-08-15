import React, { useRef, useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import * as THREE from 'three'
import { Link as Scroll } from 'react-scroll'
import Gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { client } from '../libs/client'
import WAVES from 'vanta/dist/vanta.waves.min.js'
import Header from '../components/header'
import Footer from '../components/footer'
import SkillList from '../components/skillsList'
import WorksList from '../components/worksList'
import Heading from '../components/heading'

import type { Works, Category } from '../types/works'

// microCMSへAPIリクエスト
export const getStaticProps = async () => {
  const works = await client.get({ endpoint: "works" })
  const categories = await client.get({ endpoint: "categories" })

  return {
    props: {
      works: works.contents,
      category: categories.contents,
    },
  }
};

// ScrollTriggerの初期化
Gsap.registerPlugin(ScrollTrigger);
Gsap.config({
  nullTargetWarn: false,
});

// Props（blogsとtags）の型
type Props = {
  works: Works[]
  category: Category[]
}

export default function Home({
  works,
  category,
}: Props) {
  const [vantaEffect, setVantaEffect] = useState<any>(0)
  const vantaRef = useRef(null)
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(WAVES({
        el: vantaRef.current,
        THREE,
        color: 0x003775,
        shininess: 30,
        waveHeight: 15,
        waveSpeed: 1,
        zoom: 1,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00
      }))
    }

    const aniConfigPC = {
      start: 'top 80%',
      end: 'bottom 20%',
      toggleClass: 'is-animation',
      once: true
    }

    const aniConfigSP = {
      start: 'top 90%',
      end: 'bottom 10%',
      toggleClass: 'is-animation',
      once: true
    }

    ScrollTrigger.matchMedia({
      '(min-width: 751px)': function () {
        ScrollTrigger.batch('.js-fadeinup-small', aniConfigPC)
        ScrollTrigger.batch('.js-fadeinup-middle', aniConfigPC)
        ScrollTrigger.batch('.js-fadeinup-large', aniConfigPC)
        ScrollTrigger.batch('.js-fadeinup-text', aniConfigPC)
        ScrollTrigger.batch('.js-fadeinup-title', aniConfigPC)
        ScrollTrigger.batch('.js-fadeinup-desc', aniConfigPC)
        ScrollTrigger.batch('.js-fadein-experience', aniConfigPC)
      },

      '(max-width: 750px)': function () {
        ScrollTrigger.batch('.js-fadeinup-small', aniConfigSP)
        ScrollTrigger.batch('.js-fadeinup-middle', aniConfigSP)
        ScrollTrigger.batch('.js-fadeinup-large', aniConfigSP)
        ScrollTrigger.batch('.js-fadeinup-text', aniConfigSP)
        ScrollTrigger.batch('.js-fadeinup-title', aniConfigSP)
        ScrollTrigger.batch('.js-fadeinup-desc', aniConfigSP)
        ScrollTrigger.batch('.js-fadein-experience', aniConfigSP)
      },
    });

    return () => {
      if (vantaEffect) vantaEffect.destory()
    }
  }, [vantaEffect])

  return (
    <div className="l-wrap">
      <Head>
        <title>Yuki Sumida Portfolio</title>
        <meta name="description" content="My portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <main className="l-main">
        <div className="p-polygon-bg" ref={vantaRef}></div>
        <section className="p-mainvisual">
          <h1 className="p-mainvisual__title">
            <span className="js-fadeinup-title"><span>Y</span><span>u</span><span>k</span><span>i</span> <span>S</span><span>u</span><span>m</span><span>i</span><span>d</span><span>a</span></span>
            <span className="js-fadeinup-title"><span>P</span><span>o</span><span>r</span><span>t</span><span>f</span><span>o</span><span>l</span><span>i</span><span>o</span></span>
          </h1>
          <p className="p-mainvisual__desc js-fadeinup-desc"><span>Front-end</span> <span>Engineer</span></p>
          <Scroll className="p-mainvisual__scroll" to="a-about" smooth={true} duration={500} offset={-100}>
            <div className="p-mainvisual__scroll-mouse"></div>
            <div className="p-mainvisual__scroll-text">Scroll</div>
          </Scroll>
        </section>
        <section className="p-about" id="a-about">
          <div className="l-inner-wrap">
            <Heading en="About" ja="私について" addClass="" />
            <div className="p-about__box js-fadeinup-middle">
              <div className="p-about__visual">
                <Image src="/images/img-portrait.webp" alt="" width={250} height={250} className="p-about__visual-img" />
              </div>
              <div className="p-about__contents">
                <p className="p-about__contents-text">テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</p>
                <dl className="p-about__contents-list">
                  <dt>年齢</dt>
                  <dd>26歳</dd>
                  <dt>趣味</dt>
                  <dd>ツーリング・ドライブ・カメラ・ラジオ</dd>
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
                  <p className="p-experience__item-desc">Webサイトのリニューアルや新規構築など、受託開発をメインに担当。その他月次作業などの保守運用も担当。</p>
                </div>
              </li>
              <li className="p-experience__item js-fadein-experience">
                <div className="p-experience__item-box">
                  <div className="p-experience__item-label">2021/02～</div>
                  <h3 className="p-experience__item-name">店舗流通ネット株式会社</h3>
                  <p className="p-experience__item-post">フロントエンドエンジニア</p>
                  <p className="p-experience__item-desc">自社Webサイトのリニューアルや新規構築、保守運用などインハウス業務をメインに担当。その他取引先からの受託開発なども担当。</p>
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
            <Image src="images/logo-github.svg" alt="" width={50} height={50} />
          </Link>
        </div>
      </main>
      <Footer/>
    </div>
  )
}
