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
  { label: 'Electrician in Whitehaven', href: '/electricians/whitehaven' },
];

const tocItems = [
  { id: 'overview', label: 'Whitehaven Overview' },
  { id: 'sellafield', label: 'Sellafield Gateway Town' },
  { id: 'heritage', label: 'Georgian Heritage Buildings' },
  { id: 'dno', label: 'Electricity North West (ENW)' },
  { id: 'property-types', label: 'Property Types and Challenges' },
  { id: 'pricing', label: 'Electrician Rates in Whitehaven' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Whitehaven is the closest town to Sellafield nuclear site — just 9 miles north along the A595. The town functions as a gateway community for Sellafield workers, with a significant portion of the local population employed directly or indirectly at the nuclear site.',
  'Electricians working at Sellafield must hold Nuclear Site Licence condition clearance, appropriate security vetting, and work to IEC 60364 and nuclear industry codes in addition to BS 7671:2018+A3:2024.',
  'Whitehaven has an unusually well-preserved Georgian town centre, one of the finest examples of planned Georgian urban design in England. Listed buildings and conservation area requirements affect external electrical installations across a significant portion of the town centre.',
  'Electricity North West (ENW) is the Distribution Network Operator. Coastal and rural properties require attention to TT earthing and IP ratings for external equipment.',
  'Labour rates in Whitehaven are £35–52/hr for standard domestic and commercial work. Sellafield nuclear contractor rates (9 miles away) are £60–90+/hr — the most accessible nuclear site contract opportunity in the UK for locally based electricians.',
  'The town\'s chemical and manufacturing legacy, the harbour area, and the Marchon chemical works site (now largely redeveloped) have all historically created industrial electrical work demands that continue today.',
];

const faqs = [
  {
    question: 'Why is Whitehaven so closely linked to Sellafield?',
    answer:
      'Whitehaven is the largest town immediately adjacent to Sellafield nuclear site — just 9 miles to the south along the A595 coast road. The nuclear site is by far the largest employer in west Cumbria, and thousands of Sellafield workers live in Whitehaven and commute daily. This creates a distinctive local economy where nuclear wages significantly influence the town, and where many local tradespeople (including electricians) either work at Sellafield directly or service the households of nuclear workers. For electricians, this means that Sellafield contract work is genuinely local — a 15-minute commute rather than the extended travel required for electricians in Carlisle or Barrow.',
  },
  {
    question: 'What makes Whitehaven\'s Georgian town centre significant for electrical work?',
    answer:
      'Whitehaven\'s Georgian town centre — built predominantly between 1690 and 1750 — is one of the best-preserved examples of planned Georgian urban design in England. The grid-patterned streets, Georgian townhouses, and harbour buildings are subject to conservation area protections and listed building designations. For electricians, this means that external electrical work (EV charger installations, external lighting, security cameras, satellite and communication equipment, cable routes) on listed buildings or within the conservation area may require listed building consent or planning permission from Cumberland Council. Internal rewiring is generally acceptable provided it does not damage original features, but surface-mounted trunking in prominent period rooms may be questioned.',
  },
  {
    question: 'Who is the DNO for Whitehaven?',
    answer:
      'Electricity North West (ENW) is the Distribution Network Operator for Whitehaven and the surrounding Copeland area. All DNO notifications — G98/G99 for generation (solar PV, battery storage), new connections, and capacity upgrades — go through ENW. The national fault number is 105. Rural properties south of Whitehaven towards Egremont and east towards the Lake District fringes may have TT earthing systems via overhead lines. Always verify the earthing arrangement at the supply intake before designing or quoting work.',
  },
  {
    question: 'What qualifications do I need to work at Sellafield from Whitehaven?',
    answer:
      'To work at Sellafield you need: a valid Sellafield site pass (obtained through security vetting — minimum BPSS, higher for sensitive areas), registration with a principal contractor operating on site, and SQEP (Suitably Qualified and Experienced Person) evidence for the specific electrical work. Principal contractors include Jacobs, Cavendish Nuclear, Altrad, and others. The vetting and registration process can take several weeks. The base qualification requirement is NVQ Level 3 in Electrical Installation plus BS 7671 (18th Edition). Industrial and nuclear-specific experience is expected — Sellafield is not an entry-level workplace. All electrical work on site must comply with Nuclear Site Licence conditions, IEC 60364, and nuclear industry codes alongside BS 7671.',
  },
  {
    question: 'Are there special requirements for electrical work in Whitehaven\'s conservation area?',
    answer:
      'Yes. Whitehaven\'s conservation area covers much of the Georgian town centre, the harbour area, and several residential streets of architectural or historical interest. Within the conservation area, external alterations that materially affect the appearance of a building may require planning permission, even for unlisted buildings. This includes external cable routes, EV charger wall-mounted units, security cameras, external lighting changes, and meter box replacements visible from public areas. For listed buildings, listed building consent is required for any internal or external work that affects the character of the building. Always advise customers on planning requirements before committing to external work on period town centre properties.',
  },
  {
    question: 'Is there renewable energy work available around Whitehaven?',
    answer:
      'Yes. The west Cumbrian coast has an excellent wind resource, and there is growing solar PV and battery storage adoption. The Walney offshore wind farm (visible from the Whitehaven coast) and the proposed floating wind projects in the Irish Sea create onshore grid infrastructure work that employs electricians locally. For domestic and commercial renewable energy, properties in the area are increasingly fitting solar PV, battery storage, and heat pumps — particularly off-gas-grid rural properties. MCS accreditation for solar PV installation is valuable for electricians working in this market. ENW G98/G99 notifications apply to all generation installations.',
  },
  {
    question: 'How much does an electrician charge in Whitehaven?',
    answer:
      'Whitehaven electrician rates in 2026 are typically £35–52/hr for standard domestic and commercial work, comparable to Workington and the wider west Cumbrian coast. Day rates are £240–360 for a sole trader. Emergency call-out rates are £60–90/hr with a minimum of £75–110. Common fixed-price jobs: consumer unit replacement £550–920, full rewire (3-bed terraced house) £3,500–5,800, EICR £170–260, EV charger installation £700–1,150. Sellafield nuclear contractor rates (9 miles away, 15-minute commute) are £60–90+/hr — an accessible premium market for locally based electricians with the necessary clearances.',
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
      'Electrical Installation Condition Reports for Whitehaven rental and heritage properties.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for Whitehaven Georgian properties, rural TT-earthed systems, and coastal installations.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'EV charger installations in Whitehaven — conservation area planning, ENW notifications, and coastal IP ratings.',
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
    href: '/electricians/workington',
    title: 'Electrician in Workington',
    description:
      'Neighbouring coastal industrial town — industrial electrical work, Sellafield proximity, and local rates.',
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
    heading: 'Electrician in Whitehaven: What You Need to Know',
    content: (
      <>
        <p>
          Whitehaven is a historic coastal town on the west Cumbrian coast, 9 miles north of
          Sellafield nuclear site. With a population of around 24,000, it is the main town in
          the Copeland area and serves as the commercial and service centre for the surrounding
          communities, including Egremont, Cleator Moor, and the coastal villages to the south.
        </p>
        <p>
          Two characteristics define Whitehaven's electrical market. First, its proximity to
          Sellafield — the nuclear site is closer to Whitehaven than to any other significant
          town in the region, making Sellafield contract work genuinely local for
          Whitehaven-based electricians. Second, the town has an unusually well-preserved
          Georgian town centre — one of the finest examples of planned Georgian urban design in
          England — which creates heritage property considerations for electrical work in the
          town centre conservation area and listed buildings.
        </p>
        <p>
          Beyond these two defining factors, Whitehaven's electrical market includes standard
          residential work in a mixed property stock, growing renewable energy demand, commercial
          and industrial work, and the specific considerations of a coastal location where
          salt air and weather exposure affect external electrical installations.
        </p>
      </>
    ),
  },
  {
    id: 'sellafield',
    heading: 'Whitehaven as the Gateway Town to Sellafield',
    content: (
      <>
        <p>
          For electricians based in Whitehaven, Sellafield represents the most accessible
          high-value contract opportunity in the UK electrical market. At just 9 miles and
          approximately 15 minutes' drive, Sellafield is genuinely local work — not a long
          commute or an away job.
        </p>
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Nuclear Site Licence conditions</strong> — Sellafield operates under
                a Nuclear Site Licence issued by the Office for Nuclear Regulation (ONR).
                Licence Conditions govern all activities, including electrical work. Electricians
                working on site must understand the permit-to-work system, Electrical Safety
                Rules, and isolation procedures specific to nuclear installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Security clearance and site passes</strong> — a valid Sellafield site
                pass requires security vetting (minimum BPSS, Counter Terrorist Check or higher
                for sensitive areas). The process is initiated through a principal contractor
                on site. Allow several weeks for the vetting process. Once a pass is granted,
                it is valid for site access across multiple contractors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>IEC 60364 and nuclear codes</strong> — nuclear site electrical work
                must comply with IEC 60364 (the international standard underpinning BS 7671)
                and nuclear industry-specific codes and guidance published by the Nuclear
                Decommissioning Authority. These add significant additional requirements to
                the BS 7671 baseline, particularly for safety-related electrical systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>SQEP framework</strong> — Sellafield requires all electrical workers
                to be assessed as Suitably Qualified and Experienced Persons for their specific
                role. Bring evidence of qualifications and experience to any SQEP assessment —
                a qualification alone is insufficient without demonstrable experience in
                comparable electrical environments.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The rate differential between Sellafield contract work (£60–90+/hr) and standard
          Whitehaven domestic work (£35–52/hr) is substantial. For a Whitehaven electrician
          who has obtained the necessary clearances, a mix of local domestic work and Sellafield
          contract shifts can create a highly productive and well-compensated working week.
        </p>
      </>
    ),
  },
  {
    id: 'heritage',
    heading: 'Georgian Heritage: Electrical Work in Whitehaven\'s Historic Town Centre',
    content: (
      <>
        <p>
          Whitehaven's Georgian town centre is one of the earliest examples of planned town
          development in England and remains one of its best-preserved. The grid-pattern
          streets, Georgian townhouses, and harbour buildings are protected by conservation
          area designation and multiple listed building entries. This has direct implications
          for electrical work:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Listed building consent</strong> — required for any work that affects
                the character of a listed building, internally or externally. In practice:
                external EV charger installations, external cable routes, new meter enclosures,
                external lighting, and security cameras on listed properties all require consent
                from Cumberland Council. Internal rewiring is generally acceptable but should
                avoid damage to original features including cornices, panelling, and original
                fittings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conservation area restrictions</strong> — the conservation area covers
                much of the Georgian town centre. Even unlisted buildings within the
                conservation area face restrictions on external alterations that affect the
                streetscape. EV charger installations on front elevations are routinely
                scrutinised. Advise customers to check with the planning department before
                committing to visible external installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Practical considerations</strong> — Georgian townhouses typically have
                solid stone or brick walls (no cavity), high ceilings, and original internal
                features. Rewiring requires careful planning to avoid damage to plasterwork and
                cornicing. Surface-mounted trunking in mini-trunking is the standard approach
                where walls cannot be chased. Always survey period properties in person before
                quoting — the visual inspection frequently reveals complications that are not
                apparent from the outside.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dno',
    heading: 'Electricity North West: Whitehaven\'s DNO',
    content: (
      <>
        <p>
          <strong>Electricity North West (ENW)</strong> is the Distribution Network Operator
          for Whitehaven and the wider Copeland district. Key points for Whitehaven electricians:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections and upgrades</strong> — managed through ENW's
                connections portal. Supply capacity upgrades are commonly needed for EV
                charger installations in older town centre properties with 60A or 80A supplies
                that may already be substantially loaded.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99 for generation</strong> — solar PV, battery storage, and
                micro-wind must be notified to ENW. G98 (up to 16A per phase) is an online
                notification. G99 (larger systems) requires prior approval, typically 4–10
                weeks. The west Cumbrian coast has a strong wind resource and growing solar
                adoption.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing arrangements</strong> — town centre properties are predominantly
                TN-C-S (PME). Rural and coastal properties to the south and east of Whitehaven
                are more likely to have TT earthing via overhead lines. Verify the earthing
                arrangement at the intake before designing work, particularly for EV chargers
                where PME earthing requires a supplementary earth electrode if protective
                equipotential bonding cannot be established.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Whitehaven Property Types and Electrical Challenges',
    content: (
      <>
        <p>
          Whitehaven's housing and commercial stock spans several centuries of development:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Georgian Town Centre</h3>
            <p className="text-white text-sm leading-relaxed">
              The grid-plan Georgian streets around King Street, Lowther Street, and the
              harbour contain some of the finest Georgian architecture in England. Solid stone
              and brick walls, high ceilings, original features, and heritage restrictions
              make electrical work here more complex and time-consuming than in modern
              properties. Plan cable routes carefully and always survey in person before quoting.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian and Inter-War Housing</h3>
            <p className="text-white text-sm leading-relaxed">
              Terrace and semi-detached housing from the Victorian, Edwardian, and inter-war
              periods forms the bulk of Whitehaven's residential stock. Solid walls, potential
              asbestos in pre-1980 properties, and dated wiring systems (rubber-insulated TRS,
              early PVC) are common. Consumer unit upgrades and rewires are routine jobs.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Post-War Estates</h3>
            <p className="text-white text-sm leading-relaxed">
              Post-war council and private housing in areas such as Woodhouse and Hensingham
              has 1960s–1980s wiring that is reaching the end of its service life. Single-RCD
              or no-RCD consumer units, limited socket provision, and outdated wiring insulation
              make periodic inspection findings and consumer unit replacements common. Many
              properties also need socket and lighting circuit extensions for modern living.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Harbour and Coastal Properties</h3>
            <p className="text-white text-sm leading-relaxed">
              Whitehaven's historic harbour has undergone significant regeneration, with
              residential and commercial properties now occupying former industrial buildings.
              Harbour-front and coastal properties require attention to corrosion: IP65+
              external fittings, sealed cable entries, stainless steel or marine-grade
              fixings. EV charger installations on harbour-front properties should specify
              units with appropriate salt atmosphere ratings.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'pricing',
    heading: 'Electrician Rates in Whitehaven (2026)',
    content: (
      <>
        <p>
          Whitehaven rates are typical for west Cumbrian coastal towns. The proximity to
          Sellafield creates a two-tier earning environment for locally based electricians.
          Typical rates in 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-bold text-white">Standard Domestic / Commercial</h4>
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
                <li className="flex justify-between">
                  <span>Consumer unit replacement</span>
                  <span className="font-semibold">£550 — £920</span>
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
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-white">Sellafield Contract (9 miles)</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Nuclear contractor rate</span>
                  <span className="font-semibold">£60 — £90+/hr</span>
                </li>
                <li className="flex justify-between">
                  <span>Travel time from Whitehaven</span>
                  <span className="font-semibold">~15 minutes</span>
                </li>
                <li className="flex justify-between">
                  <span>Georgian heritage premium</span>
                  <span className="font-semibold">+20–30%</span>
                </li>
              </ul>
              <p className="text-white text-xs leading-relaxed pt-2">
                Heritage premium applies to period town centre properties requiring
                additional planning, survey time, and careful installation methods.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Whitehaven',
    content: (
      <>
        <p>
          Whitehaven offers a distinctive combination of local domestic and commercial work,
          heritage property challenges, and the most immediately accessible nuclear site
          contract work in England. Electricians who build both domestic expertise and
          Sellafield clearances can create an exceptionally productive working week.
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
                  and{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    EICRs
                  </SEOInternalLink>{' '}
                  on site with AI-assisted board scanning. Heritage properties often require
                  thorough documentation — deliver professional certificates from your phone
                  before you leave site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing for Heritage and Coastal Properties</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>{' '}
                  for rewires in Georgian townhouses where surface-mounted trunking routes
                  create longer cable runs than standard cavity-wall properties. Accurate
                  voltage drop calculations are essential.
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
                  Price Whitehaven jobs accurately with the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Factor heritage premiums for Georgian town centre properties, planning
                  administration time for listed buildings, and coastal installation
                  requirements into your quotes.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional electrical tools for Whitehaven electricians"
          description="Join 430+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Built for west Cumbria's Georgian heritage properties, coastal installations, and Sellafield-adjacent work. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianWhitehavenPage() {
  return (
    <GuideTemplate
      title="Electrician in Whitehaven | Local Electricians 2026"
      description="Find qualified electricians in Whitehaven, Cumbria. Sellafield nuclear site (9 miles), Georgian conservation area, Electricity North West DNO, coastal IP ratings, and Whitehaven electrician rates 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Whitehaven"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Whitehaven:{' '}
          <span className="text-yellow-400">Local Electricians 2026</span>
        </>
      }
      heroSubtitle="Whitehaven is the closest town to Sellafield nuclear site and home to one of England's finest Georgian town centres. Working here means understanding nuclear clearance requirements, heritage conservation area restrictions, and the realities of coastal electrical installation."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Whitehaven"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Tools for Whitehaven Electricians"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for cable sizing, quoting, and on-site certification. Built for Whitehaven's Georgian heritage properties, Sellafield-adjacent work, and coastal Cumbrian installations. 7-day free trial."
    />
  );
}
