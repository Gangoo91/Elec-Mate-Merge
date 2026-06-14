import { ArrowLeft } from 'lucide-react';

const faqs = [
  {
    question: 'How many hours of OJT do I need?',
    answer:
      'Since August 2025, it is no longer a flat 20% — your training plan specifies a fixed number of hours set by your apprenticeship standard. For an Installation & Maintenance Electrician (ST0152) that is 1,066 hours, with an absolute floor of 187 hours that delivery can never fall below. Ask your training provider for your exact figure.',
  },
  {
    question: 'Does college count as OJT?',
    answer:
      'Yes — time spent at college (theory, workshops, assessments) counts as OJT, provided it is within your paid working hours and directly relevant to your apprenticeship standard.',
  },
  {
    question: 'Can my employer cancel my college day because we are busy on site?',
    answer:
      'No. Your employer is legally obligated to release you for OJT. Workload is not an acceptable reason to cancel training. If this happens regularly, document it and raise it with your training provider.',
  },
  {
    question: 'Do evening classes count?',
    answer:
      'Only if they fall within your contracted, paid working hours. Unpaid evening study outside your normal hours does not count towards your OJT requirement.',
  },
  {
    question: 'What if I miss OJT because I am off sick?',
    answer:
      'Sickness absence does not count as OJT. You will need to make up the hours when you return. Speak to your training provider about catch-up options. Extended absence may require a break in learning.',
  },
  {
    question: 'Can I do OJT at home?',
    answer:
      'Online learning and research during your paid working hours can count, provided it is planned, logged, and relevant to your standard. Casual browsing does not qualify.',
  },
  {
    question: 'What happens if I do not complete my OJT hours?',
    answer:
      'You cannot pass through gateway to your EPA until your hours are complete. Incomplete hours may delay your apprenticeship. In serious cases, your training provider may pause your programme.',
  },
  {
    question: 'Who tracks my OJT hours?',
    answer:
      'Ultimately, you are responsible for logging your hours. Your training provider should verify them, but do not assume they are tracking everything for you. Keep your own records from day one.',
  },
  {
    question: 'What is the difference between OJT and on-the-job training?',
    answer:
      'OJT (off-the-job) is structured learning AWAY from your normal work duties — college, workshops, online modules. On-the-job training is learning that happens while doing productive work on site. Both are important, but only OJT counts towards your required training hours.',
  },
  {
    question: 'Can learning on site ever count as OJT?',
    answer:
      'Yes, but only if it is a structured teaching session separate from productive work. For example, a planned session where your supervisor teaches you cable sizing calculations in the site cabin counts. Learning while doing normal wiring work does not.',
  },
  {
    question: 'What is gateway?',
    answer:
      'Gateway is the formal check before your EPA. Your employer, training provider, and you must all agree you are ready. You need completed OJT hours, a portfolio, Level 2 English and Maths, and all required qualifications.',
  },
  {
    question: 'What grade can I get in my EPA?',
    answer:
      'Pass, Merit, or Distinction. For an Installation & Maintenance Electrician (ST0152) the EPA is the integrated AM2S — a single assessment covering installation, inspection & testing, safe isolation, fault diagnosis, and an online knowledge test. A fail in any single section fails the whole AM2S, so you must pass every element.',
  },
  {
    question: 'Can I change my training provider during my apprenticeship?',
    answer:
      'Yes, but it is a complex process. If you are unhappy with your provider, raise concerns first. If the issues cannot be resolved, speak to your employer about transferring to a new provider.',
  },
  {
    question: 'What is ST0152?',
    answer:
      'ST0152 is the apprenticeship standard reference number for the Installation & Maintenance Electrician apprenticeship at Level 3. Check the live version on the Skills England standard page — a temporary dispensation has kept the earlier version live for apprentices still on it.',
  },
  {
    question: 'How much should I be paid?',
    answer:
      'The apprentice National Minimum Wage is £8.00 per hour from 1 April 2026. This minimum applies to apprentices aged under 19, or aged 19+ in the first year of the apprenticeship. Once you are 19+ and past your first year you must be paid at least the age-appropriate National Minimum Wage, and apprentices aged 21+ must get at least the National Living Wage. Many electrical apprentices are paid above the minimum on JIB rates.',
  },
];

