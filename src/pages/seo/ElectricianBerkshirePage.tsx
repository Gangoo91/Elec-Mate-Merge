import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  MapPin,
  ShieldCheck,
  FileCheck2,
  Building2,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Wrench,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Find an Electrician', href: '/guides/electrician-berkshire' },
  { label: 'Berkshire', href: '/electrician-berkshire' },
];

const tocItems = [
  { id: 'overview', label: 'Electricians in Berkshire' },
  { id: 'areas-covered', label: 'Areas Covered' },
  { id: 'qualifications', label: 'How to Verify Qualifications' },
  { id: 'costs', label: 'Typical Costs in Berkshire' },
  { id: 'tech-corridor', label: 'Thames Valley Tech Corridor' },
  { id: 'windsor-heritage', label: 'Windsor Heritage Properties' },
  { id: 'dno', label: 'SSEN in Berkshire' },
  { id: 'faq', label: 'FAQ' },
];

const keyTakeaways = [
  'Berkshire is served by Scottish and Southern Electricity Networks (SSEN) for electricity distribution. SSEN operates the distribution network across the South of England including all of Berkshire.',
  "The Thames Valley technology corridor — Reading, Slough, Bracknell, and Wokingham — is one of the UK's highest concentrations of global technology companies, including Oracle, Microsoft, Cisco, and HP. This drives strong demand for commercial and specialist electrical work.",
  "Slough Trading Estate, one of the largest in Europe, combined with Bracknell's business park cluster, creates consistent high-current and three-phase commercial electrical demand.",
  'Windsor and its surroundings contain some of the most sensitive heritage buildings in England, including properties within the Windsor Castle Estate Area of Special Character. Electrical work in listed buildings and conservation areas requires specialist approaches and planning consents.',
  "Berkshire's high household income levels drive significant demand for premium smart home installations, EV charging, solar PV, and battery storage — particularly in the Maidenhead, Windsor, and Wokingham corridors.",
  'Part P notifiable electrical work in Berkshire is administered through the six unitary authorities (Reading, West Berkshire, Wokingham, Bracknell Forest, Slough, and the Royal Borough of Windsor and Maidenhead). NICEIC/NAPIT registrants can self-certify.',
];

