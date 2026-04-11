import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  MapPin,
  ShieldCheck,
  Building2,
  FileCheck2,
  Calculator,
  Zap,
  Wrench,
  GraduationCap,
  Home,
  Users,
  Landmark,
  AlertTriangle,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Electrician in Cumbria', href: '/electricians/cumbria' },
  { label: 'Electrician in Workington', href: '/electricians/workington' },
];

const tocItems = [
  { id: 'overview', label: 'Workington Overview' },
  { id: 'industrial', label: 'Industrial and Chemical Electrical Work' },
  { id: 'nuclear', label: 'Proximity to Sellafield' },
  { id: 'dno', label: 'Electricity North West (ENW)' },
  { id: 'property-types', label: 'Property Types and Challenges' },
  { id: 'pricing', label: 'Electrician Rates in Workington' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "Workington is a coastal industrial town on the west Cumbrian coast, 12 miles north of Sellafield. The local electrical market is strongly shaped by proximity to the nuclear site and the town's own chemical and manufacturing industry heritage.",
  "The Electricity at Work Regulations 1989 are particularly relevant for electricians working in Workington's industrial and chemical sites — competence requirements under Regulation 16 must be met for all industrial electrical work.",
  'Electricity North West (ENW) is the Distribution Network Operator. Rural and coastal properties in the Workington area may have TT earthing systems requiring full RCD protection under BS 7671 regulation 411.3.3.',
  'Workington has a significant stock of older industrial and residential buildings. Many pre-1980 properties have asbestos in ceiling and floor materials — a survey is essential before any invasive electrical work.',
  'Labour rates in Workington are typically £35–52/hr for standard work. Nuclear contractor rates for Sellafield work (accessible within a short commute) are substantially higher at £60–90+/hr.',
  'Coastal exposure in Workington creates additional considerations for external electrical installations — IP ratings for external fittings and appropriate cable entry sealing are more important than in inland locations.',
];

const faqs = [
  {
    question: 'What types of industrial electrical work are common in Workington?',
    answer:
      'Workington has a history of steel and manufacturing industry, and while the steelworks closed in 2006, the town retains chemical, engineering, and light manufacturing businesses. Industrial electrical work in this context includes: maintenance of three-phase power systems, motor control and drive installations, control panel wiring and testing, lighting upgrades to LED in industrial units, testing and inspection under the Electricity at Work Regulations 1989, and compliance with the Provision and Use of Work Equipment Regulations (PUWER). The industrial sector in west Cumbria also includes some offshore-adjacent work related to the Irish Sea renewable energy development. Electricians with City & Guilds 2382 (18th Edition) and relevant industrial experience are well-placed for this market.',
  },
  {
    question: 'How close is Workington to Sellafield, and can I commute to work there?',
    answer:
      'Sellafield is approximately 12 miles south of Workington, about a 20-minute drive via the A595. Many Workington-based electricians commute to Sellafield for contract shifts. To access Sellafield you need a valid site pass (security clearance), relevant SQEP evidence, and registration with a principal contractor operating on site. Contract electricians at Sellafield typically earn £60–90+/hr, making the daily commute highly worthwhile for those who have obtained the necessary clearances. The Sellafield Visitors Centre and main site gates are at Seascale — allow for traffic on the A595, particularly at shift change times.',
  },
  {
    question: 'Who is the DNO for Workington?',
    answer:
      'Electricity North West (ENW) is the Distribution Network Operator for Workington and the wider west Cumbria area. All DNO notifications — G98/G99 for solar PV, battery storage, and other generation; new connection requests; capacity upgrades — go through ENW. The national fault line is 105. Coastal and rural properties around Workington may be served by overhead distribution lines with TT earthing systems. Always verify the earthing arrangement at the supply intake before designing or quoting installations, particularly for EV charger or heat pump work where the earthing type affects installation requirements.',
  },
  {
    question:
      'What are the challenges of external electrical installations in a coastal location like Workington?',
    answer:
      'Coastal exposure in Workington and the surrounding area creates additional requirements for external electrical installations. Salt-laden air accelerates corrosion of external fittings, cable entry points, and metalwork. Key considerations include: selecting IP65 or higher rated luminaires and enclosures for external use; ensuring cable glands and conduit entries are properly sealed against moisture ingress; using marine-grade or stainless steel fixings for external equipment; considering additional weatherproofing for external consumer unit enclosures and meter cupboards; and specifying appropriate cable types (SWA or suitably sheathed) for external runs. EV charger units intended for coastal locations should have appropriate weatherproofing ratings — check manufacturer specifications for salt atmosphere resistance.',
  },
  {
    question: 'What qualifications do I need for industrial electrical work in Workington?',
    answer:
      'Core qualifications for industrial electrical work in Workington include: NVQ Level 3 in Electrical Installation (or City & Guilds 2365 equivalent), BS 7671 18th Edition (C&G 2382), and for inspection and testing work, C&G 2391 or 2394/2395. For work involving instrumentation and control systems, C&G 2346 or equivalent instrument technician qualifications may be required. Industrial sites working with hazardous atmospheres (flammable chemicals) require CompEx certification (Competence for Explosive Atmospheres). For Sellafield access, additional site-specific induction and SQEP assessment is required. The Electricity at Work Regulations 1989 require that all persons working on electrical systems are competent — employers and site operators will ask for evidence of qualifications and experience.',
  },
  {
    question: 'Is there demand for renewable energy work around Workington?',
    answer:
      'Yes. West Cumbria has significant wind energy development, and the Irish Sea offshore wind sector is a growing market. Onshore, electricians can access installation and maintenance work on local wind turbines and solar installations. The offshore wind market (Walney Extension, Morecambe Bay, and proposed floating wind projects in the Irish Sea) primarily employs specialist offshore electrical technicians with offshore survival training (BOSIET) and GWO certification, but substation and onshore grid connection work near the Cumbrian coast does employ onshore electricians. For domestic renewable energy, the combination of high electricity prices, rural properties off the gas grid, and good wind/solar resource creates a healthy demand for heat pumps, solar PV, and battery storage installations.',
  },
  {
    question: 'How much does an electrician charge in Workington?',
    answer:
      'Workington electrician rates in 2026 typically range from £35–52/hr for qualified domestic and commercial work. Day rates are £240–360 for a sole trader. Emergency call-out rates are £60–90/hr with a minimum charge of £75–110. Common fixed-price jobs: consumer unit replacement £550–920, single socket addition £100–155, full rewire (3-bed house) £3,500–5,800, EICR £170–260, EV charger installation £700–1,150. Specialist industrial and nuclear contractor rates accessed from Workington (primarily Sellafield) are £60–90+/hr. Travel premium applies for remote rural and coastal properties south towards Whitehaven and beyond.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates on your phone — required for all notifiable work in England.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Electrical Installation Condition Reports for Workington rental properties and industrial inspections.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for Workington industrial installations and coastal rural properties with TT earthing.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'EV charger installations in west Cumbria — coastal IP ratings, ENW notifications, and PME earthing guidance.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/electricians/cumbria',
    title: 'Electrician in Cumbria',
    description:
      'County overview — Sellafield nuclear requirements, ENW, and Cumbria electrician rates.',
    icon: MapPin,
    category: 'Guide',
  },
  {
    href: '/electricians/whitehaven',
    title: 'Electrician in Whitehaven',
    description:
      'Neighbouring coastal industrial town — Sellafield proximity, Georgian heritage, and local rates.',
    icon: MapPin,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Electrician in Workington: What You Need to Know',
    content: (
      <>
        <p>
          Workington is a coastal industrial town on the west Cumbrian coast, situated at the mouth
          of the River Derwent. With a population of around 25,000, it is one of the larger towns on
          the Cumbrian coast and serves as a significant employment centre for the surrounding area,
          including the communities of Cockermouth (8 miles east) and the villages of the Allerdale
          district.
        </p>
        <p>
          The town's electrical market is shaped by two dominant factors: its industrial heritage
          and the proximity of Sellafield nuclear site 12 miles to the south. Workington was
          historically a steel town, and while the steelworks closed in 2006, the town retains a
          base of chemical, engineering, light manufacturing, and port industries that create demand
          for industrial electrical work. Sellafield's proximity means that many Workington-based
          electricians commute to the nuclear site for contract work, significantly influencing
          local expectations around rates and qualifications.
        </p>
        <p>
          The coastal location creates additional considerations for external electrical
          installations, while the housing stock — a mix of Victorian terraces, inter-war social
          housing, and post-war development — presents the standard challenges of older Cumbrian
          properties: solid walls, potential asbestos, and consumer units requiring modernisation.
        </p>
      </>
    ),
  },
  {
    id: 'industrial',
    heading: 'Industrial and Chemical Electrical Work in Workington',
    content: (
      <>
        <p>
          Workington's industrial sector creates demand for electricians with commercial and
          industrial experience, beyond the standard domestic market. Key areas include:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electricity at Work Regulations 1989</strong> — all industrial electrical
                work in Workington's commercial and manufacturing sites must comply with these
                regulations. Regulation 4 requires electrical systems to be maintained to prevent
                danger. Regulation 16 requires that persons working on electrical systems must be
                competent to do so. Competence must be documented — qualifications alone may not be
                sufficient without relevant site-specific experience.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-phase systems</strong> — industrial and commercial sites in Workington
                predominantly operate on three-phase supplies. Electricians working in this sector
                need confidence with three-phase power distribution, motor control circuits,
                distribution boards, and associated testing and inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hazardous areas (ATEX/CompEx)</strong> — some of Workington's chemical and
                manufacturing sites have hazardous atmosphere zones where flammable gases, vapours,
                or dusts may be present. Electrical work in these zones requires CompEx
                certification and use of appropriate ATEX-rated equipment. Electricians without
                CompEx should not work in classified hazardous areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Port and coastal infrastructure</strong> — Workington Harbour handles
                commercial shipping and has associated electrical infrastructure. Port electrical
                work includes shore power supplies, lighting, crane power systems, and
                communications. Marine and waterfront installations must meet appropriate IP ratings
                and corrosion resistance requirements.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'nuclear',
    heading: 'Proximity to Sellafield: Opportunities for Workington Electricians',
    content: (
      <>
        <p>
          Sellafield nuclear site is 12 miles south of Workington on the A595 — approximately 20
          minutes' drive. This proximity makes Sellafield readily accessible for Workington-based
          electricians and represents one of the most significant earning opportunities in the local
          electrical market.
        </p>
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Nuclear Site Licence conditions</strong> — Sellafield operates under a
                Nuclear Site Licence and Nuclear Site Licence conditions govern all work on site.
                Electricians must understand the permit-to-work system, Electrical Safety Rules, and
                the SQEP (Suitably Qualified and Experienced Person) framework.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Security clearance</strong> — a valid Sellafield site pass requires security
                vetting (minimum BPSS, higher for sensitive areas). The clearance process takes
                several weeks and must be initiated through a principal contractor operating on the
                site. Common principal contractors include Jacobs, Cavendish Nuclear, Morgan Sindall
                Infrastructure, and others.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>IEC 60364 and nuclear codes</strong> — Sellafield requires compliance with
                IEC 60364 and nuclear industry codes in addition to BS 7671. Safety-related
                electrical systems have additional documentation, testing, and maintenance
                requirements beyond standard commercial work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Contract rates</strong> — Sellafield contract electrician rates are
                typically £60–90+/hr, compared to £35–52/hr for standard Workington domestic work.
                The financial difference is substantial — a five-day Sellafield week can equal two
                to three weeks of standard domestic income.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dno',
    heading: "Electricity North West: Workington's DNO",
    content: (
      <>
        <p>
          <strong>Electricity North West (ENW)</strong> is the Distribution Network Operator for
          Workington and the wider west Cumbrian coast. All DNO-related work goes through ENW:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections and upgrades</strong> — managed through ENW's connections
                portal. Coastal and rural properties around Workington may have overhead
                distribution lines and TT earthing, requiring earth electrode installation and
                testing for new or replacement consumer units.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99 notifications</strong> — solar PV, battery storage, and wind
                micro-generation must be notified to ENW. The west Cumbrian coast has a good wind
                resource and growing solar adoption. G99 applications for larger systems take 4–10
                weeks to process.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>TT earthing systems</strong> — rural and coastal properties near Workington
                served by overhead lines are more likely to have TT earthing. TT systems require RCD
                protection on all circuits under BS 7671 regulation 411.3.3, and earth electrode
                resistance testing is essential. Never assume earthing type — always verify at the
                intake.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Workington Property Types and Electrical Challenges',
    content: (
      <>
        <p>
          Workington's housing stock is predominantly older terraced and semi-detached housing, with
          a mix of council-built stock and private properties:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian and Edwardian Terraces</h3>
            <p className="text-white text-sm leading-relaxed">
              The most common residential property type in Workington. Solid brick walls, no cavity,
              and pre-1980 construction means potential asbestos risk and the need for
              surface-mounted trunking or careful cable routing. Original rubber-insulated wiring
              (TRS or VIR) is still found in unmodernised properties and requires full rewire before
              any new work is connected.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Coastal Properties</h3>
            <p className="text-white text-sm leading-relaxed">
              Properties close to the seafront and harbour area face coastal corrosion risks for
              external electrical equipment. Specify IP65 minimum for external fittings,
              marine-grade or stainless steel fixings, and sealed cable entry points. EV chargers
              and external lighting in coastal locations should be checked against manufacturer
              specifications for salt atmosphere resistance.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Post-War Social Housing</h3>
            <p className="text-white text-sm leading-relaxed">
              Workington has significant post-war council housing stock in areas such as Harrington
              and Salterbeck. Many properties of this era have single-RCD or no-RCD consumer units,
              wiring in PVC singles in conduit or early twin-and-earth from the 1960s and 1970s, and
              limited socket provision by modern standards. Consumer unit upgrades and socket
              extensions are common jobs.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Rural Fringe</h3>
            <p className="text-white text-sm leading-relaxed">
              The rural villages and farms east of Workington towards Cockermouth and the Lake
              District fringes often have TT earthing systems, older agricultural electrical
              installations, and growing demand for renewable energy. Off-gas-grid properties are
              common, driving heat pump and solar PV installations. Three-phase agricultural
              supplies require specific installation knowledge.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'pricing',
    heading: 'Electrician Rates in Workington (2026)',
    content: (
      <>
        <p>
          Workington rates reflect the town's west Cumbrian coastal location and industrial
          character. Typical rates in 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-bold text-white">Hourly and Day Rates</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Hourly rate (qualified)</span>
                  <span className="font-semibold">£35 — £52</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (sole trader)</span>
                  <span className="font-semibold">£240 — £360</span>
                </li>
                <li className="flex justify-between">
                  <span>Emergency call-out</span>
                  <span className="font-semibold">£60 — £90/hr</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-white">Common Fixed-Price Jobs</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Consumer unit replacement</span>
                  <span className="font-semibold">£550 — £920</span>
                </li>
                <li className="flex justify-between">
                  <span>Single socket addition</span>
                  <span className="font-semibold">£100 — £155</span>
                </li>
                <li className="flex justify-between">
                  <span>Full rewire (3-bed house)</span>
                  <span className="font-semibold">£3,500 — £5,800</span>
                </li>
                <li className="flex justify-between">
                  <span>EICR</span>
                  <span className="font-semibold">£170 — £260</span>
                </li>
                <li className="flex justify-between">
                  <span>EV charger installation</span>
                  <span className="font-semibold">£700 — £1,150</span>
                </li>
                <li className="flex justify-between">
                  <span>Sellafield contract rate</span>
                  <span className="font-semibold">£60 — £90+/hr</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Workington',
    content: (
      <>
        <p>
          Workington offers a solid domestic and commercial electrical market, with the added
          opportunity of accessible Sellafield nuclear site contract work for those who obtain the
          necessary clearances. Industrial and offshore-adjacent work adds further variety for
          electricians with relevant experience.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC and EICR Certificates</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Electrical Installation Certificates
                  </SEOInternalLink>{' '}
                  and <SEOInternalLink href="/tools/eicr-certificate">EICRs</SEOInternalLink> on
                  site with AI-assisted board scanning. The Workington rental market and holiday let
                  sector requires regular EICRs — deliver professional documentation from your phone
                  before you leave site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Cable Sizing for Industrial and Rural Jobs
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>{' '}
                  for three-phase industrial installations, long rural cable runs, and TT earthed
                  coastal properties. Accurate calculations are essential for industrial motor
                  circuits and rural supply upgrades.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Professional Quoting</h4>
                <p className="text-white text-sm leading-relaxed">
                  Price Workington jobs accurately with the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Account for coastal installation premiums, travel time for rural jobs, and
                  specialist rates for industrial work.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional electrical tools for Workington electricians"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Built for west Cumbria's industrial sites, coastal properties, and nuclear-adjacent work. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianWorkingtonPage() {
  return (
    <GuideTemplate
      title="Electrician in Workington | Local Electricians 2026"
      description="Find qualified electricians in Workington, Cumbria. Industrial and chemical electrical work, Sellafield proximity, Electricity North West DNO, coastal IP ratings, and Workington electrician rates 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Workington"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Workington:{' '}
          <span className="text-yellow-400">Local Electricians 2026</span>
        </>
      }
      heroSubtitle="Workington is a coastal industrial town on the west Cumbrian coast, 12 miles from Sellafield nuclear site. The local electrical market combines standard domestic work with industrial, chemical, and nuclear-adjacent opportunities — with coastal exposure adding specific requirements for external installations."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Workington"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Tools for Workington Electricians"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, quoting, and on-site certification. Built for west Cumbria's industrial sites, coastal properties, and Sellafield-adjacent work. 7-day free trial."
    />
  );
}
