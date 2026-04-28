export interface QuizTheme {
    title: string
    emoji: string
    lockedMsg: string
    unlockedMsg: string
}

export interface ExamTheme {
    title: string
    emoji: string
    badge: string
    lockedMsg: string
    unlockedMsg: string
}

export const QUIZ_THEMES: Record<string, QuizTheme> = {
    'space-explorer': { title: 'Space Quiz!', emoji: '🚀', lockedMsg: 'Complete the space lessons above to unlock!', unlockedMsg: 'Test your cosmic knowledge!' },
    'dino-world': { title: 'Dino Quiz!', emoji: '🦕', lockedMsg: 'Finish the dino lessons to unlock!', unlockedMsg: 'Can you name all the dinosaurs?' },
    'math-wizard': { title: 'Spell Check!', emoji: '✨', lockedMsg: 'Master the spells above to unlock!', unlockedMsg: 'Prove your magical math skills!' },
    'art-studio': { title: 'Art Review!', emoji: '🎨', lockedMsg: 'Finish the art lessons to unlock!', unlockedMsg: 'Show off your creative knowledge!' },
    'ocean-deep': { title: 'Ocean Quiz!', emoji: '🐋', lockedMsg: 'Dive through the lessons above first!', unlockedMsg: 'How deep is your ocean knowledge?' },
    'bug-hunter': { title: 'Bug Check!', emoji: '🐛', lockedMsg: 'Explore the bugs above to unlock!', unlockedMsg: 'Can you identify all the critters?' }
}

export const EXAM_THEMES: Record<string, ExamTheme> = {
    'space-explorer': { title: 'Galactic Final!', emoji: '🌌', badge: 'Galactic Voyager', lockedMsg: 'Complete all space lessons to take the final exam.', unlockedMsg: 'Earn your Galactic Voyager badge!' },
    'dino-world': { title: 'Fossil Master Exam!', emoji: '🦴', badge: 'Dino Expert', lockedMsg: 'Complete all dino lessons to take the final exam.', unlockedMsg: 'Earn your Dino Expert badge!' },
    'math-wizard': { title: 'Grand Wizard Trial!', emoji: '🧙', badge: 'Spellcaster', lockedMsg: 'Master all math spells to face the trial.', unlockedMsg: 'Earn your Spellcaster badge!' },
    'art-studio': { title: 'Gallery Showcase!', emoji: '🖼️', badge: 'Master Painter', lockedMsg: 'Complete all art lessons to showcase your work.', unlockedMsg: 'Earn your Master Painter badge!' },
    'ocean-deep': { title: 'Deep Sea Final!', emoji: '🌊', badge: 'Deep Sea Diver', lockedMsg: 'Explore all ocean lessons to take the final dive.', unlockedMsg: 'Earn your Deep Sea Diver badge!' },
    'bug-hunter': { title: 'Nature Scout Exam!', emoji: '🔍', badge: 'Nature Scout', lockedMsg: 'Find all the bugs to take the final exam.', unlockedMsg: 'Earn your Nature Scout badge!' }
}

export const DEFAULT_QUIZ_THEME: QuizTheme = { title: 'Quiz Time!', emoji: '🧠', lockedMsg: 'Complete the lessons above to unlock.', unlockedMsg: 'Test what you learned!' }
export const DEFAULT_EXAM_THEME: ExamTheme = { title: 'Mastery Challenge', emoji: '🏆', badge: 'Master', lockedMsg: 'Complete all lessons to unlock.', unlockedMsg: 'Prove your mastery!' }
