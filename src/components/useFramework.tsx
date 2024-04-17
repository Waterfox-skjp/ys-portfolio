import Image from 'next/image'
import frameworkData from '@/store/framework.json'
import dynamic from 'next/dynamic'

const Tooltip = dynamic(() =>
  import('react-tooltip').then((res) => res.Tooltip)
)

type Props = {
  useFramework: string[]
}

type FrameworkItem = {
  id: number
  name: string
  src: string
}

export default function useFramework( { useFramework } : Props ) {
  const frameworkItems = frameworkData.item

  // ID順に並び替える
  const useFrameworkSort: FrameworkItem[] = []
  useFramework.map((value)=>{
    const frameworkItem = frameworkItems.find((item) => item.name === value)
    if (frameworkItem) {
      useFrameworkSort.push(frameworkItem)
    }
  })
  useFrameworkSort.sort((a, b) => a.id - b.id)

  return (
    <>
      <ul className="p-article__contents-framework">
        {useFrameworkSort.map((value) => {
          return (
            <li key={value.id}>
              <Image
                src={value.src}
                alt=""
                width="50"
                height="50"
                data-tooltip-id="fw-tooltip"
                data-tooltip-content={value.name}
                data-tooltip-place="bottom" />
            </li>
          )
        })}
      </ul>
      <Tooltip id="fw-tooltip" />
    </>
  )
}
