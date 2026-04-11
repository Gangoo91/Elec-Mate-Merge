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
  { label: 'Find an Electrician', href: '/guides/electrician-oxfordshire' },
  { label: 'Oxfordshire', href: '/electrician-oxfordshire' },
];

const tocItems = [
  { id: 'overview', label: 'Electricians in Oxfordshire' },
  { id: 'areas-covered', label: 'Areas Covered' },
  { id: 'qualifications', label: 'How to Verify Qualifications' },
  { id: 'costs', label: 'Typical Costs in Oxfordshire' },
  { id: 'oxford-heritage', label: 'Oxford University Buildings and Conservation' },
  { id: 'science-research', label: 'Science and Research Cluster' },
  { id: 'dno', label: 'SSEN in Oxfordshire' },
  { id: 'faq', label: 'FAQ' },
];

const keyTakeaways = [
  'Oxfordshire is served by Scottish and Southern Electricity Networks (SSEN) for electricity distribution. All new connections, supply upgrades, solar PV notifications (G98/G99), and EV charger registrations go through SSEN.',
  "Oxford has one of the densest concentrations of listed buildings in England, including the University of Oxford's 44 colleges, most of which are Grade I or Grade II* listed. Electrical work in these buildings demands specialist heritage skills and collaboration with the University estates teams.",
  "The Oxford-to-Didcot science and research corridor — including the Oxford Science Park, Harwell Campus, and Milton Park — is one of the UK's most important knowledge economy clusters, creating significant specialist commercial and laboratory electrical demand.",
  "Didcot's Energy Hub at Harwell is a major centre for energy research, including fusion energy (UKAEA), battery technology, and advanced nuclear. Commercial electricians with high-voltage and specialist power systems experience find strong opportunities in this sector.",
  "Bicester Village and the Bicester growth area (one of the UK's designated Garden Towns) are driving significant new residential and commercial electrical demand in the north of the county.",
  'Rural Oxfordshire has widespread TT earthing. Electricians working in villages and rural properties across the Cotswolds and Vale of White Horse should always verify the earthing arrangement under BS 7671 Regulation 542 before carrying out earthing work.',
];

