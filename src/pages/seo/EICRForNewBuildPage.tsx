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
  Zap,
  Search,
  Clock,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'EICR Guides', href: '/guides/eicr-for-landlords' },
  { label: 'EICR for New Build Properties', href: '/eicr-for-new-build' },
];

const tocItems = [
  { id: 'eic-not-eicr', label: 'New Builds Get an EIC, Not an EICR' },
  { id: 'eic-vs-eicr', label: 'EIC vs EICR: Key Differences' },
  { id: 'when-first-eicr', label: 'When Is the First EICR Required?' },
  { id: 'snagging-electrical', label: 'Snagging Electrical Issues' },
  { id: 'letting-new-build', label: 'Letting a New Build Property' },
  { id: 'owner-occupied', label: 'Owner-Occupied New Builds' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'New build properties receive an Electrical Installation Certificate (EIC), not an EICR. The EIC is issued by the installing contractor and confirms the installation was built in accordance with BS 7671.',
  'An EICR is a periodic inspection of an existing installation. For new builds, the first EICR is typically due at first change of tenancy if the property is let, or after 10 years for owner-occupied properties.',
  'An EIC does not substitute for an EICR under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020. If you let a new build that already has a tenancy in place from the developer, you need an EICR within five years.',
  'Snagging electrical defects in new builds is important — installation errors, missing bonding, incorrectly sized circuit breakers, and improperly labelled circuits are all found in new build properties.',
  'The NHBC Buildmark warranty and similar new build warranties do not cover electrical safety in the same way as a periodic EICR. They are separate documents serving separate purposes.',
];

const faqs = [
  {
    question: 'Do new build properties need an EICR?',
    answer:
      'Not immediately. New builds are issued with an Electrical Installation Certificate (EIC), not an EICR. The EIC is produced at completion and certifies the installation was built to BS 7671. For owner-occupied new builds, the first EICR is recommended after 10 years. For let new build properties, the first EICR is required at the first change of tenancy or within five years of the tenancy start — whichever is sooner — under the Electrical Safety Standards Regulations 2020.',
  },
  {
    question: 'What is the difference between an EIC and an EICR?',
    answer:
      'An Electrical Installation Certificate (EIC) is issued when a new electrical installation is completed. It certifies that the installation has been designed, built, and tested in accordance with BS 7671 by the installing contractor. An Electrical Installation Condition Report (EICR) is a periodic inspection of an existing installation — it does not certify that the installation was correctly built, but assesses its current condition and safety. An EIC cannot substitute for an EICR for landlord compliance purposes.',
  },
  {
    question: 'Can I use the EIC instead of an EICR for a rented new build?',
    answer:
      'No. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require an EICR specifically. An EIC confirms the installation was correctly installed; an EICR inspects and tests an existing installation periodically. For a new build property being let for the first time, you should obtain an EICR before or at the first change of tenancy. Some landlords obtain an EICR even for a brand new property to establish a baseline and to have a document in the correct format for the regulations.',
  },
  {
    question: 'What electrical snagging issues are common in new builds?',
    answer:
      'Common electrical snagging issues in new builds include: circuit breakers not matched to cable sizes; circuits that are incorrectly labelled or unlabelled in the consumer unit; missing or incorrect protective bonding; smoke detectors not correctly interlinked; external lighting circuits wired without appropriate weatherproofing; sockets that are not correctly earthed; and RCD protection absent or incorrectly configured. These are genuine installation errors found even in properties issued with an EIC.',
  },
  {
    question: 'How long is an EIC valid for a new build?',
    answer:
      'An EIC does not expire, but it becomes less relevant over time as the installation ages and is modified. The EIC is evidence of the installation\'s condition at the time of completion. For rental purposes, you will need a periodic EICR — the EIC is simply the starting document. Keep the EIC safe as it contains the original test results which are useful for comparison when the first EICR is carried out.',
  },
  {
    question: 'When does a new build need its first EICR if I am the owner-occupier?',
    answer:
      'There is no legal requirement for an owner-occupier to obtain an EICR at any specific interval. However, the recommended interval under BS 7671 and IET guidance for a domestic owner-occupied property is every 10 years or on change of occupancy. For a new build, you should therefore aim for the first EICR around the 10-year mark, or before you sell the property or change its use.',
  },
  {
    question: 'Should I get an independent electrical check when buying a new build?',
    answer:
      'Yes. An independent snagging inspection by a qualified electrician can identify installation errors that were missed or accepted during the developer\'s own quality checks. This is particularly worthwhile because the NHBC Buildmark warranty (or similar) covers structural and building defects but relies on the developer\'s own certification for electrical installations. An independent check — carried out as a snagging inspection or a full EICR — gives you independent assurance and an actionable snagging list to present to the developer.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Complete guide to landlord EICR requirements, compliance deadlines, and penalties.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/eicr-frequency-guide',
    title: 'EICR Frequency Guide',
    description: 'How often EICRs are needed for different property types and tenancies.',
    icon: Clock,
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
    description: 'Tenants\' rights to electrical safety records and how to enforce them.',
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
    id: 'eic-not-eicr',
    heading: 'New Builds Come With an EIC, Not an EICR',
    content: (
      <>
        <p>
          When a new build property is completed, the electrical installation is certified by the
          installing contractor using an Electrical Installation Certificate (EIC). This is a
          mandatory document under BS 7671:2018+A3:2024 (the IET Wiring Regulations) and Part P of
          the Building Regulations. The EIC confirms that the installation was designed, built, and
          tested in accordance with the applicable standards at the time of completion.
        </p>
        <p>
          An EIC is not the same as an Electrical Installation Condition Report (EICR). The EIC
          is issued at the point of completion and belongs to the property. The EICR is a periodic
          inspection document issued by a different electrician assessing the installation's
          ongoing condition. Confusing the two is extremely common — and understanding the
          distinction is important for landlords, buyers, and solicitors dealing with new build
          transactions.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>EIC purpose</strong> — certifies that the installation as built meets
                BS 7671. Issued by the contractor who built the installation. Contains the
                Schedule of Inspections and Schedule of Test Results completed at installation.
                Signed by the designer, constructor, and inspector (who may be the same person).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR purpose</strong> — periodically assesses the ongoing condition of
                the installation. Carried out by an independent qualified person. Classifies
                observations as C1, C2, C3, or FI. Results in an overall assessment of
                Satisfactory or Unsatisfactory.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Landlord compliance</strong> — for the purposes of the Electrical Safety
                Standards in the Private Rented Sector (England) Regulations 2020, only an EICR
                satisfies the legal requirement. An EIC alone is not sufficient for ongoing
                compliance.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eic-vs-eicr',
    heading: 'EIC vs EICR: The Key Differences Explained',
    content: (
      <>
        <p>
          The distinction between an EIC and an EICR matters practically in several scenarios:
          when a new build property is being let for the first time; when a property is being
          sold and the buyer's solicitor requests electrical safety documentation; and when a
          landlord is trying to determine whether they are compliant with the 2020 Regulations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Who produces it</strong> — an EIC is produced by the contractor who
                installed the wiring. An EICR is produced by an independent inspector who
                inspects and tests an existing installation. For objectivity, the same person
                who installed the wiring should not carry out the periodic inspection — although
                this is not always practical in small projects.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What it tests</strong> — the EIC tests the installation at completion:
                insulation resistance, continuity, polarity, earth fault loop impedance, and
                RCD trip times are all measured. An EICR repeats these tests on a sampling basis
                to check that the installation has not deteriorated and remains compliant with
                the edition of BS 7671 current at the time of inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Observation coding</strong> — the EIC does not use C1/C2/C3/FI
                observation codes. These codes are specific to the EICR. The EIC records
                departures from BS 7671 (if any) separately. An EICR will note any departures
                from the current edition of BS 7671 even if the installation was correctly built
                to an earlier edition — this is why older installations frequently have C3
                observations for items that were compliant when installed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Frequency</strong> — an EIC is issued once, at completion. An EICR is
                issued periodically — typically every 5 years for rental properties, every 10
                years for owner-occupied homes (or at change of occupancy).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'when-first-eicr',
    heading: 'When Is the First EICR Required for a New Build?',
    content: (
      <>
        <p>
          The timing of the first EICR for a new build property depends on how the property is
          used after completion. The answer is different for rental properties and owner-occupied
          homes.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rental property — at first change of tenancy</strong> — under the
                Electrical Safety Standards Regulations 2020, an EICR must be obtained before
                a new tenancy begins and at least every five years. If you purchase a new build
                from a developer and let it for the first time, you should obtain an EICR before
                the first tenant moves in, or at the very latest within five years. If the
                property had an existing tenancy from the developer, the five-year clock is
                already running.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Owner-occupied — approximately 10 years</strong> — there is no legal
                requirement for owner-occupiers to obtain an EICR at a specific interval.
                The recommended interval under BS 7671 and IET guidance is every 10 years
                or at change of occupancy. For a new build, the first EICR is therefore
                recommended at around the 10-year mark.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>On sale of the property</strong> — although there is no legal requirement
                to produce an EICR when selling, buyers increasingly request one as part of their
                due diligence. If you have an EIC from when the property was built but no EICR,
                consider commissioning one before marketing the property, particularly if the
                installation is more than five years old.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In practice, many landlords of new build properties obtain an EICR at the outset so
          that they have a document in the correct format to provide to tenants and, if requested,
          to the local authority. The cost of an EICR on a modern, correctly installed property
          is relatively low and the peace of mind is worthwhile.
        </p>
      </>
    ),
  },
  {
    id: 'snagging-electrical',
    heading: 'Snagging Electrical Issues in New Build Properties',
    content: (
      <>
        <p>
          New builds are not immune to electrical installation errors. Developers typically use
          multiple subcontractors working under time pressure, and the quality of workmanship
          varies considerably between sites and contractors. Having a qualified electrician carry
          out an independent snagging inspection — ideally within the first two years while the
          NHBC or similar warranty is in place — can identify issues the developer must rectify
          at no cost to you.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circuit breaker and cable mismatch</strong> — the overcurrent protective
                device (circuit breaker) must be correctly matched to the cross-sectional area and
                current-carrying capacity of the cable it protects. Mismatched combinations are
                found on new build sites where materials are mixed between phases of construction.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unlabelled or incorrectly labelled circuits</strong> — consumer units
                in new builds sometimes have circuit labels that do not match the actual circuits
                connected, or are simply blank. Correct labelling is a requirement of BS 7671
                (Regulation 514.9.1).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Missing or incorrect bonding</strong> — supplementary bonding in bathrooms
                and main protective bonding to services is sometimes omitted or undersized. This
                is a common snagging item that is straightforward for the developer to rectify
                during the defects liability period.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smoke and carbon monoxide detector issues</strong> — mains-wired interlinked
                smoke detectors are required in new builds under Building Regulations Approved
                Document B. Snaggers commonly find detectors that are not correctly interlinked,
                not connected to the mains supply, or positioned incorrectly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charging point and solar PV wiring</strong> — where developers have
                installed EV charging points or solar PV as standard, the associated wiring and
                protective devices should be checked by a qualified electrician as part of the
                snagging process. Errors in these systems can be costly and potentially dangerous.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A snagging inspection is best carried out by a qualified electrician who is independent
          of the developer. Use{' '}
          <SEOInternalLink href="/tools/eicr-certificate">
            Elec-Mate's EICR and certificate tools
          </SEOInternalLink>{' '}
          to document snagging findings clearly in a format that can be presented to the developer.
        </p>
      </>
    ),
  },
  {
    id: 'letting-new-build',
    heading: 'Letting a New Build: What Landlords Need to Know',
    content: (
      <>
        <p>
          Landlords who purchase new build properties to let face a common question: does the EIC
          from the developer satisfy the EICR requirement under the 2020 Regulations? The answer
          is no. The 2020 Regulations specifically require an EICR — a periodic inspection
          document — not an installation certificate.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commission an EICR before the first tenancy</strong> — to be fully
                compliant, commission an EICR from a qualified inspector before your first tenant
                moves in. For a brand new property, a qualified electrician should be able to
                complete the inspection and produce an EICR relatively quickly as the installation
                is new and should be in good condition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Provide the EICR to the tenant</strong> — new tenants must receive a copy
                of the EICR before they move in. Existing tenants must receive a copy within 28
                days of the inspection. The EIC from the developer is not an acceptable substitute.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Retain the original EIC</strong> — keep the EIC from the developer as
                it contains the original test results. When the EICR inspector carries out the
                periodic inspection, they can compare current test results with the original EIC
                to identify any deterioration. This comparison is valuable for detecting
                progressive insulation degradation or earthing problems.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'owner-occupied',
    heading: 'Owner-Occupied New Builds: When to Get Your First EICR',
    content: (
      <>
        <p>
          Owner-occupiers of new build properties are not covered by the 2020 Regulations (which
          apply to the private rented sector). There is therefore no legal deadline for the first
          EICR. However, the recommended interval from BS 7671 and the IET is every 10 years for
          a domestic owner-occupied property.
        </p>
        <p>
          In practice, the first EICR on a new build is often prompted by one of the following:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Selling the property</strong> — buyers' solicitors and surveyors
                increasingly request an EICR as part of due diligence, particularly for properties
                over five years old. Having one ready can speed up the conveyancing process.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Changing the property's use</strong> — converting an owner-occupied new
                build to a rental property triggers the 2020 Regulations. An EICR is required
                before the first tenant moves in.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Major electrical additions</strong> — adding solar PV, an EV charging
                point, or a home extension creates new circuits that should be tested. Whilst the
                new circuits will have their own EIC, it is often prudent to have a full EICR at
                this point to ensure the main installation remains in good condition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>After 10 years</strong> — as a matter of good practice, aim for the first
                EICR around the 10-year mark even without any specific trigger.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: New Build Snagging and EICR Work',
    content: (
      <>
        <p>
          New build snagging and first-EICR work for buy-to-let investors is a growing market.
          Portfolio landlords who purchase new build properties from developers need reliable
          electricians who understand the difference between an EIC and an EICR, and who can
          produce compliant documentation efficiently.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Produce EICR and EIC Documentation on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to complete both EICR and EIC documentation on your phone. For snagging
                  inspections, the app lets you photograph defects, record observations with
                  C-code classification, and export a professional PDF report the developer
                  and landlord can act on immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Produce EICR and EIC reports on site with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for on-site certificate completion. EICR, EIC, and minor works certificates — all on your phone with AI assistance and instant PDF export. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EICRForNewBuildPage() {
  return (
    <GuideTemplate
      title="EICR for New Build Properties UK | Do New Builds Need an EICR?"
      description="New builds receive an EIC, not an EICR. Find out when new build properties need their first EICR, the difference between an EIC and an EICR, electrical snagging issues, and landlord obligations for letting a new build."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="New Build Guide"
      badgeIcon={Building2}
      heroTitle={
        <>
          EICR for New Build Properties:{' '}
          <span className="text-yellow-400">EIC vs EICR Explained</span>
        </>
      }
      heroSubtitle="New build properties come with an Electrical Installation Certificate — not an EICR. This guide explains the difference between the two documents, when the first EICR is needed, how to snag electrical defects in new builds, and what landlords renting out new builds must do to comply with the 2020 Regulations."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions: EICR for New Builds"
      relatedPages={relatedPages}
      ctaHeading="Complete EICRs and EICs on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site certificate production. EICR, EIC, and snagging reports — all on your phone with AI assistance and instant PDF export. 7-day free trial."
    />
  );
}
