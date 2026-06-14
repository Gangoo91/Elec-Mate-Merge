/**
 * EPA · MistakesAndTipsPage — editorial mistakes / tips / FAQs / glossary.
 *
 * 12 common mistakes with solutions, 6 testimonials from successful
 * apprentices, day-before checklist, what to do if things go wrong,
 * 12 FAQs, post-EPA next steps, EPA glossary.
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, AlertTriangle, Quote, Compass } from 'lucide-react';
import { PageFrame, PageHero, itemVariants } from '@/components/college/primitives';
import { SectionHeader } from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';

const commonMistakes = [
  {
    mistake: 'Rushing the applied-knowledge test',
    solution:
      'Read each question carefully. Use the full time — read twice, eliminate wrong answers, then choose. Review your answers if you finish early.',
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
      "The assessor needs to see your thought process, not just your actions. If they ask why, explain clearly. Verbalise key decisions even if they don't ask.",
  },
  {
    mistake: 'Leaving portfolio gaps',
    solution:
      'Cross-reference your portfolio against ALL KSBs at least 3 months before Gateway. Every KSB should have at least one piece of strong evidence.',
  },
  {
    mistake: 'Going silent when the assessor asks you to explain',
    solution:
      "During the AM2S the assessor may ask you to explain a step. Talk through your reasoning calmly and clearly — it shows understanding, not just the action. Don't clam up.",
  },
  {
    mistake: 'Using uncalibrated test instruments',
    solution:
      'Check calibration dates well before assessment day. Recalibrate or borrow/hire a replacement. Uncalibrated instruments can invalidate your results.',
  },
  {
    mistake: 'Not practising under timed conditions',
    solution:
      'The AM2S practical runs across the day and time is tight. Practise complete tasks start-to-finish, timing yourself. Know how long each activity takes so you can pace yourself.',
  },
  {
    mistake: 'Cramming the night before',
    solution:
      "Last-minute cramming creates anxiety and confusion. Trust your months of preparation. Light revision at most, prepare equipment, get a proper night's sleep.",
  },
  {
    mistake: 'Not knowing the testing sequence',
    solution:
      'BS 7671 Regulation 643.1 (Section 643) sets the initial-verification order: continuity of CPCs → continuity of ring finals → IR → polarity → Zs → RCD → PFC. Getting this wrong shows a fundamental gap.',
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
      "When the assessor asks you to explain a step, don't just describe what you did — explain why you made that decision. Talking through your reasoning shows the depth they're looking for.",
    grade: 'Pass',
    name: 'Level 3 Installation Electrician',
  },
  {
    quote:
      "The practical isn't about speed. Take your time, work safely, check everything twice. Quality beats rushing every time. I finished with 20 minutes spare and used it to double-check.",
    grade: 'Distinction',
    name: 'Level 3 Maintenance Electrician',
  },
  {
    quote:
      "I practised safe isolation so much it became automatic. In the assessment, I didn't even have to think about it — my hands just did the procedure. That freed my mind to focus on the actual installation.",
    grade: 'Merit',
    name: 'Level 3 Installation Electrician',
  },
  {
    quote:
      "Rehearse fault diagnosis until it's a habit. My supervisor introduced faults for me to find in the weeks before, and on the day I worked through them methodically instead of panicking.",
    grade: 'Pass',
    name: 'Level 3 Installation Electrician',
  },
  {
    quote:
      "Don't panic if you get a question wrong in the knowledge test. Move on, come back later. I flagged three I was unsure about, answered everything else, then came back with a clearer head.",
    grade: 'Pass',
    name: 'Level 3 Maintenance Electrician',
  },
];

const faqs = [
  {
    question: 'How long does the AM2S take?',
    answer:
      'The AM2S is around 16.75 hours of assessment in total — composite installation is the longest part (~10 hours), plus inspection and testing, fault diagnosis, safe isolation, and a ~1 hour online applied-knowledge test. It is scheduled after Gateway. Your result follows within a few weeks.',
  },
  {
    question: 'Who runs the electrician end-point assessment?',
    answer:
      'For the Installation & Maintenance Electrician (ST0152) the AM2S is delivered by NET at approved AM2 assessment centres — it is not an open EPAO marketplace for this standard. Your training provider registers you with NET after Gateway.',
  },
  {
    question: "What if I'm not ready for Gateway?",
    answer:
      'You can delay Gateway. No penalty for postponing — it just extends your end date. Far better to delay and pass first time than to rush and risk failing.',
  },
  {
    question: 'Is the AM2 the same as the EPA?',
    answer:
      'For ST0152 the AM2S is the end-point assessment — taken after Gateway, not before it. There is no separate "AM2 before Gateway" plus a different EPA practical. The AM2S is the practical and knowledge assessment, run by NET.',
  },
  {
    question: 'Can I bring reference material to the applied-knowledge test?',
    answer:
      'NET confirms what is permitted on the day. Check with your training provider well in advance, and revise so you can find key BS 7671 regulations quickly rather than relying on reference material.',
  },
  {
    question: "What happens if I don't pass a section?",
    answer:
      'You can re-sit, with additional support arranged by your training provider first. Re-sit arrangements and any funding are confirmed by NET and your provider. Most apprentices pass on re-sit with focused preparation on the area they fell short in.',
  },
  {
    question: 'How do I prepare my portfolio?',
    answer:
      'Organise by KSB area with a contents page and cross-reference grid. Include photos, test results, witness testimonies, reflective accounts, CPD records, certificates. Each piece should state which KSBs it covers.',
  },
  {
    question: 'Will the assessor help me during the practical?',
    answer:
      "No. The assessor observes silently and takes notes. They may ask you to explain what you're doing (to assess understanding), but won't guide, correct, or hint. You must work independently.",
  },
  {
    question: 'How hard is the AM2S to pass?',
    answer:
      'Well-prepared apprentices who have rehearsed safe isolation, the full testing sequence, and fault diagnosis under timed conditions pass at a good rate. The most common cause of failure is a safe-isolation error, so drill that until it is automatic.',
  },
  {
    question: 'Can my employer attend the AM2S?',
    answer:
      'No. The AM2S is an independent assessment by NET. Your employer is involved at Gateway but not during the assessment itself.',
  },
  {
    question: 'What certificate do I receive?',
    answer:
      'An apprenticeship completion certificate from ESFA showing your name, the apprenticeship standard, and completion date, plus your AM2S pass from NET. These confirm you have completed the standard.',
  },
  {
    question: 'How soon after the AM2S can I get my ECS Gold Card?',
    answer:
      'Once you have your AM2S pass and apprenticeship completion. The JIB Approved Electrician (ECS Gold) card is applied for through ECS — they check your Level 3 qualification, AM2S pass, and apprenticeship completion. Apply via ecscard.org.uk; it usually takes a few weeks.',
  },
];

const dayBeforeChecklist = [
  'Confirm the time, location, and any access arrangements (parking, building entry)',
  'Check you have photo ID (driving licence or passport)',
  "Lay out everything you need the night before — don't leave packing to the morning",
  'For the practical sections: check all instruments are calibrated, test leads intact, lock-off devices work',
  'For the applied-knowledge test: pack calculator, pens, and any reference material NET permits',
  'Refresh the testing sequence and your fault-diagnosis approach in your head',
  "Set two alarms — don't rely on one",
  'Eat a proper dinner and avoid alcohol',
  "Light revision only — don't cram new material",
  'Get at least 7–8 hours of sleep',
  "Prepare lunch and water if you'll be there all day",
  'Plan your route and add extra time for unexpected delays',
];

const thingsGoWrong = [
  {
    situation: "You're running late",
    action:
      "Call your training provider and the assessment venue immediately. Most EPAOs accommodate short delays. Don't just fail to show up — communicate.",
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
    situation: "You don't understand a question",
    action:
      "In the applied-knowledge test, re-read carefully and use process of elimination. If an assessor asks you to explain a step during the practical and you're unsure what they mean, ask them to rephrase. No penalty for asking.",
  },
  {
    situation: 'You make a significant mistake in the practical',
    action:
      "Stop, acknowledge it, explain what went wrong and how you'll correct it. Don't try to hide it. Self-awareness and correction are valued. A single mistake doesn't necessarily mean a fail.",
  },
  {
    situation: 'Panic attack or severe anxiety',
    action:
      "Tell the assessor you need a moment. Step away briefly if needed. Assessors are trained to handle this. If you can't continue, the assessment can be rescheduled under mitigating circumstances.",
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
    title: 'Apply for your ECS Gold Card',
    description:
      'The JIB Approved Electrician (ECS Gold) card is the industry-recognised proof of competence. Apply through ECS (ecscard.org.uk) once you have your Level 3 qualification, AM2S pass, and apprenticeship completion. Your employer or the JIB can guide you.',
  },
  {
    step: 2,
    title: 'Negotiate your pay',
    description:
      "You're now a fully qualified electrician — you should be paid accordingly. The JIB-graded electrician rate is around £35,841 (rising to roughly £43,778 at higher grades) on 2026 rates. Speak to your employer about a pay review against the JIB ladder.",
  },
  {
    step: 3,
    title: 'Consider further qualifications',
    description:
      'Level 4 Design & Verification (2396) is the natural next step if you want to design and certify installations. The C&G 2382 Wiring Regulations update course (currently BS 7671:2018+A4:2026) keeps you current.',
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
  {
    term: 'EPA',
    definition: 'End Point Assessment — the independent final assessment of your apprenticeship.',
  },
  {
    term: 'EPAO',
    definition: 'End Point Assessment Organisation — the independent body that conducts your EPA.',
  },
  {
    term: 'Gateway',
    definition:
      "The formal readiness checkpoint before EPA where you, employer, and training provider agree you're ready.",
  },
  {
    term: 'KSB',
    definition:
      'Knowledge, Skills, and Behaviours — the three areas defined in your apprenticeship standard.',
  },
  {
    term: 'AM2S',
    definition:
      'Achievement Measurement 2 Standard — the integrated practical and knowledge end-point assessment for ST0152, run by NET after Gateway.',
  },
  {
    term: 'AM2E',
    definition:
      'The Experienced Worker route (2346-03 EWA) for qualified people without an apprenticeship — not the apprentice EPA.',
  },
  {
    term: 'NET',
    definition:
      'National Electrotechnical Training — the body that delivers the AM2S at approved assessment centres.',
  },
  {
    term: 'ST0152',
    definition:
      'Apprenticeship standard reference for the Level 3 Installation & Maintenance Electrician.',
  },
  {
    term: 'STAR method',
    definition:
      'Situation, Task, Action, Result — a structured way to talk through examples from your work.',
  },
  {
    term: 'Portfolio',
    definition:
      'Your collection of evidence demonstrating competence against all KSBs, used at Gateway.',
  },
  {
    term: 'Regulation 643.1',
    definition:
      'BS 7671 (A4:2026) regulation setting the order of initial-verification tests (643.2 to 643.6) before energising.',
  },
  {
    term: 'GS38',
    definition: 'HSE guidance on test probes and leads — your voltage indicator must comply.',
  },
  {
    term: 'Safe isolation',
    definition:
      'The 5-step procedure for safely isolating circuits: identify, switch off, secure, test, work.',
  },
  {
    term: 'JIB Gold Card',
    definition:
      'Joint Industry Board Approved Electrician card — industry-recognised proof of qualification.',
  },
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
                <p className="text-[13px] text-white/85 italic leading-relaxed">{tip.quote}</p>
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
              <p className="text-[13px] text-white/85 leading-relaxed mt-1">{item.action}</p>
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
                  <p className="text-[13px] text-white/85 leading-relaxed">{item.description}</p>
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
              <li key={item.term} className="flex items-start gap-3">
                <Compass className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-[12.5px] font-mono font-semibold text-elec-yellow">
                    {item.term}
                  </span>
                  <p className="text-[12.5px] text-white/85 leading-relaxed">{item.definition}</p>
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
