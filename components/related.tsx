import Link from 'next/link'

type Props = {
  prev: {
    id: string
    title: string
  }
  next: {
    id: string
    title: string
  }
}

export default function Related( { prev, next }: Props ) {
  return (
    <>
      <div className="p-article__related">
        <ul className="p-article__related-list">
          {
            prev != null
              ? <li className="p-article__related-item is-prev">
                  <Link href={`/works/${prev.id}`} className="c-button is-prev">前の制作物</Link>
                </li>
              : ''
          }
          {
            next != null
              ? <li className="p-article__related-item is-next">
                  <Link href={`/works/${next.id}`} className="c-button is-next">次の制作物</Link>
              </li>
              : ''
          }
        </ul>
      </div>
    </>
  )
}
