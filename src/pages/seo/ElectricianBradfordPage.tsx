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
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Electrician in Bradford', href: '/electricians/bradford' },
];

const tocItems = [
  { id: 'overview', label: 'Bradford Overview' },
  { id: 'finding-electrician', label: 'Finding a Qualified Electrician' },
  { id: 'pricing', label: 'Electrician Rates in Bradford' },
  { id: 'common-jobs', label: 'Common Electrical Jobs' },
  { id: 'regulations', label: 'Part P and Compliance' },
  { id: 'property-types', label: 'Bradford Property Types' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Bradford is in West Yorkshire, England. Part P of the Building Regulations applies — notifiable electrical work must be self-certified by a registered competent person (NICEIC, NAPIT, or ELECSA) or notified to Bradford Council Building Control.',
  'Northern Powergrid (NPG) is the Distribution Network Operator for Bradford and the wider West Yorkshire region. All new connections, supply upgrades, and G98/G99 generation notifications go through NPG.',
  'Bradford has a diverse and substantial housing stock including densely-built Victorian stone terraces, large areas of 1950s–1970s social housing, and modern new-build development. The older stock generates strong demand for rewires and consumer unit upgrades.',
  'Bradford is the UK City of Culture 2025, bringing significant regeneration investment and commercial development to the city centre — creating new commercial electrical opportunities.',
  'Labour rates in Bradford are among the most competitive in West Yorkshire — typically £38 to £55 per hour for a qualified, registered electrician in 2026, reflecting the competitive local market.',
];

const faqs = [
  {
    question: 'How do I find a reliable electrician in Bradford?',
    answer:
      'The safest way to find a reliable electrician in Bradford is to use the official NICEIC or NAPIT contractor search tools, entering your Bradford postcode. Both registers include only electricians who have been assessed for technical competence and carry appropriate public liability insurance. NICEIC and NAPIT registered electricians can self-certify notifiable work under Part P, meaning you receive a valid compliance certificate after the work is done. Always ask for a detailed written quote before committing to any work, and check that the electrician will issue a BS 7671 EIC or EICR as appropriate on completion.',
  },
  {
    question: 'Do I need Part P certification for electrical work in Bradford?',
    answer:
      'Yes. Bradford is in England and Part P of the Building Regulations 2010 applies to all domestic electrical work. Notifiable work — including new circuits, consumer unit replacements, and work in kitchens, bathrooms, and outdoors — must be self-certified by a registered competent person (NICEIC, NAPIT, or ELECSA) or notified to Bradford Council Building Control before work begins. On completion, a Part P compliance certificate and a BS 7671 EIC must be issued. These documents are essential for property sales and for landlord compliance records.',
  },
  {
    question: 'Who is the DNO for Bradford?',
    answer:
      'Northern Powergrid (NPG) is the Distribution Network Operator for Bradford and West Yorkshire. For new connections, supply capacity upgrades (required for EV chargers drawing significant load or heat pumps), and G98/G99 generation notifications for solar PV or battery storage, you deal directly with NPG. G98 notifications for generation systems up to 16A per phase can be submitted online through the NPG portal. G99 applications for larger systems require prior approval and typically take 8 to 12 weeks.',
  },
  {
    question: 'How much does a consumer unit replacement cost in Bradford?',
    answer:
      'A consumer unit replacement in Bradford typically costs £480 to £820, including a new dual-RCD or RCBO board, all necessary testing, and the EIC and Part P compliance certificate. Bradford prices are at the lower end of the West Yorkshire range due to the competitive local market. The exact cost depends on the number of circuits, accessibility of the existing installation, and whether any remedial wiring work is required at the same time. Always request a fixed-price quote after a proper survey.',
  },
  {
    question: 'What qualifications should a Bradford electrician have?',
    answer:
      'A qualified Bradford electrician should hold City & Guilds 2365 Level 2 and 3 (or NVQ Level 3 in Electrical Installation) as their core qualification, plus the current 18th Edition (BS 7671:2018+A3:2024) certificate. For inspection and testing work, C&G 2391 or equivalent is the standard. For self-certification of notifiable work under Part P, membership of NICEIC or NAPIT is required. Bradford College and Leeds City College both offer electrical training and apprenticeship programmes accessible to Bradford students.',
  },
  {
    question: 'What electrical work is legally classed as DIY in Bradford?',
    answer:
      'Like anywhere in England, Part P permits very limited DIY electrical work. You can replace like-for-like fittings — light fittings, socket faceplates, switches — without notification. You cannot legally carry out new circuits, add sockets to an existing circuit in a kitchen or bathroom, replace a consumer unit, or install a shower circuit without either being a registered competent person or notifying Bradford Council Building Control. Carrying out notifiable work without certification creates problems when selling a property and may void building insurance.',
  },
  {
    question: 'Is emergency electrician cover available in Bradford?',
    answer:
      'Yes. Several Bradford electricians offer 24-hour emergency call-out for genuine electrical emergencies — total power failures, exposed live wiring, flooding damage to electrical systems, or burning smells from consumer units. Emergency rates in Bradford typically run from £65 to £110 per hour with a minimum call-out charge. Always verify that an emergency electrician is NICEIC or NAPIT registered before committing, even in an urgent situation. If you suspect a serious electrical fault, isolate the supply at the consumer unit and call an emergency electrician rather than attempting repairs yourself.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Issue Electrical Installation Certificates on site — required for Part P notifiable work in Bradford.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'EICRs for Bradford landlords, letting agents, and residential periodic inspections.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      "Size cables for rewires and new circuits across Bradford's varied Victorian and post-war housing stock.",
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'EV charger installations in Bradford — Northern Powergrid notification and supply guidance.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Quote rewires, consumer unit upgrades, and EV charger installations with accurate Bradford pricing.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 — inspection and testing for domestic and commercial properties in Bradford.',
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
    heading: 'Electrician in Bradford: What You Need to Know',
    content: (
      <>
        <p>
          Bradford is West Yorkshire's second-largest city with a population of around 540,000
          across the metropolitan district. The city has a rich industrial heritage in wool and
          textile manufacturing and is undergoing significant regeneration, particularly as the UK
          City of Culture 2025. Bradford sits at the heart of the West Yorkshire Combined Authority
          area, with good transport links to Leeds (10 miles east), Halifax, and Skipton.
        </p>
        <p>
          For electricians, Bradford offers a substantial and varied market. The city's dense stock
          of Victorian stone terraces and large areas of 1950s–1970s housing generate consistent
          demand for EICRs, consumer unit upgrades, and full rewires. The City of Culture
          regeneration is driving commercial development in the city centre. The growing population
          of private rental properties and student accommodation keeps EICR workloads high for
          electricians who build relationships with local letting agents.
        </p>
        <p>
          This guide covers how to find a reliable electrician in Bradford, typical costs, what
          qualifications to look for, common jobs across the city's diverse housing stock, and
          practical guidance on Part P compliance and what work you can and cannot do yourself.
        </p>
      </>
    ),
  },
  {
    id: 'finding-electrician',
    heading: 'Finding a Qualified Electrician in Bradford',
    content: (
      <>
        <p>
          Finding a reliable electrician in Bradford means looking beyond price alone. Use these
          steps to identify a qualified and trustworthy contractor:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check NICEIC or NAPIT registration</strong> — use the official contractor
                search at niceic.com or napit.org.uk, entering your Bradford postcode. Only
                registered electricians can self-certify notifiable work under Part P — unregistered
                electricians must notify Bradford Council Building Control separately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ask for a gold card or scheme ID card</strong> — registered electricians
                carry a card confirming their scheme membership and expiry date. The card ID can be
                verified online before the electrician starts work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Get a written survey and quote</strong> — reputable Bradford electricians
                will visit and survey before quoting. Walk-in verbal quotes for rewires or consumer
                unit replacements, without seeing the existing installation, are a warning sign.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Confirm documentation</strong> — after notifiable work, you must receive a
                Part P compliance certificate and a BS 7671 EIC. For an EICR, you must receive the
                full inspection report, not just a summary letter.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Bradford has a competitive electrician market. Personal recommendation from neighbours,
          friends, or local trades is valuable — ask who your neighbours have used and whether they
          received proper documentation on completion.
        </p>
      </>
    ),
  },
  {
    id: 'pricing',
    heading: 'Electrician Rates in Bradford (2026)',
    content: (
      <>
        <p>
          Bradford electrician rates in 2026 are competitive — among the most affordable in West
          Yorkshire, reflecting the local market and the density of electricians serving the city:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-bold text-white">Hourly and Day Rates</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Hourly rate (qualified)</span>
                  <span className="font-semibold">£38 — £55</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (sole trader)</span>
                  <span className="font-semibold">£255 — £375</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (firm)</span>
                  <span className="font-semibold">£330 — £460</span>
                </li>
                <li className="flex justify-between">
                  <span>Emergency call-out</span>
                  <span className="font-semibold">£65 — £110/hr</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-white">Common Fixed-Price Jobs</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Consumer unit replacement</span>
                  <span className="font-semibold">£480 — £820</span>
                </li>
                <li className="flex justify-between">
                  <span>Single socket addition</span>
                  <span className="font-semibold">£88 — £145</span>
                </li>
                <li className="flex justify-between">
                  <span>Full rewire (3-bed semi)</span>
                  <span className="font-semibold">£2,800 — £4,600</span>
                </li>
                <li className="flex justify-between">
                  <span>EICR (3-bed house)</span>
                  <span className="font-semibold">£135 — £230</span>
                </li>
                <li className="flex justify-between">
                  <span>EV charger installation</span>
                  <span className="font-semibold">£690 — £1,100</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          Victorian stone terrace rewires in Bradford can cost more than a standard semi-detached
          rewire due to the difficulty of chasing solid stone walls and the complexity of original
          floor void and roof void access. Always obtain a fixed-price quote after a proper survey.
          Commercial and industrial electrical work commands higher rates than domestic work.
        </p>
      </>
    ),
  },
  {
    id: 'common-jobs',
    heading: 'Common Electrical Jobs in Bradford',
    content: (
      <>
        <p>The most in-demand electrical services in Bradford in 2026:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Landlord EICRs</strong> — Bradford has a large and active private rental
                market, including substantial HMO and student accommodation sectors. Letting agents
                are key contacts for building a reliable EICR pipeline. HMO EICRs require more
                circuits tested and typically take longer, justifying a higher fee.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacements</strong> — old rewirable fuse boards are common
                across Bradford's Victorian terrace and 1960s housing stock. Consumer unit upgrades
                to RCBO or dual-RCD boards are consistently one of the most requested jobs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full and partial rewires</strong> — Bradford's stone terrace housing stock
                includes many properties with ageing rubber or early PVC wiring. Rewires triggered
                by EICR C2 or C1 observations are among the most common jobs in the city.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger installations</strong> — growing steadily across Bradford's
                residential areas. NPG G98 notifications are required for solar PV generation; EV
                charger installations do not require G98 unless paired with battery storage, but
                must comply with BS 7671 and Part P.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial and City of Culture regeneration</strong> — Bradford city centre
                regeneration projects associated with the 2025 City of Culture designation are
                creating commercial and fit-out electrical opportunities for competent commercial
                electricians.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Part P and Electrical Compliance in Bradford',
    content: (
      <>
        <p>
          Bradford is in England and Part P of the Building Regulations 2010 applies to all domestic
          electrical work. Notifiable work must be handled through one of two routes:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person self-certification</strong> — NICEIC, NAPIT, or ELECSA
                registered electricians self-certify notifiable work and issue a Part P compliance
                certificate directly. This is the standard route for registered Bradford
                electricians.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Control notification</strong> — unregistered electricians must
                notify Bradford Council Building Control before starting notifiable work. The
                council inspects and issues a completion certificate, but this route takes longer
                and involves a council fee.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671:2018+A3:2024 compliance</strong> — all electrical work must comply
                with the current edition of the IET Wiring Regulations. RCD protection is required
                for all socket outlet circuits up to 32A under Regulation 411.3.3.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Landlord EICR requirements</strong> — Bradford's private landlords must
                comply with The Electrical Safety Standards in the Private Rented Sector (England)
                Regulations 2020. Valid EICRs every five years, with C1/C2 defects remedied within
                28 days. Bradford Council enforces compliance.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Bradford Property Types and Electrical Characteristics',
    content: (
      <>
        <p>Bradford's housing stock is diverse and reflects the city's industrial history:</p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian Stone Terraces</h3>
            <p className="text-white text-sm leading-relaxed">
              Bradford's most distinctive property type — dense rows of back-to-back and through
              terraces built in millstone grit. Areas including Manningham, Heaton, Girlington, and
              Shipley have large stocks of these properties. Solid stone walls make cable routing
              challenging; floor voids and roof spaces are the primary cable routes. Many have
              rubber-insulated wiring and old fuse boards.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">
              Post-War Council and Social Housing
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Large estates across areas such as Buttershaw, Holmewood, and Thorpe Edge were built
              as post-war social housing. Properties from the 1950s–1970s have wiring that is now
              past its expected service life. EICRs in these properties commonly generate multiple
              C2 observations requiring consumer unit upgrades or partial rewires.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Modern Private Development</h3>
            <p className="text-white text-sm leading-relaxed">
              Areas such as Apperley Bridge, Wrose, and the Aire Valley corridor have modern private
              housing built to current standards. Work here focuses on EV charger installations,
              additional circuits, kitchen and bathroom work, and smart home systems. Customers
              expect professional documentation and a high-quality finish.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">HMOs and Student Accommodation</h3>
            <p className="text-white text-sm leading-relaxed">
              Bradford has a significant HMO and student accommodation sector, driven by the
              University of Bradford. HMOs require annual or five-yearly EICRs depending on their
              licensing status. Fire alarm and emergency lighting testing and maintenance are
              additional recurring requirements for HMO landlords.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Bradford',
    content: (
      <>
        <p>
          Bradford provides a consistent and varied market for electricians. The high volume of
          ageing housing stock generates reliable EICR and rewiring work. The city's large rental
          sector — including HMOs and student accommodation — is a strong source of recurring
          compliance work. City of Culture regeneration adds commercial opportunity for electricians
          with commercial experience.
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
                  site and send to Bradford landlords and homeowners before you leave. Same-day
                  documentation sets professional electricians apart in a competitive market.
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
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to send professional, detailed quotes to Bradford homeowners, landlords, and
                  letting agents. Itemised quotes with accurate Bradford pricing win more work in a
                  competitive market.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional electrical tools for Bradford electricians"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Built for the residential and rental electrical market in Bradford and West Yorkshire. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianBradfordPage() {
  return (
    <GuideTemplate
      title="Electrician Bradford | Find Qualified Electricians in Bradford"
      description="Find qualified electricians in Bradford. NICEIC and NAPIT registered, Part P compliant. Bradford electrician rates, EICRs for landlords, consumer unit replacement, house rewiring, and EV chargers in Bradford 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Bradford"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Bradford:{' '}
          <span className="text-yellow-400">Find Qualified Electricians 2026</span>
        </>
      }
      heroSubtitle="Bradford's large stock of Victorian stone terraces and post-war housing creates consistent demand for qualified electricians specialising in EICRs, consumer unit upgrades, and rewires. Find NICEIC and NAPIT registered electricians in Bradford with Part P compliance expertise."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Bradford"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Tools for Bradford Electricians"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, quoting, and on-site certification. Built for the residential and rental electrical market in Bradford and West Yorkshire. 7-day free trial."
    />
  );
}
