import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { SmartBackButton } from '@/components/ui/smart-back-button';

const FundingModelsPage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Funding Models
        </h1>
      </div>

      {/* Intro Card */}
      <Card className="border-blue-500/20 bg-white/5">
        <CardContent className="p-4 space-y-2">
          <h2 className="text-lg font-semibold text-white">
            How Apprenticeship Funding Works
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Apprenticeship training in England is funded through the Education and
            Skills Funding Agency (ESFA). Skills England — which replaced the
            Institute for Apprenticeships and Technical Education (IfATE) in June
            2025 — is responsible for setting apprenticeship standards and funding
            bands. There are three main funding models that determine how training
            costs are paid.
          </p>
        </CardContent>
      </Card>

      {/* How the System Works */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400" />
          <h2 className="text-base font-semibold text-white">
            How the Digital Apprenticeship Service Works
          </h2>
        </div>

        <Card className="border-cyan-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            <p className="text-white text-sm leading-relaxed">
              All apprenticeship funding flows through the Digital Apprenticeship
              Service (DAS) — a government online portal at{' '}
              <span className="text-cyan-400 font-semibold">
                apprenticeships.education.gov.uk
              </span>
              . Both levy and non-levy employers use DAS to manage their
              apprenticeship funding.
            </p>
            <ol className="space-y-2 list-decimal list-inside">
              <li className="text-sm text-white">
                Employer creates a DAS account and adds their PAYE scheme
              </li>
              <li className="text-sm text-white">
                Employer selects a training provider and agrees a price (up to the
                funding band maximum)
              </li>
              <li className="text-sm text-white">
                Employer adds the apprentice to their account with start date and
                standard details
              </li>
              <li className="text-sm text-white">
                Training provider confirms the apprentice on their side
              </li>
              <li className="text-sm text-white">
                ESFA pays the training provider monthly in arrears (80% over the
                programme, 20% on completion)
              </li>
              <li className="text-sm text-white">
                EPA costs are paid separately from the funding band when the
                apprentice enters gateway
              </li>
            </ol>
            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
              <p className="text-white text-sm">
                <span className="text-cyan-400 font-semibold">Key point:</span>{' '}
                Money never passes through the apprentice. The ESFA pays the
                training provider directly, and the employer pays any co-investment
                share directly to the provider.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Three Funding Models */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <h2 className="text-base font-semibold text-white">
            Three Funding Models
          </h2>
        </div>

        {/* Apprenticeship Levy */}
        <Card className="border-blue-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            <h3 className="font-semibold text-blue-400 text-sm">
              1. Apprenticeship Levy
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Large employers with an annual pay bill over £3 million pay the
              Apprenticeship Levy — 0.5% of their total payroll. These funds sit in
              a digital apprenticeship service (DAS) account and can be used to pay
              for apprenticeship training.
            </p>
            <ul className="space-y-2">
              {[
                '0.5% of annual payroll over £3 million',
                '£15,000 annual allowance offset against levy',
                'Government adds 10% top-up (ending April 2026)',
                'Funds currently expire after 24 months (changing to 12 months April 2026)',
                'Can transfer up to 50% of annual levy to other employers',
                'Funds appear in DAS account monthly, one month in arrears',
                'Oldest funds are used first (first in, first out)',
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

            {/* Levy Calculation Example */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 space-y-2">
              <h4 className="text-blue-400 font-semibold text-sm">
                Worked Example: £5m Payroll
              </h4>
              <div className="space-y-1">
                <p className="text-white text-sm">
                  Annual payroll: £5,000,000
                </p>
                <p className="text-white text-sm">
                  Levy charge (0.5%): £25,000
                </p>
                <p className="text-white text-sm">
                  Minus £15,000 allowance: £10,000 actual levy paid
                </p>
                <p className="text-white text-sm">
                  Plus 10% government top-up: £1,000
                </p>
                <p className="text-white text-sm font-semibold">
                  Total available for training: £11,000 per year
                </p>
              </div>
              <p className="text-white text-xs">
                This is enough to fund approximately one Level 3 electrical
                apprentice every two years at the £23,000 funding band.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Government Co-Investment */}
        <Card className="border-green-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            <h3 className="font-semibold text-green-400 text-sm">
              2. Government Co-Investment
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Non-levy employers (SMEs with payroll under £3 million) share the cost
              with the government. Currently the government pays 95% and the
              employer pays 5%. This is the most common model for small electrical
              contractors.
            </p>
            <ul className="space-y-2">
              {[
                'Current split: 95% government / 5% employer',
                'Changing August 2026: 75% government / 25% employer',
                '100% funded for under-25s at non-levy employers (from August 2026)',
                'Maximum employer contribution for Level 3 Electrical: £1,150 (5% of £23,000)',
                'Employer uses the apprenticeship service to reserve funding',
                'Employer co-investment is paid directly to the training provider',
                'Monthly payments spread across the duration of the apprenticeship',
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

            {/* Co-Investment Worked Example */}
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 space-y-2">
              <h4 className="text-green-400 font-semibold text-sm">
                Worked Example: SME Taking on L3 Apprentice
              </h4>
              <div className="space-y-1">
                <p className="text-white text-sm">
                  Agreed training price: £23,000 (full funding band)
                </p>
                <p className="text-white text-sm">
                  Government pays (95%): £21,850
                </p>
                <p className="text-white text-sm">
                  Employer pays (5%): £1,150
                </p>
                <p className="text-white text-sm">
                  Spread over 4 years: approximately £24 per month
                </p>
                <p className="text-white text-sm font-semibold">
                  Apprentice pays: £0
                </p>
              </div>
              <p className="text-white text-xs">
                After August 2026 the employer share rises to 25% (£5,750), but
                apprentices under 25 will be fully funded at non-levy employers.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Levy Transfer */}
        <Card className="border-purple-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            <h3 className="font-semibold text-purple-400 text-sm">
              3. Levy Transfer
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Levy-paying employers can transfer up to 50% of their annual levy
              funds to other employers. This means SMEs can receive 100% funded
              training through a transfer — no co-investment required. This is the
              best deal for small employers.
            </p>
            <ul className="space-y-2">
              {[
                '100% funded for the receiving employer — zero cost',
                '50% transfer allowance (increased from 25% in April 2024)',
                'Growing availability — more large employers offering transfers',
                'Receiving employer pays nothing towards training costs',
                'Training provider often helps arrange the transfer agreement',
                'Transfer must be set up before the apprenticeship starts',
                'Sending employer can choose to fund specific standards or sectors',
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

            {/* How to Find a Levy Transfer */}
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 space-y-2">
              <h4 className="text-purple-400 font-semibold text-sm">
                How to Find a Levy Transfer
              </h4>
              <ol className="space-y-1.5 list-decimal list-inside">
                <li className="text-sm text-white">
                  Ask your training provider — they often have relationships with
                  levy-paying employers
                </li>
                <li className="text-sm text-white">
                  Check the gov.uk levy transfer matching service
                </li>
                <li className="text-sm text-white">
                  Contact large employers in your supply chain (main contractors,
                  house builders)
                </li>
                <li className="text-sm text-white">
                  Speak to your local Chamber of Commerce or LEP
                </li>
                <li className="text-sm text-white">
                  Many training providers offer a free levy transfer matching
                  service
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Funding Band Detail */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <h2 className="text-base font-semibold text-white">
            Funding Band Detail
          </h2>
        </div>

        <Card className="border-amber-500/20 bg-white/5">
          <CardContent className="p-4 space-y-4">
            <div>
              <p className="text-amber-400 font-bold text-2xl">£23,000</p>
              <p className="text-white text-sm mt-1">
                Maximum funding for Level 3 Installation Electrician / Maintenance
                Electrician (ST0152 v1.2). Increased from £21,000 on 20 July 2025
                by Skills England.
              </p>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
              <h4 className="text-amber-400 font-semibold text-sm mb-1">
                What is a Funding Band?
              </h4>
              <p className="text-white text-sm">
                A funding band is the maximum amount the government will contribute
                towards training. Employers and providers can agree a price below
                the band (saving money), but never above it. If a provider charges
                more than the band, the employer must pay the difference from their
                own funds — this is rare and should not happen for standard L3
                electrical programmes.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm mb-2">
                What funding covers
              </h4>
              <ul className="space-y-1.5">
                {[
                  'All training delivery by your training provider (classroom, workshop, online)',
                  'End Point Assessment (EPA) fees paid to the EPAO',
                  'EAL or City & Guilds qualification registration and certification',
                  'AM2 practical assessment at a NET centre',
                  'Functional Skills (English and Maths) delivery and exams if needed',
                  'Learning materials provided by the training provider',
                  'Initial assessment and diagnostic testing',
                  'Progress reviews and tripartite meetings',
                  'Internal quality assurance and verification',
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
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm mb-2">
                What funding does not cover
              </h4>
              <ul className="space-y-1.5">
                {[
                  'Apprentice wages (paid by employer — minimum apprentice wage or NMW by age)',
                  'Travel to college or training centre (some CITB support available)',
                  'Personal tools, equipment, and PPE (employer responsibility)',
                  'Additional qualifications beyond the standard (e.g. 18th Edition if not required)',
                  'Accommodation during block release training (CITB may cover 80%)',
                  'Time spent on normal productive work (only OJT is funded activity)',
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

      {/* Payment Timeline */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <h2 className="text-base font-semibold text-white">
            Payment Timeline
          </h2>
        </div>

        <Card className="border-green-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            <p className="text-white text-sm leading-relaxed">
              Understanding when and how funding is paid to your training provider:
            </p>
            <ul className="space-y-2">
              {[
                'Monthly payments: 80% of the agreed price is paid in equal monthly instalments over the planned duration',
                'Completion payment: 20% is held back and paid when the apprentice completes their EPA',
                'EPA funding: a portion is ring-fenced from the total price for EPA costs (typically £2,000–£3,000)',
                'Payments are made in arrears — the provider delivers training first, then claims',
                'If an apprentice withdraws early, funding stops and is recalculated pro-rata',
                'Break in learning: funding pauses and resumes when the apprentice returns',
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

      {/* What Happens at End of Funding */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-elec-yellow" />
          <h2 className="text-base font-semibold text-white">
            What Happens at End of Programme
          </h2>
        </div>

        <Card className="border-elec-yellow/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            <p className="text-white text-sm leading-relaxed">
              When you reach the end of your planned training period:
            </p>
            <ol className="space-y-2 list-decimal list-inside">
              <li className="text-sm text-white">
                <span className="font-semibold">Gateway meeting</span> — your
                employer, training provider, and you agree you are ready for EPA
              </li>
              <li className="text-sm text-white">
                <span className="font-semibold">EPA registration</span> — your
                training provider registers you with the EPAO and the EPA funding
                is released
              </li>
              <li className="text-sm text-white">
                <span className="font-semibold">EPA delivery</span> — you
                complete your knowledge test, practical assessment, and
                professional discussion
              </li>
              <li className="text-sm text-white">
                <span className="font-semibold">Completion payment</span> — the
                held-back 20% is released to the training provider
              </li>
              <li className="text-sm text-white">
                <span className="font-semibold">Certificate</span> — your
                apprenticeship completion certificate is issued by ESFA
              </li>
            </ol>
            <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-3">
              <p className="text-white text-sm">
                <span className="text-elec-yellow font-semibold">
                  Important:
                </span>{' '}
                If your apprenticeship takes longer than planned (common for L3
                electrical), funding continues as long as you remain on programme.
                The total paid will not exceed the funding band, but monthly
                payments may be recalculated over the extended period.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Changes Warning */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <h2 className="text-base font-semibold text-white">
            Upcoming Changes
          </h2>
        </div>

        <Card className="border-red-500/20 bg-red-500/5">
          <CardContent className="p-4 space-y-3">
            <h3 className="font-semibold text-red-400 text-sm">
              Growth & Skills Levy — April 2026
            </h3>
            <p className="text-white text-sm leading-relaxed">
              The government is replacing the Apprenticeship Levy with the Growth &
              Skills Levy from April 2026. This is the biggest change to
              apprenticeship funding in a decade. Key changes:
            </p>
            <ul className="space-y-2">
              {[
                'Levy funds will expire after 12 months (currently 24 months)',
                'The 10% government top-up will end',
                'The levy will also fund non-apprenticeship training for the first time',
                'Skills England will decide which non-apprenticeship courses qualify',
                'Co-investment changing to 75% government / 25% employer (August 2026)',
                '100% funding for under-25s at non-levy employers (from August 2026)',
                'Existing apprentices already on programme will not be affected mid-way',
                'New starts from April 2026 will be under the new rules',
              ].map((item) => (
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

        {/* Key Dates */}
        <Card className="border-red-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            <h3 className="font-semibold text-red-400 text-sm">
              Key Dates to Watch
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-white">
                <span className="text-red-400 font-semibold min-w-[90px] flex-shrink-0">
                  Apr 2026
                </span>
                Growth & Skills Levy replaces Apprenticeship Levy. 12-month fund
                expiry begins. 10% top-up ends.
              </li>
              <li className="flex items-start gap-2 text-sm text-white">
                <span className="text-red-400 font-semibold min-w-[90px] flex-shrink-0">
                  Aug 2026
                </span>
                Co-investment changes to 75%/25%. Under-25s at non-levy employers
                become 100% funded.
              </li>
              <li className="flex items-start gap-2 text-sm text-white">
                <span className="text-red-400 font-semibold min-w-[90px] flex-shrink-0">
                  2026–27
                </span>
                Skills England to publish list of approved non-apprenticeship
                courses fundable under Growth & Skills Levy.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FundingModelsPage;
