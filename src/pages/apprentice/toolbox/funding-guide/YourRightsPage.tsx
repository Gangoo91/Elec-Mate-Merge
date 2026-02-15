import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, AlertTriangle, ExternalLink, ChevronRight } from 'lucide-react';
import { SmartBackButton } from '@/components/ui/smart-back-button';

const rights = [
  {
    title: 'Free Training Guaranteed by Law',
    description:
      'Your apprenticeship training must be fully funded. You should never be asked to pay any training fees or contribute towards the cost of your programme. This is a non-negotiable ESFA funding rule.',
  },
  {
    title: 'No Deductions from Wages',
    description:
      'Your employer cannot deduct training costs from your wages. This includes any contribution towards co-investment — that is the employer\'s responsibility, not yours. Check your payslips regularly.',
  },
  {
    title: 'Funded End Point Assessment',
    description:
      'Your End Point Assessment (EPA) is included in the funding band. Neither you nor your employer should be paying the EPAO separately — it comes out of the £23,000. This includes knowledge test, practical assessment, and professional discussion.',
  },
  {
    title: 'Funded Learning Materials',
    description:
      'Your training provider must provide all learning materials required for your apprenticeship. You should not be asked to buy textbooks, workbooks, online access, or any other study materials separately.',
  },
  {
    title: 'Employer Covers Co-Investment',
    description:
      'If your employer is a non-levy SME, they pay the 5% co-investment contribution (maximum £1,150 for Level 3 Electrical). This must never be passed on to you in any form — direct payment, wage deduction, or otherwise.',
  },
  {
    title: 'No Additional Provider Fees',
    description:
      'Your training provider cannot charge you additional fees for registration, assessment, materials, certification, or any other aspect of your apprenticeship training. Everything is covered by the funding band.',
  },
  {
    title: 'AM2 Assessment is Funded',
    description:
      'Your AM2 practical assessment at a NET centre is part of your apprenticeship and covered by the funding band. You should not be asked to pay for AM2 separately.',
  },
  {
    title: 'Functional Skills are Funded',
    description:
      'If you need Functional Skills in English or Maths, these are fully funded as part of your apprenticeship. You should not be charged for Functional Skills exams or tuition.',
  },
];

const warningSignals = [
  'Being asked to pay any amount towards your training fees',
  'Wage deductions labelled as "training contribution" or "course fees"',
  'Being asked to buy textbooks, workbooks, or online course access',
  'Being told you must pay for your AM2 assessment or EPA',
  'Employer saying they will "take it out of your wages" for college costs',
  'Training provider asking for a "registration fee" or "admin fee"',
  'Being asked to sign a loan agreement for training costs',
  'Being told you must repay training costs if you leave early',
  'Employer deducting travel costs to college from your wages without agreement',
  'Any payment request that is not clearly for personal items (own tools, clothing)',
];

const escalation = [
  {
    step: '1',
    title: 'Document the Issue',
    description:
      'Write down exactly what happened — dates, amounts, who asked you to pay, and any evidence (emails, texts, payslips showing deductions). Screenshot everything. Keep copies somewhere safe outside of work.',
  },
  {
    step: '2',
    title: 'Contact Your Training Provider',
    description:
      'Raise the issue with your training provider first. They have a duty to ensure funding rules are followed and may be able to resolve it directly with your employer. Ask to speak to the apprenticeship manager or compliance team.',
  },
  {
    step: '3',
    title: 'Report to ESFA',
    description:
      'Email complaints.esfa@education.gov.uk with your evidence. Include your apprenticeship details, employer name, training provider name, and a clear description of the issue. The ESFA takes funding rule breaches seriously and will investigate.',
  },
  {
    step: '4',
    title: 'National Apprenticeship Helpline',
    description:
      'Call 0800 015 0400 (free, Monday–Friday 8am–8pm). They can advise you on your rights and next steps. They can also escalate your complaint if the ESFA response is slow.',
  },
  {
    step: '5',
    title: 'Citizens Advice',
    description:
      'Contact Citizens Advice for free, independent guidance on your employment and training rights. They can help you understand your legal position and what action you can take. Find your local bureau at citizensadvice.org.uk.',
  },
  {
    step: '6',
    title: 'ACAS',
    description:
      'Contact ACAS (Advisory, Conciliation and Arbitration Service) on 0300 123 1100 for employment-related advice if the issue involves wage deductions, contractual problems, or you are being treated unfairly because you raised concerns.',
  },
];

