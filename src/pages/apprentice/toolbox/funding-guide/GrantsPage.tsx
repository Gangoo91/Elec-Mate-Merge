import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { SmartBackButton } from '@/components/ui/smart-back-button';

const GrantsPage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Grants & Incentives
        </h1>
      </div>

      {/* Total Potential Funding */}
      <Card className="border-green-500/20 bg-green-500/5">
        <CardContent className="p-4 space-y-2">
          <p className="text-green-400 font-bold text-2xl">£14,500+</p>
          <p className="text-white text-sm">
            Total potential funding available to eligible employers on top of the
            £23,000 apprenticeship training fund. This includes CITB grants, age
            incentives, and tax savings.
          </p>
        </CardContent>
      </Card>

      {/* CITB Grants */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-orange-400" />
          <h2 className="text-base font-semibold text-white">CITB Grants</h2>
        </div>

        <Card className="border-orange-500/20 bg-white/5">
          <CardContent className="p-4 space-y-4">
            <p className="text-white text-sm leading-relaxed">
              The Construction Industry Training Board (CITB) provides grants to
              registered employers to support apprenticeship training. The total
              available is{' '}
              <span className="font-bold text-orange-400">£13,500</span> over the
              course of a 4-year apprenticeship.
            </p>

            <div>
              <h4 className="text-white font-semibold text-sm mb-2">
                Grant Breakdown
              </h4>
              <ul className="space-y-1.5">
                {[
                  'Year 1 attendance grant: £2,500 (paid quarterly every 13 weeks)',
                  'Year 2 attendance grant: £2,500 (paid quarterly every 13 weeks)',
                  'Year 3 attendance grant: £2,500 (paid quarterly every 13 weeks)',
                  'Year 4 attendance grant: £2,500 (paid quarterly every 13 weeks)',
                  'Completion bonus: £3,500 (paid on successful completion)',
                  'Total: £13,500 over full programme',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-white"
                  >
                    <CheckCircle className="h-4 w-4 text-orange-400 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quarterly Payment Schedule */}
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 space-y-2">
              <h4 className="text-orange-400 font-semibold text-sm">
                Quarterly Payment Schedule (Per Year)
              </h4>
              <div className="space-y-1">
                <p className="text-white text-sm">
                  Q1 (weeks 1–13): £625
                </p>
                <p className="text-white text-sm">
                  Q2 (weeks 14–26): £625
                </p>
                <p className="text-white text-sm">
                  Q3 (weeks 27–39): £625
                </p>
                <p className="text-white text-sm">
                  Q4 (weeks 40–52): £625
                </p>
                <p className="text-white text-sm font-semibold">
                  Annual total: £2,500
                </p>
              </div>
              <p className="text-white text-xs">
                Payments are made after each 13-week period, subject to the
                apprentice meeting attendance requirements and the employer
                submitting a valid claim.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm mb-2">
                Eligibility
              </h4>
              <ul className="space-y-1.5">
                {[
                  'Employer must be registered with CITB',
                  'Employer must be paying the CITB levy (separate from Apprenticeship Levy)',
                  'Apprentice must be on an approved construction apprenticeship programme',
                  'Claims must be submitted within 52 weeks of the qualifying date',
                  'Apprentice must meet minimum attendance requirements',
                  'Employer must be up to date with CITB levy payments',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-white"
                  >
                    <CheckCircle className="h-4 w-4 text-white flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm mb-2">
                How to Claim — Step by Step
              </h4>
              <ol className="space-y-1.5 list-decimal list-inside">
                <li className="text-sm text-white">
                  Log in to the CITB grants portal at citb.co.uk
                </li>
                <li className="text-sm text-white">
                  Register the apprentice within 12 weeks of their start date
                </li>
                <li className="text-sm text-white">
                  Upload the apprenticeship agreement and commitment statement
                </li>
                <li className="text-sm text-white">
                  Submit attendance evidence every 13 weeks (training provider
                  confirms)
                </li>
                <li className="text-sm text-white">
                  Claim is verified and paid within 20 working days
                </li>
                <li className="text-sm text-white">
                  Submit completion claim once the apprentice passes their EPA
                </li>
              </ol>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm mb-2">
                Common Claim Mistakes to Avoid
              </h4>
              <ul className="space-y-1.5">
                {[
                  'Late registration — register within 12 weeks of start date',
                  'Missing quarterly claim deadlines (52-week window)',
                  'Not having up-to-date CITB levy payments',
                  'Forgetting to submit the completion claim after EPA',
                  'Not keeping evidence of attendance on file',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-white"
                  >
                    <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Travel & Accommodation */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-orange-400" />
          <h2 className="text-base font-semibold text-white">
            CITB Travel & Accommodation
          </h2>
        </div>

        <Card className="border-orange-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            <p className="text-white text-sm leading-relaxed">
              CITB provides additional support for apprentices who need to travel to
              distant training centres for block release or specialist training.
            </p>
            <ul className="space-y-1.5">
              {[
                'CITB covers 80% of eligible travel and accommodation costs',
                'Applies when the training centre is over 50 miles from home or workplace',
                'Also applies to block release training requiring overnight stays',
                'Employer claims through the same CITB grants portal',
                'Receipts and evidence of travel required for claims',
                'Does not cover daily commuting to a local college',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-white"
                >
                  <CheckCircle className="h-4 w-4 text-orange-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Age Incentive Payments */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <h2 className="text-base font-semibold text-white">
            Age Incentive Payments
          </h2>
        </div>

        <Card className="border-blue-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            <p className="text-white text-sm leading-relaxed">
              The government pays a{' '}
              <span className="font-bold text-blue-400">£1,000</span> incentive
              for employers who take on younger apprentices or those with additional
              needs.
            </p>
            <ul className="space-y-1.5">
              {[
                '£1,000 for apprentices aged 16–18 at the start of their apprenticeship',
                '£1,000 for apprentices aged 19–25 with an Education, Health and Care (EHC) plan or care leaver status',
                'Payment split: £500 after 90 days + £500 after 1 year',
                'Paid to: £500 to employer + £500 to training provider',
                'Employer and provider can spend the incentive on anything to support the apprentice',
                'Payments are automatic — no separate claim needed once the apprentice is registered on DAS',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-white"
                >
                  <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Care Leaver Bursary */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <h2 className="text-base font-semibold text-white">
            Care Leaver Bursary
          </h2>
        </div>

        <Card className="border-blue-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            <p className="text-white text-sm leading-relaxed">
              Apprentices who are care leavers may be eligible for a{' '}
              <span className="font-bold text-blue-400">£1,000 bursary</span>{' '}
              paid directly to them (not the employer) to help with the costs of
              starting an apprenticeship.
            </p>
            <ul className="space-y-1.5">
              {[
                '£1,000 paid directly to the apprentice',
                'Must be aged 16–24 and a care leaver',
                'Paid by the training provider from ESFA funding',
                'Separate from the £1,000 age incentive paid to employers',
                'Can be used for travel, equipment, clothing, or other costs',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-white"
                >
                  <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Learning Support */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <h2 className="text-base font-semibold text-white">
            Additional Learning Support
          </h2>
        </div>

        <Card className="border-green-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            <p className="text-white text-sm leading-relaxed">
              Extra funding is available for apprentices with learning difficulties,
              disabilities, or additional support needs.
            </p>
            <ul className="space-y-1.5">
              {[
                'Up to £150 per month additional learning support funding',
                'Covers specialist equipment, software, or adapted materials',
                'One-to-one support workers or learning assistants',
                'Available for dyslexia, ADHD, autism, physical disabilities, and other needs',
                'Claimed by the training provider on top of the funding band',
                'Does not reduce the £23,000 available for training',
                'Requires an initial assessment and evidence of need',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-white"
                >
                  <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* NI Relief & Tax Benefits */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400" />
          <h2 className="text-base font-semibold text-white">
            Tax Benefits for Employers
          </h2>
        </div>

        <Card className="border-cyan-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            <p className="text-white text-sm leading-relaxed">
              Beyond direct grants, employers benefit from significant tax savings
              when taking on apprentices.
            </p>
            <ul className="space-y-1.5">
              {[
                'Employer NI relief: zero employer NI contributions for apprentices under 25',
                'This saves approximately £2,000–£3,000 per year depending on wages',
                'Apprenticeship training costs are an allowable business expense for corporation tax',
                'CITB levy payments are also tax-deductible',
                'Apprentice wages are deductible as normal employment costs',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-white"
                >
                  <CheckCircle className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Other Industry Grants */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-400" />
          <h2 className="text-base font-semibold text-white">
            Other Industry Grants
          </h2>
        </div>

        <Card className="border-purple-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            <ul className="space-y-3">
              <li className="space-y-1">
                <p className="text-purple-400 font-semibold text-sm">
                  JIB Training Grant
                </p>
                <p className="text-white text-sm">
                  Up to £500 for JIB-registered electrical contractors employing
                  apprentices. Covers first-year support costs. Contact JIB directly
                  or check jib.org.uk for current terms and application process.
                </p>
              </li>
              <li className="space-y-1">
                <p className="text-purple-400 font-semibold text-sm">
                  ECA Training Support
                </p>
                <p className="text-white text-sm">
                  Varies — available to Electrical Contractors Association members.
                  Includes training subsidies, mentoring support, and access to ECA
                  training events. Check with your ECA regional office.
                </p>
              </li>
              <li className="space-y-1">
                <p className="text-purple-400 font-semibold text-sm">
                  Local Authority Grants
                </p>
                <p className="text-white text-sm">
                  Varies by area — some local authorities offer additional grants of
                  £500–£2,000 for employers taking on apprentices, especially in
                  areas with skills shortages. Check your local council website or
                  contact your local growth hub.
                </p>
              </li>
              <li className="space-y-1">
                <p className="text-purple-400 font-semibold text-sm">
                  Regional Skills Fund
                </p>
                <p className="text-white text-sm">
                  Up to £1,000 in certain regions — availability depends on your
                  area and current funding rounds. Combined authorities (e.g. Greater
                  Manchester, West Midlands) often run their own schemes.
                </p>
              </li>
              <li className="space-y-1">
                <p className="text-purple-400 font-semibold text-sm">
                  Kickstart / Youth Hub Programmes
                </p>
                <p className="text-white text-sm">
                  Some areas run youth employment hubs that provide additional
                  support for young people starting apprenticeships, including help
                  with travel, work clothing, and tools. Ask your training provider
                  or local Jobcentre Plus.
                </p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Full Financial Summary */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-elec-yellow" />
          <h2 className="text-base font-semibold text-white">
            Full Financial Summary (4-Year L3 Electrical)
          </h2>
        </div>

        <Card className="border-elec-yellow/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            <div>
              <h4 className="text-green-400 font-semibold text-sm mb-2">
                Employer Receives
              </h4>
              <ul className="space-y-1.5">
                <li className="flex items-start justify-between text-sm text-white">
                  <span>Government-funded training</span>
                  <span className="text-green-400 font-semibold">£23,000</span>
                </li>
                <li className="flex items-start justify-between text-sm text-white">
                  <span>CITB attendance grants (4 years)</span>
                  <span className="text-green-400 font-semibold">£10,000</span>
                </li>
                <li className="flex items-start justify-between text-sm text-white">
                  <span>CITB completion bonus</span>
                  <span className="text-green-400 font-semibold">£3,500</span>
                </li>
                <li className="flex items-start justify-between text-sm text-white">
                  <span>Age incentive (if 16–18)</span>
                  <span className="text-green-400 font-semibold">£1,000</span>
                </li>
                <li className="flex items-start justify-between text-sm text-white">
                  <span>NI relief (approx. over 4 years)</span>
                  <span className="text-green-400 font-semibold">£8,000+</span>
                </li>
                <li className="flex items-start justify-between text-sm text-white border-t border-white/10 pt-1.5">
                  <span className="font-semibold">Total value</span>
                  <span className="text-green-400 font-bold">£45,500+</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-amber-400 font-semibold text-sm mb-2">
                Employer Pays
              </h4>
              <ul className="space-y-1.5">
                <li className="flex items-start justify-between text-sm text-white">
                  <span>Co-investment (5% of £23k)</span>
                  <span className="text-amber-400 font-semibold">£1,150</span>
                </li>
                <li className="flex items-start justify-between text-sm text-white">
                  <span>Apprentice wages (4 years approx.)</span>
                  <span className="text-amber-400 font-semibold">£64,000</span>
                </li>
                <li className="flex items-start justify-between text-sm text-white border-t border-white/10 pt-1.5">
                  <span className="font-semibold">Total cost</span>
                  <span className="text-amber-400 font-bold">£65,150</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
              <p className="text-white text-sm">
                <span className="text-green-400 font-semibold">Net result:</span>{' '}
                After grants and tax relief, the true cost of a 4-year apprentice
                is approximately £20,000 — and you gain a fully qualified
                electrician trained to your standards. Compared to hiring at £35k+
                salary plus £5k+ recruitment fees, apprenticeships are significantly
                better value.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GrantsPage;
