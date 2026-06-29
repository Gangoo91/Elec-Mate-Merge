/**
 * Communication & Confidence Mock Exam Question Bank
 *
 * 200 questions covering all 5 categories with difficulty distribution.
 *
 * Categories (5):
 *   Understanding Communication (40) | Listening & Understanding Others (40) |
 *   Speaking with Confidence (40) | Professional Writing & Digital Communication (40) |
 *   Negotiation, Persuasion & Difficult Conversations (40)
 *
 * Difficulty per category: ~40% basic, ~40% intermediate, ~20% advanced
 */

import { StandardMockQuestion, MockExamConfig } from '@/types/standardMockExam';
import { getRandomQuestionsBalanced } from '@/utils/questionSelection';

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------
export const communicationConfidenceCategories = [
  'Understanding Communication',
  'Listening & Understanding Others',
  'Speaking with Confidence',
  'Professional Writing & Digital Communication',
  'Negotiation, Persuasion & Difficult Conversations',
];

// ---------------------------------------------------------------------------
// Exam configuration
// ---------------------------------------------------------------------------
export const communicationConfidenceMockExamConfig: MockExamConfig = {
  examId: 'communication-confidence',
  examTitle: 'Communication & Confidence Mock Examination',
  totalQuestions: 20,
  timeLimit: 1800, // 30 minutes
  passThreshold: 80,
  exitPath: '/study-centre/personal-development/cc-module-6',
  categories: communicationConfidenceCategories,
};

// ---------------------------------------------------------------------------
// Random question selector
// ---------------------------------------------------------------------------
export const getRandomCCExamQuestions = (numQuestions: number = 20) => {
  return getRandomQuestionsBalanced(
    communicationConfidenceQuestionBank,
    numQuestions,
    communicationConfidenceCategories
  );
};

