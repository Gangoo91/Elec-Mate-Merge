import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Target, Scale, FileText } from 'lucide-react';
import { SmartBackButton } from '@/components/ui/smart-back-button';

const apprenticeRights = [
  {
    title: 'Guaranteed training time',
    desc: 'Fixed training hours as defined in your individual training plan — your employer cannot reduce or remove these',
  },
  {
    title: 'Paid learning time',
    desc: 'All OJT must occur during contracted, paid working hours — you should never be asked to do unpaid training',
  },
  {
    title: 'Quality training provision',
    desc: 'Access to qualified instructors, appropriate resources, and facilities that meet industry standards',
  },
  {
    title: 'Progress monitoring',
    desc: 'Regular reviews (minimum every 12 weeks) with your training provider and employer to check your development',
  },
  {
    title: 'Written training plan',
    desc: 'A clear plan showing what training you will receive, when, and how it maps to your apprenticeship standard',
  },
  {
    title: 'Reasonable adjustments',
    desc: 'If you have additional learning needs, your provider must make reasonable adjustments to support you',
  },
];

const employerDuties = [
  {
    title: 'Release time provision',
    desc: 'Must allow and schedule training time per your plan — workload is not an acceptable reason to cancel OJT',
  },
  {
    title: 'Financial investment',
    desc: 'Cover training costs and maintain your full wages during learning hours — OJT is not unpaid',
  },
  {
    title: 'Workplace support',
    desc: 'Provide a named mentor or supervisor, and give you opportunities to apply what you learn on site',
  },
  {
    title: 'Progress facilitation',
    desc: 'Attend progress reviews, support portfolio development, and give you time for evidence collection',
  },
  {
    title: 'Appropriate work exposure',
    desc: 'Ensure you get a range of work experience that covers the breadth of ST0152 v1.2, not just repetitive tasks',
  },
  {
    title: 'Safe learning environment',
    desc: 'Provide appropriate PPE, tools, and supervision for any practical learning activities on site',
  },
];

const legislation = [
  {
    title: 'Apprenticeships, Skills, Children and Learning Act 2009',
    desc: 'The primary legislation that governs apprenticeships in England. Sets out the legal framework for apprenticeship agreements and standards.',
  },
  {
    title: 'Employment Rights Act 1996',
    desc: 'Protects apprentices against unfair dismissal, unauthorised deductions from wages, and gives rights to written terms of employment.',
  },
  {
    title: 'Equality Act 2010',
    desc: 'Protects apprentices from discrimination based on age, disability, gender, race, religion, or other protected characteristics.',
  },
  {
    title: 'ESFA Apprenticeship Funding Rules',
    desc: 'The detailed rules that training providers and employers must follow. Updated annually — the August 2025 version introduced fixed hours per standard.',
  },
  {
    title: 'Health and Safety at Work etc. Act 1974',
    desc: 'Your employer has a duty of care to ensure your safety during all training activities, whether on site or at college.',
  },
];

const agreementContents = [
  'The apprenticeship standard you are working towards (ST0152 v1.2)',
  'The name of your training provider and end-point assessment organisation',
  'Your planned training hours and how they will be delivered',
  'Start date, planned end date, and total duration',
  'The qualifications included in your apprenticeship',
  'How your progress will be reviewed and how often',
  'Your employer\'s commitment to release you for OJT',
  'What happens if either party wants to end the apprenticeship',
];

const templateWording = {
  subject: 'Request for Review of Off-the-Job Training Provision',
  body: `Dear [Manager's Name],

I am writing to raise a concern about my off-the-job training. Under my apprenticeship agreement dated [date], I am entitled to [X hours] of OJT as defined in my training plan.

Over the past [timeframe], I have been unable to attend [describe missed training — e.g. college sessions, online learning time] on [number] occasions due to [reason — e.g. being asked to remain on site for work].

This has resulted in a shortfall of approximately [X hours] against my training plan, which may affect my ability to reach gateway and complete my apprenticeship on time.

I would appreciate the opportunity to discuss this with you and agree a plan to make up the missed hours. I have copied my training provider into this correspondence.

Kind regards,
[Your Name]
[Apprenticeship Standard: ST0152 v1.2]`,
};

