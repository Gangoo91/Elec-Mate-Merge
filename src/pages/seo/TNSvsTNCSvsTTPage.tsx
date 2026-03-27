import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  Zap,
  Calculator,
  FileCheck2,
  ClipboardCheck,
  GraduationCap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Earthing Systems', href: '/guides/earthing-systems-tns-tncs-tt-explained' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'tns', label: 'TN-S System' },
  { id: 'tncs', label: 'TN-C-S System (PME)' },
  { id: 'tt', label: 'TT System' },
  { id: 'zs-differences', label: 'Zs Differences Between Systems' },
  { id: 'pme-risks', label: 'PME Risks and Regulation 8 ESQCR' },
  { id: 'identifying-system', label: 'Identifying the Earthing System' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The UK uses three earthing systems: TN-S (separate neutral and earth throughout), TN-C-S (combined neutral and earth in the supply network, separated at the installation — known as PME), and TT (earth via a local earth electrode, no metallic connection to the supply network earth).',
  'TN-C-S (PME) is the most common system in new UK properties. The DNO provides a combined PEN conductor which is split into separate neutral and earth at the meter position. Typical Ze is 0.20Ω to 0.35Ω.',
  'TT systems require an earth electrode at the installation. Prospective earth fault current is much lower than TN systems — earth fault loop impedance (Zs) is typically 20–200Ω, making MCB-only protection inadequate. RCD protection is mandatory for all circuits.',
  'PME carries a specific risk: if the PEN conductor breaks, the metallic casing of connected equipment can rise to near line voltage. Regulation 8 of the Electricity Safety, Quality and Continuity Regulations 2002 governs PME connections.',
  'Identifying the earthing system before working on any installation is mandatory. Connecting TT installation equipment to a PME earth, or failing to provide RCD protection on a TT system, can create dangerous fault conditions.',
];