const faqs = [
  {
    question: 'How much does an electrician cost in Berkshire?',
    answer:
      'Berkshire consistently commands some of the highest electrician rates outside central London, driven by high cost of living, competition for qualified tradespeople from local technology companies, and the affluent residential market. Typical day rates: £360 to £480 per day. Common job prices: EICR (3-bed house) £190 to £320; consumer unit upgrade £540 to £820; full rewire (3-bed semi) £4,500 to £7,500; EV charger installation £900 to £1,400; smart home electrical fit-out £2,000 to £10,000+; solar PV electrical connection (4kWp) £650 to £1,050. Windsor and Maidenhead commands the highest rates, while Slough and Newbury are slightly more competitive.',
  },
  {
    question: 'Who is the DNO for Berkshire?',
    answer:
      'Berkshire is served by Scottish and Southern Electricity Networks (SSEN), which operates the South of England distribution network covering Berkshire, Hampshire, Oxfordshire, and other southern counties. For new connections, supply upgrades, or meter relocations, apply via ssen-transmission.co.uk or the SSEN distribution portal. For power cuts, call 105. When recording DNO details on an EIC or EICR in Berkshire, record SSEN. Note that SSEN (not UKPN) serves Berkshire — a distinction that sometimes catches electricians who have moved from the south-east to Berkshire.',
  },
  {
    question: 'What electrical work is required for technology campuses in the Thames Valley?',
    answer:
      'The Oracle, Microsoft, Cisco, HP, and Vodafone campuses in Reading, Slough, and Bracknell require specialist commercial electrical contractors. Typical work on these sites includes: high-current busbar systems and ring main units; UPS (uninterruptible power supply) systems and battery backup; generator interconnection and ATS (automatic transfer switch) installation; precision air conditioning and data room cooling electrical connections; fibre optic and structured cabling tray systems; and emergency lighting systems under BS 5266. The Slough Trading Estate also features large-scale industrial electrical work including 11kV substation maintenance, motor control centres, and variable speed drive installations.',
  },
  {
    question: 'Are there special requirements for electrical work on Windsor heritage properties?',
    answer:
      'Windsor has one of the highest concentrations of listed buildings and conservation areas in England. The Windsor Castle Estate and surrounding Area of Special Character means that electrical work — including new cable routes, accessory positions, and external installations — may require consent from both the Royal Borough of Windsor and Maidenhead and (for properties within the Crown Estate or castle precincts) the Crown Estate or Historic Royal Palaces. For listed buildings in Windsor town centre and Eton, Listed Building Consent is required from the Royal Borough for any works that affect the character of the building. Electricians should expect to use surface-mounted conduit or trunking in the most sensitive properties, and should advise clients to consult a planning consultant or heritage architect before committing to a design.',
  },
  {
    question: 'Is there strong demand for EV charging and smart home installations in Berkshire?',
    answer:
      'Yes. Berkshire has one of the highest rates of EV ownership in the UK, driven by high household incomes, a large commuter population, and the technology sector workforce. Demand for home EV charging is strong across all of Berkshire, with the Maidenhead, Windsor, Wokingham, and Bracknell corridors particularly active. Smart home installations — including Lutron and Control4 lighting control, multi-room audio, security, and integrated EV/solar/battery management — are a premium market across the county. Electricians specialising in smart home integration should consider Smart Home Installer accreditation through CEDIA or equivalent.',
  },
  {
    question: 'What are the solar PV notification requirements in Berkshire?',
    answer:
      "All solar PV and battery storage systems in Berkshire must be notified to SSEN (not UKPN). Systems up to 3.68kW single-phase can be notified under G98 within 28 days of commissioning — no prior approval required. Systems larger than 3.68kW single-phase require a G99 application and prior approval from SSEN before installation. SSEN's assessment period for G99 applications is typically 45 working days for a standard residential application. For commercial sites in Reading, Slough, or Bracknell with export capacity above 50kW, a Distribution Use of System (DUoS) agreement may also be required.",
  },
  {
    question: 'What Part P notification process applies in Berkshire?',
    answer:
      'Berkshire is divided into six unitary authority areas: Reading, West Berkshire, Wokingham, Bracknell Forest, Slough, and the Royal Borough of Windsor and Maidenhead. Each administers Part P independently. If your electrician is registered with a competent person scheme (NICEIC, NAPIT, ELECSA), they can self-certify Part P notifiable work and notify the relevant local authority on your behalf — you will receive a building regulations compliance certificate within 30 days. If the electrician is not scheme-registered, a building control application must be made before work starts, typically costing £200 to £500 depending on the authority and the scope of work.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/electrician-oxfordshire',
    title: 'Electricians in Oxfordshire',
    description: 'Find qualified electricians across Oxford, Abingdon, Banbury, and Didcot.',
    icon: MapPin,
    category: 'Location',
  },
  {
    href: '/electrician-hertfordshire',
    title: 'Electricians in Hertfordshire',
    description:
      'Find qualified electricians across St Albans, Watford, Stevenage, and Hemel Hempstead.',
    icon: MapPin,
    category: 'Location',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Landlord EICR obligations, 5-year inspection cycle, and compliance requirements.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/solar-pv-system-sizing',
    title: 'Solar PV System Sizing',
    description: 'How to size a solar PV system for UK homes — kWp, orientation, MCS standards.',
    icon: Zap,
    category: 'Guide',
  },
];

