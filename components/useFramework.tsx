import Image from 'next/image'
import frameworkData from '../store/framework.json'

type Props = {
  useFramework: string[]
}

export default function useFramework( { useFramework } : Props ) {
  const frameworkItems = frameworkData.item
  return (
    <ul className="p-article__contents-framework">
      {useFramework.map((value) => {
        const frameworkItem = frameworkItems.find((item) => item.name === value)
        return (
          <li key={frameworkItem?.id}>
            <Image src={frameworkItem?.src ? frameworkItem?.src : ''} alt={frameworkItem?.name ? frameworkItem?.name : ''} width="50" height="50" />
          </li>
        )
      })}
    </ul>
  )
}
