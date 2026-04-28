import type { BaseContent } from './lessons'

export interface AdventureGoal extends BaseContent {
  description: string
  color: string
}

export interface Adventure extends BaseContent {
  slug: string
  category: string
  description: string
  longDescription: string
  progress: number
  color: string
  blob: string
  badge: string
  lessons: number
  time: string
  startContent: {
    tagline: string
    goals: AdventureGoal[]
  }
}

export interface Category {
  name: string
  icon: string
}
