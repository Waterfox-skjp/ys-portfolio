import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Link as Scroll } from 'react-scroll' // LinkコンポーネントをScrollと名前を変えて読み込んでいる理由は、next/linkのLinkと混在するため

export default function Header() {
  const [isFixed, setIsFixed] = useState(false)

  const toggleFixed = () => {
    window.scrollY > 0
      ? setIsFixed(true)
      : setIsFixed(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleFixed)
    return () => window.removeEventListener('scroll', toggleFixed)
  }, [])

  return (
    <>
      <header className={isFixed ? 'l-header is-fixed' : 'l-header'}>
        <div className="l-header__inner">
          <div className="l-header__logo">
            <Link href="/" className="l-header__logo-link">
              <Image src="images/logo.svg" alt="Su" width={50} height={50} />
            </Link>
          </div>
          <nav className="l-header__nav">
            <ul className="l-header__nav-list">
              <li className="l-header__nav-item">
                <Scroll className="l-header__nav-link" activeClass="is-active" to="a-about" spy={true} smooth={true} duration={500} offset={-100}>About</Scroll>
              </li>
              <li className="l-header__nav-item">
                <Scroll className="l-header__nav-link" activeClass="is-active" to="a-experience" spy={true} smooth={true} duration={500} offset={-100}>Experience</Scroll>
              </li>
              <li className="l-header__nav-item">
                <Scroll className="l-header__nav-link" activeClass="is-active" to="a-skills" spy={true} smooth={true} duration={500} offset={-100}>Skills</Scroll>
              </li>
              <li className="l-header__nav-item">
                <Scroll className="l-header__nav-link" activeClass="is-active" to="a-works" spy={true} smooth={true} duration={500} offset={-100}>Works</Scroll>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}
