import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  Calculator,
  Stethoscope,
  Zap,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Wrench,
  Building2,
  Activity,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Dental Surgery Electrical Cost', href: '/guides/dental-surgery-electrical-cost' },
];

const tocItems = [
  { id: 'overview', label: 'Dental Surgery Electrical Overview' },
  { id: 'section-710', label: 'Section 710: Medical Locations' },
  { id: 'dental-chair', label: 'Dental Chair Supply and Equipment' },
  { id: 'xray-compressor', label: 'X-Ray, Compressor, and Steriliser' },
  { id: 'cost-breakdown', label: 'Cost Breakdown by Surgery Size' },
  { id: 'regulations', label: 'Regulations and Compliance' },
  { id: 'for-electricians', label: 'For Electricians: Quoting Dental Work' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Dental surgery electrical installation costs £8,000 to £25,000 in 2026 depending on the number of surgeries, X-ray equipment, compressor and suction requirements, and whether Section 710 medical location provisions apply.',
  'Section 710 of BS 7671:2018+A3:2024 applies to dental surgeries. Group 1 medical locations (which includes dental treatment rooms) require additional protective measures including supplementary equipotential bonding and RCD protection.',
  'Each dental chair requires a dedicated electrical supply — typically 2 to 4 socket outlets plus a hardwired connection for the chair unit itself, which may draw 1 to 3kW depending on specification.',
  'X-ray equipment (OPG, intraoral, and CBCT) has specific electrical requirements including dedicated circuits, stable voltage supply, and radiation shielding considerations that affect cable routing.',
  'Dental compressors (1.5 to 5kW) and suction units (1 to 3kW) require dedicated circuits, vibration mounting, and are typically located in a plant room with appropriate ventilation.',
];

const faqs = [
  {
    question: 'How much does dental surgery electrical installation cost in 2026?',
    answer:
      'Dental surgery electrical installation costs £8,000 to £25,000 in 2026. A single-surgery dental practice with one treatment room, decontamination room, and reception costs £8,000 to £12,000. A 3-surgery practice with OPG X-ray, compressor room, suction system, and full Section 710 compliance costs £15,000 to £20,000. A large multi-surgery practice with CBCT scanner, multiple compressors, dedicated IT infrastructure, and premium lighting costs £20,000 to £25,000 or more.',
  },
  {
    question: 'What is Section 710 and how does it apply to dental surgeries?',
    answer:
      'Section 710 of BS 7671:2018+A3:2024 covers electrical installations in medical locations. Dental treatment rooms are classified as Group 1 medical locations — areas where contact of applied parts (dental instruments) with the patient is intended, but where discontinuity of supply does not cause immediate danger to life. Group 1 requirements include supplementary equipotential bonding connecting all extraneous-conductive-parts and protective conductors within the treatment area, 30mA RCD protection on all circuits, and specific requirements for socket outlet types and markings.',
  },
  {
    question: 'What electrical supply does a dental chair need?',
    answer:
      'A modern dental chair unit typically requires a hardwired connection (1 to 3kW) for the integral compressor, suction, curing light, and water system, plus 2 to 4 additional socket outlets for ancillary equipment (ultrasonic scaler, curing light, electric handpieces, and monitoring equipment). The chair is usually hardwired to a local isolator, with a separate circuit from the distribution board. Some chair units have integral transformers providing SELV for patient contact parts. The manufacturer\'s installation manual specifies exact requirements.',
  },
  {
    question: 'What are the electrical requirements for dental X-ray equipment?',
    answer:
      'Dental X-ray equipment requires dedicated electrical circuits with stable voltage supply. An intraoral X-ray unit typically draws 1 to 2kW on a standard 13A socket outlet but should be on a dedicated circuit to avoid voltage fluctuations. An OPG (orthopantomogram) unit draws 3 to 5kW and usually requires a dedicated 20A or 32A circuit. A CBCT (cone beam CT) scanner draws 5 to 10kW and requires a dedicated 32A circuit, often with specific voltage tolerance requirements. All X-ray rooms require radiation warning lights wired to the X-ray unit control circuit.',
  },
  {
    question: 'Do dental surgeries need emergency lighting?',
    answer:
      'Yes. Dental surgeries are commercial premises that require emergency lighting under the Regulatory Reform (Fire Safety) Order 2005. Self-contained LED emergency fittings with 3-hour duration should illuminate escape routes, exits, and treatment rooms. Treatment room emergency lighting is particularly important — a patient in a dental chair during a power failure needs sufficient light for the dentist to safely retract instruments and assist the patient to an upright position.',
  },
  {
    question: 'What supplementary bonding is required in a dental surgery?',
    answer:
      'Section 710 of BS 7671 requires supplementary equipotential bonding in Group 1 medical locations. This involves connecting all extraneous-conductive-parts (metal water pipes, waste pipes, structural metalwork, metallic door frames) and protective conductors of all circuits within the patient environment to a supplementary equipotential bonding bar. The bonding conductor must be a minimum of 4mm² copper. The bonding bar is typically located in or near the treatment room. This bonding system limits touch voltage between simultaneously accessible conductive parts to a safe level.',
  },
  {
    question: 'What electrical work does the decontamination room need?',
    answer:
      'The decontamination (decon) room requires power supplies for an autoclave (steriliser, 2 to 6kW, often requiring a 20A dedicated circuit), ultrasonic cleaner (200 to 500W), washer-disinfector (2 to 4kW, dedicated circuit), drying cabinet, and general socket outlets. The room is a wet environment — IP44 accessories are recommended near sinks and the washer-disinfector. Good lighting (300 to 500 lux) is essential for visual inspection of instruments. The total electrical cost for a well-equipped decontamination room is £1,500 to £3,000.',
  },
  {
    question: 'How long does a dental surgery electrical installation take?',
    answer:
      'A dental surgery electrical installation typically takes 1 to 4 weeks depending on the number of surgeries. A single-surgery practice takes 1 to 2 weeks. A 3-surgery practice with plant room, X-ray room, and decontamination room takes 2 to 3 weeks. A large multi-surgery practice can take 3 to 4 weeks. The electrical work must be coordinated with the dental equipment supplier (who installs the chairs, X-ray equipment, and compressor), plumber, IT contractor, and interior fit-out company.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/commercial-rewire-cost',
    title: 'Commercial Rewire Cost',
    description: 'Full commercial electrical installation costs per square metre.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-replacement-cost',
    title: 'Consumer Unit Replacement Cost',
    description: 'Distribution board costs for commercial installations.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete Electrical Installation Certificates for medical location installations.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote dental surgery electrical work with equipment schedules and Section 710 provisions.',
    icon: Calculator,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Dental Surgery Electrical Overview',
    content: (
      <>
        <p>
          Dental surgery electrical installation is specialist medical-sector work that requires
          knowledge of Section 710 of BS 7671, understanding of dental equipment power
          requirements, and coordination with dental equipment suppliers. It is among the
          highest-value commercial fit-out work available to electrical contractors.
        </p>
        <p>
          The electrical installation must support dental chairs with integral equipment,
          X-ray units, air compressors, suction systems, sterilisation equipment, IT
          infrastructure, and clinical lighting — all within the regulatory framework for
          medical locations. Supplementary equipotential bonding, specific RCD requirements,
          and dedicated circuits for critical equipment add complexity and cost compared to
          standard commercial installations.
        </p>
      </>
    ),
  },
  {
    id: 'section-710',
    heading: 'Section 710: Medical Locations',
    content: (
      <>
        <p>
          Section 710 of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          sets additional requirements for electrical installations in medical locations. Dental
          treatment rooms are classified as Group 1 medical locations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Group 1 Requirements for Dental Surgeries</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supplementary equipotential bonding</strong> — All extraneous-conductive-parts
                and protective conductors within the patient environment must be connected to a
                supplementary bonding bar. Minimum 4mm² copper bonding conductor. This limits
                touch voltage to safe levels during a fault.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection</strong> — All circuits in the Group 1 medical location
                must have 30 mA RCD protection per BS 7671 Section 411. Individual RCBOs are
                recommended to avoid nuisance tripping of multiple circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket outlet identification</strong> — Socket outlets in the medical
                location should be clearly identified (coloured or labelled) to distinguish them
                from general-purpose outlets.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Protective conductor monitoring</strong> — The integrity of the protective
                conductor for circuits supplying medical equipment should be monitored where
                disconnection could present a hazard.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Section 710 compliance adds approximately £800 to £2,000 per treatment room for the
          additional bonding, dedicated circuits, and specific accessories required.
        </p>
      </>
    ),
  },
  {
    id: 'dental-chair',
    heading: 'Dental Chair Supply and Equipment',
    content: (
      <>
        <p>
          The dental chair unit is the centrepiece of each treatment room and the primary electrical
          load. Modern chair units are complex systems integrating compressed air, suction, water,
          lighting, and multiple electrical instruments.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Per-Chair Electrical Requirements</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Chair unit hardwired connection</strong> — 1 to 3kW, dedicated circuit,
                local isolator adjacent to the chair. Some chair units require a 20A supply.
                Cost: £150 to £300 for the dedicated circuit and isolator.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ancillary socket outlets</strong> — 2 to 4 double sockets per treatment
                room for ultrasonic scaler, additional curing light, patient monitor, and
                ancillary equipment. Cost: £100 to £200 for outlets with Section 710 compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dental operating light</strong> — Typically ceiling-mounted with a
                dedicated connection point. LED dental lights draw 50 to 150W. Connection
                and ceiling rose: £80 to £150.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IT and data</strong> — 2 data points per treatment room for the practice
                management system and digital imaging. Cat6A data points: £80 to £150 each
                installed.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Total electrical cost per treatment room (excluding Section 710 bonding): £600 to
          £1,200. With supplementary equipotential bonding: £1,000 to £2,000 per room.
        </p>
      </>
    ),
  },
  {
    id: 'xray-compressor',
    heading: 'X-Ray, Compressor, and Steriliser',
    content: (
      <>
        <p>
          Dental practices require several major pieces of equipment with specific electrical
          requirements that add significantly to the installation cost.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Stethoscope className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Intraoral X-ray</strong> — 1 to 2kW, dedicated 13A circuit per X-ray
                unit. Radiation warning light circuit wired to the X-ray control. Cost: £200 to
                £400 per unit including dedicated circuit and warning light.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Stethoscope className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>OPG / Panoramic X-ray</strong> — 3 to 5kW, dedicated 20A or 32A circuit.
                Requires stable voltage supply — consider a dedicated radial from the main board.
                Radiation warning light and control circuit. Cost: £400 to £800 including
                dedicated circuit, warning lights, and containment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Stethoscope className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CBCT scanner</strong> — 5 to 10kW, dedicated 32A circuit, often with
                specific voltage tolerance requirements. Some scanners require UPS protection.
                Cost: £800 to £1,500 for the electrical supply including UPS if needed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Stethoscope className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dental compressor</strong> — 1.5 to 5kW, dedicated circuit, typically
                located in a plant room. Oil-free dental compressors require a clean air supply
                and appropriate ventilation. Starting current can be 3 to 5 times running
                current — size the cable and protective device accordingly. Cost: £300 to £600
                for the circuit, isolator, and ventilation extraction fan supply.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Stethoscope className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Autoclave (steriliser)</strong> — 2 to 6kW, dedicated 20A or 32A circuit
                in the decontamination room. Some autoclaves require a dedicated water supply
                with an associated water treatment unit (100 to 300W). Cost: £200 to £400 for
                the dedicated circuit.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cost-breakdown',
    heading: 'Cost Breakdown by Surgery Size',
    content: (
      <>
        <p>
          Here are realistic total electrical installation costs for dental surgeries in 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Single surgery practice (£8,000 to £12,000)</strong> — 1 treatment room
                with Section 710 bonding, 1 intraoral X-ray, compressor circuit, decontamination
                room with autoclave circuit, reception wiring, IT cabling, emergency lighting,
                consumer unit with RCBOs and SPD. 1 to 2 weeks installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3-surgery practice (£15,000 to £20,000)</strong> — 3 treatment rooms with
                Section 710 bonding, intraoral X-ray in each, OPG room, compressor and suction
                circuits, decontamination room, staff room, reception, IT infrastructure, full
                emergency lighting, 3-phase distribution. 2 to 3 weeks installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large multi-surgery practice (£20,000 to £25,000+)</strong> — 5+
                treatment rooms, CBCT scanner with UPS, multiple compressors, full IT server
                room, digital workflow integration, premium clinical lighting, air conditioning
                supplies, comprehensive Section 710 compliance, sub-distribution boards. 3 to 4
                weeks installation.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Quote dental surgery electrical with Section 710 compliance"
          description="Elec-Mate's quoting app handles medical location provisions, equipment schedules, and supplementary bonding requirements. Professional PDF quotes for dental practice fit-outs."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Regulations and Compliance',
    content: (
      <>
        <p>
          Dental surgery electrical installations must comply with multiple regulatory frameworks:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671:2018+A3:2024 Section 710</strong> — Medical locations. Group 1
                classification for dental treatment rooms. Supplementary bonding, RCD protection
                per BS 7671 Section 411, socket identification, and protective conductor monitoring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HTM 06-01</strong> — Department of Health guidance on electrical
                installations in healthcare premises. Covers safety, resilience, and design
                criteria for medical location installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ionising Radiation Regulations 2017</strong> — Applies to X-ray
                installations. The dental practice must have a radiation protection adviser and
                the X-ray rooms must be designed to contain radiation. Electrical cable routes
                through lead-lined walls require specialist sealing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CQC registration requirements</strong> — The Care Quality Commission
                inspects dental premises. A valid EIC and regular EICR (typically 3-yearly for
                medical locations) are required as part of CQC compliance evidence.
              </span>
            </li>
          </ul>
        </div>
        <p>
          An Electrical Installation Certificate (EIC) must be issued covering the full installation
          with specific reference to Section 710 compliance. The supplementary bonding must be
          tested and the results recorded on the EIC schedule.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Quoting Dental Work',
    content: (
      <>
        <p>
          Dental surgery fit-outs are premium-rate specialist work. Here are practical tips:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Stethoscope className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Get Equipment Data Sheets</h4>
                <p className="text-white text-sm leading-relaxed">
                  Request electrical data sheets from the dental equipment supplier for every
                  piece of equipment — chairs, X-ray units, compressors, autoclaves. These
                  specify exact voltage, current, circuit type, and connection requirements.
                  Do not quote without this information.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Activity className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Understand Section 710</h4>
                <p className="text-white text-sm leading-relaxed">
                  Section 710 compliance is non-negotiable and adds cost. Price it properly —
                  supplementary bonding, dedicated circuits, identified socket outlets, and the
                  additional testing time. If you are not confident with Section 710, partner
                  with an experienced colleague or invest in specific training.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">CQC-Ready Documentation</h4>
                <p className="text-white text-sm leading-relaxed">
                  Dental practices are inspected by CQC. Provide a comprehensive{' '}
                  <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink> with
                  Section 710 compliance clearly documented, supplementary bonding test results,
                  and an as-installed drawing showing all equipment positions and circuit
                  references. This level of documentation justifies premium pricing.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote dental surgery fit-outs with Section 710 compliance"
          description="Elec-Mate's quoting app handles medical location electrical work with equipment schedules, supplementary bonding, and CQC-ready documentation. 7-day free trial."
          icon={Calculator}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function DentalSurgeryElectricalCostPage() {
  return (
    <GuideTemplate
      title="Dental Surgery Electrical Cost 2026 | UK Medical Location Guide"
      description="How much does dental surgery electrical installation cost in 2026? UK guide covering Section 710 medical locations, dental chair supply, X-ray, compressor, steriliser, and costs from £8,000 to £25,000."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Dental Surgery Electrical Cost:{' '}
          <span className="text-yellow-400">UK Medical Location Guide 2026</span>
        </>
      }
      heroSubtitle="What does dental surgery electrical installation cost? This guide covers Section 710 medical location requirements, dental chair supply, X-ray equipment, compressors, sterilisation, and realistic pricing from £8,000 to £25,000 — for dental practice owners and electrical contractors."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Dental Surgery Electrical Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote Dental Surgery Electrical with Medical Location Compliance"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for medical location quoting with Section 710 compliance, equipment schedules, and CQC-ready EIC certificates. 7-day free trial."
    />
  );
}
