import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  ShieldCheck,
  AlertTriangle,
  Home,
  ClipboardCheck,
  Building2,
  Clock,
  Zap,
  Users,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'EICR Guides', href: '/guides/eicr-for-landlords' },
  { label: 'EICR Frequency Guide', href: '/eicr-frequency-guide' },
];

const tocItems = [
  { id: 'frequency-overview', label: 'EICR Frequency at a Glance' },
  { id: 'domestic-owner-occupied', label: 'Domestic Owner-Occupied' },
  { id: 'rental-properties', label: 'Rental Properties' },
  { id: 'hmo-frequency', label: 'HMOs' },
  { id: 'commercial', label: 'Commercial Properties' },
  { id: 'specialist-installations', label: 'Specialist Installations' },
  { id: 'when-sooner', label: 'When to Get One Sooner' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Domestic owner-occupied properties: EICR recommended every 10 years or at change of occupancy under IET guidance and BS 7671 Section 634.',
  'Private rental properties: EICR legally required at least every five years or at change of tenancy — whichever is sooner — under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020.',
  'HMOs: five-year maximum under the 2020 Regulations, but many local authority licence conditions require every three years.',
  'Commercial properties: typically every three to five years depending on the type of installation and occupancy — consult BS 7671 Table 62 for guidance.',
  'Swimming pools and caravan parks: every year under BS 7671 because of the elevated risk from water ingress and the transient nature of users.',
  'Certain circumstances require an EICR sooner than the standard interval: buying an old property, suspected flood or storm damage, after major building works, or when moving into a property with no recent electrical records.',
];

const faqs = [
  {
    question: 'How often do rental properties legally need an EICR?',
    answer:
      'Under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, all private rented properties in England must have an EICR at least every five years, or at every change of tenancy if sooner. If the EICR is carried out two years into a tenancy and gives a recommended reinspection interval of five years, the next EICR is due in five years — not three years hence. Some local authorities impose shorter intervals for licensed HMOs: check your specific licence conditions.',
  },
  {
    question: 'How often should an owner-occupied home have an EICR?',
    answer:
      'There is no legal requirement for owner-occupiers to obtain an EICR at any specific interval. The recommended interval from the IET and BS 7671 Section 634 is every 10 years for a domestic installation, or at change of occupancy. For older properties (pre-1970), many electricians recommend an inspection every five years as the wiring approaches end of service life.',
  },
  {
    question: 'What is the EICR frequency for commercial properties?',
    answer:
      'Commercial property EICR frequency depends on the type of installation and the degree of use. BS 7671 Table 62 provides guidance: offices and shops — every five years; industrial premises — every three years; educational establishments — every five years; places of public entertainment — every three years; hospitals — every five years for general areas, more frequently for operating theatres and similar. The EICR inspector will specify the recommended reinspection interval on the report itself.',
  },
  {
    question: 'Why do swimming pools need an annual EICR?',
    answer:
      'Swimming pools and their surrounding areas are classified as Special Locations under BS 7671 Section 702. The combination of water, humid air, chlorine, and high pedestrian traffic creates a significantly elevated risk of electric shock and accelerated insulation degradation. BS 7671 recommends annual inspection and testing for swimming pool electrical installations. Annual inspections allow inspectors to catch corrosion, insulation breakdown, and earthing degradation before they become dangerous.',
  },
  {
    question: 'What is the EICR frequency for a caravan park?',
    answer:
      'Caravan parks fall under BS 7671 Section 708 (Electrical Installations in Caravan Parks and Motorhome Parks). The recommended inspection interval is annually. The outdoor distribution systems, socket outlet pedestals, and wiring routes are exposed to weather, physical damage from vehicles, and ground movement — all of which can degrade the installation rapidly. Annual inspections are strongly recommended regardless of local authority requirements.',
  },
  {
    question: 'Do I need an EICR when I buy a house?',
    answer:
      'There is no legal obligation on buyers or sellers to obtain an EICR as part of a property sale. However, it is strongly recommended — particularly for properties built before 1990. A pre-purchase EICR identifies the condition of the wiring before you complete the purchase, giving you the opportunity to negotiate on price if significant remedial work is needed. Many mortgage lenders and insurers now recommend or require an EICR for older properties.',
  },
  {
    question: 'Can the EICR inspector specify a shorter reinspection interval than the standard?',
    answer:
      'Yes. The EICR inspector records a recommended reinspection interval on the report itself. This is their professional judgement based on the age, condition, and type of installation. A standard modern installation may carry a five-year recommendation; an older installation in good but ageing condition may carry a three-year recommendation. As a landlord or property owner, you are obliged to follow the shorter interval specified on the report — you cannot simply default to the maximum permitted interval.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/eicr-for-hmo',
    title: 'EICR for HMO Properties',
    description: 'Mandatory EICR requirements, common C2 codes, and remediation costs for HMOs.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Complete guide to landlord EICR requirements, compliance deadlines, and penalties.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/eicr-remediation',
    title: 'EICR Remediation Work',
    description: 'Understanding C1, C2, C3 and FI codes and what remedial work is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/eicr-tenant-rights',
    title: 'Tenant Rights for EICR',
    description: "Tenants' rights to electrical safety records and how to enforce them.",
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'frequency-overview',
    heading: 'EICR Frequency at a Glance',
    content: (
      <>
        <p>
          The required or recommended frequency for an Electrical Installation Condition Report
          (EICR) varies depending on the type of property and how it is used. The table below
          summarises the key intervals. Note that these are the maximum intervals — the EICR
          inspector may specify a shorter reinspection interval on the report itself, and that
          shorter interval takes precedence.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Domestic owner-occupied</strong> — every 10 years (recommended, not legally
                required). Change of occupancy also triggers a recommended inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Private rental properties</strong> — every 5 years or at change of tenancy,
                whichever is sooner (legally required under the Electrical Safety Standards
                Regulations 2020).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMOs</strong> — every 5 years under the 2020 Regulations; many local
                authority HMO licence conditions require every 3 years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial (offices, shops)</strong> — every 5 years recommended under BS
                7671 Table 62 guidance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial (industrial, public entertainment)</strong> — every 3 years
                recommended.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Swimming pools</strong> — every 1 year under BS 7671 Section 702 guidance
                (Special Location).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Caravan parks</strong> — every 1 year under BS 7671 Section 708 guidance.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These intervals are the maximum recommended or legally required periods. Factors such as
          the age of the installation, the type of wiring, and the inspector's findings can all lead
          to a shorter recommended interval being recorded on the report.
        </p>
      </>
    ),
  },
  {
    id: 'domestic-owner-occupied',
    heading: 'Domestic Owner-Occupied Properties',
    content: (
      <>
        <p>
          For owner-occupied domestic properties, there is no legal obligation to obtain an EICR at
          any specific interval. The legal requirements under the Electrical Safety Standards
          Regulations 2020 apply only to the private rented sector. However, the IET (Institution of
          Engineering and Technology) and BS 7671 Section 634 recommend periodic inspection and
          testing.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Every 10 years</strong> — the IET's recommended interval for a domestic
                owner-occupied property with a modern installation in good condition. After 10
                years, enough time has elapsed for insulation to begin degrading, connections to
                loosen, and for additions to have been made to the installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>At change of occupancy</strong> — when selling or buying a property, it is
                strongly recommended that an EICR is obtained. For buyers, this provides assurance
                about the electrical installation before completion. For sellers, it can prevent
                late-stage renegotiation if a buyer's surveyor flags electrical concerns.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pre-1970 properties: consider every 5 years</strong> — properties with
                rubber-insulated wiring (pre-1970) or aluminium wiring degrade more rapidly. For
                these properties, a five-year inspection interval is prudent even for
                owner-occupiers.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rental-properties',
    heading: 'Private Rental Properties',
    content: (
      <>
        <p>
          Private rental properties in England are covered by the Electrical Safety Standards in the
          Private Rented Sector (England) Regulations 2020. These regulations impose a legal maximum
          interval of five years between EICRs. The regulations also require an EICR at every change
          of tenancy — so if a tenancy ends after two years, the landlord must obtain a new EICR
          before the next tenancy begins if the existing EICR is more than five years old. If the
          existing EICR is still in date, a new one is not required at change of tenancy, but one
          must be due within five years of the last inspection.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Every 5 years maximum</strong> — the absolute legal maximum under the 2020
                Regulations. This applies to assured shorthold tenancies, assured tenancies, and
                regulated tenancies in England.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>At change of tenancy</strong> — an EICR must be in place before a new
                tenancy starts. If the current EICR is still in date (less than five years old and
                with no shorter reinspection interval specified), it can cover the new tenancy. The
                new tenant must receive a copy before moving in.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sooner if specified by the inspector</strong> — if the EICR records a
                recommended reinspection interval shorter than five years (e.g., three years due to
                the age of the installation), the landlord must comply with that shorter interval.
                The legal five-year maximum is a ceiling, not a guaranteed period.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Scotland has its own legislation: the Housing (Scotland) Act 2006 and associated Private
          Residential Tenancy regime require EICRs every five years for private rented properties.
          Wales and Northern Ireland have separate requirements. This guide covers England only.
        </p>
      </>
    ),
  },
  {
    id: 'hmo-frequency',
    heading: 'Houses in Multiple Occupation (HMOs)',
    content: (
      <>
        <p>
          HMOs are covered by the same five-year maximum under the 2020 Regulations as standard
          rental properties. However, HMO licences imposed by local authorities frequently specify a
          three-year EICR interval as a licence condition. Always read your specific licence
          conditions — the licence condition overrides the general five-year maximum if it specifies
          a shorter period.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard HMOs</strong> — five years under the 2020 Regulations (same as all
                private rental properties).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Licensed HMOs in many London boroughs</strong> — three years. Boroughs
                including Newham, Tower Hamlets, Camden, Hackney, and others specify three years in
                their HMO licence conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Why the shorter interval?</strong> — HMOs have higher electrical demand than
                single-family homes, are more likely to have had modifications made by multiple
                tenants over time, and have greater fire risk due to the number of occupants. More
                frequent inspection catches deterioration earlier.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For more detail on HMO-specific EICR requirements, see our full guide to{' '}
          <SEOInternalLink href="/eicr-for-hmo">EICR for HMO Properties</SEOInternalLink>.
        </p>
      </>
    ),
  },
  {
    id: 'commercial',
    heading: 'Commercial Properties',
    content: (
      <>
        <p>
          Commercial property EICRs are not covered by the 2020 Regulations (which apply to
          residential private rented properties). However, employers have duties under the
          Electricity at Work Regulations 1989 to maintain electrical installations in a safe
          condition. The Regulations require regular inspection and testing, and BS 7671 Table 62
          provides guidance on recommended maximum intervals.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Offices and shops</strong> — five years recommended under BS 7671 guidance.
                Modern, well-maintained office installations rarely deteriorate rapidly, making five
                years a reasonable interval.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Industrial premises</strong> — three years. Industrial environments expose
                wiring to mechanical damage, vibration, and chemical attack. More frequent
                inspection is necessary to catch deterioration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Places of public entertainment</strong> — three years. Frequent
                modifications to temporary installations, high power loads from audio and lighting
                equipment, and high pedestrian traffic all increase risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Educational establishments</strong> — five years. Science laboratories and
                workshops may have more frequent requirements depending on the equipment installed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hospitals and medical facilities</strong> — five years for general areas;
                shorter for specialist medical areas (operating theatres, ITUs) where the risk
                assessment requires it. Medical electrical equipment has its own testing regime
                under BS EN 62353.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'specialist-installations',
    heading: 'Specialist Installations: Swimming Pools and Caravan Parks',
    content: (
      <>
        <p>
          Certain types of installation are classified as Special Locations or Special Installations
          under BS 7671 and require much more frequent inspection because of the elevated risk of
          electric shock or accelerated deterioration.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Swimming pools and paddling pools (BS 7671 Section 702)</strong> — annual
                inspection recommended. The combination of water, chlorine, and humid air causes
                rapid deterioration of insulation and connections. Annual inspection is the minimum
                prudent interval for commercial pools; domestic pools should also be inspected
                annually.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Caravan parks and motorhome parks (BS 7671 Section 708)</strong> — annual
                inspection recommended. Outdoor distribution systems, socket outlet pedestals, and
                underground cables are exposed to weather, frost heave, and physical damage from
                vehicles. Transient users also mean that damage can go unreported.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Agricultural premises (BS 7671 Section 705)</strong> — three years
                recommended. Agricultural environments expose electrical installations to moisture,
                dust, vermin, and corrosive atmospheres. More frequent inspection is often
                appropriate for higher-risk areas such as dairies.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Marinas (BS 7671 Section 709)</strong> — annual inspection recommended for
                shore connections and pontoon distribution. The saltwater environment and the
                connection of boat electrical systems create particular corrosion and earth leakage
                risks.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'when-sooner',
    heading: 'When Should You Get an EICR Sooner Than the Standard Interval?',
    content: (
      <>
        <p>
          Even if the last EICR is still technically in date, certain circumstances should trigger
          an earlier inspection. Waiting until the five or ten-year deadline is inappropriate when
          there is reason to suspect the installation has been damaged or compromised.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Buying an older property</strong> — always commission an EICR before or
                immediately after purchasing a property built before 1990. Rubber-insulated wiring
                (TRS or VIR), aluminium conductors, and old-style consumer units without RCD
                protection are all common in older properties and pose real risks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>After a flood</strong> — water ingress into an electrical installation can
                cause corrosion, insulation breakdown, and earth faults that develop slowly over
                months. After any flood affecting electrical areas, obtain an EICR before restoring
                power. Do not assume the installation is safe because it appears to have dried out.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>After major building works</strong> — extensions, loft conversions, and
                kitchen refits often involve modifications to the electrical installation. Even if
                the new work has its own Minor Works Certificate or EIC, it is good practice to
                obtain an EICR of the whole installation to ensure the new work interfaces correctly
                with the existing wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Suspected storm damage</strong> — lightning strikes near a property, or
                fallen cables on the roof, can damage the installation's earthing and surge
                protection. An EICR following suspected storm damage will identify any degradation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No recent electrical records</strong> — if you have no documentation for the
                electrical installation (no EIC, no previous EICR) and the property is more than 10
                years old, obtain an EICR regardless of when the last one may have been carried out.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Managing Client EICR Schedules',
    content: (
      <>
        <p>
          Understanding EICR frequency rules is essential for providing accurate advice to clients
          and for building a recurring inspection book. Landlord clients with multiple properties
          need an electrician who can track their inspection schedules and alert them before
          compliance lapses.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Complete and Track EICRs with Elec-Mate
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to complete inspection reports on site and store them against each property. The
                  app records the recommended reinspection date from each EICR, so you can
                  proactively remind landlord clients when their next inspection is due — before
                  they lapse into non-compliance.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Track EICR due dates for all your landlord clients"
          description="Join 1,000+ UK electricians using Elec-Mate to complete on-site EICRs and track reinspection schedules. Never let a landlord client lapse into non-compliance. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EICRFrequencyGuidePage() {
  return (
    <GuideTemplate
      title="How Often Do You Need an EICR? | EICR Frequency Guide UK"
      description="EICR frequency guide for all property types. Owner-occupied homes every 10 years, rental properties every 5 years (legally required), HMOs every 3–5 years, commercial every 3–5 years, swimming pools and caravan parks annually."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Frequency Guide"
      badgeIcon={Clock}
      heroTitle={
        <>
          How Often Do You Need an EICR?{' '}
          <span className="text-yellow-400">Complete Frequency Guide</span>
        </>
      }
      heroSubtitle="EICR frequency depends on property type and use. Rental properties need one every five years by law; owner-occupied homes every 10 years by recommendation; HMOs every three to five years; swimming pools and caravan parks every year. This guide covers all property types with the legal basis for each interval."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions: EICR Frequency"
      relatedPages={relatedPages}
      ctaHeading="Complete EICRs on Your Phone with Elec-Mate"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion. Track reinspection dates, send PDFs to landlords on site, and build a recurring inspection client base. 7-day free trial."
    />
  );
}
