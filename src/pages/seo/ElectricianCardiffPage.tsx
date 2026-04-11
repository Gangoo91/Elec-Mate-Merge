import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  MapPin,
  ShieldCheck,
  FileCheck2,
  Calculator,
  Zap,
  Wrench,
  GraduationCap,
  Users,
  Building2,
  Home,
  Languages,
  Cable,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Electrician in Cardiff', href: '/guides/electrician-cardiff' },
];

const tocItems = [
  { id: 'overview', label: 'Cardiff Overview' },
  { id: 'regulations', label: 'Welsh Building Regulations' },
  { id: 'dno', label: 'Western Power Distribution' },
  { id: 'property-types', label: 'Cardiff Property Types' },
  { id: 'bay-regeneration', label: 'Cardiff Bay Regeneration' },
  { id: 'welsh-language', label: 'Welsh Language Considerations' },
  { id: 'hmos', label: 'HMOs and Student Properties' },
  { id: 'pricing', label: 'Electrician Rates in Cardiff' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Welsh Building Regulations apply in Cardiff. Approved Document P (Electrical Safety) applies but is administered by the Welsh Government, not DLUHC. The technical requirements are the same as England, but the regulatory authority and some procedural details differ.',
  'Western Power Distribution (now National Grid Electricity Distribution) is the DNO for Cardiff and South Wales. All new connections, capacity upgrades, and generation notifications go through WPD/NGED.',
  'Cardiff Bay is one of Europe largest waterfront regeneration projects and continues to generate demand for commercial and high-specification residential electrical work in new-build apartments, offices, and leisure facilities.',
  'Cardiff has significant Victorian and Edwardian terraced housing stock in Pontcanna, Canton, Roath, and Cathays. These properties form the core of domestic electrical work — rewires, consumer unit upgrades, and landlord compliance.',
  'The Welsh Language (Wales) Measure 2011 means some public sector and commercial clients may require bilingual documentation, signage, and labelling. Electricians working on public buildings and Welsh Government projects should be aware of Welsh language standards.',
];

const faqs = [
  {
    question: 'Do Welsh Building Regulations differ from English regulations for electrical work?',
    answer:
      'The technical requirements are essentially the same — Approved Document P (Electrical Safety) applies in both England and Wales, and BS 7671 is the installation standard in both countries. The key difference is administrative: in Wales, building regulations are administered by the Welsh Government (not DLUHC), and local authority building control is provided by Welsh councils. Competent person schemes (NICEIC, NAPIT, ELECSA) operate in Wales exactly as they do in England — if you are registered with a competent person scheme, you can self-certify notifiable work in Cardiff just as you would in an English city. The building control application route (for non-registered electricians) goes through Cardiff Council Building Control.',
  },
  {
    question: 'Who is the DNO for Cardiff?',
    answer:
      'Western Power Distribution (WPD), now operating under the National Grid Electricity Distribution (NGED) brand, is the DNO for Cardiff and the whole of South Wales. For new connections, capacity upgrades, generation connections (solar PV, battery storage), and EV charger notifications, you deal with WPD/NGED. Their South Wales region covers Cardiff, the Valleys, Swansea, Newport, and Pembrokeshire. WPD/NGED connection applications are processed through their online portal. G98 notifications for small-scale generation are straightforward. G99 applications for larger systems typically take 6 to 10 weeks.',
  },
  {
    question: 'How much does an electrician charge in Cardiff?',
    answer:
      'Cardiff electrician rates in 2026 typically range from £40 to £55 per hour for a qualified, registered electrician. Day rates range from £270 to £400 for a sole trader and £360 to £490 for a firm. Emergency call-out rates are £70 to £100 per hour with a minimum charge of £90 to £150. Common fixed-price jobs: consumer unit replacement £570 to £950, single socket addition £105 to £165, full house rewire (3-bed Victorian terrace) £3,800 to £6,200, EICR £190 to £310, EV charger installation £780 to £1,250. Cardiff rates are comparable to other major UK cities outside London and the South East, reflecting the Welsh capital strong economy and growing demand.',
  },
  {
    question: 'Do I need to provide bilingual documentation for electrical work in Cardiff?',
    answer:
      'For private domestic work, there is no legal requirement for bilingual documentation. However, if you are working for the Welsh Government, Cardiff Council, the Senedd, Welsh NHS, or other public bodies covered by the Welsh Language Standards, you may be required to provide documentation in Welsh or bilingually. In practice, this is rare for electrical installation certificates (which follow the BS 7671 model forms), but labelling on consumer units, distribution boards, and safety signage in public buildings may need to be bilingual. Some commercial clients in Cardiff, particularly those with public-facing premises, also request bilingual signage as a matter of course. It is worth asking commercial and public sector clients about their language requirements at the quotation stage.',
  },
  {
    question: 'What is the Cardiff Bay area like for electrical work?',
    answer:
      'Cardiff Bay is one of the largest waterfront regeneration projects in Europe, transforming the former Tiger Bay docklands into a mixed-use development with residential apartments, offices (including the Welsh Government Senedd and Wales Millennium Centre), hotels, restaurants, and leisure facilities. For electricians, Cardiff Bay offers: high-specification apartment fit-outs and modifications, commercial fit-outs in offices and retail units, restaurant and hospitality installations, and maintenance contracts for residential and commercial developments. The area continues to expand with new residential and commercial developments, creating ongoing opportunities. The quality expectations and budgets in Cardiff Bay are typically higher than in traditional Cardiff neighbourhoods.',
  },
  {
    question: 'What HMO regulations apply in Cardiff?',
    answer:
      'Cardiff Council operates a mandatory HMO licensing scheme for properties with 5 or more occupants from 2 or more households. Rent Smart Wales (the Welsh Government all-Wales landlord registration scheme) also requires all landlords in Wales to be registered and all letting agents to be licensed — this is a Welsh-specific requirement that does not apply in England. HMO licensing requires: a satisfactory EICR (no C1 or C2 codes, renewed every 5 years), fire detection to BS 5839-6 (Grade D LD2 minimum), emergency lighting on escape routes, and adequate socket provision. The Cathays area near Cardiff University has one of the highest HMO densities in Wales.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for Cardiff domestic and commercial work on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'EICRs for Cardiff rental properties, Rent Smart Wales compliance, and HMO licensing.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for Victorian terrace rewires, commercial fit-outs, and EV charger installations.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'EV charger installations in Cardiff — terraced property challenges and WPD DNO notifications.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Quote rewires, consumer unit upgrades, and Cardiff Bay commercial fit-outs with accurate pricing.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'Study for C&G 2391 — essential for Cardiff HMO and landlord certification work.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Electrician in Cardiff: What You Need to Know',
    content: (
      <>
        <p>
          Cardiff is the capital of Wales and its largest city, with a population approaching
          370,000 and a growing metropolitan area. For electricians, Cardiff offers a strong market
          combining the steady domestic work of a large city with the premium opportunities of the
          Cardiff Bay regeneration and the unique regulatory considerations of working in Wales.
        </p>
        <p>
          The city's property stock ranges from grand Victorian and Edwardian terraces in Pontcanna
          and Canton to post-war estates in Ely and Llanrumney, modern apartments in Cardiff Bay,
          and student HMOs in Cathays and Roath. The Welsh Government's presence in Cardiff creates
          public sector electrical work opportunities that do not exist in other Welsh cities.
        </p>
        <p>
          This guide covers the Welsh regulatory framework, DNO details, property-specific
          challenges, Cardiff Bay opportunities, Welsh language considerations, HMO requirements,
          pricing, and practical advice for electricians working in Cardiff.
        </p>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Welsh Building Regulations for Electrical Work',
    content: (
      <>
        <p>
          Wales has its own building regulations, administered by the Welsh Government under the
          Building Act 1984 (as applied to Wales). For electrical work, the key points:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Approved Document P applies</strong> — Approved Document P (Electrical
                Safety — Dwellings) applies in Wales. The technical requirements are the same as in
                England — all electrical installations must comply with{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671:2018+A3:2024
                </SEOInternalLink>
                , and notifiable work must be either self-certified through a competent person
                scheme or approved by building control.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Welsh Government administration</strong> — building regulations in Wales are
                administered by the Welsh Government, not DLUHC (which covers England only). Any
                future divergence between English and Welsh building regulations would be published
                by the Welsh Government. As of 2026, the electrical safety requirements are aligned.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person schemes</strong> — NICEIC, NAPIT, ELECSA, and Stroma all
                operate in Wales. Registration allows self-certification of notifiable work in
                Cardiff exactly as in English cities. The notification goes to Cardiff Council
                Building Control.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rent Smart Wales</strong> — unique to Wales, Rent Smart Wales requires all
                landlords to be registered and all letting agents to be licensed. This is enforced
                by Cardiff Council and creates an additional compliance layer for landlords, which
                in turn drives demand for EICRs and safety certificates from electricians.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For electricians crossing the Severn Bridge from England to work in Cardiff, the practical
          differences are minimal — the same qualifications, the same competent person schemes, and
          the same installation standards apply. The main differences are administrative (Welsh
          Government oversight, Rent Smart Wales for landlords).
        </p>
      </>
    ),
  },
  {
    id: 'dno',
    heading: 'Western Power Distribution: Cardiff DNO',
    content: (
      <>
        <p>
          <strong>Western Power Distribution (WPD)</strong>, now part of National Grid Electricity
          Distribution (NGED), is the DNO for Cardiff and the whole of South Wales.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections and upgrades</strong> — new supplies, capacity upgrades (for
                EV chargers, heat pumps), and service cable replacements go through the WPD/NGED
                connections portal. Standard domestic connections in Cardiff typically take 4 to 8
                weeks. Three-phase upgrades for larger properties or commercial premises may take
                longer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99 notifications</strong> — solar PV, battery storage, and other
                generation must be notified to WPD/NGED. G98 notifications (up to 16A per phase) are
                straightforward. G99 applications for larger systems take 6 to 10 weeks. Cardiff
                generally has good network capacity, but some areas of the Valleys served by the
                same WPD/NGED region may have constraints.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing arrangements</strong> — Cardiff properties are predominantly TN-C-S
                (PME) in newer areas and TN-S in older areas. Victorian terraces in Pontcanna,
                Canton, and Roath may have older earthing arrangements. Always verify at the supply
                intake.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Welsh Government energy policy</strong> — the Welsh Government has its own
                energy and climate change policies, including targets for renewable energy
                generation and building decarbonisation. This may lead to Welsh-specific incentives
                for solar PV, battery storage, and heat pump installations. Monitor Welsh Government
                announcements for new schemes.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Cardiff Property Types and Electrical Challenges',
    content: (
      <>
        <p>
          Cardiff's housing stock reflects its growth from a small market town to the Welsh capital,
          with distinct areas presenting different electrical challenges:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Pontcanna and Canton Terraces</h3>
            <p className="text-white text-sm leading-relaxed">
              Victorian and Edwardian terraced houses, many in excellent condition and highly sought
              after. Solid brick or stone walls, suspended timber floors, original plasterwork.
              These areas have undergone significant gentrification, with homeowners willing to
              invest in quality electrical work — full rewires with premium fittings, EV chargers,
              smart home systems, and garden room supplies. Pontcanna is one of Cardiff's most
              desirable areas with rates at the top of the local range.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Roath and Cathays</h3>
            <p className="text-white text-sm leading-relaxed">
              A mix of Victorian terraces, many converted to HMOs or divided into flats. Cathays is
              the primary student area (adjacent to Cardiff University) with one of the highest HMO
              densities in Wales. Roath has a mix of student accommodation and family homes.
              Electrical work ranges from HMO compliance (EICRs, fire alarms) to family home rewires
              and upgrades. High-volume, steady work.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Cardiff Bay</h3>
            <p className="text-white text-sm leading-relaxed">
              Modern apartments and townhouses in the regenerated docklands. Built to current
              standards with modern electrical infrastructure. Work includes modifications, smart
              home installations, EV charger connections in apartment car parks, and commercial
              fit-outs in offices, restaurants, and leisure venues. Higher-value customers and
              commercial clients. The Senedd and Wales Millennium Centre area also generates public
              sector work.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Suburban Estates</h3>
            <p className="text-white text-sm leading-relaxed">
              Post-war and modern estates in areas like Ely, Llanrumney, Pentwyn, and Llanishen. A
              mix of council-built and private houses with cavity walls, concrete floors, and
              standard cable routes. Many 1960s and 1970s properties are now due for rewires or
              consumer unit upgrades. EV charger installations are growing in these areas as EV
              adoption increases across all demographics.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'bay-regeneration',
    heading: 'Cardiff Bay Regeneration',
    content: (
      <>
        <p>
          Cardiff Bay is one of Europe's largest waterfront regeneration projects. The former Tiger
          Bay docklands have been transformed into a modern mixed-use development that continues to
          expand:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Residential developments</strong> — luxury apartments along the waterfront,
                from the Barrage to the Red Dragon Centre. Electrical work includes high-end
                apartment fit-outs, smart home systems (Lutron, Control4, KNX), underfloor heating
                controls, and EV charging in basement and podium car parks. Typical electrical
                fit-out value for a Bay apartment: £4,000 to £10,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial and hospitality</strong> — restaurants, bars, hotels, and offices
                in the Bay area require commercial electrical installations and ongoing maintenance.
                The seasonal hospitality trade means fit-out work often has tight timescales —
                premises need to be operational for peak periods.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public sector</strong> — the Senedd (Welsh Parliament), Wales Millennium
                Centre, and various Welsh Government buildings in Cardiff Bay create public sector
                electrical work. This work may be procured through Sell2Wales (the Welsh public
                procurement portal) and may have Welsh language requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ongoing development</strong> — new phases of residential and commercial
                development continue around the Bay. The International Sports Village and nearby
                areas are still expanding. Getting onto preferred contractor lists for Bay
                developers and management companies creates a pipeline of high-value work.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'welsh-language',
    heading: 'Welsh Language Considerations',
    content: (
      <>
        <p>
          Cardiff is a bilingual city. While English is the dominant language for day-to-day
          business, the Welsh Language (Wales) Measure 2011 and the Welsh Language Standards have
          practical implications for electricians working on certain projects:
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Languages className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public sector work</strong> — Cardiff Council, the Welsh Government, the
                Senedd, Welsh NHS bodies, and other organisations covered by the Welsh Language
                Standards may require bilingual signage, labelling, and documentation. If you are
                installing distribution boards, consumer units, or safety signage in public
                buildings, check whether bilingual labelling is required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Languages className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical certificates</strong> — BS 7671 model forms (EIC, EICR, Minor
                Works) are standardised documents and are not typically required in Welsh. However,
                covering letters, reports, and customer-facing documentation for public sector
                clients may need to be bilingual or in Welsh.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Languages className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial signage</strong> — some Cardiff businesses, particularly those in
                public-facing locations and those receiving Welsh Government funding, display
                bilingual signage. If you are installing illuminated signs, external lighting for
                signage, or power supplies for display boards, the signage may be bilingual.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Languages className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Practical approach</strong> — for private domestic work, Welsh language is
                not a factor. For commercial and public sector work, ask the client about language
                requirements at the quotation stage. If bilingual labelling is needed, factor the
                additional time and cost of sourcing or producing bilingual labels.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'hmos',
    heading: 'HMOs and Student Properties in Cardiff',
    content: (
      <>
        <p>
          Cardiff has three universities — Cardiff University, Cardiff Metropolitan University, and
          the University of South Wales (Treforest campus and Cardiff campus) — with a combined
          student population of over 60,000. The primary student HMO areas are Cathays, Roath, and
          parts of Plasnewydd.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO licensing</strong> — Cardiff Council operates mandatory HMO licensing
                for properties with 5+ occupants from 2+ households. The Cathays ward has one of the
                highest HMO densities in Wales. Cardiff also has an additional licensing scheme
                covering smaller HMOs in designated areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rent Smart Wales</strong> — all landlords in Wales must register with Rent
                Smart Wales, and all letting agents must be licensed. Rent Smart Wales requires
                compliance with safety standards including electrical safety. This creates an
                additional driver for{' '}
                <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> compliance
                beyond the HMO licensing requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire detection and emergency lighting</strong> — HMOs require fire detection
                to BS 5839-6 (Grade D LD2 minimum) and emergency lighting on escape routes. Cardiff
                Council enforcement is active, particularly in the Cathays area where the density of
                student HMOs is highest.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Renting Homes (Wales) Act 2016</strong> — this Welsh-specific legislation
                (fully commenced in 2022) changed the legal framework for renting in Wales,
                replacing tenancies with occupation contracts. Fitness for human habitation
                requirements under this Act include electrical safety, reinforcing the need for
                up-to-date EICRs and safe installations in all rental properties.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The Cardiff letting agent market is concentrated along City Road, Albany Road, and in the
          city centre. Building relationships with agents who manage Cathays and Roath HMO
          portfolios creates steady, predictable work throughout the year.
        </p>
      </>
    ),
  },
  {
    id: 'pricing',
    heading: 'Electrician Rates in Cardiff (2026)',
    content: (
      <>
        <p>
          Cardiff electrician rates reflect the city's position as the Welsh capital with a strong
          economy, balanced by the generally lower cost base in Wales compared to southern England.
          Typical rates in 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-bold text-white">Hourly and Day Rates</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Hourly rate (qualified)</span>
                  <span className="font-semibold">£40 — £55</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (sole trader)</span>
                  <span className="font-semibold">£270 — £400</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (firm)</span>
                  <span className="font-semibold">£360 — £490</span>
                </li>
                <li className="flex justify-between">
                  <span>Emergency call-out</span>
                  <span className="font-semibold">£70 — £100/hr</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-white">Common Fixed-Price Jobs</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Consumer unit replacement</span>
                  <span className="font-semibold">£570 — £950</span>
                </li>
                <li className="flex justify-between">
                  <span>Single socket addition</span>
                  <span className="font-semibold">£105 — £165</span>
                </li>
                <li className="flex justify-between">
                  <span>Full rewire (3-bed terrace)</span>
                  <span className="font-semibold">£3,800 — £6,200</span>
                </li>
                <li className="flex justify-between">
                  <span>EICR</span>
                  <span className="font-semibold">£190 — £310</span>
                </li>
                <li className="flex justify-between">
                  <span>EV charger installation</span>
                  <span className="font-semibold">£780 — £1,250</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          Cardiff Bay work commands premium rates, particularly for high-specification apartment
          fit-outs and commercial installations. Pontcanna and Canton domestic work is also at the
          higher end of the range due to the affluent customer base and quality expectations. Volume
          HMO work in Cathays can be priced competitively at £150 to £210 per EICR when batching
          inspections for landlord portfolios.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Cardiff',
    content: (
      <>
        <p>
          Cardiff is the strongest market for electricians in Wales, combining the steady domestic
          work of the Victorian terraces with Cardiff Bay commercial opportunities, a large student
          HMO market, and Welsh public sector work. Electricians who understand the Welsh-specific
          regulatory elements (Rent Smart Wales, Welsh Language Standards) have an edge in the local
          market.
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
                  site with AI-assisted board scanning. Rent Smart Wales and HMO licensing both
                  require professional electrical certification — deliver it from your phone before
                  you leave site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing Calculator</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>{' '}
                  for Pontcanna terrace rewires, Cardiff Bay apartment circuits, and EV charger
                  installations. Accurate voltage drop calculations for the cable routes in
                  Cardiff's varied property stock.
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
                  Price Cardiff jobs accurately with the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . From Cathays HMO upgrades to Cardiff Bay luxury fit-outs, itemise materials,
                  labour, testing, and certification. Send professional PDF quotes that match the
                  expectations of Cardiff's quality-conscious market.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional electrical tools for Cardiff electricians"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Built for Cardiff's Victorian terraces, Bay regeneration, and Welsh regulatory requirements. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianCardiffPage() {
  return (
    <GuideTemplate
      title="Electrician in Cardiff | Find Electricians 2026"
      description="Find qualified electricians in Cardiff. Welsh Building Regulations, WPD DNO, Cardiff Bay regeneration, Victorian terraces in Pontcanna and Canton, Rent Smart Wales, and local electrician rates for 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cardiff"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Cardiff: <span className="text-yellow-400">Find Electricians 2026</span>
        </>
      }
      heroSubtitle="Cardiff combines Victorian terraces in Pontcanna and Canton, Cardiff Bay waterfront regeneration, one of Wales's largest student HMO markets, and Welsh-specific regulations including Rent Smart Wales — a strong and varied market for electricians."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Cardiff"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Tools for Cardiff Electricians"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, quoting, and on-site certification. Built for Cardiff's terraced housing, Bay regeneration, and Welsh regulatory framework. 7-day free trial."
    />
  );
}
