/**
 * Funding · YourRightsPage — editorial guide to apprentice funding rights.
 *
 * 8 rights you have, 10 red flags, escalation steps, complaint template,
 * official links.
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  Scale,
  Phone,
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

const rights = [
  {
    title: 'Free training guaranteed by law',
    description:
      'Your apprenticeship training must be fully funded. You should never be asked to pay any training fees. Non-negotiable ESFA funding rule.',
  },
  {
    title: 'No deductions from wages',
    description:
      'Your employer cannot deduct training costs from your wages. This includes any contribution towards co-investment — employer\'s responsibility, not yours.',
  },
  {
    title: 'Funded End Point Assessment',
    description:
      'Your EPA is included in the funding band. Neither you nor your employer should be paying the EPAO separately — it comes out of the £23,000.',
  },
  {
    title: 'Funded learning materials',
    description:
      'Your training provider must provide all learning materials. You shouldn\'t be asked to buy textbooks, workbooks, online access, or study materials separately.',
  },
  {
    title: 'Employer covers co-investment',
    description:
      'If your employer is a non-levy SME, they pay the 5% co-investment (max £1,150 for Level 3). Must never be passed on to you in any form.',
  },
  {
    title: 'No additional provider fees',
    description:
      'Your training provider cannot charge additional fees for registration, assessment, materials, or certification. Everything is covered by the funding band.',
  },
  {
    title: 'AM2 assessment is funded',
    description:
      'Your AM2 practical at a NET centre is part of your apprenticeship and covered by the funding band. You should not be asked to pay separately.',
  },
  {
    title: 'Functional Skills are funded',
    description:
      'If you need Functional Skills in English or Maths, these are fully funded. You shouldn\'t be charged for Functional Skills exams or tuition.',
  },
];

const warningSignals = [
  'Being asked to pay any amount towards your training fees',
  'Wage deductions labelled "training contribution" or "course fees"',
  'Being asked to buy textbooks, workbooks, or online course access',
  'Being told you must pay for your AM2 assessment or EPA',
  'Employer saying they\'ll "take it out of your wages" for college costs',
  'Training provider asking for a "registration fee" or "admin fee"',
  'Being asked to sign a loan agreement for training costs',
  'Being told you must repay training costs if you leave early',
  'Employer deducting travel costs to college without agreement',
  'Any payment request that isn\'t clearly for personal items (own tools, clothing)',
];

const escalation = [
  {
    step: 1,
    title: 'Document the issue',
    description:
      'Write down exactly what happened — dates, amounts, who asked you to pay, evidence (emails, texts, payslips). Screenshot everything. Keep copies somewhere safe outside of work.',
  },
  {
    step: 2,
    title: 'Contact your training provider',
    description:
      'Raise the issue with your training provider first. They have a duty to ensure funding rules are followed. Ask to speak to the apprenticeship manager or compliance team.',
  },
  {
    step: 3,
    title: 'Report to ESFA',
    description:
      'Email complaints.esfa@education.gov.uk with your evidence. Include apprenticeship details, employer name, training provider name, and a clear description.',
  },
  {
    step: 4,
    title: 'National Apprenticeship Helpline',
    description:
      'Call 0800 015 0400 (free, Mon–Fri 8am–8pm). They can advise on your rights and next steps, and escalate your complaint if needed.',
  },
  {
    step: 5,
    title: 'Citizens Advice',
    description:
      'Contact Citizens Advice for free, independent guidance on your employment and training rights. Local bureaux at citizensadvice.org.uk.',
  },
  {
    step: 6,
    title: 'ACAS',
    description:
      'Contact ACAS on 0300 123 1100 for employment-related advice if the issue involves wage deductions, contractual problems, or unfair treatment.',
  },
];

const complaintTemplate = [
  'Your full name and contact details',
  'Your employer name and address',
  'Your training provider name',
  'Your apprenticeship standard and start date',
  'What happened — clear description of the issue',
  'When it happened — specific dates',
  'Who was involved — names and roles',
  'What amount was requested or deducted',
  'Evidence — copies of emails, texts, payslips, letters, screenshots',
  'What you want to happen — the outcome you are seeking',
];

const links = [
  {
    title: 'Gov.uk apprenticeships',
    description: 'Official government guide to apprenticeships',
    url: 'https://www.gov.uk/topic/further-education-skills/apprenticeships',
  },
  {
    title: 'ESFA funding rules',
    description: 'Full apprenticeship funding rules and guidance',
    url: 'https://www.gov.uk/guidance/apprenticeship-funding-rules',
  },
  {
    title: 'CITB grants portal',
    description: 'Apply for and track CITB grants',
    url: 'https://www.citb.co.uk/levy-grants-and-funding/grants-and-funding/',
  },
  {
    title: 'Find an apprenticeship',
    description: 'Search for apprenticeship vacancies',
    url: 'https://www.findapprenticeship.service.gov.uk/',
  },
  {
    title: 'National Apprenticeship Service',
    description: 'Support for apprentices and employers',
    url: 'https://www.gov.uk/apply-apprenticeship',
  },
  {
    title: 'Citizens Advice',
    description: 'Free independent employment advice',
    url: 'https://www.citizensadvice.org.uk/',
  },
  {
    title: 'ACAS',
    description: 'Employment rights and dispute resolution',
    url: 'https://www.acas.org.uk/',
  },
];

const YourRightsPage = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <button
          onClick={() => navigate('/apprentice/toolbox/apprenticeship-funding')}
          className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Rights"
          title="Your funding rights"
          description="What you should never have to pay for, the warning signs, and the escalation route if your training provider or employer breaks the ESFA rules."
          tone="yellow"
        />
      </motion.div>

      {/* ── Key message ─────────────────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 space-y-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-300 flex-shrink-0" />
            <Eyebrow className="text-red-300">The headline</Eyebrow>
          </div>
          <p className="text-[15px] font-semibold text-red-300 leading-snug">
            You should NEVER be asked to pay for your training.
          </p>
          <p className="text-[13px] text-white/85 leading-relaxed">
            Apprenticeship training is funded by the government and/or your
            employer. If anyone asks you to pay, this is a breach of ESFA funding
            rules — and should be reported.
          </p>
        </div>
      </motion.div>

      {/* ── Link to Rights & Pay ────────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <button
          onClick={() => navigate('/apprentice/rights-and-pay')}
          className="w-full flex items-center gap-3 p-4 rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04] active:bg-elec-yellow/[0.08] active:scale-[0.99] transition-all touch-manipulation text-left"
        >
          <Scale className="h-4 w-4 text-elec-yellow flex-shrink-0" />
          <div className="flex-1 min-w-0 space-y-0.5">
            <Eyebrow className="text-elec-yellow/85">Full guide</Eyebrow>
            <p className="text-[13.5px] font-medium text-white leading-snug">
              Rights & Pay — wages, employment rights, support resources & tools
            </p>
          </div>
          <ChevronRight className="h-4 w-4 text-white/40 flex-shrink-0" />
        </button>
      </motion.div>

      {/* ── Your funding rights ─────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Your funding rights"
          title="Eight things the law guarantees"
          meta="Print these. Save them. Show them to anyone who tries to charge you."
        />
        <ul className="space-y-2">
          {rights.map((right) => (
            <li
              key={right.title}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5"
            >
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="text-[14px] font-semibold text-elec-yellow tracking-tight">
                    {right.title}
                  </h3>
                  <p className="text-[13px] text-white/85 leading-relaxed">
                    {right.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── Warning signals ─────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Warning signs — red flags"
          title={`${warningSignals.length} situations to escalate`}
          meta="If any of these happen, your funding rights may be being breached"
        />
        <div className="rounded-xl border border-red-500/25 bg-red-500/[0.04] p-4 sm:p-5">
          <ul className="space-y-2">
            {warningSignals.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-[13px] text-white/85 leading-relaxed"
              >
                <AlertTriangle className="h-3.5 w-3.5 text-red-300 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* ── Complaint template ──────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="What to include in a complaint"
          title="10 items for ESFA"
          meta="Build the file before you escalate"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3">
          <ul className="space-y-1.5">
            {complaintTemplate.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-[13px] text-white/85 leading-relaxed"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 space-y-1">
            <p className="text-[12.5px] text-white/85 leading-relaxed">
              <span className="font-semibold text-elec-yellow">Email to:</span>{' '}
              <span className="font-mono">complaints.esfa@education.gov.uk</span>
            </p>
            <p className="text-[12.5px] text-white/85 leading-relaxed">
              <span className="font-semibold text-elec-yellow">Or call:</span>{' '}
              <span className="font-mono">0800 015 0400</span> (free, Mon–Fri 8am–8pm)
            </p>
          </div>
        </div>
      </motion.section>

      {/* ── Escalation ──────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Escalation steps"
          title="Six escalation routes — in order"
          meta="Start internal, build evidence, then escalate externally"
        />
        <ol className="space-y-2">
          {escalation.map((item) => (
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

      {/* ── Useful links ────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Useful links"
          title={`${links.length} official resources`}
          meta="All open in a new tab"
        />
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.title}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full p-4 rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] active:bg-white/[0.04] active:scale-[0.99] transition-all touch-manipulation"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <ExternalLink className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0 space-y-0.5">
                      <p className="text-[14px] font-semibold text-elec-yellow tracking-tight">
                        {link.title}
                      </p>
                      <p className="text-[12.5px] text-white/70 leading-relaxed">
                        {link.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-white/40 flex-shrink-0" />
                </div>
              </a>
            </li>
          ))}
        </ul>
      </motion.section>

      <span className="hidden">
        <Phone />
      </span>
    </PageFrame>
  );
};

export default YourRightsPage;
