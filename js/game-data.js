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
      finalLetterInstruction: 'Take the 4th letter of your code word.',
      finalLetterPosition: 3,
      questions: [
        {
          id: 'r1q1',
          text: 'What does sustainability mean?',
          type: 'multiple-choice',
          options: [
            'Protecting nature by stopping all use of natural resources',
            'Using resources carefully so there is enough for the future',
            'Finding new technology to replace all natural resources'
          ],
          correctIndex: 1,
          correctLetter: 'C',
          fakeLetter: 'X',
          letterExplanation: 'Your letter is C!',
          hint1: { text: 'It is not about stopping or replacing — it is about being careful.', penaltyMs: 60000 },
          hint2: { text: 'The correct answer talks about using resources CAREFULLY for the FUTURE.', penaltyMs: 300000 }
        },
        {
          id: 'r1q2',
          text: 'The Triple P stands for People, Planet, and ___.',
          type: 'multiple-choice',
          options: ['Production', 'Prosperity', 'Protection'],
          correctIndex: 1,
          correctLetter: 'R',
          fakeLetter: 'Z',
          letterExplanation: 'Your letter is R!',
          hint1: { text: "It starts with P and it's about money, jobs, and businesses.", penaltyMs: 60000 },
          hint2: { text: 'The word is PROSPERITY — it means economic success.', penaltyMs: 300000 }
        },
        {
          id: 'r1q3',
          text: 'Which is an example of the "People" pillar of sustainability?',
          type: 'multiple-choice',
          options: [
            'Giving communities access to safe education and healthcare',
            'Protecting endangered animal species in nature reserves',
            'Creating more jobs by building new factories'
          ],
          correctIndex: 0,
          correctLetter: 'O',
          fakeLetter: 'Q',
          letterExplanation: 'Your letter is O!',
          hint1: { text: '"People" is about basic human needs, not animals or business growth.', penaltyMs: 60000 },
          hint2: { text: 'Education and healthcare are basic needs for PEOPLE.', penaltyMs: 300000 }
        },
        {
          id: 'r1q4',
          text: 'Which of these is a natural resource?',
          type: 'multiple-choice',
          options: ['A solar panel', 'Fresh water', 'Recycled paper'],
          correctIndex: 1,
          correctLetter: 'P',
          fakeLetter: 'V',
          letterExplanation: 'Your letter is P!',
          hint1: { text: 'A natural resource comes directly from nature — humans did not create or process it.', penaltyMs: 60000 },
          hint2: { text: 'Solar panels are manufactured and recycled paper is processed. Only one comes straight from nature.', penaltyMs: 300000 }
        },
        {
          id: 'r1q5',
          text: 'A company plants trees but pays workers very low wages. Is this sustainable?',
          type: 'multiple-choice',
          options: [
            'Yes, because it helps the Planet pillar',
            'Yes, because trees create Prosperity',
            'No, because it ignores the People pillar'
          ],
          correctIndex: 2,
          correctLetter: 'S',
          fakeLetter: 'W',
          letterExplanation: 'Your letter is S!',
          hint1: { text: 'Sustainability needs ALL three pillars to work together.', penaltyMs: 60000 },
          hint2: { text: 'Low wages means the People pillar is not being respected.', penaltyMs: 300000 }
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
      finalLetterInstruction: 'Take the 3rd letter of your code word.',
      finalLetterPosition: 2,
      questions: [
        {
          id: 'r2q1',
          text: 'What is the difference between weather and climate?',
          type: 'multiple-choice',
          options: [
            'Weather is the long-term pattern; climate is what happens today',
            'Weather is what happens today; climate is the pattern over many years',
            'Weather only measures temperature; climate measures everything'
          ],
          correctIndex: 1,
          correctLetter: 'S',
          fakeLetter: 'K',
          letterExplanation: 'Your letter is S!',
          hint1: { text: 'Be careful — the first two options look very similar. Read slowly.', penaltyMs: 60000 },
          hint2: { text: 'Weather = short-term (today). Climate = long-term (many years).', penaltyMs: 300000 }
        },
        {
          id: 'r2q2',
          text: 'Which of these is a HUMAN cause of climate change?',
          type: 'multiple-choice',
          options: ['Changes in the Earth\'s orbit around the sun', 'Burning fossil fuels for energy', 'Natural volcanic eruptions releasing gases'],
          correctIndex: 1,
          correctLetter: 'O',
          fakeLetter: 'J',
          letterExplanation: 'Your letter is O!',
          hint1: { text: 'Two of these are natural processes. Only one is caused by humans.', penaltyMs: 60000 },
          hint2: { text: 'Fossil fuels are burned by humans in cars, planes, and factories.', penaltyMs: 300000 }
        },
        {
          id: 'r2q3',
          text: 'Which greenhouse gas comes mainly from large-scale agriculture and livestock?',
          type: 'multiple-choice',
          options: ['Carbon dioxide (CO₂)', 'Methane', 'Water vapor'],
          correctIndex: 1,
          correctLetter: 'L',
          fakeLetter: 'F',
          letterExplanation: 'Your letter is L!',
          hint1: { text: 'CO₂ comes mainly from burning fuel. Water vapor is natural. Think about farms and cows.', penaltyMs: 60000 },
          hint2: { text: 'METHANE comes from cows and rice farming, not from burning fuels.', penaltyMs: 300000 }
        },
        {
          id: 'r2q4',
          text: 'What is a direct effect of melting glaciers?',
          type: 'multiple-choice',
          options: ['Stronger hurricanes and storms', 'Rising sea levels', 'More droughts in farmlands'],
          correctIndex: 1,
          correctLetter: 'A',
          fakeLetter: 'U',
          letterExplanation: 'Your letter is A!',
          hint1: { text: 'All of these are effects of climate change, but only one is a DIRECT result of ice melting.', penaltyMs: 60000 },
          hint2: { text: 'When ice melts, it becomes water. Where does the extra water go?', penaltyMs: 300000 }
        },
        {
          id: 'r2q5',
          text: 'Deforestation contributes to climate change because ___.',
          type: 'multiple-choice',
          options: [
            'fewer trees means less oxygen for animals',
            'fewer trees means less CO₂ is absorbed from the air',
            'fewer trees means the soil becomes too dry'
          ],
          correctIndex: 1,
          correctLetter: 'R',
          fakeLetter: 'M',
          letterExplanation: 'Your letter is R!',
          hint1: { text: 'Think about what trees do with CO₂ — they absorb it. What happens when they are gone?', penaltyMs: 60000 },
          hint2: { text: 'Trees absorb CO₂. Fewer trees = more CO₂ stays in the atmosphere = more warming.', penaltyMs: 300000 }
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
      finalLetterInstruction: 'Take the 2nd letter of your code word.',
      finalLetterPosition: 1,
      questions: [
        {
          id: 'r3q1',
          text: 'What is environmental degradation?',
          type: 'multiple-choice',
          options: [
            'When ecosystems slowly change due to natural seasons',
            'When human activities cause damage to air, water, and soil',
            'When animals migrate to find better habitats'
          ],
          correctIndex: 1,
          correctLetter: 'W',
          fakeLetter: 'Y',
          letterExplanation: 'Your letter is W!',
          hint1: { text: 'The other two describe natural processes. Degradation is about damage.', penaltyMs: 60000 },
          hint2: { text: 'Degradation means getting worse — it is DAMAGE caused by HUMANS.', penaltyMs: 300000 }
        },
        {
          id: 'r3q2',
          text: 'What does "biodiversity" mean?',
          type: 'multiple-choice',
          options: [
            'The total number of animals in one specific habitat',
            'The variety of ALL different living things on Earth',
            'The balance between predators and prey in nature'
          ],
          correctIndex: 1,
          correctLetter: 'A',
          fakeLetter: 'B',
          letterExplanation: 'Your letter is A!',
          hint1: { text: '"Bio" means life. "Diversity" means variety. It is not limited to one habitat or one relationship.', penaltyMs: 60000 },
          hint2: { text: 'Biodiversity = the VARIETY of ALL life — plants, animals, fungi, bacteria — everywhere on Earth.', penaltyMs: 300000 }
        },
        {
          id: 'r3q3',
          text: 'Deforestation causes biodiversity loss because ___.',
          type: 'multiple-choice',
          options: [
            'animals become more aggressive without trees',
            'it destroys the natural habitats where species live',
            'it increases the temperature inside forests'
          ],
          correctIndex: 1,
          correctLetter: 'S',
          fakeLetter: 'D',
          letterExplanation: 'Your letter is S!',
          hint1: { text: 'Think about what a forest provides for animals — a home. What happens when it is gone?', penaltyMs: 60000 },
          hint2: { text: 'No forest = no habitat = animals have nowhere to live = biodiversity LOSS.', penaltyMs: 300000 }
        },
        {
          id: 'r3q4',
          text: 'Plastic pollution is especially dangerous for marine life because ___.',
          type: 'multiple-choice',
          options: [
            'plastic makes the ocean water warmer',
            'animals eat it or get trapped in it',
            'plastic blocks sunlight from reaching the ocean floor'
          ],
          correctIndex: 1,
          correctLetter: 'T',
          fakeLetter: 'N',
          letterExplanation: 'Your letter is T!',
          hint1: { text: 'Think about what happens when a sea turtle sees a plastic bag — it looks like a jellyfish.', penaltyMs: 60000 },
          hint2: { text: 'Animals EAT plastic (thinking it is food) or get TRAPPED in plastic waste.', penaltyMs: 300000 }
        },
        {
          id: 'r3q5',
          text: 'What is the correct order of this cause-and-effect chain?',
          type: 'multiple-choice',
          options: [
            'Biodiversity loss → habitat damage → environmental degradation',
            'Habitat damage → environmental degradation → biodiversity loss',
            'Environmental degradation → habitat damage → biodiversity loss'
          ],
          correctIndex: 2,
          correctLetter: 'E',
          fakeLetter: 'G',
          letterExplanation: 'Your letter is E!',
          hint1: { text: 'What comes first — the big environmental problem, or the loss of species?', penaltyMs: 60000 },
          hint2: { text: 'First the environment gets damaged → then habitats are destroyed → then species disappear.', penaltyMs: 300000 }
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
      finalLetterInstruction: 'Take the 5th letter of your code word.',
      finalLetterPosition: 4,
      questions: [
        {
          id: 'r4q1',
          text: 'Your carbon footprint measures ___.',
          type: 'multiple-choice',
          options: [
            'the total energy you use at home each month',
            'the amount of greenhouse gases produced by your activities',
            'how much carbon is in the food you eat'
          ],
          correctIndex: 1,
          correctLetter: 'G',
          fakeLetter: 'H',
          letterExplanation: 'Your letter is G!',
          hint1: { text: 'It is not just about energy or food — it covers ALL your daily activities.', penaltyMs: 60000 },
          hint2: { text: 'Carbon footprint = the total GREENHOUSE GASES from everything you do.', penaltyMs: 300000 }
        },
        {
          id: 'r4q2',
          text: 'Which action reduces your ecological footprint?',
          type: 'multiple-choice',
          options: [
            'Buying organic food shipped from another continent',
            'Using solar energy to power your home',
            'Replacing old electronics with the newest models'
          ],
          correctIndex: 1,
          correctLetter: 'R',
          fakeLetter: 'I',
          letterExplanation: 'Your letter is R!',
          hint1: { text: 'Organic food from far away still has a big transport footprint. New electronics create waste.', penaltyMs: 60000 },
          hint2: { text: 'Solar energy is renewable and local — no transport, no fossil fuels.', penaltyMs: 300000 }
        },
        {
          id: 'r4q3',
          text: 'What makes a linear economy different from a circular economy?',
          type: 'multiple-choice',
          options: [
            'In a linear economy, products are shared between people',
            'In a linear economy, materials are recycled into new products',
            'In a linear economy, products become waste after use'
          ],
          correctIndex: 2,
          correctLetter: 'E',
          fakeLetter: 'O',
          letterExplanation: 'Your letter is E!',
          hint1: { text: '"Linear" = a straight line from start to end. "Circular" = going around again.', penaltyMs: 60000 },
          hint2: { text: 'Linear: take → make → use → THROW AWAY. That is the "straight line."', penaltyMs: 300000 }
        },
        {
          id: 'r4q4',
          text: 'A circular economy tries to ___.',
          type: 'multiple-choice',
          options: [
            'produce only biodegradable products',
            'keep materials in use for as long as possible',
            'replace all plastic with natural materials'
          ],
          correctIndex: 1,
          correctLetter: 'E',
          fakeLetter: 'L',
          letterExplanation: 'Your letter is E!',
          hint1: { text: 'It is not about specific materials — it is about using everything LONGER.', penaltyMs: 60000 },
          hint2: { text: 'Circular = keep using, repairing, and recycling — materials stay in the loop.', penaltyMs: 300000 }
        },
        {
          id: 'r4q5',
          text: 'The 3Rs in order from most to least important are:',
          type: 'multiple-choice',
          options: [
            'Reuse, Reduce, Recycle',
            'Reduce, Reuse, Recycle',
            'Reduce, Recycle, Reuse'
          ],
          correctIndex: 1,
          correctLetter: 'N',
          fakeLetter: 'P',
          letterExplanation: 'Your letter is N!',
          hint1: { text: 'The best action is to NOT create waste at all. What word means using less?', penaltyMs: 60000 },
          hint2: { text: 'REDUCE (use less) is #1, then REUSE (use again), then RECYCLE (make new).', penaltyMs: 300000 }
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
      finalLetterInstruction: 'Take the 5th AND 1st letter of your code word.',
      finalLetterPositions: [4, 0],
      questions: [
        {
          id: 'r5q1',
          text: 'What is the difference between a policy and a regulation?',
          type: 'multiple-choice',
          options: [
            'A policy sets a goal; a regulation is a law that enforces it',
            'A policy is made by businesses; a regulation is made by people',
            'A policy is international; a regulation is only local'
          ],
          correctIndex: 0,
          correctLetter: 'T',
          fakeLetter: 'J',
          letterExplanation: 'Your letter is T!',
          hint1: { text: 'Think: goal vs. rule. Which one sets direction and which one enforces?', penaltyMs: 60000 },
          hint2: { text: 'POLICY = a plan/goal. REGULATION = an official rule/law to enforce it.', penaltyMs: 300000 }
        },
        {
          id: 'r5q2',
          text: 'A government gives a company money for switching to clean energy. This is called a ___.',
          type: 'multiple-choice',
          options: ['Tax break', 'Subsidy', 'Carbon credit'],
          correctIndex: 1,
          correctLetter: 'R',
          fakeLetter: 'K',
          letterExplanation: 'Your letter is R!',
          hint1: { text: 'A tax break reduces taxes. A carbon credit is a trading system. Which one means the government GIVES money?', penaltyMs: 60000 },
          hint2: { text: 'A SUBSIDY = the government directly gives money to support a good action.', penaltyMs: 300000 }
        },
        {
          id: 'r5q3',
          text: 'A "target-setting accord" is an international agreement that ___.',
          type: 'multiple-choice',
          options: [
            'bans specific harmful substances worldwide',
            'sets specific environmental goals for countries to reach',
            'controls the trade of dangerous waste between countries'
          ],
          correctIndex: 1,
          correctLetter: 'A',
          fakeLetter: 'F',
          letterExplanation: 'Your letter is A!',
          hint1: { text: 'Look at the name carefully: "target-SETTING." What does "setting targets" mean?', penaltyMs: 60000 },
          hint2: { text: 'Target-setting = establishing goals. Not banning, not trading — SETTING GOALS.', penaltyMs: 300000 }
        },
        {
          id: 'r5q4',
          text: 'A factory illegally dumps chemicals in a river. The government should ___.',
          type: 'multiple-choice',
          options: [
            'give them a subsidy to build a water filter',
            'create a new policy about river protection',
            'give them a fine or penalty for breaking the law'
          ],
          correctIndex: 2,
          correctLetter: 'D',
          fakeLetter: 'X',
          letterExplanation: 'Your letter is D!',
          hint1: { text: 'They already broke the law. A subsidy rewards good behavior. A new policy is too slow.', penaltyMs: 60000 },
          hint2: { text: 'When you break a law, you get PUNISHED — a FINE or PENALTY.', penaltyMs: 300000 }
        },
        {
          id: 'r5q5',
          text: 'Why do environmental problems require international agreements?',
          type: 'multiple-choice',
          options: [
            'Because local governments do not have enough money to act alone',
            'Because pollution and climate change cross country borders',
            'Because international agreements are easier to enforce than local laws'
          ],
          correctIndex: 1,
          correctLetter: 'E',
          fakeLetter: 'H',
          letterExplanation: 'Your letter is E!',
          hint1: { text: 'Think about air pollution — does it stop at the border?', penaltyMs: 60000 },
          hint2: { text: 'Environmental problems CROSS BORDERS — what one country does affects others.', penaltyMs: 300000 }
        }
      ]
    }
  ],

  finalEscape: {
    title: 'The Final Escape',
    icon: '🚀',
    instructions: 'You opened all 5 doors! Use the hint letters you collected from each room to figure out the final escape code.',
    answer: 'PLANET',
    celebration: '🎉🌍 CONGRATULATIONS! You escaped and saved the planet! 🌍🎉'
  }
};
