import type { BaseContent } from './lessons'

export interface AdventureGoal extends BaseContent {
  description: string
  color: string
}

export interface Adventure extends Omit<BaseContent, 'icon'> {
  slug: string
  category: string
  description: string
  longDescription: string
  progress: number
  icon?: string
  color?: string
  blob?: string
  badge: string
  lessons: number
  time: string
  buttonClass?: string
  startContent: {
    tagline: string
    goals: AdventureGoal[]
  }
}

export interface Category {
  name: string
  icon: string
}
