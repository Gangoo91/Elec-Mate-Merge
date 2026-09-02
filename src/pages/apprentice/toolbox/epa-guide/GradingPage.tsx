/**
 * EPA · GradingPage — editorial guide to AM2S results.
 *
 * The AM2S is assessed on a competence basis (Pass / Fail). What a pass
 * demonstrates, re-sits, results timeline, what passing means for your
 * career, and the appeals process.
 */

import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Award, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { itemVariants } from '@/components/college/primitives';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { Eyebrow, SectionHeader } from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

interface GradeProfile {
  grade: string;
  icon: LucideIcon;
  description: string;
  signals: string[];
}

const gradeProfiles: GradeProfile[] = [
  {
    grade: 'What a pass demonstrates',
    icon: CheckCircle2,
    description:
      'A pass means you have met the standard required of a competent electrician across every section of the AM2S. You can work safely and competently and have completed your apprenticeship.',
    signals: [
      'Safe isolation — performed correctly and consistently, with proving dead and lock-off',
      'Composite installation — wired safely and to an acceptable standard from the drawings provided',
      'Inspection & testing — accurate results, correct sequence, certification completed properly',
      'Fault diagnosis — faults found and rectified using a logical, methodical approach',
      'Applied knowledge — the online test confirms your underpinning theory and BS 7671 knowledge',
    ],
  },
  {
    grade: 'Going beyond the minimum',
    icon: Award,
    description:
      'The AM2S confirms competence rather than awarding tiers — but the habits below are what mark out a strong, employable electrician and will serve you well throughout the assessment.',
    signals: [
      'Efficient, methodical working and high-quality, tidy workmanship',
      'Confident, automatic safe isolation that frees your attention for the task',
      'Clear reasoning when asked to explain a step — understanding why, not just how',
      'Calm, structured fault diagnosis under time pressure',
    ],
  },
];

const resitOptions = [
  {
    title: "You re-sit the part you didn't pass",
    description:
      "If you meet the standard in most sections but fall short in one, you re-sit that section — you don't redo the whole AM2S.",
  },
  {
    title: 'Re-sit funding',
    description:
      "A re-sit is normally supported within the apprenticeship's £23,000 funding band. Your training provider confirms the arrangements with you and NET.",
  },
  {
    title: 'Re-sit timing',
    description:
      "Re-sits are arranged once you've had additional support. Your training provider books the re-sit with NET.",
  },
  {
    title: 'Re-sit the section you fell short in',
    description:
      "You re-sit the part of the AM2S where you didn't meet the standard, not the whole assessment. NET and your training provider confirm the arrangements and timing.",
  },
  {
    title: 'Additional support before re-sit',
    description:
      "Training provider must provide additional training and support addressing the areas where you didn't meet the standard. Clear action plan expected.",
  },
  {
    title: 'Second failure',
    description:
      'If you fail a re-sit, a second re-sit may be possible but may require separate funding between your employer and training provider. Uncommon — most pass on re-sit.',
  },
];

const resultsCommunication = [
  {
    title: 'Timeline',
    description:
      'Your AM2S result is confirmed within a few weeks of your final section. NET passes the result to your training provider, who shares it with you.',
  },
  {
    title: 'Certificate',
    description:
      'Once you pass the AM2S and complete the standard, your training provider requests your apprenticeship certificate through the Department for Education apprenticeship service. Your official qualification — Level 3 Installation & Maintenance Electrician.',
  },
  {
    title: 'Certificate delivery',
    description:
      "Posted to your training provider, who passes it to you, typically a few weeks after your final result. Contact your provider if you haven't received it after 8 weeks.",
  },
  {
    title: 'What your certificate shows',
    description:
      'Your name, the apprenticeship standard, and the date of completion. Your AM2S pass is recorded by NET.',
  },
  {
    title: 'Digital records',
    description:
      'Completion is also recorded on the Apprenticeship Service (DAS). Your employer can verify it through the system. Keep your own copies of your documentation.',
  },
];

