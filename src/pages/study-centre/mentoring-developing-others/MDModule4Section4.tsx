import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  MessageSquareWarning,
  Heart,
  ClipboardList,
  Scale,
  Shield,
  Users,
  HelpCircle,
  Lightbulb,
  Target,
  AlertTriangle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

/* ------------------------------------------------------------------ */
/*  Quick-check questions (placed between content sections)            */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    question:
      'An assessor tells an apprentice: "You failed your observation — you need to try harder." What TWO things are wrong with this statement?',
    options: [
      'The word "failed" is inappropriate in competence-based assessment, and the feedback is not specific about what needs to improve',
      'The assessor should have waited a week before giving feedback',
      'Nothing is wrong — this is clear and direct feedback',
      'The assessor should have used email instead of telling them face-to-face',
    ],
    correctIndex: 0,
    explanation:
      'Two errors: First, competence-based assessment uses "not yet competent", never "failed". Second, "try harder" is not actionable feedback — the learner needs to know specifically which criteria were not met and what they need to do differently. Effective feedback is always specific, criterion-referenced, and forward-looking.',
  },
  {
    question:
      'An action plan after a "not yet competent" decision should include all of the following EXCEPT:',
    options: [
      'Specific criteria that were not met',
      'What the learner will do differently before the next assessment',
      'A deadline for the next assessment opportunity',
      'A comparison with how other apprentices performed',
    ],
    correctIndex: 3,
    explanation:
      'Action plans should never compare learners against each other. Competence-based assessment measures each individual against the standard, not against their peers. Comparing learners undermines motivation, breaches confidentiality, and is fundamentally unfair since learners develop at different rates.',
  },
  {
    question:
      'A learner disputes an assessment decision, saying "But I always check polarity — I just forgot this time because you were watching me." The best assessor response is:',
    options: [
      '"Well, you should have remembered — nerves are no excuse"',
      '"I can only assess what I observed on this occasion. The criteria require you to demonstrate checking polarity during the observation. We can discuss what support would help you feel more comfortable next time"',
      '"Fine, I will change the result to competent since you normally do it"',
      '"I will ask another assessor to decide for you"',
    ],
    correctIndex: 1,
    explanation:
      'The assessor must base their judgement on the evidence observed on this occasion, not on what the learner claims they usually do. However, the response should be empathetic and constructive — acknowledging that observation anxiety is real while being clear that the criteria must be met. Offering support for the next attempt maintains the relationship and the learner\u2019s motivation.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'What if I feel personally uncomfortable giving a "not yet competent" decision?',
    answer:
      'This is completely normal, especially when you have a good relationship with the learner. Many assessors find it difficult because it feels like a personal rejection. Remember: you are not judging the person, you are judging the evidence against the criteria. A "not yet competent" decision given honestly and constructively is an act of professional integrity — it protects the learner from being signed off before they are ready, and it protects the public from unqualified work. If you sign someone off as competent when they are not, you are doing them a disservice, not a favour.',
  },
  {
    question: 'How soon after the observation should I give the assessment decision?',
    answer:
      'Give formative feedback (what you observed, strengths, areas for development) as soon as practicable after the observation — ideally the same day. The formal assessment decision (competent or not yet competent) should be communicated within 48 hours, along with the written action plan if the decision is "not yet competent". Delaying the decision creates anxiety for the learner and can make the feedback feel less relevant. However, if you are genuinely unsure about a borderline decision, it is better to take a day to review your evidence carefully than to rush a judgement you might need to revise.',
  },
  {
    question: 'What happens if a learner formally appeals my assessment decision?',
    answer:
      'The appeals process typically has two stages. First, an internal appeal: the learner raises the appeal with the assessment centre, and a different assessor or the internal quality assurer reviews the evidence and the original assessment decision. If the learner is not satisfied with the internal outcome, they can escalate to an external appeal with the awarding body (e.g. City & Guilds, EAL). This is why your observation records must be detailed, factual, and criterion-referenced — they form the evidence base for any appeal. A well-documented assessment is much easier to defend than one based on vague impressions.',
  },
  {
    question: 'How does IQA differ from the role of the assessor?',
    answer:
      'The assessor makes the initial assessment decision based on the evidence gathered through observation, questioning, and portfolio review. The internal quality assurer (IQA) checks that the assessor\u2019s decisions are consistent, fair, and compliant with the assessment standards. The IQA does this through sampling (reviewing a selection of assessment decisions and evidence), direct observation of assessors in action, and standardisation meetings where assessors discuss and compare their judgements. Think of the assessor as the person who makes the call, and the IQA as the person who makes sure the call was fair. Both roles are essential for maintaining the quality and credibility of the assessment process.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions                                                     */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      'Pendleton\u2019s Rules for feedback recommend that the feedback session should begin by:',
    options: [
      'The assessor listing everything the learner did wrong',
      'The learner identifying what they feel they did well',
      'The assessor making the formal assessment decision',
      'A written test to check the learner\u2019s knowledge',
    ],
    correctAnswer: 1,
    explanation:
      'Pendleton\u2019s Rules begin with the learner stating what they think went well. This gives the learner ownership of the feedback process, builds their reflective skills, and often reveals that the learner is already aware of their strengths. The assessor then adds their own observations of what went well before moving to areas for development.',
  },
  {
    id: 2,
    question: 'When delivering a "not yet competent" decision, the assessor should:',
    options: [
      'Be vague to avoid hurting the learner\u2019s feelings',
      'Compare the learner unfavourably with other apprentices',
      'Be specific about which criteria were not met and what the learner needs to do next',
      'Delay telling the learner for at least a week to give them time to prepare',
    ],
    correctAnswer: 2,
    explanation:
      'Specificity is essential. The learner needs to know exactly which criteria were not met, what the gap is, and what they need to do to address it before the next assessment. Being vague ("you need to improve") is unhelpful; comparing with other learners is unfair; and delaying the decision creates unnecessary anxiety.',
  },
  {
    id: 3,
    question: 'An action plan after a "not yet competent" decision should be:',
    options: [
      'Vague and open-ended so the learner can decide their own approach',
      'Specific, measurable, and time-bound, with clear next steps',
      'Focused on punishment rather than development',
      'Written by the assessor without any input from the learner',
    ],
    correctAnswer: 1,
    explanation:
      'Effective action plans are specific (which criteria need to be met), measurable (how will the learner demonstrate competence), and time-bound (when is the next assessment opportunity). They should be developed collaboratively with the learner so that the learner takes ownership of their development.',
  },
  {
    id: 4,
    question:
      'A learner says "But I always do it that way on site — I just forgot because I was being watched." The assessor should:',
    options: [
      'Change the decision to competent based on the learner\u2019s claim',
      'Acknowledge the learner\u2019s frustration, explain that assessment is based on observed evidence, and offer support for the next attempt',
      'Argue with the learner about their claim',
      'Report the learner for poor behaviour',
    ],
    correctAnswer: 1,
    explanation:
      'The assessor should remain calm and empathetic while being clear that the assessment judgement is based on what was observed, not on what the learner claims to usually do. Acknowledging the learner\u2019s frustration validates their feelings; explaining the basis of the decision maintains fairness; offering support for the next attempt maintains the relationship and motivation.',
  },
  {
    id: 5,
    question: 'The purpose of standardisation meetings between assessors is to:',
    options: [
      'Ensure all assessors give all learners the same mark',
      'Compare notes on which learners are the most difficult',
      'Ensure consistency in assessment judgements across different assessors',
      'Reduce the number of assessments that need to be conducted',
    ],
    correctAnswer: 2,
    explanation:
      'Standardisation meetings bring assessors together to discuss assessment criteria, compare judgements on sample evidence, and agree on standards. The goal is consistency — ensuring that a learner would receive the same judgement regardless of which assessor conducted the assessment. This directly supports the reliability principle of VACSR.',
  },
  {
    id: 6,
    question: 'Internal quality assurance (IQA) involves:',
    options: [
      'The assessor checking their own work before submitting it',
      'An independent person sampling assessment decisions, observing assessors, and conducting standardisation',
      'The learner reviewing the assessor\u2019s feedback before it is finalised',
      'The awarding body visiting the centre every month',
    ],
    correctAnswer: 1,
    explanation:
      'IQA is conducted by a designated internal quality assurer who is independent of the individual assessment decisions. Their role is to sample a proportion of assessment decisions, observe assessors conducting assessments, review evidence records, and lead standardisation activities. This ensures the quality and consistency of the assessment process across the whole centre.',
  },
  {
    id: 7,
    question: 'Pendleton\u2019s Rules differ from traditional feedback because they:',
    options: [
      'Only focus on what went wrong',
      'Begin with the learner\u2019s self-assessment and balance strengths before areas for development',
      'Are delivered in writing only, never face-to-face',
      'Require the assessor to give a grade between 1 and 10',
    ],
    correctAnswer: 1,
    explanation:
      'Pendleton\u2019s Rules structure feedback so that the learner speaks first (identifying their own strengths and areas for development), creating a collaborative and empowering process. Strengths are discussed before areas for improvement, which maintains confidence and creates a more balanced, constructive conversation.',
  },
  {
    id: 8,
    question: 'If a learner is not satisfied with the outcome of an internal appeal, they can:',
    options: [
      'Sue the assessor personally',
      'Refuse to participate in any further assessments',
      'Escalate the appeal to the external awarding body',
      'Demand that a different assessor gives them a different result',
    ],
    correctAnswer: 2,
    explanation:
      'The appeals process has two stages: internal (reviewed by the assessment centre) and external (escalated to the awarding body such as City & Guilds or EAL). The learner has the right to escalate if they are not satisfied with the internal outcome. This two-stage process protects both the learner and the assessor.',
  },
];

