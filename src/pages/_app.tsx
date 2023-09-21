import React, { useEffect } from 'react'
import { Noto_Sans_JP, Ubuntu } from 'next/font/google'
import type { AppProps } from 'next/app'
import 'material-icons/iconfont/outlined.css'
import '../styles/style.scss'

const notoSansJP = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  display: 'swap',
  preload: false,
})

const ubuntu = Ubuntu({
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

const FONT_FAMILY_ROOT = `
:root {
  --font-ja-primary: ${notoSansJP.style.fontFamily};
  --font-en-primary: ${ubuntu.style.fontFamily};
}
`

export default function App( { Component, pageProps } : AppProps ) {
  useEffect(() => {
    const threeScript = document.createElement('script')
    threeScript.setAttribute('id', 'threeScript')
    threeScript.setAttribute(
      'src',
      'https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js'
    )
    document.getElementsByTagName('head')[0].appendChild(threeScript)
    return () => {
      if (threeScript) {
        threeScript.remove()
      }
    }
  }, [])
  return (
    <>
      <style jsx global>{FONT_FAMILY_ROOT}</style>
      <Component {...pageProps} />
    </>
  )
}
