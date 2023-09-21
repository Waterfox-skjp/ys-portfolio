import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function HeaderChild() {
  const [isFixed, setIsFixed] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const toggleFixed = () => {
    window.scrollY > 0
      ? setIsFixed(true)
      : setIsFixed(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleFixed)
    return () => {
      window.removeEventListener('scroll', toggleFixed)
    }
  }, [])

  return (
    <>
      <header className={`l-header${isFixed ? ' is-fixed' : ''}${isOpen ? ' is-open' : ''}`}>
        <div className="l-header__inner">
          <div className="l-header__logo">
            <Link href="/" className="l-header__logo-link">
              <Image src="/images/logo.svg" alt="Su" width="50" height="50" className="l-header__logo-img" />
            </Link>
          </div>
          <nav className="l-header__nav">
            <ul className="l-header__nav-list">
              <li className="l-header__nav-item">
                <Link href="/#a-about" className="l-header__nav-link" scroll={false}>About</Link>
              </li>
              <li className="l-header__nav-item">
                <Link href="/#a-experience" className="l-header__nav-link" scroll={false}>Experience</Link>
              </li>
              <li className="l-header__nav-item">
                <Link href="/#a-skills" className="l-header__nav-link" scroll={false}>Skills</Link>
              </li>
              <li className="l-header__nav-item">
                <Link href="/#a-works" className="l-header__nav-link" scroll={false}>Works</Link>
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