// ---------------------------------------------------------------------------
// Question Bank — 200 questions
// ---------------------------------------------------------------------------
export const communicationConfidenceQuestionBank: StandardMockQuestion[] = [
  // =======================================================================
  // UNDERSTANDING COMMUNICATION — 40 questions (id 1-40)
  // =======================================================================

  // ===== BASIC (id 1-16) =====
  {
    id: 1,
    question: 'In the Shannon-Weaver model of communication, what is the role of the "encoder"?',
    options: [
      'To provide feedback to the sender',
      "To convert the sender's message into a transmittable signal",
      'To receive the message and interpret its meaning',
      'To add background noise to the channel',
    ] as const,
    correctAnswer: 1,
    explanation:
      "In the Shannon-Weaver model (1949), the encoder converts the sender's intended message into a signal suitable for transmission through a channel. For example, when speaking, the vocal cords and mouth act as the encoder, turning thoughts into sound waves.",
    section: 'Understanding Communication',
    difficulty: 'basic' as const,
    topic: 'Shannon-Weaver model',
    category: 'Understanding Communication' as const,
  },
  {
    id: 2,
    question:
      'Which of the following is a key component of the Shannon-Weaver communication model?',
    options: [
      'Self-awareness',
      'Empathy',
      'Noise',
      'Motivation',
    ] as const,
    correctAnswer: 2,
    explanation:
      'The Shannon-Weaver model identifies noise as any interference that distorts or disrupts the message during transmission. This can be physical noise (machinery on site), semantic noise (jargon misunderstanding), or psychological noise (preoccupation or stress).',
    section: 'Understanding Communication',
    difficulty: 'basic' as const,
    topic: 'Shannon-Weaver model',
    category: 'Understanding Communication' as const,
  },
  {
    id: 3,
    question: 'What does the term "channel" refer to in the Shannon-Weaver model?',
    options: [
      'The mental process the receiver uses to interpret the message',
      'The original idea the sender intends to communicate',
      'Any interference that distorts the message in transit',
      'The medium through which a message travels from sender to receiver',
    ] as const,
    correctAnswer: 3,
    explanation:
      'The channel is the medium or pathway through which the encoded message travels. On a construction site this could be face-to-face speech, a two-way radio, a written method statement, or an email. Choosing the right channel affects how clearly the message is received.',
    section: 'Understanding Communication',
    difficulty: 'basic' as const,
    topic: 'Shannon-Weaver model',
    category: 'Understanding Communication' as const,
  },
  {
    id: 4,
    question:
      'According to ILM Level 2 guidance, which of the following best describes effective workplace communication?',
    options: [
      'Ensuring the intended message is received, understood, and acted upon correctly',
      'Using technical language to demonstrate expertise',
      'Speaking loudly and clearly so everyone can hear',
      'Sending written confirmation of every conversation',
    ] as const,
    correctAnswer: 0,
    explanation:
      'ILM Level 2 defines effective communication as ensuring the message is not only transmitted but also received, understood, and acted upon as intended. This goes beyond simply delivering information and requires the communicator to check understanding and adapt their approach.',
    section: 'Understanding Communication',
    difficulty: 'basic' as const,
    topic: 'ILM Level 2',
    category: 'Understanding Communication' as const,
  },
  {
    id: 5,
    question:
      'Which psychologist developed Transactional Analysis (TA) and the concept of ego states?',
    options: [
      'Albert Mehrabian',
      'Eric Berne',
      'Carl Rogers',
      'Abraham Maslow',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Eric Berne developed Transactional Analysis in the 1950s and 1960s. His model identifies three ego states (Parent, Adult, Child) that people shift between during interactions, and understanding these helps explain why communication sometimes breaks down.',
    section: 'Understanding Communication',
    difficulty: 'basic' as const,
    topic: 'Eric Berne TA',
    category: 'Understanding Communication' as const,
  },
  {
    id: 6,
    question: "In Eric Berne's Transactional Analysis, what are the three ego states?",
    options: [
      'Assertive, Passive, and Aggressive',
      'Sender, Receiver, and Observer',
      'Parent, Adult, and Child',
      'Conscious, Subconscious, and Unconscious',
    ] as const,
    correctAnswer: 2,
    explanation:
      "Berne's three ego states are Parent (learned attitudes and behaviours from authority figures), Adult (rational, here-and-now thinking), and Child (feelings and impulses from early experiences). Effective workplace communication typically operates from the Adult ego state.",
    section: 'Understanding Communication',
    difficulty: 'basic' as const,
    topic: 'Eric Berne TA',
    category: 'Understanding Communication' as const,
  },
  {
    id: 7,
    question:
      'What does the acronym SOLER stand for in the context of communication body language?',
    options: [
      'Stand up, Open arms, Look directly, Evaluate, React',
      'Sit down, Observe, Listen, Engage, Respond',
      'Stay calm, Organise thoughts, Listen carefully, Express clearly, Review',
      'Squarely face the person, Open posture, Lean forward, Eye contact, Relax',
    ] as const,
    correctAnswer: 3,
    explanation:
      'SOLER is a framework developed by Gerard Egan to describe attentive body language: Squarely face the person, adopt an Open posture, Lean slightly forward to show interest, maintain appropriate Eye contact, and Relax to appear approachable. This non-verbal framework supports active listening.',
    section: 'Understanding Communication',
    difficulty: 'basic' as const,
    topic: 'SOLER model',
    category: 'Understanding Communication' as const,
  },
  {
    id: 8,
    question:
      'Which of these is an example of "noise" in the Shannon-Weaver model on a construction site?',
    options: [
      'A power drill running while a colleague explains a task',
      'A colleague repeating an instruction back to confirm understanding',
      'A clearly written method statement handed over before the task',
      'A supervisor choosing a quiet location for a safety briefing',
    ] as const,
    correctAnswer: 0,
    explanation:
      'A power drill running during a verbal explanation is physical noise that interferes with the signal between sender and receiver. The Shannon-Weaver model recognises that noise at any point in the channel can distort the message and lead to miscommunication, which is a genuine safety risk on site.',
    section: 'Understanding Communication',
    difficulty: 'basic' as const,
    topic: 'Shannon-Weaver model',
    category: 'Understanding Communication' as const,
  },
  {
    id: 9,
    question: 'What is the primary purpose of an "I-message" in workplace communication?',
    options: [
      'To assign clear responsibility for a mistake to the person who made it',
      'To express feelings and needs without blaming or accusing the other person',
      'To soften a request so the other person feels no obligation to act',
      'To restate the other person\'s point in your own words to confirm it',
    ] as const,
    correctAnswer: 1,
    explanation:
      'I-messages (e.g., "I feel concerned when safety procedures aren\'t followed because someone could get hurt") express the speaker\'s feelings and needs without placing blame. This reduces defensiveness and keeps communication constructive, making them particularly valuable during site disagreements.',
    section: 'Understanding Communication',
    difficulty: 'basic' as const,
    topic: 'I-messages',
    category: 'Understanding Communication' as const,
  },
  {
    id: 10,
    question:
      'Which communication style involves expressing your own needs while also respecting the needs of others?',
    options: [
      'Passive',
      'Aggressive',
      'Assertive',
      'Passive-aggressive',
    ] as const,
    correctAnswer: 2,
    explanation:
      "Assertive communication involves clearly expressing your own thoughts, feelings, and needs while simultaneously respecting the rights and needs of others. It is distinct from aggressive (disregarding others' needs), passive (neglecting your own needs), and passive-aggressive (indirectly expressing dissatisfaction) styles.",
    section: 'Understanding Communication',
    difficulty: 'basic' as const,
    topic: 'communication styles',
    category: 'Understanding Communication' as const,
  },
  {
    id: 11,
    question: 'What is the main limitation of one-way communication?',
    options: [
      'It takes significantly longer to deliver than two-way communication',
      'It can only be used for written messages, never for spoken ones',
      'It requires specialist equipment that is rarely available on site',
      'There is no opportunity for the receiver to ask questions or provide feedback',
    ] as const,
    correctAnswer: 3,
    explanation:
      'One-way communication (such as a written notice or a tannoy announcement) does not allow the receiver to seek clarification or confirm understanding. Without a feedback loop, misunderstandings are more likely and the sender cannot verify that the message has been correctly interpreted.',
    section: 'Understanding Communication',
    difficulty: 'basic' as const,
    topic: 'communication styles',
    category: 'Understanding Communication' as const,
  },
  {
    id: 12,
    question: 'Which of the following is an example of a physical barrier to communication?',
    options: [
      'Loud machinery on a building site',
      'Using overly technical jargon',
      'Having a personal dislike of a colleague',
      'Being distracted by worry about a deadline',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Physical barriers are environmental factors that prevent or distort message transmission. Loud machinery is a classic physical barrier on construction sites. Jargon is a semantic/language barrier, personal dislike is an attitudinal barrier, and worry is a psychological barrier.',
    section: 'Understanding Communication',
    difficulty: 'basic' as const,
    topic: 'barrier framework',
    category: 'Understanding Communication' as const,
  },
  {
    id: 13,
    question:
      'Under CDM 2015, which duty holder has a specific duty to ensure that relevant information is communicated to all workers on site?',
    options: [
      'The Client',
      'The Principal Contractor',
      'The Designer',
      'The CDM Coordinator',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Under the Construction (Design and Management) Regulations 2015, the Principal Contractor has a duty to ensure that relevant safety and health information is communicated to all workers. This includes site rules, emergency procedures, and relevant risk information. Clear communication is a legal obligation, not just good practice.',
    section: 'Understanding Communication',
    difficulty: 'basic' as const,
    topic: 'CDM 2015',
    category: 'Understanding Communication' as const,
  },
  {
    id: 14,
    question:
      'What type of communication barrier is created when a supervisor uses highly technical electrical terminology with a new apprentice?',
    options: [
      'A systematic barrier',
      'A physiological barrier',
      'A semantic or language barrier',
      'A physical barrier',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Using jargon or technical language that the receiver does not understand creates a semantic (language) barrier. On site, experienced electricians should adapt their language when communicating with apprentices or other trades to ensure the message is understood.',
    section: 'Understanding Communication',
    difficulty: 'basic' as const,
    topic: 'barrier framework',
    category: 'Understanding Communication' as const,
  },
  {
    id: 15,
    question: 'In workplace communication, what does "feedback" primarily help to achieve?',
    options: [
      'A permanent written record of every instruction given on site',
      'A faster delivery of the message to a larger number of people',
      'A reduction in the amount of technical detail the sender must include',
      'Confirmation that the message has been received and understood as intended',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Feedback closes the communication loop by allowing the sender to verify that their message was received and understood correctly. On site, this might be as simple as asking "Can you repeat back what I just asked you to do?" — a practice that significantly reduces errors and safety incidents.',
    section: 'Understanding Communication',
    difficulty: 'basic' as const,
    topic: 'communication styles',
    category: 'Understanding Communication' as const,
  },
  {
    id: 16,
    question: 'Which of the following best describes "passive" communication?',
    options: [
      'Avoiding expressing your own opinions or needs to prevent conflict',
      'Expressing your views forcefully without regard for others',
      'Clearly stating your position while respecting others',
      'Saying one thing but meaning another',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Passive communication involves failing to express honest feelings, needs, or opinions, often to avoid conflict. In a workplace context, this can be dangerous — for example, an apprentice who passively agrees they understand a task when they actually do not could create a safety risk.',
    section: 'Understanding Communication',
    difficulty: 'basic' as const,
    topic: 'communication styles',
    category: 'Understanding Communication' as const,
  },

  // ===== INTERMEDIATE (id 17-32) =====
  {
    id: 17,
    question: 'In Transactional Analysis, a "crossed transaction" occurs when:',
    options: [
      'The sender uses both verbal and non-verbal signals simultaneously',
      'The response comes from a different ego state than the one addressed, causing communication breakdown',
      'Two people speak at the same time and interrupt each other',
      'A message is sent through the wrong communication channel',
    ] as const,
    correctAnswer: 1,
    explanation:
      'In Berne\'s Transactional Analysis, a crossed transaction happens when a message aimed at one ego state receives a response from a different one. For example, an Adult-to-Adult request ("Can you check that circuit?") met with a Child response ("You\'re always picking on me!") creates a crossed transaction and communication breakdown.',
    section: 'Understanding Communication',
    difficulty: 'intermediate' as const,
    topic: 'Eric Berne TA',
    category: 'Understanding Communication' as const,
  },
  {
    id: 18,
    question: "Albert Mehrabian's 7-38-55 rule applies specifically to communication about:",
    options: [
      'Technical instructions where precise wording carries the meaning',
      'Written communication such as emails and method statements',
      'Feelings and attitudes when the verbal and non-verbal messages are incongruent',
      'Any face-to-face conversation, regardless of its subject matter',
    ] as const,
    correctAnswer: 2,
    explanation:
      "Mehrabian's research found that when communicating feelings and attitudes, and when verbal and non-verbal cues are inconsistent (incongruent), the receiver relies on words for only 7%, tone of voice for 38%, and body language for 55%. This rule does NOT apply to all communication — it is specific to the expression of feelings and attitudes with incongruent messages.",
    section: 'Understanding Communication',
    difficulty: 'intermediate' as const,
    topic: 'Mehrabian 7-38-55',
    category: 'Understanding Communication' as const,
  },
  {
    id: 19,
    question:
      'According to Mehrabian\'s research, when someone says "I\'m fine" with a frown and flat tone, which element do receivers rely on most to interpret the true feeling?',
    options: [
      'The context of the conversation (100%)',
      'The words spoken (7%)',
      'The tone of voice (38%)',
      'Body language (55%)',
    ] as const,
    correctAnswer: 3,
    explanation:
      'When there is incongruence between verbal and non-verbal signals about feelings and attitudes, Mehrabian found that body language accounts for 55% of the message received, tone of voice for 38%, and the actual words for only 7%. In this example, the frown contradicts "I\'m fine," so the receiver trusts the body language over the words.',
    section: 'Understanding Communication',
    difficulty: 'intermediate' as const,
    topic: 'Mehrabian 7-38-55',
    category: 'Understanding Communication' as const,
  },
  {
    id: 20,
    question:
      "Why is it incorrect to apply Mehrabian's 7-38-55 rule to a toolbox talk about electrical safety procedures?",
    options: [
      'Because the rule only applies to the communication of feelings and attitudes with incongruent messages, not to factual information',
      'Because the rule only applies when the speaker and listener are from different trades',
      'Because the rule was developed for written communication, not spoken briefings',
      'Because the rule states that words carry 55% of the meaning in any message',
    ] as const,
    correctAnswer: 0,
    explanation:
      "Mehrabian's 7-38-55 finding was derived from experiments about communicating feelings and attitudes where verbal and non-verbal cues were inconsistent. It was never intended to apply to factual, technical communication. Applying it to a safety briefing would be a misuse of the research — in a toolbox talk, the actual words (content) are critically important.",
    section: 'Understanding Communication',
    difficulty: 'intermediate' as const,
    topic: 'Mehrabian 7-38-55',
    category: 'Understanding Communication' as const,
  },
  {
    id: 21,
    question:
      'In Transactional Analysis, which type of transaction is most likely to produce effective, adult workplace communication?',
    options: [
      'A crossed Parent-to-Child transaction',
      'A complementary Adult-to-Adult transaction',
      'An ulterior Child-to-Child transaction',
      'A complementary Parent-to-Child transaction',
    ] as const,
    correctAnswer: 1,
    explanation:
      'A complementary Adult-to-Adult transaction is the most productive for workplace communication. Both parties are operating rationally, dealing with facts and current reality, and respecting each other as equals. This ego state pairing minimises emotional reactions and keeps discussions focused on problem-solving.',
    section: 'Understanding Communication',
    difficulty: 'intermediate' as const,
    topic: 'Eric Berne TA',
    category: 'Understanding Communication' as const,
  },
  {
    id: 22,
    question:
      'An electrician tells an apprentice, "You should know better than to wire it like that!" Which ego state is the electrician communicating from?',
    options: [
      'Free Child',
      'Adult',
      'Critical Parent',
      'Nurturing Parent',
    ] as const,
    correctAnswer: 2,
    explanation:
      'The statement "You should know better" is judgemental and disapproving, characteristic of the Critical Parent ego state. A more effective approach would be to communicate from the Adult state: "The wiring needs to be changed because..." — this provides useful information without triggering a defensive Child response.',
    section: 'Understanding Communication',
    difficulty: 'intermediate' as const,
    topic: 'Eric Berne TA',
    category: 'Understanding Communication' as const,
  },
  {
    id: 23,
    question: 'Which of the following is a psychological barrier to communication?',
    options: [
      "Generators and power tools running during a verbal briefing",
      "An instruction given using unfamiliar technical jargon",
      "A poor mobile signal cutting out during a phone call",
      "A receiver's preconceived negative opinion about the sender",
    ] as const,
    correctAnswer: 3,
    explanation:
      'Psychological barriers are internal mental states that interfere with receiving and processing messages. A preconceived negative opinion (bias or prejudice) means the receiver may dismiss or distort the message regardless of its content. This is distinct from physical barriers (noise), language barriers, or message quality issues.',
    section: 'Understanding Communication',
    difficulty: 'intermediate' as const,
    topic: 'barrier framework',
    category: 'Understanding Communication' as const,
  },
  {
    id: 24,
    question:
      'In the SOLER model, why is "leaning slightly forward" recommended during a conversation?',
    options: [
      'It signals genuine interest and attentiveness to the speaker',
      'It reduces the need for eye contact',
      'It establishes physical dominance in the interaction',
      'It helps the listener hear more clearly in noisy environments',
    ] as const,
    correctAnswer: 0,
    explanation:
      "In Egan's SOLER model, leaning slightly forward communicates engagement and genuine interest in what the other person is saying. This subtle body language cue encourages the speaker to continue sharing and creates a sense of connection. It should be natural, not exaggerated, to avoid appearing intrusive.",
    section: 'Understanding Communication',
    difficulty: 'intermediate' as const,
    topic: 'SOLER model',
    category: 'Understanding Communication' as const,
  },
  {
    id: 25,
    question:
      'Under CDM 2015, what is the communication responsibility of the Designer in relation to health and safety risks?',
    options: [
      'To supervise all site workers directly and issue daily instructions',
      'To communicate foreseeable risks that cannot be designed out to those who need the information',
      'To prepare and maintain the construction phase health and safety plan',
      'To ensure welfare facilities are provided throughout the construction phase',
    ] as const,
    correctAnswer: 1,
    explanation:
      'CDM 2015 requires Designers to communicate information about foreseeable risks that cannot be eliminated through design. This includes providing relevant information to the Principal Designer, Principal Contractor, and other designers so that risks can be managed during construction. This is typically done through drawings, specifications, and design risk assessments.',
    section: 'Understanding Communication',
    difficulty: 'intermediate' as const,
    topic: 'CDM 2015',
    category: 'Understanding Communication' as const,
  },
  {
    id: 26,
    question: 'What distinguishes assertive communication from aggressive communication?',
    options: [
      "Assertive communication is always delivered in writing; aggressive is spoken",
      "Assertive communication avoids stating your needs; aggressive states them clearly",
      "Assertive communication respects both your own rights and the rights of others; aggressive communication disregards others' rights",
      "Assertive communication is used only with superiors; aggressive with subordinates",
    ] as const,
    correctAnswer: 2,
    explanation:
      "The key distinction is respect for rights. Assertive communication expresses your needs, opinions, and boundaries clearly while still acknowledging and respecting the other person's perspective. Aggressive communication prioritises your own needs at the expense of others, often involving blame, intimidation, or dismissiveness.",
    section: 'Understanding Communication',
    difficulty: 'intermediate' as const,
    topic: 'communication styles',
    category: 'Understanding Communication' as const,
  },
  {
    id: 27,
    question: 'An I-message typically follows which structure?',
    options: [
      '"I feel [emotion] when [specific behaviour] because [impact on me]"',
      '"I think you should [instruction] because [reason]"',
      '"I am telling you that [demand] or else [consequence]"',
      '"I want [outcome] and you need to [action]"',
    ] as const,
    correctAnswer: 0,
    explanation:
      'The classic I-message structure identifies the speaker\'s feeling, the specific behaviour that triggered it, and the tangible impact. For example: "I feel frustrated when materials aren\'t put back because I waste time looking for them." This approach takes ownership of feelings and avoids accusatory "you" language.',
    section: 'Understanding Communication',
    difficulty: 'intermediate' as const,
    topic: 'I-messages',
    category: 'Understanding Communication' as const,
  },
  {
    id: 28,
    question:
      'Which of the following scenarios best illustrates a "semantic barrier" to communication?',
    options: [
      'An electrician uses the term "earth continuity conductor" while the plumber thinks they mean a physical earth wire to the ground',
      'A fire alarm sounds repeatedly during a verbal handover of instructions',
      'A worker is too anxious about a deadline to take in a safety briefing',
      'A printed notice uses a font too small for some workers to read easily',
    ] as const,
    correctAnswer: 0,
    explanation:
      'A semantic barrier arises when the same words carry different meanings for sender and receiver. Technical terminology can mean different things across trades. The fire alarm is a physical barrier, nervousness is a psychological barrier, and small font is a physical/presentation barrier.',
    section: 'Understanding Communication',
    difficulty: 'intermediate' as const,
    topic: 'barrier framework',
    category: 'Understanding Communication' as const,
  },
  {
    id: 29,
    question:
      'According to ILM Level 2 guidance, which factor has the GREATEST impact on whether communication is effective?',
    options: [
      'Whether the sender used correct grammar and vocabulary',
      'Whether the receiver understood the message and can act on it correctly',
      'Whether the message was delivered in person rather than in writing',
      'Whether the sender holds a more senior position than the receiver',
    ] as const,
    correctAnswer: 1,
    explanation:
      "ILM Level 2 emphasises that the true measure of effective communication is the receiver's understanding and ability to act correctly. The sender bears responsibility for ensuring the message lands — this means checking understanding, adapting to the audience, and choosing appropriate methods.",
    section: 'Understanding Communication',
    difficulty: 'intermediate' as const,
    topic: 'ILM Level 2',
    category: 'Understanding Communication' as const,
  },
  {
    id: 30,
    question:
      'In the Shannon-Weaver model, adding a "feedback loop" from receiver to sender primarily addresses which limitation of the original model?',
    options: [
      'The original model could not represent physical noise in the channel',
      'The original model assumed sender and receiver spoke different languages',
      'The original model was linear and one-directional, with no mechanism for the receiver to confirm understanding',
      'The original model required a written rather than a spoken message',
    ] as const,
    correctAnswer: 2,
    explanation:
      'The original Shannon-Weaver model (1949) was a linear, one-way model developed for telephone communication. Later adaptations added a feedback loop to represent two-way communication, allowing the receiver to signal whether the message was received and understood. This made the model more applicable to human interpersonal communication.',
    section: 'Understanding Communication',
    difficulty: 'intermediate' as const,
    topic: 'Shannon-Weaver model',
    category: 'Understanding Communication' as const,
  },
  {
    id: 31,
    question:
      'Which element of the SOLER model is most likely to need cultural adaptation when working on a diverse construction site?',
    options: [
      'Leaning forward, because the distance norms are the same globally',
      'Squarely facing the person, because all cultures value face-to-face interaction equally',
      'Relaxing, because relaxation is universally understood the same way',
      'Eye contact, because norms for direct eye contact vary significantly across cultures',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Eye contact norms vary significantly across cultures. In some cultures, sustained direct eye contact signals respect and attentiveness; in others, it can be perceived as challenging, disrespectful, or intrusive. On diverse construction sites, being aware of these differences helps avoid unintended offence and supports inclusive communication.',
    section: 'Understanding Communication',
    difficulty: 'intermediate' as const,
    topic: 'SOLER model',
    category: 'Understanding Communication' as const,
  },
  {
    id: 32,
    question:
      'A site manager says to an electrician, "Don\'t worry, I\'ll take care of everything — you just do as I say." Which TA ego state dynamic does this represent?',
    options: [
      'Parent-to-Child, with the manager adopting a Nurturing (or Controlling) Parent role',
      'Adult-to-Child, with the manager providing factual instructions',
      'Child-to-Parent, with the manager seeking approval',
      'Adult-to-Adult, with the manager being helpful and efficient',
    ] as const,
    correctAnswer: 0,
    explanation:
      "The statement \"Don't worry, I'll take care of everything — just do as I say\" places the manager in a Parent ego state (either Nurturing or Controlling) and positions the electrician as a Child. While possibly well-intentioned, this dynamic undermines the electrician's professional autonomy and can lead to resentment or disengagement.",
    section: 'Understanding Communication',
    difficulty: 'intermediate' as const,
    topic: 'Eric Berne TA',
    category: 'Understanding Communication' as const,
  },

  // ===== ADVANCED (id 33-40) =====
  {
    id: 33,
    question:
      'A researcher claims that "93% of all communication is non-verbal" based on Mehrabian\'s work. What is the most accurate critique of this claim?',
    options: [
      "The figure should be 87%, because tone of voice and body language add up to that amount",
      "It overgeneralises Mehrabian's findings, which only apply to the communication of feelings and attitudes when verbal and non-verbal cues are incongruent",
      "The claim is correct but only applies to communication over the telephone",
      "The claim understates the figure, as research shows non-verbal cues carry 99% of meaning",
    ] as const,
    correctAnswer: 1,
    explanation:
      "This is one of the most widely misquoted statistics in communication studies. Mehrabian himself has stated that his findings are frequently misinterpreted. The 7-38-55 percentages were derived from two small studies about how people judge feelings and attitudes when the speaker's words, tone, and body language are inconsistent. Applying this to all communication — especially technical, factual, or written — is a fundamental misrepresentation of the research.",
    section: 'Understanding Communication',
    difficulty: 'advanced' as const,
    topic: 'Mehrabian 7-38-55',
    category: 'Understanding Communication' as const,
  },
  {
    id: 34,
    question:
      'In Transactional Analysis, an "ulterior transaction" is most dangerous in workplace communication because:',
    options: [
      'The message is sent through the wrong channel and never reaches the receiver',
      'Both parties speak from the Child ego state, leading to an emotional argument',
      'The overt (social) message differs from the covert (psychological) message, creating hidden agendas',
      'The receiver responds from a different ego state than the one that was addressed',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Ulterior transactions operate on two levels simultaneously — the overt social message and a hidden psychological message. For example, a colleague saying "That\'s an interesting way to wire it" with a sarcastic tone is delivering a critical hidden message beneath an apparently neutral statement. These transactions are manipulative and undermine trust, making them particularly problematic in safety-critical environments.',
    section: 'Understanding Communication',
    difficulty: 'advanced' as const,
    topic: 'Eric Berne TA',
    category: 'Understanding Communication' as const,
  },
  {
    id: 35,
    question:
      'How do the CDM 2015 Regulations position communication in relation to the hierarchy of risk control?',
    options: [
      'Communication replaces physical controls once a risk has been identified',
      'Communication is the first control to apply, before any attempt to design out risk',
      'Communication is optional once a risk assessment has been documented',
      'Communication of residual risks is required when hazards cannot be eliminated or reduced through design, forming part of the "inform" step after designing out risk',
    ] as const,
    correctAnswer: 3,
    explanation:
      'CDM 2015 follows a hierarchy: eliminate, reduce, inform. Communication sits within the "inform" stage — once risks cannot be designed out or reduced, relevant information about residual risks must be communicated to those who need to manage them. This means communication is a legal duty that complements (but never replaces) physical risk controls.',
    section: 'Understanding Communication',
    difficulty: 'advanced' as const,
    topic: 'CDM 2015',
    category: 'Understanding Communication' as const,
  },
  {
    id: 36,
    question:
      'A project manager consistently addresses the team from a Critical Parent ego state. According to Transactional Analysis theory, what is the most likely long-term effect on team communication?',
    options: [
      'Team members will increasingly respond from the Adapted Child ego state, becoming compliant but disengaged, or from the Rebellious Child state, creating conflict',
      'Team members will gradually shift into a stable Adult-to-Adult dynamic with the manager',
      'Team members will mirror the Critical Parent state and confront the manager as equals',
      'Team members will become more open and willing to raise safety concerns over time',
    ] as const,
    correctAnswer: 0,
    explanation:
      'TA theory predicts that persistent Critical Parent communication invites complementary Child responses. Over time, team members either become Adapted Child (compliant but passive, unlikely to raise concerns) or Rebellious Child (resistant and confrontational). Both outcomes damage open communication. In safety-critical environments, Adapted Child responses are particularly dangerous because workers may not speak up about hazards.',
    section: 'Understanding Communication',
    difficulty: 'advanced' as const,
    topic: 'Eric Berne TA',
    category: 'Understanding Communication' as const,
  },
  {
    id: 37,
    question:
      'Which of the following correctly explains the relationship between the Shannon-Weaver model and modern workplace communication theory?',
    options: [
      'The Shannon-Weaver model has been disproved and is no longer used in any context',
      'The Shannon-Weaver model provides a useful structural framework but must be supplemented with interpersonal elements like feedback, context, and shared meaning to fully represent human communication',
      'The Shannon-Weaver model fully captures human communication and needs no additions',
      'The Shannon-Weaver model applies only to written communication, not spoken interaction',
    ] as const,
    correctAnswer: 1,
    explanation:
      "The Shannon-Weaver model (originally designed for telecommunications) remains valuable as a structural framework for understanding the components of communication. However, human communication is more complex than signal transmission — it requires shared meaning, context, feedback, and interpersonal dynamics that later models (such as Schramm's interactive model and Barnlund's transactional model) address more fully.",
    section: 'Understanding Communication',
    difficulty: 'advanced' as const,
    topic: 'Shannon-Weaver model',
    category: 'Understanding Communication' as const,
  },
  {
    id: 38,
    question:
      'An electrician uses an I-message during a site meeting: "I feel concerned when isolation procedures aren\'t followed because it puts people at risk of electric shock." A colleague responds, "Stop being so dramatic." How should the electrician respond to maintain assertive communication?',
    options: [
      'Drop the subject to avoid conflict, since the colleague clearly disagrees',
      'Raise their voice and insist the colleague is putting lives at risk',
      'Calmly restate the concern using another I-message, such as "I understand it might seem that way, but this is about safety and I need us to follow the procedure"',
      'Report the colleague to the site manager without speaking to them first',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Maintaining assertive communication after being dismissed requires emotional regulation and persistence. Calmly restating the concern with another I-message acknowledges the colleague\'s response without accepting the dismissal, keeps the focus on the safety issue, and models professional Adult-to-Adult communication. This is the "broken record" assertiveness technique combined with empathetic acknowledgement.',
    section: 'Understanding Communication',
    difficulty: 'advanced' as const,
    topic: 'I-messages',
    category: 'Understanding Communication' as const,
  },
  {
    id: 39,
    question:
      'When multiple communication barriers exist simultaneously (e.g., physical noise, semantic confusion, and psychological stress), what approach does ILM Level 2 guidance recommend?',
    options: [
      'Abandon the message and try again on another day when conditions improve',
      'Increase your volume and repeat the message until the receiver responds',
      'Deliver the message in full and rely on the receiver to filter out the interference',
      'Identify and address the most impactful barrier first, then systematically reduce others using channel selection, language adaptation, and emotional awareness',
    ] as const,
    correctAnswer: 3,
    explanation:
      "When facing multiple simultaneous barriers, a systematic approach is needed. ILM Level 2 guidance emphasises identifying which barrier is most disruptive, addressing it first, and then tackling others. This might mean moving to a quieter location (physical), simplifying language (semantic), and checking the receiver's emotional state (psychological) before delivering the message.",
    section: 'Understanding Communication',
    difficulty: 'advanced' as const,
    topic: 'ILM Level 2',
    category: 'Understanding Communication' as const,
  },
  {
    id: 40,
    question:
      'In a complex multi-trade project environment, which combination of communication frameworks would be MOST effective for ensuring clear, respectful information flow between trades?',
    options: [
      'Adult ego state (TA) for rational exchanges, SOLER for attentive body language, I-messages for raising concerns, and systematic barrier identification for troubleshooting breakdowns',
      'Critical Parent ego state for authority, aggressive communication for urgency, and one-way channels for efficiency',
      'Passive communication to avoid inter-trade conflict, with written notices as the only communication method',
      "Mehrabian's 7-38-55 rule applied to all site communications, with non-verbal cues prioritised over technical content",
    ] as const,
    correctAnswer: 0,
    explanation:
      'Effective multi-trade communication requires an integrated approach: Adult-to-Adult transactions (TA) ensure rational, respectful exchanges; SOLER supports attentive non-verbal behaviour during face-to-face interactions; I-messages allow concerns to be raised without blame; and systematic barrier identification helps troubleshoot when communication fails. This combination addresses both the structural and interpersonal dimensions of communication.',
    section: 'Understanding Communication',
    difficulty: 'advanced' as const,
    topic: 'communication styles',
    category: 'Understanding Communication' as const,
  },

  // =======================================================================
  // LISTENING & UNDERSTANDING OTHERS — 40 questions (id 41-80)
  // =======================================================================

  // ===== BASIC (id 41-56) =====
  {
    id: 41,
    question: 'What is the primary difference between "hearing" and "listening"?',
    options: [
      'Hearing requires eye contact, whereas listening can be done with your back turned',
      'Hearing is a passive physical process; listening is an active mental process of interpreting and understanding',
      'Hearing involves understanding meaning, whereas listening is simply detecting sound',
      'Hearing applies only to face-to-face conversation; listening applies only to phone calls',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Hearing is the physiological reception of sound waves — it happens automatically. Listening is an active cognitive process that involves paying attention, interpreting meaning, and seeking to understand the speaker's message. Effective workplace communication requires conscious listening, not just passive hearing.",
    section: 'Listening & Understanding Others',
    difficulty: 'basic' as const,
    topic: 'active listening',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 42,
    question: 'According to Stephen Covey, how many levels of listening are there?',
    options: [
      'Three',
      'Two',
      'Five',
      'Seven',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Stephen Covey identified five levels of listening: ignoring, pretend listening, selective listening, attentive listening, and empathetic listening. Each level represents a deeper degree of engagement with the speaker, with empathetic listening being the highest and most effective level.',
    section: 'Listening & Understanding Others',
    difficulty: 'basic' as const,
    topic: "Covey's 5 levels",
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 43,
    question: 'What is "selective listening" in Covey\'s framework?',
    options: [
      'Focusing exclusively on the most important person in the room',
      'Carefully choosing which conversations to participate in',
      'Listening to one person at a time in a group setting',
      'Hearing only the parts of a message that interest you or confirm your existing views',
    ] as const,
    correctAnswer: 3,
    explanation:
      "Selective listening (Covey's third level) involves filtering the speaker's message and only hearing parts that are interesting, relevant, or that confirm existing beliefs. On site, this is dangerous — a worker selectively listening during a safety briefing might miss a critical piece of information.",
    section: 'Listening & Understanding Others',
    difficulty: 'basic' as const,
    topic: "Covey's 5 levels",
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 44,
    question: "What is Covey's Habit 5?",
    options: [
      'Seek first to understand, then to be understood',
      'Begin with the end in mind',
      'Put first things first',
      'Sharpen the saw',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Covey\'s Habit 5, "Seek first to understand, then to be understood," is a foundational principle of effective communication. It means genuinely listening to understand the other person\'s perspective before presenting your own. This habit builds trust and reduces conflict in workplace relationships.',
    section: 'Listening & Understanding Others',
    difficulty: 'basic' as const,
    topic: 'Habit 5',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 45,
    question: 'What does the "R" stand for in the RASA listening model?',
    options: [
      'Respond',
      'Receive',
      'Reflect',
      'Repeat',
    ] as const,
    correctAnswer: 1,
    explanation:
      "In Julian Treasure's RASA model, the R stands for Receive — paying attention to the speaker. The full acronym is Receive, Appreciate, Summarise, Ask. It provides a simple framework for conscious, active listening in any setting.",
    section: 'Listening & Understanding Others',
    difficulty: 'basic' as const,
    topic: 'RASA model',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 46,
    question: 'In the RASA listening model, what does "Appreciate" involve?',
    options: [
      'Openly agreeing with every point the speaker makes to keep them comfortable',
      'Praising the speaker for the quality of their argument once they finish',
      'Making small verbal acknowledgements like "mm-hmm," "I see," or nodding to show you are engaged',
      'Thanking the speaker formally at the end and noting their contribution in writing',
    ] as const,
    correctAnswer: 2,
    explanation:
      'In the RASA model, "Appreciate" means providing small signals — both verbal (such as "I see," "mm-hmm," "go on") and non-verbal (nodding, eye contact) — that demonstrate you are actively engaged and valuing what the speaker is sharing. It does not mean agreeing with the content, but showing you are present and attentive.',
    section: 'Listening & Understanding Others',
    difficulty: 'basic' as const,
    topic: 'RASA model',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 47,
    question: 'What is "active listening"?',
    options: [
      'Waiting for your turn to speak while the other person talks',
      'Listening while performing another task at the same time',
      'Interrupting the speaker to show that you are engaged',
      'A deliberate effort to fully concentrate on, understand, and respond to a speaker',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Active listening is a conscious effort to hear not only the words being said but also to understand the complete message. It involves giving full attention, withholding judgement, providing feedback, and responding appropriately. Simply waiting for your turn to speak is not active listening — it is rehearsing your response.',
    section: 'Listening & Understanding Others',
    difficulty: 'basic' as const,
    topic: 'active listening',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 48,
    question: 'Which of the following is an example of "paraphrasing" during a conversation?',
    options: [
      '"So what you\'re saying is that the circuit needs to be re-routed to avoid the water pipe?"',
      '"Why didn\'t you spot the water pipe before you started routing the circuit?"',
      '"You\'ll need to re-route that circuit around the water pipe straight away."',
      '"Did the water pipe affect the route you took for the circuit?"',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Paraphrasing means restating the speaker\'s message in your own words to confirm understanding. "So what you\'re saying is..." demonstrates that you have listened and are checking your comprehension. This is a core active listening skill that reduces miscommunication on site.',
    section: 'Listening & Understanding Others',
    difficulty: 'basic' as const,
    topic: 'paraphrasing',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 49,
    question: 'What type of question is "Can you tell me more about the fault you found?"',
    options: [
      'A leading question',
      'An open question',
      'A rhetorical question',
      'A closed question',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Open questions begin with words like "what," "how," "why," "tell me," and invite detailed, expansive responses. "Can you tell me more about..." encourages the speaker to elaborate, which is valuable when investigating faults, gathering information, or understanding a colleague\'s perspective.',
    section: 'Listening & Understanding Others',
    difficulty: 'basic' as const,
    topic: 'question types',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 50,
    question: 'Which of the following is a "closed question"?',
    options: [
      '"What challenges did you face during the installation?"',
      '"How did you approach the cable routing?"',
      '"Did you isolate the supply before starting work?"',
      '"Why do you think the RCD keeps tripping?"',
    ] as const,
    correctAnswer: 2,
    explanation:
      'A closed question can be answered with a simple "yes" or "no" or a short factual response. "Did you isolate the supply?" expects a yes/no answer. Closed questions are useful for confirming specific facts but do not encourage detailed explanations.',
    section: 'Listening & Understanding Others',
    difficulty: 'basic' as const,
    topic: 'question types',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 51,
    question: 'In the context of listening, what does "reflective listening" primarily involve?',
    options: [
      'Looking at the speaker in a mirror to improve body language',
      'Thinking quietly about what has been said after the conversation',
      'Reflecting on your own experiences while the other person speaks',
      "Mirroring back the speaker's feelings and content to show understanding",
    ] as const,
    correctAnswer: 3,
    explanation:
      'Reflective listening involves mirroring back both the content and the emotional tone of what the speaker has said. For example: "It sounds like you\'re frustrated because the delivery was late again." This validates the speaker\'s experience and demonstrates genuine understanding.',
    section: 'Listening & Understanding Others',
    difficulty: 'basic' as const,
    topic: 'reflective listening',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 52,
    question: 'Which of the following behaviours is a barrier to effective listening?',
    options: [
      'Mentally preparing your response while the speaker is still talking',
      'Asking a clarifying question when a point is unclear',
      'Summarising the key points back to the speaker',
      'Allowing a brief silence after the speaker finishes a point',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Mentally formulating your reply while someone is still speaking means you are not fully processing their message. This "rehearsing" behaviour is one of the most common barriers to effective listening and can cause you to miss important information or misunderstand the speaker\'s point.',
    section: 'Listening & Understanding Others',
    difficulty: 'basic' as const,
    topic: 'active listening',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 53,
    question: 'Which body language signal typically indicates that someone is NOT listening?',
    options: [
      'Leaning slightly forward',
      'Repeatedly checking their phone or watch',
      'Maintaining eye contact',
      'Nodding in response to key points',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Repeatedly checking a phone or watch sends a clear non-verbal signal that the person is disengaged and not prioritising the conversation. This undermines the speaker's confidence and can damage professional relationships. On site, this inattention during safety communication can have serious consequences.",
    section: 'Listening & Understanding Others',
    difficulty: 'basic' as const,
    topic: 'active listening',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 54,
    question: "What is the lowest level of listening in Covey's framework?",
    options: [
      'Selective listening — only hearing certain parts',
      'Pretend listening — appearing to listen while thinking about something else',
      'Ignoring — making no effort to listen at all',
      'Passive listening — hearing without processing',
    ] as const,
    correctAnswer: 2,
    explanation:
      "Covey's lowest level is ignoring — making no effort whatsoever to listen. This is followed by pretend listening (going through the motions), selective listening (hearing only certain parts), attentive listening (genuinely focusing), and empathetic listening (understanding the other person's frame of reference).",
    section: 'Listening & Understanding Others',
    difficulty: 'basic' as const,
    topic: "Covey's 5 levels",
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 55,
    question: 'Why is asking "clarifying questions" considered a key active listening skill?',
    options: [
      'It allows the listener to steer the speaker towards a preferred conclusion',
      'It signals to the speaker that they should bring the conversation to a close',
      'It gives the listener time to prepare a rebuttal to the speaker\'s argument',
      'It demonstrates engagement and helps ensure the listener has correctly understood the message',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Clarifying questions serve two purposes: they signal to the speaker that you are engaged and processing their message, and they help you fill gaps in your understanding. Questions like "When you say X, do you mean...?" reduce the chance of misinterpretation and show respect for the speaker\'s message.',
    section: 'Listening & Understanding Others',
    difficulty: 'basic' as const,
    topic: 'active listening',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 56,
    question: 'In the RASA listening model, what does the "S" stand for?',
    options: [
      'Summarise',
      'Sympathise',
      'Silence',
      'Support',
    ] as const,
    correctAnswer: 0,
    explanation:
      'The S in RASA stands for Summarise — pulling together the key points of what the speaker has said. Summarising demonstrates that you have been listening, helps confirm mutual understanding, and gives the speaker an opportunity to correct any misinterpretations.',
    section: 'Listening & Understanding Others',
    difficulty: 'basic' as const,
    topic: 'RASA model',
    category: 'Listening & Understanding Others' as const,
  },

  // ===== INTERMEDIATE (id 57-72) =====
  {
    id: 57,
    question: 'How does the "funnel technique" work in questioning?',
    options: [
      'It alternates open and closed questions in no particular order to keep the speaker alert',
      'It starts with broad, open questions and progressively narrows to specific, closed questions to focus the conversation',
      'It uses only closed questions throughout to keep answers short and factual',
      'It starts with specific questions and gradually broadens out to general ones',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The funnel technique begins with broad, open questions to establish the big picture and encourage the speaker to share freely, then progressively narrows to more specific, closed questions to pin down details. This is particularly useful in fault-finding: "Tell me what happened" (open) leading to "Was the RCD tripped when you arrived?" (closed).',
    section: 'Listening & Understanding Others',
    difficulty: 'intermediate' as const,
    topic: 'funnel technique',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 58,
    question:
      'What distinguishes "empathetic listening" from "attentive listening" in Covey\'s framework?',
    options: [
      "Empathetic listening focuses only on the words, while attentive listening adds the emotion",
      "Empathetic listening is reserved for written messages, attentive listening for spoken ones",
      "Empathetic listening seeks to understand the speaker's feelings and perspective from their frame of reference, not just the factual content",
      "Empathetic listening means agreeing with the speaker, attentive listening means staying neutral",
    ] as const,
    correctAnswer: 2,
    explanation:
      "Attentive listening (Covey's fourth level) involves genuinely paying attention to the words being said. Empathetic listening (fifth level) goes deeper — it seeks to understand the speaker's emotions, perspective, and frame of reference. You are not just hearing the content; you are understanding the person. This is the most powerful level for building trust and resolving conflict.",
    section: 'Listening & Understanding Others',
    difficulty: 'intermediate' as const,
    topic: "Covey's 5 levels",
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 59,
    question:
      'When using the SOLER model during a listening interaction, what does maintaining an "open posture" communicate to the speaker?',
    options: [
      'That you are in a position of authority over the speaker',
      'That you would prefer the conversation to be kept brief',
      'That you are relaxed because the topic is not important to you',
      'Receptiveness and willingness to hear what they have to say without defensiveness',
    ] as const,
    correctAnswer: 3,
    explanation:
      'An open posture (uncrossed arms and legs, body oriented towards the speaker) communicates receptiveness, approachability, and a willingness to engage. Conversely, crossed arms or turned-away posture can signal defensiveness or disinterest, which discourages the speaker from sharing openly.',
    section: 'Listening & Understanding Others',
    difficulty: 'intermediate' as const,
    topic: 'SOLER',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 60,
    question:
      "An apprentice says, \"I'm not sure I've connected this correctly — it doesn't look right to me.\" Which response demonstrates the best active listening?",
    options: [
      '"What specifically doesn\'t look right to you? Talk me through what you\'ve done so far."',
      '"It\'s probably fine — just leave it and we\'ll check it at the end of the day."',
      '"If you\'d paid attention earlier you\'d know whether it\'s right or not."',
      '"Don\'t worry about it, these things rarely matter as much as you think."',
    ] as const,
    correctAnswer: 0,
    explanation:
      "The best response uses an open question to explore the apprentice's concern and invites them to elaborate. This demonstrates genuine interest in understanding their perspective, validates their instinct to speak up, and creates an opportunity for learning. The other responses dismiss the concern, delay action, or criticise — all of which discourage future communication.",
    section: 'Listening & Understanding Others',
    difficulty: 'intermediate' as const,
    topic: 'active listening',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 61,
    question:
      'In Socratic questioning, what is the primary purpose of asking "What evidence supports that view?"',
    options: [
      "To challenge and undermine the person's confidence",
      'To encourage the person to examine the basis for their belief and think more critically',
      'To demonstrate that the questioner has superior knowledge',
      'To delay making a decision until more data is available',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Socratic questioning uses thoughtful, probing questions to stimulate critical thinking and deeper understanding. "What evidence supports that view?" is not confrontational — it invites the person to examine the foundations of their reasoning. This develops their analytical skills and often leads to better-quality conclusions on site.',
    section: 'Listening & Understanding Others',
    difficulty: 'intermediate' as const,
    topic: 'Socratic questioning',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 62,
    question:
      'Which of the following is the best example of "reflecting feelings" in a listening interaction?',
    options: [
      '"You should just prioritise the urgent jobs and the rest will sort itself out."',
      '"I had exactly the same problem last month — let me tell you what I did."',
      '"It sounds like you\'re feeling overwhelmed by the amount of work that\'s been added to your schedule."',
      '"There\'s no point getting worked up about it, everyone is busy right now."',
    ] as const,
    correctAnswer: 2,
    explanation:
      "Reflecting feelings means naming the emotion you perceive in the speaker's message and checking whether your perception is accurate. \"It sounds like you're feeling overwhelmed...\" validates the speaker's experience and demonstrates empathetic understanding. Offering advice, minimising, or redirecting to your own experience are not reflective listening.",
    section: 'Listening & Understanding Others',
    difficulty: 'intermediate' as const,
    topic: 'reflective listening',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 63,
    question:
      'Why is "pretend listening" (Covey\'s second level) potentially more harmful than openly ignoring someone?',
    options: [
      'Because pretend listening takes far more effort than genuinely listening',
      'Because the speaker can always tell when someone is only pretending to listen',
      'Because pretend listening is a criminal offence under health and safety law',
      'Because the speaker believes they have been heard and understood when they have not, leading to false confidence in the communication',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Pretend listening is deceptive — the speaker observes cues that suggest engagement (nodding, "uh-huh") and reasonably concludes their message has landed. They then act on the assumption they were understood, which can lead to errors, misaligned expectations, and in safety-critical environments, dangerous outcomes. At least with overt ignoring, the speaker knows the message was not received.',
    section: 'Listening & Understanding Others',
    difficulty: 'intermediate' as const,
    topic: "Covey's 5 levels",
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 64,
    question: 'When paraphrasing, which of the following should you AVOID?',
    options: [
      "Repeating the speaker's exact words back to them word-for-word, as this can feel mechanical and does not demonstrate true understanding",
      "Restating the speaker's meaning in your own words to confirm understanding",
      "Capturing the essence of the message rather than every minor detail",
      "Inviting the speaker to correct your summary if you have misunderstood",
    ] as const,
    correctAnswer: 0,
    explanation:
      'Paraphrasing means restating the message in your own words, which demonstrates genuine comprehension. Simply parroting the exact words back (sometimes called "echo listening") does not show that you have processed and understood the meaning. Effective paraphrasing captures the essence and invites the speaker to confirm or correct your understanding.',
    section: 'Listening & Understanding Others',
    difficulty: 'intermediate' as const,
    topic: 'paraphrasing',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 65,
    question:
      'Which Socratic question type encourages someone to consider the implications of their proposed action?',
    options: [
      '"Who told you to wire it that way in the first place?"',
      '"If we do it that way, what do you think the consequences might be?"',
      '"Are you absolutely certain you have done this correctly?"',
      '"What time do you expect to have this finished by?"',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Asking about consequences and implications is a key Socratic questioning technique. "If we do it that way, what might happen?" invites forward thinking and encourages the person to evaluate their own reasoning without being told the answer. This develops critical thinking and is more effective than directive instruction for lasting learning.',
    section: 'Listening & Understanding Others',
    difficulty: 'intermediate' as const,
    topic: 'Socratic questioning',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 66,
    question:
      'What is a "leading question" and why should it generally be avoided in active listening?',
    options: [
      'A question that can only be answered with a simple yes or no',
      'A question that asks the speaker to summarise everything they have said',
      'A question that suggests the desired answer, which can manipulate the response and prevent the speaker from sharing their genuine perspective',
      'A question that invites the speaker to explore their feelings in depth',
    ] as const,
    correctAnswer: 2,
    explanation:
      'A leading question contains an assumption or implies the expected answer, such as "You did follow the isolation procedure, didn\'t you?" This pressures the respondent to confirm rather than share what actually happened. In active listening, neutral, open questions allow the speaker to give an honest, uninfluenced account.',
    section: 'Listening & Understanding Others',
    difficulty: 'intermediate' as const,
    topic: 'question types',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 67,
    question: 'In the RASA model, what does the "A" at the end (Ask) encourage the listener to do?',
    options: [
      'Ask the speaker to lower their voice so you can concentrate',
      'Ask another colleague to confirm what the speaker has said',
      'Ask the speaker to put their request in writing for the record',
      'Ask relevant follow-up questions to deepen understanding and show continued interest',
    ] as const,
    correctAnswer: 3,
    explanation:
      'The final A in RASA (Ask) encourages the listener to ask thoughtful follow-up questions. This demonstrates ongoing engagement, helps clarify any remaining ambiguity, and deepens mutual understanding. Good follow-up questions often arise naturally from the summarising step that precedes them.',
    section: 'Listening & Understanding Others',
    difficulty: 'intermediate' as const,
    topic: 'RASA model',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 68,
    question:
      "Covey's Habit 5 states that most people do not listen with the intent to understand but rather with the intent to:",
    options: [
      'Reply',
      'Judge',
      'Agree',
      'Memorise',
    ] as const,
    correctAnswer: 0,
    explanation:
      "Covey observed that most people listen with the intent to reply — they are formulating their response rather than genuinely trying to understand the speaker's perspective. This means they filter everything through their own frame of reference rather than entering the speaker's frame of reference, which is what empathetic listening requires.",
    section: 'Listening & Understanding Others',
    difficulty: 'intermediate' as const,
    topic: 'Habit 5',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 69,
    question: 'Which of the following techniques helps a listener avoid interrupting the speaker?',
    options: [
      "Repeating the speaker's words under your breath as they talk",
      'Mentally noting points to return to later rather than jumping in immediately',
      'Maintaining a completely blank expression throughout',
      'Crossing your arms to remind yourself to stay quiet',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Mentally noting points to revisit is an effective self-regulation technique. It allows you to remain present with the speaker while ensuring important points are not lost. When the speaker finishes, you can return to those noted points. This respects the speaker's flow and demonstrates patience — a hallmark of skilled listening.",
    section: 'Listening & Understanding Others',
    difficulty: 'intermediate' as const,
    topic: 'active listening',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 70,
    question:
      'An electrician describes a complex fault to a colleague. The colleague responds, "So the RCD trips intermittently under load, and you\'ve already ruled out the appliances on that circuit — is that correct?" This is an example of:',
    options: [
      'Giving technical advice',
      'Offering a diagnosis',
      'Summarising and checking understanding',
      "Challenging the electrician's competence",
    ] as const,
    correctAnswer: 2,
    explanation:
      'The colleague has pulled together the key points of the description (summarising) and then asked "is that correct?" (checking understanding). This is excellent active listening practice that ensures both parties are aligned before moving forward to a solution, preventing wasted time on incorrect assumptions.',
    section: 'Listening & Understanding Others',
    difficulty: 'intermediate' as const,
    topic: 'paraphrasing',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 71,
    question: 'What is the "inverted funnel" (or "reverse funnel") questioning technique?',
    options: [
      'Asking the same broad question repeatedly until a clear answer emerges',
      'Alternating between two unrelated topics to test the speaker\'s focus',
      'Beginning with broad, open questions and narrowing to specific, closed ones',
      'Starting with specific, closed questions and gradually broadening to open questions to build confidence before exploring wider topics',
    ] as const,
    correctAnswer: 3,
    explanation:
      'The inverted funnel starts with narrow, specific, easy-to-answer questions and gradually opens up to broader, more complex ones. This technique is useful with nervous or reluctant speakers (such as apprentices) because the initial easy questions build confidence and rapport before deeper exploration. It is the reverse of the standard funnel technique.',
    section: 'Listening & Understanding Others',
    difficulty: 'intermediate' as const,
    topic: 'funnel technique',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 72,
    question: 'Why is silence an important tool in active listening?',
    options: [
      'Allowing pauses gives the speaker time to think and often encourages them to share more detail',
      'Silence shows that you are bored and want the conversation to end quickly',
      'Remaining silent means you do not need to take responsibility for the conversation',
      'Silence is never appropriate in professional conversations',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Comfortable silence after a speaker pauses or finishes a point gives them space to gather their thoughts and often leads to them sharing more depth or detail. Many listeners rush to fill silence, which can cut short important disclosures. Skilled listeners are comfortable with pauses and use them as a deliberate tool.',
    section: 'Listening & Understanding Others',
    difficulty: 'intermediate' as const,
    topic: 'active listening',
    category: 'Listening & Understanding Others' as const,
  },

  // ===== ADVANCED (id 73-80) =====
  {
    id: 73,
    question:
      "A colleague describes a situation where they feel a client is being unreasonable about a project timeline. According to Covey's empathetic listening, which response is most appropriate?",
    options: [
      '"You just need to push back and tell the client the timeline is impossible."',
      '"It sounds like you\'re caught between wanting to meet the client\'s expectations and knowing the timeline isn\'t realistic — that must be really frustrating."',
      '"Clients are always like that — you learn to ignore the unrealistic ones."',
      '"When I had a difficult client last year, here is exactly what I did."',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Empathetic listening involves entering the speaker's frame of reference and reflecting both the content and the feelings you perceive. The first response names the tension (content) and the emotion (frustration), showing genuine understanding without offering premature advice, redirecting to your own experience, or prescribing a solution. This allows the speaker to feel truly heard before moving to problem-solving.",
    section: 'Listening & Understanding Others',
    difficulty: 'advanced' as const,
    topic: 'empathetic listening',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 74,
    question:
      'When conducting a Socratic questioning dialogue with an apprentice about why an RCD has tripped, what sequence of questions best develops their diagnostic thinking?',
    options: [
      'Tell the apprentice the likely cause immediately so the job is not delayed',
      'Ask only closed yes/no questions so the apprentice cannot get it wrong',
      'Start with "What do you observe?" then "What could cause that?" then "How could you test each possibility?" then "What would you expect to find if your theory is correct?"',
      'Begin with "What would you expect to find?" before they have made any observation',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Effective Socratic questioning follows a logical progression: observation (what do you see?), hypothesis generation (what could cause this?), testing methodology (how would you verify?), and prediction (what would confirm your theory?). This develops systematic diagnostic thinking rather than just providing answers. It takes longer but builds lasting competence and independent problem-solving ability.',
    section: 'Listening & Understanding Others',
    difficulty: 'advanced' as const,
    topic: 'Socratic questioning',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 75,
    question:
      'A site worker becomes visibly upset while describing a near-miss incident. According to best practice in empathetic listening, what should the listener prioritise FIRST?',
    options: [
      'Recording the exact sequence of events for the accident report straight away',
      'Identifying who was at fault before the worker forgets the details',
      'Establishing the precise time and location of the near-miss first',
      'Acknowledging the emotional impact before attempting to gather factual details about the incident',
    ] as const,
    correctAnswer: 3,
    explanation:
      'When someone is emotionally distressed, attempting to extract factual information before acknowledging their emotional state is ineffective and can feel dismissive. Empathetic listening prioritises the emotional response first ("That must have been frightening — are you alright?"). Once the person feels heard and their emotional state has settled, they will be better able to provide an accurate, detailed factual account.',
    section: 'Listening & Understanding Others',
    difficulty: 'advanced' as const,
    topic: 'empathetic listening',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 76,
    question:
      "How does combining the RASA model with Covey's empathetic listening create a more complete listening framework?",
    options: [
      "RASA provides the structural process (receive, appreciate, summarise, ask) while Covey's empathetic listening adds the depth of emotional understanding and perspective-taking within each step",
      "RASA replaces empathetic listening entirely, removing the need to consider feelings",
      "Covey's empathetic listening provides the four steps and RASA adds the body language",
      "The two frameworks contradict each other and should never be combined in practice",
    ] as const,
    correctAnswer: 0,
    explanation:
      "RASA provides a clear, actionable four-step process for listening, but on its own it can become mechanical. Layering Covey's empathetic listening within each RASA step adds emotional depth — receiving with genuine presence, appreciating with authentic empathy, summarising both content and feeling, and asking questions from the speaker's frame of reference rather than your own.",
    section: 'Listening & Understanding Others',
    difficulty: 'advanced' as const,
    topic: 'RASA model',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 77,
    question:
      'In a multi-trade coordination meeting, an electrician notices that the plumbing contractor repeatedly uses technical terms the general labourers do not understand, but no one is asking for clarification. What listening-related action is MOST effective?',
    options: [
      'Use a clarifying question on behalf of the group, such as "Could you explain what you mean by [term] for those of us from other trades?"',
      "Stay silent because it is not your responsibility to manage others' understanding",
      'Interrupt the plumber and tell them to use simpler language',
      'Wait until after the meeting and privately explain the terms to the labourers',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Asking a clarifying question on behalf of the group demonstrates advanced listening awareness — you have noticed that communication is breaking down for others even though you may understand the terms yourself. Framing it inclusively ("for those of us from other trades") avoids embarrassing anyone and ensures critical information reaches everyone. Waiting until after the meeting means decisions may have already been made on incomplete understanding.',
    section: 'Listening & Understanding Others',
    difficulty: 'advanced' as const,
    topic: 'active listening',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 78,
    question:
      'A supervisor uses the funnel technique during an accident investigation. They start with "Tell me everything that happened from when you arrived on site this morning" and gradually narrow to "At what exact time did you notice the fault?" Why is this sequencing particularly important in investigation contexts?',
    options: [
      'Specific questions first ensure the supervisor controls exactly what the witness reveals',
      'Starting broad allows the supervisor to suggest what the witness should have seen',
      'Broad questions first allow the witness to recall events in their own way without being influenced by specific prompts, preserving the accuracy and completeness of their account',
      'Specific questions first save time by skipping straight to the relevant facts',
    ] as const,
    correctAnswer: 2,
    explanation:
      'In investigation contexts, the funnel technique is critical for evidence quality. Broad, open questions at the start allow the witness to provide a free recall account, which is more accurate and complete than responses shaped by specific prompts. Narrowing to specific questions later fills in gaps without contaminating the original narrative. This approach is supported by investigative interviewing best practice (e.g., the PEACE model).',
    section: 'Listening & Understanding Others',
    difficulty: 'advanced' as const,
    topic: 'funnel technique',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 79,
    question:
      "An electrician consistently finds that team members come to them with problems but rarely follow through on solutions. Applying Covey's Habit 5 and Socratic questioning, what is the MOST likely cause and the MOST effective response?",
    options: [
      'The team members lack the technical ability, so the electrician should take the tasks over entirely',
      'The team members are deliberately avoiding work, so the electrician should escalate to the manager',
      'The electrician is not giving clear enough instructions, so they should write everything down',
      'The electrician is probably solving problems FOR team members rather than helping them think through solutions; they should use Socratic questions to guide self-discovery and ownership',
    ] as const,
    correctAnswer: 3,
    explanation:
      'When a listener consistently provides solutions, they create dependency — team members learn to bring problems but not to solve them. Covey\'s Habit 5 suggests first understanding the person\'s perspective, then using Socratic questioning ("What have you already considered?" "What would happen if...?" "What resources do you have?") to guide them toward their own solutions. This develops capability and ownership.',
    section: 'Listening & Understanding Others',
    difficulty: 'advanced' as const,
    topic: 'Socratic questioning',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 80,
    question:
      'During a sensitive one-to-one conversation, a team member discloses that they are struggling with a personal issue affecting their work. Which combination of listening skills represents the most professionally appropriate and effective response?',
    options: [
      'Empathetic listening to acknowledge feelings, SOLER body language to show presence, reflective statements to validate, and clear signposting to appropriate support services',
      'Offer detailed personal advice, share your own similar experiences, and tell them what decision to make',
      'Quickly redirect the conversation back to work tasks to avoid prying into personal matters',
      'Reassure them the problem is minor, change the subject, and avoid raising it again',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Sensitive disclosures require an integrated approach: empathetic listening (understanding their emotional experience), SOLER body language (communicating attentive presence), reflective statements (validating their feelings without judgement), and appropriate signposting (directing them to professional support such as an Employee Assistance Programme). This combination demonstrates both genuine care and professional responsibility without overstepping into a counselling role you are not qualified for.',
    section: 'Listening & Understanding Others',
    difficulty: 'advanced' as const,
    topic: 'empathetic listening',
    category: 'Listening & Understanding Others' as const,
  },

  // ---------------------------------------------------------------------------
  // Category 3: Speaking with Confidence (40 questions, id 81-120)
  // ---------------------------------------------------------------------------
  {
    id: 81,
    question:
      'According to Albert Bandura, which of the following is the most powerful source of self-efficacy?',
    options: [
      'Vicarious experiences — watching others succeed',
      'Mastery experiences — succeeding at a task yourself',
      'Social persuasion — encouragement from others',
      'Emotional states — feeling calm and confident',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Bandura identified mastery experiences as the most powerful source of self-efficacy. When you succeed at a task through your own effort, it builds genuine belief in your ability. This is why gradual exposure and practice are more effective than simply being told you can do something.',
    section: 'Speaking with Confidence',
    difficulty: 'basic' as const,
    topic: 'self-efficacy sources',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 82,
    question: 'How many sources of self-efficacy did Bandura identify?',
    options: ['Two', 'Three', 'Four', 'Five'] as const,
    correctAnswer: 2,
    explanation:
      'Bandura identified four sources of self-efficacy: mastery experiences, vicarious experiences (modelling), social persuasion (verbal encouragement), and emotional/physiological states. All four contribute to confidence, but mastery experiences are the strongest.',
    section: 'Speaking with Confidence',
    difficulty: 'basic' as const,
    topic: 'self-efficacy sources',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 83,
    question: 'Who first described the concept of imposter syndrome in their 1978 research paper?',
    options: [
      'Carol Dweck and Albert Bandura',
      'Pauline Rose Clance and Carl Rogers',
      'Sigmund Freud and Abraham Maslow',
      'Pauline Rose Clance and Suzanne Ames Imes',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Pauline Rose Clance and Suzanne Ames Imes first described the imposter phenomenon in their 1978 paper. They studied high-achieving women who, despite objective evidence of accomplishment, persisted in believing they were not intelligent and that they had fooled anyone who thought otherwise.',
    section: 'Speaking with Confidence',
    difficulty: 'basic' as const,
    topic: 'imposter syndrome',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 84,
    question: 'What is glossophobia?',
    options: [
      'Fear of public speaking',
      'Fear of heights',
      'Fear of social situations',
      'Fear of enclosed spaces',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Glossophobia is the fear of public speaking. Research suggests approximately 75% of people experience some degree of anxiety around public speaking, making it one of the most common fears.',
    section: 'Speaking with Confidence',
    difficulty: 'basic' as const,
    topic: 'speaking anxiety',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 85,
    question: 'What is the box breathing technique pattern used to manage anxiety?',
    options: [
      'Breathe in for 2, hold for 2, out for 2, hold for 2',
      'Breathe in for 4, hold for 4, out for 4, hold for 4',
      'Breathe in for 3, out for 6',
      'Breathe in for 7, hold for 4, out for 8',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Box breathing follows a 4-4-4-4 pattern: breathe in for 4 seconds, hold for 4 seconds, breathe out for 4 seconds, hold for 4 seconds. The equal intervals and structured pattern activate the parasympathetic nervous system, reducing anxiety.',
    section: 'Speaking with Confidence',
    difficulty: 'basic' as const,
    topic: 'anxiety management',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 86,
    question: 'Carol Dweck identified two types of mindset. What are they?',
    options: [
      'Positive and negative',
      'Internal and external',
      'Fixed and growth',
      'Open and closed',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Carol Dweck identified fixed mindset (believing abilities are innate and unchangeable) and growth mindset (believing abilities can be developed through effort and learning). People with a growth mindset are more likely to embrace challenges and persist through setbacks.',
    section: 'Speaking with Confidence',
    difficulty: 'basic' as const,
    topic: 'growth mindset',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 87,
    question: 'According to HSE guidance, what is the recommended duration for a toolbox talk?',
    options: [
      '1-2 minutes',
      '45-60 minutes',
      '20-30 minutes',
      '5-10 minutes',
    ] as const,
    correctAnswer: 3,
    explanation:
      'HSE guidance recommends toolbox talks last between 5 and 10 minutes. This keeps them focused on a single topic, maintains attention, and allows time for two-way communication without significantly disrupting the working day.',
    section: 'Speaking with Confidence',
    difficulty: 'basic' as const,
    topic: 'toolbox talks',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 88,
    question:
      'Under CDM 2015, which regulation places a duty on contractors to provide instruction and information to workers?',
    options: [
      'Regulation 15',
      'Regulation 8',
      'Regulation 4',
      'Regulation 22',
    ] as const,
    correctAnswer: 0,
    explanation:
      'CDM 2015 Regulation 15 sets out the duties of contractors: every contractor must ensure each worker under their control is given appropriate supervision, instructions and information (Reg 15(8)-(9)) so construction work can be carried out safely. Toolbox talks are one of the key methods for fulfilling this duty. (Regulation 13 covers the principal contractor\'s duties.)',
    section: 'Speaking with Confidence',
    difficulty: 'basic' as const,
    topic: 'CDM 2015',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 89,
    question: 'What is the classic three-part speech structure?',
    options: [
      'Question, discussion, vote',
      'Introduction, body, conclusion',
      'Greeting, agenda, close',
      'Hook, story, sales pitch',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The classic speech structure consists of an introduction (preview your key points), body (deliver the content), and conclusion (summarise what was covered). This structure helps audiences follow your message and remember key points.',
    section: 'Speaking with Confidence',
    difficulty: 'basic' as const,
    topic: 'speech structure',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 90,
    question:
      'In the Toastmasters Pathways programme, what is the primary method for building speaking confidence?',
    options: [
      'Memorising scripts and delivering them word-for-word',
      'Avoiding the audience until anxiety naturally fades on its own',
      'Gradual exposure through progressively challenging speeches',
      'A single intensive day of high-pressure public speaking',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Toastmasters Pathways uses gradual exposure — members progress through increasingly challenging speaking assignments over time. This approach is consistent with systematic desensitisation from CBT, where gradual, repeated exposure reduces anxiety.',
    section: 'Speaking with Confidence',
    difficulty: 'basic' as const,
    topic: 'Toastmasters',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 91,
    question: 'What does CBT stand for in the context of managing speaking anxiety?',
    options: [
      'Controlled Breathing Training',
      'Confidence Building Technique',
      'Communication-Based Training',
      'Cognitive Behavioural Therapy',
    ] as const,
    correctAnswer: 3,
    explanation:
      'CBT stands for Cognitive Behavioural Therapy. It helps people identify and challenge unhelpful thought patterns. In the context of speaking anxiety, CBT techniques like cognitive restructuring help replace catastrophic thoughts with more balanced, realistic ones.',
    section: 'Speaking with Confidence',
    difficulty: 'basic' as const,
    topic: 'CBT',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 92,
    question: 'The confidence-competence loop describes which relationship?',
    options: [
      'Competence and confidence reinforce each other in a positive cycle',
      'You must be fully competent before you can feel confident',
      'Confidence decreases as competence increases',
      'Higher confidence always leads to higher competence',
    ] as const,
    correctAnswer: 0,
    explanation:
      'The confidence-competence loop describes how increased competence builds confidence, which in turn motivates further practice and learning, building more competence. It is a virtuous cycle — the key is to start with small successes that build both skills and belief.',
    section: 'Speaking with Confidence',
    difficulty: 'basic' as const,
    topic: 'confidence-competence loop',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 93,
    question: 'A toolbox talk should focus on how many topics?',
    options: [
      'As many as possible in the time available',
      'One single topic',
      'Five topics minimum',
      'Two or three related topics',
    ] as const,
    correctAnswer: 1,
    explanation:
      'An effective toolbox talk should focus on one single topic. This keeps the message clear, focused and memorable. Trying to cover multiple topics dilutes the message and reduces retention.',
    section: 'Speaking with Confidence',
    difficulty: 'basic' as const,
    topic: 'toolbox talks',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 94,
    question: 'What does "vicarious experience" mean as a source of self-efficacy?',
    options: [
      'Successfully completing a difficult task yourself',
      'Feeling calm before a presentation',
      'Watching someone similar to you succeed at a task',
      'Receiving praise from a mentor',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Vicarious experience means observing someone you identify with succeed at a task. When you see a colleague who is similar to you deliver a successful toolbox talk, it strengthens your belief that you can do it too.',
    section: 'Speaking with Confidence',
    difficulty: 'basic' as const,
    topic: 'self-efficacy sources',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 95,
    question: 'Approximately what percentage of people experience fear of public speaking?',
    options: [
      '25%',
      '50%',
      '95%',
      '75%',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Research consistently suggests approximately 75% of the population experiences some degree of anxiety about public speaking. If you feel nervous before speaking, you are in the majority.',
    section: 'Speaking with Confidence',
    difficulty: 'basic' as const,
    topic: 'speaking anxiety',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 96,
    question:
      'What is the key difference between a fixed mindset and a growth mindset when facing a challenge?',
    options: [
      'Fixed mindset avoids challenges to protect self-image; growth mindset embraces them as opportunities to develop',
      'Fixed mindset welcomes feedback, while growth mindset takes criticism personally',
      'Fixed mindset believes effort matters most, while growth mindset relies on natural talent',
      'Fixed mindset persists after setbacks, while growth mindset gives up quickly',
    ] as const,
    correctAnswer: 0,
    explanation:
      'A person with a fixed mindset avoids challenges because failure would confirm a lack of ability. A person with a growth mindset embraces challenges as opportunities to learn and improve.',
    section: 'Speaking with Confidence',
    difficulty: 'intermediate' as const,
    topic: 'growth mindset',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 97,
    question:
      'In CBT cognitive restructuring, what is the first step in managing speaking anxiety?',
    options: [
      'Avoiding situations that trigger anxiety',
      'Identifying the specific unhelpful thought',
      'Practising deep breathing exercises',
      'Visualising a successful outcome',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The first step in CBT cognitive restructuring is identifying the specific unhelpful automatic thought. You must recognise what you are telling yourself before you can challenge and replace it.',
    section: 'Speaking with Confidence',
    difficulty: 'intermediate' as const,
    topic: 'CBT',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 98,
    question: 'What is systematic desensitisation in the context of overcoming speaking anxiety?',
    options: [
      'Avoiding all speaking situations until you feel ready',
      'Jumping straight into the most challenging speaking situation',
      'Gradual, step-by-step exposure to increasingly challenging speaking situations',
      'Taking medication before every speaking engagement',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Systematic desensitisation involves creating an exposure ladder — a hierarchy of increasingly challenging speaking situations — and working through them progressively.',
    section: 'Speaking with Confidence',
    difficulty: 'intermediate' as const,
    topic: 'exposure ladder',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 99,
    question: 'Why is two-way communication important in a toolbox talk?',
    options: [
      'It allows the talk to be delivered far more quickly than a one-way briefing',
      'It removes the need to keep a written record of the talk afterwards',
      'It lets the presenter cover several unrelated topics in one session',
      'It confirms understanding, engages workers and surfaces practical concerns',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Two-way communication during toolbox talks confirms workers have understood the message, engages them actively, and allows them to raise practical concerns or questions.',
    section: 'Speaking with Confidence',
    difficulty: 'intermediate' as const,
    topic: 'toolbox talks',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 100,
    question:
      'A newly qualified electrician feels like a fraud despite passing their AM2 assessment. This is best described as:',
    options: [
      'Imposter syndrome as described by Clance and Imes (1978)',
      'A fixed mindset as described by Carol Dweck',
      'Glossophobia, the fear of public speaking',
      'Low self-efficacy caused by a lack of mastery experience',
    ] as const,
    correctAnswer: 0,
    explanation:
      'This is a classic example of imposter syndrome — feeling like a fraud despite objective evidence of competence (passing the AM2 assessment). Clance and Imes (1978) described how high-achieving individuals persistently believe they do not deserve their success.',
    section: 'Speaking with Confidence',
    difficulty: 'intermediate' as const,
    topic: 'imposter syndrome',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 101,
    question: 'Which of the following is the correct structure for an effective toolbox talk?',
    options: [
      'Theory first, then practical examples, then a written test',
      'Opening hook, single-topic body with key points, close with action or understanding check',
      'Read aloud from a safety document, ask if there are any questions, sign the register',
      'Present multiple topics briefly, then issue a handout',
    ] as const,
    correctAnswer: 1,
    explanation:
      'An effective toolbox talk follows: an opening hook to capture attention, a focused body covering one topic with 2-3 key points, and a close that checks understanding or requires action.',
    section: 'Speaking with Confidence',
    difficulty: 'intermediate' as const,
    topic: 'toolbox talks',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 102,
    question: 'What documentation should be completed after delivering a toolbox talk?',
    options: [
      'A full written risk assessment for every hazard on the entire site',
      'A method statement signed by the principal designer and client',
      'A record of the topic, date, presenter, attendee signatures and actions agreed',
      'A formal training certificate issued to each attendee by an awarding body',
    ] as const,
    correctAnswer: 2,
    explanation:
      'A proper record should include the topic, date and time, presenter, attendee signatures, questions raised, and actions agreed. This demonstrates compliance with the contractor\'s duty to provide instruction and information under CDM 2015 Regulation 15.',
    section: 'Speaking with Confidence',
    difficulty: 'intermediate' as const,
    topic: 'toolbox talks',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 103,
    question:
      'Regarding Amy Cuddy research on body language and confidence, which statement is most accurate?',
    options: [
      'The hormonal effects of power posing have been fully confirmed by repeated studies',
      'Power posing has been shown to reliably improve audience perception of the speaker',
      'The research proved that posture has no effect on confidence whatsoever',
      'The original hormonal claims have been debated in replication studies, but the finding that expansive postures can increase subjective feelings of confidence has more support',
    ] as const,
    correctAnswer: 3,
    explanation:
      'The original hormonal claims were not consistently replicated. However, the more modest finding that open postures before a stressful situation can increase subjective confidence has more support. The takeaway is about preparing your mindset, not guaranteed hormonal changes.',
    section: 'Speaking with Confidence',
    difficulty: 'intermediate' as const,
    topic: 'Amy Cuddy',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 104,
    question: 'How does social persuasion work as a source of self-efficacy according to Bandura?',
    options: [
      'Verbal encouragement from a respected person can strengthen belief in your abilities, though weaker than mastery experience',
      'Repeatedly succeeding at a difficult task builds the strongest belief in your ability',
      'Watching a similar person succeed convinces you that you can do it too',
      'Feeling physically calm before a task signals to you that you can cope',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Social persuasion — encouragement from others — can boost self-efficacy, particularly when from someone you respect. While weaker than mastery experience, it can provide the push someone needs to attempt a challenging task.',
    section: 'Speaking with Confidence',
    difficulty: 'intermediate' as const,
    topic: 'self-efficacy sources',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 105,
    question:
      'Which emotional/physiological state is most likely to undermine self-efficacy according to Bandura?',
    options: [
      'A calm, settled feeling shortly before stepping up to speak',
      'High anxiety with physical symptoms such as trembling and nausea',
      'Mild excitement and a slightly raised heart rate before a presentation',
      'A feeling of focused alertness during the first few minutes of speaking',
    ] as const,
    correctAnswer: 1,
    explanation:
      'High anxiety with physical symptoms is interpreted as evidence that you cannot cope, undermining self-efficacy. Learning to manage these responses through techniques like box breathing directly improves self-efficacy.',
    section: 'Speaking with Confidence',
    difficulty: 'intermediate' as const,
    topic: 'self-efficacy sources',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 106,
    question:
      'When delivering a toolbox talk on electrical isolation, what should the opening hook achieve?',
    options: [
      'Summarise every point that will be covered in fine technical detail',
      'List the regulations that apply before introducing the topic itself',
      'Capture attention with a real example, statistic or question that makes the topic personally relevant',
      'Take the register and collect signatures before anything else is said',
    ] as const,
    correctAnswer: 2,
    explanation:
      'The opening hook should capture attention and make the topic feel personally relevant. A real-world incident, a startling statistic, or a direct question all work effectively.',
    section: 'Speaking with Confidence',
    difficulty: 'intermediate' as const,
    topic: 'toolbox talks',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 107,
    question: 'What does "reading the room" mean in the context of presentations?',
    options: [
      'Reading your notes aloud word-for-word so nothing is missed',
      'Checking the room layout and equipment before the audience arrives',
      'Reciting the agenda at the start so everyone knows what is coming',
      'Observing audience body language, energy levels and engagement to adjust delivery in real time',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Reading the room means observing your audience in real time — noticing if they look engaged, confused, bored or distracted — and adjusting your delivery accordingly.',
    section: 'Speaking with Confidence',
    difficulty: 'intermediate' as const,
    topic: 'presentations',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 108,
    question: 'What is the "exposure ladder" approach to overcoming speaking anxiety?',
    options: [
      'Ranking fears from least to most anxiety-provoking and working through them progressively',
      'Avoiding speaking situations until the fear disappears on its own',
      'Starting with the most terrifying situation to get it over with quickly',
      'Climbing a literal platform to practise speaking from a height',
    ] as const,
    correctAnswer: 0,
    explanation:
      'An exposure ladder ranks speaking situations from least to most challenging. You work through progressively, building confidence at each step before moving to the next.',
    section: 'Speaking with Confidence',
    difficulty: 'intermediate' as const,
    topic: 'exposure ladder',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 109,
    question: 'When presenting a quote to a client, what is the recommended approach?',
    options: [
      'Email the figure with no breakdown and let the client raise any queries',
      'Walk them through it in person, explaining scope, timeline and price',
      'Quote a round number verbally and follow up with paperwork later',
      'Leave a printed quote in the letterbox without any explanation',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Walking a client through a quote in person allows you to explain scope, timeline and price, use visual aids, answer questions in real time, and build rapport.',
    section: 'Speaking with Confidence',
    difficulty: 'intermediate' as const,
    topic: 'client presentations',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 110,
    question: 'The Toastmasters Pathways programme organises learning into how many paths?',
    options: [
      '3',
      '6',
      '11',
      '15',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Toastmasters Pathways offers 11 different learning paths, each containing 5 levels of progressively challenging projects. Members choose a path aligned with their development goals.',
    section: 'Speaking with Confidence',
    difficulty: 'intermediate' as const,
    topic: 'Toastmasters',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 111,
    question:
      'A site supervisor wants to build confidence in running progress meetings. Using Bandura theory, what is the most effective first step?',
    options: [
      'Reading a detailed guide on how to chair effective meetings',
      'Watching recordings of senior managers running large meetings',
      'Telling themselves repeatedly that they are a confident chairperson',
      'Starting by chairing a small, low-stakes team meeting to gain a mastery experience',
    ] as const,
    correctAnswer: 3,
    explanation:
      'According to Bandura, mastery experiences are the most powerful source of self-efficacy. Starting with a small, low-stakes meeting provides an achievable first success that builds genuine confidence.',
    section: 'Speaking with Confidence',
    difficulty: 'advanced' as const,
    topic: 'self-efficacy sources',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 112,
    question:
      'An electrician has the automatic thought: "Everyone will think I do not know what I am talking about" before their first toolbox talk. Using CBT, what is the most effective response?',
    options: [
      'Challenge the thought by examining evidence: "I am qualified, I was asked because of my knowledge, and the audience wants to learn"',
      'Accept the thought as accurate and ask a colleague to deliver the talk instead',
      'Suppress the thought entirely and refuse to think about the talk beforehand',
      'Repeat the affirmation "I am brilliant at this" until the thought disappears',
    ] as const,
    correctAnswer: 0,
    explanation:
      'CBT cognitive restructuring involves examining evidence for and against the unhelpful thought. The balanced thought acknowledges anxiety but replaces catastrophic prediction with realistic evidence.',
    section: 'Speaking with Confidence',
    difficulty: 'advanced' as const,
    topic: 'CBT',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 113,
    question:
      'How should a construction professional handle being asked a question they cannot answer during a presentation?',
    options: [
      'Give a confident-sounding guess so as not to appear unprepared',
      'Acknowledge they do not have the answer, commit to finding out, and follow up within an agreed timeframe',
      'Change the subject quickly and hope no one asks the question again',
      'Tell the questioner the answer is too complex to explain in the time available',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Honest acknowledgement followed by a commitment to follow up builds more trust than bluffing. Saying "Let me check and get back to you by Friday" demonstrates professionalism and integrity.',
    section: 'Speaking with Confidence',
    difficulty: 'advanced' as const,
    topic: 'presentations',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 114,
    question:
      'Why is imposter syndrome particularly relevant to tradespeople who have recently qualified?',
    options: [
      'Because newly qualified tradespeople have usually not yet passed their final assessment',
      'Because employers rarely give newly qualified tradespeople any responsibility',
      'The transition from supervised apprentice to autonomous professional creates a gap between objective competence and subjective confidence',
      'Because imposter syndrome only ever affects people early in their working lives',
    ] as const,
    correctAnswer: 2,
    explanation:
      'The transition from apprentice (supervised) to qualified professional (autonomous) creates a natural gap between actual ability and felt confidence. Clance and Imes described how achievers attribute success to luck rather than ability.',
    section: 'Speaking with Confidence',
    difficulty: 'advanced' as const,
    topic: 'imposter syndrome',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 115,
    question: 'How can the physiological sigh technique be used to manage anxiety before speaking?',
    options: [
      'One slow inhale through the mouth followed by holding the breath for ten seconds',
      'Rapid shallow breaths through the mouth to raise your energy level',
      'Holding your breath as long as possible to slow your heart rate',
      'Two quick inhales through the nose followed by a long exhale through the mouth',
    ] as const,
    correctAnswer: 3,
    explanation:
      'The physiological sigh consists of two quick inhales through the nose followed by a long, slow exhale through the mouth. Research suggests this is one of the fastest ways to reduce physiological stress.',
    section: 'Speaking with Confidence',
    difficulty: 'advanced' as const,
    topic: 'anxiety management',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 116,
    question:
      'A project manager needs a reluctant electrician to deliver a toolbox talk. Applying all four Bandura self-efficacy sources, which approach is most effective?',
    options: [
      'Let them observe a colleague (vicarious), encourage them (social persuasion), help them prepare to reduce anxiety (emotional state), then start with a small group (mastery)',
      'Order them to deliver the talk to the whole site immediately with no preparation',
      'Provide written notes and leave them to deliver the talk without any support',
      'Wait until they volunteer, since confidence cannot be developed deliberately',
    ] as const,
    correctAnswer: 0,
    explanation:
      'This systematically addresses all four Bandura sources: vicarious experience (watching), social persuasion (encouragement), emotional state management (preparation), and mastery experience (small achievable audience).',
    section: 'Speaking with Confidence',
    difficulty: 'advanced' as const,
    topic: 'self-efficacy sources',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 117,
    question: 'What is the critical limitation of Amy Cuddy power posing research?',
    options: [
      'The research only tested people who were already confident speakers',
      'The original hormonal claims were not consistently replicated, though subjective confidence findings have more support',
      'The research has been fully replicated and has no remaining limitations',
      'The research applied only to written communication, not face-to-face situations',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The original hormonal claims (testosterone increase, cortisol decrease) were not consistently replicated. The more modest claim about subjective confidence has more support. Responsible teaching acknowledges this debate.',
    section: 'Speaking with Confidence',
    difficulty: 'advanced' as const,
    topic: 'Amy Cuddy',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 118,
    question:
      'When using storytelling in a client presentation, what makes a construction story effective?',
    options: [
      'As long and detailed as possible to show the full extent of your experience',
      'Focused entirely on your past achievements to impress the client',
      'Relevant to the client situation, concise, has a clear point, and demonstrates experience without boasting',
      'Designed to highlight problems caused by other contractors you have followed',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Effective storytelling is relevant (connects to the client situation), concise (does not derail), purposeful (has a clear takeaway), and authentic (demonstrates experience naturally).',
    section: 'Speaking with Confidence',
    difficulty: 'advanced' as const,
    topic: 'presentations',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 119,
    question:
      'What is the relationship between Bandura self-efficacy theory and Toastmasters Pathways?',
    options: [
      'Toastmasters contradicts Bandura theory by relying solely on social persuasion',
      'Toastmasters and Bandura theory address completely unrelated skills',
      'Toastmasters predates Bandura and inspired his self-efficacy research',
      'Toastmasters operationalises Bandura theory: mastery through progressive challenges, vicarious learning, social persuasion through evaluations, and managing anxiety through practice',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Toastmasters Pathways is a practical application of Bandura theory. Members build mastery through progressive speeches, gain vicarious experience watching others, receive social persuasion through evaluations, and manage emotional state through repeated practice.',
    section: 'Speaking with Confidence',
    difficulty: 'advanced' as const,
    topic: 'Toastmasters',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 120,
    question:
      'A contractor avoids speaking in meetings, claiming "I am not a natural speaker." Using Dweck growth mindset, how should this be addressed?',
    options: [
      'Help them reframe from "I am not a speaker" (fixed) to "I have not developed this skill yet" (growth), then create opportunities for gradual practice',
      'Accept that some people are simply not built for speaking and excuse them from meetings',
      'Insist they speak at every meeting until the fear is forced out of them',
      'Reassure them that speaking skills are irrelevant to their trade anyway',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Dweck distinguishes fixed mindset ("I am not a speaker") from growth mindset ("I have not developed this skill yet"). The effective approach combines reframing the belief with practical opportunities for gradual development.',
    section: 'Speaking with Confidence',
    difficulty: 'advanced' as const,
    topic: 'growth mindset',
    category: 'Speaking with Confidence' as const,
  },

  // ---------------------------------------------------------------------------
  // Category 4: Professional Writing & Digital Communication (40 questions, id 121-160)
  // ---------------------------------------------------------------------------
  {
    id: 121,
    question: 'What are the five essential components of a professional email?',
    options: [
      'Emoji, greeting, body, sign-off, disclaimer',
      'Subject line, greeting, body, closing, signature',
      'Header, introduction, argument, counter-argument, conclusion',
      'Date, recipient, cc list, message, attachment',
    ] as const,
    correctAnswer: 1,
    explanation:
      'A professional email includes a clear subject line, appropriate greeting, well-structured body, professional closing, and signature with contact details.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'basic' as const,
    topic: 'email structure',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 122,
    question: 'What is the "24-hour rule" for emails?',
    options: [
      'Every email must receive a reply within 24 hours of being received',
      'Emails should never be sent more than 24 hours after an event occurs',
      'If you feel emotional about an email, wait 24 hours before sending your reply',
      'Emails should be deleted from the server 24 hours after being read',
    ] as const,
    correctAnswer: 2,
    explanation:
      'The 24-hour rule states that if you feel angry or emotional about an email, wait 24 hours before drafting your response. This prevents sending something you may regret.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'basic' as const,
    topic: 'email etiquette',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 123,
    question: 'What type of writing should be used in a site diary?',
    options: [
      'Persuasive writing that argues your side of any dispute',
      'Informal notes using abbreviations and personal shorthand',
      'Opinion-led writing that records how you felt about events',
      'Factual, objective writing in the active voice',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Site diary entries should use factual, objective writing in the active voice. They record what happened, when, who was involved, and any decisions made.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'basic' as const,
    topic: 'site diaries',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 124,
    question: 'What must a written quote include as a minimum?',
    options: [
      'Scope of work, exclusions, price, validity period and payment terms',
      'The client\'s full credit history and details of any previous tradespeople used',
      'A photograph of every product to be installed and its manufacturer warranty',
      'A day-by-day breakdown of which worker will be on site at each hour',
    ] as const,
    correctAnswer: 0,
    explanation:
      'A professional quote should include scope of work, exclusions, price, validity period, and payment terms. This protects both tradesperson and client.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'basic' as const,
    topic: 'quotes and proposals',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 125,
    question: 'What does GDPR stand for?',
    options: [
      'Government Data Processing Rules',
      'General Data Protection Regulation',
      'Global Digital Privacy Requirements',
      'Guaranteed Data Privacy Rights',
    ] as const,
    correctAnswer: 1,
    explanation:
      'GDPR stands for General Data Protection Regulation. It governs how personal data is collected, stored and used, including customer details and site photographs.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'basic' as const,
    topic: 'GDPR',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 126,
    question: 'What is "negativity bias" in text-based communication?',
    options: [
      'Recipients tend to remember only the positive parts of a written message',
      'Senders unconsciously write messages in a more negative tone than they intend',
      'Text messages tend to be interpreted more negatively than intended because tone is stripped from written words',
      'Negative messages are statistically more likely to be opened and read than positive ones',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Negativity bias in text means recipients tend to interpret messages more negatively than intended because text lacks tone, facial expressions and body language.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'basic' as const,
    topic: 'digital communication',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 127,
    question: 'Under JCT contracts, what is a site diary primarily used for?',
    options: [
      'Calculating the final account and issuing the contractor\'s invoice',
      'Recording the personal contact details of every visitor to the site',
      'Setting out the design specification for the works to be carried out',
      'Providing a contemporaneous record of events, progress, weather, labour and issues on site',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Under JCT contracts, a site diary provides a contemporaneous record of daily events including weather, labour, progress, instructions received, visitors, deliveries, and delays.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'basic' as const,
    topic: 'site diaries',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 128,
    question: 'When should you choose a phone call over an email?',
    options: [
      'When the matter is urgent, complex, sensitive, or requires back-and-forth discussion',
      'When you need a permanent written record of exactly what was agreed',
      'When the same routine information must be sent to many recipients at once',
      'When the message is purely factual and requires no immediate response',
    ] as const,
    correctAnswer: 0,
    explanation:
      'A phone call is more appropriate when matters are urgent, complex, sensitive, or require real-time discussion. Email suits non-urgent information and creating records.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'basic' as const,
    topic: 'communication channel',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 129,
    question: 'What is "reply-all" etiquette?',
    options: [
      'Always use reply-all so that everyone stays fully informed at all times',
      'Only use reply-all when your response is genuinely relevant to everyone on the thread',
      'Never use reply-all under any circumstances in a professional setting',
      'Use reply-all only when replying to someone more senior than yourself',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Reply-all should only be used when your response is genuinely relevant to every person on the thread. Unnecessary reply-all messages create inbox clutter.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'basic' as const,
    topic: 'email etiquette',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 130,
    question: 'What is the difference between "scope" and "exclusions" in a quote?',
    options: [
      'Scope is the total price; exclusions are the optional extras a client can add',
      'Scope is the payment schedule; exclusions are the late-payment penalties',
      'Scope describes what IS included; exclusions describe what is NOT included',
      'Scope is the validity period; exclusions are the warranty conditions',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Scope defines what work is included in the quoted price. Exclusions explicitly state what is not included. Clear scope and exclusions prevent disputes.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'basic' as const,
    topic: 'quotes and proposals',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 131,
    question: 'What is the purpose of a validity period on a quote?',
    options: [
      'States how long the completed work is guaranteed against defects',
      'States the date by which the client must pay the final invoice',
      'States how long the job is expected to take from start to finish',
      'States how long the quoted price remains valid',
    ] as const,
    correctAnswer: 3,
    explanation:
      'A validity period states how long the quoted price will be honoured. After this period, costs may have changed and the tradesperson reserves the right to requote.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'basic' as const,
    topic: 'quotes and proposals',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 132,
    question: 'What should an email subject line achieve?',
    options: [
      'Clearly and concisely summarise the purpose or action required',
      'Contain the full message so the recipient need not open the email',
      'Be left blank so the recipient reads the message with no preconception',
      'Repeat the recipient\'s name to make the email feel personal',
    ] as const,
    correctAnswer: 0,
    explanation:
      'An effective subject line clearly summarises the purpose: "Site access confirmation — 14 March" or "Quote ref. 2024-087 — domestic rewire".',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'basic' as const,
    topic: 'email structure',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 133,
    question: 'What is the primary purpose of a signature block on professional emails?',
    options: [
      'Summarise the key points of the email so they need not be read in full',
      'Provide contact details, role, company information and relevant accreditations',
      'Display a legal disclaimer that overrides anything written in the email body',
      'Confirm that the recipient has read and agreed to the email content',
    ] as const,
    correctAnswer: 1,
    explanation:
      'A signature block provides contact information, identifies your role and company, and can include accreditations (NICEIC, NAPIT), building credibility.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'basic' as const,
    topic: 'email structure',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 134,
    question: 'NEC contracts require which approach to record-keeping?',
    options: [
      'Records compiled only at the end of the project for the final account',
      'Verbal records confirmed by the project manager at weekly meetings',
      'Proactive, contemporaneous record-keeping with early warning notices and compensation event documentation',
      'Minimal record-keeping, relying on the site diary kept by the client',
    ] as const,
    correctAnswer: 2,
    explanation:
      'NEC contracts emphasise proactive, contemporaneous record-keeping. The Early Warning mechanism requires parties to notify each other of potential problems promptly.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'intermediate' as const,
    topic: 'NEC contracts',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 135,
    question: 'When writing an EICR observation, what is the correct approach?',
    options: [
      'Record a general impression of the installation without specifying locations',
      'Describe the likely cause and recommend a specific remedial contractor',
      'State your personal opinion of the original installer\'s competence',
      'Record factual observations with specific locations, citing relevant regulation and correct code (C1, C2, C3, FI)',
    ] as const,
    correctAnswer: 3,
    explanation:
      'EICR observations should be factual, specific and referenced. Each should identify the location, describe the issue, cite the relevant regulation, and assign the classification code.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'intermediate' as const,
    topic: 'technical reports',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 136,
    question: 'What is the recommended approach to managing professional WhatsApp groups?',
    options: [
      'Keep groups focused with clear purposes, separate social chat from work coordination',
      'Add every site contact to a single group so no one is ever left out',
      'Allow social and work messages to mix freely to build team rapport',
      'Send messages at any hour, since site work runs to unpredictable schedules',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Professional WhatsApp groups should have a clear purpose, stay focused, and keep social chat separate. Ground rules should be established.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'intermediate' as const,
    topic: 'WhatsApp etiquette',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 137,
    question: 'What is the key principle behind using active voice in professional writing?',
    options: [
      'It makes writing sound more formal by hiding who performed the action',
      'Clearly identifies who did what, making writing more direct and accountable',
      'It allows longer sentences that include more technical detail',
      'It removes the need to name the person responsible for an action',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Active voice clearly identifies the subject performing the action: "The electrician installed the consumer unit" is more direct and accountable than passive voice.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'intermediate' as const,
    topic: 'writing skills',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 138,
    question: 'How should a variation be recorded in writing?',
    options: [
      'Noted verbally on site and confirmed only if a dispute later arises',
      'Recorded after the work is finished so the final cost can be confirmed',
      'Documented with variation description, reason, cost implication and written agreement before work is carried out',
      'Added to the original quote without informing the client of the change',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Variations should be documented in writing before additional work is done, including what changed, why, cost and time implications, and written agreement.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'intermediate' as const,
    topic: 'variations',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 139,
    question:
      'Under GDPR, what must a tradesperson consider before sharing site photographs showing identifiable individuals?',
    options: [
      'GDPR does not apply to photographs, only to written records',
      'They only need consent if the photograph is sold for commercial gain',
      'Consent is unnecessary as long as faces are slightly out of focus',
      'They need consent, a legitimate purpose, and secure storage',
    ] as const,
    correctAnswer: 3,
    explanation:
      'GDPR applies to photographs where individuals can be identified. Tradespeople should obtain consent, have a legitimate purpose, store securely, and not share inappropriately.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'intermediate' as const,
    topic: 'GDPR',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 140,
    question: 'What is the tone spectrum in professional email communication?',
    options: [
      'A range from very formal to semi-formal to informal, matched to context',
      'A fixed formal tone that should be used for every email regardless of recipient',
      'The order in which recipients are listed in the To and Cc fields',
      'The volume and emphasis applied when an email is read aloud',
    ] as const,
    correctAnswer: 0,
    explanation:
      'The tone spectrum ranges from very formal (legal correspondence) through semi-formal (standard professional emails) to informal (team chat). Matching tone to context is essential.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'intermediate' as const,
    topic: 'email tone',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 141,
    question: 'When writing a domestic rewire quote, which exclusion is most important to state?',
    options: [
      'The cost of the electrical certificate issued on completion',
      'Making good of plaster, decoration and disposal of old materials',
      'The labour rate charged for the qualified electrician',
      'The manufacturer of the cable and accessories to be used',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Making good, decoration and disposal are the most common sources of disputes. Clearly excluding them prevents the client assuming they are included.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'intermediate' as const,
    topic: 'quotes and proposals',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 142,
    question: 'Why is ambiguity dangerous in written agreements?',
    options: [
      'It makes the agreement appear less professional to the client',
      'It increases the length of the document unnecessarily',
      'It creates room for different interpretations, leading to disputes',
      'It requires the agreement to be witnessed by a solicitor',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Ambiguity allows different interpretations of what was agreed. Clear, specific language prevents disputes. "First-fix cabling for 12 power points per drawing E-01" is unambiguous.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'intermediate' as const,
    topic: 'avoiding ambiguity',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 143,
    question: 'What is the decision framework for choosing between phone, text and email?',
    options: [
      'Text for everything urgent; phone only for social calls; email never for clients',
      'Email for everything, as it always provides the clearest written record',
      'Phone for routine updates; text for formal records; email for quick coordination',
      'Phone for urgent/complex/sensitive; email for formal records; text for brief time-sensitive coordination',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Phone suits urgent, complex or sensitive discussions; email suits formal communication and records; text/WhatsApp suits brief, time-sensitive coordination.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'intermediate' as const,
    topic: 'communication channel',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 144,
    question: 'What language should be avoided in professional quotes?',
    options: [
      'Vague terms like "approximately", "if required", "as necessary" without further definition',
      'Specific quantities such as "12 double socket outlets" or "per drawing E-01"',
      'Clear payment terms stating the deposit and final balance amounts',
      'Named British Standards and regulation numbers for the work to be done',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Vague terms create scope for disputes. "Approximately 12 socket outlets" could mean 10 or 15. Every term should be specific and measurable.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'intermediate' as const,
    topic: 'avoiding ambiguity',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 145,
    question: 'What information should a site diary include when recording a delay?',
    options: [
      'A note that a delay occurred, with no further detail required',
      'The cause, affected trades, duration, instructions received, and mitigation actions taken',
      'An estimate of who was at fault and how much compensation is owed',
      'The names of all workers who were sent home because of the delay',
    ] as const,
    correctAnswer: 1,
    explanation:
      'A proper delay record includes cause, affected trades, duration, instructions received, and mitigation actions. This detail supports extension of time claims.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'intermediate' as const,
    topic: 'site diaries',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 146,
    question: 'When is it NOT appropriate to communicate by email?',
    options: [
      'Confirming the agreed start date for a scheduled job',
      'Sending a copy of a completed certificate to a client',
      'Delivering bad news about a significant project problem requiring immediate discussion',
      'Providing a written summary of a meeting for the record',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Email is not appropriate for significant bad news because tone is easily misread and there is no real-time discussion. Deliver bad news by phone or in person first, then follow up in writing.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'intermediate' as const,
    topic: 'communication channel',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 147,
    question:
      'A client sends an angry email about a delay. Following the 24-hour rule, what should you do?',
    options: [
      'Reply immediately with a detailed defence of your position',
      'Ignore the email until the client raises the issue again',
      'Forward the email to your team and let them decide how to respond',
      'Acknowledge receipt briefly, then draft a measured response after you have calmed down',
    ] as const,
    correctAnswer: 3,
    explanation:
      'A brief acknowledgement shows the client you are engaged, while waiting before a substantive response prevents defensive reactions and allows a professional reply.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'advanced' as const,
    topic: 'email etiquette',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 148,
    question:
      'A scope dispute arises where the quote states "electrical installation as per specification E-001." What is the writing error?',
    options: [
      'Referencing a specification rather than listing items creates ambiguity if the specification is later disputed or modified',
      'The quote uses a specification reference instead of a fixed total price',
      'The specification number should appear in the email subject line as well',
      'The quote fails to state the validity period of the specification',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Referencing a specification without listing included items creates risk if the specification is revised or if parties have different versions. Best practice is to list items explicitly or clearly state which version applies.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'advanced' as const,
    topic: 'quotes and proposals',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 149,
    question:
      'What is the critical difference between "Plumber did a poor job" versus "Plumber first fix in kitchen did not comply with building regulations — notified site manager at 14:30" in a site diary?',
    options: [
      'The first is shorter and therefore quicker to write up at the end of the day',
      'The first is subjective opinion; the second is factual, specific, time-stamped and records action taken',
      'The first names an individual while the second avoids naming anyone',
      'The first is written in the passive voice; the second in the active voice',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The first is subjective opinion with no specifics. The second is factual, specific, references a standard, includes a timestamp, and records action taken. Only the second has evidential value.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'advanced' as const,
    topic: 'site diaries',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 150,
    question:
      'An electrician shares a progress photo showing a client address on public social media. What issues does this create?',
    options: [
      'It breaches copyright on the building design shown in the photo',
      'It invalidates the electrical certificate for the installation',
      'Potential GDPR breach, security risk (advertising unoccupied property), and privacy violation without consent',
      'It exposes the electrician to liability under the Building Regulations',
    ] as const,
    correctAnswer: 2,
    explanation:
      'This creates GDPR, security and privacy issues. Best practice is to obtain consent, avoid showing identifiable addresses, and use private or business-only accounts.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'advanced' as const,
    topic: 'GDPR',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 151,
    question:
      'Under NEC contracts, what is the consequence of failing to issue an early warning notice?',
    options: [
      'The contract is automatically terminated for breach by the contractor',
      'The project manager must personally pay any resulting additional costs',
      'The early warning can be issued retrospectively with no penalty',
      'You may lose the right to claim additional time or money for the resulting event',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Under NEC, failure to issue an early warning can result in losing the right to claim additional time or compensation. The contract assesses events as if the early warning had been given.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'advanced' as const,
    topic: 'NEC contracts',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 152,
    question:
      'How should a professional email handle a chain where the topic has evolved significantly?',
    options: [
      'Start a new email with a new subject line reflecting the current topic',
      'Keep replying on the same chain so all history stays in one place',
      'Delete the old chain and start again with no reference to it',
      'Change the subject line on the existing chain but keep replying to it',
    ] as const,
    correctAnswer: 0,
    explanation:
      'When an email chain evolves beyond its original topic, start a new email with a relevant subject line. Reference the previous chain while ensuring the new topic is clearly identified.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'advanced' as const,
    topic: 'email etiquette',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 153,
    question:
      'A commercial tender asks for a "fully inclusive price." What is the safest approach?',
    options: [
      'Submit the lowest possible figure and add charges later as issues arise',
      'Provide the price but clearly define what "fully inclusive" means by listing all inclusions and exclusions',
      'Decline to quote until the tender defines "fully inclusive" itself',
      'Quote a high figure to cover every conceivable cost without itemising',
    ] as const,
    correctAnswer: 1,
    explanation:
      '"Fully inclusive" is inherently ambiguous. By clearly listing inclusions and exclusions, you protect yourself while being transparent.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'advanced' as const,
    topic: 'quotes and proposals',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 154,
    question:
      'Why is it important to keep customer data secure on personal mobile phones under GDPR?',
    options: [
      'GDPR only applies to data held on company-owned computers, not phones',
      'Customer data on a phone is exempt from GDPR if the phone is password-protected',
      'Personal data on any device is subject to GDPR, and a lost phone could result in a data breach with ICO fines',
      'GDPR allows unlimited storage of customer data as long as it is never shared',
    ] as const,
    correctAnswer: 2,
    explanation:
      'GDPR applies to personal data regardless of where stored. A lost or stolen phone with customer data constitutes a data breach. The ICO can fine businesses of any size.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'advanced' as const,
    topic: 'GDPR',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 155,
    question:
      'A subcontractor texts "yeah that price is fine just crack on." Is this sufficient acceptance of a quote?',
    options: [
      'No, a text message can never form a binding acceptance of a quote',
      'Yes, any informal agreement is fully sufficient and needs no follow-up',
      'No, acceptance is only valid if the client signs a printed copy in person',
      'Potentially, but it creates risk — follow up with formal written confirmation referencing the specific quote',
    ] as const,
    correctAnswer: 3,
    explanation:
      'While a text could constitute acceptance, it does not identify which quote, version or terms apply. Best practice is to follow up with formal confirmation referencing the specific quote number and details.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'advanced' as const,
    topic: 'quotes and proposals',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 156,
    question: 'What is the recommended approach when a client requests a mid-project change?',
    options: [
      'Document the change, confirm cost and time implications, obtain written agreement before proceeding, and update the site diary',
      'Carry out the change immediately to keep the client happy and invoice for it later',
      'Refuse all mid-project changes as a matter of policy to avoid disputes',
      'Make a verbal note of the change and rely on goodwill if a dispute arises',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Changes should be documented before work is carried out: describe the change, confirm implications in writing, obtain agreement, and record in the site diary.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'advanced' as const,
    topic: 'variations',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 157,
    question: 'Best practice for sharing progress photos with clients digitally is:',
    options: [
      'Post them on a public social media page so the client can find them easily',
      'Send via a dedicated project channel with permission, including context about what the photo shows',
      'Send them with no caption so the client forms their own impression',
      'Share them in a group chat with all of your other clients at once',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Use a dedicated channel with permission, provide context about what is shown, and ensure images do not compromise security or GDPR.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'intermediate' as const,
    topic: 'digital communication',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 158,
    question: 'What makes a WhatsApp message professional in a construction context?',
    options: [
      'Sending several short messages in quick succession to convey urgency',
      'Using plenty of abbreviations and emojis to keep the tone friendly',
      'Clear, purposeful, respectful of working hours, and separate from social chat',
      'Sending messages at any time of day or night so nothing is forgotten',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Professional WhatsApp messages are clear about what is needed, sent during reasonable hours, kept separate from social conversation, and written with professional courtesy.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'intermediate' as const,
    topic: 'WhatsApp etiquette',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 159,
    question: 'What is the recommended date format for site diary entries?',
    options: [
      'A numeric-only format such as "03/04/25" to save space',
      'The day of the week only, such as "Tuesday morning"',
      'A relative reference such as "two days after the delivery"',
      'Unambiguous format such as "14 March 2025" with 24-hour clock',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Use unambiguous date formats and 24-hour clock. Site diaries may be used as evidence years later, so clarity is essential.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'basic' as const,
    topic: 'site diaries',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 160,
    question:
      'A colleague posts a photo of defective work by another contractor on a public forum, naming the company. What issues could this create?',
    options: [
      'Potential defamation, damage to professional relationships, GDPR breach if individuals identifiable, and breach of site confidentiality',
      'No issues at all, since the defective work is a matter of public interest',
      'Only a minor etiquette breach with no legal or professional consequences',
      'A breach of copyright in the photograph but nothing more serious',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Publicly naming a company creates defamation risk, damages relationships, possible GDPR issues, and potential confidentiality breach. Use formal channels for genuine concerns.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'advanced' as const,
    topic: 'digital communication',
    category: 'Professional Writing & Digital Communication' as const,
  },

  // ---------------------------------------------------------------------------
  // Category 5: Negotiation, Persuasion & Difficult Conversations (40 questions, id 161-200)
  // ---------------------------------------------------------------------------
  {
    id: 161,
    question: 'Who developed "principled negotiation" in the book "Getting to Yes"?',
    options: [
      'Robert Cialdini and Sharon Bower',
      'Roger Fisher, William Ury and Bruce Patton',
      'Stephen Covey and Eric Berne',
      'Albert Bandura and Carol Dweck',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Fisher, Ury and Patton of the Harvard Negotiation Project developed principled negotiation, published in "Getting to Yes" (1981).',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'principled negotiation',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 162,
    question: 'What does BATNA stand for?',
    options: [
      'Balanced Assessment of Trade Negotiation Alternatives',
      'Basic Approach To Neutral Agreements',
      'Best Alternative To a Negotiated Agreement',
      'Business Analysis for Targeted Negotiation Actions',
    ] as const,
    correctAnswer: 2,
    explanation:
      'BATNA stands for Best Alternative To a Negotiated Agreement. Developed by Fisher, Ury and Patton, it represents your best option if negotiations fail.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'BATNA',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 163,
    question: 'What does the DESC model stand for?',
    options: [
      'Deliver, Explain, Support, Close',
      'Decide, Evaluate, Summarise, Conclude',
      'Discuss, Engage, Solve, Confirm',
      'Describe, Express, Specify, Consequences',
    ] as const,
    correctAnswer: 3,
    explanation:
      'The DESC model by Sharon and Gordon Bower stands for Describe (situation factually), Express (your feelings), Specify (what you want), and Consequences (positive outcomes).',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'DESC model',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 164,
    question: 'How many principles of influence did Robert Cialdini identify?',
    options: [
      'Six',
      'Eight',
      'Five',
      'Four',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Cialdini identified six: reciprocity, commitment/consistency, social proof, authority, liking, and scarcity.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'Cialdini principles',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 165,
    question: 'What is the first principle of principled negotiation?',
    options: [
      'Focus on interests, not positions',
      'Separate the people from the problem',
      'Invent options for mutual gain',
      'Insist on objective criteria',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The first principle is "separate the people from the problem" — address the issue without letting personal emotions or egos interfere.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'principled negotiation',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 166,
    question: 'What is the "broken record" technique?',
    options: [
      'Raising your voice gradually until the other person backs down',
      'Acknowledging any truth in criticism without conceding your position',
      'Calmly repeating your position without getting drawn into arguments',
      'Restating the other person\'s point back to them to show you understand',
    ] as const,
    correctAnswer: 2,
    explanation:
      'The broken record technique involves calmly repeating your position each time the other person tries to deflect or argue. It is assertive without being aggressive.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'assertive techniques',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 167,
    question: 'What is "fogging" as an assertive communication technique?',
    options: [
      'Deliberately giving vague answers so the other person loses their thread',
      'Repeating your position calmly each time the other person pushes back',
      'Deflecting criticism by immediately raising a complaint of your own',
      'Agreeing with the truth in criticism without becoming defensive, which defuses aggression',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Fogging involves calmly acknowledging truth in criticism without conceding your position. For example: "You may have received lower quotes. My price reflects quality materials and workmanship."',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'assertive techniques',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 168,
    question:
      'Which Cialdini principle is demonstrated by offering a free inspection before quoting?',
    options: [
      'Reciprocity',
      'Scarcity',
      'Authority',
      'Social proof',
    ] as const,
    correctAnswer: 0,
    explanation:
      'A free inspection demonstrates reciprocity — giving something of value first creates a natural obligation to reciprocate.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'Cialdini principles',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 169,
    question: 'What is the difference between a "position" and an "interest" in negotiation?',
    options: [
      'A position is the opening offer; an interest is the final agreed price',
      'A position is what someone says they want; an interest is why they want it',
      'A position is your walkaway point; an interest is the other party\'s walkaway point',
      'A position is a written demand; an interest is a verbal one',
    ] as const,
    correctAnswer: 1,
    explanation:
      'A position is the stated demand; an interest is the underlying need driving it. Focusing on interests reveals multiple ways to satisfy both parties.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'principled negotiation',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 170,
    question: 'Thomas Gordon developed which communication framework?',
    options: [
      'Cognitive Behavioural Therapy',
      'The Shannon-Weaver transmission model',
      'I-messages versus You-messages',
      'Separate the people from the problem',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Thomas Gordon developed I-messages: "I feel concerned when deadlines are missed because..." — expressing feelings without blame.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'I-messages',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 171,
    question: 'What is the preparation framework for a difficult conversation?',
    options: [
      'Rehearse a forceful opening so the other person knows you mean business',
      'Avoid planning so the conversation stays natural and spontaneous',
      'Wait until tempers flare so the issue is dealt with in the moment',
      'Plan key points, practise what you will say, choose the right time and place, execute with empathy',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Preparation involves: planning key points, practising (including anticipating responses), choosing appropriate time and place, and executing with empathy.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'difficult conversations',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 172,
    question: 'What is "anchoring" in negotiation?',
    options: [
      'The first number mentioned tends to influence the final outcome',
      'Refusing to state any figure until the other party commits first',
      'Repeating your position calmly until the other party concedes',
      'Splitting the difference between two offers to reach a quick deal',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Anchoring is a cognitive bias where the first number sets a reference point that influences subsequent discussion. Presenting your price first can lead to better outcomes.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'negotiation techniques',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 173,
    question: 'De-escalation techniques are primarily designed to:',
    options: [
      'Win the argument quickly before the other person can respond',
      'Reduce emotional intensity so productive conversation can occur',
      'Establish who is at fault before the conversation continues',
      'End the conversation as fast as possible to avoid confrontation',
    ] as const,
    correctAnswer: 1,
    explanation:
      'De-escalation reduces emotional temperature so rational conversation can resume. Techniques include lowering voice, calm body language, acknowledging feelings, and using their name.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'de-escalation',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 174,
    question: 'Which Cialdini principle explains why NICEIC or NAPIT logos build trust?',
    options: [
      'Liking',
      'Reciprocity',
      'Authority',
      'Scarcity',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Displaying recognised accreditation logos leverages the authority principle — people trust those who demonstrate expertise and credentials.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'Cialdini principles',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 175,
    question: 'Using DESC, how would you address a consistently late subcontractor?',
    options: [
      '"You are always letting the team down — sort your timekeeping out or you are off the job."',
      '"It does not really matter, but try to be a bit earlier in future if you can."',
      '"Everyone has noticed you turning up late — it is becoming a bit of a joke."',
      '"Describe: You have arrived after 09:00 on four occasions. Express: This causes concern as it delays the programme. Specify: I need you on site by 08:00. Consequences: This keeps the project on track"',
    ] as const,
    correctAnswer: 3,
    explanation:
      'DESC provides a structured, assertive approach: factual description, impact expressed, clear specification, and positive consequences. Assertive without being aggressive.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'DESC model',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 176,
    question: 'What does "invent options for mutual gain" mean in principled negotiation?',
    options: [
      'Look for creative solutions where both parties get something they value',
      'Make the first offer so high that any compromise still favours you',
      'Identify your walkaway point before the negotiation begins',
      'Stick firmly to your opening position until the other side concedes',
    ] as const,
    correctAnswer: 0,
    explanation:
      'This means brainstorming creative solutions that expand possibilities: phased payments, additional scope, or timing adjustments that benefit both parties.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'principled negotiation',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 177,
    question: 'How does knowing your BATNA strengthen your negotiation position?',
    options: [
      'It guarantees the other party will accept your first offer',
      'It gives you confidence to walk away from a bad deal because you know your best alternative',
      'It removes the need to prepare any objective criteria in advance',
      'It allows you to anchor the discussion with an extreme opening figure',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Your BATNA provides a clear benchmark. If the offer is worse, walk away. If better, accept. This eliminates pressure to accept a bad deal.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'BATNA',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 178,
    question: 'What is the "social proof" principle of influence?',
    options: [
      'People comply more with those who hold recognised credentials',
      'People feel obliged to return a favour they have been given',
      'People follow the behaviour of others, especially in uncertainty',
      'People value something more when it appears to be in short supply',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Social proof is the tendency to follow others behaviour, especially when uncertain. Customer testimonials and case studies leverage this principle.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'Cialdini principles',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 179,
    question: 'How should you deliver bad news about a cost overrun?',
    options: [
      'Delay telling the client until the work is finished and the bill is final',
      'Bury the extra cost in the final invoice without flagging it in advance',
      'Email a brief note so you do not have to discuss it face to face',
      'Be direct and honest, explain what happened and why, present cost impact clearly, and offer solutions',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Bad news should be direct, honest and prompt. Explain facts, cause, impact, and solutions. Clients respect honesty even when news is unwelcome.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'difficult conversations',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 180,
    question: 'What is "framing" in negotiation?',
    options: [
      'Presenting information in a way that emphasises different aspects to influence perception',
      'Setting the first figure to anchor the discussion in your favour',
      'Knowingly making a false statement to gain an advantage',
      'Repeating your position calmly until the other party gives way',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Framing presents the same information differently: "This upgrade costs £800" versus "For £800 you get RCD protection that could save your family." Both factually correct but different emphasis.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'influence techniques',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 181,
    question: 'When addressing unsafe behaviour on site, what is the recommended approach?',
    options: [
      'Call it out loudly in front of the whole team to set an example',
      'Address privately, describe the specific behaviour factually, explain the risk, and agree the correct procedure',
      'Ignore it the first time and only act if the behaviour is repeated',
      'Report it straight to the HSE without speaking to the worker first',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Address promptly but privately, describe behaviour factually, explain risk, and agree correct procedure. Public humiliation creates resentment without improving safety.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'difficult conversations',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 182,
    question: 'What does "insist on objective criteria" mean in principled negotiation?',
    options: [
      'Holding firmly to your stated position until the other party gives way',
      'Knowing your best alternative so you can walk away if needed',
      'Base agreements on fair, independent standards rather than pressure or willpower',
      'Separating the people from the problem to keep emotions out of it',
    ] as const,
    correctAnswer: 2,
    explanation:
      'The fourth principle means using industry benchmarks, published rates, or objective measurements rather than pressure tactics.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'principled negotiation',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 183,
    question: 'Which statement best describes Cialdini\'s "commitment and consistency" principle?',
    options: [
      'People comply more readily with requests from those they like',
      'People value an offer more highly when it is scarce or time-limited',
      'People defer to those who display recognised expertise and credentials',
      'Once someone makes a small commitment, they are more likely to follow through with a larger related one',
    ] as const,
    correctAnswer: 3,
    explanation:
      'People act consistently with previous commitments. Once a client agrees to a small step (survey), they are more likely to follow through with a larger one (accepting the quote).',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'Cialdini principles',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 184,
    question:
      'What is the difference between assertive and aggressive communication when chasing an unpaid invoice?',
    options: [
      'Assertive states rights and facts calmly; aggressive attacks the person',
      'Assertive avoids mentioning the debt; aggressive states it plainly',
      'Assertive is always done in writing; aggressive is always done by phone',
      'Assertive gives in to keep the client; aggressive holds firm on the facts',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Assertive: "The invoice was due on 1 March and payment has not been received. Please arrange within 7 days." Aggressive: "You always take the mick." Assertive maintains relationships.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'assertive communication',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 185,
    question:
      'How would you convert "You never give me enough time" into a Thomas Gordon I-message?',
    options: [
      '"You need to start giving me realistic deadlines from now on."',
      '"I feel under pressure when timescales are tight because I want to deliver quality work. Could we discuss the programme?"',
      '"Why do you always set deadlines that are impossible to meet?"',
      '"Everyone on the team thinks the deadlines you set are unreasonable."',
    ] as const,
    correctAnswer: 1,
    explanation:
      'An I-message has three parts: I feel (emotion), when (situation), because (impact). This avoids blame while clearly expressing the concern.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'I-messages',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 186,
    question: 'What is "saying no professionally"?',
    options: [
      'Avoiding a direct answer in the hope the request quietly goes away',
      'Agreeing reluctantly to avoid any awkwardness with the other person',
      'Declining clearly and respectfully, with a brief explanation and where possible an alternative',
      'Refusing bluntly and ending the conversation to make your position clear',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Professional assertive refusal involves: a clear no, brief explanation, and where possible an alternative suggestion. This maintains the relationship while protecting boundaries.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'assertive communication',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 187,
    question:
      'Cialdini "liking" principle suggests people agree more with those they like. How is this applied ethically?',
    options: [
      'Flatter the client repeatedly so they feel obliged to choose you',
      'Pretend to share the client\'s every opinion to win them over',
      'Mirror the client\'s accent and mannerisms to seem more similar',
      'Build genuine rapport through professionalism, reliability, clear communication and authentic common ground',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Build genuine relationships through consistent professionalism, reliability, and finding authentic common ground. This is not manipulation — it is simply being a good professional.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'Cialdini principles',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 188,
    question: 'What is the key danger of positional bargaining versus principled negotiation?',
    options: [
      'It focuses on winning and losing rather than solutions, often damaging relationships and producing suboptimal outcomes',
      'It always takes far longer to reach any agreement at all',
      'It can only be used when both parties already trust each other',
      'It relies entirely on objective criteria and ignores underlying interests',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Positional bargaining treats negotiation as zero-sum. Principled negotiation creates better outcomes by focusing on interests rather than positions.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'principled negotiation',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 189,
    question:
      'Which de-escalation technique is most effective when someone is shouting at you on site?',
    options: [
      'Raise your own voice to match theirs so you are not drowned out',
      'Lower your voice, maintain calm body language, use their name, and acknowledge their frustration before addressing the issue',
      'Walk away immediately and refuse to speak until they apologise',
      'Stand your ground and list the facts loudly until they stop shouting',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Lower voice (people match volume), calm body language, use their name (personal connection), and acknowledge emotion before addressing the issue. Productive conversation follows de-escalation.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'de-escalation',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 190,
    question:
      'A client says "Your price is too high — my mate would do it for half." Using principled negotiation, what is the best response?',
    options: [
      'Immediately drop your price to match the mate\'s figure to win the work',
      'Tell the client their mate clearly is not a properly qualified electrician',
      'Acknowledge their concern, explore interests, use objective criteria: "I understand price is important. What does that quote include? My price is based on NICEIC standards and full certification"',
      'End the conversation, since a client who haggles is not worth the work',
    ] as const,
    correctAnswer: 2,
    explanation:
      'This applies principled negotiation: separates person from problem, focuses on interests, and uses objective criteria. It invites scope comparison rather than just price.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'advanced' as const,
    topic: 'principled negotiation',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 191,
    question:
      'An electrician needs to tell a client a rewire will cost 30% more due to unforeseen asbestos. Using DESC and principled negotiation, what approach is best?',
    options: [
      'Carry out the asbestos removal first and add the cost to the final bill without warning',
      'Quietly absorb the extra cost yourself to avoid an awkward conversation',
      'Pause the job and tell the client you cannot continue until they accept the increase',
      'Describe: "We discovered asbestos in the ceiling void." Express: "I want to be transparent about cost impact." Specify: "The removal adds £2,400." Consequences: "This ensures safe, regulation-compliant completion"',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Combines DESC structure with principled negotiation: factual description, transparency expressed, exact cost specified, consequence framed in client interest (safety, compliance).',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'advanced' as const,
    topic: 'DESC model',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 192,
    question:
      'A main contractor pressures you to reduce price by 15% or lose the work. Your BATNA is two other available projects. How does this inform your approach?',
    options: [
      'Evaluate whether the reduced price is still better than your BATNA. If not, decline confidently. If close, negotiate for other value (better payment terms, future work)',
      'Accept the 15% reduction immediately to secure the relationship for the future',
      'Refuse to discuss price at all and walk away from the negotiation entirely',
      'Counter with a 15% increase to anchor the discussion back in your favour',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Your BATNA gives a clear comparison. If the reduction is worse than alternatives, decline confidently. If close, negotiate other value. This demonstrates BATNA power.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'advanced' as const,
    topic: 'BATNA',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 193,
    question: 'How can Cialdini "scarcity" principle be applied ethically when presenting a quote?',
    options: [
      'Invent a fake deadline to pressure the client into deciding quickly',
      'Honestly communicate genuine constraints: "My next available start is 6 weeks out, but I could fit you in sooner if we confirm by Friday"',
      'Claim materials are about to run out when stock is actually plentiful',
      'Tell every client they are your last available slot to create urgency',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Ethical scarcity means honestly communicating genuine constraints — real availability, genuine validity periods, or actual supply timelines. Truthful urgency helps clients make timely decisions.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'advanced' as const,
    topic: 'Cialdini principles',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 194,
    question:
      'You need to discuss persistent late payment with a long-standing client. Combining I-messages and DESC, what is most effective?',
    options: [
      '"You are always paying late and it is really starting to take the mick."',
      '"Could you possibly try to pay a bit sooner next time, if that is alright?"',
      'Describe: "The last three invoices were paid 30+ days late." Express: "I value our relationship, but late payment creates cash flow difficulties." Specify: "I need invoices paid within 14-day terms." Consequences: "This allows me to continue prioritising your work"',
      '"If the next invoice is late I will have to stop working for you altogether."',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Combines DESC with I-message framing: factual description, impact expressed without blame, clear expectation, positive consequence. Assertive, professional and preserves relationship.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'advanced' as const,
    topic: 'difficult conversations',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 195,
    question:
      'In negotiation, a party reveals their interest is cash flow certainty rather than lowest price. What options for mutual gain could you explore?',
    options: [
      'Offer the lowest possible headline price and absorb any cost increases yourself',
      'Insist on a single lump-sum payment on completion to keep things simple',
      'Refuse to discuss payment structure until the scope is fully agreed',
      'Fixed monthly payments, milestone billing, or a retainer that provides predictability while maintaining your rate',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Understanding the interest (cash flow certainty) opens creative options satisfying both parties. This is "inventing options for mutual gain" from principled negotiation.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'advanced' as const,
    topic: 'principled negotiation',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 196,
    question:
      'You observe an apprentice, who happens to be the site manager\'s son, performing unsafe cable terminations. How should you approach this?',
    options: [
      'Address the safety issue directly using facts and I-messages, document it, and escalate formally if behaviour continues regardless of relationships',
      'Say nothing, since raising it could create friction with the site manager',
      'Mention it casually to the site manager and leave them to deal with it',
      'Wait to see whether anyone is harmed before deciding whether to act',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Safety is non-negotiable regardless of relationships. Address directly with factual I-messages, document, provide guidance, and follow up. Escalate formally if behaviour continues.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'advanced' as const,
    topic: 'difficult conversations',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 197,
    question: 'How do BATNA and the "zone of possible agreement" (ZOPA) work together?',
    options: [
      'The ZOPA replaces the need for a BATNA once negotiations begin',
      'Your BATNA sets your walkaway point, the other party BATNA sets theirs, and the ZOPA is the range between where agreement is possible',
      'The BATNA is the opening offer and the ZOPA is the final agreed figure',
      'A strong BATNA always guarantees a wide ZOPA in your favour',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Your BATNA establishes your minimum; their BATNA establishes their maximum. The ZOPA is the overlap where agreement is possible. If no overlap, no deal.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'advanced' as const,
    topic: 'BATNA',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 198,
    question:
      'A client becomes aggressive about additional costs, shouting and pointing. Combining de-escalation and assertive communication, what is the correct sequence?',
    options: [
      'Present the facts and figures immediately to correct their misunderstanding',
      'Match their energy and assert your position firmly until they calm down',
      'De-escalate first (lower voice, acknowledge emotion, let them vent), then once calm use DESC model to address the issue',
      'Walk away at once and refuse to continue until they put it in writing',
    ] as const,
    correctAnswer: 2,
    explanation:
      'First de-escalate (you cannot reason with someone in fight-or-flight), then use structured assertive communication. Attempting facts during high emotion is ineffective.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'advanced' as const,
    topic: 'de-escalation',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 199,
    question:
      'How can framing and anchoring be combined ethically when presenting to a price-sensitive client?',
    options: [
      'Start with the lowest price',
      'Present three options anchored around your preferred price, framing each in terms of value: "Our recommended option at £X gives you [benefits]"',
      'Refuse to give a price until they reveal budget',
      'Quote double and expect to negotiate down 50%',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Three-option pricing anchors around the middle option while framing in terms of value. This helps clients decide based on value rather than focusing solely on the lowest number.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'advanced' as const,
    topic: 'influence techniques',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 200,
    question:
      'A foreman needs to confront a project manager about contradictory instructions causing rework. Using principled negotiation, I-messages and DESC together, which approach is best?',
    options: [
      'Separate person from problem, describe instances factually (DESC), express impact using I-messages, specify a solution like written instruction confirmation, and frame consequence as mutual interest',
      'Raise it loudly in the next site meeting so the whole team hears the concern',
      'Send a blunt email listing every contradiction and copy in senior management',
      'Say nothing and absorb the rework cost to avoid challenging a superior',
    ] as const,
    correctAnswer: 0,
    explanation:
      'This integrates all three frameworks: principled negotiation (separate people from problem, mutual interests), I-messages (impact without blame), and DESC (structured assertion). Most likely to produce constructive resolution while preserving the working relationship.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'advanced' as const,
    topic: 'principled negotiation',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
];
