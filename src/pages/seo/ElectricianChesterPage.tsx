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
  Landmark,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Electrician in Chester', href: '/electricians/chester' },
];

const tocItems = [
  { id: 'overview', label: 'Chester Overview' },
  { id: 'regulations', label: 'Part P and Compliance' },
  { id: 'property-types', label: 'Chester Property Types' },
  { id: 'common-jobs', label: 'Common Electrical Jobs' },
  { id: 'finding-electrician', label: 'Finding a Qualified Electrician' },
  { id: 'pricing', label: 'Electrician Rates in Chester' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Chester is in England, so Part P of the Building Regulations applies. Notifiable electrical work must be carried out by a registered competent person (NICEIC, NAPIT, or ELECSA) or notified to Cheshire West and Chester Council Building Control.',
  "Chester has a remarkable concentration of listed buildings and a Roman and medieval street layout. The Rows — Chester's unique two-storey galleried shopping streets — present unusual electrical access and installation challenges.",
  'The DNO for Chester is Electricity North West (ENW). All new connections, increased supplies, and G98/G99 generation notifications go through ENW.',
  'Chester has a significant rental and student property market alongside a heritage tourism economy. EICR demand is strong, driven by the Renters (Reform) Act requirements for landlords.',
  'Labour rates in Chester are mid-range for the North West — typically £40 to £58 per hour for a qualified, registered electrician in 2026.',
];

const faqs = [
  {
    question: 'Do I need a Part P certificate for electrical work in Chester?',
    answer:
      'Yes. Chester is in England, so Part P of the Building Regulations 2010 applies. Notifiable work — such as a new circuit, consumer unit replacement, or work in a kitchen or bathroom — must either be carried out by a registered competent person (who self-certifies) or notified to Cheshire West and Chester Council Building Control before work starts. A completion certificate and BS 7671 Electrical Installation Certificate (EIC) must be issued on completion. Failure to comply can cause problems when selling a property.',
  },
  {
    question: 'Who is the DNO for Chester?',
    answer:
      'Electricity North West (ENW) is the Distribution Network Operator for Chester and the wider North West region. For new connections, increased supply capacity (for example, upgrading for an EV charger or heat pump), and G98/G99 generation notifications for solar PV or battery storage, you deal with ENW. Their connections portal handles most application types online. G98 notifications for systems up to 16A per phase are straightforward; G99 applications for larger systems require prior approval and typically take 8 to 12 weeks.',
  },
  {
    question: "What are the electrical challenges of Chester's historic buildings?",
    answer:
      "Chester has one of the UK's highest concentrations of listed buildings and timber-framed properties, particularly in the city centre. The main challenges are: solid or timber-frame walls that cannot be chased in the conventional way, requiring surface-mounted trunking or conduit; the risk of discovering knob-and-tube or other obsolete wiring in older properties; listed building consent requirements for external electrical work including EV chargers, security lighting, and external cable routes; and asbestos in pre-1980s properties, which requires a survey before any invasive work. Always survey the property thoroughly before quoting.",
  },
  {
    question: 'How much does an EICR cost in Chester?',
    answer:
      'An Electrical Installation Condition Report (EICR) in Chester typically costs £160 to £280 for a standard residential property. The price depends on the size of the property, the number of circuits, and the age and condition of the installation. Larger properties with old wiring take longer to test. EICR prices in Chester are broadly in line with the rest of the North West — slightly lower than Manchester city centre but higher than some rural areas. Landlords should budget for remedial work costs on top of the EICR fee, particularly in older properties.',
  },
  {
    question: 'Do I need listed building consent for electrical work in Chester?',
    answer:
      'Listed building consent may be required for electrical work that affects the character of a listed building — both externally and internally. Chester has a very large number of listed buildings, particularly in the city centre and the Rows area. Any external electrical installation (EV chargers, security cameras, external lighting, cable routes on facades) on a listed building requires consent from Cheshire West and Chester Council. Advise customers to check with the council planning department before committing to work on listed properties. Internal rewiring is usually acceptable if it does not damage original features.',
  },
  {
    question: 'What qualifications do I need to work as an electrician in Chester?',
    answer:
      'The requirements are the same as elsewhere in England. You need City & Guilds 2365 Level 2 and 3 (or equivalent NVQ Level 3 in Electrical Installation) as your core qualification, plus the 18th Edition (BS 7671:2018+A3:2024) wiring regulations certificate. To self-certify notifiable work under Part P, you must be registered with a competent person scheme: NICEIC, NAPIT, or ELECSA are the main schemes for domestic electrical work. Registration requires an assessment of your technical competence, business systems, and ability to produce correct documentation.',
  },
  {
    question: 'What is the typical cost of a full house rewire in Chester?',
    answer:
      "A full house rewire in Chester typically costs £3,200 to £5,500 for a standard 3-bedroom semi-detached property, depending on the size, number of circuits, access difficulties, and whether the property is occupied or empty. Chester's older housing stock — particularly Victorian and Edwardian terraces in areas like Hoole and Newton — can add cost due to solid floors, limited floor void access, and the need for surface-mounted wiring in some areas. Properties with asbestos will also require a survey and potentially removal work before rewiring can proceed.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Issue Electrical Installation Certificates on site — required for all Part P notifiable work in Chester.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Electrical Installation Condition Reports for Chester landlords, letting agents, and periodic inspections.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      "Size cables for rewires, new circuits, and long cable runs in Chester's period properties.",
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'EV charger installations in Chester — including listed building consent considerations.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Quote rewires, consumer unit upgrades, and EV charger installations with accurate Chester pricing.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 with structured training modules covering inspection and testing procedures.',
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
    heading: 'Electrician in Chester: What You Need to Know',
    content: (
      <>
        <p>
          Chester is one of England's most historically significant cities — a walled Roman city
          with a medieval street plan, a remarkable concentration of listed and timber-framed
          buildings, and a thriving tourist economy. For electricians, Chester offers a varied
          workload: heritage property rewires, landlord EICRs, new-build estates on the city's
          edges, commercial work in the retail and hospitality sectors, and a growing demand for EV
          chargers and renewable energy installations.
        </p>
        <p>
          The city sits on the England–Wales border, which matters for regulatory purposes: Chester
          itself is in England (Cheshire West and Chester local authority), so Part P of the
          Building Regulations applies. Electricians working across the border into Flintshire or
          Wrexham encounter the same regulatory framework as England — Wales adopted Part P in 2006
          — but will deal with a different DNO (SP Manweb rather than Electricity North West).
        </p>
        <p>
          This guide covers the regulatory requirements, DNO contacts, property types, typical jobs,
          pricing, and practical advice for electricians working in and around Chester.
        </p>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Part P and Electrical Compliance in Chester',
    content: (
      <>
        <p>
          Chester is in England, so Part P of the Building Regulations 2010 applies to all domestic
          electrical work. Part P requires that notifiable electrical work is either:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-certified by a registered competent person</strong> — electricians
                registered with NICEIC, NAPIT, or ELECSA can self-certify notifiable work and issue
                a Building Regulations compliance certificate directly. This is the standard route
                for qualified registered electricians.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Notified to Building Control</strong> — unregistered electricians must
                notify Cheshire West and Chester Council Building Control before starting notifiable
                work. The council will inspect the work and issue a completion certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Notifiable work categories</strong> — new circuits, consumer unit
                replacements, work in kitchens, bathrooms, and outdoors, and work near swimming
                pools or hot tubs. Minor works such as adding a socket to an existing circuit or
                replacing a fitting like-for-like are not notifiable but must still comply with BS
                7671.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 compliance</strong> — all electrical work in Chester must comply
                with BS 7671:2018+A3:2024 (the 18th Edition Wiring Regulations). This is mandatory
                regardless of whether the work is notifiable. RCD protection is required for most
                socket outlet circuits and for circuits in certain locations.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Chester's large stock of rental properties means that EICRs (Electrical Installation
          Condition Reports) are a significant part of the local electrician's workload. Landlords
          are required to have a valid EICR every five years or at change of tenancy, with remedial
          work completed within 28 days of an unsatisfactory report.
        </p>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Chester Property Types and Electrical Challenges',
    content: (
      <>
        <p>
          Chester's housing stock is diverse, ranging from medieval timber-framed buildings in the
          city centre to Victorian and Edwardian terraces, inter-war semis, and modern new-build
          estates. Each presents different electrical challenges:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">
              Listed and Timber-Framed Buildings
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Chester's city centre has a high concentration of listed buildings and genuine
              timber-framed properties dating from the 16th and 17th centuries. Rewiring requires
              surface-mounted mini-trunking or conduit — you cannot chase into timber frames. Listed
              building consent is required for external electrical work. Asbestos surveys are
              essential in pre-1980s properties, including in insulation board and floor tiles.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian and Edwardian Terraces</h3>
            <p className="text-white text-sm leading-relaxed">
              Areas such as Hoole, Newton, and Boughton feature Victorian and Edwardian terraces
              with solid brick walls, suspended timber floors, and original features. These
              properties frequently have old rubber-insulated wiring that needs full replacement.
              Consumer units are often inadequate and require upgrading. Rewires require careful
              access through floor voids and ceiling spaces.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Modern New-Build Estates</h3>
            <p className="text-white text-sm leading-relaxed">
              Chester's outskirts (Upton, Saughall, Rowton, Blacon) have significant new-build
              development. These properties are built to current standards with cavity walls and
              modern consumer units. Work is typically additions, EV charger installations, and
              smart home upgrades rather than full rewires. EV charger demand is strong in new-build
              estates.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Commercial and Retail</h3>
            <p className="text-white text-sm leading-relaxed">
              Chester's strong retail and tourism economy creates demand for commercial electrical
              work in shops, restaurants, hotels, and visitor attractions. The Rows shopping streets
              are architecturally unique — two-storey galleried streets with unusual access and
              installation challenges. Commercial work requires appropriate qualifications and
              understanding of BS 7671 Part 7 special locations.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'common-jobs',
    heading: 'Common Electrical Jobs in Chester',
    content: (
      <>
        <p>
          The most common electrical jobs in Chester reflect the city's mix of heritage properties,
          an active rental market, and modern new-build development:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICRs for landlords</strong> — Chester has a large private rental market.
                EICRs every five years (or at change of tenancy) are a legal requirement.
                Electricians who build relationships with local letting agents can generate
                consistent EICR work throughout the year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacements</strong> — Chester's older housing stock
                frequently has outdated fuse boards that need upgrading to modern consumer units
                with RCD or RCBO protection. This is one of the most common jobs for Chester
                electricians.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger installations</strong> — demand for home and commercial EV
                chargers is growing across Chester. New-build estates are a particular growth area.
                Many older Chester properties have sufficient supply capacity for a 7kW charger
                without a DNO supply upgrade.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full and partial rewires</strong> — Chester's Victorian and Edwardian
                housing stock generates significant rewiring work. Partial rewires are common where
                sections of wiring are condemned on an EICR. Full rewires are needed in properties
                where the entire installation is beyond economic repair.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'finding-electrician',
    heading: 'Finding a Qualified Electrician in Chester',
    content: (
      <>
        <p>
          When looking for an electrician in Chester, the key indicators of quality and compliance
          are scheme registration and proper certification:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC or NAPIT registration</strong> — the two main competent person
                schemes for domestic electrical work in England. Both maintain public registers
                where you can search for approved contractors in Chester. NICEIC-registered
                electricians are assessed annually.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part P compliance documentation</strong> — always ask for a Building
                Regulations compliance certificate (issued by the scheme or by Building Control) and
                a BS 7671 EIC for notifiable work. Keep these documents — you'll need them when
                selling the property.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Written quotations</strong> — always get a written quote before work starts.
                A good electrician will survey the property and provide a detailed breakdown of
                costs including materials, labour, and any certification fees.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public Liability Insurance</strong> — any electrician working in your home
                should have public liability insurance. Ask to see proof before work starts.
                Reputable scheme members are required to hold adequate insurance as part of their
                registration conditions.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pricing',
    heading: 'Electrician Rates in Chester (2026)',
    content: (
      <>
        <p>
          Chester electrician rates in 2026 sit in the mid-range for the North West, broadly
          comparable to Crewe and Wrexham but lower than Manchester city centre. Typical rates:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-bold text-white">Hourly and Day Rates</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Hourly rate (qualified)</span>
                  <span className="font-semibold">£40 — £58</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (sole trader)</span>
                  <span className="font-semibold">£270 — £400</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (firm)</span>
                  <span className="font-semibold">£350 — £500</span>
                </li>
                <li className="flex justify-between">
                  <span>Emergency call-out</span>
                  <span className="font-semibold">£70 — £110/hr</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-white">Common Fixed-Price Jobs</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Consumer unit replacement</span>
                  <span className="font-semibold">£550 — £950</span>
                </li>
                <li className="flex justify-between">
                  <span>Single socket addition</span>
                  <span className="font-semibold">£100 — £160</span>
                </li>
                <li className="flex justify-between">
                  <span>Full rewire (3-bed semi)</span>
                  <span className="font-semibold">£3,200 — £5,500</span>
                </li>
                <li className="flex justify-between">
                  <span>EICR</span>
                  <span className="font-semibold">£160 — £280</span>
                </li>
                <li className="flex justify-between">
                  <span>EV charger installation</span>
                  <span className="font-semibold">£750 — £1,200</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          Heritage property work commands a premium in Chester due to the additional time required
          for surface-mounted wiring, the risk of finding obsolete wiring types, and the potential
          need for listed building consent. Always allow extra time and margin when quoting period
          properties in Chester city centre.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Chester',
    content: (
      <>
        <p>
          Chester offers a strong market for qualified electricians. The combination of heritage
          properties, a busy rental sector, growing EV charger demand, and commercial work in the
          retail and tourism economy creates a diverse workload with good rates.
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
                  site with AI-assisted board scanning and voice test entry. Part P compliance
                  requires professional documentation — deliver it from your phone before you leave
                  site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing for Period Properties</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>{' '}
                  for accurate voltage drop calculations on longer cable runs in Chester's period
                  properties — particularly where surface-mounted trunking routes add cable length.
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
                  Price Chester jobs accurately with the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Account for the additional time needed in listed and heritage properties. Send
                  professional PDF quotes to Chester customers from the site survey.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional electrical tools for Chester electricians"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Built for the realities of Chester's heritage properties and Part P compliance. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianChesterPage() {
  return (
    <GuideTemplate
      title="Electrician in Chester | Local Electricians 2026"
      description="Find qualified electricians in Chester. Part P compliance, NICEIC registered, listed building electrical work, EICR for landlords, consumer unit replacement, and local electrician rates for 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Chester"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Chester: <span className="text-yellow-400">Local Electricians 2026</span>
        </>
      }
      heroSubtitle="Chester's unique mix of Roman walls, medieval timber-framed buildings, Victorian terraces, and modern new-builds demands electricians who understand Part P compliance, Electricity North West connections, and heritage property challenges."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Chester"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Tools for Chester Electricians"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, quoting, and on-site certification. Built for Part P compliance and the realities of Chester's heritage property stock. 7-day free trial."
    />
  );
}
