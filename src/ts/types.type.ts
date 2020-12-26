export interface ISite {
  id?: string
  name: string
  link: string
  authorId: string
  createdAt: string
}

export interface IFeedback {
  id?: string
  author: string
  authorId: string
  createdAt: string
  provider: string
  rating: number
  siteId: string
  status: 'active' | 'pending' | 'removed'
  text: string
}