const faqs = [
  {
    question: 'What is the difference between TN-S and TN-C-S earthing systems?',
    answer:
      'In a TN-S system, the neutral conductor (N) and the protective earth conductor (PE) are separate throughout the entire supply network — from the transformer to the installation. The earth is made at the transformer star point and a separate earth conductor runs through the supply cables to the installation. TN-S was common in older UK installations, particularly those supplied by lead-sheathed cables where the lead sheath served as the earth conductor. In a TN-C-S system, the neutral and earth are combined into a single PEN (Protective Earth and Neutral) conductor in the supply network, but separated at the supply intake into separate N and PE conductors. This is called PME — Protective Multiple Earthing. TN-C-S is the standard system for most new UK domestic and commercial installations.',
  },
  {
    question: 'What is PME and what are the risks?',
    answer:
      'PME (Protective Multiple Earthing) is the common name for a TN-C-S supply. The DNO combines the neutral and earth in the supply network (PEN conductor) and makes multiple connections between this conductor and the earth along the distribution network. At the installation, the PEN conductor is split into separate neutral and earth at the cut-out. The risk of PME is that if the PEN conductor breaks between the transformer and the installation, the neutral is lost. The metallic casing of appliances connected to the PME earth can then rise to near line voltage (230V) relative to true earth. This is particularly dangerous in caravan parks, marinas, and agricultural premises where people may be in contact with earth and metal structures simultaneously.',
  },
  {
    question: 'When would a TT earthing system be found?',
    answer:
      'A TT earthing system is found where no metallic earth path is available from the DNO — typically in rural areas supplied by overhead lines with no earth conductor, older rural supplies, agricultural premises, caravan parks, marinas, and some older urban installations. In a TT system, the installation earth is provided by a local earth electrode (typically a copper-clad steel rod). The earth fault loop impedance (Zs) is typically 20Ω to 200Ω because current must flow through the soil to return to the transformer. This means overcurrent devices alone cannot provide adequate protection, and RCD protection is mandatory under BS 7671 Regulation 411.5.3.',
  },
  {
    question: 'What are typical Zs values for TN-S, TN-C-S, and TT systems?',
    answer:
      'Earth fault loop impedance (Zs) varies significantly between the three earthing systems. For TN-C-S (PME), typical Ze is 0.20Ω to 0.35Ω, giving total Zs values of 0.4Ω to 1.0Ω for most circuits — well within the limits for Type B MCBs. For TN-S, Ze is typically 0.35Ω to 0.8Ω. For TT systems, Ze is typically 20Ω to 200Ω, making it impossible for MCBs alone to disconnect within the required time. BS 7671 Table 41.1 gives maximum Zs values: for a 32A Type B MCB at 0.4s disconnection, maximum Zs is 1.44Ω. A TT installation with Zs of 50Ω cannot achieve this — RCD protection is therefore mandatory.',
  },
  {
    question: 'Can I use PME earth for an outbuilding, caravan, or marina?',
    answer:
      'Generally no. BS 7671 Section 708 (marinas), Section 721 (caravans and motor caravans), and Section 722 (caravan parks) specifically address this. Where there is an increased risk of contact with true earth potential — for example, in a caravan park where occupants may stand on the ground while touching metal equipment — connecting the PME earth creates a risk of electrocution if the PEN conductor breaks. In these situations, either the PME earth must be abandoned and a local TT earth electrode installed, or appropriate additional protection must be provided. For agricultural premises (BS 7671 Section 705), the same considerations apply.',
  },
  {
    question: 'How do I identify whether a property has TN-S, TN-C-S, or TT earthing?',
    answer:
      'Identification requires a combination of visual inspection and measurement. For TN-C-S (PME): look for a brown or grey earth lead connected to the cut-out neutral terminal — the combined PEN termination. The DNO will confirm if the supply is PME. For TN-S: the earth terminal on the cut-out is separate from the neutral, with the earth connected to the cable sheath or a separate earth conductor. Measure Ze — values below 0.5Ω are typical of TN systems. For TT: no earth terminal on the cut-out; the installation has its own earth electrode connected to the MET. Measure Ze — values above 10Ω indicate TT. Check for RCD protection on all circuits.',
  },
  {
    question: 'What does Regulation 8 of the ESQCR 2002 require for PME?',
    answer:
      'Regulation 8 of the Electricity Safety, Quality and Continuity Regulations 2002 requires that a DNO must not connect a PME earth terminal to an installation unless the owner or occupier has given written consent. The regulation also prohibits PME connections in certain situations — including where the supply is by overhead line to premises in agricultural or horticultural use. The ESQCR 2002 governs the DNO\'s responsibilities for the distribution network, including the safety of earthing arrangements. Electricians working on installations with PME supplies should ensure the supply agreement is in place and that any deviation (such as converting to TT) is properly documented and tested.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Calculate cable sizes with earth fault loop impedance checks for TN and TT systems.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Record earthing system details, Ze measurements, and MET information on EIC certificates.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'Full guide to BS 7671:2018+A3:2024 including earthing and bonding requirements.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'Study earthing system identification and Ze measurement for C&G 2391.',
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
    heading: 'UK Earthing Systems Explained: TN-S, TN-C-S, and TT',
    content: (
      <>
        <p>
          Every electrical installation in the UK operates within one of three earthing systems:
          TN-S, TN-C-S (commonly called PME), or TT. The earthing system determines how fault
          current returns to the source, what earth fault loop impedance (Zs) values can be
          achieved, what protective devices are required, and what additional risks must be managed.
        </p>
        <p>
          Identifying the earthing system before commencing any electrical work is a fundamental
          requirement.{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          Chapter 41 sets out the disconnection time requirements for each system, and the choice
          of earthing system directly affects whether those requirements can be met. The statutory
          framework is provided by the Electricity Safety, Quality and Continuity Regulations 2002
          (ESQCR 2002), particularly Regulation 8 for PME supplies.
        </p>
      </>
    ),
  },
  {
    id: 'tns',
    heading: 'TN-S Earthing System',
    content: (
      <>
        <p>
          In a TN-S (Terra Neutral Separate) system, the neutral and protective earth conductors
          are separate throughout the entire system — from the transformer star point to the
          installation. The earth connection is made at the transformer, and a dedicated earth
          conductor (often the metal sheath of the supply cable) runs to the installation.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-base mb-3">TN-S Characteristics</h3>
          <ul className="space-y-2 text-white text-sm">
            <li>• Earth provided by DNO via separate conductor or cable sheath</li>
            <li>• Typical Ze: 0.35Ω to 0.80Ω</li>
            <li>• Low Zs values achievable — MCB protection adequate for most circuits</li>
            <li>• Common in older UK installations (pre-1970s), lead-sheathed cable areas</li>
            <li>• No risk of lost neutral raising earth potential (unlike PME)</li>
            <li>• Earth conductor must NOT be combined with the neutral anywhere in the installation</li>
          </ul>
        </div>
        <p>
          TN-S supplies are becoming less common as ageing lead-sheathed cable networks are
          replaced. Where the lead sheath is the earth conductor, deterioration of the sheath
          can increase Ze. Always measure Ze at the supply intake before commencing installation
          work, and record it on the EIC or EICR.
        </p>
      </>
    ),
  },
  {
    id: 'tncs',
    heading: 'TN-C-S Earthing System (PME)',
    content: (
      <>
        <p>
          TN-C-S (Terra Neutral Combined-Separated) is the standard earthing system for most new
          UK domestic and commercial installations. It is universally known as PME (Protective
          Multiple Earthing). In the supply network, the neutral and earth are combined into a
          single PEN (Protective Earth and Neutral) conductor. At the supply cut-out or meter
          position, the PEN conductor is split into separate neutral (N) and protective earth (PE)
          conductors for the installation.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-base mb-3">TN-C-S (PME) Characteristics</h3>
          <ul className="space-y-2 text-white text-sm">
            <li>• Earth provided by DNO PEN conductor, split at cut-out</li>
            <li>• Typical Ze: 0.20Ω to 0.35Ω — lowest of the three systems</li>
            <li>• Very low Zs values — fast fault disconnection with MCBs</li>
            <li>• Most common system in UK properties built after 1970</li>
            <li>• Multiple earth connections along the supply network improve fault path</li>
            <li>• <strong>PME risk:</strong> PEN conductor break can raise earth to line voltage</li>
          </ul>
        </div>
        <p>
          The combined neutral and earth in the supply network is why PME provides lower Ze than
          TN-S — the multiple earth connections along the distribution network create additional
          parallel fault current paths, reducing the total impedance.
        </p>
        <SEOAppBridge
          title="Record earthing system details on your certificates"
          description="Elec-Mate's EIC and EICR certificate apps include fields for earthing system type, Ze measurement, MET details, and supplementary bonding. Complete compliant certificates on site."
          icon={ShieldCheck}
        />
      </>
    ),
  },
  {
    id: 'tt',
    heading: 'TT Earthing System',
    content: (
      <>
        <p>
          In a TT (Terra Terra) system, the installation earth is provided entirely by a local
          earth electrode — there is no metallic connection to the supply network earth. Fault
          current must flow through the soil from the installation earth electrode back to the
          transformer earth. This high-resistance path results in much higher earth fault loop
          impedance than TN systems.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
            <div>
              <p className="font-bold text-white mb-2">TT System: RCD Protection is Mandatory</p>
              <ul className="space-y-1 text-white text-sm">
                <li>• Typical Ze: 20Ω to 200Ω (or higher in dry or rocky soil)</li>
                <li>• MCBs alone CANNOT provide adequate protection — Zs too high for required disconnection time</li>
                <li>• All circuits must be RCD protected (BS 7671 Regulation 411.5.3)</li>
                <li>• Earth electrode resistance must satisfy Ra × IΔn ≤ 50V</li>
                <li>• No PME risk — lost neutral does not raise earth potential</li>
                <li>• Typical locations: rural overhead supplies, older urban properties, agricultural premises, caravan parks, marinas</li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          BS 7671 Regulation 411.5.3 requires that in a TT system, a residual current device must
          be provided for circuits where the earth fault loop impedance is too high for an
          overcurrent device to disconnect within the required time. The RCD must have a rated
          residual operating current such that Ra × IΔn ≤ 50V, where Ra is the resistance of the
          earth electrode and associated earth conductor.
        </p>
      </>
    ),
  },
  {
    id: 'zs-differences',
    heading: 'Earth Fault Loop Impedance (Zs) Differences Between Systems',
    content: (
      <>
        <p>
          The earth fault loop impedance (Zs) is the total impedance of the fault current path:
          from the source, through the line conductor, through the fault, and back through the
          earth conductor to the source. A lower Zs means more fault current flows, enabling
          faster disconnection by the protective device.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <table className="w-full text-white text-sm">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-2 pr-4 font-bold">System</th>
                <th className="text-left py-2 pr-4 font-bold">Typical Ze</th>
                <th className="text-left py-2 font-bold">Protection Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4">TN-C-S (PME)</td>
                <td className="py-2 pr-4">0.20–0.35Ω</td>
                <td className="py-2 text-green-400">MCB + optional RCD</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4">TN-S</td>
                <td className="py-2 pr-4">0.35–0.80Ω</td>
                <td className="py-2 text-green-400">MCB + optional RCD</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">TT</td>
                <td className="py-2 pr-4">20–200Ω+</td>
                <td className="py-2 text-red-400">RCD mandatory</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          BS 7671 Table 41.1 provides maximum Zs values for different protective devices and
          disconnection times. For a 32A Type B MCB with 0.4s disconnection (residential
          circuits), maximum Zs is 1.44Ω. Any TT installation will have Zs far exceeding this
          limit, confirming that RCD protection is a legal requirement, not an option.
        </p>
      </>
    ),
  },
  {
    id: 'pme-risks',
    heading: 'PME Risks and Regulation 8 of the ESQCR 2002',
    content: (
      <>
        <p>
          PME (TN-C-S) carries a specific risk that does not exist in TN-S or TT systems: if the
          PEN conductor breaks between the transformer and the installation, the neutral at the
          installation is lost but the earth terminal remains connected to all metal parts. When
          the neutral is lost, the return current must flow through the earth conductor — and the
          full line voltage can appear on metal enclosures.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Caravan parks and marinas (BS 7671 Sections 708 and 721):</strong> Where
                occupants may stand on the ground while touching metal equipment, a PME earth
                fault is particularly dangerous. These installations must use a TT earth system
                — not PME earth.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charging equipment (BS 7671 Section 722):</strong> Many EV charger
                manufacturers specify additional protection (e.g. a combined N and PE monitoring
                device) when connected to a PME supply to address the PEN conductor break risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outbuildings and external structures:</strong> Where a detached structure
                is also connected to metal structures in contact with the general mass of earth
                (e.g. a greenhouse with metal poles driven into the ground), the PME risk is
                elevated. Consider TT earthing for outbuildings.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Regulation 8 of the Electricity Safety, Quality and Continuity Regulations 2002 requires
          that a DNO must not connect a PME earth terminal to an installation unless the owner or
          occupier has given written consent, and prohibits PME connections to certain categories
          of installation including those supplied by overhead line to agricultural premises.
        </p>
      </>
    ),
  },
  {
    id: 'identifying-system',
    heading: 'Identifying the Earthing System on Site',
    content: (
      <>
        <p>
          Before starting any electrical work, identify the earthing system. The method combines
          visual inspection at the supply intake with measurement:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>TN-C-S (PME):</strong> At the cut-out, a conductor (usually grey or brown)
                connects the neutral terminal to the MET. The meter neutral and the earth conductor
                originate from the same cut-out terminal. DNO confirmation is best practice.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>TN-S:</strong> The cut-out has a separate earth terminal, typically
                connected to the lead sheath of the supply cable or a separate earth conductor.
                The neutral and earth terminals are distinct. Measure Ze — values below 0.8Ω
                suggest TN-S.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>TT:</strong> No earth terminal on the cut-out. The installation has a
                local earth electrode (rod, tape, or plate) connected to the MET. Measure Ze —
                values above 10Ω confirm TT. Verify RCD protection on all circuits.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Record the earthing system type and measured Ze on the EIC or EICR. This information
          is required on the certificate and is essential for anyone carrying out future work
          on the installation.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Earthing Systems in Practice',
    content: (
      <>
        <p>
          Earthing system identification and Zs measurement are core competencies tested in C&G
          2391 and examined in detail during periodic inspection work. Misidentifying the earthing
          system can lead to incorrect protective device selection, inadequate fault protection,
          and dangerous installations.
        </p>
        <SEOAppBridge
          title="Record earthing details on EIC and EICR certificates"
          description="Elec-Mate's EIC and EICR apps include fields for earthing system type, Ze, Ra (earth electrode resistance), and supplementary bonding details. Record everything correctly on site and generate professional PDF certificates instantly."
          icon={Zap}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function TNSvsTNCSvsTTPage() {
  return (
    <GuideTemplate
      title="Earthing Systems Explained: TN-S, TN-C-S and TT | UK Guide"
      description="Complete guide to UK earthing systems: TN-S, TN-C-S (PME) and TT. Zs differences, PME risks, Regulation 8 of the ESQCR 2002, when each system is used, and how to identify the earthing system on site."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Earthing Systems Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Earthing Systems Explained:{' '}
          <span className="text-yellow-400">TN-S, TN-C-S and TT for UK Electricians</span>
        </>
      }
      heroSubtitle="The earthing system determines fault protection, Zs values, RCD requirements, and PME risks. This guide explains TN-S, TN-C-S (PME), and TT systems, the Regulation 8 ESQCR 2002 requirements, and how to identify each system on site."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions: Earthing Systems"
      relatedPages={relatedPages}
      ctaHeading="Complete Earthing and Bonding Details on Your Certificates"
      ctaSubheading="Elec-Mate's EIC and EICR apps capture earthing system type, Ze measurements, and earth electrode details. 7-day free trial, cancel anytime."
    />
  );
}
