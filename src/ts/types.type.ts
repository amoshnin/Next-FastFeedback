export interface ISite {
  id?: string
  name: string
  link: string
  authorId: string
  createdAt: string
}

enum FeedbackStatus {
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
  status: FeedbackStatus
  text: string
}
