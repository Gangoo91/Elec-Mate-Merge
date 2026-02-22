import { StandardMockQuestion } from '@/types/standardMockExam';

export const gsCat3Questions: StandardMockQuestion[] = [
  // =====================================================
  // Category 3: Building Habits That Stick (id 81-120)
  // 16 basic, 16 intermediate, 8 advanced
  // =====================================================

  // --- BASIC (16 questions: 81-96) ---
  {
    id: 81,
    question: 'According to Charles Duhigg, what are the three components of the Habit Loop?',
    options: [
      'Cue, Routine, Reward',
      'Trigger, Action, Result',
      'Stimulus, Response, Outcome',
      'Prompt, Behaviour, Feedback',
    ],
    correctAnswer: 0,
    explanation:
      'Charles Duhigg introduced the Habit Loop in his book &ldquo;The Power of Habit&rdquo; (2012), identifying three components: the Cue (trigger), the Routine (behaviour itself), and the Reward (benefit gained). Understanding this loop is the foundation for both building new habits and breaking existing ones.',
    section: 'Building Habits That Stick',
    difficulty: 'basic' as const,
    topic: 'The Habit Loop',
    category: 'Building Habits That Stick',
  },
  {
    id: 82,
    question:
      'How many days does it take on average to form a new habit, according to Phillippa Lally&rsquo;s research at University College London?',
    options: ['66 days', '21 days', '30 days', '90 days'],
    correctAnswer: 0,
    explanation:
      'Phillippa Lally&rsquo;s 2009 study at UCL, published in the European Journal of Social Psychology, found it takes an average of 66 days for a new behaviour to become automatic. The widely quoted &ldquo;21 days&rdquo; figure is a myth originating from Dr Maxwell Maltz&rsquo;s observations about plastic surgery patients in the 1960s.',
    section: 'Building Habits That Stick',
    difficulty: 'basic' as const,
    topic: 'Habit Formation Research',
    category: 'Building Habits That Stick',
  },
  {
    id: 83,
    question: 'What is the first of James Clear&rsquo;s 4 Laws of Behaviour Change?',
    options: ['Make it obvious', 'Make it attractive', 'Make it easy', 'Make it satisfying'],
    correctAnswer: 0,
    explanation:
      'James Clear&rsquo;s &ldquo;Atomic Habits&rdquo; (2018) outlines four laws: (1) Make it obvious &mdash; relates to the cue, (2) Make it attractive &mdash; relates to the craving, (3) Make it easy &mdash; relates to the response, and (4) Make it satisfying &mdash; relates to the reward. The first law focuses on making the trigger for your desired habit visible and unmissable.',
    section: 'Building Habits That Stick',
    difficulty: 'basic' as const,
    topic: 'Atomic Habits Framework',
    category: 'Building Habits That Stick',
  },
  {
    id: 84,
    question: 'What is the correct formula for habit stacking as described by James Clear?',
    options: [
      'After [CURRENT HABIT], I will [NEW HABIT]',
      'Before [NEW HABIT], I will [CURRENT HABIT]',
      'When I feel [EMOTION], I will [NEW HABIT]',
      'Every [TIME], I will [NEW HABIT]',
    ],
    correctAnswer: 0,
    explanation:
      'James Clear popularised habit stacking in &ldquo;Atomic Habits&rdquo;, building on research by BJ Fogg. The formula &ldquo;After [CURRENT HABIT], I will [NEW HABIT]&rdquo; anchors a new behaviour to an existing one, using the established habit as a reliable cue. For example, &ldquo;After I put on my work boots, I will check my PPE bag.&rdquo;',
    section: 'Building Habits That Stick',
    difficulty: 'basic' as const,
    topic: 'Habit Stacking',
    category: 'Building Habits That Stick',
  },
  {
    id: 85,
    question: 'In BJ Fogg&rsquo;s Behaviour Model, what does the formula B = MAP stand for?',
    options: [
      'Behaviour = Motivation, Ability, Prompt',
      'Behaviour = Method, Action, Practice',
      'Behaviour = Mindset, Attitude, Performance',
      'Behaviour = Memory, Attention, Purpose',
    ],
    correctAnswer: 0,
    explanation:
      'BJ Fogg&rsquo;s Behaviour Model states that Behaviour (B) occurs when Motivation (M), Ability (A), and a Prompt (P) converge at the same moment. If any one of these three elements is missing, the behaviour will not happen. Fogg&rsquo;s research at Stanford emphasises starting with &ldquo;tiny habits&rdquo; to keep the ability threshold low.',
    section: 'Building Habits That Stick',
    difficulty: 'basic' as const,
    topic: 'BJ Fogg Behaviour Model',
    category: 'Building Habits That Stick',
  },
  {
    id: 86,
    question: 'What is a &ldquo;keystone habit&rdquo; as defined by Charles Duhigg?',
    options: [
      'A single habit that triggers a cascade of other positive changes',
      'The most difficult habit to break',
      'A habit you have had since childhood',
      'A habit that requires a physical keystone trigger',
    ],
    correctAnswer: 0,
    explanation:
      'Charles Duhigg describes keystone habits in &ldquo;The Power of Habit&rdquo; as habits that create a chain reaction, causing other good habits to form. For example, regular exercise often leads to better eating, improved sleep, and greater productivity &mdash; all from one foundational change.',
    section: 'Building Habits That Stick',
    difficulty: 'basic' as const,
    topic: 'Keystone Habits',
    category: 'Building Habits That Stick',
  },
  {
    id: 87,
    question:
      'According to Shawn Achor&rsquo;s 20-second rule, how can you make a good habit easier to start?',
    options: [
      'Reduce the activation energy so it takes 20 seconds less effort to begin',
      'Commit to doing the habit for only 20 seconds each day',
      'Wait 20 seconds before deciding whether to do the habit',
      'Reward yourself within 20 seconds of completing the habit',
    ],
    correctAnswer: 0,
    explanation:
      'Shawn Achor, in &ldquo;The Happiness Advantage&rdquo; (2010), found that reducing the friction to start a behaviour by just 20 seconds significantly increases the likelihood of doing it. For tradespeople, this could mean laying out your CPD materials the night before so they are immediately accessible in the morning.',
    section: 'Building Habits That Stick',
    difficulty: 'basic' as const,
    topic: 'The 20-Second Rule',
    category: 'Building Habits That Stick',
  },
  {
    id: 88,
    question:
      'Which law of James Clear&rsquo;s framework corresponds to making the reward of a habit immediately satisfying?',
    options: [
      'The 4th Law: Make it satisfying',
      'The 1st Law: Make it obvious',
      'The 2nd Law: Make it attractive',
      'The 3rd Law: Make it easy',
    ],
    correctAnswer: 0,
    explanation:
      'The 4th Law &mdash; Make it satisfying &mdash; addresses the reward phase of the habit loop. James Clear emphasises that behaviours are more likely to be repeated when the experience ends with a satisfying feeling. Tracking progress or giving yourself immediate positive feedback reinforces the habit.',
    section: 'Building Habits That Stick',
    difficulty: 'basic' as const,
    topic: 'Atomic Habits Framework',
    category: 'Building Habits That Stick',
  },
  {
    id: 89,
    question: 'What is the &ldquo;never miss twice&rdquo; rule in habit formation?',
    options: [
      'If you miss a habit once, make sure you get back to it the next day',
      'Never attempt a habit more than twice a day',
      'If you fail twice, abandon the habit and start a new one',
      'Always do the habit at least twice before evaluating it',
    ],
    correctAnswer: 0,
    explanation:
      'The &ldquo;never miss twice&rdquo; rule, popularised by James Clear, recognises that missing a habit once is normal and has negligible impact. However, missing twice starts forming a new pattern of not doing it. The key insight is that one missed day does not ruin your progress &mdash; but the second miss is the start of a new (bad) habit.',
    section: 'Building Habits That Stick',
    difficulty: 'basic' as const,
    topic: 'Consistency Strategies',
    category: 'Building Habits That Stick',
  },
  {
    id: 90,
    question: 'Which part of the Habit Loop does environment design primarily target?',
    options: ['The cue', 'The routine', 'The reward', 'The craving'],
    correctAnswer: 0,
    explanation:
      'Environment design primarily targets the cue &mdash; the trigger that initiates the habit loop. By restructuring your physical environment, you make desired cues more visible and undesired cues invisible. James Clear and BJ Fogg both emphasise that changing your environment is more effective than relying on willpower alone.',
    section: 'Building Habits That Stick',
    difficulty: 'basic' as const,
    topic: 'Environment Design',
    category: 'Building Habits That Stick',
  },
  {
    id: 91,
    question: 'In the context of trade work, which of these is an example of a keystone habit?',
    options: [
      'Completing a daily tool check before starting work',
      'Buying new tools every month',
      'Working overtime every weekend',
      'Avoiding all paperwork until month-end',
    ],
    correctAnswer: 0,
    explanation:
      'A daily tool check is a keystone habit because it cascades into other positive behaviours: improved safety, reduced downtime from lost tools, better organisation on site, and a more professional approach. Duhigg&rsquo;s research shows that keystone habits create &ldquo;small wins&rdquo; that build momentum for broader change.',
    section: 'Building Habits That Stick',
    difficulty: 'basic' as const,
    topic: 'Trade Habits',
    category: 'Building Habits That Stick',
  },
  {
    id: 92,
    question:
      'According to BJ Fogg&rsquo;s Tiny Habits method, what should you do immediately after completing a tiny habit?',
    options: [
      'Celebrate with a small positive emotion',
      'Write it down in a journal',
      'Tell someone about it',
      'Increase the difficulty for next time',
    ],
    correctAnswer: 0,
    explanation:
      'BJ Fogg&rsquo;s Tiny Habits method emphasises immediate celebration after completing a behaviour. He calls this &ldquo;Shine&rdquo; &mdash; a brief moment of positive emotion (such as saying &ldquo;yes!&rdquo; or a fist pump) that wires the habit into your brain. This instant emotional reward is more effective than delayed rewards for habit formation.',
    section: 'Building Habits That Stick',
    difficulty: 'basic' as const,
    topic: 'Tiny Habits',
    category: 'Building Habits That Stick',
  },
  {
    id: 93,
    question: 'What does the &ldquo;compound effect&rdquo; of small daily habits refer to?',
    options: [
      'Tiny improvements accumulate over time to produce remarkable results',
      'Habits must be combined together to have any effect',
      'The negative effects of bad habits compound into serious problems',
      'You need to compound multiple rewards to stay motivated',
    ],
    correctAnswer: 0,
    explanation:
      'James Clear illustrates that getting 1% better each day results in being 37 times better after one year (1.01^365 = 37.78). This compound effect means that small, consistent improvements in areas like tool care, admin, or CPD lead to dramatically different outcomes over months and years.',
    section: 'Building Habits That Stick',
    difficulty: 'basic' as const,
    topic: 'Compound Effect',
    category: 'Building Habits That Stick',
  },
  {
    id: 94,
    question:
      'Which of James Clear&rsquo;s 4 Laws relates to the &ldquo;craving&rdquo; phase of the habit loop?',
    options: [
      'The 2nd Law: Make it attractive',
      'The 1st Law: Make it obvious',
      'The 3rd Law: Make it easy',
      'The 4th Law: Make it satisfying',
    ],
    correctAnswer: 0,
    explanation:
      'The 2nd Law &mdash; Make it attractive &mdash; relates to the craving phase. Clear explains that we are more likely to find a habit attractive when we pair it with something we already enjoy. This is linked to dopamine, which drives anticipation and desire. The more attractive a habit, the stronger the craving to perform it.',
    section: 'Building Habits That Stick',
    difficulty: 'basic' as const,
    topic: 'Atomic Habits Framework',
    category: 'Building Habits That Stick',
  },
  {
    id: 95,
    question: 'What is the primary reason the &ldquo;21-day habit myth&rdquo; is inaccurate?',
    options: [
      'Research by Phillippa Lally showed it takes 18 to 254 days depending on the behaviour',
      'It was originally about breaking habits, not forming them',
      'It only applies to physical habits, not mental ones',
      'The original study was conducted on animals, not humans',
    ],
    correctAnswer: 0,
    explanation:
      'Phillippa Lally&rsquo;s UCL study found that the time to automaticity ranged from 18 to 254 days, with an average of 66 days. The &ldquo;21-day&rdquo; figure originated from Dr Maxwell Maltz&rsquo;s 1960 book &ldquo;Psycho-Cybernetics&rdquo;, where he observed it took a minimum of 21 days for patients to adjust to physical changes &mdash; this was misquoted as a universal rule.',
    section: 'Building Habits That Stick',
    difficulty: 'basic' as const,
    topic: 'Habit Formation Research',
    category: 'Building Habits That Stick',
  },
  {
    id: 96,
    question: 'What does James Clear mean by making a habit &ldquo;easy&rdquo; (the 3rd Law)?',
    options: [
      'Reducing friction so the behaviour requires minimal effort to start',
      'Only choosing habits that are simple and unimportant',
      'Making the habit so easy it has no meaningful benefit',
      'Skipping the habit whenever it feels difficult',
    ],
    correctAnswer: 0,
    explanation:
      'The 3rd Law &mdash; Make it easy &mdash; is about reducing the number of steps between you and your desired behaviour. Clear emphasises that the amount of time you have been performing a habit matters less than the number of times you have performed it. Repetition, not perfection, is what builds habits.',
    section: 'Building Habits That Stick',
    difficulty: 'basic' as const,
    topic: 'Atomic Habits Framework',
    category: 'Building Habits That Stick',
  },

  // --- INTERMEDIATE (16 questions: 97-112) ---
  {
    id: 97,
    question:
      'What is &ldquo;temptation bundling&rdquo; as researched by Katherine Milkman at Wharton?',
    options: [
      'Pairing a behaviour you need to do with a behaviour you want to do',
      'Removing all temptations from your environment',
      'Bundling multiple bad habits together so they are easier to quit',
      'Gradually increasing the temptation to test your willpower',
    ],
    correctAnswer: 0,
    explanation:
      'Katherine Milkman&rsquo;s research at the Wharton School demonstrated that linking a behaviour you need to do (e.g., completing admin paperwork) with something you want to do (e.g., listening to a favourite podcast) significantly increases compliance. This leverages the 2nd Law &mdash; Make it attractive &mdash; by pairing obligation with pleasure.',
    section: 'Building Habits That Stick',
    difficulty: 'intermediate' as const,
    topic: 'Temptation Bundling',
    category: 'Building Habits That Stick',
  },
  {
    id: 98,
    question:
      'According to Roy Baumeister&rsquo;s research, what is the &ldquo;ego depletion&rdquo; theory of willpower?',
    options: [
      'Willpower is a limited resource that gets depleted through use during the day',
      'Your ego prevents you from forming new habits',
      'Willpower increases the more you use it in a single day',
      'Ego depletion only affects people with low self-esteem',
    ],
    correctAnswer: 0,
    explanation:
      'Roy Baumeister&rsquo;s research, published in the Journal of Personality and Social Psychology, demonstrated that self-control draws from a limited pool of mental resources. Each decision and act of self-control depletes this reserve, which is why habit formation strategies that reduce reliance on willpower &mdash; such as environment design and habit stacking &mdash; are more sustainable.',
    section: 'Building Habits That Stick',
    difficulty: 'intermediate' as const,
    topic: 'Willpower Research',
    category: 'Building Habits That Stick',
  },
  {
    id: 99,
    question:
      'How would you apply James Clear&rsquo;s &ldquo;inversion&rdquo; of the 4 Laws to break a bad habit?',
    options: [
      'Make it invisible, unattractive, difficult, and unsatisfying',
      'Replace it with a different habit using the same cue',
      'Increase your willpower through mental training',
      'Announce publicly that you are quitting the habit',
    ],
    correctAnswer: 0,
    explanation:
      'James Clear explains that to break a bad habit, you invert the 4 Laws: (1) Make it invisible &mdash; remove cues, (2) Make it unattractive &mdash; reframe the associations, (3) Make it difficult &mdash; increase friction, and (4) Make it unsatisfying &mdash; add an immediate cost. For example, to stop checking your phone on site, leave it in the van (invisible &amp; difficult).',
    section: 'Building Habits That Stick',
    difficulty: 'intermediate' as const,
    topic: 'Breaking Bad Habits',
    category: 'Building Habits That Stick',
  },
  {
    id: 100,
    question:
      'What is a &ldquo;context-dependent habit&rdquo; and why is it relevant to tradespeople?',
    options: [
      'A habit triggered by a specific environment or situation rather than a time of day',
      'A habit that only works when you are in a good mood',
      'A habit that changes depending on the season',
      'A habit that requires context from a training course to understand',
    ],
    correctAnswer: 0,
    explanation:
      'Context-dependent habits are behaviours triggered by environmental cues rather than conscious decisions. Research by Wendy Wood at USC shows that approximately 43% of daily behaviours are performed in the same location each day. For tradespeople who move between sites, this means habits must be anchored to portable cues (like a toolbag routine) rather than fixed locations.',
    section: 'Building Habits That Stick',
    difficulty: 'intermediate' as const,
    topic: 'Context-Dependent Habits',
    category: 'Building Habits That Stick',
  },
  {
    id: 101,
    question:
      'An electrician wants to build a habit of photographing completed work for their portfolio. Using habit stacking, which approach is best?',
    options: [
      'After I complete the final test on an installation, I will take three photographs',
      'I will try to remember to take photos whenever I think about it',
      'I will set a daily alarm to remind me to take photos',
      'I will take all my portfolio photos at the end of each month',
    ],
    correctAnswer: 0,
    explanation:
      'This follows James Clear&rsquo;s habit stacking formula: &ldquo;After [CURRENT HABIT], I will [NEW HABIT].&rdquo; Anchoring the new behaviour to the final test &mdash; something the electrician already does consistently &mdash; provides a reliable cue. BJ Fogg&rsquo;s research confirms that attaching new behaviours to existing routines is far more effective than time-based reminders.',
    section: 'Building Habits That Stick',
    difficulty: 'intermediate' as const,
    topic: 'Habit Stacking',
    category: 'Building Habits That Stick',
  },
  {
    id: 102,
    question:
      'Which of the following best describes BJ Fogg&rsquo;s approach to starting a new exercise habit?',
    options: [
      'Start with two press-ups after brushing your teeth and celebrate immediately',
      'Commit to one hour of exercise every morning for 30 days',
      'Find an accountability partner and exercise together three times a week',
      'Research the best exercise programme before starting',
    ],
    correctAnswer: 0,
    explanation:
      'BJ Fogg&rsquo;s Tiny Habits method advocates starting absurdly small &mdash; such as two press-ups &mdash; and anchoring the behaviour to an existing habit (brushing teeth). The immediate celebration (&ldquo;Shine&rdquo;) wires positive emotion to the behaviour. Fogg&rsquo;s Stanford research shows that starting tiny removes the need for high motivation, making the habit almost impossible to fail.',
    section: 'Building Habits That Stick',
    difficulty: 'intermediate' as const,
    topic: 'Tiny Habits',
    category: 'Building Habits That Stick',
  },
  {
    id: 103,
    question: 'How does the 20-second rule apply to building a CPD study habit for an electrician?',
    options: [
      'Keep your study materials out and open so starting requires 20 seconds less effort',
      'Study for a minimum of 20 seconds each evening',
      'Wait 20 seconds before deciding whether to study',
      'Set a 20-second timer to make studying feel urgent',
    ],
    correctAnswer: 0,
    explanation:
      'Shawn Achor&rsquo;s 20-second rule states that reducing the &ldquo;activation energy&rdquo; for a desired behaviour by as little as 20 seconds dramatically increases the likelihood of doing it. For CPD, this means keeping your Elec-Mate app on your home screen, bookmarking your current module, or leaving your GN3 open at the right page &mdash; so starting requires minimal effort.',
    section: 'Building Habits That Stick',
    difficulty: 'intermediate' as const,
    topic: 'The 20-Second Rule',
    category: 'Building Habits That Stick',
  },
  {
    id: 104,
    question:
      'What does Phillippa Lally&rsquo;s research say about the effect of occasionally missing a day on habit formation?',
    options: [
      'Missing a single day has no measurable impact on long-term habit formation',
      'Missing one day resets the entire habit-formation process',
      'Missing a day doubles the time needed to form the habit',
      'Missing a day is only acceptable during the first week',
    ],
    correctAnswer: 0,
    explanation:
      'Lally&rsquo;s UCL research found that occasional lapses did not significantly affect the overall process of habit formation. The habit formation curve showed that missing one opportunity did not materially delay reaching automaticity. This finding is central to the &ldquo;never miss twice&rdquo; principle &mdash; perfection is not required, but consistency is.',
    section: 'Building Habits That Stick',
    difficulty: 'intermediate' as const,
    topic: 'Habit Formation Research',
    category: 'Building Habits That Stick',
  },
  {
    id: 105,
    question:
      'An electrician wants to break the habit of leaving admin until Friday afternoon. Using the inversion of the 4 Laws, which strategy addresses &ldquo;Make it difficult&rdquo;?',
    options: [
      'Set up their system so Friday admin access is blocked unless daily entries are completed',
      'Remind themselves how stressful Friday admin is',
      'Ask a colleague to hold them accountable',
      'Reward themselves on days they do admin early',
    ],
    correctAnswer: 0,
    explanation:
      'The inversion of the 3rd Law is &ldquo;Make it difficult&rdquo; &mdash; adding friction to the undesired behaviour. By blocking Friday batch-processing unless daily entries are done, you increase the effort required to procrastinate. James Clear emphasises that adding even small amounts of friction to a bad habit can dramatically reduce its occurrence.',
    section: 'Building Habits That Stick',
    difficulty: 'intermediate' as const,
    topic: 'Breaking Bad Habits',
    category: 'Building Habits That Stick',
  },
  {
    id: 106,
    question:
      'What is the relationship between motivation and ability in BJ Fogg&rsquo;s Behaviour Model?',
    options: [
      'When ability is high, less motivation is needed for the behaviour to occur',
      'Motivation and ability must always be equally high',
      'Ability has no effect on behaviour if motivation is high enough',
      'Motivation is more important than ability in every situation',
    ],
    correctAnswer: 0,
    explanation:
      'In BJ Fogg&rsquo;s B = MAP model, motivation and ability have a compensatory relationship. When a behaviour is very easy (high ability), even low motivation is sufficient to trigger it when a prompt occurs. This is why Fogg advocates making habits &ldquo;tiny&rdquo; &mdash; by maximising ability, you minimise the motivation required.',
    section: 'Building Habits That Stick',
    difficulty: 'intermediate' as const,
    topic: 'BJ Fogg Behaviour Model',
    category: 'Building Habits That Stick',
  },
  {
    id: 107,
    question:
      'Which PPE habit formation strategy best applies the 1st Law (&ldquo;Make it obvious&rdquo;)?',
    options: [
      'Placing PPE at the van door so it is the first thing you see when arriving on site',
      'Reading the site safety rules every morning',
      'Asking your supervisor to check your PPE daily',
      'Buying brightly coloured PPE that stands out',
    ],
    correctAnswer: 0,
    explanation:
      'The 1st Law &mdash; Make it obvious &mdash; focuses on making cues visible and unavoidable. Placing PPE at the van door creates a visual trigger that requires no conscious thought or willpower. James Clear calls this &ldquo;environment design&rdquo; and considers it the most powerful strategy for building good habits because it shapes behaviour at the source.',
    section: 'Building Habits That Stick',
    difficulty: 'intermediate' as const,
    topic: 'Trade Habits',
    category: 'Building Habits That Stick',
  },
  {
    id: 108,
    question: 'How does temptation bundling differ from simple reward-based habit formation?',
    options: [
      'Temptation bundling pairs the habit with a simultaneous pleasure, not a delayed reward',
      'Temptation bundling removes all rewards from the process',
      'Temptation bundling only works with habits you already enjoy',
      'There is no meaningful difference between the two approaches',
    ],
    correctAnswer: 0,
    explanation:
      'Katherine Milkman&rsquo;s research distinguishes temptation bundling from traditional reward systems because the enjoyable activity happens at the same time as the desired behaviour, not afterwards. For instance, only listening to a favourite audiobook while organising your tool inventory creates an immediate pairing, making the mundane task inherently more attractive.',
    section: 'Building Habits That Stick',
    difficulty: 'intermediate' as const,
    topic: 'Temptation Bundling',
    category: 'Building Habits That Stick',
  },
  {
    id: 109,
    question:
      'Which Duhigg concept explains why an electrician who starts meal-prepping on Sundays might also begin keeping a tidier van?',
    options: [
      'Keystone habits creating a cascade of positive behaviours',
      'The reward phase of the habit loop transferring to other areas',
      'Willpower increasing through repeated exercise',
      'Context-dependent habits spreading to new environments',
    ],
    correctAnswer: 0,
    explanation:
      'Duhigg&rsquo;s keystone habits concept explains how one positive change can ripple outward. Meal-prepping demonstrates self-discipline and forward planning, which naturally transfers to other areas like vehicle organisation. Research shows keystone habits work because they change your self-image &mdash; you start seeing yourself as &ldquo;someone who is organised&rdquo;.',
    section: 'Building Habits That Stick',
    difficulty: 'intermediate' as const,
    topic: 'Keystone Habits',
    category: 'Building Habits That Stick',
  },
  {
    id: 110,
    question:
      'According to James Clear, what is the most effective way to track habits without it becoming a chore?',
    options: [
      'Use the simplest possible tracking method, such as marking an X on a calendar',
      'Write a detailed journal entry about each habit every evening',
      'Use a complex spreadsheet with multiple metrics for each habit',
      'Only track habits when you remember to do so',
    ],
    correctAnswer: 0,
    explanation:
      'James Clear advocates for the simplest tracking method possible &mdash; ideally something that takes less than a few seconds. The &ldquo;don&rsquo;t break the chain&rdquo; method (marking an X on a calendar) provides visual satisfaction while applying the 4th Law: Make it satisfying. Complex tracking systems often become barriers to consistency.',
    section: 'Building Habits That Stick',
    difficulty: 'intermediate' as const,
    topic: 'Consistency Strategies',
    category: 'Building Habits That Stick',
  },
  {
    id: 111,
    question:
      'Why is it important for tradespeople to anchor habits to portable cues rather than location-based ones?',
    options: [
      'Because tradespeople frequently change work sites, so location cues are unreliable',
      'Because portable cues are always more effective than location cues',
      'Because location-based cues only work in office environments',
      'Because portable cues require less willpower overall',
    ],
    correctAnswer: 0,
    explanation:
      'Wendy Wood&rsquo;s research at USC shows that habits are strongly tied to environmental context. Since tradespeople move between sites regularly, habits anchored to specific locations may fail. Instead, attaching habits to portable cues &mdash; such as &ldquo;after opening my toolbag&rdquo; or &ldquo;after putting on my hi-vis&rdquo; &mdash; provides a consistent trigger regardless of location.',
    section: 'Building Habits That Stick',
    difficulty: 'intermediate' as const,
    topic: 'Context-Dependent Habits',
    category: 'Building Habits That Stick',
  },
  {
    id: 112,
    question:
      'Which of the following is an example of applying the 4th Law (&ldquo;Make it satisfying&rdquo;) to a tool management habit?',
    options: [
      'Taking a moment to admire your neatly organised toolbag after tidying it',
      'Buying the most expensive tools available',
      'Telling colleagues about your tool organisation system',
      'Reading articles about tool management every week',
    ],
    correctAnswer: 0,
    explanation:
      'The 4th Law requires an immediate sense of satisfaction after performing the habit. Taking a brief moment to appreciate the result provides instant positive reinforcement. James Clear notes that what is immediately rewarded is repeated, and what is immediately punished is avoided &mdash; the key word being &ldquo;immediately&rdquo;.',
    section: 'Building Habits That Stick',
    difficulty: 'intermediate' as const,
    topic: 'Trade Habits',
    category: 'Building Habits That Stick',
  },

  // --- ADVANCED (8 questions: 113-120) ---
  {
    id: 113,
    question:
      'A site manager notices that electricians on their team rarely wear eye protection despite regular reminders. Using all four inversions of Clear&rsquo;s Laws, which combined strategy would be most effective?',
    options: [
      'Store safety glasses at eye level in every work area, display photos of eye injuries, make the glasses ultra-lightweight, and publicly recognise compliant workers daily',
      'Send a weekly email reminder, fine non-compliant workers, and provide a yearly bonus for compliance',
      'Run a one-off training session, ask workers to sign a pledge, and provide certificates of completion',
      'Install CCTV to monitor PPE compliance and issue warnings for each infraction',
    ],
    correctAnswer: 0,
    explanation:
      'This answer applies all four Laws simultaneously: (1) Obvious &mdash; glasses at eye level in every area, (2) Attractive &mdash; visceral photos create negative association with non-compliance, (3) Easy &mdash; lightweight glasses reduce friction, (4) Satisfying &mdash; daily public recognition provides immediate reward. James Clear emphasises that using all four Laws together creates the strongest possible habit formation system.',
    section: 'Building Habits That Stick',
    difficulty: 'advanced' as const,
    topic: 'Trade Habits',
    category: 'Building Habits That Stick',
  },
  {
    id: 114,
    question:
      'How does Phillippa Lally&rsquo;s habit formation curve differ from a linear model, and what is the practical implication?',
    options: [
      'It follows an asymptotic curve where early gains are rapid but automaticity plateaus, meaning early consistency matters most',
      'It is perfectly linear, meaning each day of practice contributes equally',
      'It is exponential, meaning the last few days are the most critical',
      'It follows a step function where automaticity increases in sudden jumps',
    ],
    correctAnswer: 0,
    explanation:
      'Lally&rsquo;s research revealed an asymptotic (diminishing returns) curve: automaticity increases rapidly in the early days and then gradually levels off. The practical implication is that the first few weeks are the most critical period &mdash; this is when the largest gains in automaticity occur. Missing days later in the process has less impact than missing them early on.',
    section: 'Building Habits That Stick',
    difficulty: 'advanced' as const,
    topic: 'Habit Formation Research',
    category: 'Building Habits That Stick',
  },
  {
    id: 115,
    question:
      'An experienced electrician wants to transition from reactive problem-solving to proactive CPD. Integrating Fogg&rsquo;s B = MAP model with Clear&rsquo;s framework, which approach addresses the weakest link?',
    options: [
      'Identify whether the barrier is low motivation, low ability, or a missing prompt, then apply the corresponding Law of Behaviour Change',
      'Simply increase motivation through setting bigger goals',
      'Focus exclusively on making CPD easier by reducing the content difficulty',
      'Add more prompts throughout the day until one of them works',
    ],
    correctAnswer: 0,
    explanation:
      'Fogg&rsquo;s B = MAP model identifies that behaviour fails when any component is insufficient. The advanced approach is to diagnose which element is weakest: if motivation is low, apply the 2nd Law (Make it attractive); if ability is low, apply the 3rd Law (Make it easy); if the prompt is missing, apply the 1st Law (Make it obvious). This targeted approach is more efficient than blanket strategies.',
    section: 'Building Habits That Stick',
    difficulty: 'advanced' as const,
    topic: 'BJ Fogg Behaviour Model',
    category: 'Building Habits That Stick',
  },
  {
    id: 116,
    question:
      'How does Baumeister&rsquo;s ego depletion theory interact with Duhigg&rsquo;s habit loop in explaining why tradespeople may abandon good habits by Friday afternoon?',
    options: [
      'Accumulated decision fatigue throughout the week depletes willpower, making it harder to maintain routines that have not yet become automatic habits',
      'Friday afternoon is simply too close to the weekend for people to care about habits',
      'Ego depletion only affects mental workers, not tradespeople who do physical work',
      'The habit loop breaks down after five consecutive days of any behaviour',
    ],
    correctAnswer: 0,
    explanation:
      'Baumeister&rsquo;s research shows that each decision and act of self-control draws from a finite daily reserve. By Friday, a week of decisions has accumulated significant depletion. Duhigg&rsquo;s habit loop explains why fully automatic habits survive this depletion &mdash; they bypass conscious decision-making. The implication is that habits not yet automatic are most vulnerable to failure when willpower is lowest.',
    section: 'Building Habits That Stick',
    difficulty: 'advanced' as const,
    topic: 'Willpower Research',
    category: 'Building Habits That Stick',
  },
  {
    id: 117,
    question:
      'Katherine Milkman&rsquo;s research found that temptation bundling was most effective under which condition?',
    options: [
      'When the enjoyable activity was exclusively available during the target behaviour',
      'When participants could access the enjoyable activity at any time',
      'When the temptation was food-related',
      'When participants chose their own bundling pairs without guidance',
    ],
    correctAnswer: 0,
    explanation:
      'Milkman&rsquo;s landmark 2014 study at Wharton found that restricting access to the temptation (e.g., a gripping audiobook) to only during the target behaviour (e.g., exercising) produced significantly stronger results than allowing unrestricted access. The exclusivity creates a stronger association and a greater sense of anticipation, amplifying the 2nd Law effect.',
    section: 'Building Habits That Stick',
    difficulty: 'advanced' as const,
    topic: 'Temptation Bundling',
    category: 'Building Habits That Stick',
  },
  {
    id: 118,
    question:
      'An electrical contractor wants to create a company-wide safety culture shift. Using Duhigg&rsquo;s keystone habits concept and Clear&rsquo;s identity-based approach, which strategy is most likely to succeed?',
    options: [
      'Identify one high-visibility safety behaviour, implement it consistently, and frame it as &ldquo;who we are as a company&rdquo; rather than &ldquo;what we have to do&rdquo;',
      'Introduce 20 new safety rules simultaneously and enforce them all strictly',
      'Offer large financial bonuses for zero-incident months',
      'Hire a safety consultant to deliver monthly training seminars',
    ],
    correctAnswer: 0,
    explanation:
      'Duhigg&rsquo;s keystone habit research (exemplified by Paul O&rsquo;Neill&rsquo;s transformation of Alcoa through worker safety) shows that one high-visibility habit can cascade through an organisation. Clear&rsquo;s identity-based approach adds depth: framing the habit as an identity (&ldquo;we are a safety-first company&rdquo;) rather than an outcome (&ldquo;we must reduce incidents&rdquo;) creates intrinsic motivation that sustains the behaviour long-term.',
    section: 'Building Habits That Stick',
    difficulty: 'advanced' as const,
    topic: 'Keystone Habits',
    category: 'Building Habits That Stick',
  },
  {
    id: 119,
    question:
      'Considering Wendy Wood&rsquo;s research on context-dependent memory and BJ Fogg&rsquo;s prompt design, how should a multi-site electrician structure their end-of-day admin habit?',
    options: [
      'Anchor it to a consistent portable cue such as starting the van engine, with the admin app pre-loaded and a tiny first step like logging one item',
      'Set a fixed time alarm regardless of when they finish work each day',
      'Complete all admin at home in the evening when they are relaxed',
      'Use a different admin system for each site to match the context',
    ],
    correctAnswer: 0,
    explanation:
      'Wendy Wood&rsquo;s research shows habits are context-dependent, so multi-site workers need portable cues. Starting the van engine is a consistent daily event regardless of site. BJ Fogg&rsquo;s approach adds three elements: the prompt (engine start), high ability (app pre-loaded, tiny first step), and celebration after the first entry. This design accounts for both context variability and low end-of-day motivation.',
    section: 'Building Habits That Stick',
    difficulty: 'advanced' as const,
    topic: 'Context-Dependent Habits',
    category: 'Building Habits That Stick',
  },
  {
    id: 120,
    question:
      'James Clear argues that the most effective long-term approach to behaviour change focuses on which level of change?',
    options: [
      'Identity-based change (&ldquo;becoming the type of person who...&rdquo;)',
      'Outcome-based change (&ldquo;achieving a specific result&rdquo;)',
      'Process-based change (&ldquo;following a specific system&rdquo;)',
      'Environment-based change (&ldquo;redesigning your surroundings&rdquo;)',
    ],
    correctAnswer: 0,
    explanation:
      'Clear describes three layers of behaviour change: outcomes (what you get), processes (what you do), and identity (what you believe). He argues that lasting change starts at the identity level &mdash; for example, instead of &ldquo;I want to pass my AM2&rdquo; (outcome), adopting &ldquo;I am a committed professional who studies daily&rdquo; (identity). Each completed habit then becomes a vote for your new identity, creating a self-reinforcing cycle.',
    section: 'Building Habits That Stick',
    difficulty: 'advanced' as const,
    topic: 'Atomic Habits Framework',
    category: 'Building Habits That Stick',
  },
];
