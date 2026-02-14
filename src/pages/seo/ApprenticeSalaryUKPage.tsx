import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  TrendingUp,
  GraduationCap,
  MapPin,
  Clock,
  Briefcase,
  Calculator,
  BarChart3,
  Award,
  Users,
  BookOpen,
  Zap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Career', href: '/guides/electrician-career-progression' },
  { label: 'Apprentice Salary', href: '/guides/apprentice-electrician-salary-uk' },
];

const tocItems = [
  { id: 'nmw-nlw-rates', label: 'NMW and NLW Rates 2026' },
  { id: 'year-by-year', label: 'Year 1 to Year 4 Progression' },
  { id: 'regional-variations', label: 'Regional Variations' },
  { id: 'overtime-extras', label: 'Overtime and Extras' },
  { id: 'what-employers-pay', label: 'What Employers Actually Pay' },
  { id: 'jib-apprentice-rates', label: 'JIB Apprentice Rates' },
  { id: 'maximising-earnings', label: 'Maximising Your Earnings' },
  { id: 'after-apprenticeship', label: 'After the Apprenticeship' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The National Minimum Wage for apprentices aged under 19 (or in their first year) is £7.55 per hour from April 2025, with a further rise expected in April 2026.',
  'Apprentice electricians typically earn £14,000 to £18,000 in Year 1, rising to £22,000 to £28,000 by Year 4 depending on employer and region.',
  'JIB (Joint Industry Board) rates for electrical apprentices are significantly higher than the legal minimum — starting around £5.85 per hour above NMW in Year 1.',
  'London and the South East pay the highest apprentice wages, with some employers offering £2,000 to £4,000 more per year than the national average.',
  'Overtime, weekend work, and site allowances can add £3,000 to £6,000 per year to an apprentice electrician salary — track every penny with Elec-Mate business tools.',
];

const faqs = [
  {
    question: 'What is the minimum wage for an apprentice electrician in 2026?',
    answer:
      'The National Minimum Wage (NMW) for apprentices aged under 19, or those aged 19 and over in the first year of their apprenticeship, is £7.55 per hour from April 2025. This rate is reviewed annually and typically rises each April. Once an apprentice turns 19 and has completed the first year, they move to the standard NMW rate for their age group — £10.18 for 18-20 year olds and £12.21 for 21 and over (2025 rates). Most electrical employers pay significantly above these minimums, particularly those on JIB agreements. It is worth noting that the government publishes proposed rates each autumn for the following April, so the 2026 rate will be confirmed by late 2025.',
  },
  {
    question: 'How much does an apprentice electrician earn per year?',
    answer:
      'Annual earnings for an apprentice electrician in the UK typically range from £14,000 to £18,000 in Year 1, £16,000 to £21,000 in Year 2, £19,000 to £24,000 in Year 3, and £22,000 to £28,000 in Year 4. These figures assume a standard 37.5 to 40 hour week without overtime. Actual earnings depend heavily on the employer — large contractors on JIB agreements pay significantly more than the legal minimum, while smaller domestic firms may pay closer to the NMW rate. London weighting can add £2,000 to £4,000 per year. Overtime, weekend work, and travel allowances can push annual earnings higher, particularly for apprentices working on commercial or industrial sites with regular overtime.',
  },
  {
    question: 'Do apprentice electricians get paid for college days?',
    answer:
      'Yes. Apprentice electricians are entitled to be paid for their college or training provider days. This is a legal requirement — the apprenticeship agreement must include paid time for off-the-job training, which typically accounts for at least 20% of the apprentice working hours. Most electrical apprentices attend college one day per week or in block release (one or two weeks at a time, several times per year). The employer pays the apprentice their normal hourly rate for these college days. Some employers also cover travel expenses to the college or training centre. If an employer is not paying for college days, the apprentice should raise this with their training provider or contact ACAS, as this is a breach of the apprenticeship agreement.',
  },
  {
    question: 'Is it worth doing an electrical apprenticeship for the money?',
    answer:
      'The short-term pay during an apprenticeship is modest compared to other entry-level jobs, but the long-term financial return is excellent. A qualified electrician in the UK earns between £32,000 and £45,000 in employed roles, with self-employed electricians regularly earning £50,000 to £75,000 or more. You are effectively trading 3 to 4 years of lower income for a lifetime of higher earnings, job security, and the option to run your own business. Unlike university graduates, apprentice electricians have no student debt and are earning from day one. By age 22-23, a time-served electrician can be earning more than many graduates — and without the loan repayments. The trade also offers strong job security, as the UK consistently has a shortage of qualified electricians.',
  },
  {
    question: 'Can apprentice electricians work overtime?',
    answer:
      'Yes, most employers allow apprentice electricians to work overtime, and many actively encourage it during busy periods. Overtime rates vary — some employers pay time and a half (1.5x the normal hourly rate) for weekday overtime and double time (2x) for weekends and bank holidays. Others pay a flat overtime rate. JIB agreements specify overtime rates for apprentices. Working overtime can significantly boost an apprentice annual earnings — an extra 5 to 10 hours per week at time and a half could add £3,000 to £6,000 per year. However, apprentices under 18 are restricted by Working Time Regulations and cannot work more than 8 hours per day or 40 hours per week. Apprentices aged 18 and over can opt out of the 48-hour weekly limit.',
  },
  {
    question: 'Do JIB rates apply to all apprentice electricians?',
    answer:
      'JIB (Joint Industry Board) rates only apply to apprentices employed by JIB-registered companies. The JIB is a partnership between the Electrical Contractors Association (ECA) and Unite the Union, and its pay rates cover apprentices in the electrical contracting sector. Not all employers are JIB-registered — many smaller domestic electricians and some commercial contractors are outside the JIB framework. JIB apprentice rates are significantly higher than the statutory NMW. For 2025/26, JIB Year 1 apprentice rates start around £13.40 per hour (depending on age), rising each year. If your employer is not JIB-registered, you are still entitled to at least the NMW but may earn considerably less than a JIB apprentice at the same stage.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrician-salary-uk',
    title: 'Electrician Salary UK 2026',
    description:
      'Full salary breakdown for qualified electricians by region, specialism, and employment type.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-career-progression',
    title: 'Career Progression Guide',
    description:
      'From apprentice to MD — every step on the electrician career ladder with typical salaries.',
    icon: TrendingUp,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-apprenticeship-guide',
    title: 'Electrical Apprenticeship Guide',
    description:
      'Everything you need to know about starting an electrical apprenticeship in the UK.',
    icon: GraduationCap,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-day-rates-uk',
    title: 'Electrician Day Rates UK',
    description: 'What qualified electricians charge per day across the UK in 2026.',
    icon: Calculator,
    category: 'Guide',
  },
  {
    href: '/guides/apprentice-portfolio-guide',
    title: 'Apprentice Portfolio Guide',
    description: 'How to build an evidence portfolio that impresses your EPA assessor.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/training/apprentice-hub',
    title: 'Apprentice Training Hub',
    description:
      'Level 2 and Level 3 courses, revision tools, and study resources for electrical apprentices.',
    icon: Award,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'nmw-nlw-rates',
    heading: 'National Minimum Wage and National Living Wage Rates 2026',
    content: (
      <>
        <p>
          Every apprentice electrician in the UK is entitled to at least the National Minimum Wage
          (NMW). The rate depends on your age and how long you have been in the apprenticeship. The
          government reviews these rates every April, and the Low Pay Commission recommends the new
          figures each autumn.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">NMW / NLW Rates (from April 2025)</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Apprentice rate:</strong> £7.55 per hour — applies to apprentices under 19,
                or aged 19+ in their first year of the apprenticeship.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Aged 18-20:</strong> £10.18 per hour — applies once you turn 19 and have
                completed your first apprenticeship year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Aged 21 and over (NLW):</strong> £12.21 per hour — the National Living Wage
                applies to all workers aged 21 and over, including apprentices past their first
                year.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These are the legal minimums. In practice, most electrical employers — particularly those
          registered with the{' '}
          <SEOInternalLink href="/guides/electrician-career-progression">
            JIB (Joint Industry Board)
          </SEOInternalLink>{' '}
          — pay significantly more than the NMW. If you are being paid exactly the apprentice NMW
          rate, you are at the bottom of the market. It is worth shopping around.
        </p>
        <p>
          The 2026 rates will be confirmed by the government in autumn 2025 following the Low Pay
          Commission recommendation. Historically, the NMW has risen by 5-10% per year. We will
          update this page as soon as the 2026 figures are announced.
        </p>
      </>
    ),
  },
  {
    id: 'year-by-year',
    heading: 'Year 1 to Year 4: How Your Pay Progresses',
    content: (
      <>
        <p>
          An electrical apprenticeship typically lasts 3 to 4 years. Your pay increases each year as
          your skills develop and you take on more responsibility on site. Here is what to expect at
          each stage:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Year 1: £14,000 to £18,000</h4>
                <p className="text-white text-sm leading-relaxed">
                  You are brand new to the trade. You will be shadowing a qualified electrician,
                  carrying materials, learning basic first fix, and attending college one day per
                  week (or block release). Most employers start you on the apprentice NMW or
                  slightly above. JIB employers start at around £13.40 per hour. Your focus is
                  learning — the pay reflects that.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Year 2: £16,000 to £21,000</h4>
                <p className="text-white text-sm leading-relaxed">
                  You are starting to contribute more on site. You can do first fix and second fix
                  on your own for straightforward jobs. Your employer is getting value from your
                  work, and your pay should reflect this. Most employers give a pay rise at the
                  start of Year 2. JIB rates step up automatically.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Year 3: £19,000 to £24,000</h4>
                <p className="text-white text-sm leading-relaxed">
                  You are doing productive work on site with minimal supervision. You may be running
                  small jobs on your own. You are studying for your Level 3 qualification and
                  preparing for the{' '}
                  <SEOInternalLink href="/guides/am2-exam-preparation">
                    AM2 assessment
                  </SEOInternalLink>
                  . Your productivity is close to a qualified electrician, and your pay is stepping
                  up accordingly.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Year 4: £22,000 to £28,000</h4>
                <p className="text-white text-sm leading-relaxed">
                  Your final year. You are working at near-qualified level and completing your
                  End-Point Assessment (EPA). Some apprentices in Year 4 earn close to an improver
                  rate. Once you pass the AM2, you qualify as a JIB-graded electrician and your pay
                  jumps to the qualified rate — typically £35,000 to £42,000.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          These figures assume a standard 37.5 to 40 hour working week without overtime. Add
          overtime and your take-home pay will be higher. The jump from Year 4 apprentice pay to
          qualified electrician pay is significant — often a 40-60% increase.
        </p>
      </>
    ),
  },
  {
    id: 'regional-variations',
    heading: 'Regional Variations: Where Apprentices Earn Most',
    content: (
      <>
        <p>
          Apprentice electrician pay varies significantly across the UK. London and the South East
          pay the most, while some rural areas pay close to the legal minimum. Here is a regional
          breakdown:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>London:</strong> £18,000 to £24,000 (Year 1 to Year 4). London weighting of
                £2,000 to £4,000 is common. Large contractors like Balfour Beatty, NG Bailey, and
                Briggs and Forrester pay the highest rates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>South East:</strong> £16,000 to £22,000. Close to London rates, particularly
                in areas like Reading, Brighton, and the M4 corridor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Midlands:</strong> £14,000 to £20,000. Birmingham and Coventry pay above
                average; rural Midlands areas pay less.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>North West:</strong> £14,000 to £20,000. Manchester and Liverpool offer
                competitive rates, especially on large commercial projects.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>North East and Yorkshire:</strong> £13,000 to £19,000. Lower cost of living
                offsets lower wages to some extent.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scotland:</strong> £14,000 to £20,000. Edinburgh and Glasgow pay above the
                Scottish average. SJIB rates (Scottish equivalent of JIB) apply to registered
                employers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wales:</strong> £13,000 to £18,000. Cardiff and Swansea pay above the Welsh
                average. Rural Wales pays the least.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Keep in mind that higher wages in London and the South East are partially offset by higher
          living costs and longer commutes. An apprentice earning £16,000 in the North East may have
          a similar standard of living to one earning £20,000 in London after rent and transport are
          accounted for.
        </p>
      </>
    ),
  },
  {
    id: 'overtime-extras',
    heading: 'Overtime, Weekend Work, and Site Allowances',
    content: (
      <>
        <p>
          Your basic hourly rate is only part of the picture. Many apprentice electricians
          significantly boost their earnings through overtime, weekend work, and allowances:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Weekday overtime:</strong> Typically paid at 1.5x your normal rate. Working
                an extra 2 hours per day at time and a half adds roughly £100 to £150 per week.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Weekend work:</strong> Saturday work is usually 1.5x, Sunday and bank
                holidays are often 2x (double time). A full Saturday at double time can be worth
                £120 to £180 for a Year 3 or 4 apprentice.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Travel and lodging allowances:</strong> If you work away from your normal
                base, many employers pay travel time and mileage. Some commercial and industrial
                contractors offer lodge allowances of £30 to £60 per night for apprentices working
                away from home.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shift allowances:</strong> Night shifts and early morning starts on
                industrial sites often attract a premium of 15-30% on top of the base rate.
              </span>
            </li>
          </ul>
        </div>
        <p>
          An apprentice who works regular overtime can add £3,000 to £6,000 per year to their base
          salary. On large commercial sites with consistent Saturday work, the annual boost can be
          even greater. The key is to{' '}
          <SEOInternalLink href="/guides/how-to-price-electrical-jobs">
            track your hours accurately
          </SEOInternalLink>{' '}
          and ensure you are paid correctly for every hour worked — including travel time where
          applicable.
        </p>
        <SEOAppBridge
          title="Track every hour and penny from day one"
          description="Elec-Mate business tools include expense tracking, income logging, and financial dashboards. Even as an apprentice, building the habit of tracking your earnings and outgoings sets you up for success when you go self-employed."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'what-employers-pay',
    heading: 'What Employers Actually Pay: Beyond the Minimum',
    content: (
      <>
        <p>
          The NMW is the legal floor, but most electrical employers pay above it. The employer type
          makes a huge difference to what you actually earn:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Large Contractors (JIB)</h3>
            <p className="text-white text-sm leading-relaxed">
              Companies like Balfour Beatty, NG Bailey, Briggs and Forrester, Derry Building
              Services, and T Clarke pay JIB rates, which are significantly above the NMW. They
              offer structured training programmes, day release to college, and clear progression
              pathways. These are typically the best-paid apprenticeships.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Medium Commercial Firms</h3>
            <p className="text-white text-sm leading-relaxed">
              Mid-size electrical contractors with 10 to 50 employees usually pay above NMW but may
              not match full JIB rates. They offer good variety of work and a balance between
              structured training and hands-on experience. Pay is typically 10-30% above NMW.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Small Domestic Firms</h3>
            <p className="text-white text-sm leading-relaxed">
              One or two-person domestic electrical businesses. Pay can be close to NMW, but the
              learning experience is often excellent — you see every aspect of the business, from
              customer interaction to pricing and invoicing. The apprenticeship may feel more like
              learning a trade than working for a corporation.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Maintenance and Facilities</h3>
            <p className="text-white text-sm leading-relaxed">
              Hospitals, universities, local authorities, and facilities management companies employ
              apprentice electricians. Pay is usually above NMW with good benefits (pension, sick
              pay, holiday). The work is maintenance-focused rather than installation.
            </p>
          </div>
        </div>
        <p>
          When choosing an apprenticeship, do not just look at the hourly rate. Consider the quality
          of training, the variety of work, the employer track record with apprentices, and whether
          past apprentices have gone on to become qualified and successful. A well-trained
          apprentice from a good employer is worth far more in the long run than one who earned an
          extra pound per hour but learned less.
        </p>
      </>
    ),
  },
  {
    id: 'jib-apprentice-rates',
    heading: 'JIB Apprentice Rates Explained',
    content: (
      <>
        <p>
          The Joint Industry Board (JIB) sets pay rates for the electrical contracting industry
          through the National Agreement between the Electrical Contractors Association (ECA) and
          Unite the Union. JIB rates are reviewed annually and published each January for the
          calendar year.
        </p>
        <p>
          JIB apprentice rates are structured by year of training and are significantly higher than
          the statutory NMW. For 2025/26, JIB apprentice rates are approximately:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stage 1 (Year 1):</strong> Approximately £13.40 per hour — nearly double the
                apprentice NMW rate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stage 2 (Year 2):</strong> Approximately £14.80 per hour — with annual
                increments built in.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stage 3 (Year 3):</strong> Approximately £16.20 per hour — approaching the
                improver rate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stage 4 (Year 4):</strong> Approximately £17.60 per hour — just below the
                qualified JIB electrician rate.
              </span>
            </li>
          </ul>
        </div>
        <p>
          JIB rates also include provisions for overtime pay, travel time, lodge allowances, and
          tool allowances. If your employer is JIB-registered, you should receive all of these as
          standard. You can check if your employer is JIB-registered by searching the JIB website or
          asking your training provider. If you are not sure whether you are being paid correctly,
          contact Unite the Union or the JIB directly.
        </p>
        <p>
          Not all employers are JIB-registered. If your employer is not on the JIB, you are still
          entitled to the NMW as a minimum, but the JIB rates and conditions do not apply.
        </p>
      </>
    ),
  },
  {
    id: 'maximising-earnings',
    heading: 'Maximising Your Earnings as an Apprentice',
    content: (
      <>
        <p>
          Even as an apprentice, there are practical steps you can take to maximise your income and
          set yourself up for higher earnings once you qualify:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Say yes to overtime.</strong> Every hour of overtime earns you more per hour
                than your base rate. It also shows your employer you are committed, which leads to
                faster pay rises and better opportunities.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Get your CSCS/ECS card early.</strong> Having the right site card means you
                can work on commercial and industrial sites, which pay more and offer more overtime.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Study hard and pass first time.</strong> Failing exams costs time and money.
                Use the{' '}
                <SEOInternalLink href="/training/apprentice-hub">
                  Elec-Mate apprentice training hub
                </SEOInternalLink>{' '}
                to revise between college sessions. Passing first time gets you to qualified status
                — and qualified pay — faster.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Keep records of everything you learn.</strong> Build your{' '}
                <SEOInternalLink href="/guides/apprentice-portfolio-guide">
                  apprentice portfolio
                </SEOInternalLink>{' '}
                as you go. A strong portfolio makes the EPA easier and demonstrates your competence
                to future employers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consider switching employers if underpaid.</strong> There is a shortage of
                apprentices in the electrical trade. If your employer is paying NMW with no overtime
                and no progression, other employers will pay more. Loyalty is admirable, but not at
                the expense of your income and development.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="46+ training courses to accelerate your apprenticeship"
          description="Elec-Mate apprentice hub covers Level 2 and Level 3 electrical courses, AM2 preparation, portfolio building, and EPA readiness. Study on your phone between site visits. 7-day free trial."
          icon={GraduationCap}
        />
      </>
    ),
  },
  {
    id: 'after-apprenticeship',
    heading: 'After the Apprenticeship: What Comes Next',
    content: (
      <>
        <p>
          Completing your apprenticeship and passing the{' '}
          <SEOInternalLink href="/guides/am2-exam-preparation">AM2 assessment</SEOInternalLink> is
          the gateway to significantly higher earnings. Here is what typically happens to your
          income after you qualify:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Newly qualified (improver):</strong> £28,000 to £35,000. You are qualified
                but still building speed and experience.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>2 to 5 years qualified:</strong> £35,000 to £45,000. You are fully
                productive and may be supervising apprentices yourself.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-employed:</strong> £45,000 to £75,000+. Many electricians go{' '}
                <SEOInternalLink href="/guides/going-self-employed-electrician">
                  self-employed
                </SEOInternalLink>{' '}
                within 2 to 5 years of qualifying and earn significantly more than employed
                equivalents.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Specialist roles:</strong> Electricians who add{' '}
                <SEOInternalLink href="/guides/cpd-for-electricians">
                  specialist qualifications
                </SEOInternalLink>{' '}
                in areas like testing and inspection, EV charging, solar PV, or fire alarms can
                command day rates of £250 to £400.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The financial case for completing an electrical apprenticeship is compelling. You start
          with modest pay but graduate into a profession with strong earnings potential, excellent
          job security, and the freedom to work for yourself. The 3 to 4 years of lower apprentice
          pay is an investment that pays back many times over across a 30 to 40 year career.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ApprenticeSalaryUKPage() {
  return (
    <GuideTemplate
      title="Apprentice Electrician Salary UK 2026 | Pay Rates"
      description="Complete guide to apprentice electrician pay in the UK. NMW/NLW rates by age, Year 1 to Year 4 salary progression, JIB rates, regional variations, overtime pay, and what employers actually pay in 2026."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Career Guide"
      badgeIcon={GraduationCap}
      heroTitle={
        <>
          Apprentice Electrician Salary UK:{' '}
          <span className="text-yellow-400">What You Will Actually Earn in 2026</span>
        </>
      }
      heroSubtitle="From the legal minimum wage to JIB rates, Year 1 to Year 4 progression, regional variations, and overtime — this is the complete guide to apprentice electrician pay in the UK. Know your worth from day one."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Apprentice Electrician Pay"
      relatedPages={relatedPages}
      ctaHeading="Fast-Track Your Apprenticeship with Elec-Mate"
      ctaSubheading="46+ training courses, AM2 preparation, portfolio tools, and revision resources built for electrical apprentices. Study on your phone, track your progress, and qualify faster. 7-day free trial."
    />
  );
}
