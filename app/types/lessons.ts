export interface BaseContent {
  title: string
  icon: string
}

export interface Question {
  question: string
  options: string[]
  answer: string
}

export interface LessonStep extends BaseContent {
  content: string
  color: string
}

export interface BaseLesson extends BaseContent {
  xp: number
  level: string
}

export interface Lesson extends BaseLesson {
  slug: string
  adventureSlug: string
  category: string
  color: string
  status?: 'completed' | 'current' | 'locked'
  steps: LessonStep[]
  quiz: Question[]
}

export interface LessonBankItem extends BaseLesson {
  content: string
  quizQ: string
  quizOpts: string[]
  quizA: string
}
