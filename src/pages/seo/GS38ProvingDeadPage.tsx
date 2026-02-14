import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Shield,
  AlertTriangle,
  Zap,
  Lock,
  HardHat,
  FileCheck2,
  Brain,
  CheckCircle2,
  ShieldCheck,
  Eye,
  Search,
  GraduationCap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Safety', href: '/guides/gs-38-proving-dead' },
  { label: 'GS 38 Proving Dead', href: '/guides/gs-38-proving-dead' },
];

const tocItems = [
  { id: 'what-is-gs38', label: 'What Is GS 38?' },
  { id: 'proving-unit', label: 'Proving Unit Requirements' },
  { id: 'voltage-indicator', label: 'Voltage Indicator Requirements' },
  { id: 'fused-probes', label: 'Fused Probes and Test Leads' },
  { id: 'ip-rating', label: 'IP Rating and Probe Tips' },
  { id: 'prove-test-prove', label: 'The Prove-Test-Prove Procedure' },
  { id: 'common-non-compliance', label: 'Common Non-Compliance Issues' },
  { id: 'test-equipment-maintenance', label: 'Test Equipment Maintenance' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'GS 38 is an HSE Guidance Note that specifies the requirements for electrical test equipment used by electricians when proving circuits dead. It is the accepted industry standard for safe testing.',
  'A two-pole voltage indicator (not a multimeter) is strongly recommended by GS 38 for proving dead, as it has fewer failure modes and does not rely on batteries or correct range selection.',
  'Test leads must be fused with a maximum 500 mA HBC fuse as close as possible to the probe tip, and probe tips must be spring-loaded with no more than 4 mm of exposed metal.',
  'The prove-test-prove procedure is mandatory: prove the voltage indicator works on a known live source, test the circuit being worked on, then prove the indicator still works afterwards.',
  'Elec-Mate AI tools and training courses cover safe isolation procedures, GS 38 compliance, and test equipment requirements to keep your team competent and compliant.',
];

const faqs = [
  {
    question: 'Is GS 38 a legal requirement?',
    answer:
      'GS 38 is a Guidance Note published by the Health and Safety Executive (HSE), not a regulation. However, it represents the accepted industry standard for electrical test equipment and the proving dead procedure. While compliance with GS 38 is not a statutory legal requirement in itself, the Electricity at Work Regulations 1989 (Regulation 4) require all work activities involving electrical systems to be carried out in a manner that prevents danger. Using test equipment that does not meet GS 38 standards would be considered a failure to meet the duty to prevent danger. In practice, the HSE, competent person schemes (NICEIC, NAPIT, ELECSA), training providers, and the courts all treat GS 38 compliance as the minimum acceptable standard for test equipment.',
  },
  {
    question: 'Can I use a multimeter instead of a voltage indicator for proving dead?',
    answer:
      'GS 38 strongly recommends using a dedicated two-pole voltage indicator rather than a multimeter for proving circuits dead. The reason is that multimeters have multiple failure modes that can give a false "dead" reading: flat battery, wrong range selected, blown internal fuse, faulty leads, or incorrect setting (resistance instead of voltage). A false dead reading can be fatal. A two-pole voltage indicator has fewer failure modes: it does not rely on a battery for basic voltage detection, it does not have a range selector, and its operation is simpler and more intuitive. GS 38 does not prohibit the use of multimeters — it simply recommends voltage indicators as the more reliable option for this critical safety function.',
  },
  {
    question: 'What is a proving unit and why do I need one?',
    answer:
      'A proving unit is a battery-powered device that generates a known voltage (typically 50V or 230V AC equivalent) to verify that your voltage indicator is working correctly before and after you test a circuit. It is an essential part of the prove-test-prove procedure. The reason for this procedure is to eliminate the risk of a false dead reading caused by a faulty voltage indicator. If your voltage indicator has developed a fault between the first prove and the final prove, the final prove will fail, alerting you that the test result on the circuit cannot be trusted.',
  },
  {
    question: 'What does "4 mm maximum exposed probe tip" mean?',
    answer:
      'GS 38 specifies that the probe tips of test leads must have no more than 4 mm of exposed conductive metal. This limits the depth to which the probe can penetrate into a terminal or connector, reducing the risk of accidentally bridging between two live conductors and causing a short circuit or arc flash. The probe tips should also be spring-loaded so that the exposed metal retracts when not being pressed against a conductor. Finger guards must be fitted to prevent the user fingers from sliding forward and contacting live parts. Many older test leads do not meet this requirement. Replace any test leads that do not comply with GS 38.',
  },
  {
    question: 'How often should I check my test equipment for GS 38 compliance?',
    answer:
      'You should visually inspect your test equipment before every use. Check the test leads for damage to the insulation, check the probe tips for wear or damage, check the fuses are present and correct, and verify that the finger guards and spring-loaded shrouds are functioning correctly. Carry spare fuses for your test leads at all times. The voltage indicator itself should be calibrated at the intervals recommended by the manufacturer — typically every 12 months. Calibration must be carried out by an accredited laboratory and a calibration certificate should be kept on file.',
  },
  {
    question: 'What category rating should my test equipment have?',
    answer:
      'Test equipment should be rated to the appropriate measurement category for the point in the installation where it will be used. CAT III is suitable for distribution-level testing — distribution boards, sub-main panels, and final circuits. CAT IV is required at the supply origin — the main switch, meter position, and any point upstream of the main distribution board where the available fault energy is highest. Using test equipment with an insufficient category rating is dangerous because the equipment may not withstand a transient overvoltage at that point in the installation.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/safe-isolation-procedure',
    title: 'Safe Isolation Procedure',
    description:
      'Step-by-step safe isolation procedure. Voltage indicator, proving unit, lock off, and prove-test-prove.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/guides/lock-off-loto-procedure',
    title: 'Lock Off / LOTO Procedure',
    description:
      'Lockout/tagout steps, MCB locks, distribution board isolation, and legal requirements for electricians.',
    icon: Lock,
    category: 'Guide',
  },
  {
    href: '/guides/risk-assessment-electricians',
    title: 'Risk Assessment Guide',
    description:
      'HSE 5-step risk assessment process. Electrical hazards, template structure, and legal requirements.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/guides/ppe-for-electricians',
    title: 'PPE for Electricians',
    description:
      'Insulated gloves, safety boots, eye protection, arc flash PPE, and voltage-rated VDE tools.',
    icon: HardHat,
    category: 'Guide',
  },
  {
    href: '/guides/arc-flash-protection',
    title: 'Arc Flash Protection',
    description:
      'What causes arc flash, incident energy levels, PPE categories, and boundary distances.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 with structured training courses. Safe isolation, testing procedures, and GS 38 compliance.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-gs38',
    heading: 'What Is GS 38?',
    content: (
      <>
        <p>
          GS 38 is a Guidance Note published by the Health and Safety Executive (HSE) titled
          "Electrical test equipment for use by electricians." It specifies the requirements for
          test probes, test leads, voltage indicators, and proving units used when proving circuits
          dead before work begins.
        </p>
        <p>
          The guidance was introduced because electricians were being injured and killed by electric
          shock while testing circuits they believed to be dead. In many cases, the test equipment
          being used was inadequate — unfused leads with long exposed probe tips, multimeters set to
          the wrong range, or voltage indicators with flat batteries that gave a false "dead"
          reading. GS 38 addresses these specific failure modes by setting minimum standards for
          test equipment design and use.
        </p>
        <p>
          Although GS 38 is guidance rather than regulation, it represents the accepted industry
          standard. The Electricity at Work Regulations 1989 require work on electrical systems to
          be carried out in a manner that prevents danger — and using test equipment that meets GS
          38 standards is the recognised way of satisfying this duty when proving circuits dead. All
          competent person schemes (NICEIC, NAPIT, ELECSA), all training providers, and the HSE
          itself treat GS 38 compliance as the baseline requirement.
        </p>
      </>
    ),
  },
  {
    id: 'proving-unit',
    heading: 'Proving Unit Requirements',
    content: (
      <>
        <p>
          A proving unit is a battery-powered device that generates a known voltage output to verify
          that your voltage indicator is functioning correctly. It is an essential piece of test
          equipment — without it, you cannot carry out the prove-test-prove procedure that is
          central to{' '}
          <SEOInternalLink href="/guides/safe-isolation-procedure">safe isolation</SEOInternalLink>.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Known voltage output</strong> — the proving unit must generate a reliable,
                known voltage within the detection range of your voltage indicator. Most produce
                around 50V AC or 230V AC equivalent.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Compatibility</strong> — the proving unit must be compatible with your
                specific voltage indicator. Some indicators have matching proving units from the
                same manufacturer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Battery condition</strong> — check the battery before each use. A proving
                unit with a flat battery will not produce the required test voltage. Carry spare
                batteries.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Portability</strong> — the proving unit must be portable enough to carry to
                the point of work. You need it at the point of isolation, not back in the van.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'voltage-indicator',
    heading: 'Voltage Indicator Requirements',
    content: (
      <>
        <p>
          GS 38 strongly recommends a dedicated two-pole voltage indicator for proving circuits
          dead. A two-pole indicator is preferred over a multimeter because it has fewer failure
          modes:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No battery dependency for basic function</strong> — most two-pole voltage
                indicators use the voltage being measured to power the indication (LEDs or neon
                lamps). A flat battery may disable additional features but the basic voltage
                detection still works.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No range selector</strong> — multimeters require the user to select the
                correct range and function. Selecting the wrong function can give a misleading
                reading. A two-pole indicator is always in voltage detection mode.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No internal fuse dependency</strong> — multimeters have internal fuses that
                can blow without the user noticing, potentially giving a false dead reading.
                Two-pole indicators do not have this failure mode.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Clear indication</strong> — voltage indicators provide an unambiguous
                live/dead indication (usually LEDs and an audible tone). No need to interpret a
                numerical reading.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Popular GS 38 compliant voltage indicators include the Fluke T-series, Megger TPT, and
          Martindale VI-13800. Ensure your indicator meets the category rating requirements for your
          work (CAT III minimum for distribution-level testing, CAT IV at the supply origin).
        </p>
      </>
    ),
  },
  {
    id: 'fused-probes',
    heading: 'Fused Probes and Test Leads',
    content: (
      <>
        <p>
          The test leads and probes are just as important as the voltage indicator itself. GS 38
          specifies detailed requirements for test lead construction:
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fused leads</strong> — each test lead must contain a fuse rated at no more
                than 500 mA (HBC). The fuse must be located as close as possible to the probe tip.
                This limits the energy available in the event of an accidental short circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Finger guards</strong> — test probes must have barriers that prevent the
                user's fingers from sliding forward and contacting live parts. The guard must
                provide genuine physical protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation</strong> — test leads must be fully insulated along their entire
                length. No exposed metal other than the probe tip. No cracks, cuts, abrasion, or
                deterioration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lead length</strong> — keep test leads as short as practical. Most GS 38
                compliant leads are approximately 1.2 metres in length.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Always carry spare fuses for your test leads. If a fuse blows during testing, investigate
          why before simply replacing it — it may indicate a live circuit.
        </p>
        <SEOAppBridge
          title="AI-generated RAMS include GS 38 procedures"
          description="Every risk assessment and method statement generated by Elec-Mate's AI Health and Safety agent includes the correct safe isolation procedure referencing GS 38 requirements. Your RAMS documentation always covers test equipment standards."
          icon={Shield}
        />
      </>
    ),
  },
  {
    id: 'ip-rating',
    heading: 'IP Rating and Probe Tips',
    content: (
      <>
        <p>
          The probe tips are the most critical safety feature of your test leads. GS 38 specifies:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maximum 4 mm exposed metal</strong> — the conductive tip must not extend
                more than 4 mm beyond the insulating shroud. This limits probe penetration into a
                terminal, reducing the risk of bridging between adjacent live conductors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Spring-loaded shrouds</strong> — the probe tips should have spring-loaded
                insulating shrouds that cover the exposed metal when not being pressed against a
                conductor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Robust construction</strong> — probe tips must withstand normal use without
                bending, breaking, or becoming loose. Damaged probe tips must be replaced
                immediately.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Many older test leads do not meet these requirements. Long, sharp, fully exposed probe
          tips are still commonly seen on site, but they are non-compliant and dangerous. Replace
          any leads that do not meet the 4 mm maximum and spring-loaded shroud requirements.
        </p>
      </>
    ),
  },
  {
    id: 'prove-test-prove',
    heading: 'The Prove-Test-Prove Procedure',
    content: (
      <>
        <p>
          The prove-test-prove procedure is the cornerstone of safe working on electrical circuits.
          It has three steps:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                <span className="text-green-400 font-bold text-sm">1</span>
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">PROVE — Test on Known Live Source</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use your proving unit to verify that the voltage indicator is working correctly.
                  The indicator should clearly detect the voltage. If it does not respond, the
                  indicator is faulty — do not use it.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
                <span className="text-yellow-400 font-bold text-sm">2</span>
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">TEST — Test the Circuit</h4>
                <p className="text-white text-sm leading-relaxed">
                  Test the circuit that has been isolated. Test between all combinations: line to
                  neutral, line to earth, and neutral to earth. If the indicator shows no voltage on
                  any combination, the circuit appears dead. If voltage is detected, the circuit is
                  still live — do not proceed.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                <span className="text-green-400 font-bold text-sm">3</span>
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">PROVE — Retest on Known Live Source</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the proving unit again to confirm the voltage indicator is still working
                  correctly. If the indicator responds normally, the test result is valid and the
                  circuit can be confirmed as dead. If it fails, the test result cannot be trusted —
                  replace the indicator and repeat the entire procedure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'common-non-compliance',
    heading: 'Common GS 38 Non-Compliance Issues',
    content: (
      <>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Long exposed probe tips</strong> — using test leads with probe tips longer
                than 4 mm. This is the most common non-compliance issue and significantly increases
                the risk of accidental short circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No fuses in test leads</strong> — using unfused test leads or leads where
                the fuses have been removed. This removes the energy-limiting protection that
                prevents severe{' '}
                <SEOInternalLink href="/guides/arc-flash-protection">arc flash</SEOInternalLink>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Using a multimeter without proving unit</strong> — relying on a multimeter
                reading without first proving the instrument works. A multimeter on the wrong range
                can display zero volts on a live circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Skipping the second prove</strong> — testing the circuit but not re-proving
                the voltage indicator afterwards. The second prove catches a voltage indicator fault
                that occurred during testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Damaged or worn test leads</strong> — continuing to use test leads with
                cracked insulation, worn probe tips, or non-functioning spring shrouds.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'test-equipment-maintenance',
    heading: 'Test Equipment Maintenance and Calibration',
    content: (
      <>
        <p>
          Maintaining your test equipment in good condition is essential for safety and compliance.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visual inspection before every use</strong> — check the voltage indicator
                body, test leads for insulation damage, probe tips for wear, fuses for presence, and
                spring-loaded shrouds for functioning.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Calibration</strong> — voltage indicators and multifunction testers should
                be calibrated at the manufacturer-recommended intervals, typically every 12 months.
                Use a UKAS accredited laboratory. Keep the calibration certificate on file.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Spare fuses and batteries</strong> — always carry spare fuses for test leads
                (500 mA HBC) and spare batteries for the proving unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Storage</strong> — store test equipment in a protective case away from damp,
                dust, extreme temperatures, and mechanical damage.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Elec-Mate{' '}
          <SEOInternalLink href="/training/inspection-and-testing">
            inspection and testing training courses
          </SEOInternalLink>{' '}
          cover GS 38 compliance, test equipment requirements, and the prove-test-prove procedure in
          detail. The <SEOInternalLink href="/tools/rams-generator">RAMS generator</SEOInternalLink>{' '}
          includes GS 38 references in every risk assessment and method statement it produces.
        </p>
        <SEOAppBridge
          title="Track calibration dates and training certificates"
          description="Elec-Mate's site safety tools help you manage test equipment calibration dates, PPE inspection records, and training certificates. Never miss an expiry date. Stay compliant with scheme requirements."
          icon={Eye}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function GS38ProvingDeadPage() {
  return (
    <GuideTemplate
      title="GS 38 Proving Dead | Test Equipment Requirements"
      description="Complete guide to HSE Guidance Note GS 38 for electricians. Proving unit requirements, voltage indicator standards, fused probes, 4 mm probe tip rule, prove-test-prove procedure, and test equipment maintenance."
      datePublished="2025-06-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Safety Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          GS 38 Proving Dead: <span className="text-yellow-400">Test Equipment Requirements</span>
        </>
      }
      heroSubtitle="HSE Guidance Note GS 38 sets the standard for electrical test equipment. Proving units, voltage indicators, fused probes, the 4 mm probe tip rule, and the prove-test-prove procedure. This guide covers everything electricians need to know about safe testing."
      readingTime={9}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About GS 38 and Proving Dead"
      relatedPages={relatedPages}
      ctaHeading="Stay Safe with Proper Test Procedures"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for AI-powered RAMS generation, safety training courses, and professional certification tools. GS 38 procedures are built into every assessment. 7-day free trial, cancel anytime."
    />
  );
}
