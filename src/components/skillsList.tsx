import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import skillData from '@/store/skill.json'

type SkillItem = {
  id: number
  name: string
  src: string
  itemclass: string
}

export default function SkillList() {
  const [skill, setSkill] = useState<any>([])
  const [allSkillFlag, setAllSkillFlag] = useState<boolean>(false)
  useEffect(()=>{
    const skillItems = skillData.item
    if (allSkillFlag) {
      setSkill(skillItems)
      return
    }
    const omissionSkills = skillItems.filter((item, index) => { return index < 12 })
    setSkill(omissionSkills)
  }, [allSkillFlag])

  return (
    <>
      <div className="js-fadeinup-large">
        <motion.ul className="p-skills__list">
          <AnimatePresence>
            {skill.map((item: SkillItem) => (
              <motion.li className={'p-skills__item' + item.itemclass} key={item.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{
                duration: 0.8,
                ease: [0, 0.71, 0.2, 1.01]
              }}
            >
              <div className="p-skills__item-icon"><Image src={item.src} alt="" width="87" height="87" /></div>
              <p className="p-skills__item-name">{item.name}</p>
            </motion.li>
          ))}
          </AnimatePresence>
        </motion.ul>
        <button className="c-button is-more" onClick={() => setAllSkillFlag(!allSkillFlag)}>{allSkillFlag ? 'Close' : 'More'}</button>
      </div>
    </>
  )
}
