import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Waves,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Zap,
  Droplets,
  Cable,
  GraduationCap,
  ClipboardCheck,
  Power,
  Home,
  FileText,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Safety', href: '/guides/electrical-safety-tips' },
  { label: 'Flood Damaged Electrics', href: '/guides/flood-damaged-electrics' },
];

const tocItems = [
  { id: 'overview', label: 'Flood Damaged Electrics Overview' },
  { id: 'do-not-enter', label: 'Do Not Enter a Flooded Property' },
  { id: 'isolation-procedure', label: 'Isolation Procedure' },
  { id: 'drying-out', label: 'Drying Out the Installation' },
  { id: 'mandatory-assessment', label: 'Mandatory Rewire Assessment' },
  { id: 'insurance', label: 'Insurance Claims and Documentation' },
  { id: 'resilient-installations', label: 'Flood-Resilient Installations' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'DO NOT enter a flooded property to access the consumer unit or any electrical equipment. Floodwater conducts electricity, and concealed faults may energise the water. Call the DNO on 105 to request emergency disconnection at the cutout.',
  'All electrical equipment that has been submerged in floodwater must be assumed to be damaged. Floodwater contains contaminants (sewage, chemicals, silt) that compromise insulation and corrode connections even after drying.',
  'A full electrical installation assessment by a qualified electrician is mandatory before the supply is restored. An EICR is the appropriate certificate to document the post-flood condition of the installation.',
  'Consumer units, socket outlets, switches, and wiring accessories that have been submerged will almost certainly need replacing — they cannot be reliably dried out and reused.',
  'Document all electrical damage thoroughly for insurance purposes. Photographs, an EICR report, and a detailed scope of repair work are essential for a successful insurance claim.',
];

const faqs = [
  {
    question: 'Can I enter a flooded property to switch off the electricity?',
    answer:
      'No. Do not enter a flooded property to access the consumer unit or any electrical equipment. Floodwater conducts electricity, and if there is a fault anywhere in the installation — a damaged cable, a submerged socket, or a compromised earth connection — the water may be energised. Contact with energised floodwater can cause fatal electric shock. Instead, call 105 (the national power cut and emergency number) and request an emergency disconnection at the cutout. The DNO will send an engineer to make the supply safe. Only enter the property after the supply has been confirmed disconnected.',
  },
  {
    question: 'Can electrical equipment be used after being submerged in floodwater?',
    answer:
      'In most cases, no. Floodwater is not clean water — it typically contains sewage, chemicals, silt, and other contaminants that penetrate into insulation, connections, and the internal mechanisms of switches, sockets, and protective devices. Even if equipment appears to work after drying, the contamination causes ongoing corrosion and insulation degradation that creates a fire and shock risk over time. Consumer units, socket outlets, switches, RCDs, MCBs, RCBOs, and wiring accessories that have been submerged should be replaced. Fixed wiring (cables in walls, floors, and ceilings) may survive if the insulation integrity can be confirmed by testing — but this must be assessed by a qualified electrician.',
  },
  {
    question: 'How long does it take to dry out an electrical installation after flooding?',
    answer:
      'The drying time depends on the extent of flooding, the construction of the building (solid walls take longer than timber frame), ventilation, heating, and the use of dehumidifiers. As a general guide, a property that has been flooded to ground floor level may take 6 to 12 months to dry out fully. Electrical work should not begin until the building fabric is sufficiently dry — installing new sockets and wiring into damp walls will lead to premature failure and potential safety issues. Moisture meters can be used to confirm that walls and floors have dried to acceptable levels before electrical work commences.',
  },
  {
    question: 'Do I need a full rewire after flooding?',
    answer:
      'Not necessarily, but a full assessment is mandatory. A qualified electrician must carry out a thorough inspection and test of the entire installation. Cables installed in conduit or trunking may be salvageable if the insulation resistance tests are satisfactory after drying. Cables installed directly in walls (clipped or plastered in) are more likely to be compromised because contaminants can penetrate the cable sheath at any damage point. The electrician will carry out insulation resistance testing at 500V DC on every circuit to determine whether the cable insulation is intact. Any circuit that fails the insulation resistance test (below 1 megohm) will need rewiring.',
  },
  {
    question: 'Will my insurance cover electrical damage from flooding?',
    answer:
      'Most buildings insurance policies cover flood damage to the electrical installation, but the specifics depend on your policy. To support your claim, you need: photographs of the flood damage (including the consumer unit, sockets, and any visible wiring), a professional EICR report from a qualified electrician documenting the condition of the installation after the flood, a detailed scope of repair or rewire work with itemised costs, and receipts for all repair work carried out. Contact your insurer as soon as possible after the flood and before any repair work begins. Some insurers have approved contractor lists — check whether you are required to use an approved electrician or whether you can choose your own.',
  },
  {
    question: 'How can I make my electrical installation more flood-resilient?',
    answer:
      'If the property is in a flood-risk area, the electrical installation can be designed to minimise damage and speed up recovery. Key measures include: raising the consumer unit above the anticipated flood level (at least 1.5m above ground floor level), using surface-mounted wiring in conduit on ground floor areas (easily replaced without disturbing walls), installing sockets at a height of 1.2m or above on the ground floor, using waterproof (IP-rated) accessories at ground level, and installing a second consumer unit on the first floor to maintain power to upper levels if the ground floor floods. These measures do not prevent flood damage but significantly reduce the cost and time to restore the installation.',
  },
  {
    question: 'Who is responsible for flood damage to the electrical supply?',
    answer:
      'The DNO (Distribution Network Operator) is responsible for the electricity supply up to and including the meter and cutout. If the meter, cutout, or service cable is damaged by flooding, the DNO will repair or replace it at no cost to the householder. Everything after the meter — the consumer unit, circuits, and all fixed wiring — is the responsibility of the property owner. Call 105 to report damage to the DNO equipment and arrange a qualified electrician for the installation side.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/storm-damage-electrical-safety',
    title: 'Storm Damage Electrical Safety',
    description: 'Downed power lines, emergency isolation, and when to call the DNO.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-emergency',
    title: 'Electrical Emergency Guide',
    description: 'What to do in an electrical emergency — shock, fire, and power failure.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/guides/house-rewire-guide',
    title: 'House Rewire Guide',
    description: 'Complete guide to domestic rewiring including costs and timescales.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete electrical inspection condition reports on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/insulation-resistance-test',
    title: 'Insulation Resistance Testing',
    description: 'How to test insulation resistance and interpret the results.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'Study for C&G 2391 with structured training modules.',
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
    heading: 'Flood Damaged Electrics: What You Need to Know',
    content: (
      <>
        <p>
          Flooding is one of the most destructive events an electrical installation can experience.
          Unlike clean water from a burst pipe, floodwater contains sewage, chemicals, silt, oil, and
          other contaminants that penetrate into every part of the installation they reach — cable
          insulation, connection points, protective devices, sockets, and switches.
        </p>
        <p>
          The damage is often worse than it appears. Equipment that looks dry on the outside may have
          contaminated water trapped inside. Insulation that appears intact may have been chemically
          degraded. Connections that seem secure may be corroding internally.
        </p>
        <p>
          This guide covers the essential safety steps for dealing with flood-damaged electrics: why
          you must not enter a flooded property, how the supply is isolated, the drying and
          assessment process, insurance documentation, and making installations more flood-resilient
          for the future.
        </p>
      </>
    ),
  },
  {
    id: 'do-not-enter',
    heading: 'Do Not Enter a Flooded Property',
    content: (
      <>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-bold text-white text-lg mb-2">DANGER — Do Not Enter</h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                If a property is flooded, do not enter it to switch off the electricity or retrieve
                belongings. Floodwater conducts electricity. If there is any fault in the
                installation — a damaged cable, a submerged socket, a compromised earth — the water
                may be energised. Contact with energised floodwater can be fatal.
              </p>
              <ul className="space-y-2 text-white text-sm leading-relaxed">
                <li>
                  <strong>Call 105</strong> and request emergency disconnection at the cutout.
                </li>
                <li>
                  <strong>Call 999</strong> if there is immediate danger to life.
                </li>
                <li>
                  <strong>Wait</strong> until the DNO confirms the supply is disconnected before
                  entering.
                </li>
                <li>
                  <strong>Do not assume</strong> that a power cut means the supply is safe — it may
                  be automatically restored.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          Even after the water recedes, the installation remains dangerous until it has been
          inspected and tested by a qualified electrician. Residual moisture, contaminated
          insulation, and corroded connections can cause faults without warning.
        </p>
      </>
    ),
  },
  {
    id: 'isolation-procedure',
    heading: 'Isolation Procedure',
    content: (
      <>
        <p>
          The correct isolation procedure for a flooded property depends on the water level and
          accessibility:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Power className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>If the consumer unit is above the water level</strong> and you can reach it
                safely without stepping in water, switch off the main switch. Stand on a dry surface
                and do not touch any other part of the board.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Power className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>If the consumer unit is submerged or inaccessible</strong>, do not attempt to
                reach it. Call 105 and request the DNO to disconnect the supply at the cutout. This
                is the DNO equipment (before the meter) and they have the tools and authority to
                disconnect it safely.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Power className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>After disconnection</strong>, the supply must not be restored until a
                qualified electrician has inspected and tested the installation and confirmed it is
                safe. This may take days, weeks, or months depending on the extent of the flooding
                and the drying time.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'drying-out',
    heading: 'Drying Out the Installation',
    content: (
      <>
        <p>
          Drying out a flood-damaged electrical installation is a slow process. Rushing it leads to
          premature failure and potential safety hazards.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building fabric first</strong> — the walls, floors, and ceilings must dry
                before electrical work begins. Installing new equipment into damp walls causes
                corrosion, insulation failure, and mould growth behind accessories.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Timeline</strong> — a typical ground-floor flood in a solid-wall property
                takes 6 to 12 months to dry out fully. Timber-frame construction dries faster
                (3 to 6 months). Using industrial dehumidifiers and controlled heating accelerates
                the process.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Moisture testing</strong> — use a moisture meter to confirm that walls and
                floors have dried to acceptable levels (typically below 5% for masonry) before
                electrical work starts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Temporary supply</strong> — in some cases, a temporary electrical supply can
                be arranged to provide power for dehumidifiers and heating during the drying period.
                This is typically a temporary consumer unit at high level, feeding a limited number
                of circuits above the flood level.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'mandatory-assessment',
    heading: 'Mandatory Rewire Assessment',
    content: (
      <>
        <p>
          Before the electricity supply is restored, a qualified electrician must carry out a full
          inspection and test of the installation. This is not optional — restoring power to a
          flood-damaged installation without assessment is dangerous.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation resistance testing</strong> — every circuit must be tested at
                500V DC. The minimum acceptable value is 1 megohm. Circuits with low insulation
                resistance must be investigated and repaired or replaced.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Continuity testing</strong> — protective conductors (earths) must be tested
                for continuity to confirm they are intact and have not been corroded by floodwater.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD testing</strong> — all RCDs and RCBOs must be functionally tested to
                confirm they trip at the correct current and time. Flood-contaminated RCDs may fail
                to operate when needed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR report</strong> — an{' '}
                <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> provides the
                formal documentation of the installation condition. This report is essential for
                insurance claims and for demonstrating that the installation has been professionally
                assessed before reconnection.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In most cases, the consumer unit and all ground-floor accessories (sockets, switches,
          fused connection units) will need replacing. Fixed wiring may be salvageable if the
          insulation resistance tests are satisfactory, but this must be confirmed by testing, not
          assumed.
        </p>
      </>
    ),
  },
  {
    id: 'insurance',
    heading: 'Insurance Claims and Documentation',
    content: (
      <>
        <p>
          Thorough documentation is critical for a successful insurance claim for flood-damaged
          electrics. Insurers need evidence of the damage and the scope of repair work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Photographs</strong> — take photographs of the flood level, the consumer
                unit, all sockets and switches below the flood line, any visible damage to wiring,
                and the general condition of the property. Photograph before any clean-up or repair
                work begins.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR report</strong> — a professional EICR documents the condition of the
                installation with observation codes. C1 (danger present) and C2 (potentially
                dangerous) observations provide the evidence insurers need.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scope of works</strong> — a detailed, itemised scope of repair work from a
                qualified electrician, including materials and labour costs. This should clearly
                distinguish between items that must be replaced (safety requirement) and items that
                are recommended (good practice).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Contact your insurer early</strong> — notify your insurer as soon as
                possible after the flood, before any repair work begins. Some policies require the
                use of approved contractors. Get approval before commissioning repair work.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'resilient-installations',
    heading: 'Flood-Resilient Electrical Installations',
    content: (
      <>
        <p>
          For properties in flood-risk areas, the electrical installation can be designed to
          minimise damage and speed up recovery:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Raise the consumer unit</strong> — mount the consumer unit at least 1.5m
                above ground floor level, above the anticipated flood line. This keeps the main
                protective devices out of the water.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Raise socket outlets</strong> — install ground-floor sockets at 1.2m or
                above, rather than the standard 300mm to 450mm height. This keeps them above most
                flood levels and makes replacement easier if they are damaged.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Surface-mounted wiring</strong> — use surface-mounted conduit or trunking
                for ground-floor circuits. This is far easier and cheaper to replace than cables
                buried in walls, and can be removed, cleaned, and reinstalled after a flood.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Separate ground and first floor boards</strong> — install a separate
                consumer unit or sub-board for first-floor circuits. If the ground floor floods,
                the first-floor supply can be maintained, providing lighting, heating, and power
                to the occupied parts of the property.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Flood Recovery Work',
    content: (
      <>
        <p>
          Flood recovery is demanding but rewarding work. Properties need full assessments, consumer
          unit replacements, partial or full rewires, and comprehensive documentation for insurance.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EICR and EIC on Your Phone</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete post-flood{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">EICRs</SEOInternalLink> and{' '}
                  <SEOInternalLink href="/tools/eic-certificate">EICs</SEOInternalLink> for repair
                  work on site. Send certificates directly to the customer and their insurance
                  company.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Cable className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing for Rewires</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>{' '}
                  for replacement circuits. Get the right cable sizes on the assessment visit and
                  include them in your quotation.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional flood recovery documentation"
          description="Elec-Mate gives you EICR certificates, EIC certificates, quoting, and cable sizing on your phone. Produce the professional documentation that insurance companies require. 7-day free trial."
          icon={Waves}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function FloodDamagedElectricsPage() {
  return (
    <GuideTemplate
      title="Flood Damaged Electrics | Safety and Recovery Guide UK"
      description="What to do when a property has been flooded. Do not enter flooded buildings, isolation procedures, drying out, mandatory rewire assessment, insurance claims, and making installations flood-resilient. Essential safety guidance."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Emergency Safety Guide"
      badgeIcon={Waves}
      heroTitle={
        <>
          Flood Damaged Electrics:{' '}
          <span className="text-yellow-400">Safety, Assessment, and Recovery</span>
        </>
      }
      heroSubtitle="Flooding causes severe damage to electrical installations. This guide covers the critical safety steps — why you must not enter a flooded property, isolation procedures, drying out, mandatory assessment before reconnection, and insurance documentation."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Flood Damaged Electrics"
      relatedPages={relatedPages}
      ctaHeading="Professional Flood Recovery Documentation"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for EICR certificates, quoting, and cable sizing. Produce the documentation insurance companies need. 7-day free trial, cancel anytime."
    />
  );
}
