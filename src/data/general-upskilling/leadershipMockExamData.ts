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
      'Telling — give clear, specific instructions and supervise closely',
      'Selling — explain decisions and provide opportunity for clarification',
      'Participating — share ideas and facilitate decision-making together',
      'Delegating — turn over responsibility for decisions and implementation',
    ],
    correctAnswer: 2,
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
      'Describe, Express, Specify, Consequences',
      'Discuss, Evaluate, Summarise, Close',
      'Define, Empathise, State, Confirm',
    ],
    correctAnswer: 1,
    explanation:
      'DESC stands for Describe the behaviour, Express the impact, Specify what you need, and outline the Consequences.',
    category: 'Communication Skills',
    difficulty: 'basic' as const,
  },
  {
    id: 3,
    question: 'When delegating a task, a leader should always ensure the team member understands:',
    options: [
      'Only what needs to be done — they can figure out the rest',
      'What needs to be done, why it matters, the expected standard, the deadline, and what authority they have',
      'What needs to be done and the deadline — the rest is unnecessary detail',
      'Only the deadline — experienced workers know how to do their job',
    ],
    correctAnswer: 1,
    explanation:
      'Effective delegation requires clarity on the task, its importance, the expected standard, the deadline, and the authority the person has to make decisions.',
    category: 'Leading Your Team',
    difficulty: 'basic' as const,
  },
  {
    id: 4,
    question: 'The five whys technique is primarily used for:',
    options: [
      'Conducting employee performance reviews',
      'Writing method statements for complex tasks',
      'Identifying the root cause of a problem by asking "why" repeatedly',
      'Planning the weekly programme for the team',
    ],
    correctAnswer: 2,
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
      'Give feedback publicly so the whole team learns from the example',
      'Be specific, timely, and focus on behaviour rather than personality',
      'Start with a compliment, give the criticism, then end with another compliment',
    ],
    correctAnswer: 2,
    explanation:
      'Effective feedback is specific (not vague), timely (close to the event), and focused on observable behaviour rather than character judgements.',
    category: 'Managing Performance',
    difficulty: 'basic' as const,
  },
  {
    id: 6,
    question: 'RIDDOR stands for:',
    options: [
      'Reporting of Industrial Diseases, Dangers and Operational Risks',
      'Regulations for Investigating Dangerous and Destructive Occurrences at Work',
      'Reporting of Injuries, Diseases and Dangerous Occurrences Regulations',
      'Recording and Investigating Dangerous Events and Risks Regulations',
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
      'Learning new administrative duties',
      'Handling underperformance in people who are your friends',
      'Adjusting to longer working hours',
      'Understanding company policies and procedures',
    ],
    correctAnswer: 1,
    explanation:
      'Handling underperformance in friends is widely regarded as the single hardest part of the mate-to-manager transition.',
    category: 'Understanding Leadership',
    difficulty: 'intermediate' as const,
  },
  {
    id: 8,
    question: 'A contemporaneous note is:',
    options: [
      'A note written from memory several weeks after the event',
      'A note written at or very close to the time of the event it records',
      'A note that has been agreed by all parties involved',
      'A note written by a solicitor summarising the facts',
    ],
    correctAnswer: 1,
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
      'Begin formal disciplinary proceedings immediately',
      'Have a private, direct conversation to understand the cause and set clear expectations',
      'Reassign their work to more capable team members',
      'Report them to HR without speaking to them first',
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
      'Send the email immediately while details are fresh',
      'Use capital letters for emphasis on key points',
      'Write the email, save as draft, re-read it the next day before deciding to send',
      'Copy in senior management for transparency',
    ],
    correctAnswer: 2,
    explanation:
      'The angry email rule: write it, save as draft, re-read with fresh eyes the next day. Emails written in anger contain language you will regret.',
    category: 'Communication Skills',
    difficulty: 'basic' as const,
  },
  {
    id: 12,
    question: 'A well-structured site report should include:',
    options: [
      'Personal opinions about quality and competence of the workforce',
      'What happened, where, when, who was involved, what action was taken, and what follow-up is needed',
      'As much technical jargon as possible',
      'Only positive observations to maintain client relationships',
    ],
    correctAnswer: 1,
    explanation:
      'A well-structured report answers: what, where, when, who, action taken, follow-up. It must be factual, objective, and in plain language.',
    category: 'Communication Skills',
    difficulty: 'basic' as const,
  },
  {
    id: 13,
    question: "Mcgregor's Theory Y assumes that workers:",
    options: [
      'Are inherently lazy and need constant supervision',
      'Are naturally motivated and can exercise self-direction when committed to objectives',
      'Only work for money and will do the minimum required',
      'Cannot be trusted with responsibility until they have proved themselves',
    ],
    correctAnswer: 1,
    explanation:
      'Theory Y assumes people are self-motivated, enjoy responsibility, and can direct their own work when they are committed to the objectives.',
    category: 'Understanding Leadership',
    difficulty: 'intermediate' as const,
  },
  {
    id: 14,
    question: 'The most effective way to build trust with a new team is:',
    options: [
      'Make promises about improvements and hope you can deliver them',
      'Be consistently fair, follow through on commitments, and admit when you do not know something',
      'Avoid making any changes for the first six months',
      'Socialise with the team as much as possible outside work',
    ],
    correctAnswer: 1,
    explanation:
      'Trust is built through consistency, reliability, and honesty. Following through on commitments and admitting limitations demonstrates integrity.',
    category: 'Leading Your Team',
    difficulty: 'basic' as const,
  },
  {
    id: 15,
    question: 'When using the five whys technique, a common mistake is:',
    options: [
      'Asking too many questions',
      'Stopping at the first answer instead of drilling deeper to the root cause',
      'Involving too many people in the process',
      'Writing down the answers',
    ],
    correctAnswer: 1,
    explanation:
      'The most common mistake is stopping too soon. The first "why" usually reveals a symptom, not the root cause. Keep asking to get deeper.',
    category: 'Decision-Making & Problem-Solving',
    difficulty: 'intermediate' as const,
  },
  {
    id: 16,
    question: 'Setting boundaries as a new supervisor should happen:',
    options: [
      'After the first major problem occurs',
      'From day one, applied equally to everyone',
      'Only with team members who cause problems',
      'After a settling-in period of about three months',
    ],
    correctAnswer: 1,
    explanation:
      'Boundaries must be set from day one and applied equally. Waiting creates ambiguity that is much harder to correct later.',
    category: 'Understanding Leadership',
    difficulty: 'basic' as const,
  },
  {
    id: 17,
    question: 'Emotional intelligence in leadership primarily involves:',
    options: [
      'Suppressing all emotions to appear strong and decisive',
      'Recognising, understanding, and managing your own emotions and those of others',
      'Being more emotional than logical in decision-making',
      'Only hiring team members who are emotionally stable',
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
      'Strengths, Weaknesses, Opportunities, and Threats',
      'Staffing, Workload, Objectives, and Targets',
      'Strategy, Work, Operations, and Tactics',
    ],
    correctAnswer: 1,
    explanation:
      'SWOT stands for Strengths, Weaknesses, Opportunities, and Threats — a framework for analysing a situation from multiple perspectives.',
    category: 'Decision-Making & Problem-Solving',
    difficulty: 'basic' as const,
  },
  {
    id: 19,
    question: 'When motivating a team, the most sustainable approach is:',
    options: [
      'Financial bonuses for hitting targets',
      'Creating a sense of purpose, recognition, and opportunities for development',
      'Threatening consequences for poor performance',
      'Allowing the team to set their own targets with no oversight',
    ],
    correctAnswer: 1,
    explanation:
      'Intrinsic motivation (purpose, mastery, recognition, development) is more sustainable than extrinsic rewards or fear-based approaches.',
    category: 'Leading Your Team',
    difficulty: 'intermediate' as const,
  },
  {
    id: 20,
    question: 'When conducting an investigation into a workplace incident, the primary goal is:',
    options: [
      'To find someone to blame for what happened',
      'To identify root causes and prevent recurrence',
      'To complete the paperwork as quickly as possible',
      "To minimise the company's legal liability",
    ],
    correctAnswer: 1,
    explanation:
      'The primary goal of an incident investigation is to identify root causes and implement measures to prevent recurrence, not to assign blame.',
    category: 'Decision-Making & Problem-Solving',
    difficulty: 'basic' as const,
  },
];

export const getRandomLeadershipExamQuestions = (numQuestions: number = 20) => {
  return getRandomQuestionsBalanced(leadershipQuestionBank, numQuestions, leadershipCategories);
};
