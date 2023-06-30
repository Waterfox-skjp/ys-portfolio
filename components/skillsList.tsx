import { useEffect, useState } from 'react'
import skillData from './skill.json'
import { motion, AnimatePresence } from 'framer-motion'

export default function SkillList() {
  const [skill, setSkill] = useState<any>([])
  const [allSkillFlag, setAllSkillFlag] = useState<boolean>(false)
  useEffect(()=>{
    const skills = skillData.item
    if (allSkillFlag) {
      setSkill(skills)
      return
    }
    const omissionSkills = skills.filter((item, index) => { return index < 10 })
    setSkill(omissionSkills)
  }, [allSkillFlag])

  return (
    <>
      <motion.ul className="p-skills__list">
        <AnimatePresence>
        {skill.map((item:any) => (
          <motion.li className="p-skills__item" key={item.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{
              duration: 0.8,
              ease: [0, 0.71, 0.2, 1.01]
            }}
          >
            {item.name}
          </motion.li>
        ))}
        </AnimatePresence>
      </motion.ul>
      <button onClick={() => setAllSkillFlag(!allSkillFlag)}>押す</button>
    </>
  );
}
