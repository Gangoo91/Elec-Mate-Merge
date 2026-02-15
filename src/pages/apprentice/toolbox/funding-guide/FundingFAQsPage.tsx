import { Card, CardContent } from '@/components/ui/card';
import { SmartBackButton } from '@/components/ui/smart-back-button';

const faqs = [
  {
    question: 'Who pays for my apprenticeship training?',
    answer:
      'Your training is funded by the government and/or your employer — never by you. Large employers pay through the Apprenticeship Levy. Smaller employers pay 5% of the cost (the government covers 95%). In some cases, levy transfer means 100% is covered. You should never be asked to contribute.',
  },
  {
    question: 'What does the funding actually cover?',
    answer:
      'The £23,000 funding band covers all training delivery, End Point Assessment (EPA), qualification registration (EAL/C&G), AM2 assessment, Functional Skills if needed, and learning materials from your training provider. It does not cover your wages, travel, personal tools, or additional qualifications beyond the standard.',
  },
  {
    question: 'What is the funding band for electrical apprenticeships?',
    answer:
      'The current funding band for Level 3 Installation Electrician / Maintenance Electrician (ST0152 v1.2) is £23,000. This was increased from £21,000 on 20 July 2025 by Skills England. The funding band sets the maximum amount the government will contribute towards your training.',
  },
  {
    question: 'Can my employer claim CITB grants?',
    answer:
      'Yes, if they are registered with CITB and paying the CITB levy. Grants total up to £13,500 over 4 years: £2,500 per year attendance grant (paid quarterly) plus a £3,500 completion bonus. The employer submits claims through the CITB grants portal.',
  },
  {
    question: 'What if I am over 25?',
    answer:
      'You can still do an apprenticeship at any age. Funding works the same way — the co-investment model (95% government / 5% employer) applies regardless of age. However, the £1,000 age incentive only applies to 16–18 year olds (or 19–25 with an EHC plan or care leaver status). From August 2026, under-25s at non-levy employers will be 100% funded.',
  },
  {
    question: 'Can I be asked to pay for my training?',
    answer:
      'No. Under ESFA funding rules, apprentices must never be asked to pay for their training. This includes direct payments, wage deductions, or being asked to fund any part of the programme. If this happens, report it to complaints.esfa@education.gov.uk or call 0800 015 0400.',
  },
  {
    question: 'What happens if I change employers?',
    answer:
      'Your apprenticeship can continue with a new employer, but there will be a break in learning while the transfer is arranged. Your new employer must agree to support the apprenticeship and a new training agreement is needed. Your training provider handles the paperwork. Funding continues — it follows the apprentice, not the employer.',
  },
  {
    question: 'How is the funding paid?',
    answer:
      'Funding is paid directly to the training provider by ESFA — not to you or your employer. For levy employers, funds are drawn from their digital apprenticeship service (DAS) account monthly. For co-investment, the government pays its share directly and the employer pays their 5% to the training provider.',
  },
  {
    question: 'What if my employer goes out of business?',
    answer:
      'Your apprenticeship does not end — your training provider will help you find a new employer. The National Apprenticeship Service can also help with redundancy support. You are entitled to continue your apprenticeship and complete it with a new employer. Your training records and progress transfer with you.',
  },
  {
    question: 'Are there any hidden costs?',
    answer:
      'There should be no hidden costs for the apprentice. All training, assessment, and qualification fees are covered by the funding band. Your employer pays your wages and may need to pay the 5% co-investment (maximum £1,150 for Level 3 Electrical). Some employers also cover travel costs — check your contract.',
  },
  {
    question: 'What is the Growth & Skills Levy?',
    answer:
      'The Growth & Skills Levy is replacing the Apprenticeship Levy from April 2026. Key changes include: levy funds will expire after 12 months (not 24), the 10% government top-up will end, and the levy will also fund non-apprenticeship training for the first time. Co-investment will change to 75% government / 25% employer from August 2026, but under-25s at non-levy employers will be 100% funded.',
  },
  {
    question: 'Do I need Functional Skills qualifications?',
    answer:
      'If you already have GCSE English and Maths at grade 4 or above (or equivalent), you do not need Functional Skills. If you do not have these, you will study Functional Skills as part of your apprenticeship. Since August 2025, adults aged 19 and over are no longer required to sit Functional Skills exams — they must study towards them, but passing the exam is no longer a condition of completing the apprenticeship.',
  },
  {
    question: 'What is a levy transfer and how do I get one?',
    answer:
      'A levy transfer is when a large employer transfers some of their unused Apprenticeship Levy funds to another employer. This means training is 100% funded — the receiving employer pays nothing. Your training provider is the best person to ask about available transfers. Many providers have relationships with levy-paying employers specifically for this purpose.',
  },
  {
    question: 'What is the Digital Apprenticeship Service (DAS)?',
    answer:
      'DAS is the government online system at apprenticeships.education.gov.uk where employers manage apprenticeship funding. Levy employers use it to spend their levy funds, non-levy employers use it to reserve co-investment funding, and it is where apprenticeship agreements are set up. Your employer manages this — you do not need to use it directly.',
  },
  {
    question: 'What happens during a break in learning?',
    answer:
      'A break in learning is a formal pause in your apprenticeship — for example, due to long-term sickness, maternity/paternity, or personal circumstances. Your training provider notifies the ESFA, funding pauses, and your end date is extended by the length of the break. You do not lose any progress or funding. Contact your training provider to arrange a formal break rather than just stopping.',
  },
  {
    question: 'What are my rights if I am made redundant?',
    answer:
      'If you are made redundant during your apprenticeship, you have rights: your training provider must help you find a new employer, you get 12 weeks to find one (funded by ESFA), and if you are within 6 months of your EPA you may be able to complete without an employer. The National Apprenticeship Service redundancy helpline is 0800 015 0400.',
  },
  {
    question: 'Can I complain about my training provider?',
    answer:
      'Yes. First raise the issue directly with your training provider using their complaints procedure. If unresolved, you can escalate to the ESFA at complaints.esfa@education.gov.uk. You can also check your provider\'s Ofsted report and leave feedback. If the issue is about quality of training, Ofsted can be contacted directly.',
  },
  {
    question: 'What am I entitled to be paid?',
    answer:
      'In your first year (or if under 19), you are entitled to at least the apprentice minimum wage (£7.55/hr from April 2025). After Year 1, you must be paid at least the National Minimum Wage for your age. Many electrical employers pay above minimum — check your contract. Visit the full Rights & Pay section for detailed wage information.',
  },
  {
    question: 'Can I resit my EPA if I fail?',
    answer:
      'Yes. If you fail any component of your EPA, you are entitled to one free resit funded within the original funding band. Your training provider should arrange additional support before your resit. The resit must be taken within 3 months of the original result. If you fail a second time, additional resits may require separate funding arrangements.',
  },
  {
    question: 'Can I switch from Installation to Maintenance Electrician (or vice versa)?',
    answer:
      'Both pathways fall under the same standard (ST0152 v1.2) and the same £23,000 funding band. Switching between them is possible but must be agreed by your employer, training provider, and you. It may affect your training plan and EPA route. Discuss with your training provider early if you are considering a change.',
  },
];

