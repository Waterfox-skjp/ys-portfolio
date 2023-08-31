import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Link as Scroll } from 'react-scroll' // LinkコンポーネントをScrollと名前を変えて読み込んでいる理由は、next/linkのLinkと混在するため

export default function Header() {
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)
  const [isFixed, setIsFixed] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const toggleFixed = () => {
    window.scrollY > 0
      ? setIsFixed(true)
      : setIsFixed(false)
  }

  const handleSetHeight = () => {
    if (ref.current !== null) {
      setHeight(ref.current.offsetHeight)
    }
  }

  useEffect(() => {
    handleSetHeight()
    window.addEventListener('resize', handleSetHeight)
    window.addEventListener('scroll', toggleFixed)
    return () => {
      window.addEventListener('resize', handleSetHeight)
      window.removeEventListener('scroll', toggleFixed)
    }
  }, [])

  return (
    <>
      <header className={`l-header${isFixed ? ' is-fixed' : ''}${isOpen ? ' is-open' : ''}`} ref={ref}>
        <div className="l-header__inner">
          <div className="l-header__logo">
            <Link href="/" className="l-header__logo-link">
              <Image src="images/logo.svg" alt="Su" width={50} height={50} className="l-header__logo-img" />
            </Link>
          </div>
          <nav className="l-header__nav">
            <ul className="l-header__nav-list">
              <li className="l-header__nav-item">
                <Scroll className="l-header__nav-link" activeClass="is-active" to="a-about" spy={true} smooth={true} duration={500} offset={height * -1} onClick={() => setIsOpen(false)}>About</Scroll>
              </li>
              <li className="l-header__nav-item">
                <Scroll className="l-header__nav-link" activeClass="is-active" to="a-experience" spy={true} smooth={true} duration={500} offset={height * -1} onClick={() => setIsOpen(false)}>Experience</Scroll>
              </li>
              <li className="l-header__nav-item">
                <Scroll className="l-header__nav-link" activeClass="is-active" to="a-skills" spy={true} smooth={true} duration={500} offset={height * -1} onClick={() => setIsOpen(false)}>Skills</Scroll>
              </li>
              <li className="l-header__nav-item">
                <Scroll className="l-header__nav-link" activeClass="is-active" to="a-works" spy={true} smooth={true} duration={500} offset={height * -1} onClick={() => setIsOpen(false)}>Works</Scroll>
              </li>
            </ul>
          </nav>
          <button className="l-header__hamburger" onClick={() => setIsOpen(!isOpen)}><span></span><span></span><span></span></button>
          <div className="l-header__bg" onClick={() => setIsOpen(false)}></div>
        </div>
      </header>
    </>
  )
}
