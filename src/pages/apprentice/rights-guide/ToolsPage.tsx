import { Card, CardContent } from '@/components/ui/card';
import { SmartBackButton } from '@/components/ui/smart-back-button';
import { CheckCircle, FileText, Calculator, ClipboardList } from 'lucide-react';

interface Checklist {
  title: string;
  items: string[];
  icon: React.ReactNode;
  colour: string;
  border: string;
}

const checklists: Checklist[] = [
  {
    title: 'Before You Start Checklist',
    icon: <ClipboardList className="h-5 w-5 text-purple-400" />,
    colour: 'text-purple-400',
    border: 'border-purple-500/20',
    items: [
      'Signed apprenticeship agreement (keep a copy)',
      'Written statement of employment terms',
      'Confirmed wage rate and pay frequency',
      'Training plan with off-the-job hours confirmed',
      'College enrolment confirmed and paid by employer',
      'PPE provided (not deducted from wages)',
      'Named mentor or supervisor allocated',
      'Health and safety induction completed',
      'Emergency contacts and procedures explained',
    ],
  },
  {
    title: 'Monthly Pay Check',
    icon: <Calculator className="h-5 w-5 text-green-400" />,
    colour: 'text-green-400',
    border: 'border-green-500/20',
    items: [
      'Payslip received showing hours, gross pay, and deductions',
      'Correct hourly rate applied (check against your contract)',
      'All hours worked are included (site + college + study)',
      'Overtime calculated correctly if applicable',
      'No unexpected deductions',
      'Tax code is correct (check your HMRC online account)',
      'National Insurance contributions being made',
    ],
  },
  {
    title: 'Training Progress Check (Quarterly)',
    icon: <FileText className="h-5 w-5 text-blue-400" />,
    colour: 'text-blue-400',
    border: 'border-blue-500/20',
    items: [
      'Off-the-job training hours logged (should be 20% of total)',
      'Progress reviews happening regularly with assessor',
      'Portfolio evidence being collected and signed off',
      'Any knowledge gaps identified and supported',
      'On-track for EPA gateway readiness',
      'No missed college days without good reason',
    ],
  },
];

const ToolsPage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Tools & Templates
        </h1>
      </div>

      {/* Intro */}
      <Card className="border-purple-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Practical Checklists for Apprentices
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Use these checklists to make sure everything is in order. Tick off each item
            to stay on top of your rights, pay, and training progress. If something is
            missing, raise it with your employer or training provider early.
          </p>
        </CardContent>
      </Card>

      {/* Checklists */}
      {checklists.map((checklist) => (
        <Card key={checklist.title} className={`${checklist.border} bg-white/5`}>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              {checklist.icon}
              <h2 className={`text-lg font-semibold ${checklist.colour}`}>
                {checklist.title}
              </h2>
            </div>
            <ul className="space-y-2">
              {checklist.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-white"
                >
                  <CheckCircle className="h-4 w-4 text-white flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}

      {/* Useful Templates */}
      <Card className="border-elec-yellow/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-elec-yellow">
            Useful Letter Templates
          </h2>
          <p className="text-white text-sm leading-relaxed">
            If you need to raise an issue formally, keep it factual, polite, and in
            writing. Here are the key points to include in common situations:
          </p>

          <div className="space-y-3">
            {[
              {
                title: 'Querying a Pay Discrepancy',
                points: [
                  'State the pay period and hours worked',
                  'Show what you were paid vs what you expected',
                  'Reference your contract and the NMW rate',
                  'Ask for a written explanation within 7 days',
                ],
              },
              {
                title: 'Requesting Your Off-the-Job Training Hours',
                points: [
                  'Reference the 20% requirement from your apprenticeship standard',
                  'State how many hours you have received vs expected',
                  'Request a meeting to discuss a training plan',
                  'Copy in your training provider if needed',
                ],
              },
              {
                title: 'Reporting a Safety Concern',
                points: [
                  'Describe what you observed, with date and location',
                  'Explain why you believe it is unsafe',
                  'Reference the relevant regulation if known',
                  'Request a written response and corrective action',
                  'Keep a copy for your records',
                ],
              },
            ].map((template) => (
              <div
                key={template.title}
                className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-2"
              >
                <p className="text-white font-semibold text-sm">{template.title}</p>
                <ul className="space-y-1">
                  {template.points.map((point) => (
                    <li key={point} className="text-white text-xs flex items-start gap-2">
                      <span className="text-elec-yellow mt-0.5">-</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tip */}
      <Card className="border-green-500/20 bg-green-500/5">
        <CardContent className="p-4">
          <p className="text-white text-sm leading-relaxed">
            <strong className="text-green-400">Top tip:</strong> Always keep copies
            of your apprenticeship agreement, payslips, training records, and any
            correspondence with your employer. Digital photos of documents are fine.
            This evidence is essential if you ever need to raise a formal complaint.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ToolsPage;
