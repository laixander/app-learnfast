export const useLessons = () => {
  const lessons = [
    {
      slug: 'intro-to-planets',
      title: 'Introduction to Planets',
      category: 'Science',
      level: 'Beginner',
      xp: 500,
      icon: 'i-ph-planet-duotone',
      color: 'bg-indigo-500',
      steps: [
        {
          title: 'The Sun is the Star!',
          content: 'Did you know the Sun is actually a giant star? It sits right in the center of our solar system and keeps all the planets warm.',
          icon: 'i-ph-sun-duotone',
          color: 'text-yellow-500'
        },
        {
          title: 'Rocky Planets',
          content: 'The first four planets - Mercury, Venus, Earth, and Mars - are made of rock. We live on Earth, the only planet with liquid water!',
          icon: 'i-ph-mountains-duotone',
          color: 'text-orange-500'
        },
        {
          title: 'Gas Giants',
          content: 'Jupiter and Saturn are HUGE! They are mostly made of gas and don\'t have a solid surface to stand on. Saturn has beautiful rings made of ice!',
          icon: 'i-ph-cloud-duotone',
          color: 'text-blue-400'
        }
      ],
      quiz: [
        {
          question: 'Which planet do we live on?',
          options: ['Mars', 'Earth', 'Jupiter', 'The Moon'],
          answer: 'Earth'
        },
        {
          question: 'What is the Sun?',
          options: ['A Planet', 'A Star', 'A Moon', 'A Comet'],
          answer: 'A Star'
        }
      ]
    },
    {
      slug: 'addition-fun',
      title: 'Addition Fun',
      category: 'Math',
      level: 'Easy',
      xp: 300,
      icon: 'i-ph-plus-circle-duotone',
      color: 'bg-emerald-500',
      steps: [
        {
          title: 'What is Addition?',
          content: 'Addition is when you put two or more groups together to find out how many there are in total. We use the plus (+) sign!',
          icon: 'i-ph-plus-bold',
          color: 'text-emerald-500'
        },
        {
          title: 'One plus One',
          content: 'If you have one apple and your friend gives you another one, you now have two apples! 1 + 1 = 2.',
          icon: 'i-ph-apple-podcasts-logo-duotone',
          color: 'text-red-500'
        }
      ],
      quiz: [
        {
          question: 'What is 2 + 2?',
          options: ['3', '4', '5', '6'],
          answer: '4'
        },
        {
          question: 'What sign do we use for addition?',
          options: ['-', '+', 'x', '/'],
          answer: '+'
        }
      ]
    },
    {
      slug: 'dino-fossils',
      title: 'Dino Fossils',
      category: 'History',
      level: 'Intermediate',
      xp: 750,
      icon: 'i-ph-butterfly-duotone',
      color: 'bg-rose-500',
      steps: [
        {
          title: 'What are Fossils?',
          content: 'Fossils are the remains of plants and animals that lived a long, long time ago. They turned into rock over millions of years!',
          icon: 'i-ph-scroll-duotone',
          color: 'text-amber-700'
        },
        {
          title: 'Paleontologists',
          content: 'These are scientists who dig up fossils to learn how dinosaurs lived. They use brushes and small tools to be very careful.',
          icon: 'i-ph-detective-fill',
          color: 'text-indigo-600'
        }
      ],
      quiz: [
        {
          question: 'What do fossils turn into over time?',
          options: ['Water', 'Rock', 'Dust', 'Ice'],
          answer: 'Rock'
        }
      ]
    },
    {
      slug: 'color-mixing',
      title: 'Color Mixing',
      category: 'Art',
      level: 'Easy',
      xp: 250,
      icon: 'i-ph-palette-duotone',
      color: 'bg-violet-500',
      steps: [
        {
          title: 'Primary Colors',
          content: 'Red, Blue, and Yellow are primary colors. You can\'t make them by mixing other colors, but you can use them to make ALL other colors!',
          icon: 'i-ph-paint-brush-duotone',
          color: 'text-primary-500'
        },
        {
          title: 'Making Green',
          content: 'Mix Yellow and Blue together, and you get Green! Just like the grass and leaves on trees.',
          icon: 'i-ph-drop-duotone',
          color: 'text-emerald-500'
        }
      ],
      quiz: [
        {
          question: 'What color do you get if you mix Yellow and Blue?',
          options: ['Purple', 'Green', 'Orange', 'Brown'],
          answer: 'Green'
        }
      ]
    }
  ]

  return {
    lessons
  }
}
