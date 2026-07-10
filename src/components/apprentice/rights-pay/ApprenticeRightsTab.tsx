const ApprenticeRightsTab = () => {
  const rights = [
    {
      category: 'Working time & conditions',
      items: [
        'Maximum 48-hour working week (averaged over 17 weeks) — you can opt out voluntarily in writing',
        'Minimum 20 days paid holiday plus 8 bank holidays (28 days total) — increases with service',
        'Rest breaks: 20 minutes if working over 6 hours continuously (paid break time)',
        '11 hours consecutive rest between working days (protected by law)',
        '24 hours consecutive rest in each 7-day period (usually includes one full weekend day)',
        'Night work restrictions (22:00-06:00) with mandatory health assessments for regular night workers',
        'Overtime pay rates must be clearly defined in your contract — cannot be below minimum wage',
        'Flexible working requests can be made after 26 weeks of employment',
        'Protection from excessive working hours that could affect your studies or wellbeing',
      ],
    },
    {
      category: 'Training & development rights',
      items: [
        'Minimum 20% off-the-job training (equivalent to 1 day per week) — this is legally protected time',
        'Access to structured learning programme aligned to your specific apprenticeship standard',
        'Regular progress reviews every 12 weeks with documented feedback and development planning',
        'Qualified mentor or supervisor support throughout your apprenticeship journey',
        'All training costs covered by employer (tuition fees, materials, assessments, EPA)',
        'Time off for college/training centre attendance without loss of pay',
        'Access to End Point Assessment when ready, fully funded by your employer',
        'Protection from being used as cheap labour — your role must provide genuine learning opportunities',
        'Right to additional support if you have learning difficulties or require reasonable adjustments',
        'Access to career guidance and progression planning discussions',
      ],
    },
    {
      category: 'Health & safety protection',
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
      category: 'Employment protection & benefits',
      items: [
        'Written apprenticeship agreement within 2 months of starting (legally required document)',
        'Protection against unfair dismissal after 2 years continuous employment',
        'Statutory sick pay (SSP) from the first day of illness (£123.25 per week for 2026/27, or 80% of average weekly earnings if lower — the waiting days and minimum earnings requirement were abolished from 6 April 2026)',
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
      category: 'Financial rights & protections',
      items: [
        'Apprentice minimum wage £8.00/hour from 1 April 2026. After first year, the age-band rate applies — £10.85 for 18-20s, or the £12.71 National Living Wage if aged 21+',
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
      topic: 'Apprenticeship agreement vs employment contract',
      detail:
        'You should have BOTH. The apprenticeship agreement covers your training commitments. The employment contract covers your terms of employment (hours, pay, holiday, notice). Both are legally binding documents.',
    },
    {
      topic: 'Notice periods',
      detail:
        'During your apprenticeship, the standard notice period is 1 week during the first 2 years, then 1 week per year of service. Your contract may specify longer. Your employer must give you the same notice.',
    },
    {
      topic: 'Probation period',
      detail:
        'Many employers set a 3-6 month probation period. During this time, notice periods may be shorter and your employment can be terminated more easily. However, you still have ALL statutory rights from day one.',
    },
    {
      topic: 'What happens if your employer goes bust',
      detail:
        'Your training provider will help you find a new employer to continue your apprenticeship. You may be entitled to redundancy pay if you have 2+ years of service. The National Apprenticeship Service can help with transfers.',
    },
    {
      topic: 'Redundancy rights',
      detail:
        'If genuinely made redundant (not dismissed), you are entitled to: redundancy pay after 2 years, proper consultation, reasonable time off to find new work, and your statutory notice period.',
    },
    {
      topic: 'TUPE (Transfer of Undertakings)',
      detail:
        'If your employer is taken over or your work is transferred to another company, TUPE regulations protect you. Your terms and conditions must stay the same. You cannot be dismissed because of the transfer.',
    },
    {
      topic: 'Training bonds / clawback clauses',
      detail:
        'Some employers include clauses requiring you to pay back training costs if you leave. These must be reasonable (typically only the final 12 months of costs), clearly explained before signing, and cannot apply if you are made redundant or constructively dismissed.',
    },
    {
      topic: 'Whistleblowing protection',
      detail:
        'If you report illegal activity, health and safety dangers, or environmental damage, you are legally protected from dismissal or victimisation under the Public Interest Disclosure Act 1998.',
    },
  ];

  const discriminationProtection = [
    {
      type: 'Age discrimination',
      example:
        'Being denied opportunities or treated differently because of your age. Includes being given only menial tasks because you are young.',
    },
    {
      type: 'Sex / gender',
      example:
        'Inappropriate comments, unequal treatment, or being excluded from work because of your gender. The electrical industry must be welcoming to all genders.',
    },
    {
      type: 'Race / ethnicity',
      example:
        'Racial slurs, exclusion, or different treatment based on your race, colour, nationality, or ethnic background.',
    },
    {
      type: 'Disability',
      example:
        'Failure to make reasonable adjustments (e.g. modified tools, flexible hours, adjusted training). Includes hidden disabilities like dyslexia, ADHD, or mental health conditions.',
    },
    {
      type: 'Sexual orientation',
      example:
        'Homophobic comments, exclusion, or harassment based on your sexual orientation. Zero tolerance is the legal standard.',
    },
    {
      type: 'Religion / belief',
      example:
        'Refusal to accommodate religious practices (prayer times, dietary needs), or mockery of beliefs.',
    },
  ];

  const commonViolations = [
    {
      issue: 'Being denied off-the-job training time',
      action:
        'Document missed training sessions and speak to your training provider. Report to ESFA if unresolved.',
    },
    {
      issue: 'Working excessive hours without proper breaks',
      action: 'Keep a record of hours worked and contact ACAS on 0300 123 1100 for advice.',
    },
    {
      issue: 'Not receiving proper supervision or mentoring',
      action:
        'Raise with HR/management and involve your training provider at the next progress review.',
    },
    {
      issue: 'Being treated as cheap labour rather than a learner',
      action:
        'Contact your apprenticeship provider and ESFA. You must be given genuine learning opportunities.',
    },
    {
      issue: 'Pay below minimum wage rates',
      action:
        "Contact HMRC's National Minimum Wage team on 0300 123 1100 immediately. Keep all payslips.",
    },
    {
      issue: 'Being asked to work on live electrical equipment without proper training',
      action:
        'Refuse the task — this violates the Electricity at Work Regulations. Report to HSE if your employer insists.',
    },
    {
      issue: 'Bullying, harassment, or discriminatory behaviour on site',
      action:
        'Document everything (dates, witnesses, what was said). Raise a formal grievance. Contact ACAS if not resolved.',
    },
    {
      issue: 'Being asked to pay for your own training, tools, or PPE',
      action:
        'Your employer must cover all training costs and provide PPE free of charge. Raise in writing.',
    },
    {
      issue: 'Being pressured to sign an opt-out of the 48-hour working week',
      action:
        'This must be genuinely voluntary. You cannot be penalised for refusing to sign. Contact ACAS if pressured.',
    },
    {
      issue: 'Employer threatening to end your apprenticeship unfairly',
      action:
        'Contact your training provider immediately. They have a duty to support you. ACAS can advise on unfair dismissal.',
    },
  ];

  const renderBulletList = (items: string[], accent: 'neutral' | 'yellow' = 'neutral') => (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li
          key={i}
          className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
        >
          <span
            className={`w-1 h-1 rounded-full mt-2 flex-shrink-0 ${
              accent === 'yellow' ? 'bg-elec-yellow' : 'bg-white/55'
            }`}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="rounded-xl border border-elec-yellow/20 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
          Know your rights
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          These rights are protected by law. Understanding them helps ensure you receive fair
          treatment throughout your apprenticeship.
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6">
        {rights.map((section, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              {section.category}
            </span>
            {renderBulletList(section.items)}
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
          Electrical safety rights
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          As an electrical apprentice, you have specific safety rights beyond general employment
          law. The Electricity at Work Regulations 1989 place strict duties on your employer:
        </p>
        {renderBulletList(electricalSafetyRights)}
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Contract, agreement & employment law
        </span>
        <div className="space-y-3">
          {contractRights.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-1"
            >
              <h4 className="text-[14px] font-semibold text-white">{item.topic}</h4>
              <p className="text-[14px] text-white/85 leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Discrimination & harassment protection
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          The Equality Act 2010 protects you from discrimination on 9 protected characteristics. If
          you experience any of the following, you have the right to raise a formal grievance and,
          if necessary, take your case to an Employment Tribunal.
        </p>
        <div className="space-y-3">
          {discriminationProtection.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-1"
            >
              <h4 className="text-[14px] font-semibold text-white">{item.type}</h4>
              <p className="text-[14px] text-white/85 leading-relaxed">{item.example}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
            Important
          </span>
          <p className="text-[14px] text-white/85 leading-relaxed">
            Banter is not an excuse. If comments make you uncomfortable, they can constitute
            harassment regardless of intent. You do not need to prove the person meant to offend —
            only that the behaviour had that effect. Report it to your employer, and if they fail
            to act, contact ACAS.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
          Common rights violations & what to do
        </span>
        <ul className="space-y-3">
          {commonViolations.map((violation, index) => (
            <li
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-1"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Issue
                </span>
                <p className="text-[14px] text-white/85 leading-relaxed">{violation.issue}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
                  Action
                </span>
                <p className="text-[14px] text-white/85 leading-relaxed">{violation.action}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-elec-yellow/20 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
          Remember
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Your apprenticeship should be a positive learning experience. If you're experiencing
          problems, don't suffer in silence — help is available and using it shows strength, not
          weakness.
        </p>
      </div>
    </div>
  );
};

export default ApprenticeRightsTab;
