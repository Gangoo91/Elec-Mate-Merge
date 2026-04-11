import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  ShieldCheck,
  Wrench,
} from 'lucide-react';

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Find an Electrician', href: '/find-electrician' },
  { label: 'Electrician Cambridgeshire', href: '/electrician-cambridgeshire' },
];

const tocItems = [
  { id: 'areas-covered', label: 'Areas Covered' },
  { id: 'dno-networks', label: 'DNO Networks' },
  { id: 'specialist-work', label: 'Specialist Electrical Work' },
  { id: 'ev-charging', label: 'EV Charging on New Builds' },
  { id: 'regulations', label: 'BS 7671 Compliance' },
  { id: 'certificates', label: 'Certification Requirements' },
  { id: 'faq', label: 'FAQ' },
];

const keyTakeaways = [
  'Cambridgeshire is served by two DNOs: UK Power Networks covers Cambridge, Ely, St Ives, March, and Huntingdon; National Grid Electricity Distribution covers Peterborough and the north of the county.',
  'The Silicon Fen tech corridor around Cambridge creates high demand for reliable commercial electrical installations, three-phase supplies, and data centre power infrastructure.',
  'Fenland areas including Wisbech and March often require special consideration for rural longline connections, where voltage regulation and cable sizing calculations must account for extended supply distances.',
  'New residential developments across Cambridgeshire are subject to Part P Building Regulations and must meet BS 7671:2018+A3:2024 requirements for EV charging provisions under Approved Document S.',
  'University and college buildings in Cambridge carry significant heritage and Grade-listing considerations, requiring sympathetic wiring methods and prior consent for surface-mounted installations.',
  'All electrical work on new circuits must be certified under the Part P notification scheme or self-certified by a registered competent person (NICEIC, ELECSA, NAPIT).',
];