const afterPassing = [
  'You are now a qualified Level 3 Installation & Maintenance Electrician',
  'Apply for your ECS Gold card at Electrician grade via ECS — they check your Level 3 qualification, AM2S pass, the 18th Edition (C&G 2382) certificate and a current ECS Health, Safety & Environmental assessment (Approved Electrician comes later, with experience and the 2391-52)',
  'Eligible to register with a competent person scheme (NICEIC or NAPIT) once you have the required experience',
  'Review your pay against the JIB ladder — on 2026 national rates the Electrician grade is £18.38/hr (about £35,800 a year on a 37.5-hour week), Approved Electrician £20.08/hr and Technician £22.70/hr (about £44,300)',
  'Consider next steps — specialisation, further qualifications (Level 4 Design & Verification 2396, or the C&G 2382 Regs update for BS 7671:2018+A4:2026), or self-employment',
  'Keep CPD up to date — regulations change, staying current is essential for your career',
];

const careerMeaning = [
  {
    title: 'A pass is a full qualification',
    description:
      'Passing the AM2S and completing the standard makes you a qualified Level 3 electrician — the recognised industry benchmark.',
  },
  {
    title: 'Employers value the qualification and the AM2S',
    description:
      'The AM2S is the assessment employers and the JIB recognise. Your practical skills, attitude, and work ethic then matter most day-to-day.',
  },
  {
    title: 'Your competence is what opens doors',
    description:
      'New jobs, promotions, and further training build on the competence the AM2S confirms. Keep developing it after you qualify.',
  },
  {
    title: 'The ECS Gold card follows your qualification',
    description:
      'Your JIB Approved Electrician (ECS Gold) card is based on your Level 3 qualification and AM2S pass — apply through ECS once you complete.',
  },
  {
    title: 'Competent person scheme registration',
    description:
      'NICEIC and NAPIT registration is based on your qualifications and experience. Your AM2S pass and Level 3 qualification are the starting point.',
  },
];

const appealSteps = [
  {
    step: 1,
    title: 'Informal review',
    description:
      'Discuss the result with your training provider. They can request a breakdown of marks and identify grounds for appeal.',
  },
  {
    step: 2,
    title: 'Formal appeal to NET',
    description:
      'With grounds, your training provider submits a formal appeal to NET within the specified timeframe (usually 10–20 working days).',
  },
  {
    step: 3,
    title: 'NET review',
    description:
      'NET reviews the assessment evidence, assessor notes, and your appeal. It may re-assess your work or arrange re-assessment with a different assessor.',
  },
  {
    step: 4,
    title: 'Outcome',
    description:
      'A written response explaining the outcome. If upheld, the result may be changed or a re-assessment arranged at no additional cost.',
  },
];

