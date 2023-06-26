import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Works, Category } from '../types/works';    // srcから見た絶対パスで指定

type Props = {
  works: Works[];
  category: Category[];
};

export default function WorksList({
  works,
  category,
}: Props){
  const [filtered, setFiltered] = useState<Works[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');

  useEffect(()=>{
    if(activeCategory === '') {
      setFiltered(works);
      return;
    }
    const filtered = works.filter((item) => { return item.category.slug === activeCategory })
    setFiltered(filtered);
  },[activeCategory]);

  return(
    <>
      <ul className="p-works__filter">
        <li className={activeCategory === '' ? 'p-works__filter-item is-active' : 'p-works__filter-item'}>
          <button className="p-works__filter-btn" onClick={()=>setActiveCategory('')}>ALL</button>
        </li>
        {category.map((item) => (
          <li className={activeCategory === item.slug ? 'p-works__filter-item is-active' : 'p-works__filter-item'} key={item.id}>
            <button className="p-works__filter-btn" onClick={() => setActiveCategory(item.slug)}>{item.name}</button>
          </li>
        ))}
      </ul>
      <motion.ul layout className="p-works__list">
        {filtered.map((item) => (
          <motion.li layout className="p-works__item" key={item.id}>
            {item.title}
            {/* <Link href={`/works/${work.id}`}>
              {item.title}
            </Link> */}
          </motion.li>
        ))}
      </motion.ul>
    </>
  );
}
