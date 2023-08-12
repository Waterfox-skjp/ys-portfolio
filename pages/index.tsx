import React, { useRef, useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link"
import { type } from 'os'
import * as THREE from 'three'
import { Link as Scroll } from 'react-scroll'
import Gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { client } from '../libs/client'
import WAVES from 'vanta/dist/vanta.waves.min.js'
import styles from '../styles/Home.module.scss'
import Header from '../components/header'
import Footer from '../components/footer'
import SkillList from '../components/skillsList'
import WorksList from '../components/worksList'

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
        // color: 0x5588,
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

    ScrollTrigger.matchMedia({
      '(min-width: 751px)': function () {
        ScrollTrigger.batch('.js-fadein', {
          start: 'top 80%',
          end: 'bottom 20%',
          toggleClass: 'is-animation',
          once: true
        })
      },

      '(max-width: 750px)': function () {
        ScrollTrigger.batch('.js-fadein', {
          start: 'top 80%',
          end: 'bottom 20%',
          toggleClass: 'is-animation',
          once: true
        })
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
          <h1 className="p-mainvisual__title">Yuki Sumida<br/>Portfolio</h1>
          <p className="p-mainvisual__desc">Front-end Engineer</p>
          <Scroll className="p-mainvisual__scroll" to="a-about" smooth={true} duration={500} offset={-100}>
            <div className="p-mainvisual__scroll-mouse"></div>
            <div className="p-mainvisual__scroll-text">Scroll</div>
          </Scroll>
        </section>
        <section className="p-about" id="a-about">
          <div className="l-inner-wrap">
            <div className="c-heading">
              <h2 className="c-heading__en">About</h2>
              <div className="c-heading__ja">私について</div>
            </div>
            <div className="p-about__box">
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
            <div className="c-heading is-white">
              <h2 className="c-heading__en">Experience</h2>
              <div className="c-heading__ja">経歴</div>
            </div>
            <ul className="p-experience__list">
              <li className="p-experience__item js-fadein">
                <div className="p-experience__item-box">

                </div>
              </li>
              <li className="p-experience__item js-fadein">
                <div className="p-experience__item-box">

                </div>
              </li>
              <li className="p-experience__item js-fadein">
                <div className="p-experience__item-box">

                </div>
              </li>
              <li className="p-experience__item js-fadein">
                <div className="p-experience__item-box">

                </div>
              </li>
            </ul>
          </div>
        </section>
        <section className="p-skills" id="a-skills">
          <div className="l-inner-wrap">
            <div className="c-heading js-fadein">
              <h2 className="c-heading__en">Skills</h2>
              <div className="c-heading__ja">スキル</div>
            </div>
            <SkillList />
          </div>
        </section>
        <section className="p-works" id="a-works">
          <div className="l-inner-wrap">
            <div className="c-heading is-white">
              <h2 className="c-heading__en">Works</h2>
              <div className="c-heading__ja">制作物</div>
            </div>
            <WorksList works={works} category={category} />
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  )
}
