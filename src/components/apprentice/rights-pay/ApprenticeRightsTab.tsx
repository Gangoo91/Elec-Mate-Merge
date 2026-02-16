import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Shield,
  Clock,
  GraduationCap,
  FileText,
  Phone,
  AlertTriangle,
  Users,
  Heart,
} from 'lucide-react';

const ApprenticeRightsTab = () => {
  const rights = [
    {
      category: 'Working Time & Conditions',
      icon: <Clock className="h-5 w-5" />,
      items: [
        'Maximum 48-hour working week (averaged over 17 weeks) - you can opt out voluntarily in writing',
        'Minimum 20 days paid holiday plus 8 bank holidays (28 days total) - increases with service',
        'Rest breaks: 20 minutes if working over 6 hours continuously (paid break time)',
        '11 hours consecutive rest between working days (protected by law)',
        '24 hours consecutive rest in each 7-day period (usually includes one full weekend day)',
        'Night work restrictions (22:00-06:00) with mandatory health assessments for regular night workers',
        'Overtime pay rates must be clearly defined in your contract - cannot be below minimum wage',
        'Flexible working requests can be made after 26 weeks of employment',
        'Protection from excessive working hours that could affect your studies or wellbeing',
      ],
    },
    {
      category: 'Training & Development Rights',
      icon: <GraduationCap className="h-5 w-5" />,
      items: [
        'Minimum 20% off-the-job training (equivalent to 1 day per week) - this is legally protected time',
        'Access to structured learning programme aligned to your specific apprenticeship standard',
        'Regular progress reviews every 12 weeks with documented feedback and development planning',
        'Qualified mentor or supervisor support throughout your apprenticeship journey',
        'All training costs covered by employer (tuition fees, materials, assessments, EPA)',
        'Time off for college/training centre attendance without loss of pay',
        'Access to End Point Assessment when ready, fully funded by your employer',
        'Protection from being used as cheap labour - your role must provide genuine learning opportunities',
        'Right to additional support if you have learning difficulties or require reasonable adjustments',
        'Access to career guidance and progression planning discussions',
      ],
    },
    {
      category: 'Health & Safety Protection',
      icon: <Shield className="h-5 w-5" />,
      items: [
        'Safe working environment with comprehensive risk assessments completed before you start',
        'Mandatory health and safety induction training before beginning any work activities',
        'Personal protective equipment (PPE) provided free of charge and replaced when necessary',
        'Right to refuse unsafe work without penalty, discrimination, or loss of pay',
        'Access to first aid facilities and trained first aiders at all times during working hours',
        'Proper supervision when working with dangerous equipment, substances, or in hazardous areas',
        'Regular safety briefings, toolbox talks, and ongoing safety training updates',
        'Right to report safety concerns anonymously without fear of retaliation or victimisation',
        'Access to occupational health services if your work affects your health',
        'Right to safety representation through safety committees or union safety representatives',
      ],
    },
    {
      category: 'Employment Protection & Benefits',
      icon: <FileText className="h-5 w-5" />,
      items: [
        'Written apprenticeship agreement within 2 months of starting (legally required document)',
        'Protection against unfair dismissal after 2 years continuous employment',
        'Statutory sick pay (SSP) after 4 consecutive days of illness (£118.75 per week in 2025/26, rising to £123.25 from April 2026)',
        'Maternity/paternity leave and pay entitlements (including shared parental leave options)',
        'Right to join a trade union and participate in union activities during working hours',
        'Protection from discrimination based on age, gender, race, religion, disability, sexual orientation',
        'Reasonable adjustments for apprentices with disabilities or health conditions',
        'Access to formal grievance and disciplinary procedures with right to representation',
        'Right to request flexible working arrangements after 26 weeks of employment',
        'Protection from victimisation for exercising your employment rights',
      ],
    },
    {
      category: 'Financial Rights & Protections',
      icon: <Users className="h-5 w-5" />,
      items: [
        'Apprentice minimum wage £7.55/hour (2025/26), rising to £8.00/hour from 1 April 2026. After first year, if aged 21+, National Living Wage applies — £12.21 current, £12.71 from April 2026',
        'Regular, predictable pay schedule (weekly/monthly as specified in your contract)',
        'Detailed itemised payslips showing gross pay, deductions, tax, NI contributions, and net pay',
        'No unlawful deductions from wages without your written consent',
        'Reimbursement of reasonable travel expenses for off-site training (check your contract)',
        'Tool allowances or provision of necessary equipment and protective clothing',
        'Protection from having to pay back training costs if you leave through no fault of your own',
        'Clear explanation of any training bond or repayment clauses before you sign',
        'Right to National Insurance number and understanding of your tax obligations',
        'Access to pension auto-enrolment after 3 months if you meet the criteria',
      ],
    },
  ];

  const electricalSafetyRights = [
    'Employer must comply with the Electricity at Work Regulations 1989 — this is a legal requirement',
    'You must never be asked to work on live electrical equipment unless there is no alternative and proper precautions are in place',
    'Safe isolation procedures (GS38) must be followed for every task — your employer must provide approved voltage indicators',
    'You must be provided with calibrated test instruments — never use damaged or out-of-date equipment',
    'Lock-out/tag-out (LOTO) equipment must be provided and you must be trained in its use',
    'Permit-to-work systems must be in place for high-risk electrical work (live working, HV switching)',
    'You have the right to stop work if you believe there is a danger of electric shock, burns, or arc flash',
    'Your employer must provide arc flash protective clothing where there is a risk of arc flash',
    'Adequate lighting must be provided in all working areas — you must not work in the dark',
    'Working at height training and equipment must be provided before you climb any ladder, scaffold, or platform',
    'If you report an electrical safety concern, your employer must not punish or dismiss you for raising it',
  ];

  const contractRights = [
    {
      topic: 'Apprenticeship Agreement vs Employment Contract',
      detail: 'You should have BOTH. The apprenticeship agreement covers your training commitments. The employment contract covers your terms of employment (hours, pay, holiday, notice). Both are legally binding documents.',
    },
    {
      topic: 'Notice Periods',
      detail: 'During your apprenticeship, the standard notice period is 1 week during the first 2 years, then 1 week per year of service. Your contract may specify longer. Your employer must give you the same notice.',
    },
    {
      topic: 'Probation Period',
      detail: 'Many employers set a 3-6 month probation period. During this time, notice periods may be shorter and your employment can be terminated more easily. However, you still have ALL statutory rights from day one.',
    },
    {
      topic: 'What Happens If Your Employer Goes Bust',
      detail: 'Your training provider will help you find a new employer to continue your apprenticeship. You may be entitled to redundancy pay if you have 2+ years of service. The National Apprenticeship Service can help with transfers.',
    },
    {
      topic: 'Redundancy Rights',
      detail: 'If genuinely made redundant (not dismissed), you are entitled to: redundancy pay after 2 years, proper consultation, reasonable time off to find new work, and your statutory notice period.',
    },
    {
      topic: 'TUPE (Transfer of Undertakings)',
      detail: 'If your employer is taken over or your work is transferred to another company, TUPE regulations protect you. Your terms and conditions must stay the same. You cannot be dismissed because of the transfer.',
    },
    {
      topic: 'Training Bonds / Clawback Clauses',
      detail: 'Some employers include clauses requiring you to pay back training costs if you leave. These must be reasonable (typically only the final 12 months of costs), clearly explained before signing, and cannot apply if you are made redundant or constructively dismissed.',
    },
    {
      topic: 'Whistleblowing Protection',
      detail: 'If you report illegal activity, health and safety dangers, or environmental damage, you are legally protected from dismissal or victimisation under the Public Interest Disclosure Act 1998.',
    },
  ];

  const discriminationProtection = [
    {
      type: 'Age Discrimination',
      example: 'Being denied opportunities or treated differently because of your age. Includes being given only menial tasks because you are young.',
    },
    {
      type: 'Sex / Gender',
      example: 'Inappropriate comments, unequal treatment, or being excluded from work because of your gender. The electrical industry must be welcoming to all genders.',
    },
    {
      type: 'Race / Ethnicity',
      example: 'Racial slurs, exclusion, or different treatment based on your race, colour, nationality, or ethnic background.',
    },
    {
      type: 'Disability',
      example: 'Failure to make reasonable adjustments (e.g. modified tools, flexible hours, adjusted training). Includes hidden disabilities like dyslexia, ADHD, or mental health conditions.',
    },
    {
      type: 'Sexual Orientation',
      example: 'Homophobic comments, exclusion, or harassment based on your sexual orientation. Zero tolerance is the legal standard.',
    },
    {
      type: 'Religion / Belief',
      example: 'Refusal to accommodate religious practices (prayer times, dietary needs), or mockery of beliefs.',
    },
  ];

  const commonViolations = [
    {
      issue: 'Being denied off-the-job training time',
      action: 'Document missed training sessions and speak to your training provider. Report to ESFA if unresolved.',
    },
    {
      issue: 'Working excessive hours without proper breaks',
      action: 'Keep a record of hours worked and contact ACAS on 0300 123 1100 for advice.',
    },
    {
      issue: 'Not receiving proper supervision or mentoring',
      action: 'Raise with HR/management and involve your training provider at the next progress review.',
    },
    {
      issue: 'Being treated as cheap labour rather than a learner',
      action: 'Contact your apprenticeship provider and ESFA. You must be given genuine learning opportunities.',
    },
    {
      issue: 'Pay below minimum wage rates',
      action: "Contact HMRC's National Minimum Wage team on 0300 123 1100 immediately. Keep all payslips.",
    },
    {
      issue: 'Being asked to work on live electrical equipment without proper training',
      action: 'Refuse the task — this violates the Electricity at Work Regulations. Report to HSE if your employer insists.',
    },
    {
      issue: 'Bullying, harassment, or discriminatory behaviour on site',
      action: 'Document everything (dates, witnesses, what was said). Raise a formal grievance. Contact ACAS if not resolved.',
    },
    {
      issue: 'Being asked to pay for your own training, tools, or PPE',
      action: 'Your employer must cover all training costs and provide PPE free of charge. Raise in writing.',
    },
    {
      issue: 'Being pressured to sign an opt-out of the 48-hour working week',
      action: 'This must be genuinely voluntary. You cannot be penalised for refusing to sign. Contact ACAS if pressured.',
    },
    {
      issue: 'Employer threatening to end your apprenticeship unfairly',
      action: 'Contact your training provider immediately. They have a duty to support you. ACAS can advise on unfair dismissal.',
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <Alert className="border-elec-yellow/30 bg-elec-yellow/5 p-4 sm:p-6">
        <div className="flex gap-3">
          <Shield className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
          <AlertDescription className="text-white">
            <strong className="text-elec-yellow">Know Your Rights:</strong> These rights are
            protected by law. Understanding them helps ensure you receive fair treatment throughout
            your apprenticeship.
          </AlertDescription>
        </div>
      </Alert>

      <div className="grid gap-4 sm:gap-6">
        {rights.map((section, index) => (
          <Card
            key={index}
            className="border-elec-yellow/20 bg-elec-card/80 backdrop-blur-sm shadow-lg"
          >
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-elec-yellow text-lg sm:text-xl font-semibold">
                <div className="p-2 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                  {section.icon}
                </div>
                {section.category}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3 text-white">
                    <span className="text-elec-yellow text-sm leading-none mt-1 flex-shrink-0">
                      •
                    </span>
                    <span className="text-sm sm:text-base leading-relaxed font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Electrical Safety Rights */}
      <Card className="border-red-500/30 bg-red-500/10 backdrop-blur-sm shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-red-400 text-lg sm:text-xl font-semibold">
            <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
              <AlertTriangle className="h-5 w-5" />
            </div>
            Electrical Safety Rights
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-white mb-4">
            As an electrical apprentice, you have specific safety rights beyond general employment law.
            The Electricity at Work Regulations 1989 place strict duties on your employer:
          </p>
          <ul className="space-y-2">
            {electricalSafetyRights.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-white">
                <span className="text-red-400 text-sm leading-none mt-1 flex-shrink-0">•</span>
                <span className="text-sm sm:text-base leading-relaxed font-light">{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Contract & Agreement Rights */}
      <Card className="border-blue-500/30 bg-blue-500/10 backdrop-blur-sm shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-blue-400 text-lg sm:text-xl font-semibold">
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <FileText className="h-5 w-5" />
            </div>
            Contract, Agreement & Employment Law
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {contractRights.map((item, index) => (
              <div key={index} className="border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-medium text-blue-300 text-sm mb-2">{item.topic}</h4>
                <p className="text-white text-sm leading-relaxed font-light">{item.detail}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Discrimination Protection */}
      <Card className="border-purple-500/30 bg-purple-500/10 backdrop-blur-sm shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-purple-400 text-lg sm:text-xl font-semibold">
            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <Shield className="h-5 w-5" />
            </div>
            Discrimination & Harassment Protection
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-white mb-4">
            The Equality Act 2010 protects you from discrimination on 9 protected characteristics.
            If you experience any of the following, you have the right to raise a formal grievance
            and, if necessary, take your case to an Employment Tribunal.
          </p>
          <div className="space-y-3">
            {discriminationProtection.map((item, index) => (
              <div key={index} className="border border-purple-500/20 rounded-lg p-4">
                <h4 className="font-medium text-purple-300 text-sm mb-1">{item.type}</h4>
                <p className="text-white text-sm leading-relaxed font-light">{item.example}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <p className="text-sm text-white">
              <strong className="text-purple-300">Important:</strong> Banter is not an excuse.
              If comments make you uncomfortable, they can constitute harassment regardless of
              intent. You do not need to prove the person meant to offend — only that the behaviour
              had that effect. Report it to your employer, and if they fail to act, contact ACAS.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-400/30 bg-orange-500/10 backdrop-blur-sm shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-orange-300 text-lg sm:text-xl font-semibold">
            <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-400/20">
              <AlertTriangle className="h-5 w-5" />
            </div>
            Common Rights Violations & What to Do
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="space-y-4">
            {commonViolations.map((violation, index) => (
              <li
                key={index}
                className="bg-orange-500/5 border border-orange-400/20 rounded-lg p-4 hover:bg-orange-500/10 transition-colors"
              >
                <div className="flex gap-2 mb-2">
                  <span className="text-orange-300 text-sm font-medium flex-shrink-0">Issue:</span>
                  <span className="text-white text-sm font-medium">{violation.issue}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-orange-300 text-sm font-medium flex-shrink-0">Action:</span>
                  <span className="text-white text-sm leading-relaxed font-light">
                    {violation.action}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Alert className="border-green-400/30 bg-green-500/10 p-4 sm:p-6">
        <div className="flex gap-3">
          <Heart className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
          <AlertDescription className="text-white">
            <strong className="text-green-400">Remember:</strong> Your apprenticeship should be a
            positive learning experience. If you're experiencing problems, don't suffer in silence -
            help is available and using it shows strength, not weakness.
          </AlertDescription>
        </div>
      </Alert>
    </div>
  );
};

export default ApprenticeRightsTab;
