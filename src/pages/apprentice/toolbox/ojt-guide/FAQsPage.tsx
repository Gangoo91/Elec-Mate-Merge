import { Card, CardContent } from '@/components/ui/card';
import { SmartBackButton } from '@/components/ui/smart-back-button';

const faqs = [
  {
    question: 'How many hours of OJT do I need?',
    answer:
      'Since August 2025, it is no longer a flat 20% — your training plan specifies a fixed number of hours based on your apprenticeship standard (ST0152 v1.2). Ask your training provider for your exact figure.',
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
      'Pass, Merit, or Distinction. Each EPA component (knowledge test, practical assessment, professional discussion) is graded separately, and your overall grade is based on the combination.',
  },
  {
    question: 'Can I change my training provider during my apprenticeship?',
    answer:
      'Yes, but it is a complex process. If you are unhappy with your provider, raise concerns first. If the issues cannot be resolved, speak to your employer about transferring to a new provider.',
  },
  {
    question: 'What is ST0152?',
    answer:
      'ST0152 is the apprenticeship standard reference number for the Installation Electrician / Maintenance Electrician apprenticeship at Level 3. Version 1.2 is the current version.',
  },
];

const glossary = [
  { term: 'OJT', definition: 'Off-the-Job Training — structured learning away from normal work duties during paid hours' },
  { term: 'EPA', definition: 'End Point Assessment — the final assessment at the end of your apprenticeship' },
  { term: 'KSB', definition: 'Knowledge, Skills, and Behaviours — the three areas assessed in your apprenticeship standard' },
  { term: 'ESFA', definition: 'Education and Skills Funding Agency — the government body that funds and regulates apprenticeships' },
  { term: 'Gateway', definition: 'The formal readiness check before you can sit your EPA' },
  { term: 'ST0152', definition: 'The reference number for the Installation Electrician / Maintenance Electrician apprenticeship standard' },
  { term: 'AM2', definition: 'The practical assessment run by NET (National Electrotechnical Training) that tests installation competence' },
  { term: 'BS 7671', definition: 'The IET Wiring Regulations — the national standard for electrical installations in the UK' },
  { term: 'EPAO', definition: 'End Point Assessment Organisation — the independent body that carries out your EPA' },
  { term: 'Skills England', definition: 'The new government body (replacing part of IfATE) responsible for apprenticeship standards and skills policy' },
  { term: 'Training Plan', definition: 'The document that sets out your planned OJT hours, activities, and timeline' },
  { term: 'Progress Review', definition: 'Regular meetings (minimum 12-weekly) between you, your employer, and your training provider to check development' },
  { term: 'Levy', definition: 'The Apprenticeship Levy — a tax paid by large employers (payroll over £3m) that funds apprenticeship training' },
  { term: 'Co-investment', definition: 'For non-levy employers, the government pays 95% of training costs and the employer pays 5%' },
  { term: 'Break in Learning', definition: 'A formal pause in your apprenticeship (e.g. due to long-term sickness or maternity). Your end date is extended.' },
  { term: 'Initial Assessment', definition: 'The assessment at the start of your apprenticeship that identifies your prior learning and sets your training plan' },
  { term: 'Functional Skills', definition: 'English and Maths qualifications at Level 2 — required for apprenticeship completion if you do not already have GCSEs grade 4+' },
];

const FAQsPage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">FAQs & Glossary</h1>
      </div>

      {/* FAQs */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-elec-yellow" />
          <h2 className="text-base font-semibold text-white">Frequently Asked Questions</h2>
        </div>

        {faqs.map((faq) => (
          <Card key={faq.question} className="border-elec-yellow/20 bg-white/5">
            <CardContent className="p-4 space-y-2">
              <h3 className="font-medium text-elec-yellow text-sm">{faq.question}</h3>
              <p className="text-white text-sm">{faq.answer}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Glossary */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-400" />
          <h2 className="text-base font-semibold text-white">Glossary of Terms</h2>
        </div>

        <Card className="border-purple-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            {glossary.map((item) => (
              <div key={item.term} className="flex items-start gap-2">
                <span className="text-purple-400 font-semibold text-sm min-w-[80px] flex-shrink-0">
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

export default FAQsPage;