const faqs = [
  {
    question: 'How much does an electrician cost in Oxfordshire?',
    answer:
      'Oxfordshire electrician rates are driven upward by the proximity to London and the wealth of the university city economy. Typical day rates: £340 to £460 per day. Common job prices: EICR (3-bed house) £175 to £310; consumer unit upgrade £520 to £800; full rewire (3-bed Victorian terrace) £4,200 to £7,000; EV charger installation £850 to £1,350; solar PV electrical connection (4kWp) £620 to £1,000. Oxford city centre and North Oxford command the highest rates, while Banbury and Witney are closer to the Midlands average. University and research campus commercial work is priced separately — expect day rates of £400 to £550 for specialist commercial work.',
  },
  {
    question: 'Who is the DNO for Oxfordshire?',
    answer:
      'Oxfordshire is served by Scottish and Southern Electricity Networks (SSEN), which operates the distribution network across the South of England including Oxfordshire, Berkshire, and Hampshire. Apply for new connections and supply upgrades via ssen.co.uk. For power cuts, call 105. When recording DNO details on an EIC or EICR in Oxfordshire, record SSEN. Rural Oxfordshire has significant TT earthing — always verify the earthing arrangement for rural properties and farmhouses before carrying out earthing work or connecting solar PV or battery storage equipment.',
  },
  {
    question: 'What are the electrical challenges of working in Oxford University buildings?',
    answer:
      "Oxford's 44 colleges and numerous faculty buildings represent some of the most complex electrical environments in the UK. Challenges include: Grade I and Grade II* listed status requiring Listed Building Consent from Oxford City Council for most electrical alterations; medieval and early modern construction with solid stone walls and original plaster that cannot be chased; restricted areas requiring security clearance and coordination with college porters and estates teams; complex historical wiring installations accumulated over decades of piecemeal upgrades; and the need for surface-mounted MI cable or steel conduit in the most sensitive spaces. Electricians working on University buildings typically operate under a University Framework Agreement — direct approaches without prior estate approval are unlikely to succeed.",
  },
  {
    question: 'What specialist electrical work is available at Harwell Campus?',
    answer:
      "The Harwell Science and Innovation Campus is one of the UK's most important sites for energy and space research. It houses the UK Atomic Energy Authority (UKAEA, working on fusion energy), the Rutherford Appleton Laboratory (RAL), the Diamond Light Source synchrotron, and over 100 hi-tech companies. Specialist electrical work at Harwell includes: high-current power supplies for research magnets and accelerators; clean power supplies with low harmonic distortion for sensitive measurement equipment; uninterruptible power supply (UPS) systems for continuous research operations; high-integrity earthing for electromagnetic compatibility (EMC); and specialist cable management in radiation environments. This is highly specialist work requiring appropriate commercial and industrial electrical experience — and in some areas, specific radiation safety training.",
  },
  {
    question:
      'Are there strong opportunities for solar PV and EV charging installations in Oxfordshire?',
    answer:
      "Yes. Oxfordshire has one of the highest rates of solar PV adoption among English counties, driven by strong household incomes, a well-educated homeowner population, and the influence of Oxford's sustainability research community. The county is also a strong market for EV charging — Oxford's zero emission zone (one of the UK's first) has encouraged significant EV uptake. MCS accreditation is essential for solar PV installers working in Oxfordshire. For commercial EV charging at Oxford's science parks and business parks, OZEV LEVI approval is required for grant-funded installations. SSEN G98/G99 notifications apply for all solar PV and battery installations.",
  },
  {
    question: 'What conservation area and listed building considerations apply in Oxfordshire?',
    answer:
      'Oxfordshire has an exceptionally high density of listed buildings — over 14,000 listed structures, including buildings in virtually every village in the Cotswolds and Vale of White Horse. The conservation areas in Oxford city centre (including the Central Conservation Area covering the historic university buildings) and in Burford, Woodstock, Witney, and Thame are particularly sensitive. In these areas, listed building consent is required from the relevant district council for electrical works affecting the character of buildings, including new cable routes through original fabric, new accessory positions on historic surfaces, and external installations visible from the street. Electricians should advise clients to consult a planning consultant or heritage architect before committing to a design in any listed property.',
  },
  {
    question:
      'What is the Bicester Garden Town development and what electrical work does it create?',
    answer:
      "Bicester is one of the UK's first designated Garden Towns, with planning consents for over 13,000 new homes and significant commercial and community development. The ongoing Bicester growth area creates consistent new-build residential electrical work — consumer unit installation, first fix and second fix wiring, EV charger provision as standard (required by Building Regulations Part S for new homes), and solar PV preparation. Commercial development at Bicester Village (the designer outlet), the Bicester Motion automotive campus, and new employment land also creates commercial electrical opportunities. Electricians based in north Oxfordshire and south Northamptonshire are well-placed to serve this growth.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/electrician-berkshire',
    title: 'Electricians in Berkshire',
    description: 'Find qualified electricians across Reading, Slough, Windsor, and Bracknell.',
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
    description: 'How to size a solar PV system for UK homes — kWp, orientation, MCS, G98/G99.',
    icon: Zap,
    category: 'Guide',
  },
];