const glossary = [
  {
    term: 'OJT',
    definition:
      'Off-the-Job Training — structured learning away from normal work duties during paid hours',
  },
  {
    term: 'EPA',
    definition: 'End Point Assessment — the final assessment at the end of your apprenticeship',
  },
  {
    term: 'KSB',
    definition:
      'Knowledge, Skills, and Behaviours — the three areas assessed in your apprenticeship standard',
  },
  {
    term: 'ESFA',
    definition:
      'Education and Skills Funding Agency — the former government body that funded apprenticeships; it merged into the Department for Education in 2025, with apprenticeship policy now under Skills England',
  },
  { term: 'Gateway', definition: 'The formal readiness check before you can sit your EPA' },
  {
    term: 'ST0152',
    definition:
      'The reference number for the Installation Electrician / Maintenance Electrician apprenticeship standard',
  },
  {
    term: 'AM2S',
    definition:
      'The integrated practical assessment run by NET that forms the End Point Assessment for ST0152 — installation, inspection & testing, safe isolation, fault diagnosis, and an online knowledge test in one assessment',
  },
  {
    term: 'BS 7671',
    definition:
      'The IET Wiring Regulations — the national standard for electrical installations in the UK',
  },
  {
    term: 'EPAO',
    definition:
      'End Point Assessment Organisation — the independent body that carries out your EPA',
  },
  {
    term: 'Skills England',
    definition:
      'The new government body (replacing part of IfATE) responsible for apprenticeship standards and skills policy',
  },
  {
    term: 'Training Plan',
    definition: 'The document that sets out your planned OJT hours, activities, and timeline',
  },
  {
    term: 'Progress Review',
    definition:
      'Regular meetings (minimum 12-weekly) between you, your employer, and your training provider to check development',
  },
  {
    term: 'Levy',
    definition:
      'The Apprenticeship Levy — paid by employers with an annual pay bill over £3 million, now operating within the Growth & Skills Levy reforms (2025/26)',
  },
  {
    term: 'Co-investment',
    definition:
      'Government funding for non-levy employers: government pays 95% and the employer 5% for many starts, but apprentices under 25 at non-levy SMEs are 100% government-funded (from 1 Aug 2026), and employers with fewer than 50 staff are often 100% funded',
  },
  {
    term: 'Break in Learning',
    definition:
      'A formal pause in your apprenticeship (e.g. due to long-term sickness or maternity). Your end date is extended.',
  },
  {
    term: 'Initial Assessment',
    definition:
      'The assessment at the start of your apprenticeship that identifies your prior learning and sets your training plan',
  },
  {
    term: 'Functional Skills',
    definition:
      'English and Maths qualifications at Level 2 — required for apprenticeship completion if you do not already have GCSEs grade 4+',
  },
];
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageFrame, PageHero, SectionHeader, itemVariants } from '@/components/college/primitives';

const FAQsPage = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <button
          onClick={() => navigate('/apprentice/toolbox/off-job-training-guide')}
          className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero eyebrow="Apprentice · OJT" title="FAQs & Glossary" tone="yellow" />
      </motion.div>

      {/* FAQs */}
      <div className="space-y-3">
        <SectionHeader eyebrow="Reference" title="Frequently asked questions" />

        {faqs.map((faq) => (
          <div
            key={faq.question}
            className="sm:rounded-xl sm:border sm:border-elec-yellow/25 sm:bg-elec-yellow/[0.04]"
          >
            <div className="sm:p-5 py-4 space-y-2">
              <h3 className="font-medium text-elec-yellow text-sm">{faq.question}</h3>
              <p className="text-white text-sm">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Glossary */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between gap-3 pb-1">
          <div className="space-y-1 min-w-0">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Glossary of Terms
            </span>
          </div>
        </div>

        <div className="sm:rounded-xl sm:border sm:border-white/[0.06] sm:bg-[hsl(0_0%_10%)]">
          <div className="sm:p-5 space-y-3">
            {glossary.map((item) => (
              <div key={item.term} className="flex items-start gap-2">
                <span className="text-elec-yellow font-semibold text-sm min-w-[80px] flex-shrink-0">
                  {item.term}
                </span>
                <span className="text-white text-sm">{item.definition}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageFrame>
  );
};

export default FAQsPage;