const glossary = [
  {
    term: 'Apprenticeship Levy',
    definition:
      'A tax of 0.5% paid by employers with an annual pay bill over £3 million, used to fund apprenticeship training.',
  },
  {
    term: 'Co-Investment',
    definition:
      'The cost-sharing model for non-levy employers: the government pays 95% and the employer pays 5% of training costs.',
  },
  {
    term: 'CITB',
    definition:
      'Construction Industry Training Board — provides grants to registered construction employers for apprenticeship training.',
  },
  {
    term: 'DAS',
    definition:
      'Digital Apprenticeship Service — the government online portal where employers manage apprenticeship funding, select providers, and add apprentices.',
  },
  {
    term: 'ESFA',
    definition:
      'Education and Skills Funding Agency — the government body that manages and regulates apprenticeship funding in England.',
  },
  {
    term: 'Skills England',
    definition:
      'The government body that replaced IfATE (Institute for Apprenticeships and Technical Education) in June 2025, responsible for apprenticeship standards and skills policy.',
  },
  {
    term: 'EPA',
    definition:
      'End Point Assessment — the final independent assessment at the end of your apprenticeship, consisting of knowledge test, practical assessment, and professional discussion.',
  },
  {
    term: 'EPAO',
    definition:
      'End Point Assessment Organisation — the independent body that carries out your EPA (e.g. Smart Assessor, City & Guilds).',
  },
  {
    term: 'Funding Band',
    definition:
      'The maximum amount the government will contribute towards apprenticeship training. Level 3 Electrical is £23,000 (from July 2025).',
  },
  {
    term: 'Gateway',
    definition:
      'The formal readiness check before EPA — your employer, training provider, and you must all agree you are ready to be assessed.',
  },
  {
    term: 'Growth & Skills Levy',
    definition:
      'The replacement for the Apprenticeship Levy from April 2026, which will also fund non-apprenticeship training and have a 12-month expiry.',
  },
  {
    term: 'Levy Transfer',
    definition:
      'When a levy-paying employer transfers up to 50% of their annual levy funds to another employer, providing 100% funded training.',
  },
  {
    term: 'Training Provider',
    definition:
      'The college or independent training provider that delivers your apprenticeship training programme and manages your learning.',
  },
  {
    term: 'ST0152',
    definition:
      'The apprenticeship standard reference number for Level 3 Installation Electrician / Maintenance Electrician (v1.2 is the current version).',
  },
  {
    term: 'NAS',
    definition:
      'National Apprenticeship Service — the government service that supports employers and apprentices, including the Find an Apprenticeship vacancy service and redundancy support.',
  },
  {
    term: 'Functional Skills',
    definition:
      'English and Maths qualifications required for apprenticeship completion if you do not have GCSE grade 4+. Adults 19+ are exempt from the exam requirement since August 2025.',
  },
  {
    term: 'KSB',
    definition:
      'Knowledge, Skills, and Behaviours — the three areas defined in your apprenticeship standard that you must demonstrate competence in.',
  },
  {
    term: 'NMW',
    definition:
      'National Minimum Wage — the legal minimum hourly rate, which varies by age. Apprentices have a separate (lower) rate in their first year.',
  },
  {
    term: 'Ofsted',
    definition:
      'Office for Standards in Education — inspects and rates training providers. Look for Good or Outstanding ratings when choosing a provider.',
  },
  {
    term: 'AM2',
    definition:
      'The practical assessment run by NET (National Electrotechnical Training) that tests installation competence. Required for Level 3 electrical apprenticeships.',
  },
  {
    term: 'BS 7671',
    definition:
      'The IET Wiring Regulations (18th Edition + amendments) — the national standard for electrical installations that your apprenticeship covers.',
  },
  {
    term: 'NI Relief',
    definition:
      'Employer National Insurance relief — employers pay zero NI contributions for apprentices under 25, saving approximately £2,000–£3,000 per year.',
  },
  {
    term: 'Break in Learning',
    definition:
      'A formal pause in your apprenticeship (e.g. long-term sickness, maternity). Your end date is extended and funding is paused, not lost.',
  },
  {
    term: 'Commitment Statement',
    definition:
      'A document signed by you, your employer, and your training provider at the start, setting out what each party will do during the apprenticeship.',
  },
  {
    term: 'Progress Review',
    definition:
      'Regular meetings (minimum every 12 weeks) between you, your employer, and your training provider to review your development and address any issues.',
  },
];

const FundingFAQsPage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          FAQs & Glossary
        </h1>
      </div>

      {/* FAQs */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <h2 className="text-base font-semibold text-white">
            Frequently Asked Questions ({faqs.length})
          </h2>
        </div>

        {faqs.map((faq) => (
          <Card key={faq.question} className="border-amber-500/20 bg-white/5">
            <CardContent className="p-4 space-y-2">
              <h3 className="font-medium text-amber-400 text-sm">
                {faq.question}
              </h3>
              <p className="text-white text-sm">{faq.answer}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Glossary */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-400" />
          <h2 className="text-base font-semibold text-white">
            Glossary of Terms ({glossary.length})
          </h2>
        </div>

        <Card className="border-purple-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            {glossary.map((item) => (
              <div key={item.term} className="flex items-start gap-2">
                <span className="text-purple-400 font-semibold text-sm min-w-[100px] flex-shrink-0">
                  {item.term}
                </span>
                <span className="text-white text-sm">{item.definition}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FundingFAQsPage;
