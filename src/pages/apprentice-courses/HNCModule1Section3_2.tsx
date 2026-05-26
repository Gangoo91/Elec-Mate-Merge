/**
 * Module 1 · Section 3 · Subsection 2 — Safety Culture and Leadership
 * HNC Electrical Engineering for Building Services (Pearson U4001 + Building Services context)
 *   The human-factors layer that determines whether the SSOW survives contact with a busy
 *   site. Engineer-in-training perspective: how a junior HNC supervisor moves the needle on
 *   culture without the seniority to mandate it.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  ContentEyebrow,
  SectionRule,
  LearningOutcomes,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Safety Culture and Leadership - HNC Module 1 Section 3.2';
const DESCRIPTION =
  'Understand behavioural safety, visible leadership, worker engagement, and the indicators of a positive safety culture in building services organisations.';

const quickCheckQuestions = [
  {
    id: 'safety-culture-def',
    question: 'What best describes safety culture?',
    options: [
      'Prevent people entering dangerous areas during operation',
      'Weekly or fortnightly to prevent backlog',
      'Shared values, beliefs and behaviours regarding safety',
      'To reduce the drive current to dim the LED output',
    ],
    correctIndex: 2,
    explanation:
      "Safety culture is the shared values, attitudes, beliefs, and behaviours that characterise how safety is prioritised and managed within an organisation - 'the way we do things around here'.",
  },
  {
    id: 'visible-leadership',
    question: 'Which action best demonstrates visible safety leadership?',
    options: [
      'Final connection to vibrating equipment',
      'Disagreement with the foreman about break times',
      'Maximum power required at any given time',
      'Managers regularly walking the site discussing safety',
    ],
    correctIndex: 3,
    explanation:
      'Visible leadership means managers actively engaging with workers on safety matters - visiting sites, discussing hazards, listening to concerns, and demonstrating personal commitment to safe practices.',
  },
  {
    id: 'behavioural-safety',
    question: 'What is the primary focus of behavioural safety programmes?',
    options: [
      'Offline UPS only switches to battery when mains fails',
      'Thermal conductivity of surfaces',
      'Observing and modifying at-risk behaviours',
      'Remove it from service and report it immediately',
    ],
    correctIndex: 2,
    explanation:
      'Behavioural safety focuses on observing work practices, identifying at-risk behaviours, understanding why they occur, and working with employees to develop safer alternatives.',
  },
  {
    id: 'positive-indicator',
    question: 'Which is a positive indicator of good safety culture?',
    options: [
      'Write \\\\\\\\\\\\\\\'CPC not connected at socket outlet\\\\\\\\\\\\\\\'',
      'External earth fault loop impedance',
      'Workers voluntarily reporting near misses',
      '1 hour minimum, 3 hours typical',
    ],
    correctIndex: 2,
    explanation:
      'High voluntary near-miss reporting indicates a mature safety culture where workers feel comfortable reporting without fear, and understand the value of learning from near misses.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Who first used the term 'safety culture' in the context of organisational safety?",
    options: [
      'Adequate separation or protection from non-electrical services',
      'International Nuclear Safety Advisory Group (post-Chernobyl)',
      'A relevant event entitling extension of time',
      'Fast response time and high power capability',
    ],
    correctAnswer: 1,
    explanation:
      "The term 'safety culture' was coined by the International Nuclear Safety Advisory Group (INSAG) in their 1986 report on the Chernobyl disaster, identifying poor safety culture as a root cause.",
  },
  {
    id: 2,
    question: "What are the three levels of culture according to Schein's model?",
    options: [
      'Policies, behaviours, outcomes',
      'Rules, procedures, practices',
      'Artefacts, espoused values, basic assumptions',
      'Individual, team, organisation',
    ],
    correctAnswer: 2,
    explanation:
      "Schein's model identifies three levels: Artefacts (visible elements like PPE), Espoused Values (stated beliefs), and Basic Assumptions (unconscious, taken-for-granted beliefs that truly drive behaviour).",
  },
  {
    id: 3,
    question: "What characterises a 'generative' safety culture according to Westrum's typology?",
    options: [
      'Safety is primarily the responsibility of safety department',
      'Messengers are shot - safety issues hidden',
      'Safety information is tolerated but not acted upon',
      'Safety is actively sought out and embedded in everything',
    ],
    correctAnswer: 3,
    explanation:
      'A generative culture actively seeks safety information, rewards reporting, shares responsibility, and treats failures as opportunities to improve. Safety is integrated into all activities.',
  },
  {
    id: 4,
    question: 'Which behaviour is most indicative of effective safety leadership?',
    options: [
      'Balancing safety with production and never compromising on safety',
      'As informal, two-way discussions focused on understanding',
      'Distinguishing between honest errors and reckless behaviour',
      'Workers actively participating in identifying and solving safety issues',
    ],
    correctAnswer: 0,
    explanation:
      'Effective safety leaders demonstrate that safety is not negotiable, even when facing production pressures. They model safe behaviour, allocate resources, and personally engage with safety.',
  },
  {
    id: 5,
    question: "What is 'just culture' in safety management?",
    options: [
      'Safety is actively sought out and embedded in everything',
      'Distinguishing between honest errors and reckless behaviour',
      'Management commitment and leadership behaviour',
      'Workers actively participating in identifying and solving safety issues',
    ],
    correctAnswer: 1,
    explanation:
      'A just culture creates an atmosphere of trust where honest errors and near misses are reported without fear, while clearly distinguishing acceptable from unacceptable behaviour and holding people accountable for recklessness.',
  },
  {
    id: 6,
    question: 'How does behavioural safety complement traditional safety management?',
    options: [
      'It replaces all other safety measures',
      'It only applies to high-risk industries',
      'It focuses on human factors alongside engineering controls',
      'It removes the need for risk assessments',
    ],
    correctAnswer: 2,
    explanation:
      'Behavioural safety complements traditional approaches by addressing the human factors that contribute to incidents. It works alongside engineering controls, procedures, and PPE to create comprehensive protection.',
  },
  {
    id: 7,
    question: 'What is the purpose of safety observation programmes?',
    options: [
      'Artefacts, espoused values, basic assumptions',
      'Balancing safety with production and never compromising on safety',
      'Workers actively participating in identifying and solving safety issues',
      'To identify at-risk behaviours and reinforce safe practices',
    ],
    correctAnswer: 3,
    explanation:
      'Safety observation programmes aim to identify at-risk behaviours, understand their causes, reinforce safe practices, and engage workers in improving safety - not to catch people out for punishment.',
  },
  {
    id: 8,
    question: 'Which factor most strongly influences safety culture?',
    options: [
      'Management commitment and leadership behaviour',
      'Frequency of safety training courses',
      'Amount spent on safety equipment',
      'Number of safety procedures',
    ],
    correctAnswer: 0,
    explanation:
      'Management commitment, demonstrated through visible leadership behaviour, resource allocation, and personal involvement, is the strongest influence on safety culture. Workers follow what leaders do, not just what they say.',
  },
  {
    id: 9,
    question: 'What is worker engagement in the context of safety culture?',
    options: [
      'Balancing safety with production and never compromising on safety',
      'Workers actively participating in identifying and solving safety issues',
      'To identify at-risk behaviours and reinforce safe practices',
      'It focuses on human factors alongside engineering controls',
    ],
    correctAnswer: 1,
    explanation:
      'True engagement means workers are actively involved in safety decisions, contribute ideas, report concerns, participate in risk assessments, and feel ownership of safety outcomes.',
  },
  {
    id: 10,
    question: 'Which metric is a lagging indicator of safety performance?',
    options: [
      'Number of safety observations conducted',
      'Percentage of safety training completed',
      'Lost time injury frequency rate',
      'Number of hazards reported and closed out',
    ],
    correctAnswer: 2,
    explanation:
      'Lost time injury frequency rate is a lagging indicator - it measures past failures. Leading indicators (observations, training, hazard reporting) predict future performance and allow proactive intervention.',
  },
  {
    id: 11,
    question: 'How should safety conversations be conducted for maximum effectiveness?',
    options: [
      'Balancing safety with production and never compromising on safety',
      'Focus on individual fault rather than system failures',
      'Artefacts, espoused values, basic assumptions',
      'As informal, two-way discussions focused on understanding',
    ],
    correctAnswer: 3,
    explanation:
      'Effective safety conversations are informal, two-way discussions that focus on understanding why people work the way they do, exploring barriers to safe work, and collaboratively finding solutions.',
  },
  {
    id: 12,
    question: "What characterises a 'blame culture' in safety management?",
    options: [
      'Focus on individual fault rather than system failures',
      'Balancing safety with production and never compromising on safety',
      'As informal, two-way discussions focused on understanding',
      'Management commitment and leadership behaviour',
    ],
    correctAnswer: 0,
    explanation:
      'A blame culture focuses on finding and punishing individuals when things go wrong, rather than understanding systemic factors. This discourages reporting and prevents learning from incidents.',
  },
];

const faqs = [
  {
    question: 'How long does it take to change safety culture?',
    answer:
      "Culture change typically takes 3-5 years of sustained effort. It requires consistent leadership behaviour, clear communication, systematic changes to processes, and continuous reinforcement. Quick fixes don't work - culture is deeply embedded in 'how we do things here'.",
  },
  {
    question: 'Can small contractors have a positive safety culture?',
    answer:
      'Absolutely. Small firms often have advantages: closer relationships, clearer communication, and more direct leadership influence. The key elements - management commitment, worker involvement, learning from incidents - apply regardless of size.',
  },
  {
    question: 'How do you measure safety culture?',
    answer:
      'Safety culture can be measured through perception surveys, behavioural observations, analysis of reporting rates (especially near misses), review of safety meeting quality, assessment of management actions, and external audits. Multiple measures give the best picture.',
  },
  {
    question: "What's the difference between safety culture and safety climate?",
    answer:
      'Safety climate is the surface manifestation of culture - what people perceive about safety at a point in time. Safety culture is the deeper, underlying values and assumptions. Climate can change relatively quickly; culture changes slowly and influences climate.',
  },
  {
    question: 'How do subcontractors fit into safety culture?',
    answer:
      'Principal contractors should select subcontractors partly based on safety culture alignment, include cultural expectations in contracts, provide thorough inductions that explain expected behaviours, and actively involve subcontractors in safety initiatives and consultation.',
  },
  {
    question: 'Why do workers sometimes not follow safe procedures they know about?',
    answer:
      "Common reasons include time pressure, inadequate equipment, procedures that don't match reality, peer pressure, lack of supervision, normalised deviance (everyone does it), and not understanding the risk. Behavioural safety explores these factors rather than assuming workers are careless.",
  },
];

const HNCModule1Section3_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('../h-n-c-module1-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 1.3.2"
            title="Safety Culture and Leadership"
            description="Understanding the human factors that shape safety performance in organisations"
            tone="purple"
          />

          <TLDR
            points={[
              'You will recognise safety culture as &ldquo;what people do when no one is watching&rdquo; — the operational reality the SSOW depends on.',
              'You can place a workforce on the HSE culture maturity ladder (pathological → reactive → calculative → proactive → generative) and identify the moves that step it up.',
              'You apply visible felt leadership (VFL) — the senior officer is seen on the floor, listens to operatives, acts on what they hear.',
              'You separate just culture from blame culture — operatives report near-misses without fear, but reckless violations are still actionable.',
            ]}
          />

          <RegsCallout
            source="HASAWA 1974 — Section 2(6)"
            clause="It shall be the duty of every employer to consult any such representatives [safety representatives] with a view to the making and maintenance of arrangements which will enable him and his employees to co-operate effectively in promoting and developing measures to ensure the health and safety at work of the employees, and in checking the effectiveness of such measures."
            meaning={
              <>
                Section 2(6) makes worker consultation a statutory duty. Culture is built on
                the assumption that operatives can speak honestly without retaliation — and the
                law underwrites that assumption.
              </>
            }
            cite="Source: Health and Safety at Work etc. Act 1974, s.2(6) — legislation.gov.uk"
          />

          <LearningOutcomes
            outcomes={[
              "Define safety culture and explain its importance to safety performance",
              "Describe the characteristics of positive and negative safety cultures",
              "Explain the role of leadership in shaping and maintaining safety culture",
              "Understand behavioural safety principles and observation techniques",
              "Identify methods for engaging workers in safety improvement",
              "Recognise leading and lagging indicators of safety culture",
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ContentEyebrow>Understanding Safety Culture</ContentEyebrow>

          <ConceptBlock title="Understanding Safety Culture">
            <p>
            Safety culture describes the shared attitudes, values, beliefs and behaviours relating
            to health and safety within an organisation. It's often described as "the way we do
            things around here" when no one is watching.
            </p>

            
            <p className="text-sm font-medium text-white mb-2">
            Key components of safety culture:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Values:</strong> What the organisation truly prioritises (not just what it
            says)
            </li>
            <li>
            <strong>Beliefs:</strong> Assumptions about risk, control, and responsibility
            </li>
            <li>
            <strong>Behaviours:</strong> How people actually act day-to-day
            </li>
            <li>
            <strong>Norms:</strong> Unwritten rules about acceptable conduct
            </li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Westrum's Culture Typology
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Pathological</strong> — Characteristics: Power-oriented, low cooperation. Response to Safety Info: Messengers are "shot"</li>
            <li><strong>Bureaucratic</strong> — Characteristics: Rule-oriented, modest cooperation. Response to Safety Info: Messengers are tolerated</li>
            <li><strong>Generative</strong> — Characteristics: Performance-oriented, high cooperation. Response to Safety Info: Messengers are trained and rewarded</li>
            </ul>
            
            

            <p className="text-sm text-elec-yellow/70">
            <strong>HSE research:</strong> Organisations with positive safety cultures have
            significantly fewer accidents than those with poor cultures, even when using similar
            equipment and procedures.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Safety Leadership</ContentEyebrow>

          <ConceptBlock title="Safety Leadership">
            <p>
            Leadership is the single most influential factor in shaping safety culture. What
            leaders pay attention to, measure, and reward signals to everyone what really matters.
            Actions speak louder than policies.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Visible Leadership Behaviours
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Regular site visits and safety conversations</strong> — Impact: Demonstrates personal commitment and interest</li>
            <li><strong>Always wearing correct PPE on site</strong> — Impact: Models expected behaviour - "walk the talk"</li>
            <li><strong>Stopping unsafe work immediately</strong> — Impact: Shows safety is not negotiable for production</li>
            <li><strong>Allocating resources for safety</strong> — Impact: Proves commitment beyond words</li>
            <li><strong>Recognising and rewarding safe behaviour</strong> — Impact: Reinforces what is valued</li>
            <li><strong>Acting on safety suggestions and concerns</strong> — Impact: Builds trust and encourages reporting</li>
            </ul>
            
            

            
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">Leadership Don'ts</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Walking past hazards without acting</li>
            <li>Prioritising production over safety</li>
            <li>Blaming individuals without system review</li>
            <li>Ignoring safety suggestions</li>
            <li>"Do as I say, not as I do" behaviour</li>
            </ul>
            </div>
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Just Culture Principles
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Honest errors are learning opportunities</li>
            <li>At-risk behaviour needs coaching</li>
            <li>Reckless behaviour requires accountability</li>
            <li>System failures are addressed systemically</li>
            <li>Trust is built through consistent fairness</li>
            </ul>
            </div>
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Key insight:</strong> Workers observe what leaders do under pressure. If
            deadlines lead to safety shortcuts, the message is clear regardless of what the policy
            says.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Behavioural Safety</ContentEyebrow>

          <ConceptBlock title="Behavioural Safety">
            <p>
            Behavioural safety recognises that human behaviour is the final link in most accident
            chains. By observing work practices, understanding why people act as they do, and
            positively reinforcing safe behaviours, we can reduce at-risk acts.
            </p>

            
            <p className="text-sm font-medium text-white mb-2">The ABC Model of Behaviour:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Antecedents:</strong> Factors that trigger behaviour (training,
            procedures, equipment)
            </li>
            <li>
            <strong>Behaviour:</strong> The observable actions of the worker
            </li>
            <li>
            <strong>Consequences:</strong> What happens after the behaviour (positive or
            negative reinforcement)
            </li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Safety Observation Process
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>1. Observe</strong> — Activity: Watch work activity without interrupting. Purpose: See how work is actually done</li>
            <li><strong>2. Record</strong> — Activity: Note safe and at-risk behaviours. Purpose: Gather data for analysis</li>
            <li><strong>3. Engage</strong> — Activity: Have a conversation with the worker. Purpose: Understand the 'why'</li>
            <li><strong>4. Reinforce</strong> — Activity: Recognise safe practices observed. Purpose: Encourage continuation</li>
            <li><strong>5. Analyse</strong> — Activity: Review trends and patterns. Purpose: Identify systemic issues</li>
            <li><strong>6. Act</strong> — Activity: Address root causes identified. Purpose: Make lasting improvements</li>
            </ul>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Common At-Risk Behaviours in Building Services
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Not isolating before working on circuits</li>
            <li>Working from ladders instead of proper platforms</li>
            <li>PPE not worn or worn incorrectly</li>
            </ul>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Taking shortcuts on permit procedures</li>
            <li>Poor manual handling techniques</li>
            <li>Rushing to meet deadlines</li>
            </ul>
            
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Important:</strong> Behavioural safety is not about blame. It's about
            understanding why people take risks (often due to system failures) and making safe
            behaviour easier.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Worker Engagement and Culture Indicators</ContentEyebrow>

          <ConceptBlock title="Worker Engagement and Culture Indicators">
            <p>
            A positive safety culture requires genuine worker engagement - not just compliance,
            but active participation in identifying hazards, developing solutions, and taking
            ownership of safety outcomes.
            </p>

            
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">Engagement Methods</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Safety committees with worker representation</li>
            <li>Involvement in risk assessment development</li>
            <li>Safety suggestion schemes with feedback</li>
            <li>Peer-to-peer safety observation</li>
            <li>Safety improvement teams</li>
            <li>Regular safety conversations</li>
            </ul>
            </div>
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Barriers to Engagement
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Fear of blame or punishment</li>
            <li>Suggestions ignored in the past</li>
            <li>Time pressure and workload</li>
            <li>Poor relationship with supervisor</li>
            <li>Language and communication barriers</li>
            <li>"That's not my job" attitude</li>
            </ul>
            </div>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Positive Safety Culture Indicators
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>High near-miss reporting rate</strong> — Lagging Indicators: Accident frequency rates</li>
            <li><strong>Safety training completion rates</strong> — Lagging Indicators: Days lost to injury</li>
            <li><strong>Safety observation frequency</strong> — Lagging Indicators: Workers' compensation costs</li>
            <li><strong>Hazard reporting and close-out rates</strong> — Lagging Indicators: Enforcement notices received</li>
            <li><strong>Safety meeting attendance/quality</strong> — Lagging Indicators: Civil claims and costs</li>
            </ul>
            
            

            <p className="text-sm text-white italic">
            <strong>Mature culture sign:</strong> Workers stop their own unsafe acts and those of
            colleagues - not because of rules, but because they genuinely care about everyone
            going home safely.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Practical Application">
            <p><strong>Example 1: Improving Near-Miss Reporting</strong></p>
            <p className="text-sm text-white mb-2">
            <strong>Problem:</strong> An electrical contractor has very few near-miss reports
            despite many minor incidents.
            </p>
            <div className="bg-black/30 p-3 rounded text-sm text-white">
            <p>
            <strong>Analysis:</strong> Workers fear blame; previous reports led to
            investigations focused on finding fault.
            </p>
            <p className="mt-2">
            <strong>Culture Change Actions:</strong>
            </p>
            <p className="ml-4">1. MD commits publicly to learning not blaming</p>
            <p className="ml-4">2. Anonymous reporting option introduced</p>
            <p className="ml-4">3. Weekly recognition of reporters (not named, but thanked)</p>
            <p className="ml-4">4. Visible action taken on reported hazards</p>
            <p className="ml-4">5. Supervisors trained in supportive responses</p>
            <p className="mt-2 text-green-400">
            Result: Reporting increased 400% within 6 months, enabling proactive hazard
            control
            </p>
            </div>
            

            
            <p><strong>Example 2: Leadership Safety Walks</strong></p>
            <p className="text-sm text-white mb-2">
            <strong>Objective:</strong> Demonstrate visible leadership commitment across
            multiple sites.
            </p>
            <div className="bg-black/30 p-3 rounded text-sm text-white">
            <p>
            <strong>Programme Structure:</strong>
            </p>
            <p className="ml-4">- Directors visit each site quarterly minimum</p>
            <p className="ml-4">- Structured walk covering all work areas</p>
            <p className="ml-4">- Informal conversations with workers at the face</p>
            <p className="ml-4">- PPE worn correctly throughout visit</p>
            <p className="ml-4">- Actions logged and followed up within 7 days</p>
            <p className="mt-2">
            <strong>Conversation Topics:</strong>
            </p>
            <p className="ml-4">- "What's the biggest safety challenge here?"</p>
            <p className="ml-4">- "What would make your job safer?"</p>
            <p className="ml-4">- "Have you reported any near misses recently?"</p>
            <p className="mt-2 text-elec-yellow/70">
            Key: Listen more than talk; act on feedback
            </p>
            </div>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Key Points Summary">
            <div>
            <p><strong>Culture Change Essentials</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            Culture change starts at the top - leadership must model desired behaviours
            </li>
            <li>
            Actions speak louder than words - what you do under pressure matters most
            </li>
            <li>
            Build trust through consistent, fair responses to safety issues
            </li>
            <li>Engage workers as partners, not just rule-followers</li>
            <li>Focus on learning from incidents, not blaming individuals</li>
            </ul>
            </div>

            <div>
            <p><strong>Behavioural Safety Principles</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Observe to understand, not to catch people out</li>
            <li>Focus on behaviours that can be observed and changed</li>
            <li>Positive reinforcement is more effective than punishment</li>
            <li>Look for system causes of at-risk behaviour</li>
            <li>Involve workers in developing solutions</li>
            </ul>
            </div>

            <div>
            <p><strong>Warning Signs of Poor Culture</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Low reporting:</strong> Few near misses or hazards reported
            </li>
            <li>
            <strong>Blame focus:</strong> Investigations look for someone at fault
            </li>
            <li>
            <strong>Disconnect:</strong> Procedures don't match how work is done
            </li>
            <li>
            <strong>Silence:</strong> Workers don't raise safety concerns
            </li>
            <li>
            <strong>Normalised risk:</strong> "We've always done it this way"
            </li>
            </ul>
            </div>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="Near-miss reporting falls off after a director&rsquo;s comment"
            situation={
              <>
                Your firm&rsquo;s near-miss reporting drops 80% over two months. You discover
                a director told the team &ldquo;we&rsquo;ve got too many of these — sort it out
                on the floor.&rdquo; Reports stopped, but the underlying near-misses did not.
              </>
            }
            whatToDo={
              <>
                Take the data to the SHE meeting. Restate just-culture principles — every
                report welcomed, no retribution for honest mistakes, learning shared. Brief
                the director privately on the consequence of the comment. Reset the
                reporting baseline by relaunching with visible felt leadership: the MD on
                site, in person, thanking operatives who report. Track the metric monthly.
              </>
            }
            whyItMatters={
              <>
                Suppressed near-miss data masks rising risk. The HSE will trace any incident
                back to leading indicators — and an unexplained drop in reporting is itself a
                red flag.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Safety culture is &ldquo;the way we do things around here&rdquo; — what people do without supervision.',
              'HSE maturity ladder: pathological → reactive → calculative → proactive → generative.',
              'Visible felt leadership (VFL): senior staff seen on the floor, listening, acting on what they hear.',
              'Just culture distinguishes honest error (learn) from negligent action (coach) from reckless violation (discipline).',
              'HSWA s.2(6) consultation is the statutory underpinning of culture — workers must be heard.',
              'Leading indicators (near-miss rate, training completion, audit closeout) predict; lagging indicators (LTIs, prosecutions) confirm.',
              'Climate surveys and culture audits (HSE&rsquo;s Safety Climate Tool) make perception measurable.',
              'Cultural change is slow — measured in years, not quarters — and any reversal is fast.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('../h-n-c-module1-section3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 3
              </div>
            </button>
            <button
              onClick={() => navigate('../h-n-c-module1-section3-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Permit to Work Systems
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule1Section3_2;
