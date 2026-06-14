/**
 * Portfolio · ReflectivePracticePage — editorial guide to reflective writing.
 *
 * Why reflection matters, STAR method, writing tips, Gibbs cycle, topics
 * worth reflecting on, linking to EPA, full example, frequency guide.
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Quote } from 'lucide-react';
import { PageFrame, PageHero, itemVariants } from '@/components/college/primitives';
import { Eyebrow, SectionHeader } from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';

const starSteps = [
  {
    letter: 'S',
    title: 'Situation',
    description: 'Describe the context. Where were you? What was the project? What was the task?',
    example:
      'I was on a domestic rewire project in a 3-bedroom semi-detached house. The existing wiring was TT earthing with old rubber-sheathed cables.',
  },
  {
    letter: 'T',
    title: 'Task',
    description: 'What was your specific role and responsibility? What were you asked to do?',
    example:
      "I was tasked with installing the new consumer unit and first-fix wiring for the upstairs circuits, working under my supervisor's guidance.",
  },
  {
    letter: 'A',
    title: 'Action',
    description:
      'What did you actually do? Be specific about your actions, decisions, and the regulations or standards you followed.',
    example:
      'I performed safe isolation of the existing supply using the GS38 procedure. I then installed a 10-way split-load consumer unit with dual RCDs, ran 2.5mm² T&E for ring finals and 1.5mm² for lighting circuits through the first-floor void, following BS 7671 Table 4D5.',
  },
  {
    letter: 'R',
    title: 'Result',
    description: 'What was the outcome? What did you learn? What would you do differently?',
    example:
      "All circuits tested satisfactorily — R1+R2 within expected ranges, IR >200MΩ, Zs values within limits. I learned that planning cable routes before starting saves significant time. Next time I'd draw a full routing plan before cutting any cables.",
  },
];

const writingTips = [
  'Write in the first person — "I installed…", "I learned…", "I decided…"',
  'Be honest about mistakes — assessors value honesty and learning more than perfection',
  'Include technical detail — mention specific regulations, cable sizes, test values',
  'Explain your reasoning — why did you choose that approach? What alternatives were there?',
  'Link to KSBs — explicitly state which Knowledge, Skills, or Behaviours your reflection covers',
  'Keep it concise — 300–500 words per reflective account is usually sufficient',
  'Write soon after the event — you will forget important details if you wait weeks',
  'Show progression — early reflections simpler, later ones more detailed and analytical',
  'Include what went wrong — a reflection about a mistake you corrected is extremely valuable',
  "Don't copy from textbooks — use your own words and your own experience",
];

const gibbsStages = [
  { stage: '1. Description', description: 'What happened? Describe the event factually.' },
  { stage: '2. Feelings', description: 'What were you thinking and feeling at the time?' },
  { stage: '3. Evaluation', description: 'What was good and bad about the experience?' },
  {
    stage: '4. Analysis',
    description: 'What sense can you make of the situation? Why did things go that way?',
  },
  { stage: '5. Conclusion', description: 'What else could you have done? What did you learn?' },
  { stage: '6. Action plan', description: 'What will you do differently next time?' },
];

const reflectionTopics = [
  {
    category: 'Technical work',
    topics: [
      'Your first consumer unit installation',
      'A complex fault you helped diagnose',
      'Testing and inspecting a completed installation',
      'Working with 3-phase systems for the first time',
      'Installing an EV charging point',
      'Your first EICR contribution',
    ],
  },
  {
    category: 'Problem solving',
    topics: [
      'A time when something went wrong and how you fixed it',
      'An unexpected fault that required creative thinking',
      'Adapting your approach when original plans changed',
      'Working around access difficulties on site',
      'Dealing with damaged or incorrect materials',
    ],
  },
  {
    category: 'Professional development',
    topics: [
      'How your confidence has grown over your apprenticeship',
      'A skill you struggled with but eventually mastered',
      'What you learned from a more experienced electrician',
      'How college theory helped you on site',
      'Your preparation for the AM2S assessment',
    ],
  },
  {
    category: 'Working with others',
    topics: [
      'Coordinating with other trades on a project',
      'Explaining electrical work to a non-technical client',
      'Working effectively as part of a team on a large job',
      'Dealing with a disagreement on site',
      'Mentoring a newer apprentice',
    ],
  },
  {
    category: 'Health & safety',
    topics: [
      'A near-miss incident and what you learned',
      'Implementing safe isolation on a live system',
      'Identifying and reporting a safety hazard',
      'Working at height for the first time',
      'Dealing with asbestos discovery during a rewire',
    ],
  },
];

const assessorUse = [
  'Your provider reviews your reflective accounts as part of your on-programme portfolio',
  'They use them to confirm you genuinely understand your work, not just rehearsed answers',
  'They look for progression in your reflective ability over time',
  'They check you can apply theory to practice',
  'They check that you understand why regulations exist, not just what they are',
  'The same applied-knowledge thinking is tested in your AM2S End-Point Assessment',
];

const fullExample = [
  {
    label: 'Situation',
    text: 'During a kitchen refurbishment in a domestic property, I was asked to install a new radial circuit for a cooker supply. The existing installation was a TN-C-S system with a 100A main fuse and 16mm² tails.',
  },
  {
    label: 'Task',
    text: 'I needed to install a 32A radial circuit using 6mm² T&E from the consumer unit to a 45A cooker switch with a 13A socket outlet, a distance of approximately 18 metres.',
  },
  {
    label: 'Action',
    text: 'I first performed safe isolation of the consumer unit using GS38. I then referred to BS 7671 Table 4D5 to confirm that 6mm² T&E was suitable for the 32A circuit, considering the installation method (clipped direct, method C) and the route length. I calculated the voltage drop using the mV/A/m values and confirmed it was within the 5% limit. I installed the cable, terminated at both ends, and fitted the cooker switch. I then tested the circuit: R1+R2 was 0.82Ω, insulation resistance >200MΩ, Zs 0.94Ω — all within acceptable limits.',
  },
  {
    label: 'Result',
    text: "The circuit passed all tests and was signed off by my supervisor. I learned the importance of checking voltage drop calculations before starting — if the route had been 5 metres longer, I would have needed 10mm² cable. In future, I'll always calculate voltage drop as part of my planning before pulling cable.",
  },
];

const frequencyGuide = [
  'Aim for at least one detailed reflective account per month',
  'Write brief notes after significant tasks (even just bullet points)',
  'Complete a full STAR reflection after each major installation or project',
  'Reflect on college learning and how it connects to site work',
  'Write a reflection whenever something unexpected happens',
  'By gateway, aim for 15–20 quality reflective accounts covering all KSBs',
];

const ReflectivePracticePage = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <button
          onClick={() => navigate('/apprentice/toolbox/portfolio-building')}
          className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Portfolio"
          title="Reflective practice"
          description="Thinking about what you did, why, and what you'd do differently. The part of your portfolio that shows assessors you understand your work — not just that you can do it."
          tone="yellow"
        />
      </motion.div>

      {/* ── Why reflection matters ──────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-2">
          <Eyebrow>Why reflection matters</Eyebrow>
          <p className="text-[13.5px] text-white/85 leading-relaxed">
            Reflective practice is the process of thinking about what you did, why you did it, what
            went well, what could be better, and what you’ll do differently next time. It’s a
            critical part of your portfolio because it shows assessors that you understand your
            work.
          </p>
          <p className="text-[13px] text-white/85 leading-relaxed">
            Strong reflective accounts make your on-programme portfolio evidence and gateway
            sign-off far more convincing, and the same thinking underpins the applied-knowledge
            questions in your AM2S End-Point Assessment. Practising reflection throughout your
            apprenticeship means you’ll be ready and confident.
          </p>
        </div>
      </motion.div>

      {/* ── STAR method ─────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="STAR method"
          title="The most-used reflective framework"
          meta="Use it for every reflective account in your portfolio"
        />
        <ul className="space-y-2.5">
          {starSteps.map((step) => (
            <li
              key={step.letter}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-elec-yellow/30 bg-elec-yellow/[0.06] text-[16px] font-mono font-semibold text-elec-yellow flex-shrink-0">
                  {step.letter}
                </span>
                <h3 className="text-[15px] font-semibold text-elec-yellow tracking-tight">
                  {step.title}
                </h3>
              </div>
              <p className="text-[13px] text-white/85 leading-relaxed pl-3 sm:pl-12">
                {step.description}
              </p>
              <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-3 ml-3 sm:ml-12">
                <Eyebrow>Example</Eyebrow>
                <p className="text-[12.5px] text-white/85 italic leading-relaxed mt-1">
                  {step.example}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── Writing tips ────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Writing tips"
          title="Ten rules for stronger reflections"
          meta="What turns a thin account into convincing evidence"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5">
          <ul className="space-y-1.5">
            {writingTips.map((tip) => (
              <li
                key={tip}
                className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* ── Gibbs cycle ─────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Gibbs reflective cycle"
          title="Alternative 6-stage method"
          meta="Some training providers prefer this over STAR"
        />
        <ul className="space-y-2">
          {gibbsStages.map((item) => (
            <li
              key={item.stage}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5"
            >
              <h3 className="text-[13.5px] font-semibold text-elec-yellow tracking-tight">
                {item.stage}
              </h3>
              <p className="text-[12.5px] text-white/85 leading-relaxed mt-1">{item.description}</p>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── Topics worth reflecting on ──────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Topics worth reflecting on"
          title="Five categories of strong material"
          meta="Excellent topics for reflective accounts covering a range of KSBs"
        />
        <ul className="space-y-2">
          {reflectionTopics.map((section) => (
            <li
              key={section.category}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-2"
            >
              <h3 className="text-[13.5px] font-semibold text-elec-yellow tracking-tight">
                {section.category}
              </h3>
              <ul className="space-y-1">
                {section.topics.map((topic) => (
                  <li
                    key={topic}
                    className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                  >
                    <span className="text-elec-yellow/70 mt-0.5">·</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── Linking to EPA ──────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Reflection, gateway & EPA"
          title="How reflection feeds your assessment"
          meta="Strong on-programme reflection = a smoother gateway and AM2S"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3">
          <p className="text-[13px] text-white/85 leading-relaxed">
            Your reflective accounts strengthen your on-programme portfolio and help your provider
            sign you off at gateway. There is no portfolio interview in the AM2S End-Point
            Assessment, but the same habit of explaining your decisions and the regulations behind
            them is exactly what the AM2S applied-knowledge test checks. If you’ve been writing
            quality reflections throughout, you’ll approach assessment with genuine understanding
            rather than rehearsed answers.
          </p>
          <ul className="space-y-1.5">
            {assessorUse.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* ── Full example ────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Full example"
          title="A complete STAR reflective account"
          meta="KSBs covered: S5 (Install wiring), K3 (BS 7671), B1 (Safe working)"
          action={
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-elec-yellow/25 bg-elec-yellow/[0.06]">
              <Quote className="h-4 w-4 text-elec-yellow" />
            </span>
          }
        />
        <div className="rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-3">
          {fullExample.map((part) => (
            <div key={part.label} className="space-y-0.5">
              <Eyebrow className="text-elec-yellow/85">{part.label}</Eyebrow>
              <p className="text-[12.5px] text-white/85 leading-relaxed">{part.text}</p>
            </div>
          ))}
          <p className="text-[12px] text-white/70 leading-relaxed pt-2 border-t border-elec-yellow/15 italic">
            This single account covers installation skills, BS 7671 knowledge, and safe working
            behaviours — three KSBs with one piece of evidence. Test values shown (R1+R2, Zs, IR)
            are illustrative — record your own measured results.
          </p>
        </div>
      </motion.section>

      {/* ── Frequency ───────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="How often to reflect"
          title="A cadence that works"
          meta="Monthly minimum; more around major events"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5">
          <ul className="space-y-1.5">
            {frequencyGuide.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>
    </PageFrame>
  );
};

export default ReflectivePracticePage;