const RightsPage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">Your Rights</h1>
      </div>

      {/* Your Rights */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <h2 className="text-base font-semibold text-white">Your Rights as an Apprentice</h2>
        </div>

        {apprenticeRights.map((right) => (
          <Card key={right.title} className="border-green-500/20 bg-white/5">
            <CardContent className="p-4 flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white text-sm">{right.title}</h3>
                <p className="text-white text-sm mt-1">{right.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Employer Responsibilities */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <h2 className="text-base font-semibold text-white">Employer Responsibilities</h2>
        </div>

        {employerDuties.map((duty) => (
          <Card key={duty.title} className="border-blue-500/20 bg-white/5">
            <CardContent className="p-4 flex items-start gap-3">
              <Target className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white text-sm">{duty.title}</h3>
                <p className="text-white text-sm mt-1">{duty.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Key Legislation */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-400" />
          <h2 className="text-base font-semibold text-white">Key Legislation</h2>
        </div>

        <p className="text-white text-sm">
          Your rights are backed by law. Here are the key pieces of legislation that protect you:
        </p>

        {legislation.map((law) => (
          <Card key={law.title} className="border-purple-500/20 bg-white/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <Scale className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-purple-400 text-sm">{law.title}</h3>
                  <p className="text-white text-sm mt-1">{law.desc}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Apprenticeship Agreement */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <h2 className="text-base font-semibold text-white">Your Apprenticeship Agreement</h2>
        </div>

        <Card className="border-amber-500/20 bg-amber-500/10">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-amber-400" />
              <p className="text-white text-sm font-medium">
                You have a legal right to a signed copy
              </p>
            </div>
            <p className="text-white text-sm">
              Your apprenticeship agreement is a legally binding document. It must contain:
            </p>
            <ul className="space-y-2">
              {agreementContents.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-white">
                  <span className="text-amber-400 mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-white text-sm mt-2">
              If you do not have a signed copy of your apprenticeship agreement, ask your
              training provider for one immediately. You should have received this at the
              start of your apprenticeship.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Template for Raising Concerns */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400" />
          <h2 className="text-base font-semibold text-white">Template: Raising Concerns</h2>
        </div>

        <Card className="border-cyan-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            <p className="text-white text-sm">
              If your employer is not providing your OJT, use this template as a starting
              point. Always copy your training provider in:
            </p>
            <div className="bg-white/10 rounded-lg p-3 space-y-2">
              <p className="text-cyan-400 text-sm font-medium">{templateWording.subject}</p>
              <p className="text-white text-xs whitespace-pre-line leading-relaxed">
                {templateWording.body}
              </p>
            </div>
            <p className="text-white text-xs mt-2">
              Adapt this to your situation. Keep a copy of everything you send. If the issue
              is not resolved within 4 weeks, escalate to your training provider.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* When Things Go Wrong */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <h2 className="text-base font-semibold text-white">When Things Go Wrong</h2>
        </div>

        <Card className="border-red-500/20 bg-red-500/10">
          <CardContent className="p-4 space-y-4">
            <p className="text-white text-sm">
              If your employer is not meeting their off-the-job training obligations:
            </p>

            <div className="space-y-3">
              <div>
                <h3 className="font-medium text-amber-400 text-sm">
                  Step 1: Document the Issues
                </h3>
                <ul className="mt-1 space-y-1">
                  <li className="text-white text-sm flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">•</span>
                    Keep records of missed training time with dates and reasons
                  </li>
                  <li className="text-white text-sm flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">•</span>
                    Note specific incidents (e.g. "asked to stay on site instead of college")
                  </li>
                  <li className="text-white text-sm flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">•</span>
                    Calculate the hours shortfall against your training plan
                  </li>
                  <li className="text-white text-sm flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">•</span>
                    Save any text messages or emails as evidence
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-amber-400 text-sm">Step 2: Raise It Formally</h3>
                <ul className="mt-1 space-y-1">
                  <li className="text-white text-sm flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">•</span>
                    Use the template above to write to your employer
                  </li>
                  <li className="text-white text-sm flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">•</span>
                    Copy your training provider into all correspondence
                  </li>
                  <li className="text-white text-sm flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">•</span>
                    Raise it at your next progress review — it will be recorded
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-amber-400 text-sm">Step 3: Seek External Support</h3>
                <ul className="mt-1 space-y-1">
                  <li className="text-white text-sm flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">•</span>
                    Contact the ESFA / Skills England complaints service
                  </li>
                  <li className="text-white text-sm flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">•</span>
                    Speak to ACAS for free, impartial employment advice
                  </li>
                  <li className="text-white text-sm flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">•</span>
                    Contact Unite the Union or another trade union for support
                  </li>
                  <li className="text-white text-sm flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">•</span>
                    As a last resort, you can transfer to a different employer
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RightsPage;