const sections = [
  {
    id: 'overview',
    heading: 'Electricians in Berkshire',
    content: (
      <>
        <p>
          Berkshire sits at the heart of the Thames Valley economic corridor — one of the most
          prosperous areas outside central London. The Royal County is home to global technology
          giants, world-leading pharmaceutical companies, and some of England's most historic and
          valuable real estate, from Windsor Castle to the Georgian townhouses of Newbury.
        </p>
        <p>
          For electrical contractors, this creates a unique combination of opportunities: high-value
          residential smart home and EV charging work; specialist commercial electrical work for
          technology campuses; heritage-sensitive rewiring and installation in listed properties;
          and a constantly growing renewables market driven by affluent homeowners and corporate
          sustainability targets.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verify NICEIC, NAPIT, or ELECSA registration</strong> before booking —
                essential for all Part P notifiable work in Berkshire.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scottish and Southern Electricity Networks (SSEN)</strong> — not UKPN — is
                the DNO for Berkshire. All solar PV notifications (G98/G99) and connection
                applications go through SSEN.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Elec-Mate</strong> supports Berkshire electricians with EICR, EIC, and Minor
                Works Certificate generation on site via mobile app.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'areas-covered',
    heading: 'Areas Covered Across Berkshire',
    content: (
      <>
        <p>
          Berkshire covers six unitary authority areas. The main population centres and electrical
          work markets include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reading</strong> — major commercial centre, home to Oracle UK HQ and
                large-scale retail and office developments. Strong commercial and domestic
                residential electrical market.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Slough</strong> — one of the largest trading estates in Europe. High-density
                commercial and industrial electrical work. Significant EICR compliance demand in the
                rental sector.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Windsor and Maidenhead</strong> — premium residential market with listed
                buildings, conservation areas, and strong demand for smart home and EV charging
                installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bracknell</strong> — established technology business park town. Large Cisco
                and HP offices drive commercial electrical and data infrastructure demand.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Newbury and West Berkshire</strong> — rural market town with growing
                affluent residential market. Vodafone UK HQ in Newbury. Rural TT earthing
                considerations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wokingham</strong> — consistently ranked among England's most prosperous
                boroughs. High-value residential work and strong EV and solar PV demand.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'qualifications',
    heading: "How to Verify an Electrician's Qualifications in Berkshire",
    content: (
      <>
        <p>
          Part P of the Building Regulations applies across all six Berkshire unitary authorities.
          Registered competent person scheme electricians can self-certify notifiable work and avoid
          the need for building control inspections.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">Verification Checklist</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                NICEIC, NAPIT, ELECSA, or STROMA registration — verify online before booking
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Current ECS gold or blue card confirming NVQ Level 3 or 18th Edition update
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Public liability insurance — minimum £2 million (£5 million for commercial sites)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                For Windsor listed buildings: ask for specific heritage electrical experience and
                references
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Typical Electrician Costs in Berkshire',
    content: (
      <>
        <p>
          Berkshire commands some of the highest domestic electrician rates in England outside
          London, with rates in Windsor and Maidenhead approaching inner London levels. The
          technology sector creates competition for qualified electrical labour, pushing rates
          upward. Budget 15% to 30% above the national average for most work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">Typical Job Costs (2025)</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR (3-bed house):</strong> £190 to £320
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit upgrade:</strong> £540 to £820
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewire (4-bed detached):</strong> £5,500 to £9,000
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger installation:</strong> £900 to £1,400
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart home electrical fit-out:</strong> £2,000 to £15,000+
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'tech-corridor',
    heading: 'Thames Valley Tech Corridor — Commercial Electrical Opportunities',
    content: (
      <>
        <p>
          The Reading-to-Slough-to-Bracknell technology corridor is sometimes called the "UK Silicon
          Valley" — home to European or UK headquarters of Oracle, Microsoft, Cisco, Vodafone, HP,
          and dozens of other global technology companies. This creates a specialist commercial
          electrical market unavailable in most other UK locations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Office fit-out and CAT A/CAT B:</strong> Technology campuses undergo
                frequent refurbishment and fit-out. Commercial electrical contractors with
                experience in office CAT A and CAT B work — raised floor power, perimeter trunking,
                suspended ceiling lighting — are in consistent demand.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Slough Trading Estate:</strong> One of Europe's largest trading estates with
                over 400 companies. Industrial electrical work here ranges from standard three-phase
                supplies to specialist manufacturing and pharmaceutical electrical installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV fleet charging (commercial):</strong> Technology companies with large
                vehicle fleets are installing high-power depot charging infrastructure. OZEV LEVI
                approval and three-phase load management expertise required.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'windsor-heritage',
    heading: 'Windsor Heritage Properties — Electrical Challenges',
    content: (
      <>
        <p>
          Windsor is home to Windsor Castle — the oldest and largest occupied castle in the world —
          and an extensive surrounding town centre with some of the most sensitive heritage
          buildings in England. The Royal Borough of Windsor and Maidenhead has more than 2,000
          listed buildings within its boundaries.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Listed Building Consent:</strong> Required from the Royal Borough for any
                electrical work affecting the character of a listed building — including new cable
                routes in original plasterwork, new accessory positions in prominent locations, and
                external installations visible from the street.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Surface-mounted wiring:</strong> In Grade I and Grade II* listed buildings,
                chasing into original plasterwork or masonry is rarely acceptable to the Royal
                Borough's conservation officer. Surface-mounted mineral insulated (MI) cable, steel
                conduit, or period-appropriate trunking in matching finishes are the approved
                approaches.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Crown Estate and Royal Household properties:</strong> Some properties within
                the Windsor Castle precincts and Crown Estate are not subject to the normal listed
                building regime — they fall under Crown Immunity or specific Crown Estate management
                policies. Always confirm the consent regime before starting work on any property
                within the castle boundaries.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dno',
    heading: 'SSEN — DNO for Berkshire',
    content: (
      <>
        <p>
          Scottish and Southern Electricity Networks (SSEN) is the distribution network operator for
          Berkshire and the wider South of England. Electricians who have previously worked in the
          South East — where UKPN operates — should note this important distinction when working in
          Berkshire.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections and upgrades:</strong> Apply via ssen.co.uk. SSEN processes
                new domestic connections within the statutory timescales under the Distribution
                Connection Use of System Agreement (DCUSA).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99 notifications:</strong> Submit via SSEN's online portal. G98 (up to
                3.68kW single-phase) notified after installation within 28 days. G99 requires prior
                approval — allow 45 working days minimum.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Power cuts:</strong> Report power cuts to SSEN by calling 105 — the national
                power cut number. Do not call UKPN for Berkshire power cuts.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Use <SEOAppBridge href="/tools/eicr-certificate" label="Elec-Mate" /> to record SSEN as
          the DNO on all EIC and EICR certificates issued in Berkshire.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianBerkshirePage() {
  return (
    <GuideTemplate
      title="Electrician Berkshire — Find Qualified Electricians in Reading, Slough, Windsor, Bracknell"
      description="Find NICEIC and NAPIT registered electricians across Berkshire, covering Reading, Slough, Windsor, Bracknell, Newbury, Maidenhead, and Wokingham. EICR, rewires, EV charging, smart home, and commercial electrical work."
      datePublished="2025-01-01"
      dateModified="2026-04-11"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Location Guide"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician Berkshire <span className="text-yellow-400">— Qualified & Registered</span>
        </>
      }
      heroSubtitle="Find NICEIC and NAPIT registered electricians across Reading, Slough, Windsor, Bracknell, Newbury, Maidenhead, and Wokingham. EICRs, rewires, EV charging, smart home, and Thames Valley commercial electrical work. DNO: SSEN."
      readingTime={9}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Electrician Berkshire — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Electricians in Berkshire — manage your certificates with Elec-Mate"
      ctaSubheading="Issue EICRs, EICs, and Minor Works Certificates on site. Start your free 7-day trial."
    />
  );
}
