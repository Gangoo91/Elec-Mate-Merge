import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { SmartBackButton } from '@/components/ui/smart-back-button';

const EmployerInfoPage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Employer Information
        </h1>
      </div>

      {/* Intro Card */}
      <Card className="border-purple-500/20 bg-white/5">
        <CardContent className="p-4 space-y-2">
          <h2 className="text-lg font-semibold text-white">
            Information for Employers
          </h2>
          <p className="text-white text-sm leading-relaxed">
            This section helps employers understand apprenticeship funding and make
            the business case for training. Share this with employers who are
            unfamiliar with how apprenticeship funding works or need convincing that
            taking on an apprentice is a smart investment.
          </p>
        </CardContent>
      </Card>

      {/* Levy vs Non-Levy */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <h2 className="text-base font-semibold text-white">
            Levy vs Non-Levy Employers
          </h2>
        </div>

        {/* Levy-Paying */}
        <Card className="border-blue-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            <h3 className="font-semibold text-blue-400 text-sm">
              Levy-Paying Employers
            </h3>
            <ul className="space-y-1.5">
              {[
                'Annual payroll over £3 million',
                'Pay 0.5% of payroll as Apprenticeship Levy',
                'Funds available in digital apprenticeship service (DAS) account',
                'Government adds 10% top-up (ending April 2026)',
                'Use it or lose it — funds expire after 24 months (changing to 12 months)',
                'Can transfer up to 50% to supply chain or other employers',
                'Funds appear monthly in arrears — can plan spending ahead',
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
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
              <p className="text-white text-sm">
                <span className="text-blue-400 font-semibold">Tip:</span> If
                you are not using all your levy funds, consider transferring up to
                50% to supply chain partners, subcontractors, or other employers.
                Many smaller firms are actively seeking levy transfers — it builds
                goodwill and develops your talent pipeline.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Non-Levy (SME) */}
        <Card className="border-green-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            <h3 className="font-semibold text-green-400 text-sm">
              Non-Levy Employers (SMEs)
            </h3>
            <ul className="space-y-1.5">
              {[
                'Annual payroll under £3 million (most electrical contractors)',
                'Pay only 5% of training costs — government pays 95%',
                'Maximum £1,150 for a Level 3 Electrical apprenticeship (5% of £23,000)',
                '100% funded for under-25s at non-levy employers (from August 2026)',
                'Can receive levy transfer for 100% funded training — zero cost',
                'Reserve funding through the apprenticeship service portal',
                'Co-investment paid monthly to training provider — approximately £24/month',
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
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
              <p className="text-white text-sm">
                <span className="text-green-400 font-semibold">Tip:</span> Ask
                your training provider about levy transfer opportunities — many
                large employers have unused funds available. A levy transfer means
                you pay nothing at all for training.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* How to Register on DAS */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400" />
          <h2 className="text-base font-semibold text-white">
            How to Register on the Apprenticeship Service
          </h2>
        </div>

        <Card className="border-cyan-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            <p className="text-white text-sm leading-relaxed">
              All employers must register on the Digital Apprenticeship Service
              (DAS) to access funding. Here is how:
            </p>
            <ol className="space-y-2 list-decimal list-inside">
              <li className="text-sm text-white">
                Go to apprenticeships.education.gov.uk and create an account
              </li>
              <li className="text-sm text-white">
                Add your organisation using your Companies House number or charity
                number
              </li>
              <li className="text-sm text-white">
                Add your PAYE scheme(s) — this links your payroll for levy
                calculations
              </li>
              <li className="text-sm text-white">
                Accept the employer agreement (terms and conditions for funding)
              </li>
              <li className="text-sm text-white">
                Search for and select a training provider
              </li>
              <li className="text-sm text-white">
                Add your apprentice(s) with their details and chosen standard
              </li>
              <li className="text-sm text-white">
                Approve the apprenticeship — funding is now reserved
              </li>
            </ol>
            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
              <p className="text-white text-sm">
                <span className="text-cyan-400 font-semibold">Note:</span> Most
                training providers will walk you through this process for free. Many
                will set up the account on your behalf with your permission.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Choosing a Training Provider */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-400" />
          <h2 className="text-base font-semibold text-white">
            Choosing a Training Provider
          </h2>
        </div>

        <Card className="border-purple-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            <p className="text-white text-sm leading-relaxed">
              The training provider you choose has a massive impact on your
              apprentice's experience and success. Key things to look for:
            </p>
            <ul className="space-y-1.5">
              {[
                'Ofsted rating: Good or Outstanding (check reports.ofsted.gov.uk)',
                'Specialises in electrical apprenticeships — not just general construction',
                'Offers the full ST0152 v1.2 standard with AM2 preparation',
                'Location: reasonable travel for your apprentice (or offers block release)',
                'Good achievement rates: check the National Achievement Rate Tables',
                'Provides regular progress reviews and clear communication with employers',
                'Has a dedicated employer liaison or account manager',
                'Offers levy transfer matching if you are a non-levy employer',
                'Includes EPA preparation and mock assessments',
                'Ask other local employers for recommendations',
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
          </CardContent>
        </Card>
      </div>

      {/* Year-by-Year Cost Breakdown */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <h2 className="text-base font-semibold text-white">
            Year-by-Year Cost & Return
          </h2>
        </div>

        <Card className="border-amber-500/20 bg-white/5">
          <CardContent className="p-4 space-y-4">
            {/* Year 1 */}
            <div className="space-y-2">
              <h4 className="text-amber-400 font-semibold text-sm">
                Year 1 — Investment Phase
              </h4>
              <ul className="space-y-1">
                <li className="flex items-start justify-between text-sm text-white">
                  <span>Apprentice wages (NMW)</span>
                  <span className="text-amber-400">~£12,500</span>
                </li>
                <li className="flex items-start justify-between text-sm text-white">
                  <span>Co-investment share</span>
                  <span className="text-amber-400">~£288</span>
                </li>
                <li className="flex items-start justify-between text-sm text-white">
                  <span>CITB grant received</span>
                  <span className="text-green-400">-£2,500</span>
                </li>
                <li className="flex items-start justify-between text-sm text-white">
                  <span>Age incentive (if eligible)</span>
                  <span className="text-green-400">-£1,000</span>
                </li>
              </ul>
              <p className="text-white text-xs">
                Apprentice is mostly learning in Year 1 — college days, basic site
                tasks, and shadowing. Limited productive output but building
                foundation skills.
              </p>
            </div>

            {/* Year 2 */}
            <div className="space-y-2">
              <h4 className="text-amber-400 font-semibold text-sm">
                Year 2 — Growing Productivity
              </h4>
              <ul className="space-y-1">
                <li className="flex items-start justify-between text-sm text-white">
                  <span>Apprentice wages (NMW/age rate)</span>
                  <span className="text-amber-400">~£14,500</span>
                </li>
                <li className="flex items-start justify-between text-sm text-white">
                  <span>Co-investment share</span>
                  <span className="text-amber-400">~£288</span>
                </li>
                <li className="flex items-start justify-between text-sm text-white">
                  <span>CITB grant received</span>
                  <span className="text-green-400">-£2,500</span>
                </li>
              </ul>
              <p className="text-white text-xs">
                Apprentice becomes productive — first fix, containment, basic
                testing assistance. Can work with reduced supervision on familiar
                tasks.
              </p>
            </div>

            {/* Year 3 */}
            <div className="space-y-2">
              <h4 className="text-green-400 font-semibold text-sm">
                Year 3 — Significant Productivity
              </h4>
              <ul className="space-y-1">
                <li className="flex items-start justify-between text-sm text-white">
                  <span>Apprentice wages (NMW/age rate)</span>
                  <span className="text-amber-400">~£17,000</span>
                </li>
                <li className="flex items-start justify-between text-sm text-white">
                  <span>Co-investment share</span>
                  <span className="text-amber-400">~£288</span>
                </li>
                <li className="flex items-start justify-between text-sm text-white">
                  <span>CITB grant received</span>
                  <span className="text-green-400">-£2,500</span>
                </li>
              </ul>
              <p className="text-white text-xs">
                Apprentice handles most installation work independently. Second fix,
                consumer unit changes, testing under supervision. High productive
                value.
              </p>
            </div>

            {/* Year 4 */}
            <div className="space-y-2">
              <h4 className="text-green-400 font-semibold text-sm">
                Year 4 — Near-Qualified
              </h4>
              <ul className="space-y-1">
                <li className="flex items-start justify-between text-sm text-white">
                  <span>Apprentice wages (NMW/age rate)</span>
                  <span className="text-amber-400">~£20,000</span>
                </li>
                <li className="flex items-start justify-between text-sm text-white">
                  <span>Co-investment share</span>
                  <span className="text-amber-400">~£288</span>
                </li>
                <li className="flex items-start justify-between text-sm text-white">
                  <span>CITB grant received</span>
                  <span className="text-green-400">-£2,500</span>
                </li>
                <li className="flex items-start justify-between text-sm text-white">
                  <span>CITB completion bonus</span>
                  <span className="text-green-400">-£3,500</span>
                </li>
              </ul>
              <p className="text-white text-xs">
                Apprentice completes EPA. Working at near-qualified level —
                installation, testing, and inspection tasks with minimal
                supervision. Ready for full duties on completion.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Apprentice Wage Rates */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <h2 className="text-base font-semibold text-white">
            Apprentice Wage Rates (2025/26)
          </h2>
        </div>

        <Card className="border-green-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            <p className="text-white text-sm leading-relaxed">
              Minimum wage rates for apprentices (from April 2025):
            </p>
            <ul className="space-y-1.5">
              <li className="flex items-start justify-between text-sm text-white">
                <span>Apprentice rate (Year 1 or under 19)</span>
                <span className="text-green-400 font-semibold">£7.55/hr</span>
              </li>
              <li className="flex items-start justify-between text-sm text-white">
                <span>Age 18–20 (after Year 1)</span>
                <span className="text-green-400 font-semibold">£10.00/hr</span>
              </li>
              <li className="flex items-start justify-between text-sm text-white">
                <span>Age 21+ (after Year 1)</span>
                <span className="text-green-400 font-semibold">£12.21/hr</span>
              </li>
            </ul>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
              <p className="text-white text-sm">
                <span className="text-green-400 font-semibold">Note:</span> Many
                electrical employers pay above minimum wage, especially from Year 2
                onwards. JIB-graded employers follow JIB recommended rates which are
                typically higher. Check your apprenticeship agreement for your
                agreed rate.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Common Employer Concerns */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <h2 className="text-base font-semibold text-white">
            Common Employer Concerns
          </h2>
        </div>

        <Card className="border-red-500/20 bg-white/5">
          <CardContent className="p-4 space-y-4">
            <div className="space-y-2">
              <h4 className="text-red-400 font-semibold text-sm">
                &quot;What if they leave after qualifying?&quot;
              </h4>
              <p className="text-white text-sm">
                Statistics show 92% of apprentices stay with their training
                employer. Loyalty built over 4 years is stronger than any contract.
                Even if they do leave, you have had 3+ years of productive work at
                apprentice rates and your CITB grants back.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-red-400 font-semibold text-sm">
                &quot;We are too busy to supervise an apprentice&quot;
              </h4>
              <p className="text-white text-sm">
                Apprentices become productive from Year 2. The supervision required
                decreases each year. Think of the apprentice as an investment — they
                take work off your qualified staff as they develop.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-red-400 font-semibold text-sm">
                &quot;College days mean lost productivity&quot;
              </h4>
              <p className="text-white text-sm">
                College is typically one day per week (or block release). The
                remaining 4 days your apprentice is on site, learning and
                contributing. The training they receive at college directly improves
                their on-site work quality.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-red-400 font-semibold text-sm">
                &quot;What about quiet periods?&quot;
              </h4>
              <p className="text-white text-sm">
                Quiet periods are actually ideal for training — use the time for
                structured learning, mock tests, portfolio work, and skills
                practice. Your apprentice must be paid and employed throughout, but
                slower periods accelerate their development.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-red-400 font-semibold text-sm">
                &quot;The paperwork is too complicated&quot;
              </h4>
              <p className="text-white text-sm">
                Your training provider handles nearly all the paperwork — DAS
                registration, ILR submissions, progress reviews, and EPA
                arrangements. You just need to sign the apprenticeship agreement and
                submit CITB claims quarterly.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Supervision Guide */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <h2 className="text-base font-semibold text-white">
            Supervision Requirements
          </h2>
        </div>

        <Card className="border-blue-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            <p className="text-white text-sm leading-relaxed">
              What is expected of the employer in terms of on-site supervision:
            </p>
            <ul className="space-y-1.5">
              {[
                'Assign a named workplace mentor or supervisor',
                'Ensure the apprentice works under appropriate supervision at all times',
                'Supervision level decreases as competence increases over the 4 years',
                'Release the apprentice for college/training as agreed (typically 1 day/week)',
                'Provide a range of work experiences across the standard requirements',
                'Support progress reviews (minimum every 12 weeks with training provider)',
                'Allow time for portfolio evidence collection and on-the-job training',
                'Provide appropriate PPE, tools, and site access',
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

      {/* Comparison with Hiring */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <h2 className="text-base font-semibold text-white">
            Apprentice vs Hiring Qualified
          </h2>
        </div>

        <Card className="border-amber-500/20 bg-amber-500/5">
          <CardContent className="p-4 space-y-3">
            <p className="text-white text-sm leading-relaxed">
              Hiring a qualified electrician typically costs:
            </p>
            <ul className="space-y-1.5">
              {[
                'Recruitment fees: £4,000–£8,000 per hire',
                'Qualified salary: £35,000–£42,000 per year',
                'Retraining to your standards: £2,000–£5,000',
                'Higher turnover risk — experienced staff move for higher pay',
                'No CITB grants available for hiring qualified staff',
                'No government training subsidy — employer pays full cost',
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
            <p className="text-white text-sm leading-relaxed">
              An apprentice costs significantly less in Year 1–2, becomes
              productive from Year 2, and is fully qualified by Year 4 — trained
              exactly to your standards, loyal to your business, and at a fraction
              of the total cost.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Case Study */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <h2 className="text-base font-semibold text-white">
            Example: Typical SME Electrical Contractor
          </h2>
        </div>

        <Card className="border-green-500/20 bg-green-500/5">
          <CardContent className="p-4 space-y-3">
            <p className="text-white text-sm leading-relaxed">
              A 6-person electrical firm with £180,000 payroll (non-levy) takes on a
              17-year-old apprentice on the Level 3 Installation Electrician
              standard:
            </p>
            <ul className="space-y-1.5">
              {[
                'Training cost: £0 (secured a levy transfer through training provider)',
                'CITB grants received over 4 years: £13,500',
                'Age incentive received: £1,000',
                'NI savings over 4 years: approximately £8,000',
                'Total apprentice wages paid over 4 years: approximately £64,000',
                'Net cost after grants and savings: approximately £42,000',
                'Result: a fully qualified electrician trained to their exact standards',
                'Equivalent hire would cost: £35k salary + £5k recruitment + £3k retraining = £43k in year one alone',
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

      {/* Industry Statistics */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-elec-yellow" />
          <h2 className="text-base font-semibold text-white">
            Industry Statistics
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Card className="border-blue-500/20 bg-white/5">
            <CardContent className="p-4 text-center">
              <p className="text-blue-400 font-bold text-xl">25,000+</p>
              <p className="text-white text-xs mt-1">
                Electricians needed annually in the UK
              </p>
            </CardContent>
          </Card>
          <Card className="border-green-500/20 bg-white/5">
            <CardContent className="p-4 text-center">
              <p className="text-green-400 font-bold text-xl">92%</p>
              <p className="text-white text-xs mt-1">
                Apprentices stay with their training employer
              </p>
            </CardContent>
          </Card>
          <Card className="border-purple-500/20 bg-white/5">
            <CardContent className="p-4 text-center">
              <p className="text-purple-400 font-bold text-xl">£23k</p>
              <p className="text-white text-xs mt-1">
                Training cost savings vs hiring qualified
              </p>
            </CardContent>
          </Card>
          <Card className="border-amber-500/20 bg-white/5">
            <CardContent className="p-4 text-center">
              <p className="text-amber-400 font-bold text-xl">4 years</p>
              <p className="text-white text-xs mt-1">
                To a fully trained, qualified electrician
              </p>
            </CardContent>
          </Card>
          <Card className="border-red-500/20 bg-white/5">
            <CardContent className="p-4 text-center">
              <p className="text-red-400 font-bold text-xl">47%</p>
              <p className="text-white text-xs mt-1">
                Of UK electricians are over 45 — retirement wave coming
              </p>
            </CardContent>
          </Card>
          <Card className="border-cyan-500/20 bg-white/5">
            <CardContent className="p-4 text-center">
              <p className="text-cyan-400 font-bold text-xl">£13.5k</p>
              <p className="text-white text-xs mt-1">
                CITB grants available per apprentice
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmployerInfoPage;
