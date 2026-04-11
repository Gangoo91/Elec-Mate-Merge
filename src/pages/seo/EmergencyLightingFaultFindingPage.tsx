import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Lightbulb,
  AlertTriangle,
  ShieldCheck,
  FileCheck2,
  BatteryLow,
  ClipboardCheck,
  Search,
  Clock,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Fault Finding', href: '/guides/electrical-fault-finding' },
  { label: 'Emergency Lighting Fault Finding', href: '/emergency-lighting-fault-finding' },
];

const tocItems = [
  { id: 'battery-failure', label: 'Battery Failure' },
  { id: 'charging-circuit', label: 'Charging Circuit Faults' },
  { id: 'lamp-failure', label: 'Lamp Failure' },
  { id: 'test-mode', label: 'Test Mode Issues' },
  { id: 'monthly-self-test', label: 'Monthly Self-Test' },
  { id: 'annual-bs5266-test', label: 'Annual BS 5266 Test' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Emergency lighting must comply with BS 5266-1:2016 (Code of practice for the emergency lighting of premises). Failure to maintain emergency lighting in commercial, public, and HMO premises is a breach of fire safety legislation and can result in enforcement action.',
  'The most common emergency lighting fault is battery failure — sealed lead-acid or NiCd batteries degrade over time and may not sustain the minimum 3-hour duration (or 1-hour for some categories) required by BS 5266-1. Battery replacement is the most frequent maintenance intervention.',
  'Charging circuit faults prevent the battery from reaching full charge. A fitting that passes the monthly function test but fails the annual duration test often has a charging circuit fault rather than a completely failed battery.',
  'Emergency lighting fittings must be tested monthly (a function test of at least 25% rated duration) and annually (a full rated-duration discharge test). Both test results must be recorded in a log book as required by BS 5266-1.',
  'Central battery systems and addressable emergency lighting systems require specialist knowledge to fault find. Individual self-contained fitting failures are within the capability of a competent electrician, but system-level faults on central battery installations should be referred to the system installer.',
];

const faqs = [
  {
    question: 'Why is my emergency light flashing or showing a red fault indicator?',
    answer:
      "A red LED indicator on an emergency lighting fitting typically signals one of three conditions: low or failed battery (the most common cause), a failed lamp (the fitting cannot illuminate on test), or a charging circuit fault (the battery is not receiving charge from the maintained circuit). Some fittings indicate a fault by flashing the green charge indicator rather than illuminating a separate red LED. Refer to the fitting manufacturer's indicator guide — the pattern is usually in the installation instructions on the fitting itself.",
  },
  {
    question: 'How long must emergency lighting last in a power cut?',
    answer:
      'Under BS 5266-1:2016, emergency lighting must provide at least 3 hours of illumination at the specified lux level following complete mains failure for most commercial premises. Premises with a low occupancy risk category may qualify for a 1-hour duration. The 3-hour figure is the most common requirement. During the annual test, the fitting must sustain illumination for the full rated duration without the battery voltage dropping below the minimum specified threshold.',
  },
  {
    question: 'Can I test emergency lighting myself?',
    answer:
      'The monthly function test can be carried out by a responsible person with appropriate training — it involves pressing the test button on each fitting (or operating the maintained circuit isolator) and observing that the fitting illuminates during the test period (typically 25% of rated duration, i.e. 45 minutes for a 3-hour fitting). The annual full-duration test requires the battery to be fully charged first (24 hours minimum after any previous test) and the results must be recorded in the log book. Test results must be documented.',
  },
  {
    question: 'How often should emergency lighting batteries be replaced?',
    answer:
      "Emergency lighting batteries should be replaced every 3 to 4 years for sealed lead-acid (SLA/VRLA) batteries, or every 4 to 5 years for NiCd batteries, under normal operating conditions. In practice, the annual duration test will reveal batteries approaching end of life — a fitting that illuminates during the function test but fails before the end of the duration test period needs a battery replacement. Always replace with the exact battery specification from the fitting's documentation.",
  },
  {
    question: 'What is the difference between maintained and non-maintained emergency lighting?',
    answer:
      'Maintained emergency lighting is illuminated at all times (both when the mains supply is normal and during a mains failure). It is required in areas of public assembly, entertainment venues, and any location where occupants need continuous guidance. Non-maintained emergency lighting is only illuminated during a mains failure. The choice between maintained and non-maintained is determined during the system design process based on the premises use and risk assessment. BS 5266-1 provides guidance on selection.',
  },
  {
    question: 'What records must be kept for emergency lighting?',
    answer:
      'BS 5266-1:2016 requires that a log book is maintained for every emergency lighting system. The log book must record: the date and result of every monthly function test, the date and result of every annual duration test, all defects found and remedial action taken, the date of any battery or lamp replacements, and details of any alterations to the system. The log book should be kept on the premises and made available to the fire authority or building authority on request.',
  },
  {
    question: 'My emergency lighting passes the monthly test but fails the annual test — why?',
    answer:
      'A fitting that illuminates on the monthly function test (which only requires 25% of rated duration) but fails the annual full-duration test most commonly has a battery that has partially degraded. The battery holds enough charge for a short test but cannot sustain the full 3-hour output. Less commonly, a charging circuit fault is allowing the battery to partially charge but not reach full capacity. Replace the battery first; if the annual test fails again, investigate the charging circuit.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/fire-alarm-fault-finding',
    title: 'Fire Alarm Fault Finding',
    description: 'Zone faults, detector contamination, panel faults, and BS 5839 compliance.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-fault-finding',
    title: 'Electrical Fault Finding',
    description: 'Systematic fault finding for domestic and commercial electrical installations.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/hmo-electrical-requirements',
    title: 'HMO Electrical Requirements',
    description:
      'Emergency lighting and fire alarm requirements for Houses in Multiple Occupation.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'battery-failure',
    heading: 'Battery Failure',
    content: (
      <>
        <p>
          Battery failure is the most common cause of emergency lighting faults. Every
          self-contained emergency lighting fitting contains a rechargeable battery — most commonly
          a sealed lead-acid (VRLA) or NiCd cell — that powers the lamp during a mains failure.
          These batteries degrade through charge cycles and calendar ageing, eventually failing to
          hold sufficient charge for the required duration.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BatteryLow className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Symptoms of battery failure</strong> — the fitting illuminates briefly
                during a test but extinguishes before the test period expires, a red fault indicator
                is lit on a fitting that otherwise appears to be operating, or the fitting fails to
                illuminate at all during a simulated mains failure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BatteryLow className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Battery lifespan</strong> — sealed lead-acid batteries in emergency lighting
                fittings typically last 3 to 4 years. NiCd batteries (increasingly rare in new
                fittings due to EU RoHS restrictions) may last slightly longer. Replace batteries
                proactively at the manufacturer's recommended interval, not just when they fail.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BatteryLow className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Correct replacement specification</strong> — always replace with the battery
                type and capacity specified in the fitting's documentation. An incorrect capacity
                (Ah rating) will result in a fitting that either does not reach full charge or
                provides insufficient duration. An incorrect voltage will damage the charging
                circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BatteryLow className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Charge recovery period</strong> — after fitting a new battery, the fitting
                must be left on mains supply for a full recharge period (typically 24 hours for
                lead-acid, up to 24 hours for NiCd) before a duration test is performed. Testing too
                soon after battery replacement will give a falsely short duration result.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'charging-circuit',
    heading: 'Charging Circuit Faults',
    content: (
      <>
        <p>
          The charging circuit within each self-contained fitting converts the maintained mains
          supply to the correct DC charge voltage for the battery. A fault in the charging circuit
          means the battery is not being recharged after each test or after a real mains failure
          event — the battery progressively discharges until the fitting fails completely.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Identifying a charging fault</strong> — measure the DC voltage across the
                battery terminals with the mains supply connected. The voltage should be above the
                battery's nominal voltage (typically 3.6 V to 4.2 V for a NiCd cell, or 2.15 V per
                cell for a lead-acid battery in float charge). A battery voltage below nominal with
                the mains supply on indicates a charging circuit fault.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Failed charging components</strong> — the charging circuit typically
                consists of a voltage regulator IC, current-limiting resistors, and a diode. Failure
                of any of these components will prevent charging. Component-level repair of
                emergency lighting PCBs is generally not cost-effective — replace the fitting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mains supply interruption</strong> — if the maintained mains circuit to the
                emergency lighting has been interrupted (tripped MCB, blown fuse, or isolation left
                on following maintenance), the fittings receive no mains supply and the batteries
                progressively discharge. Check that the emergency lighting circuit MCB is closed and
                that no local isolation has been left in the off position.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'lamp-failure',
    heading: 'Lamp Failure',
    content: (
      <>
        <p>
          Modern emergency lighting fittings use LED light sources with very long service lives —
          typically 50,000 hours or more — making lamp failure much less common than with older
          fluorescent or incandescent sources. However, LED modules can still fail, particularly in
          fittings exposed to heat, vibration, or repeated voltage transients.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>LED module failure</strong> — a fitting that does not illuminate during a
                test but has a satisfactory battery voltage is most likely suffering from LED module
                failure or a driver PCB fault. LED modules in emergency lighting fittings are not
                typically user-replaceable — replace the fitting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maintained lamp vs. emergency lamp</strong> — some combined maintained and
                emergency fittings have separate lamp circuits for the mains-powered maintained
                operation and the battery-powered emergency operation. A fault in the maintained
                lamp circuit does not affect the emergency lamp, and vice versa. Confirm which lamp
                has failed before replacing the fitting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Luminance and lux levels</strong> — BS 5266-1 specifies minimum illuminance
                levels (typically 1 lux on the centreline of escape routes, higher in high-risk
                areas). A fitting with degraded LEDs may illuminate but fail to meet the minimum lux
                requirement. Annual testing should include lux verification at representative points
                on the escape route.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'test-mode',
    heading: 'Test Mode Issues',
    content: (
      <>
        <p>
          Addressable and central battery emergency lighting systems allow testing via a central
          controller rather than by testing each fitting individually. Faults in the test mode
          system can prevent testing from being completed or can provide false test results.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test inhibit left active</strong> — some systems allow a test inhibit to be
                set (for example, to prevent an automatic test running during an event). An inhibit
                that has been left active will prevent the scheduled test from running. Check the
                controller settings and remove any active inhibits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Communication fault preventing remote test</strong> — on bus-connected
                addressable systems, a wiring fault on the bus loop will prevent communication with
                all downstream fittings. The controller will report a communication fault rather
                than a test result. The loop wiring must be repaired before testing can proceed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Manual test as alternative</strong> — if the automated test system is
                faulty, the monthly and annual tests can still be performed manually by simulating
                mains failure at each fitting. Manual test results must still be recorded in the log
                book. Restore the automatic test function as soon as practicable.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'monthly-self-test',
    heading: 'Monthly Self-Test Requirements',
    content: (
      <>
        <p>
          BS 5266-1:2016 requires that emergency lighting is subject to a monthly function test.
          This is a key maintenance obligation for commercial premises, HMOs, and any building where
          emergency lighting is installed as a fire safety measure.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test procedure</strong> — simulate mains failure by pressing the test button
                on each self-contained fitting, or by operating the maintained circuit isolator for
                central battery systems. Each fitting must be visually confirmed to illuminate. The
                test period should be at least 25% of the rated duration (45 minutes for a 3-hour
                rated fitting).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Allow recharge before next test</strong> — after the monthly function test,
                the battery must be allowed to fully recharge (minimum 24 hours) before the next
                test or before the premises are closed. Do not carry out multiple tests in quick
                succession.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recording results</strong> — the date of the test, the tester's name, and
                the result (pass or fail, with the identity of any failed fitting) must be recorded
                in the emergency lighting log book. Unsigned or undated log book entries are not
                acceptable evidence of compliance.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'annual-bs5266-test',
    heading: 'Annual BS 5266 Duration Test',
    content: (
      <>
        <p>
          The annual full-rated-duration test is the most rigorous maintenance requirement for
          emergency lighting. It confirms that each fitting can sustain illumination for the
          complete rated duration — typically 3 hours — following complete mains failure, meeting BS
          5266-1:2016.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pre-test battery charge</strong> — all fittings must be fully charged before
                the annual test begins. This requires at least 24 hours on mains supply following
                any previous test or mains failure event. Beginning the annual test with partially
                charged batteries will give misleadingly low duration results.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test execution</strong> — simulate complete mains failure across the
                installation and monitor all fittings throughout the full rated duration. Any
                fitting that extinguishes before the end of the duration period has failed the test
                and must be repaired or replaced and retested.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Post-test recharge and restrictions</strong> — after the annual test, the
                batteries are fully discharged. The premises should not be occupied during the
                recharge period (typically 24 hours) unless alternative emergency lighting
                arrangements are in place. This is a significant operational consideration for busy
                commercial premises.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Formal certificate</strong> — the annual test should be documented with a
                formal test certificate signed by the competent person who carried out the test.
                This certificate forms part of the fire safety record for the premises and may be
                required by the fire authority or building insurer.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Emergency Lighting Testing and Certification',
    content: (
      <>
        <p>
          Emergency lighting testing and maintenance is a steady source of recurring work for
          commercial electricians. Every commercial and public building, HMO, and licensed premises
          requires monthly testing and an annual duration test — creating a regular maintenance
          cycle for every customer on your books.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Lightbulb className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Emergency Lighting on the EICR</h4>
                <p className="text-white text-sm leading-relaxed">
                  When carrying out an EICR on premises with emergency lighting, function-test each
                  fitting and record any failures as C2 or C3 observations. Record the results and
                  the date of the last annual test in the schedule of particulars. Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to capture observations and generate the report on site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Annual Test Certificates</h4>
                <p className="text-white text-sm leading-relaxed">
                  The annual BS 5266 duration test requires a formal written certificate. Elec-Mate
                  allows you to capture test results for each fitting, record pass and fail status,
                  and generate a professional test certificate — all on your phone, on site. Upsell
                  annual testing contracts to every commercial EICR customer.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage emergency lighting testing with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for EICRs, emergency lighting test records, and BS 7671-compliant documentation. 7-day free trial."
          icon={Lightbulb}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EmergencyLightingFaultFindingPage() {
  return (
    <GuideTemplate
      title="Emergency Lighting Not Working | Fault Finding Guide UK"
      description="Emergency lighting not working or failing tests? This guide covers battery failure, charging circuit faults, lamp failure, test mode issues, monthly self-test, and annual BS 5266 testing requirements."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Fault Finding Guide"
      badgeIcon={Lightbulb}
      heroTitle={
        <>
          Emergency Lighting Not Working:{' '}
          <span className="text-yellow-400">Fault Finding and BS 5266 Compliance</span>
        </>
      }
      heroSubtitle="Your emergency lighting is failing tests, showing fault indicators, or failing to illuminate during a mains failure. This guide covers battery failure, charging circuit faults, lamp failure, test mode issues, and the monthly and annual BS 5266 testing requirements."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Emergency Lighting Faults"
      relatedPages={relatedPages}
      ctaHeading="Manage Emergency Lighting Testing with Elec-Mate"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for EICRs, emergency lighting test records, and compliant documentation. 7-day free trial, cancel anytime."
    />
  );
}