const sections = [
  {
    id: 'overview',
    heading: 'Electricians in Oxfordshire',
    content: (
      <>
        <p>
          Oxfordshire is one of England's most intellectually and economically dynamic counties —
          home to one of the world's greatest universities, a world-leading science and technology
          cluster, and some of the most beautiful and historically significant buildings in Britain.
          For electricians, this creates a uniquely challenging and rewarding market.
        </p>
        <p>
          Oxford city's 44 university colleges represent some of the most complex heritage
          electrical environments in the UK. The Harwell and Oxford science parks create specialist
          commercial and laboratory electrical demand. And across the county's market towns and
          Cotswold villages, high-value residential work — rewires, smart home systems, solar PV,
          and EV charging — provides consistent income for well-qualified electrical contractors.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verify NICEIC, NAPIT, or ELECSA registration</strong> — essential for all
                Part P notifiable work in Oxfordshire.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scottish and Southern Electricity Networks (SSEN)</strong> is the DNO for
                Oxfordshire — all G98/G99 solar notifications and connection applications go through
                SSEN.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Elec-Mate</strong> enables Oxfordshire electricians to issue EICR reports
                and EIC certificates on site via mobile, reducing admin and speeding up payment.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'areas-covered',
    heading: 'Areas Covered Across Oxfordshire',
    content: (
      <>
        <p>
          Oxfordshire covers four district councils (Cherwell, South Oxfordshire, Vale of White
          Horse, and West Oxfordshire) plus the Oxford City Council unitary authority. Key areas for
          electrical contractors include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Oxford</strong> — historic university city. Listed buildings and
                conservation areas throughout. Strong demand for heritage-sympathetic rewiring and
                specialist university building work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Abingdon</strong> — growing town on the southern fringes of Oxford with
                significant residential development and the Abingdon Science Park.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Banbury</strong> — north Oxfordshire's largest town. Mix of Victorian
                housing, industrial areas, and expanding residential estates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bicester</strong> — Garden Town growth area with major new residential
                development. New-build electrical work, EV charging, and solar PV.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Didcot and Harwell</strong> — energy and science hub. Specialist commercial
                and research facility electrical work at Harwell Campus.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Witney</strong> — west Oxfordshire market town with a mix of period
                properties and modern estates. Growing solar PV market.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'qualifications',
    heading: "How to Verify an Electrician's Qualifications in Oxfordshire",
    content: (
      <>
        <p>
          Part P of the Building Regulations applies across all of Oxfordshire. Competent person
          scheme registrants can self-certify notifiable work and notify the relevant local
          authority on the homeowner's behalf.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">Verification Checklist</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>NICEIC, NAPIT, ELECSA, or STROMA registration — verify the number online</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Current ECS card confirming NVQ Level 3 electrotechnical qualification</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Public liability insurance — minimum £2 million, £5 million for heritage/university
                buildings
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                For Oxford University buildings: confirm the contractor operates under a University
                Framework Agreement
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Typical Electrician Costs in Oxfordshire',
    content: (
      <>
        <p>
          Oxfordshire electrician rates reflect the county's high cost of living, the affluence of
          the university city economy, and competition for skilled labour from the research and
          technology sector. Budget 15% to 25% above the national average for standard domestic
          work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">Typical Job Costs (2025)</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR (3-bed house):</strong> £175 to £310
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit upgrade:</strong> £520 to £800
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewire (3-bed Victorian terrace):</strong> £4,200 to £7,000
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger installation:</strong> £850 to £1,350
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solar PV electrical connection (4kWp):</strong> £620 to £1,000
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'oxford-heritage',
    heading: 'Oxford University Buildings and Conservation',
    content: (
      <>
        <p>
          The University of Oxford comprises 44 colleges and six permanent private halls, most of
          which occupy medieval or early modern buildings in the heart of Oxford. Nearly all are
          Grade I or Grade II* listed, making them among the most sensitive environments for
          electrical work in England.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Framework contractors:</strong> Most University of Oxford colleges and
                departments procure electrical work through approved framework contractors.
                Electricians seeking work at the University should register on the University's
                procurement portal or approach colleges directly about approved contractor status.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Surface-mounted wiring:</strong> In Grade I listed college buildings, all
                cable routes in original fabric are surface-mounted — typically in painted steel
                conduit or MI cable. Chasing into medieval stonework or original plasterwork is not
                acceptable to Oxford City Council's conservation officers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire safety in historic buildings:</strong> Fire detection wiring in Oxford
                college buildings requires careful design to meet BS 5839 Part 1 while avoiding
                damage to historic fabric. Wireless fire detection systems are increasingly used in
                the most sensitive spaces.
              </span>
            </li>
          </ul>
        </div>
        <p>
          See the{' '}
          <SEOInternalLink
            href="/guides/eicr-observation-codes-explained"
            label="EICR observation codes guide"
          />{' '}
          for how electrical deficiencies found in Oxford's heritage buildings are typically graded
          and what remedial action is required.
        </p>
      </>
    ),
  },
  {
    id: 'science-research',
    heading: 'Science and Research Cluster — Specialist Electrical Opportunities',
    content: (
      <>
        <p>
          The Oxford-to-Didcot science corridor is one of the UK's most important knowledge economy
          clusters. The Harwell Science and Innovation Campus, Milton Park, Oxford Science Park, and
          Culham Science Centre collectively employ thousands of researchers and scientists,
          creating a distinct market for specialist electrical contractors.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fusion energy (UKAEA, Culham):</strong> The UK Atomic Energy Authority's
                Culham Campus is home to the JET and STEP fusion energy programmes. High-current
                power supplies, specialist earthing for EMC, and power quality management are key
                requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Laboratory electrical fit-out:</strong> Oxford's biotech and pharmaceutical
                companies at Milton Park and Oxford Science Park require laboratory-grade electrical
                fit-outs — including fume cupboard supplies, gas interlocking, emergency stop
                systems, and cleanroom containment wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Energy storage (Harwell):</strong> Harwell is the UK's national centre for
                energy storage research. Battery test facility electrical installations require
                specialist knowledge of energy storage safety standards and high-current DC systems.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dno',
    heading: 'SSEN — DNO for Oxfordshire',
    content: (
      <>
        <p>
          Scottish and Southern Electricity Networks (SSEN) serves all of Oxfordshire. Electricians
          moving to Oxfordshire from the South East (UKPN territory) should note this important
          distinction, particularly when completing EICR and EIC certificates and when submitting
          G98/G99 notifications.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98 solar notifications:</strong> Systems up to 3.68kW single-phase notified
                to SSEN via the online portal within 28 days of commissioning.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G99 applications:</strong> Prior SSEN approval required for systems above
                3.68kW single-phase. Allow 45 working days. Harwell Campus research systems may
                require bespoke technical assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rural TT earthing:</strong> TT earthing is prevalent across rural
                Oxfordshire — Cotswold villages, the Vale of White Horse, and rural areas across all
                four districts. Always verify earthing arrangements under BS 7671 Regulation 542 for
                rural and semi-rural properties before carrying out earthing or renewable energy
                connection work.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Use <SEOAppBridge href="/tools/eicr-certificate" label="Elec-Mate" /> to record SSEN as
          the DNO on all EIC and EICR certificates issued in Oxfordshire, and to manage your
          compliance documentation from site.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianOxfordshirePage() {
  return (
    <GuideTemplate
      title="Electrician Oxfordshire — Find Qualified Electricians in Oxford, Abingdon, Banbury, Didcot"
      description="Find NICEIC and NAPIT registered electricians across Oxfordshire, covering Oxford, Abingdon, Banbury, Bicester, Witney, and Didcot. EICR, rewires, EV charging, heritage buildings, and research facility electrical work. DNO: SSEN."
      datePublished="2025-01-01"
      dateModified="2026-04-11"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Location Guide"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician Oxfordshire <span className="text-yellow-400">— Qualified & Registered</span>
        </>
      }
      heroSubtitle="Find NICEIC and NAPIT registered electricians across Oxford, Abingdon, Banbury, Bicester, Witney, and Didcot. EICRs, rewires, EV charging, university heritage buildings, and Harwell science campus electrical work. DNO: SSEN."
      readingTime={9}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Electrician Oxfordshire — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Electricians in Oxfordshire — manage your certificates with Elec-Mate"
      ctaSubheading="Issue EICRs, EICs, and Minor Works Certificates on site. Start your free 7-day trial."
    />
  );
}
