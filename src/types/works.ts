export type Works = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  title: string
  content: string
  site_type: string
  category: {
    id: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    revisedAt: string
    name: string
    slug: string
  }
  eyecatch: {
    url: string
    width: number
    height: number
  }
  screenshot: {
    url: string
    width: number
    height: number
  }
  about: string
  url: string
  role: string
  production_time: string
  used_framework: string[]
}

export type Eyecatch = {
  url: string
  width: number
  height: number
}

export type Category = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  name: string
  slug: string
}
