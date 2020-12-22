export interface ISite {
  id?: string
  name: string
  link: string
  authorId: string
  createdAt: string
}

export enum FeedbackStatus {
  PENDING,
}

export interface IFeedback {
  id?: string
  author: string
  authorId: string
  createdAt: string
  provider: string
  rating: number
  siteId: string
  status: string
  text: string
}
