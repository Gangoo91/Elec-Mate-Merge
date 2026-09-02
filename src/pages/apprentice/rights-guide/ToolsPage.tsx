import { CheckCircle, FileText, Calculator, ClipboardList } from 'lucide-react';
import { HubPage, HubBody, HubMasthead, HubSectionHeading } from '@/components/hub/HubPrimitives';
import { DEFAULT_OTJ_STANDARD } from '@/data/otjStandards';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

interface Checklist {
  title: string;
  eyebrow: string;
  items: string[];
  icon: React.ReactNode;
}

const checklists: Checklist[] = [
  {
    title: 'Before You Start Checklist',
    eyebrow: 'Day one',
    icon: <ClipboardList className="h-5 w-5 text-elec-yellow" />,
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
      'CITB or other apprenticeship grant support checked (where your employer is eligible)',
    ],
  },
  {
    title: 'Monthly Pay Check',
    eyebrow: 'Pay',
    icon: <Calculator className="h-5 w-5 text-elec-yellow" />,
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
    eyebrow: 'Training',
    icon: <FileText className="h-5 w-5 text-elec-yellow" />,
    items: [
      `Off-the-job training hours logged (against your standard's fixed total — ${DEFAULT_OTJ_STANDARD.otjHours.toLocaleString('en-GB')}h for ${DEFAULT_OTJ_STANDARD.code})`,
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
    <HubPage>
      <HubMasthead
        section="Apprentice · Templates"
        title="Tools & templates"
        backTo="/apprentice/rights-and-pay"
      />
      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          {
            "Practical checklists for staying on top of your rights, pay and training. Tick off each item — if something's missing, raise it with your employer or training provider early."
          }
        </p>

        {/* Checklists */}
        {checklists.map((checklist) => (
          <div
            key={checklist.title}
            className={cn(
              'border-0 bg-transparent -mx-4 rounded-none border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x px-4 py-4 sm:p-5',
              CARD_SURFACE
            )}
          >
            <div className="py-4 sm:p-5 space-y-4">
              <div className="flex items-center gap-2">
                {checklist.icon}
                <HubSectionHeading>{checklist.title}</HubSectionHeading>
              </div>
              <ul className="space-y-2">
                {checklist.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white">
                    <CheckCircle className="h-4 w-4 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        {/* Useful Templates */}
        <div
          className={cn(
            'border-0 bg-transparent -mx-4 rounded-none border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x px-4 py-4 sm:p-5',
            CARD_SURFACE
          )}
        >
          <div className="py-4 sm:p-5 space-y-4">
            <HubSectionHeading>Useful letter templates</HubSectionHeading>
            <p className="text-white text-sm leading-relaxed">
              If you need to raise an issue formally, keep it factual, polite, and in writing. Here
              are the key points to include in common situations:
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
                    'If unresolved, report the underpayment to HMRC — they enforce NMW arrears and back-pay',
                  ],
                },
                {
                  title: 'Requesting Your Off-the-Job Training Hours',
                  points: [
                    `Reference the fixed off-the-job hours required by your apprenticeship standard (${DEFAULT_OTJ_STANDARD.otjHours.toLocaleString('en-GB')} hours for ${DEFAULT_OTJ_STANDARD.code})`,
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
          </div>
        </div>

        {/* Tip */}
        <div className="border-0 bg-transparent sm:rounded-xl sm:border sm:border-elec-yellow/25 sm:bg-white/[0.05]">
          <div className="py-4 sm:p-5">
            <p className="text-white text-sm leading-relaxed">
              <strong className="text-elec-yellow">Top tip:</strong> Always keep copies of your
              apprenticeship agreement, payslips, training records, and any correspondence with your
              employer. Digital photos of documents are fine. This evidence is essential if you ever
              need to raise a formal complaint.
            </p>
          </div>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default ToolsPage;