const links = [
  {
    title: 'Gov.uk Apprenticeships',
    description: 'Official government guide to apprenticeships',
    url: 'https://www.gov.uk/topic/further-education-skills/apprenticeships',
  },
  {
    title: 'ESFA Funding Rules',
    description: 'Full apprenticeship funding rules and guidance',
    url: 'https://www.gov.uk/guidance/apprenticeship-funding-rules',
  },
  {
    title: 'CITB Grants Portal',
    description: 'Apply for and track CITB grants',
    url: 'https://www.citb.co.uk/levy-grants-and-funding/grants-and-funding/',
  },
  {
    title: 'Find an Apprenticeship',
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
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Your Funding Rights
        </h1>
      </div>

      {/* Key Message */}
      <Card className="border-red-500/20 bg-red-500/5">
        <CardContent className="p-4">
          <p className="text-red-400 font-bold text-lg">
            You should NEVER be asked to pay for your training
          </p>
          <p className="text-white text-sm mt-2">
            Apprenticeship training is funded by the government and/or your
            employer. If anyone asks you to pay for your training, this is a breach
            of ESFA funding rules and should be reported.
          </p>
        </CardContent>
      </Card>

      {/* Link to full Rights & Pay page */}
      <button
        onClick={() => navigate('/apprentice/rights-and-pay')}
        className="w-full flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-elec-yellow/20
          touch-manipulation active:scale-[0.98] transition-transform min-h-[44px] text-left"
      >
        <span className="text-xl flex-shrink-0">⚖️</span>
        <div className="flex-1 min-w-0">
          <span className="font-medium text-sm text-elec-yellow">
            Full Rights & Pay Guide
          </span>
          <p className="text-white text-xs mt-0.5">
            Wages, employment rights, support resources & tools
          </p>
        </div>
        <ChevronRight className="h-4 w-4 text-white flex-shrink-0" />
      </button>

      {/* Your Funding Rights */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <h2 className="text-base font-semibold text-white">
            Your Funding Rights
          </h2>
        </div>

        {rights.map((right) => (
          <Card key={right.title} className="border-green-500/20 bg-white/5">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                <h3 className="font-semibold text-green-400 text-sm">
                  {right.title}
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed pl-6">
                {right.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Warning Signs */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <h2 className="text-base font-semibold text-white">
            Warning Signs — Red Flags
          </h2>
        </div>

        <Card className="border-red-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            <p className="text-white text-sm leading-relaxed">
              If any of these happen, your funding rights may be being breached:
            </p>
            <ul className="space-y-2">
              {warningSignals.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-white"
                >
                  <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* What to Include in a Complaint */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-400" />
          <h2 className="text-base font-semibold text-white">
            What to Include in a Complaint
          </h2>
        </div>

        <Card className="border-purple-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            <p className="text-white text-sm leading-relaxed">
              If you need to report a funding rules breach to the ESFA, include:
            </p>
            <ul className="space-y-1.5">
              {[
                'Your full name and contact details',
                'Your employer name and address',
                'Your training provider name',
                'Your apprenticeship standard and start date',
                'What happened — clear description of the issue',
                'When it happened — specific dates',
                'Who was involved — names and roles',
                'What amount was requested or deducted',
                'Evidence — copies of emails, texts, payslips, letters, or screenshots',
                'What you want to happen — the outcome you are seeking',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-white"
                >
                  <CheckCircle className="h-4 w-4 text-purple-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
              <p className="text-white text-sm">
                <span className="text-purple-400 font-semibold">
                  Email to:
                </span>{' '}
                complaints.esfa@education.gov.uk
              </p>
              <p className="text-white text-sm mt-1">
                <span className="text-purple-400 font-semibold">
                  Or call:
                </span>{' '}
                0800 015 0400 (free, Mon–Fri 8am–8pm)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* If Something Goes Wrong */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <h2 className="text-base font-semibold text-white">
            Escalation Steps
          </h2>
        </div>

        <Card className="border-amber-500/20 bg-white/5">
          <CardContent className="p-4 space-y-4">
            <p className="text-white text-sm leading-relaxed">
              If you believe your funding rights are being breached, follow these
              steps in order:
            </p>
            {escalation.map((item) => (
              <div key={item.step} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-amber-400 text-xs font-bold">
                    {item.step}
                  </span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    {item.title}
                  </p>
                  <p className="text-white text-sm mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Useful Links */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <h2 className="text-base font-semibold text-white">Useful Links</h2>
        </div>

        {links.map((link) => (
          <a
            key={link.title}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full p-4 rounded-lg bg-white/5 border border-blue-500/20
              touch-manipulation active:scale-[0.98] transition-transform min-h-[44px]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-400 font-semibold text-sm">
                  {link.title}
                </p>
                <p className="text-white text-xs mt-0.5">{link.description}</p>
              </div>
              <ExternalLink className="h-4 w-4 text-white flex-shrink-0" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default YourRightsPage;
