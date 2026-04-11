import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  Calculator,
  Zap,
  Wrench,
  FileCheck2,
  PoundSterling,
  ClipboardCheck,
  Home,
  Building,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'PAT Testing Cost', href: '/guides/pat-testing-cost' },
];

const tocItems = [
  { id: 'overview', label: 'What Is PAT Testing?' },
  { id: 'cost-breakdown', label: 'Cost Breakdown' },
  { id: 'pricing-models', label: 'Pricing Models' },
  { id: 'what-is-tested', label: 'What Gets Tested' },
  { id: 'who-needs-pat', label: 'Who Needs PAT Testing?' },
  { id: 'legal-requirements', label: 'Legal Requirements' },
  { id: 'frequency', label: 'Testing Frequency' },
  { id: 'for-electricians', label: 'For Electricians: PAT Testing as a Service' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'PAT testing typically costs between £1 and £3 per appliance, with minimum call-out charges of £50 to £80 for small jobs. The per-item cost decreases significantly with volume.',
  'PAT testing is not a legal requirement in itself, but the Electricity at Work Regulations 1989 require employers to ensure all electrical equipment is maintained in a safe condition — PAT testing is the most practical way to demonstrate compliance.',
  'The IET Code of Practice for In-Service Inspection and Testing of Electrical Equipment (5th Edition, 2020) provides guidance on testing methods, frequencies, and pass/fail criteria.',
  'Common PAT tests include earth continuity, insulation resistance, and functional checks. Class I appliances (earthed) require earth continuity testing; Class II appliances (double insulated) do not.',
  'For electricians, PAT testing is a profitable add-on service with low overheads — a quality PAT tester costs £300 to £800 and pays for itself within a few jobs.',
];

const faqs = [
  {
    question: 'How much does PAT testing cost per appliance in 2026?',
    answer:
      'PAT testing typically costs between £1 and £3 per appliance in 2026, depending on volume. For small jobs (under 20 items), expect to pay £2 to £3 per appliance plus a call-out charge of £50 to £80. For larger jobs (50+ items), the per-appliance cost drops to £1 to £1.50. Some PAT testing companies offer fixed-price packages — for example, up to 50 appliances for £80 to £120, or up to 100 appliances for £120 to £200.',
  },
  {
    question: 'Is PAT testing a legal requirement?',
    answer:
      'PAT testing itself is not specifically required by law. However, the Electricity at Work Regulations 1989 (Regulation 4) require that all electrical systems and equipment are maintained to prevent danger. The Health and Safety at Work Act 1974 also places a general duty on employers to ensure the safety of employees and others. PAT testing is the most widely accepted method of demonstrating compliance with these duties. Landlords, employers, and organisations open to the public are expected to have portable appliances tested at appropriate intervals.',
  },
  {
    question: 'Who can carry out PAT testing?',
    answer:
      'There is no legal requirement for PAT testing to be carried out by a qualified electrician. The IET Code of Practice states that a "competent person" should carry out the testing — someone who has the knowledge, training, and experience to perform the tests safely and interpret the results correctly. In practice, many electricians offer PAT testing as an additional service, and dedicated PAT testing companies employ trained operatives. A one-day PAT testing training course is widely available.',
  },
  {
    question: 'How often should PAT testing be done?',
    answer:
      'Testing frequency depends on the type of equipment, the environment, and the risk. The IET Code of Practice provides suggested intervals: office IT equipment (desktops, monitors) every 4 to 5 years; portable equipment in offices (kettles, phone chargers) every 2 to 3 years; equipment on construction sites every 3 months; commercial kitchen equipment every 12 months; and equipment in schools and hospitals every 12 months. A formal risk assessment should determine the actual frequency for each environment.',
  },
  {
    question: 'What equipment do I need for PAT testing?',
    answer:
      'A PAT tester is the primary piece of equipment. Entry-level testers (such as the Megger PAT120) cost around £300 to £400 and perform basic earth continuity and insulation resistance tests. Mid-range testers (such as the Megger PAT420 or Seaward PrimeTest 250+) cost £500 to £800 and offer automatic test sequences, data storage, and Bluetooth connectivity for label printing. You also need PAT labels (pass and fail), a logbook or digital record system, and basic hand tools for visual inspection.',
  },
  {
    question: 'What is the difference between Class I and Class II appliances?',
    answer:
      'Class I appliances have basic insulation and rely on an earth connection for safety — if a fault occurs, the earth path allows a protective device (fuse or RCD) to disconnect the supply. Examples include kettles, toasters, and desktop computers with metal cases. Class II appliances have double or reinforced insulation and do not require an earth connection — they are marked with the double-square symbol. Examples include phone chargers, laptop power supplies, and many power tools. PAT testing procedures differ: Class I appliances require an earth continuity test, while Class II do not.',
  },
  {
    question: 'Do landlords need PAT testing?',
    answer:
      'While there is no specific legal requirement for landlords to PAT test appliances in residential lettings, landlords have a duty of care under the Electrical Equipment (Safety) Regulations 1994 and the Consumer Protection Act 1987 to ensure that any electrical appliances they provide are safe. If you supply appliances as part of a furnished let (washing machine, fridge, kettle, etc.), having them PAT tested at appropriate intervals demonstrates that duty of care and provides evidence in the event of a claim.',
  },
  {
    question: 'What happens if an appliance fails a PAT test?',
    answer:
      'If an appliance fails a PAT test, it must be taken out of service immediately and labelled as failed. The appliance should be repaired by a competent person and retested, or it should be disposed of. A failed PAT label (typically red) should be attached to the appliance to prevent it being used. The failure should be recorded in the PAT testing register. Common reasons for failure include damaged cables, loose earth connections, high insulation resistance readings, and cracked or damaged casings.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/eicr-certificate',
    title: 'EICR Certificate Guide',
    description: 'Fixed installation testing — the counterpart to portable appliance testing.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-certificate-types-uk',
    title: 'Electrical Certificate Types UK',
    description: 'Overview of all UK electrical certificates and when each is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote PAT testing jobs with professional PDF output.',
    icon: Calculator,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'What Is PAT Testing?',
    content: (
      <>
        <p>
          PAT testing — Portable Appliance Testing — is the process of inspecting and testing
          portable electrical equipment to check it is safe to use. It involves a visual inspection
          of the appliance, cable, and plug, followed by electrical tests using a dedicated PAT
          tester.
        </p>
        <p>
          The term "PAT testing" is widely used across the UK, though technically it is a tautology
          (the "T" already stands for "testing"). The process is guided by the IET Code of Practice
          for In-Service Inspection and Testing of Electrical Equipment, now in its 5th Edition
          (2020).
        </p>
        <p>
          PAT testing applies to any electrical appliance that has a plug and can be moved —
          kettles, computers, power tools, phone chargers, extension leads, and much more. It is
          distinct from fixed installation testing (covered by{' '}
          <SEOInternalLink href="/guides/eicr-certificate">EICRs</SEOInternalLink>), which tests the
          permanent wiring in a building.
        </p>
      </>
    ),
  },
  {
    id: 'cost-breakdown',
    heading: 'Cost Breakdown',
    content: (
      <>
        <p>
          PAT testing costs vary based on the number of appliances, the location, and whether you
          use an independent tester or a national company. Here are realistic 2026 prices:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1 to 20 appliances</strong> — £80 to £120 total (including call-out).
                Effectively £4 to £6 per appliance. Suitable for small offices, home-based
                businesses, and small shops.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>20 to 50 appliances</strong> — £80 to £150 total. Per-appliance cost: £2 to
                £3. Typical for medium offices, salons, and small workshops.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>50 to 100 appliances</strong> — £120 to £200 total. Per-appliance cost:
                £1.50 to £2. Typical for larger offices, schools, and retail premises.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>100 to 500 appliances</strong> — £1 to £1.50 per appliance. Large offices,
                warehouses, and multi-site contracts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>500+ appliances</strong> — £0.80 to £1.20 per appliance. Large commercial
                contracts, hospitals, universities, and factory environments.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Prices include visual inspection, electrical testing, labelling (pass/fail), and a
          certificate or register of results.
        </p>
      </>
    ),
  },
  {
    id: 'pricing-models',
    heading: 'Pricing Models',
    content: (
      <>
        <p>PAT testing companies and individual electricians use several pricing models:</p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Per Appliance</h3>
            <p className="text-white text-sm leading-relaxed">
              The most common model. A fixed price per appliance tested, typically with a minimum
              call-out charge. Simple and transparent for both parties. Prices: £1 to £3 per item
              depending on volume.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Fixed Package</h3>
            <p className="text-white text-sm leading-relaxed">
              A fixed price for a set number of appliances — for example, "up to 50 appliances for
              £100" or "up to 100 appliances for £180". Good for customers who know roughly how many
              appliances they have.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Day Rate</h3>
            <p className="text-white text-sm leading-relaxed">
              For large sites, some testers charge a day rate of £200 to £350 per day. A competent
              tester can test 100 to 200 appliances per day depending on the type and location of
              equipment.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Annual Contract</h3>
            <p className="text-white text-sm leading-relaxed">
              Multi-site businesses often agree annual contracts with a PAT testing company. This
              provides scheduled testing, consistent record-keeping, and often a discounted
              per-appliance rate.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'what-is-tested',
    heading: 'What Gets Tested',
    content: (
      <>
        <p>PAT testing involves two stages: a visual inspection and electrical tests.</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Visual Inspection</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Cable and plug condition — checking for damage, cuts, kinks, or exposed conductors
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Plug wiring — correct connections, appropriate fuse rating, cable grip secure
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Appliance condition — casing damage, ventilation blocked, signs of overheating
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Suitability for the environment — appropriate IP rating for wet or dusty conditions
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Electrical Tests</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth continuity</strong> (Class I only) — verifies a low-resistance path
                from the earth pin of the plug to all exposed metalwork. Pass: typically below 0.1
                ohms plus the resistance of the cable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation resistance</strong> — measures the resistance of the insulation
                between live conductors and earth (Class I) or between live conductors and
                accessible parts (Class II). Pass: typically above 1 megohm.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Functional check</strong> — the appliance is switched on and checked for
                correct operation, unusual noises, overheating, or other signs of fault.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'who-needs-pat',
    heading: 'Who Needs PAT Testing?',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Employers</strong> — the Electricity at Work Regulations 1989 require
                employers to maintain all electrical equipment used by employees in a safe
                condition. PAT testing is the standard method.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Landlords</strong> — any electrical appliances supplied with a rental
                property (washing machine, cooker, kettle) should be PAT tested to demonstrate duty
                of care.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Schools and colleges</strong> — all portable electrical equipment should be
                tested regularly, typically annually.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hospitality and retail</strong> — hotels, restaurants, shops, and pubs need
                PAT testing for insurance compliance and health and safety obligations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Construction sites</strong> — portable tools and equipment on construction
                sites require testing every 3 months due to the harsh environment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Churches, village halls, and community venues</strong> — any organisation
                that allows public use of electrical equipment should have PAT testing in place.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'legal-requirements',
    heading: 'Legal Requirements',
    content: (
      <>
        <p>
          PAT testing is not itself mandated by a specific law. However, several pieces of
          legislation create a duty to maintain electrical equipment safely, and PAT testing is the
          accepted way to demonstrate compliance:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electricity at Work Regulations 1989</strong> — Regulation 4 requires that
                all electrical systems are maintained to prevent danger. This includes portable
                appliances.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Health and Safety at Work Act 1974</strong> — Section 2 places a general
                duty on employers to ensure, so far as is reasonably practicable, the health,
                safety, and welfare of employees.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Provision and Use of Work Equipment Regulations 1998 (PUWER)</strong> —
                Regulation 5 requires that work equipment is maintained in an efficient state, in
                efficient working order, and in good repair.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IET Code of Practice (5th Edition, 2020)</strong> — not legislation, but the
                industry-standard guide for in-service testing of portable equipment. It provides
                testing methods, suggested frequencies, and pass/fail criteria.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'frequency',
    heading: 'Testing Frequency',
    content: (
      <>
        <p>
          The IET Code of Practice provides suggested testing intervals based on equipment type and
          environment. These are guidelines, not legal requirements — a risk assessment should
          determine the actual frequency.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Construction sites</strong> — visual check weekly, combined inspection and
                test every 3 months.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Industrial and commercial kitchens</strong> — combined inspection and test
                every 12 months.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hotels, schools, hospitals</strong> — combined inspection and test every 12
                months for portable equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Offices</strong> — IT equipment every 4 to 5 years; portable equipment
                (kettles, heaters) every 2 to 3 years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rental properties</strong> — at each change of tenancy and otherwise every
                12 to 24 months for supplied appliances.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: PAT Testing as a Service',
    content: (
      <>
        <p>
          PAT testing is an excellent add-on service for electricians. The overheads are low, the
          work is straightforward, and it provides recurring revenue from commercial clients. Here
          is how to get started:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Equipment Investment</h4>
                <p className="text-white text-sm leading-relaxed">
                  A mid-range PAT tester (Megger PAT420, Seaward PrimeTest 250+) costs £500 to £800.
                  It pays for itself within 2 to 3 jobs. Add a label printer (£100 to £200) for
                  professional pass/fail labels.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Pricing Strategy</h4>
                <p className="text-white text-sm leading-relaxed">
                  Charge £1.50 to £3 per appliance with a minimum of £80. A 100-appliance office at
                  £1.50 each gives £150 for approximately 3 hours of work — £50/hour before
                  overheads. Target annual contracts for recurring revenue. Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  for professional quotes.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Add PAT testing to your services"
          description="Quote PAT testing jobs professionally with Elec-Mate's quoting app. Track clients, schedule retests, and build recurring revenue. 7-day free trial."
          icon={Calculator}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function PATTestingCostPage() {
  return (
    <GuideTemplate
      title="PAT Testing Cost 2026 | UK Price Guide"
      description="How much does PAT testing cost in 2026? UK price guide covering per-appliance rates, package pricing, legal requirements, testing frequency, and what is involved. £1-3 per appliance for most jobs."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          PAT Testing Cost: <span className="text-yellow-400">UK Price Guide 2026</span>
        </>
      }
      heroSubtitle="How much does PAT testing cost? From small offices to large commercial premises, this guide covers realistic 2026 pricing, legal requirements, testing frequency, and what every PAT test involves — whether you are a business owner needing testing or an electrician offering it as a service."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About PAT Testing Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote PAT Testing Jobs Professionally"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for professional quoting, job tracking, and client management. 7-day free trial, cancel anytime."
    />
  );
}
