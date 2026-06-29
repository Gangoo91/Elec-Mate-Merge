/**
 * Leadership on Site Mock Exam Question Bank (Stub)
 *
 * TODO: Populate with 200 questions across 5 modules.
 */

import { StandardMockQuestion, MockExamConfig } from '@/types/standardMockExam';
import { getRandomQuestionsBalanced } from '@/utils/questionSelection';

export const leadershipCategories = [
  'Understanding Leadership',
  'Leading Your Team',
  'Communication Skills',
  'Decision-Making & Problem-Solving',
  'Managing Performance',
];

export const leadershipMockExamConfig: MockExamConfig = {
  examId: 'leadership-on-site',
  examTitle: 'Leadership on Site Mock Examination',
  totalQuestions: 20,
  timeLimit: 1800,
  passThreshold: 80,
  exitPath: '/study-centre/apprentice/leadership-on-site',
  categories: leadershipCategories,
};

export const leadershipQuestionBank: StandardMockQuestion[] = [
  {
    id: 1,
    question:
      'According to the situational leadership model, which leadership style is most appropriate for a highly skilled but unmotivated team member?',
    options: [
      'Delegating — turn over responsibility for decisions and implementation',
      'Participating — share ideas and facilitate decision-making together',
      'Telling — give clear, specific instructions and supervise closely',
      'Selling — explain decisions and provide opportunity for clarification',
    ],
    correctAnswer: 1,
    explanation:
      'A highly skilled but unmotivated team member needs a participating style. They have the ability but lack motivation, so sharing responsibility and involving them in decisions can re-engage them.',
    category: 'Understanding Leadership',
    difficulty: 'intermediate' as const,
  },
  {
    id: 2,
    question: 'The DESC model for difficult conversations stands for:',
    options: [
      'Demand, Explain, Suggest, Conclude',
      'Discuss, Evaluate, Summarise, Close',
      'Describe, Express, Specify, Consequences',
      'Define, Empathise, State, Confirm',
    ],
    correctAnswer: 2,
    explanation:
      'DESC stands for Describe the behaviour, Express the impact, Specify what you need, and outline the Consequences.',
    category: 'Communication Skills',
    difficulty: 'basic' as const,
  },
  {
    id: 3,
    question: 'When delegating a task, a leader should always ensure the team member understands:',
    options: [
      'Only the deadline, so they can plan their own approach to the work',
      'Just the technical method, since the reason for the task is not their concern',
      'Who to report any problems to, with the rest left to their own judgement',
      'What needs to be done, why it matters, the expected standard, the deadline, and what authority they have',
    ],
    correctAnswer: 3,
    explanation:
      'Effective delegation requires clarity on the task, its importance, the expected standard, the deadline, and the authority the person has to make decisions.',
    category: 'Leading Your Team',
    difficulty: 'basic' as const,
  },
  {
    id: 4,
    question: 'The five whys technique is primarily used for:',
    options: [
      'Identifying the root cause of a problem by asking "why" repeatedly',
      'Writing method statements for complex tasks',
      'Conducting employee performance reviews',
      'Planning the weekly programme for the team',
    ],
    correctAnswer: 0,
    explanation:
      'The five whys is a root cause analysis technique. By asking "why" up to five times, you drill past symptoms to find the underlying cause of a problem.',
    category: 'Decision-Making & Problem-Solving',
    difficulty: 'basic' as const,
  },
  {
    id: 5,
    question:
      'When giving constructive feedback to a team member, the most effective approach is to:',
    options: [
      'Wait until the annual review to discuss all issues at once',
      'Be specific, timely, and focus on behaviour rather than personality',
      'Give feedback publicly so the whole team learns from the example',
      'Start with a compliment, give the criticism, then end with another compliment',
    ],
    correctAnswer: 1,
    explanation:
      'Effective feedback is specific (not vague), timely (close to the event), and focused on observable behaviour rather than character judgements.',
    category: 'Managing Performance',
    difficulty: 'basic' as const,
  },
  {
    id: 6,
    question: 'RIDDOR stands for:',
    options: [
      'Recording and Investigating Dangerous Events and Risks Regulations',
      'Regulations for Investigating Dangerous and Destructive Occurrences at Work',
      'Reporting of Injuries, Diseases and Dangerous Occurrences Regulations',
      'Reporting of Industrial Diseases, Dangers and Operational Risks',
    ],
    correctAnswer: 2,
    explanation:
      'RIDDOR stands for the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013.',
    category: 'Communication Skills',
    difficulty: 'basic' as const,
  },
  {
    id: 7,
    question:
      'The single hardest aspect of the mate-to-manager transition is generally considered to be:',
    options: [
      'Adjusting to longer working hours',
      'Learning new administrative duties',
      'Understanding company policies and procedures',
      'Handling underperformance in people who are your friends',
    ],
    correctAnswer: 3,
    explanation:
      'Handling underperformance in friends is widely regarded as the single hardest part of the mate-to-manager transition.',
    category: 'Understanding Leadership',
    difficulty: 'intermediate' as const,
  },
  {
    id: 8,
    question: 'A contemporaneous note is:',
    options: [
      'A note written at or very close to the time of the event it records',
      'A note written from memory several weeks after the event',
      'A note that has been agreed by all parties involved',
      'A note written by a solicitor summarising the facts',
    ],
    correctAnswer: 0,
    explanation:
      'A contemporaneous note is one made at the time of the event or as soon as reasonably practicable afterwards, and carries significant weight in legal and contractual proceedings.',
    category: 'Communication Skills',
    difficulty: 'intermediate' as const,
  },
  {
    id: 9,
    question:
      'When a team member is consistently underperforming, the first step a leader should take is:',
    options: [
      'Report them to HR without speaking to them first',
      'Have a private, direct conversation to understand the cause and set clear expectations',
      'Reassign their work to more capable team members',
      'Begin formal disciplinary proceedings immediately',
    ],
    correctAnswer: 1,
    explanation:
      'The first step is always an informal, private conversation. Understand the cause, set clear expectations, agree actions, and set a review date.',
    category: 'Managing Performance',
    difficulty: 'basic' as const,
  },
  {
    id: 10,
    question: 'Fairness in leadership means:',
    options: [
      'Treating everyone identically regardless of circumstances',
      'Giving the best tasks to the most experienced workers',
      'Applying the same expectations, consequences, and opportunities to everyone',
      'Always agreeing with the majority opinion on the team',
    ],
    correctAnswer: 2,
    explanation:
      'Fairness means applying the same standards to everyone. It does not mean identical treatment — different people may need different support — but expectations and consequences must be equal.',
    category: 'Understanding Leadership',
    difficulty: 'intermediate' as const,
  },
  {
    id: 11,
    question: 'The angry email rule advises that when you are frustrated, you should:',
    options: [
      'Send it straight away while the points are still fresh in your mind',
      'Forward it to your manager first so they can decide whether it should go',
      'Reply all to the original thread so everyone sees your response immediately',
      'Write the email, save as draft, re-read it the next day before deciding to send',
    ],
    correctAnswer: 3,
    explanation:
      'The angry email rule: write it, save as draft, re-read with fresh eyes the next day. Emails written in anger contain language you will regret.',
    category: 'Communication Skills',
    difficulty: 'basic' as const,
  },
  {
    id: 12,
    question: 'A well-structured site report should include:',
    options: [
      'What happened, where, when, who was involved, what action was taken, and what follow-up is needed',
      'Only your personal opinion on who was at fault for the incident',
      'A detailed costing of the works, with the facts of the event left out',
      'Just the final outcome, since the background detail is rarely needed',
    ],
    correctAnswer: 0,
    explanation:
      'A well-structured report answers: what, where, when, who, action taken, follow-up. It must be factual, objective, and in plain language.',
    category: 'Communication Skills',
    difficulty: 'basic' as const,
  },
  {
    id: 13,
    question: "Mcgregor's Theory Y assumes that workers:",
    options: [
      'Dislike work and must be coerced or controlled to put in effort',
      'Are naturally motivated and can exercise self-direction when committed to objectives',
      'Are motivated almost entirely by pay and job security alone',
      'Need close supervision because they will avoid responsibility wherever possible',
    ],
    correctAnswer: 1,
    explanation:
      'McGregor\'s Theory Y assumes people are self-motivated, enjoy responsibility, and can direct their own work when they are committed to the objectives. The opposite view (people dislike work and need control) is Theory X.',
    category: 'Understanding Leadership',
    difficulty: 'intermediate' as const,
  },
  {
    id: 14,
    question: 'The most effective way to build trust with a new team is:',
    options: [
      'Assert your authority early by being firm and keeping your distance',
      'Avoid admitting any gaps in your knowledge so you appear fully competent',
      'Be consistently fair, follow through on commitments, and admit when you do not know something',
      'Promise generous rewards quickly to win the team over from the start',
    ],
    correctAnswer: 2,
    explanation:
      'Trust is built through consistency, reliability, and honesty. Following through on commitments and admitting limitations demonstrates integrity.',
    category: 'Leading Your Team',
    difficulty: 'basic' as const,
  },
  {
    id: 15,
    question: 'When using the five whys technique, a common mistake is:',
    options: [
      'Asking "why" far more than five times until the team loses patience',
      'Involving too many people from different trades in the discussion',
      'Writing the answers down rather than keeping them as a verbal exercise',
      'Stopping at the first answer instead of drilling deeper to the root cause',
    ],
    correctAnswer: 3,
    explanation:
      'The most common mistake is stopping too soon. The first "why" usually reveals a symptom, not the root cause. Keep asking to get deeper.',
    category: 'Decision-Making & Problem-Solving',
    difficulty: 'intermediate' as const,
  },
  {
    id: 16,
    question: 'Setting boundaries as a new supervisor should happen:',
    options: [
      'From day one, applied equally to everyone',
      'After a settling-in period of about three months',
      'After the first major problem occurs',
      'Only with team members who cause problems',
    ],
    correctAnswer: 0,
    explanation:
      'Boundaries must be set from day one and applied equally. Waiting creates ambiguity that is much harder to correct later.',
    category: 'Understanding Leadership',
    difficulty: 'basic' as const,
  },
  {
    id: 17,
    question: 'Emotional intelligence in leadership primarily involves:',
    options: [
      'Keeping your own emotions hidden so the team never sees you react',
      'Recognising, understanding, and managing your own emotions and those of others',
      'Scoring highest on technical knowledge and qualifications in the team',
      'Making decisions purely on logic while ignoring how people feel',
    ],
    correctAnswer: 1,
    explanation:
      'Emotional intelligence is about self-awareness, self-regulation, empathy, and social skills — recognising emotions in yourself and others and using that awareness to guide behaviour.',
    category: 'Leading Your Team',
    difficulty: 'intermediate' as const,
  },
  {
    id: 18,
    question: 'A SWOT analysis examines:',
    options: [
      'Safety, Welfare, Organisation, and Training',
      'Staffing, Workload, Objectives, and Targets',
      'Strengths, Weaknesses, Opportunities, and Threats',
      'Strategy, Work, Operations, and Tactics',
    ],
    correctAnswer: 2,
    explanation:
      'SWOT stands for Strengths, Weaknesses, Opportunities, and Threats — a framework for analysing a situation from multiple perspectives.',
    category: 'Decision-Making & Problem-Solving',
    difficulty: 'basic' as const,
  },
  {
    id: 19,
    question: 'When motivating a team, the most sustainable approach is:',
    options: [
      'Relying on one-off cash bonuses whenever targets are hit',
      'Using the threat of disciplinary action to keep standards up',
      'Introducing competition by ranking team members against each other',
      'Creating a sense of purpose, recognition, and opportunities for development',
    ],
    correctAnswer: 3,
    explanation:
      'Intrinsic motivation (purpose, mastery, recognition, development) is more sustainable than extrinsic rewards or fear-based approaches.',
    category: 'Leading Your Team',
    difficulty: 'intermediate' as const,
  },
  {
    id: 20,
    question: 'When conducting an investigation into a workplace incident, the primary goal is:',
    options: [
      'To identify root causes and prevent recurrence',
      'To find someone to blame for what happened',
      'To complete the paperwork as quickly as possible',
      "To minimise the company's legal liability",
    ],
    correctAnswer: 0,
    explanation:
      'The primary goal of an incident investigation is to identify root causes and implement measures to prevent recurrence, not to assign blame.',
    category: 'Decision-Making & Problem-Solving',
    difficulty: 'basic' as const,
  },
];

export const getRandomLeadershipExamQuestions = (numQuestions: number = 20) => {
  return getRandomQuestionsBalanced(leadershipQuestionBank, numQuestions, leadershipCategories);
};
