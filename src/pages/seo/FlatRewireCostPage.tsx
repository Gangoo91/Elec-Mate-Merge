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
  Home,
  Building,
  Clock,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Flat Rewire Cost', href: '/guides/flat-rewire-cost' },
];

const tocItems = [
  { id: 'overview', label: 'Why Rewire a Flat?' },
  { id: 'cost-breakdown', label: 'Cost Breakdown by Flat Size' },
  { id: 'what-is-included', label: 'What Is Included in a Rewire' },
  { id: 'labour-costs', label: 'Labour and Timescales' },
  { id: 'factors', label: 'Factors Affecting Price' },
  { id: 'regulations', label: 'Part P and Building Regulations' },
  { id: 'communal-areas', label: 'Communal Areas and Freeholder Consent' },
  { id: 'for-electricians', label: 'For Electricians: Quoting Flat Rewires' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A flat rewire in the UK typically costs between £2,000 and £4,500 depending on the size of the flat, number of circuits, and complexity of the installation.',
  'A one-bedroom flat rewire averages £2,000 to £3,000; a two-bedroom flat £2,500 to £3,800; and a three-bedroom flat £3,500 to £4,500.',
  'Flat rewires are notifiable under Part P of the Building Regulations and require an Electrical Installation Certificate (EIC) upon completion.',
  'Regulation 411.3.3 of BS 7671 requires 30mA RCD protection on all socket outlet circuits up to 32A and all circuits in bathrooms and outdoors.',
  "Flats may require freeholder or managing agent consent before electrical work begins, and communal area wiring is typically the freeholder's responsibility.",
];

const faqs = [
  {
    question: 'How much does it cost to rewire a one-bedroom flat in 2026?',
    answer:
      'A one-bedroom flat rewire in 2026 typically costs between £2,000 and £3,000. This includes a new consumer unit with RCBOs and SPD, new lighting and power circuits throughout, new wiring to the kitchen and bathroom, testing, certification (EIC), and Part P notification. The lower end applies to small flats with straightforward access and minimal circuits. Costs increase for flats with solid walls, limited void access, or high-specification fittings.',
  },
  {
    question: 'How long does it take to rewire a flat?',
    answer:
      'A one-bedroom flat typically takes 3 to 5 days for first fix and second fix combined. A two-bedroom flat takes 4 to 7 days, and a three-bedroom flat 6 to 9 days. First fix (running cables before plastering) accounts for approximately 60% of the time. If the flat is occupied during the rewire, work may take longer due to the need to maintain temporary supplies and work around furniture.',
  },
  {
    question: 'Do I need freeholder consent to rewire a flat?',
    answer:
      "If you own a leasehold flat, you should check your lease for clauses relating to structural alterations or electrical work. Most leases require you to notify the freeholder or managing agent before carrying out a rewire, particularly if the work involves running cables through communal areas or making penetrations in party walls or floors. The electrician should only work within your flat's demise — communal wiring is the freeholder's responsibility.",
  },
  {
    question: 'Can I live in the flat during a rewire?',
    answer:
      'It is possible to live in a flat during a rewire, though it is disruptive. The electrician can work room by room, maintaining temporary power to parts of the flat not being worked on. However, there will be periods without power, dust from channelling walls, and limited access to certain rooms. If you have the option to stay elsewhere for the first fix phase (2 to 4 days), the work will be completed faster and with less disruption.',
  },
  {
    question: 'Is a flat rewire notifiable under Part P?',
    answer:
      'Yes. A full rewire is notifiable work under Part P of the Building Regulations in England and Wales. The electrician must be registered with a competent person scheme (NICEIC, NAPIT, ELECSA) to self-certify the work, or you must notify Building Control before starting. An Electrical Installation Certificate (EIC) must be issued on completion, documenting the design, construction, inspection, and testing of the new installation.',
  },
  {
    question: 'What is included in a flat rewire?',
    answer:
      'A full flat rewire includes: new consumer unit with RCBOs and SPD; new ring final circuits or radial circuits to socket outlets; new lighting circuits; dedicated circuits for the cooker, electric shower (if applicable), and immersion heater; new wiring to the bathroom (fan, lights, shaver socket); new smoke and heat detector wiring; main and supplementary bonding; testing every circuit to BS 7671 standards; and an Electrical Installation Certificate.',
  },
  {
    question: 'How does a flat rewire differ from a house rewire?',
    answer:
      'Flat rewires are typically smaller in scope (fewer circuits, shorter cable runs) but can be more complex in execution. Access is often restricted — there may be no loft void, concrete floors between storeys, and limited ability to chase walls in party wall structures. Cable routes may need to follow surface-mounted trunking in some areas. Communal supply arrangements and three-phase landlord supplies add complexity. Noise restrictions in flats may also limit working hours.',
  },
  {
    question: 'Will I need to redecorate after a flat rewire?',
    answer:
      'Yes, redecoration is almost always needed after a rewire. First fix involves running cables through walls, floors, and ceilings, which requires chasing out channels in plasterwork. The electrician will leave the channels ready for a plasterer to make good. Budget approximately £500 to £1,500 for plastering and redecoration after a flat rewire, depending on the size of the flat and the extent of making good required.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/rewire-cost-uk',
    title: 'Full House Rewire Cost UK',
    description: 'Complete guide to house rewire costs for larger properties.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-replacement-cost',
    title: 'Consumer Unit Replacement Cost',
    description: 'Detailed breakdown of consumer unit costs — always included in a rewire.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete Electrical Installation Certificates for rewires on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote flat rewires with itemised materials, labour, and professional PDF output.',
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
    heading: 'Why Rewire a Flat?',
    content: (
      <>
        <p>
          A flat rewire replaces all of the electrical wiring, accessories, and the consumer unit in
          a flat with a completely new installation compliant with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>
          . It is typically necessary when the existing wiring is more than 25 to 30 years old, when
          an <SEOInternalLink href="/guides/eicr-certificate">EICR</SEOInternalLink> has identified
          serious deficiencies, or as part of a major renovation.
        </p>
        <p>
          Flats present unique challenges compared to houses. Cable routes are often restricted by
          concrete floors, party walls, and the absence of a loft void. Access to communal risers
          may be needed for the incoming supply. Despite these challenges, flat rewires are
          generally less expensive than house rewires because the overall area and number of
          circuits are smaller.
        </p>
        <p>
          Common triggers for a flat rewire include: rubber or lead-sheathed cables, aluminium
          wiring, rewirable fuses with no RCD protection, a failed EICR with multiple C2
          observations, or a complete renovation of the flat.
        </p>
      </>
    ),
  },
  {
    id: 'cost-breakdown',
    heading: 'Cost Breakdown by Flat Size',
    content: (
      <>
        <p>
          Here are realistic 2026 costs for flat rewires in the UK, including all materials, labour,
          testing, Part P notification, and the EIC.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Studio or one-bedroom flat</strong> — £2,000 to £3,000 total. Typically 4 to
                6 circuits. Materials: £600 to £900 (consumer unit, cable, accessories). Labour:
                £1,200 to £1,800 (3 to 5 days). Certification: £50 to £80.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom flat</strong> — £2,500 to £3,800 total. Typically 6 to 8
                circuits. Materials: £750 to £1,100. Labour: £1,500 to £2,400 (4 to 7 days).
                Certification: £50 to £80.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom flat</strong> — £3,500 to £4,500 total. Typically 8 to 12
                circuits. Materials: £900 to £1,400. Labour: £2,200 to £2,800 (6 to 9 days).
                Certification: £50 to £80.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices do not include redecoration or plastering after the rewire. Budget an
          additional £500 to £1,500 for making good, depending on the extent of channelling
          required.
        </p>
      </>
    ),
  },
  {
    id: 'what-is-included',
    heading: 'What Is Included in a Flat Rewire',
    content: (
      <>
        <p>A comprehensive flat rewire typically includes:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New consumer unit</strong> — metal enclosure with RCBOs, SPD, and main
                switch. Typically a 6 to 10-way board for a flat.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Power circuits</strong> — new ring final circuits or 32A radial circuits to
                socket outlets throughout the flat. Radial circuits are increasingly common in flats
                due to shorter cable runs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lighting circuits</strong> — new 6A lighting circuits with modern cable and
                ceiling roses or downlight connections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated circuits</strong> — cooker circuit, electric shower circuit (if
                applicable), immersion heater, and any other high-power appliances.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bathroom wiring</strong> — IP-rated fittings, extractor fan, shaver socket,
                all compliant with BS 7671 Section 701 zone requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smoke and heat detection</strong> — hardwired interlinked smoke detectors in
                hallways and living rooms, heat detectors in the kitchen, as required by Building
                Regulations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bonding</strong> — main protective bonding to gas, water, and oil services.
                Supplementary bonding where required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing and certification</strong> — full testing of every circuit to BS
                7671 standards and issue of an EIC.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'labour-costs',
    heading: 'Labour and Timescales',
    content: (
      <>
        <p>
          Labour is the largest cost component of a flat rewire. The work is split into two phases:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">First Fix</h3>
            <p className="text-white text-sm leading-relaxed">
              Running new cables through walls, floors, and ceilings. Installing back boxes for
              sockets and switches. Running cables to the consumer unit location. This is the most
              disruptive phase and accounts for approximately 60% of the total labour time.
              Typically 2 to 5 days depending on flat size.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Second Fix</h3>
            <p className="text-white text-sm leading-relaxed">
              After plastering and decoration. Installing socket outlets, switches, light fittings,
              the consumer unit, and connecting all circuits. Testing every circuit and completing
              the EIC. Typically 1 to 3 days depending on flat size.
            </p>
          </div>
        </div>
        <p>
          Electrician day rates in 2026 range from £250 to £400 depending on location. Many
          electricians quote flat rewires as a fixed price, which gives certainty to both parties.
        </p>
      </>
    ),
  },
  {
    id: 'factors',
    heading: 'Factors Affecting Price',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Floor construction</strong> — timber-floored flats allow cables to be run
                under floorboards. Concrete floors require surface-mounted trunking or channelling,
                adding significant time and cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wall construction</strong> — dot-and-dab plasterboard walls have voids for
                cables. Solid brick or block walls require channelling. Party walls should not be
                chased, as this can compromise fire and sound ratings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Number of circuits and accessories</strong> — more sockets, lights, and
                dedicated circuits mean more cable, more accessories, and more testing time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Location</strong> — London flat rewires cost 15% to 30% more than the
                national average due to higher labour rates and overheads. Parking and access
                restrictions in city centres also add time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Asbestos</strong> — older flats (1950s to 1980s) may have asbestos in floor
                tiles, textured coatings, or around heating pipes. If asbestos is encountered, work
                must stop until an asbestos survey and safe removal are completed.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Part P and Building Regulations',
    content: (
      <>
        <p>
          A flat rewire is notifiable work under Part P of the Building Regulations. The electrician
          must be registered with a competent person scheme to self-certify, or Building Control
          must be notified before work starts.
        </p>
        <p>
          Key BS 7671 requirements for a flat rewire include Regulation 411.3.3 requiring 30mA RCD
          protection on socket outlet circuits up to 32A, all bathroom circuits, and any circuits
          supplying equipment outdoors (such as a balcony light). Regulation 421.1.201 requires the
          consumer unit to be a non-combustible enclosure in domestic premises. An SPD must be
          installed following the risk assessment under Regulation 443.4.
        </p>
        <p>
          Upon completion, the electrician issues an Electrical Installation Certificate (EIC)
          covering the design, construction, inspection, and testing of the entire new installation.
          The homeowner also receives a Building Regulations Compliance Certificate through the
          electrician's competent person scheme.
        </p>
      </>
    ),
  },
  {
    id: 'communal-areas',
    heading: 'Communal Areas and Freeholder Consent',
    content: (
      <>
        <p>
          Flat rewires often involve practical challenges that house rewires do not. The electrician
          should only work within the flat's demise — the boundary of your leasehold ownership. Key
          considerations include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Freeholder notification</strong> — most leases require you to notify the
                freeholder or managing agent before carrying out major electrical work. Some require
                written consent.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Communal supply</strong> — the incoming supply from the communal riser to
                your flat's meter is typically the freeholder's responsibility. If the meter tails
                or cutout need attention, this must be coordinated with the managing agent and the
                DNO.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Party walls and floors</strong> — cables should not be chased into party
                walls, as this compromises fire resistance and sound insulation. Cable routes may
                need to be planned around these constraints.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Noise restrictions</strong> — many flat blocks have restrictions on noisy
                work hours. Channelling walls with a chaser or SDS drill generates significant
                noise. Check the building's rules before scheduling work.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Quoting Flat Rewires',
    content: (
      <>
        <p>
          Flat rewires are profitable domestic jobs with predictable scope. Here are tips for
          accurate quoting:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Survey Thoroughly</h4>
                <p className="text-white text-sm leading-relaxed">
                  Check floor construction (timber or concrete), wall type (plasterboard or solid),
                  access to voids, and the condition of the incoming supply. These factors have the
                  biggest impact on labour time.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Use Elec-Mate for Quoting and Certs</h4>
                <p className="text-white text-sm leading-relaxed">
                  Build itemised rewire quotes with the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Complete the{' '}
                  <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink> on site with
                  voice-entry test results and PDF export.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote flat rewires with real trade pricing"
          description="Elec-Mate's quoting app builds itemised rewire quotes with current trade prices. AI cost engineering flags pricing anomalies. 7-day free trial."
          icon={Calculator}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function FlatRewireCostPage() {
  return (
    <GuideTemplate
      title="Flat Rewire Cost 2026 | UK Price Guide"
      description="How much does it cost to rewire a flat in 2026? Complete UK price guide for one, two, and three-bedroom flat rewires. Covers materials, labour, timescales, Part P certification, and factors affecting price."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Flat Rewire Cost: <span className="text-yellow-400">UK Price Guide 2026</span>
        </>
      }
      heroSubtitle="How much does it cost to rewire a flat in the UK? This guide covers realistic 2026 pricing for studio, one-bedroom, two-bedroom, and three-bedroom flat rewires — including materials, labour, timescales, and the unique challenges of rewiring flats."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Flat Rewire Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote Flat Rewires with Confidence"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for itemised quoting, on-site EIC certificates, and AI cost engineering. 7-day free trial, cancel anytime."
    />
  );
}
