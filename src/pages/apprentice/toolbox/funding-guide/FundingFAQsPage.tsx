/**
 * Funding · FundingFAQsPage — editorial FAQs and glossary.
 *
 * 20 funding FAQs + 25-term glossary covering apprenticeship funding,
 * ESFA rules, levy mechanics, CITB grants, EPA funding, and the
 * incoming Growth & Skills Levy.
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Compass, HelpCircle } from 'lucide-react';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';
import {
  Eyebrow,
  SectionHeader,
} from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';

const faqs = [
  {
    question: 'Who pays for my apprenticeship training?',
    answer:
      'Your training is funded by the government and/or your employer — never by you. Large employers pay through the Apprenticeship Levy. Smaller employers pay 5% (government covers 95%). In some cases, levy transfer means 100% is covered. You should never be asked to contribute.',
  },
  {
    question: 'What does the funding actually cover?',
    answer:
      'The £23,000 funding band covers all training delivery, EPA, qualification registration (EAL/C&G), AM2 assessment, Functional Skills if needed, and learning materials. It does not cover your wages, travel, personal tools, or qualifications beyond the standard.',
  },
  {
    question: 'What is the funding band for electrical apprenticeships?',
    answer:
      'The current funding band for Level 3 Installation / Maintenance Electrician (ST0152 v1.2) is £23,000. Increased from £21,000 on 20 July 2025 by Skills England. The band sets the maximum government contribution.',
  },
  {
    question: 'Can my employer claim CITB grants?',
    answer:
      'Yes, if registered with CITB and paying the levy. Grants total up to £13,500 over 4 years: £2,500/year attendance grant (paid quarterly) plus a £3,500 completion bonus. Employer submits claims through the CITB grants portal.',
  },
  {
    question: 'What if I am over 25?',
    answer:
      'You can do an apprenticeship at any age. Funding works the same way — co-investment (95% / 5%) applies regardless. The £1,000 age incentive only applies to 16–18 year olds (or 19–25 with EHC plan / care leaver). From August 2026, under-25s at non-levy employers will be 100% funded.',
  },
  {
    question: 'Can I be asked to pay for my training?',
    answer:
      'No. Under ESFA funding rules, apprentices must never be asked to pay. This includes direct payments, wage deductions, or funding any part of the programme. Report it to complaints.esfa@education.gov.uk or call 0800 015 0400.',
  },
  {
    question: 'What happens if I change employers?',
    answer:
      'Your apprenticeship can continue with a new employer, but there will be a break in learning while the transfer is arranged. New employer must agree to support the apprenticeship; new training agreement needed. Funding follows the apprentice, not the employer.',
  },
  {
    question: 'How is the funding paid?',
    answer:
      'Funding is paid directly to the training provider by ESFA — not to you or your employer. Levy employers draw from their DAS account monthly. For co-investment, the government pays its share directly and the employer pays the 5% to the training provider.',
  },
  {
    question: 'What if my employer goes out of business?',
    answer:
      'Your apprenticeship does not end — your training provider helps find a new employer. National Apprenticeship Service can also help. You\'re entitled to continue and complete with a new employer. Training records transfer with you.',
  },
  {
    question: 'Are there any hidden costs?',
    answer:
      'There should be no hidden costs for the apprentice. All training, assessment, and qualification fees are covered. Your employer pays wages and may need to pay 5% co-investment (max £1,150 for Level 3). Some employers cover travel — check your contract.',
  },
  {
    question: 'What is the Growth & Skills Levy?',
    answer:
      'Replacing the Apprenticeship Levy from April 2026. Key changes: levy funds expire after 12 months (not 24), 10% government top-up ends, and the levy will fund non-apprenticeship training too. Co-investment changes to 75% / 25% from August 2026, but under-25s at non-levy employers will be 100% funded.',
  },
  {
    question: 'Do I need Functional Skills qualifications?',
    answer:
      'If you have GCSE English and Maths at grade 4 or above (or equivalent), no. Otherwise you\'ll study Functional Skills as part of your apprenticeship. Since August 2025, adults aged 19+ no longer need to sit the exams — they must study towards them, but passing is no longer a completion condition.',
  },
  {
    question: 'What is a levy transfer and how do I get one?',
    answer:
      'When a large employer transfers unused Apprenticeship Levy funds to another employer. Training is 100% funded — receiving employer pays nothing. Your training provider is the best person to ask about available transfers.',
  },
  {
    question: 'What is the Digital Apprenticeship Service (DAS)?',
    answer:
      'The government online system at apprenticeships.education.gov.uk where employers manage apprenticeship funding. Levy employers spend levy funds, non-levy reserve co-investment. Your employer manages this — you don\'t need to use it directly.',
  },
  {
    question: 'What happens during a break in learning?',
    answer:
      'A formal pause in your apprenticeship — long-term sickness, maternity/paternity, personal circumstances. Provider notifies ESFA, funding pauses, end date extended by length of break. You don\'t lose progress or funding. Arrange a formal break rather than just stopping.',
  },
  {
    question: 'What are my rights if I am made redundant?',
    answer:
      'Your training provider must help you find a new employer; you get 12 weeks to find one (funded by ESFA). If within 6 months of EPA you may be able to complete without an employer. National Apprenticeship Service redundancy helpline: 0800 015 0400.',
  },
  {
    question: 'Can I complain about my training provider?',
    answer:
      'Yes. Raise it directly with the provider first. If unresolved, escalate to ESFA at complaints.esfa@education.gov.uk. Check your provider\'s Ofsted report. If about quality of training, contact Ofsted directly.',
  },
  {
    question: 'What am I entitled to be paid?',
    answer:
      'First year (or under 19): at least the apprentice minimum wage (£7.55/hr from April 2025). After Year 1: at least the National Minimum Wage for your age. Many electrical employers pay above minimum — check your contract.',
  },
  {
    question: 'Can I resit my EPA if I fail?',
    answer:
      'Yes. One free resit per component, funded within the original funding band. Training provider arranges additional support. Resit within 3 months of original result. If you fail a second time, additional resits may require separate funding.',
  },
  {
    question: 'Can I switch from Installation to Maintenance Electrician?',
    answer:
      'Both pathways fall under the same standard (ST0152 v1.2) and the same £23,000 funding band. Switching is possible but must be agreed by your employer, training provider, and you. May affect your training plan and EPA route.',
  },
];

const glossary = [
  { term: 'Apprenticeship Levy', definition: 'A tax of 0.5% paid by employers with an annual pay bill over £3 million, used to fund apprenticeship training.' },
  { term: 'Co-Investment', definition: 'The cost-sharing model for non-levy employers: government pays 95%, employer pays 5% of training costs.' },
  { term: 'CITB', definition: 'Construction Industry Training Board — provides grants to registered construction employers for apprenticeship training.' },
  { term: 'DAS', definition: 'Digital Apprenticeship Service — the government online portal where employers manage funding, providers, and apprentices.' },
  { term: 'ESFA', definition: 'Education and Skills Funding Agency — the government body that manages and regulates apprenticeship funding in England.' },
  { term: 'Skills England', definition: 'Replaced IfATE in June 2025; responsible for apprenticeship standards and skills policy.' },
  { term: 'EPA', definition: 'End Point Assessment — final independent assessment at the end of your apprenticeship.' },
  { term: 'EPAO', definition: 'End Point Assessment Organisation — the independent body that carries out your EPA.' },
  { term: 'Funding Band', definition: 'Maximum amount the government will contribute towards apprenticeship training. Level 3 Electrical is £23,000 (from July 2025).' },
  { term: 'Gateway', definition: 'The formal readiness check before EPA — employer, training provider, and you must agree you\'re ready.' },
  { term: 'Growth & Skills Levy', definition: 'Replacing the Apprenticeship Levy from April 2026; will also fund non-apprenticeship training, 12-month expiry.' },
  { term: 'Levy Transfer', definition: 'When a levy-paying employer transfers up to 50% of their annual levy funds to another employer.' },
  { term: 'Training Provider', definition: 'The college or independent provider that delivers your training programme.' },
  { term: 'ST0152', definition: 'Apprenticeship standard reference for Level 3 Installation / Maintenance Electrician (v1.2 current).' },
  { term: 'NAS', definition: 'National Apprenticeship Service — supports employers and apprentices, including vacancy service and redundancy support.' },
  { term: 'Functional Skills', definition: 'English and Maths qualifications required if you don\'t have GCSE grade 4+. Adults 19+ exempt from exam requirement since Aug 2025.' },
  { term: 'KSB', definition: 'Knowledge, Skills, and Behaviours — the three areas in your apprenticeship standard you must demonstrate.' },
  { term: 'NMW', definition: 'National Minimum Wage — legal minimum hourly rate. Apprentices have a separate lower rate in their first year.' },
  { term: 'Ofsted', definition: 'Office for Standards in Education — inspects and rates training providers. Look for Good or Outstanding.' },
  { term: 'AM2', definition: 'Practical assessment run by NET that tests installation competence. Required for Level 3 electrical apprenticeships.' },
  { term: 'BS 7671', definition: 'The IET Wiring Regulations (18th Edition + amendments) — the national standard for electrical installations.' },
  { term: 'NI Relief', definition: 'Employer National Insurance relief — employers pay zero NI for apprentices under 25, saving ~£2,000–£3,000/year.' },
  { term: 'Break in Learning', definition: 'A formal pause (e.g. long-term sickness, maternity). End date extended, funding paused — not lost.' },
  { term: 'Commitment Statement', definition: 'Document signed by you, employer, and training provider at the start, setting out responsibilities.' },
  { term: 'Progress Review', definition: 'Regular meetings (minimum every 12 weeks) between you, employer, and training provider to review development.' },
];

const FundingFAQsPage = () => {
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
          eyebrow="Apprentice · Funding"
          title="FAQs & glossary"
          description="The questions that keep coming up, plus 25 funding terms worth knowing."
          tone="yellow"
        />
      </motion.div>

      {/* ── FAQs ────────────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Frequently asked"
          title={`${faqs.length} questions, answered`}
          meta="ESFA rules, levy, CITB grants, redundancy, resits"
        />
        <ul className="space-y-2">
          {faqs.map((faq) => (
            <li
              key={faq.question}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-1.5"
            >
              <div className="flex items-start gap-2">
                <HelpCircle className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                <h3 className="text-[13.5px] font-semibold text-white tracking-tight">
                  {faq.question}
                </h3>
              </div>
              <p className="text-[12.5px] text-white/85 leading-relaxed pl-5">
                {faq.answer}
              </p>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── Glossary ────────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Glossary"
          title={`${glossary.length} funding terms`}
          meta="Bookmark this — apprenticeship admin uses these every day"
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

export default FundingFAQsPage;
