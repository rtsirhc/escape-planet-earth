const GAME_DATA = {
  title: 'Escape Planet Earth',
  story: "The year is 2050. Earth's resources are almost gone. Your team found an old research lab that has the answer to save the planet — but the lab is locked! Open 5 security doors by proving your knowledge. Each door has a secret code hidden in the answers. Find all the codes and escape!",
  totalRooms: 5,

  rooms: [
    {
      id: 1,
      name: 'The Three Pillars',
      icon: '🏛️',
      topic: 'Sustainability + Triple P',
      codeWord: 'CROPS',
      codeHint1: { text: 'Think about what a farmer grows in the field...', penaltyMs: 60000 },
      codeHint2: { text: 'The word starts with C and means plants that farmers grow for food.', penaltyMs: 300000 },
      finalLetterInstruction: 'Take the 4th letter of CROPS',
      finalLetterPosition: 3,
      questions: [
        {
          id: 'r1q1',
          text: 'What does sustainability mean?',
          type: 'multiple-choice',
          options: [
            "Use everything now and don't think about the future",
            'Use resources carefully so there is enough for tomorrow',
            'Stop all factories and industry'
          ],
          correctIndex: 1,
          correctLetter: 'C',
          fakeLetter: 'X',
          letterExplanation: 'Your letter is C — for Careful! Sustainability means being careful with resources.',
          hint1: { text: 'Think about the word "tomorrow" and saving things for later.', penaltyMs: 60000 },
          hint2: { text: 'The correct answer talks about using resources CAREFULLY for the FUTURE.', penaltyMs: 300000 }
        },
        {
          id: 'r1q2',
          text: 'The Triple P stands for People, Planet, and ___.',
          type: 'multiple-choice',
          options: ['Pollution', 'Prosperity', 'Progress'],
          correctIndex: 1,
          correctLetter: 'R',
          fakeLetter: 'Z',
          letterExplanation: 'Your letter is R — Prosperity means having enough Resources and businesses.',
          hint1: { text: "It starts with P and it's about money, jobs, and businesses.", penaltyMs: 60000 },
          hint2: { text: 'The word is PROSPERITY — it means having enough money and success.', penaltyMs: 300000 }
        },
        {
          id: 'r1q3',
          text: 'Which is an example of the "People" part of sustainability?',
          type: 'multiple-choice',
          options: [
            'Protecting forests',
            'Creating new businesses',
            'Giving everyone access to education and safety'
          ],
          correctIndex: 2,
          correctLetter: 'O',
          fakeLetter: 'Q',
          letterExplanation: 'Your letter is O — peOple deserve education and safety!',
          hint1: { text: '"People" is about humans, communities, and their needs.', penaltyMs: 60000 },
          hint2: { text: 'Education and safety are basic needs for PEOPLE, not for Planet or Prosperity.', penaltyMs: 300000 }
        },
        {
          id: 'r1q4',
          text: 'A resource is something we take from nature. Which of these is a natural resource?',
          type: 'multiple-choice',
          options: ['A smartphone', 'Fresh water', 'A car'],
          correctIndex: 1,
          correctLetter: 'P',
          fakeLetter: 'V',
          letterExplanation: 'Your letter is P — the Planet gives us natural resources like water!',
          hint1: { text: 'A natural resource comes directly from nature, not from a factory.', penaltyMs: 60000 },
          hint2: { text: 'Water comes directly from nature. Phones and cars are made in factories.', penaltyMs: 300000 }
        },
        {
          id: 'r1q5',
          text: 'True or False: A sustainable decision should help People, Planet, AND Prosperity together.',
          type: 'true-false',
          correctAnswer: true,
          correctLetter: 'S',
          fakeLetter: 'W',
          letterExplanation: "Your letter is S — Sustainability means all three P's working together!",
          hint1: { text: 'Think about the word "AND" in the question.', penaltyMs: 60000 },
          hint2: { text: 'Sustainability means ALL THREE must work together, not just one.', penaltyMs: 300000 }
        }
      ]
    },
    {
      id: 2,
      name: 'The Warming World',
      icon: '🌡️',
      topic: 'Climate Change',
      codeWord: 'SOLAR',
      codeHint1: { text: 'Think about energy that comes from the sun...', penaltyMs: 60000 },
      codeHint2: { text: 'This word starts with S and is a type of clean, renewable energy from the sun.', penaltyMs: 300000 },
      finalLetterInstruction: 'Take the 3rd letter of SOLAR',
      finalLetterPosition: 2,
      questions: [
        {
          id: 'r2q1',
          text: 'What is the difference between weather and climate?',
          type: 'multiple-choice',
          options: [
            'Weather is hot, climate is cold',
            'Weather changes every day; climate is the long-term pattern',
            'Weather is about wind, climate is about rain'
          ],
          correctIndex: 1,
          correctLetter: 'S',
          fakeLetter: 'K',
          letterExplanation: 'Your letter is S — climate is a long-term System of weather patterns!',
          hint1: { text: 'One of them is about TODAY, the other is about MANY YEARS.', penaltyMs: 60000 },
          hint2: { text: 'Weather = what happens today. Climate = the pattern over many, many years.', penaltyMs: 300000 }
        },
        {
          id: 'r2q2',
          text: 'Which of these is a HUMAN cause of climate change?',
          type: 'multiple-choice',
          options: ['Volcanic eruptions', 'Burning fossil fuels', 'Earthquakes'],
          correctIndex: 1,
          correctLetter: 'O',
          fakeLetter: 'J',
          letterExplanation: 'Your letter is O — burning fossil fuels releases CO₂ into Our atmosphere!',
          hint1: { text: 'Think about what humans DO that puts greenhouse gases into the air.', penaltyMs: 60000 },
          hint2: { text: 'Cars, planes, and factories burn fossil fuels. Volcanoes and earthquakes are natural.', penaltyMs: 300000 }
        },
        {
          id: 'r2q3',
          text: 'Which gas is a greenhouse gas that comes from cows and agriculture?',
          type: 'multiple-choice',
          options: ['Oxygen', 'Nitrogen', 'Methane'],
          correctIndex: 2,
          correctLetter: 'L',
          fakeLetter: 'F',
          letterExplanation: 'Your letter is L — methane is released from Large-scale agriculture!',
          hint1: { text: 'This gas starts with M and comes from farms and animals.', penaltyMs: 60000 },
          hint2: { text: 'METHANE comes from cows and large farms. Oxygen and nitrogen are not greenhouse gases.', penaltyMs: 300000 }
        },
        {
          id: 'r2q4',
          text: 'What happens when glaciers melt because of global warming?',
          type: 'multiple-choice',
          options: ['The air gets cleaner', 'Sea levels rise', 'Forests grow faster'],
          correctIndex: 1,
          correctLetter: 'A',
          fakeLetter: 'U',
          letterExplanation: 'Your letter is A — melting glaciers Add more water to the oceans!',
          hint1: { text: 'Glaciers are made of ice. When ice melts, it becomes water. Where does the water go?', penaltyMs: 60000 },
          hint2: { text: 'Melting ice → more water in the ocean → SEA LEVELS RISE.', penaltyMs: 300000 }
        },
        {
          id: 'r2q5',
          text: 'Cutting down large areas of trees is called ___.',
          type: 'multiple-choice',
          options: ['Reforestation', 'Agriculture', 'Deforestation'],
          correctIndex: 2,
          correctLetter: 'R',
          fakeLetter: 'M',
          letterExplanation: 'Your letter is R — defoRestation destroys forests and habitats!',
          hint1: { text: 'The word has "forest" inside it, plus a prefix that means "remove."', penaltyMs: 60000 },
          hint2: { text: 'DE-FOREST-ATION. "De" means remove. Removing forests = deforestation.', penaltyMs: 300000 }
        }
      ]
    },
    {
      id: 3,
      name: 'Life in Danger',
      icon: '🦎',
      topic: 'Environmental Degradation + Biodiversity Loss',
      codeWord: 'WASTE',
      codeHint1: { text: 'Think about what we throw away that hurts the environment...', penaltyMs: 60000 },
      codeHint2: { text: 'The word starts with W and means things we throw in the garbage that damage nature.', penaltyMs: 300000 },
      finalLetterInstruction: 'Take the 2nd letter of WASTE',
      finalLetterPosition: 1,
      questions: [
        {
          id: 'r3q1',
          text: 'What is environmental degradation?',
          type: 'multiple-choice',
          options: [
            'Building new parks and gardens',
            'The destruction of the environment by damaging air, water, and soil',
            'Studying nature and animals'
          ],
          correctIndex: 1,
          correctLetter: 'W',
          fakeLetter: 'Y',
          letterExplanation: "Your letter is W — degradation means the World's environment is being damaged!",
          hint1: { text: 'The word "degradation" means something getting worse or being destroyed.', penaltyMs: 60000 },
          hint2: { text: 'It means DAMAGE and DESTRUCTION to air, water, and soil — not building or studying.', penaltyMs: 300000 }
        },
        {
          id: 'r3q2',
          text: 'What is biodiversity?',
          type: 'multiple-choice',
          options: [
            'A type of renewable energy',
            'The variety of plant and animal life on Earth',
            'A way to recycle plastic'
          ],
          correctIndex: 1,
          correctLetter: 'A',
          fakeLetter: 'B',
          letterExplanation: 'Your letter is A — biodiversity is About All the different Animals and plants!',
          hint1: { text: '"Bio" means life. "Diversity" means variety. Put them together!', penaltyMs: 60000 },
          hint2: { text: 'Bio (life) + diversity (variety) = the VARIETY of plants and animals on Earth.', penaltyMs: 300000 }
        },
        {
          id: 'r3q3',
          text: 'How does deforestation affect animals?',
          type: 'multiple-choice',
          options: [
            'It gives them more food',
            'It destroys their habitats',
            'It makes them stronger'
          ],
          correctIndex: 1,
          correctLetter: 'S',
          fakeLetter: 'D',
          letterExplanation: 'Your letter is S — animals lose their Safe homes when forests are destroyed!',
          hint1: { text: 'A habitat is where an animal lives. What happens when you cut down the trees?', penaltyMs: 60000 },
          hint2: { text: 'Animals live in forests. Cut the forest → animals lose their HOME (habitat).', penaltyMs: 300000 }
        },
        {
          id: 'r3q4',
          text: 'What kills many marine (ocean) animals?',
          type: 'multiple-choice',
          options: ['Loud music', 'Plastic pollution', 'Sunlight'],
          correctIndex: 1,
          correctLetter: 'T',
          fakeLetter: 'N',
          letterExplanation: 'Your letter is T — Trash and plastic pollution is Terrible for ocean life!',
          hint1: { text: 'Think about what humans throw away that ends up in the ocean.', penaltyMs: 60000 },
          hint2: { text: 'PLASTIC POLLUTION — plastic bags, bottles, and trash kill fish, turtles, and birds.', penaltyMs: 300000 }
        },
        {
          id: 'r3q5',
          text: 'Complete the chain: Environmental degradation → habitat damage → biodiversity ___.',
          type: 'multiple-choice',
          options: ['increase', 'loss', 'change'],
          correctIndex: 1,
          correctLetter: 'E',
          fakeLetter: 'G',
          letterExplanation: 'Your letter is E — the Environment suffers biodiversity LOSS when habitats are destroyed.',
          hint1: { text: 'When habitats are damaged, do animals increase or decrease?', penaltyMs: 60000 },
          hint2: { text: 'Damage to habitats = animals and plants disappear = biodiversity LOSS.', penaltyMs: 300000 }
        }
      ]
    },
    {
      id: 4,
      name: 'Your Footprint + The Circle',
      icon: '👣',
      topic: 'Carbon & Ecological Footprint + Circular Economy + 3Rs',
      codeWord: 'GREEN',
      codeHint1: { text: 'Think about the color of nature and sustainability...', penaltyMs: 60000 },
      codeHint2: { text: 'This word is a color. It starts with G and represents nature and eco-friendly living.', penaltyMs: 300000 },
      finalLetterInstruction: 'Take the 5th letter of GREEN',
      finalLetterPosition: 4,
      questions: [
        {
          id: 'r4q1',
          text: 'What is a carbon footprint?',
          type: 'multiple-choice',
          options: [
            'A footprint made with carbon paper',
            'The amount of greenhouse gases your activities produce',
            'The size of your shoes'
          ],
          correctIndex: 1,
          correctLetter: 'G',
          fakeLetter: 'H',
          letterExplanation: 'Your letter is G — your carbon footprint measures Greenhouse Gases from your life!',
          hint1: { text: "It's about the gases that your daily life creates — driving, eating, using electricity.", penaltyMs: 60000 },
          hint2: { text: 'Your carbon footprint = the GREENHOUSE GASES produced by your activities.', penaltyMs: 300000 }
        },
        {
          id: 'r4q2',
          text: 'Which of these can REDUCE your ecological footprint?',
          type: 'multiple-choice',
          options: [
            'Driving alone in a big car every day',
            'Using renewable energy like solar and wind',
            'Buying new clothes every week'
          ],
          correctIndex: 1,
          correctLetter: 'R',
          fakeLetter: 'I',
          letterExplanation: 'Your letter is R — Renewable energy Reduces your footprint!',
          hint1: { text: 'Which option is GOOD for the planet and uses LESS resources?', penaltyMs: 60000 },
          hint2: { text: "Solar and wind energy are RENEWABLE — they don't run out and don't pollute.", penaltyMs: 300000 }
        },
        {
          id: 'r4q3',
          text: 'In a linear economy, what happens to products after we use them?',
          type: 'multiple-choice',
          options: [
            'They are recycled into new products',
            'They are repaired and reused',
            'They are thrown away and become waste'
          ],
          correctIndex: 2,
          correctLetter: 'E',
          fakeLetter: 'O',
          letterExplanation: 'Your letter is E — a linear Economy Ends with waste: take, make, use, throw away!',
          hint1: { text: '"Linear" means a straight line — things go in one direction, from start to END.', penaltyMs: 60000 },
          hint2: { text: 'Linear economy: Take → Make → Use → THROW AWAY. Products become waste.', penaltyMs: 300000 }
        },
        {
          id: 'r4q4',
          text: 'In a circular economy, instead of throwing things away, we try to ___.',
          type: 'multiple-choice',
          options: [
            'Burn everything',
            'Keep materials in use for longer',
            'Send waste to other countries'
          ],
          correctIndex: 1,
          correctLetter: 'E',
          fakeLetter: 'L',
          letterExplanation: 'Your letter is E — a circular Economy keeps Everything in use longer!',
          hint1: { text: '"Circular" means going around in a circle — use, reuse, repeat!', penaltyMs: 60000 },
          hint2: { text: 'Circular = keep using things again and again. Reuse, repair, recycle!', penaltyMs: 300000 }
        },
        {
          id: 'r4q5',
          text: 'What is the correct order of the 3Rs (from most important to least important)?',
          type: 'multiple-choice',
          options: [
            'Recycle, Reduce, Reuse',
            'Reduce, Reuse, Recycle',
            'Reuse, Recycle, Reduce'
          ],
          correctIndex: 1,
          correctLetter: 'N',
          fakeLetter: 'P',
          letterExplanation: 'Your letter is N — first reduce, theN reuse, theN recycle!',
          hint1: { text: 'The BEST thing is to use LESS. The second best is to use AGAIN. What comes last?', penaltyMs: 60000 },
          hint2: { text: 'REDUCE first (use less) → then REUSE (use again) → then RECYCLE (make new).', penaltyMs: 300000 }
        }
      ]
    },
    {
      id: 5,
      name: 'Rules for the Planet',
      icon: '📜',
      topic: 'Policy vs Regulation + International & Local Policies',
      codeWord: 'TRADE',
      codeHint1: { text: 'Think about buying and selling between countries...', penaltyMs: 60000 },
      codeHint2: { text: 'The word starts with T and means the exchange of goods between countries.', penaltyMs: 300000 },
      finalLetterInstruction: 'Take the 5th AND 1st letter of TRADE',
      finalLetterPositions: [4, 0],
      questions: [
        {
          id: 'r5q1',
          text: 'What is the difference between a policy and a regulation?',
          type: 'multiple-choice',
          options: [
            'A policy is a plan or goal; a regulation is an official rule or law',
            'A policy is a law; a regulation is a plan',
            'They are exactly the same thing'
          ],
          correctIndex: 0,
          correctLetter: 'T',
          fakeLetter: 'J',
          letterExplanation: 'Your letter is T — regulaTions are official rules That enforce policies!',
          hint1: { text: 'One is a GOAL (what we want). The other is a RULE (how we enforce it).', penaltyMs: 60000 },
          hint2: { text: 'POLICY = a plan or goal. REGULATION = an official rule or law to enforce it.', penaltyMs: 300000 }
        },
        {
          id: 'r5q2',
          text: 'When a government gives money to a company for using cleaner energy, this is called a ___.',
          type: 'multiple-choice',
          options: ['Fine', 'Subsidy', 'Ban'],
          correctIndex: 1,
          correctLetter: 'R',
          fakeLetter: 'K',
          letterExplanation: 'Your letter is R — a subsidy is a Reward for doing the Right thing!',
          hint1: { text: "The government is GIVING money, not taking it. It's a reward, not a punishment.", penaltyMs: 60000 },
          hint2: { text: 'A SUBSIDY is when the government gives money to support good behavior.', penaltyMs: 300000 }
        },
        {
          id: 'r5q3',
          text: 'What is a "target-setting accord"?',
          type: 'multiple-choice',
          options: [
            'An agreement that bans dangerous chemicals',
            'An agreement that sets environmental goals',
            'An agreement about buying and selling products'
          ],
          correctIndex: 1,
          correctLetter: 'A',
          fakeLetter: 'F',
          letterExplanation: 'Your letter is A — an Accord is an Agreement that sets environmental goals!',
          hint1: { text: 'Look at the name: "target-SETTING" — it SETS targets (goals).', penaltyMs: 60000 },
          hint2: { text: 'Target-setting = setting goals. An accord that SETS ENVIRONMENTAL GOALS.', penaltyMs: 300000 }
        },
        {
          id: 'r5q4',
          text: 'If a factory pollutes the river, the government can give them a ___.',
          type: 'multiple-choice',
          options: ['Subsidy', 'Tax break', 'Fine or penalty'],
          correctIndex: 2,
          correctLetter: 'D',
          fakeLetter: 'X',
          letterExplanation: 'Your letter is D — polluters must pay! A fine is a punishment for Doing Damage.',
          hint1: { text: 'Pollution is BAD. The government wants to PUNISH bad behavior.', penaltyMs: 60000 },
          hint2: { text: 'A FINE or PENALTY = you must PAY MONEY because you broke the rules.', penaltyMs: 300000 }
        },
        {
          id: 'r5q5',
          text: 'Why do countries need international environmental agreements?',
          type: 'multiple-choice',
          options: [
            'Because environmental problems do not stop at country borders',
            'Because it is cheaper',
            'Because one country can solve everything alone'
          ],
          correctIndex: 0,
          correctLetter: 'E',
          fakeLetter: 'H',
          letterExplanation: 'Your letter is E — Environmental problems affect Everyone, across Every border!',
          hint1: { text: "Air pollution, ocean pollution, and climate change don't have passports!", penaltyMs: 60000 },
          hint2: { text: 'Environmental problems CROSS BORDERS — pollution in one country affects other countries too.', penaltyMs: 300000 }
        }
      ]
    }
  ],

  finalEscape: {
    title: 'The Final Escape',
    icon: '🚀',
    instructions: 'You opened all 5 doors! Now use your code words to find the FINAL ESCAPE CODE.',
    steps: [
      { room: 1, codeWord: 'CROPS', instruction: 'Take the 4th letter of CROPS', letter: 'P' },
      { room: 2, codeWord: 'SOLAR', instruction: 'Take the 3rd letter of SOLAR', letter: 'L' },
      { room: 3, codeWord: 'WASTE', instruction: 'Take the 2nd letter of WASTE', letter: 'A' },
      { room: 4, codeWord: 'GREEN', instruction: 'Take the 5th letter of GREEN', letter: 'N' },
      { room: 5, codeWord: 'TRADE', instruction: 'Take the 5th letter of TRADE', letter: 'E' },
      { room: 5, codeWord: 'TRADE', instruction: 'Take the 1st letter of TRADE', letter: 'T' }
    ],
    scrambledLetters: ['N', 'T', 'L', 'A', 'P', 'E'],
    answer: 'PLANET',
    celebration: '🎉🌍 CONGRATULATIONS! You escaped and saved the planet! 🌍🎉'
  }
};
