import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import WAVES from 'vanta/dist/vanta.waves.min.js'

export default function Polygon() {
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
    return () => {
      if (vantaEffect) vantaEffect.destory()
    }
  }, [vantaEffect])
  return (
    <>
      <div className="c-polygon-bg" ref={vantaRef}></div>
    </>
  )
}