/* ------------------------------------------------------------------ */
/*  Learning outcomes                                                  */
/* ------------------------------------------------------------------ */
const outcomes = [
  'Use Pendleton\u2019s Rules to structure assessment feedback that maintains learner dignity and motivation',
  'Deliver a "not yet competent" decision constructively, with specific reference to unmet criteria',
  'Create a specific, measurable, time-bound action plan following a "not yet competent" decision',
  'Manage learner disagreement by staying factual, referencing criteria, and separating observation from habit',
  'Explain the two-stage appeals process (internal and external) and the assessor\u2019s role within it',
  'Describe the purpose and methods of internal quality assurance and how mentors contribute to IQA',
];

/* ================================================================== */
/*  COMPONENT                                                          */
/* ================================================================== */
export default function MDModule4Section4() {
  useSEO({
    title:
      'Giving Assessment Decisions & Managing Disagreement | Module 4: Assessment & Evaluation',
    description:
      'Delivering "not yet competent" constructively, action planning, managing disagreement, and internal quality assurance for electrical mentors and assessors.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* ── Sticky Header ─────────────────────────────────────────── */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../md-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Assessment &amp; Evaluation
            </Link>
          </Button>
        </div>
      </div>

      {/* ── Article Body ──────────────────────────────────────────── */}
      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* ── Page Title ──────────────────────────────────────────── */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <MessageSquareWarning className="h-7 w-7 text-rose-400" />
          </div>
          <div className="flex justify-center mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-xs font-semibold">
                MODULE 4 &middot; SECTION 4
              </span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Giving Assessment Decisions &amp; Managing Disagreement
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            How to deliver assessment decisions with clarity and compassion, build effective action
            plans, manage disagreement professionally, and contribute to internal quality assurance.
          </p>
        </header>

        {/* ── Quick Summary Boxes ─────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Use Pendleton&rsquo;s Rules: learner speaks first, strengths before development
                  areas
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  &ldquo;Not yet competent&rdquo; must specify which criteria were not met and what
                  happens next
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  When learners dispute, stay factual and reference criteria &mdash; never make it
                  personal
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  IQA sampling and standardisation ensure consistency across all assessors
                </span>
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  How you deliver a decision affects whether the learner stays motivated or gives up
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Poorly handled disagreements damage the mentoring relationship and assessment
                  credibility
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>Clear action plans turn a setback into a development opportunity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Without IQA, assessment quality drifts and public trust in qualifications erodes
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Learning Outcomes ────────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {outcomes.map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ============================================================ */}
        {/*  SECTION 01 — Delivering "Not Yet Competent" Constructively  */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">01</span>
            </div>
            <h2 className="text-xl font-semibold text-white">
              Delivering &ldquo;Not Yet Competent&rdquo; Constructively
            </h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              One of the hardest things an assessor has to do is tell a learner that they have not
              met the required standard. This is especially difficult when you have a good
              relationship with the learner, when they have clearly tried hard, or when you know the
              decision will be emotionally difficult for them. But delivering honest assessment
              decisions is not optional &mdash; it is a core professional responsibility. The
              question is not <em>whether</em> to deliver the decision, but <em>how</em> to deliver
              it in a way that maintains the learner&rsquo;s dignity, motivation, and trust.
            </p>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-3">
                Pendleton&rsquo;s Rules for Assessment Feedback
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                Pendleton&rsquo;s Rules (originally developed for clinical assessment) provide a
                structured approach to delivering assessment feedback that is both honest and
                constructive. The structure is:
              </p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">
                    Step 1: The learner speaks first
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    Ask the learner what they think went well. This gives them ownership of the
                    feedback process and often reveals that they are already aware of their
                    strengths. It also reduces the power imbalance &mdash; the learner is an active
                    participant, not a passive recipient.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">
                    Step 2: The assessor adds strengths
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    The assessor confirms what the learner did well and adds any additional
                    strengths the learner may not have recognised. This builds confidence and
                    demonstrates that the assessor noticed the positive aspects of the performance,
                    not just the gaps.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">
                    Step 3: The learner identifies areas for development
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    Ask the learner what they would do differently next time, or where they think
                    there are gaps. Again, learners are often more self-aware than assessors expect
                    &mdash; they may identify the exact criteria they struggled with before you
                    mention it.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">
                    Step 4: The assessor adds development areas
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    The assessor confirms the learner&rsquo;s self-identified gaps and adds any
                    additional areas that the learner may not have noticed. Be specific: reference
                    the exact criteria that were not met and describe what was observed (or not
                    observed).
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">
                    Step 5: Agree the action plan together
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    Collaboratively agree on what happens next: what will the learner do to address
                    the gaps, who will support them, and when will the next assessment opportunity
                    take place?
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Heart className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">Maintaining Dignity</h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                A &ldquo;not yet competent&rdquo; decision, however well delivered, is difficult for
                the learner to hear. Here are principles for maintaining their dignity throughout:
              </p>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    Deliver the decision in private, never in front of colleagues or other learners
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    Focus on the evidence and the criteria, not on the person: &ldquo;the evidence
                    did not meet criterion 2.3&rdquo; rather than &ldquo;you are not good
                    enough&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    Acknowledge the learner&rsquo;s effort and the aspects they did well before
                    discussing the gaps
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    Use future-focused language: &ldquo;next time&rdquo;, &ldquo;when you
                    demonstrate&rdquo;, &ldquo;your next opportunity&rdquo; &mdash; not &ldquo;you
                    failed&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    Allow the learner time to process the decision &mdash; do not rush them out of
                    the room
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-2">
                Construction Example: Testing Observation Feedback
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                An apprentice is observed performing insulation resistance testing on a domestic
                rewire. They set up the instrument correctly, selected the right test voltage, and
                recorded results accurately. However, they did not confirm that the circuit was
                isolated before testing, and they did not check that all loads were disconnected.
                These omissions mean criteria 3.1 (safe working) and 3.4 (preparation for testing)
                were not met.
              </p>
              <p className="text-white text-sm leading-relaxed">
                The assessor uses Pendleton&rsquo;s Rules: &ldquo;You set up the Fluke really well,
                selected 500V DC as the test voltage correctly, and your recording was clear and
                accurate &mdash; that was all solid work. The area we need to address is the
                preparation stage: you did not confirm the circuit was isolated before starting the
                test, and the table lamp was still plugged in at socket 4. Criteria 3.1 and 3.4
                require you to demonstrate safe isolation and disconnection of loads before testing.
                So the outcome today is not yet competent on those two criteria. Let us put together
                a plan for your next attempt &mdash; I would suggest practising the full preparation
                sequence with your supervisor this week, and we will book another observation for
                next Friday.&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* ── Inline Check 1 ──────────────────────────────────────── */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/*  SECTION 02 — Action Planning                                */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">02</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Action Planning</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              A &ldquo;not yet competent&rdquo; decision is only useful if it leads to a clear,
              actionable plan for what happens next. Without an action plan, the learner is left
              knowing they did not meet the standard but not knowing what to do about it. The action
              plan turns a setback into a development opportunity &mdash; it is the bridge between
              where the learner is now and where they need to be.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <ClipboardList className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  Elements of an Effective Action Plan
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                Every action plan following a &ldquo;not yet competent&rdquo; decision should answer
                three questions:{' '}
                <strong>
                  What will the learner do differently? When is the next assessment opportunity? Who
                  will support them?
                </strong>
              </p>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Specific criteria not met:</strong> List the exact assessment criteria
                    that were not demonstrated. The learner must know precisely what needs to
                    improve, not just that they need to &ldquo;do better&rdquo;.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Development activities:</strong> What will the learner do between now
                    and the next assessment? This might include practising specific skills with
                    their supervisor, reviewing relevant procedures, completing additional training,
                    or gathering supplementary evidence.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Support:</strong> Who will help the learner prepare? This might be their
                    workplace mentor, supervisor, tutor, or a more experienced colleague. The
                    learner should not be left to figure it out alone.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Timeline:</strong> When will the next assessment opportunity take place?
                    This should be realistic &mdash; enough time for the learner to address the
                    gaps, but not so far away that momentum is lost.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Learner agreement:</strong> The action plan should be agreed and signed
                    by both the assessor and the learner. This creates shared ownership and ensures
                    the learner understands and accepts the plan.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-elec-yellow text-sm font-semibold mb-2">Key Principle</p>
                  <p className="text-white text-sm leading-relaxed">
                    The action plan should be developed <em>with</em> the learner, not imposed
                    <em> on</em> them. Ask: &ldquo;What do you think would help you prepare for the
                    next attempt?&rdquo; Learners who take ownership of their development plan are
                    more motivated and more likely to follow through than those who are simply told
                    what to do.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">Example Action Plan</h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                Following the testing observation example from Section 01:
              </p>
              <div className="bg-white/5 rounded-lg p-3">
                <ul className="text-white text-xs space-y-2">
                  <li>
                    <strong>Criteria not met:</strong> 3.1 (safe working procedures) and 3.4
                    (preparation for testing)
                  </li>
                  <li>
                    <strong>Gap:</strong> Did not confirm isolation before testing; did not
                    disconnect loads before insulation resistance test
                  </li>
                  <li>
                    <strong>Action:</strong> Practise the full pre-test preparation sequence
                    (confirm isolation, disconnect loads, check for stored energy) with supervisor.
                    Complete a minimum of three supervised practice runs before the next assessment.
                  </li>
                  <li>
                    <strong>Support:</strong> Workplace supervisor (Dave) to oversee practice
                    sessions and sign off each run
                  </li>
                  <li>
                    <strong>Next assessment:</strong> Friday 14th March, 09:00, domestic rewire at
                    plot 7, Elm Close
                  </li>
                  <li>
                    <strong>Agreed by:</strong> [Assessor name] and [Learner name], dated [today]
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Inline Check 2 ──────────────────────────────────────── */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/*  SECTION 03 — Managing Disagreement                          */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">03</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Managing Disagreement</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              Not every learner will accept a &ldquo;not yet competent&rdquo; decision without
              challenge. Some will be disappointed and accept it quietly. Others will dispute it,
              sometimes calmly and sometimes emotionally. Managing disagreement professionally is an
              essential assessor skill &mdash; how you handle it determines whether the assessment
              process retains its credibility and whether the mentoring relationship survives
              intact.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Scale className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  &ldquo;But I Always Do It That Way&rdquo;
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                The most common form of disagreement is the learner arguing that their observed
                performance was not representative: &ldquo;I always check polarity &mdash; I just
                forgot because you were watching me.&rdquo; This is a natural human response.
                Observation anxiety is real, and it is possible that the learner genuinely does
                perform better when not being assessed. However, the assessor&rsquo;s decision must
                be based on the evidence observed on this occasion.
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                The key principle is to{' '}
                <strong>separate what the learner usually does from what was observed</strong>. You
                are not assessing their general competence or their character &mdash; you are
                assessing the specific evidence presented during this specific observation. Your
                response should be empathetic but clear:
              </p>
              <p className="text-white text-sm leading-relaxed italic">
                &ldquo;I understand that you feel you normally do check polarity, and I have no
                reason to doubt that. But the assessment criteria require me to base my judgement on
                what I observed today, and on this occasion the polarity check was not demonstrated.
                Let us make sure you feel more comfortable and prepared for the next observation, so
                that your performance reflects what you can really do.&rdquo;
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  Staying Factual and Professional
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                When a learner disputes a decision, the temptation is to become defensive or to
                escalate the disagreement. Resist this. Your role is to remain calm, factual, and
                professional. Here are the ground rules:
              </p>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Reference criteria, not personalities:</strong> &ldquo;Criterion 3.1
                    requires demonstration of safe isolation&rdquo; &mdash; not &ldquo;you always
                    cut corners.&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Describe what you observed, not what you think:</strong> &ldquo;I did
                    not observe the voltage indicator being applied to the conductors&rdquo; &mdash;
                    not &ldquo;you did not bother to check.&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Acknowledge their feelings without changing your decision:</strong>
                    &ldquo;I can see you are frustrated, and that is completely understandable. This
                    is a difficult outcome to hear.&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Do not argue or debate:</strong> If the learner continues to disagree
                    after you have explained the basis for your decision, inform them of the formal
                    appeals process. Do not engage in a prolonged argument.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">The Appeals Process</h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                Every learner has the right to appeal an assessment decision. The appeals process
                typically has two stages:
              </p>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Stage 1 &mdash; Internal appeal:</strong> The learner raises a formal
                    appeal with the assessment centre. A different assessor or the internal quality
                    assurer reviews the original evidence, the observation record, and the
                    assessment decision. They may interview both the learner and the original
                    assessor. The outcome may be to uphold the original decision, overturn it, or
                    arrange a reassessment.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Stage 2 &mdash; External appeal:</strong> If the learner is not
                    satisfied with the internal outcome, they can escalate to the external awarding
                    body (e.g. City &amp; Guilds, EAL). The awarding body will review the evidence
                    and the centre&rsquo;s handling of the appeal. This is the final stage.
                  </span>
                </li>
              </ul>
              <p className="text-white text-sm leading-relaxed mt-3">
                The existence of the appeals process should be communicated to the learner as part
                of their induction, and reminded to them whenever a &ldquo;not yet competent&rdquo;
                decision is given. This is not a sign of weakness &mdash; it is a sign that the
                assessment process is fair and transparent.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 04 — Internal Quality Assurance (IQA)               */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">04</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Internal Quality Assurance (IQA)</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              Internal quality assurance (IQA) is the process by which an assessment centre ensures
              that all its assessment decisions are consistent, fair, and compliant with the
              requirements of the awarding body. IQA exists because even well-trained assessors can
              drift in their judgements over time, apply criteria inconsistently, or develop blind
              spots in their assessment practice. Without IQA, there is no mechanism for detecting
              and correcting these issues.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">IQA Methods</h3>
              </div>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Sampling:</strong> The IQA reviews a proportion of assessment decisions
                    and the evidence that supports them. Sampling may be targeted (focusing on new
                    assessors, borderline decisions, or units that frequently cause problems) or
                    random (to provide an overall picture of assessment quality).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Direct observation of assessors:</strong> The IQA observes an assessor
                    conducting an assessment, evaluating their observation technique, questioning,
                    recording, and feedback. This is to the assessor what assessment is to the
                    learner &mdash; an opportunity to verify competence and identify development
                    needs.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Standardisation meetings:</strong> Regular meetings where all assessors
                    in the centre come together to review sample evidence, discuss borderline cases,
                    and agree on standards. Standardisation is essential for reliability &mdash; it
                    ensures that different assessors interpret the criteria in the same way.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Moderation:</strong> In some contexts, the IQA reviews a portfolio of
                    evidence and the assessment decision before the result is confirmed. This acts
                    as a final check before the learner&rsquo;s result is reported to the awarding
                    body.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">Why IQA Exists</h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                IQA is not about catching assessors out or undermining their professional judgement.
                It exists because consistency matters. If Assessor A regularly judges learners as
                competent on evidence that Assessor B would consider insufficient, then the
                qualification loses its meaning. Learners assessed by Assessor A would have an
                unfair advantage, while learners assessed by Assessor B would be held to a higher
                standard.
              </p>
              <p className="text-white text-sm leading-relaxed">
                IQA protects everyone: it protects learners from inconsistent or unfair assessment;
                it protects assessors by identifying and correcting drift before it becomes a
                serious problem; it protects the assessment centre from awarding body sanctions; and
                it protects the public by ensuring that qualifications represent genuine competence.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">
                How Mentors Contribute to IQA
              </h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                Even if you are not formally designated as an internal quality assurer, you
                contribute to the IQA process in several important ways:
              </p>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>Attending and participating in standardisation meetings</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    Keeping detailed, factual, criterion-referenced observation records that can
                    withstand IQA scrutiny
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    Welcoming IQA observations of your assessment practice as a development
                    opportunity
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    Raising concerns if you believe assessment standards are being applied
                    inconsistently within the centre
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    Continuously developing your own assessment skills through CPD, peer discussion,
                    and reflective practice
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-rose-400 text-sm font-semibold mb-2">Key Takeaway</p>
                  <p className="text-white text-base leading-relaxed">
                    Assessment is not just about making individual judgements &mdash; it is about
                    contributing to a system that produces consistent, fair, and credible outcomes.
                    Every observation record you write, every feedback conversation you have, and
                    every standardisation meeting you attend strengthens the quality of assessment
                    across the whole organisation. Your role as an assessor and mentor is both a
                    privilege and a responsibility.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Inline Check 3 ──────────────────────────────────────── */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ── FAQs ────────────────────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <HelpCircle className="h-5 w-5 text-rose-400" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 rounded-lg p-4">
                <h3 className="text-sm font-medium text-rose-400 mb-2">{faq.question}</h3>
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Quiz ────────────────────────────────────────────────── */}
        <Quiz questions={quizQuestions} />

        {/* ── Bottom Navigation ───────────────────────────────────── */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-white/5">
          <Button
            variant="ghost"
            asChild
            className="text-white hover:text-white hover:bg-white/5 touch-manipulation min-h-[44px]"
          >
            <Link to="../md-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
          <Button
            asChild
            className="bg-rose-500 hover:bg-rose-500/90 text-white touch-manipulation min-h-[44px]"
          >
            <Link to="../md-module-5">
              Module 5: Challenging Situations
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </article>
    </div>
  );
}
