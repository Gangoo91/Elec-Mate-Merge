/**
 * EPA · MistakesAndTipsPage — editorial mistakes / tips / FAQs / glossary.
 *
 * 12 common mistakes with solutions, 6 testimonials from successful
 * apprentices, day-before checklist, what to do if things go wrong,
 * 12 FAQs, post-EPA next steps, EPA glossary.
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Quote,
  Compass,
} from 'lucide-react';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';
import {
  Eyebrow,
  SectionHeader,
} from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';

const commonMistakes = [
  {
    mistake: 'Rushing the knowledge test',
    solution:
      'Read each question carefully. You have 2 hours — use it. Read twice, eliminate wrong answers, then choose. Check if you finish early.',
  },
  {
    mistake: 'Poor safe isolation procedure',
    solution:
      'Practise the 5-step procedure every day until automatic. Failing safe isolation can result in an immediate fail of the practical.',
  },
  {
    mistake: 'Disorganised portfolio',
    solution:
      'Index your portfolio with a contents page and KSB mapping grid. Make it easy for the assessor to find evidence. Use dividers, clear labels, cross-references.',
  },
  {
    mistake: 'Not explaining reasoning during practical',
    solution:
      'The assessor needs to see your thought process, not just your actions. If they ask why, explain clearly. Verbalise key decisions even if they don\'t ask.',
  },
  {
    mistake: 'Leaving portfolio gaps',
    solution:
      'Cross-reference your portfolio against ALL KSBs at least 3 months before Gateway. Every KSB should have at least one piece of strong evidence.',
  },
  {
    mistake: 'Treating the professional discussion as an exam',
    solution:
      'It\'s a professional conversation, not a quiz. Relax, speak naturally, share genuine experiences. The assessor wants your authentic voice, not rehearsed answers.',
  },
  {
    mistake: 'Using uncalibrated test instruments',
    solution:
      'Check calibration dates well before assessment day. Recalibrate or borrow/hire a replacement. Uncalibrated instruments can invalidate your results.',
  },
  {
    mistake: 'Not practising under timed conditions',
    solution:
      'Practical is 6–8 hours but goes fast. Practise complete tasks start-to-finish, timing yourself. Know how long each activity takes so you can pace yourself.',
  },
  {
    mistake: 'Cramming the night before',
    solution:
      'Last-minute cramming creates anxiety and confusion. Trust your months of preparation. Light revision at most, prepare equipment, get a proper night\'s sleep.',
  },
  {
    mistake: 'Not knowing the testing sequence',
    solution:
      'BS 7671 Regulation 612: continuity of CPCs → continuity of ring finals → IR → polarity → Zs → RCD → PFC. Getting this wrong shows a fundamental gap.',
  },
  {
    mistake: 'Forgetting PPE',
    solution:
      'Bring appropriate PPE: safety boots, eye protection, gloves if needed. No PPE = poor professional habits and may delay or prevent your assessment.',
  },
  {
    mistake: 'Panicking when making a mistake',
    solution:
      'Stay calm. Acknowledge the error, correct it, explain what you should have done. Assessors value self-awareness and the ability to learn from mistakes.',
  },
];

const tips = [
  {
    quote:
      'Start your portfolio from day one. So much easier to collect evidence as you go than trying to remember everything at the end. I kept a folder on my phone for site photos and added them weekly.',
    grade: 'Distinction',
    name: 'Level 3 Installation Electrician',
  },
  {
    quote:
      'In the professional discussion, don\'t just describe what you did — explain why you made those decisions and what you\'d do differently next time. That\'s what separates a Pass from a Distinction.',
    grade: 'Distinction',
    name: 'Level 3 Installation Electrician',
  },
  {
    quote:
      'The practical isn\'t about speed. Take your time, work safely, check everything twice. Quality beats rushing every time. I finished with 20 minutes spare and used it to double-check.',
    grade: 'Distinction',
    name: 'Level 3 Maintenance Electrician',
  },
  {
    quote:
      'I practised safe isolation so much it became automatic. In the assessment, I didn\'t even have to think about it — my hands just did the procedure. That freed my mind to focus on the actual installation.',
    grade: 'Merit',
    name: 'Level 3 Installation Electrician',
  },
  {
    quote:
      'Get someone to run mock professional discussions with you. My supervisor did three with me in the weeks before EPA and it made a massive difference. I knew exactly what to expect.',
    grade: 'Merit',
    name: 'Level 3 Installation Electrician',
  },
  {
    quote:
      'Don\'t panic if you get a question wrong in the knowledge test. Move on, come back later. I flagged three I was unsure about, answered everything else, then came back with a clearer head.',
    grade: 'Pass',
    name: 'Level 3 Maintenance Electrician',
  },
];

const faqs = [
  {
    question: 'How long does EPA take in total?',
    answer:
      'Typically 3 months from when you pass Gateway. Within that window, your three components will be scheduled. Knowledge test 2 hours, practical 6–8 hours, professional discussion 60 minutes. Results within 10–15 working days of your final component.',
  },
  {
    question: 'Can I choose my EPAO?',
    answer:
      'Usually your training provider selects the EPAO based on existing relationships. You can discuss preferences with them. Common EPAOs include Smart Assessor, City & Guilds, and EAL.',
  },
  {
    question: 'What if I\'m not ready for Gateway?',
    answer:
      'You can delay Gateway. No penalty for postponing — it just extends your end date. Far better to delay and pass first time than to rush and risk failing.',
  },
  {
    question: 'Do I need to pass AM2 before EPA?',
    answer:
      'Yes. AM2 is a mandatory Gateway requirement for the Level 3 Installation / Maintenance Electrician standard. You must have your AM2 pass certificate before Gateway.',
  },
  {
    question: 'Can I bring reference books to the knowledge test?',
    answer:
      'Depends on your EPAO. Most allow a clean (unannotated) copy of BS 7671 and the On-Site Guide. Some also allow Guidance Note 3. Check with your training provider well in advance.',
  },
  {
    question: 'What happens if I fail one component?',
    answer:
      'You only re-sit the failed component. One free re-sit within the original funding band, typically within 3 months. Training provider arranges additional support. Maximum grade on re-sit is usually Pass.',
  },
  {
    question: 'How do I prepare my portfolio?',
    answer:
      'Organise by KSB area with a contents page and cross-reference grid. Include photos, test results, witness testimonies, reflective accounts, CPD records, certificates. Each piece should state which KSBs it covers.',
  },
  {
    question: 'Will the assessor help me during the practical?',
    answer:
      'No. The assessor observes silently and takes notes. They may ask you to explain what you\'re doing (to assess understanding), but won\'t guide, correct, or hint. You must work independently.',
  },
  {
    question: 'What\'s the pass rate for EPA?',
    answer:
      'Varies by EPAO but generally high — typically 80–90% for well-prepared apprentices. First-attempt pass rates are higher for those who have completed proper preparation.',
  },
  {
    question: 'Can my employer attend the EPA?',
    answer:
      'No. The whole point of EPA is that it\'s an independent assessment by a third party. Your employer is involved at Gateway but not during the assessments themselves.',
  },
  {
    question: 'What certificate do I receive?',
    answer:
      'An apprenticeship completion certificate from ESFA showing your name, the apprenticeship standard, overall grade, and completion date. Separate from your AM2 certificate.',
  },
  {
    question: 'How soon after EPA can I get my JIB Gold Card?',
    answer:
      'Once you have your completion certificate. Takes a few weeks. You\'ll need EPA certificate, AM2 certificate, qualification evidence. Your employer or JIB can guide you through the application.',
  },
];

const dayBeforeChecklist = [
  'Confirm the time, location, and any access arrangements (parking, building entry)',
  'Check you have photo ID (driving licence or passport)',
  'Lay out everything you need the night before — don\'t leave packing to the morning',
  'For practical: check all instruments are calibrated, test leads intact, lock-off devices work',
  'For knowledge test: pack calculator, pens, BS 7671 (if permitted)',
  'For professional discussion: review your portfolio, re-read key evidence and reflective accounts',
  'Set two alarms — don\'t rely on one',
  'Eat a proper dinner and avoid alcohol',
  'Light revision only — don\'t cram new material',
  'Get at least 7–8 hours of sleep',
  'Prepare lunch and water if you\'ll be there all day',
  'Plan your route and add extra time for unexpected delays',
];

const thingsGoWrong = [
  {
    situation: 'You\'re running late',
    action:
      'Call your training provider and the assessment venue immediately. Most EPAOs accommodate short delays. Don\'t just fail to show up — communicate.',
  },
  {
    situation: 'You feel unwell on the day',
    action:
      'Contact your training provider ASAP. If genuinely ill, the assessment can be rescheduled. Attempting while unwell affects performance and is not recommended.',
  },
  {
    situation: 'Your test instrument is faulty',
    action:
      'Tell the assessor immediately. Training providers / assessment centres may have a replacement. This is why checking instruments the day before is critical.',
  },
  {
    situation: 'You don\'t understand a question',
    action:
      'In the knowledge test, re-read carefully and use process of elimination. In the professional discussion, ask the assessor to rephrase. No penalty for asking.',
  },
  {
    situation: 'You make a significant mistake in the practical',
    action:
      'Stop, acknowledge it, explain what went wrong and how you\'ll correct it. Don\'t try to hide it. Self-awareness and correction are valued. A single mistake doesn\'t necessarily mean a fail.',
  },
  {
    situation: 'Panic attack or severe anxiety',
    action:
      'Tell the assessor you need a moment. Step away briefly if needed. Assessors are trained to handle this. If you can\'t continue, the assessment can be rescheduled under mitigating circumstances.',
  },
  {
    situation: 'Assessment environment has a problem',
    action:
      'Report issues (noise, temperature, equipment) to the assessor or invigilator. May be recorded as mitigating circumstances if they affect your performance.',
  },
];

const postEpaSteps = [
  {
    step: 1,
    title: 'Apply for JIB Gold Card',
    description:
      'Apply as soon as you have your completion certificate. You\'ll need EPA certificate, AM2 certificate, qualification evidence. The Gold Card is the industry-recognised proof of competence.',
  },
  {
    step: 2,
    title: 'Negotiate your pay',
    description:
      'You\'re now a fully qualified electrician — should be paid accordingly. Average qualified electrician salary is £35,000–£42,000. Speak to your employer about a pay review.',
  },
  {
    step: 3,
    title: 'Consider further qualifications',
    description:
      'Level 4 Design & Verification (2396) is the natural next step if you want to design and certify installations. The 18th Edition course (2382) keeps you current.',
  },
  {
    step: 4,
    title: 'Competent person scheme',
    description:
      'Once you have sufficient experience (typically 1–2 years post-qualification), you can register with NICEIC, NAPIT, or ELECSA to self-certify notifiable work under Part P.',
  },
  {
    step: 5,
    title: 'Specialisation options',
    description:
      'Consider specialising in EV charging, solar PV, fire alarm systems, data cabling, industrial controls, or BMS. Specialisation often commands higher rates.',
  },
  {
    step: 6,
    title: 'Self-employment',
    description:
      'Register with a competent person scheme, get public liability insurance, register as self-employed with HMRC, build your client base. Many go self-employed within 2–5 years of qualifying.',
  },
];

const glossary = [
  { term: 'EPA', definition: 'End Point Assessment — the independent final assessment of your apprenticeship.' },
  { term: 'EPAO', definition: 'End Point Assessment Organisation — the independent body that conducts your EPA.' },
  { term: 'Gateway', definition: 'The formal readiness checkpoint before EPA where you, employer, and training provider agree you\'re ready.' },
  { term: 'KSB', definition: 'Knowledge, Skills, and Behaviours — the three areas defined in your apprenticeship standard.' },
  { term: 'AM2', definition: 'Achievement Measurement 2 — the practical assessment by NET that tests installation competence.' },
  { term: 'NET', definition: 'National Electrotechnical Training — the organisation that runs AM2 assessments.' },
  { term: 'ST0152', definition: 'Apprenticeship standard reference for Level 3 Installation / Maintenance Electrician (v1.2 current).' },
  { term: 'STAR method', definition: 'Situation, Task, Action, Result — structured approach to answering professional discussion questions.' },
  { term: 'Portfolio', definition: 'Your collection of evidence demonstrating competence against all KSBs.' },
  { term: 'Regulation 612', definition: 'BS 7671 regulation defining the correct testing sequence for initial verification.' },
  { term: 'GS38', definition: 'HSE guidance on test probes and leads — your voltage indicator must comply.' },
  { term: 'Safe isolation', definition: 'The 5-step procedure for safely isolating circuits: identify, switch off, secure, test, work.' },
  { term: 'JIB Gold Card', definition: 'Joint Industry Board Approved Electrician card — industry-recognised proof of qualification.' },
];

const MistakesAndTipsPage = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <button
          onClick={() => navigate('/apprentice/toolbox/end-point-assessment')}
          className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · EPA"
          title="Mistakes, tips & FAQs"
          description="What to avoid, what to copy, what to do when something goes sideways, and the glossary you'll wish you had earlier."
          tone="yellow"
        />
      </motion.div>

      {/* ── Common mistakes ─────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Common mistakes to avoid"
          title={`${commonMistakes.length} traps with fixes`}
          meta="Each one has cost apprentices a grade — or a pass"
        />
        <ul className="space-y-2">
          {commonMistakes.map((item) => (
            <li
              key={item.mistake}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3"
            >
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-300 flex-shrink-0 mt-0.5" />
                <h3 className="text-[14px] font-semibold text-red-300 tracking-tight">
                  {item.mistake}
                </h3>
              </div>
              <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                  <p className="text-[12.5px] text-white/85 leading-relaxed">
                    <span className="font-semibold text-elec-yellow">Solution: </span>
                    {item.solution}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── Tips from successful apprentices ───────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Tips from successful apprentices"
          title={`${tips.length} voices from the other side`}
          meta="Distinction, Merit, Pass — they all share what worked"
        />
        <ul className="space-y-2">
          {tips.map((tip) => (
            <li
              key={tip.quote}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-2"
            >
              <div className="flex items-start gap-2">
                <Quote className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                <p className="text-[13px] text-white/85 italic leading-relaxed">
                  {tip.quote}
                </p>
              </div>
              <div className="flex items-center gap-2 pl-5">
                <span className="inline-flex items-center h-6 px-2 rounded-md border border-elec-yellow/30 bg-elec-yellow/[0.06] text-[10.5px] font-medium uppercase tracking-[0.14em] text-elec-yellow">
                  {tip.grade}
                </span>
                <span className="text-[11.5px] text-white/55">{tip.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── Day-before checklist ────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Day before"
          title={`Preparation checklist · ${dayBeforeChecklist.length} items`}
          meta="Run through this the evening before each component"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5">
          <ul className="space-y-1.5">
            {dayBeforeChecklist.map((item) => (
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

      {/* ── If things go wrong ──────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="If things go wrong on the day"
          title={`${thingsGoWrong.length} situations and what to do`}
          meta="Stay calm — assessors are human, processes exist"
        />
        <ul className="space-y-2">
          {thingsGoWrong.map((item) => (
            <li
              key={item.situation}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5"
            >
              <h3 className="text-[14px] font-semibold text-elec-yellow tracking-tight">
                {item.situation}
              </h3>
              <p className="text-[13px] text-white/85 leading-relaxed mt-1">
                {item.action}
              </p>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── FAQs ────────────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Frequently asked"
          title={`${faqs.length} questions, answered`}
          meta="The ones that keep coming up"
        />
        <ul className="space-y-2">
          {faqs.map((faq) => (
            <li
              key={faq.question}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-1.5"
            >
              <h3 className="text-[13.5px] font-semibold text-white tracking-tight">
                {faq.question}
              </h3>
              <p className="text-[12.5px] text-white/85 leading-relaxed">{faq.answer}</p>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── Post-EPA next steps ─────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="After EPA"
          title="Your six next steps"
          meta="From Gold Card to specialisation"
        />
        <ol className="space-y-2">
          {postEpaSteps.map((item) => (
            <li
              key={item.step}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5"
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-md border border-elec-yellow/30 bg-elec-yellow/[0.06] text-[12px] font-mono font-semibold tabular-nums text-elec-yellow flex-shrink-0">
                  {item.step}
                </span>
                <div className="space-y-1">
                  <h3 className="text-[14px] font-semibold text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-white/85 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </motion.section>

      {/* ── Glossary ────────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Glossary"
          title="EPA terms worth knowing"
          meta="Bookmark this — you'll come back to it"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5">
          <ul className="space-y-2.5">
            {glossary.map((item) => (
              <li
                key={item.term}
                className="flex items-start gap-3"
              >
                <Compass className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-[12.5px] font-mono font-semibold text-elec-yellow">
                    {item.term}
                  </span>
                  <p className="text-[12.5px] text-white/85 leading-relaxed">
                    {item.definition}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>
    </PageFrame>
  );
};

export default MistakesAndTipsPage;