const faqs = [
  {
    question: 'Which DNO covers Cambridge and South Cambridgeshire?',
    answer:
      'UK Power Networks is the Distribution Network Operator (DNO) for Cambridge, South Cambridgeshire, Ely, St Ives, Huntingdon, and March. If you need to arrange a new supply, upgrade existing capacity, or report a power cut in these areas, contact UK Power Networks. For Peterborough and the far north of the county, National Grid Electricity Distribution (formerly Western Power Distribution) is the DNO. Always confirm which DNO covers your specific postcode before booking a connection service.',
  },
  {
    question: 'Do I need Part P notification for electrical work in Cambridgeshire?',
    answer:
      'Yes. Part P of the Building Regulations applies across England, including all of Cambridgeshire. Any new circuit, consumer unit replacement, or electrical work in a kitchen, bathroom, or outdoors must either be notified to the local authority building control department or self-certified by a registered competent person. Electricians registered with NICEIC, ELECSA, or NAPIT can self-certify and issue certificates without separate building control notification. A Minor Works Certificate is sufficient for additions to existing circuits that do not create a new circuit.',
  },
  {
    question:
      'What electrical work is typically needed on fenland agricultural properties in Cambridgeshire?',
    answer:
      'Agricultural properties on the Cambridgeshire fens often require three-phase supplies for grain drying, irrigation pumps, cold stores, and workshop equipment. Rural supply distances can be significant, meaning voltage drop calculations under BS 7671 Regulation 525 must be carefully assessed. Cable sizing for long agricultural runs typically uses 25mm\u00b2 or 35mm\u00b2 SWA cable rather than standard domestic cable. Temporary site supplies for seasonal workers, external lighting for yards and driveways, and EV charging for farm vehicles are also common requirements.',
  },
  {
    question: 'Are there special requirements for electrical work in Cambridge historic buildings?',
    answer:
      "Many buildings in central Cambridge are Listed (Grade I or II) or within conservation areas. Listed building consent is required before making any alterations that affect the character of the building, including new surface-mounted conduit or trunking runs, new light fittings visible from outside, or alterations to original fabric. Electricians working in listed buildings should discuss the proposed installation method with the building owner and, where required, submit a listed building consent application to Cambridge City Council's Historic Environment team before starting work.",
  },
  {
    question: 'What EV charging regulations apply to new builds in Cambridgeshire?',
    answer:
      'From 15 June 2022, Approved Document S of the Building Regulations requires all new residential buildings with associated parking to be provided with EV charge points or cable routes (passive provision). In Cambridgeshire, this applies to all new houses and flats with designated parking spaces. Each new dwelling must have at least one 7kW single-phase EV charge point (or cable route for flats). The electrical installation must comply with BS 7671 and the charge point must meet the relevant product standards. Local planning conditions from South Cambridgeshire District Council and other authorities may impose additional EV charging requirements beyond the minimum.',
  },
  {
    question: 'What is the standard for electrical installations in Silicon Fen tech offices?',
    answer:
      'Technology companies in the Cambridge Science Park, Granta Park, and surrounding areas typically require high-specification electrical installations including: redundant UPS systems, three-phase distribution with clean earth provisions, raised floor power distribution, emergency lighting to BS 5266, and fire detection to BS 5839. Data centres and server rooms require careful co-ordination between electrical, mechanical, and structural engineers. All commercial installations must be designed to BS 7671, with a full Electrical Installation Certificate issued on completion by a qualified design and installation engineer.',
  },
  {
    question: 'How do I find a registered electrician in Peterborough or the Fens?',
    answer:
      "Use Elec-Mate to search for NICEIC, ELECSA, or NAPIT-registered electricians covering Peterborough, Wisbech, March, Ramsey, and the surrounding Fenland district. All electricians listed on Elec-Mate carry public liability insurance and are registered with a government-approved Part P competent person scheme. When requesting quotes, specify whether you need domestic, commercial, or agricultural electrical work, as contractor specialisms vary. For emergency fault-finding in Peterborough, National Grid ED's emergency number is 0800 6783 105.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/electrician-suffolk',
    title: 'Electrician Suffolk',
    description: 'Find registered electricians across Suffolk including Ipswich and Felixstowe.',
    icon: MapPin,
    category: 'Location',
  },
  {
    href: '/electrician-norfolk',
    title: 'Electrician Norfolk',
    description:
      'Find registered electricians across Norfolk including Norwich and Great Yarmouth.',
    icon: MapPin,
    category: 'Location',
  },
  {
    href: '/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description: 'Requirements for home and commercial EV charge point installations.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Landlord EICR obligations for rented properties in England.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/minor-works',
    title: 'Minor Works Certificate App',
    description: 'Issue compliant MWCs instantly on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

const sections = [
  {
    id: 'areas-covered',
    heading: 'Areas Covered — Cambridgeshire Electricians',
    content: (
      <>
        <p>
          Cambridgeshire is a large and varied county stretching from the outskirts of north London
          to the edge of the Lincolnshire Fens. Registered electricians on Elec-Mate cover the full
          county, including:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cambridge</strong> — city centre, Addenbrooke&apos;s corridor, Hills Road,
                Chesterton, Cherry Hinton, and surrounding villages
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Peterborough</strong> — city and surrounding villages including Eye,
                Werrington, Whittlesey, Yaxley, and Ramsey
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ely &amp; the Fens</strong> — Ely, March, Chatteris, Wisbech, Manea, and the
                wider Fenland district
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>St Ives &amp; Huntingdon</strong> — St Ives, Huntingdon, St Neots,
                Godmanchester, and the A14 corridor
              </span>
            </li>
          </ul>
        </div>
        <p>
          Whether you need a{' '}
          <SEOInternalLink href="/consumer-unit-replacement">
            consumer unit replacement
          </SEOInternalLink>{' '}
          in Cambridge or a three-phase agricultural supply connection near Wisbech, Elec-Mate
          connects you with qualified, insured local electricians.
        </p>
      </>
    ),
  },
  {
    id: 'dno-networks',
    heading: 'DNO Networks in Cambridgeshire',
    content: (
      <>
        <p>
          Understanding which Distribution Network Operator (DNO) covers your area is important when
          arranging new supply connections, capacity upgrades, or reporting faults on the public
          network.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>UK Power Networks</strong> — covers Cambridge, South Cambridgeshire, East
                Cambridgeshire (Ely), Fenland (March, Wisbech), Huntingdonshire (St Ives,
                Huntingdon, St Neots). Power cuts: 0800 783 8866.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>National Grid Electricity Distribution</strong> — covers Peterborough and
                the northern fringes of the county. Power cuts: 0800 678 3105.
              </span>
            </li>
          </ul>
        </div>
        <p>
          New supply connections and metering upgrades must be arranged directly with the relevant
          DNO. Your electrician can assist with the application process and prepare the necessary
          installation documentation.
        </p>
      </>
    ),
  },
  {
    id: 'specialist-work',
    heading: 'Specialist Electrical Work in Cambridgeshire',
    content: (
      <>
        <p>
          The county&apos;s diverse economy creates a wide range of specialist electrical
          requirements beyond standard domestic rewires and consumer unit replacements.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Silicon Fen technology companies</strong> — Cambridge Science Park, Granta
                Park, and Babraham Research Campus host hundreds of tech and biotech firms requiring
                three-phase power, UPS installations, clean earth systems, and data centre
                electrical infrastructure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>University and college buildings</strong> — the University of Cambridge and
                Anglia Ruskin University have extensive legacy electrical infrastructure. Work in
                Listed and historic buildings requires sympathetic installation methods and, in some
                cases, listed building consent.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fenland agricultural electrical</strong> — grain drying, cold storage,
                irrigation pumps, and poultry housing on the fens require three-phase supplies and
                specialist agricultural wiring in compliance with BS 7671 Section 705.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rural longline connections</strong> — remote fenland properties may
                experience voltage regulation issues due to extended LV network lengths. Cable
                sizing must account for voltage drop under BS 7671 Regulation 525.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ev-charging',
    heading: 'EV Charging on New Builds',
    content: (
      <>
        <p>
          Cambridgeshire is one of the fastest-growing counties for new housing development. From 15
          June 2022, Approved Document S of the Building Regulations requires EV charge points or
          passive provision on all new residential buildings with associated parking. Key
          requirements include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New houses:</strong> at least one 7kW EV charge point per dwelling with a
                designated parking space. The circuit must be dedicated and metered separately from
                the main supply where practical.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New flats:</strong> passive provision (cable route and consumer unit
                capacity reserved) for at least 20% of parking spaces, with at least one active
                charge point in communal areas where feasible.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart charging requirement:</strong> all new EV charge points must support
                smart charging functionality (scheduled charging, demand response) under the
                Electric Vehicles (Smart Charge Points) Regulations 2021.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="EV Charging Certificates on Elec-Mate"
          description="Generate compliant Electrical Installation Certificates for EV charge point installations directly from your phone — including load calculations and cable sizing."
          ctaText="Start your free trial"
        />
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'BS 7671 Compliance in Cambridgeshire',
    content: (
      <>
        <p>
          All electrical installations in Cambridgeshire must comply with BS 7671:2018+A3:2024 (the
          18th Edition Wiring Regulations). Key requirements relevant to Cambridgeshire
          installations include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 411.3.3</strong> — all circuits supplying socket outlets in
                domestic premises must be protected by 30mA RCD. Modern split-load or fully
                RCD-protected consumer units are standard for new and replacement installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 705</strong> — agricultural and horticultural premises have specific
                requirements for wiring systems, IP ratings, and equipotential bonding. A
                supplementary equipotential bonding zone must be established in locations accessible
                to livestock.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 525</strong> — voltage drop in supply cables must not exceed 3%
                for lighting or 5% for power under normal conditions. For long fenland cable runs
                this requires careful calculation and upsizing.
              </span>
            </li>
          </ul>
        </div>
        <p>
          See our{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            EICR observation codes guide
          </SEOInternalLink>{' '}
          for information on common compliance defects found during periodic inspection.
        </p>
      </>
    ),
  },
  {
    id: 'certificates',
    heading: 'Certification Requirements',
    content: (
      <>
        <p>
          Every qualifying electrical installation in Cambridgeshire must be accompanied by the
          correct certification. Elec-Mate makes it straightforward for electricians to generate
          compliant certificates on-site.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Installation Certificate (EIC)</strong> — required for all new
                circuits, consumer unit replacements, and new installations. Must include test
                results (insulation resistance, continuity, loop impedance, RCD test times).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minor Works Certificate (MWC)</strong> — for additions and alterations to
                existing circuits (adding a socket, extending a lighting circuit). Does not cover
                new circuits or consumer unit replacements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Installation Condition Report (EICR)</strong> — periodic
                inspection required every 5 years for rented properties and every 10 years (or on
                change of occupancy) for owner-occupied homes.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Generate Certificates Instantly with Elec-Mate"
          description="Issue EICs, MWCs, and EICRs from your phone. Share with clients by PDF or email — no desktop required."
          ctaText="Try Elec-Mate free"
        />
      </>
    ),
  },
];

export default function ElectricianCambridgeshirePage() {
  return (
    <GuideTemplate
      title="Electrician Cambridgeshire — Find Registered Electricians Near You"
      description="Find NICEIC, ELECSA, and NAPIT-registered electricians across Cambridgeshire including Cambridge, Peterborough, Ely, St Ives, March, Huntingdon, and Wisbech. Part P compliant, fully insured."
      datePublished="2024-06-01"
      dateModified="2026-04-11"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Location Guide"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician Cambridgeshire{' '}
          <span className="text-yellow-400">— Find Registered Electricians</span>
        </>
      }
      heroSubtitle="Registered electricians across Cambridgeshire covering Cambridge, Peterborough, Ely, St Ives, March, Huntingdon, Wisbech, and the Fenland district. All work certified to BS 7671."
      readingTime={7}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Cambridgeshire Electrician — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Find a Cambridgeshire Electrician Today"
      ctaSubheading="Browse NICEIC and ELECSA-registered electricians across Cambridgeshire. All work covered by Part P certification and public liability insurance."
    />
  );
}
