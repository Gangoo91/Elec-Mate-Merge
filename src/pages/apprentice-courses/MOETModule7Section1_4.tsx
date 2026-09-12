/**
 * MOET · Module 7 · Section 1 · Subsection 4 — Identifying Knowledge Gaps
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. This section of Module 7 covers technique for the
 * End-Point Assessment knowledge test rather than a specific piece of
 * engineering knowledge, so no ST1426 knowledge/skill/behaviour statement is
 * quoted here — none of the verified KSB statements checked for this
 * conversion describe exam or assessment-preparation technique.
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt. Two InlineCheck
 * placements (quickCheckQuestions[2] after section 2, [1] after section 3)
 * are kept exactly where the original placed them, even though [2] reads as
 * more closely tied to section 1's traffic-light content — not reordered.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Identifying Knowledge Gaps - MOET Module 7 Section 1.4';
const DESCRIPTION =
  'Self-assessment techniques for identifying knowledge gaps, tracking scores by topic, focused revision strategies and creating effective study plans for EPA preparation.';

const quickCheckQuestions = [
  {
    id: 'self-assessment',
    question: 'What is the most reliable method for identifying knowledge gaps before the EPA?',
    options: [
      'Analysing your scores by topic across multiple practice tests to find consistent weak areas',
      'Re-reading every module from start to finish until you feel confident overall',
      'Asking other apprentices which topics they personally found the hardest',
      'Focusing on the topics you already enjoy because you will revise them more willingly',
    ],
    correctIndex: 0,
    explanation:
      'Systematic analysis of practice test results by topic area is the most reliable gap identification method. It uses objective data from your own performance to pinpoint exactly where your knowledge is weakest, allowing targeted and efficient revision.',
  },
  {
    id: 'study-plan',
    question: 'A good study plan should prioritise:',
    options: [
      'Equal time on every topic, regardless of how well you currently score on each',
      'Only the topics with the heaviest EPA weighting, ignoring everything else',
      'Weak areas identified through practice test analysis, while maintaining revision of strong areas',
      'The topics you can revise fastest, so you can tick off more of the syllabus each day',
    ],
    correctIndex: 2,
    explanation:
      'An effective study plan allocates the most time to your weakest areas while still including periodic review of strong areas to maintain knowledge. This targeted approach gives you the greatest improvement for the time invested.',
  },
  {
    id: 'knowledge-rating',
    question:
      "When self-assessing your knowledge using a confidence rating system, what does a rating of 'amber' typically indicate?",
    options: [
      'You are fully confident and consistently score highly on this topic under exam conditions',
      'You have a significant gap and would struggle to answer even basic questions on the topic',
      'The topic does not appear in the EPA and so does not need any revision',
      'You have some understanding but are not confident you could answer exam questions reliably',
    ],
    correctIndex: 3,
    explanation:
      'An amber rating in a traffic-light self-assessment indicates partial knowledge — you understand some aspects but have gaps or uncertainty that could lead to wrong answers under exam conditions. Amber topics need focused revision to move them to green.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The first step in identifying knowledge gaps is to:',
    options: [
      'Book your EPA date so you have a firm deadline to work towards',
      'Complete a diagnostic assessment covering all module areas to establish a baseline',
      'Start revising the topic you feel least confident about straight away',
      'Re-read the whole syllabus once before attempting any practice questions',
    ],
    correctAnswer: 1,
    explanation:
      'A diagnostic assessment across all topics provides an objective baseline of your current knowledge. This data-driven approach ensures you identify all gaps, not just the ones you are aware of. Without a baseline, you are guessing at your weaknesses.',
  },
  {
    id: 2,
    question: 'A traffic-light self-assessment system uses which categories?',
    options: [
      'Pass, merit, distinction (graded by overall percentage)',
      'Beginner, intermediate, advanced (graded by experience level)',
      'Green (confident), amber (partial), red (significant gap)',
      'Low, medium, high (graded by EPA weighting of the topic)',
    ],
    correctAnswer: 2,
    explanation:
      'The traffic-light system provides a quick visual assessment: green means confident and consistent, amber means partial understanding with some gaps, and red means significant gap requiring substantial study. It helps prioritise revision time efficiently.',
  },
  {
    id: 3,
    question: 'When tracking scores by topic, you should record data from:',
    options: [
      'Only your most recent test, since older results are no longer relevant',
      'Only the tests where you scored above the pass mark',
      'Only your very first diagnostic test, as your true baseline',
      'Multiple tests over time to identify consistent patterns',
    ],
    correctAnswer: 3,
    explanation:
      'Multiple data points show consistent patterns. A single bad score on a topic might be a one-off, but consistently low scores confirm a genuine gap. Tracking over time also shows whether your targeted revision is working.',
  },
  {
    id: 4,
    question:
      'Which approach to revision is most effective for addressing identified knowledge gaps?',
    options: [
      'Focused study of the specific topics identified as weak, combined with practice questions on those topics',
      'Re-reading every module evenly so no topic is neglected before the EPA',
      'Doing large numbers of practice questions without first studying the underlying content',
      'Memorising the answers to past practice questions in case they recur',
    ],
    correctAnswer: 0,
    explanation:
      'Focused study on identified weak topics, followed by practice questions to test your improved understanding, is the most efficient approach. Re-reading everything wastes time on topics you already know, and practice without study does not fill the knowledge gap.',
  },
  {
    id: 5,
    question:
      "A knowledge gap in 'safe isolation procedures' would indicate you need to revise content from which MOET module?",
    options: [
      'Module 2 — Electrical Science',
      'Module 1 — Health and Safety',
      'Module 6 — Technical Documentation',
      'Module 5 — Maintenance Strategies',
    ],
    correctAnswer: 1,
    explanation:
      'Safe isolation procedures are covered in Module 1 (Health and Safety), specifically in the sections on safe working practices, GS38 compliance, and the Electricity at Work Regulations. Cross-referencing gaps to specific module sections ensures efficient targeted revision.',
  },
  {
    id: 6,
    question:
      'What is the recommended balance of revision time between weak and strong topic areas?',
    options: [
      '100% on weak areas, ignore strong areas completely',
      'Equal time on all areas regardless of performance',
      'Approximately 70% on weak areas, 30% on maintaining strong areas',
      '100% on strong areas to maximise confidence',
    ],
    correctAnswer: 2,
    explanation:
      'Allocating roughly 70% of revision time to weak areas maximises improvement while the remaining 30% ensures strong areas do not deteriorate through neglect. This balance gives the best return on your study investment.',
  },
  {
    id: 7,
    question: 'A study plan should include which of the following elements?',
    options: [
      'Only a list of the topics you intend to cover, with no fixed timings',
      'Only the date of your final mock exam and nothing else',
      'Only the resources you will use, leaving the schedule to fit around work',
      'Topics, time allocation, resources, practice test dates, and progress review points',
    ],
    correctAnswer: 3,
    explanation:
      'An effective study plan includes what to study (topics), when to study (schedule with time allocations), how to study (resources and methods), when to test (practice test schedule), and when to review progress (checkpoints to adjust the plan).',
  },
  {
    id: 8,
    question:
      'If your practice test analysis shows you consistently score well on health and safety but poorly on electrical science, you should:',
    options: [
      'Increase the proportion of study time allocated to electrical science while maintaining periodic H&S review',
      'Keep splitting your time equally between the two topics regardless of the scores',
      'Stop revising electrical science, since it is clearly your weakest subject',
      'Spend more time on health and safety to push that strong score even higher',
    ],
    correctAnswer: 0,
    explanation:
      'Increase focus on electrical science to address the gap, but maintain periodic health and safety review to keep that knowledge fresh. Completely abandoning a strong area risks it becoming a weak area by exam day.',
  },
  {
    id: 9,
    question: 'The MOET course modules can be used for targeted review by:',
    options: [
      'Working through every module in order, whether or not the topic is a weak area',
      'Identifying the specific sections that correspond to your weak topics and studying those sections in depth',
      'Reading only the section summaries, since the detail is rarely tested',
      'Skipping the modules entirely and relying on workplace experience alone',
    ],
    correctAnswer: 1,
    explanation:
      'The MOET modules are structured by topic area, making them ideal for targeted revision. When your practice test analysis identifies a weak topic, go directly to the relevant module section and study it thoroughly, then test yourself on that topic.',
  },
  {
    id: 10,
    question: 'How often should you reassess your knowledge gaps during EPA preparation?',
    options: [
      'Once at the very start, then not again until the day before the EPA',
      'Only when your overall score drops below the pass mark',
      'After every practice test, with a formal review every 2-3 weeks',
      'Only if your tutor specifically asks you to review your progress',
    ],
    correctAnswer: 2,
    explanation:
      'Regular reassessment ensures your study plan remains targeted and effective. After each practice test, note any changes in performance by topic. Every 2-3 weeks, formally review your progress and adjust your study plan to reflect current strengths and weaknesses.',
  },
];

const faqs = [
  {
    question: 'What if I have gaps in almost every topic?',
    answer:
      'This is common early in your preparation and should not be discouraging. Start with a diagnostic test to identify the most critical gaps, then prioritise the topics with the highest EPA weighting (typically health and safety, and installations/maintenance). Work through one topic at a time, study the content, practise questions, and move to the next. Consistent daily study will close gaps faster than you expect.',
  },
  {
    question: 'How do I create a study plan when I have limited time?',
    answer:
      'With limited time, ruthless prioritisation is essential. Focus on the topics with the highest EPA weighting where you score lowest — these give the biggest score improvement for the time invested. Use the 70/30 split: 70% on weak high-weighting topics, 30% on everything else. Even 30 minutes of focused daily study is more effective than occasional long sessions.',
  },
  {
    question: 'Should I study alone or with other apprentices?',
    answer:
      "Both approaches have value. Individual study allows you to focus on your specific gaps. Group study helps with motivation, allows you to learn from peers' explanations, and practising teaching topics to others deepens your own understanding. A combination — individual study for gap-filling, group sessions for discussion and mutual testing — is ideal.",
  },
  {
    question: 'What resources should I use besides the MOET modules?',
    answer:
      'The MOET modules should be your primary resource as they are aligned with ST1426. Supplement with: BS 7671 (the actual standard — get comfortable navigating it), IET Guidance Notes, HSE publications (HSG85, GS38), manufacturer technical data, and your own workplace experience. Always cross-reference supplementary resources back to the MOET content to ensure alignment.',
  },
  {
    question: 'How do I know when a knowledge gap has been closed?',
    answer:
      'A gap is considered closed when you can: (1) consistently answer practice questions on that topic correctly, (2) explain the concepts in your own words, (3) apply the knowledge to scenario-based questions, and (4) answer questions on the topic under timed conditions. One correct answer is not enough — you need consistent correct performance across multiple questions and practice sessions.',
  },
];

const MOETModule7Section1_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 7 · Section 7.1 · Subsection 4"
        title="Identifying Knowledge Gaps"
        backTo="/study-centre/apprentice/m-o-e-t-module7-section1"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Systematic self-assessment and targeted revision planning for efficient EPA preparation.
          </p>

          <TLDR
            points={[
              'Diagnose: use practice tests to identify weak topics.',
              'Rate: traffic-light system — green, amber, red.',
              'Plan: 70% weak areas, 30% maintaining strong areas.',
              'Review: reassess every 2-3 weeks and adjust.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply self-assessment techniques to identify your specific knowledge gaps',
              'Use practice test data to track scores by topic area over time',
              'Create a traffic-light confidence rating for each module area',
              'Develop focused revision plans that prioritise weak areas efficiently',
              'Map knowledge gaps to specific MOET module sections for targeted study',
              'Establish regular reassessment checkpoints to measure progress',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>High weighting:</strong> H&amp;S and installations — prioritise gaps here.
              </li>
              <li>
                <strong>Cross-reference:</strong> map gaps to specific MOET module sections.
              </li>
              <li>
                <strong>Workplace:</strong> use job experience to reinforce study.
              </li>
              <li>
                <strong>ST1426:</strong> gaps map directly to KSB requirements.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Self-assessment techniques</ContentEyebrow>

          <ConceptBlock title="Self-assessment techniques">
            <p>
              Effective EPA preparation starts with honest self-assessment. You need to know where
              you stand before you can plan where to go. Self-assessment is not about judging
              yourself harshly — it is about gathering the data you need to study efficiently.
              Without it, you risk spending hours on topics you already know while neglecting areas
              that need attention.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Self-assessment methods">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Diagnostic test:</strong> complete a practice test covering all modules
                without preparation — this reveals your true baseline.
              </li>
              <li>
                <strong>Topic checklist review:</strong> go through the ST1426 standard topic by
                topic and honestly rate your confidence.
              </li>
              <li>
                <strong>Teaching test:</strong> try to explain key concepts from each module to
                someone else — gaps become obvious.
              </li>
              <li>
                <strong>Flashcard sort:</strong> create flashcards for key concepts and sort them
                into &quot;know well&quot;, &quot;unsure&quot;, and &quot;don&apos;t know&quot;.
              </li>
              <li>
                <strong>Workplace reflection:</strong> consider which tasks at work you feel
                confident with and which you still find challenging.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Traffic-light confidence rating">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Rating</th>
                    <th className="py-2 pr-4 font-medium text-white">Meaning</th>
                    <th className="py-2 font-medium text-white">Action required</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium text-green-400">Green</td>
                    <td className="py-2 pr-4">Confident — consistently score 80%+ on this topic</td>
                    <td className="py-2">Periodic review to maintain knowledge</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium text-yellow-400">Amber</td>
                    <td className="py-2 pr-4">
                      Partial — some understanding but inconsistent 50-80%
                    </td>
                    <td className="py-2">Focused study on specific sub-topics</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium text-red-400">Red</td>
                    <td className="py-2 pr-4">Significant gap — scoring below 50%</td>
                    <td className="py-2">In-depth study from module content + practice</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>Key point:</strong> honesty is essential. Overrating your knowledge wastes
              time and leads to surprises in the real exam. Underrating is less harmful but may
              cause unnecessary anxiety. Let the data from practice tests guide your ratings
              objectively.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Tracking scores by topic</ContentEyebrow>

          <ConceptBlock title="Tracking scores by topic">
            <p>
              Raw test scores are useful but limited. A score of 65% tells you that you passed the
              practice test but nothing about which topics need attention. Breaking your score down
              by topic transforms a single number into an actionable revision map. This is the most
              powerful diagnostic tool in your preparation.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Topic tracking template">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Topic area</th>
                    <th className="py-2 pr-4 font-medium text-white">Test 1</th>
                    <th className="py-2 pr-4 font-medium text-white">Test 2</th>
                    <th className="py-2 pr-4 font-medium text-white">Test 3</th>
                    <th className="py-2 font-medium text-white">Trend</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Health &amp; Safety</td>
                    <td className="py-2 pr-4">7/8</td>
                    <td className="py-2 pr-4">8/10</td>
                    <td className="py-2 pr-4">9/10</td>
                    <td className="py-2 text-green-400">Improving</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Electrical Science</td>
                    <td className="py-2 pr-4">4/7</td>
                    <td className="py-2 pr-4">3/6</td>
                    <td className="py-2 pr-4">5/8</td>
                    <td className="py-2 text-yellow-400">Fluctuating</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Motor Control</td>
                    <td className="py-2 pr-4">2/6</td>
                    <td className="py-2 pr-4">2/5</td>
                    <td className="py-2 pr-4">3/6</td>
                    <td className="py-2 text-red-400">Needs attention</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>Key point:</strong> three or more data points per topic are needed to identify
              reliable patterns. One low score might be a bad day; consistent low scores indicate a
              genuine gap.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Creating effective study plans</ContentEyebrow>

          <ConceptBlock title="Creating effective study plans">
            <p>
              A study plan turns diagnostic information into action. Without a plan, good intentions
              often lead to unfocused studying — reading a bit of everything without making
              meaningful progress on your weakest areas. A structured plan ensures every hour of
              study time counts.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Study plan components">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>EPA date:</strong> work backwards from your target EPA date to set
                deadlines.
              </li>
              <li>
                <strong>Priority topics:</strong> list your red and amber topics in order of EPA
                weighting.
              </li>
              <li>
                <strong>Weekly schedule:</strong> allocate specific days/times for specific topics.
              </li>
              <li>
                <strong>Resources:</strong> identify which MOET module sections and supporting
                materials you will use.
              </li>
              <li>
                <strong>Practice test schedule:</strong> plan one mock test per week in the final
                month.
              </li>
              <li>
                <strong>Review checkpoints:</strong> schedule fortnightly reviews to assess progress
                and adjust.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Sample 4-week study plan structure">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Week 1:</strong> focus on highest-priority red topic; diagnostic test at end
                of week.
              </li>
              <li>
                <strong>Week 2:</strong> focus on second red topic + review week 1 topic; practice
                questions on both.
              </li>
              <li>
                <strong>Week 3:</strong> address amber topics; full mock test; review and adjust
                plan.
              </li>
              <li>
                <strong>Week 4:</strong> mixed revision all topics; final mock test; light review of
                key facts.
              </li>
            </ul>
            <p>
              <strong>Key point:</strong> a study plan is a living document. Review it regularly and
              adjust based on your progress. If a topic moves from red to green faster than
              expected, reallocate that time to another weak area.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Using MOET modules for targeted review</ContentEyebrow>

          <ConceptBlock title="Using MOET modules for targeted review">
            <p>
              The MOET course modules are structured to align with the ST1426 apprenticeship
              standard, making them the ideal resource for targeted gap-filling. When your practice
              test analysis identifies a weak area, you can go directly to the relevant module
              section and study the content in depth.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Gap-to-module mapping">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Knowledge gap</th>
                    <th className="py-2 pr-4 font-medium text-white">MOET module</th>
                    <th className="py-2 font-medium text-white">Key sections</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Safe isolation, PTW, LOTO</td>
                    <td className="py-2 pr-4">Module 1</td>
                    <td className="py-2">Sections 1.1-1.3</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Ohm&apos;s law, power, AC theory</td>
                    <td className="py-2 pr-4">Module 2</td>
                    <td className="py-2">Sections 2.1-2.5</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">BS 7671, testing, fault finding</td>
                    <td className="py-2 pr-4">Module 3</td>
                    <td className="py-2">Sections 3.1-3.6</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Motor starters, VSD, PLC</td>
                    <td className="py-2 pr-4">Module 4</td>
                    <td className="py-2">Sections 4.1-4.7</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">PPM, CBM, CMMS, KPIs</td>
                    <td className="py-2 pr-4">Module 5</td>
                    <td className="py-2">Sections 5.1-5.6</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Drawings, schematics, data</td>
                    <td className="py-2 pr-4">Module 6</td>
                    <td className="py-2">Sections 6.1-6.4</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock
            title="Effective targeted review process"
            onSite="The ability to identify your own development needs and take action to address them is itself a professional behaviour assessed in the EPA. Your study plan demonstrates initiative and commitment to continuous improvement."
          >
            <ol className="list-decimal space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Identify the gap:</strong> use practice test data to pinpoint the specific
                topic.
              </li>
              <li>
                <strong>Locate the content:</strong> find the relevant MOET module section.
              </li>
              <li>
                <strong>Study actively:</strong> read, take notes, and connect to your workplace
                experience.
              </li>
              <li>
                <strong>Test yourself:</strong> use the section&apos;s InlineCheck questions and
                end-of-section quiz.
              </li>
              <li>
                <strong>Practice questions:</strong> attempt practice questions specifically on that
                topic.
              </li>
              <li>
                <strong>Verify closure:</strong> if you consistently answer correctly, move on to
                the next gap.
              </li>
            </ol>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'Honesty in self-rating is essential — let practice test data guide your ratings, not gut feeling.',
              'Three or more data points per topic are needed before you can trust a pattern.',
              'A study plan is a living document — review it regularly and reallocate time as gaps close.',
              'Roughly 70% of revision time on weak areas, 30% maintaining strong ones, gives the best return.',
              'Identifying your own development needs and acting on them is itself assessed as a professional behaviour in the EPA.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz
              title="Test Your Knowledge — Identifying Knowledge Gaps"
              questions={quizQuestions}
            />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module7-section1-3')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Feedback and Explanations
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module7-section1-5')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Exam Techniques and Strategies
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule7Section1_4;