const GradingPage = () => {
  return (
    <HubPage>
      <HubMasthead
        section="Apprentice · EPA"
        title="Grading & results"
        backTo="/apprentice/toolbox/end-point-assessment"
      />
      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          {
            'The AM2S is assessed on a competence basis — you pass when you meet the required standard across every section. What a pass demonstrates, re-sit options if needed, and what passing means for your career.'
          }
        </p>

        {/* ── How grading works ───────────────────────────────────── */}
        <motion.div variants={itemVariants}>
          <div
            className={cn(
              'rounded-2xl border border-elec-yellow/35 p-4 sm:p-5 space-y-3',
              CARD_SURFACE
            )}
          >
            <Eyebrow>How your result is determined</Eyebrow>
            <p className="text-[13.5px] text-white leading-relaxed">
              The AM2S is assessed against the required competence standard across all its sections.
              You must meet the standard in every section — falling short in one (for example an
              unsafe isolation) means you don&rsquo;t pass and will need to re-sit that part.
            </p>
            <div className="rounded-md border border-elec-yellow/20 bg-white/[0.05] p-3">
              <p className="text-[12.5px] text-white leading-relaxed">
                <span className="font-semibold text-elec-yellow">Important:</span> NET confirms the
                exact assessment criteria and what counts as meeting the standard. The descriptions
                below are general guidance — your training provider can talk you through the detail.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Grade profiles ──────────────────────────────────────── */}
        <motion.section variants={itemVariants} className="space-y-3">
          <SectionHeader
            eyebrow="What a pass looks like"
            title="Competence, section by section"
            meta="Meet the standard across every section to pass"
          />
          <ul className="space-y-2.5">
            {gradeProfiles.map((profile) => {
              const Icon = profile.icon;
              return (
                <li
                  key={profile.grade}
                  className={cn(
                    'rounded-2xl border border-elec-yellow/35 p-4 sm:p-5 space-y-3',
                    CARD_SURFACE
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                    <h3 className="text-[14px] font-semibold text-elec-yellow tracking-tight">
                      {profile.grade}
                    </h3>
                  </div>
                  <p className="text-[13.5px] text-white leading-relaxed">
                    {profile.description}
                  </p>
                  <div className="space-y-2 pt-2 border-t border-white/[0.04]">
                    <Eyebrow>What it looks like</Eyebrow>
                    <ul className="space-y-1.5">
                      {profile.signals.map((s) => (
                        <li
                          key={s}
                          className="flex items-start gap-2 text-[12.5px] text-white leading-relaxed"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </motion.section>

        {/* ── Re-sits ─────────────────────────────────────────────── */}
        <motion.section variants={itemVariants} className="space-y-3">
          <SectionHeader
            eyebrow="If you don't pass"
            title="Six things to know about re-sits"
            meta="It happens — there's a clear process"
          />
          <ul className="space-y-2">
            {resitOptions.map((item) => (
              <li
                key={item.title}
                className={cn('rounded-2xl border border-elec-yellow/35 p-4 sm:p-5', CARD_SURFACE)}
              >
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="h-4 w-4 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h3 className="text-[14px] font-semibold text-elec-yellow tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-white leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* ── Results ─────────────────────────────────────────────── */}
        <motion.section variants={itemVariants} className="space-y-3">
          <SectionHeader
            eyebrow="Receiving your results"
            title="From assessment to certificate"
            meta="Five things to know about the post-EPA process"
          />
          <ul className="space-y-2">
            {resultsCommunication.map((item) => (
              <li
                key={item.title}
                className={cn('rounded-2xl border border-elec-yellow/35 p-4 sm:p-5', CARD_SURFACE)}
              >
                <h3 className="text-[14px] font-semibold text-white tracking-tight">
                  {item.title}
                </h3>
                <p className="text-[13px] text-white leading-relaxed mt-1">{item.description}</p>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* ── After passing ───────────────────────────────────────── */}
        <motion.section variants={itemVariants} className="space-y-3">
          <SectionHeader
            eyebrow="After you pass"
            title="Six next steps"
            meta="Your career begins the moment your grade lands"
          />
          <div className={cn('rounded-2xl border border-elec-yellow/35 p-4 sm:p-5', CARD_SURFACE)}>
            <ul className="space-y-2">
              {afterPassing.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[13px] text-white leading-relaxed"
                >
                  <Sparkles className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* ── Career meaning ──────────────────────────────────────── */}
        <motion.section variants={itemVariants} className="space-y-3">
          <SectionHeader
            eyebrow="What passing means for your career"
            title="Five honest truths"
            meta="Passing is the benchmark — what you build on it is up to you"
          />
          <ul className="space-y-2">
            {careerMeaning.map((item) => (
              <li
                key={item.title}
                className={cn('rounded-2xl border border-elec-yellow/35 p-4 sm:p-5', CARD_SURFACE)}
              >
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h3 className="text-[14px] font-semibold text-elec-yellow tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-white leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* ── Appeals ─────────────────────────────────────────────── */}
        <motion.section variants={itemVariants} className="space-y-3">
          <SectionHeader
            eyebrow="Appeals process"
            title="Four steps if you believe the result is unfair"
            meta="Procedural grounds, mitigating circumstances, or assessor bias"
          />
          <ol className="space-y-2">
            {appealSteps.map((item) => (
              <li
                key={item.step}
                className={cn('rounded-2xl border border-elec-yellow/35 p-4 sm:p-5', CARD_SURFACE)}
              >
                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-md border border-elec-yellow/30 bg-white/[0.05] text-[12px] font-mono font-semibold tabular-nums text-elec-yellow flex-shrink-0">
                    {item.step}
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-[14px] font-semibold text-white tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-white leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <div className="rounded-md border border-elec-yellow/20 bg-white/[0.05] p-3">
            <p className="text-[12.5px] text-white leading-relaxed">
              <span className="font-semibold text-elec-yellow">Grounds for appeal:</span> procedural
              errors (assessment not conducted properly), mitigating circumstances (illness,
              disruption during assessment), or evidence of assessor bias. You can&rsquo;t appeal
              simply because you disagree with the grade — there must be specific grounds.
            </p>
          </div>
        </motion.section>
      </HubBody>
    </HubPage>
  );
};

export default GradingPage;
