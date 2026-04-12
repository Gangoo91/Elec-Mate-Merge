import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  ShieldCheck,
  FileCheck2,
  Search,
  Bell,
  Wrench,
  Zap,
  Battery,
  ClipboardCheck,
  Phone,
  BellRing,
  Home,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Smoke Detector Beeping', href: '/guides/smoke-detector-beeping' },
];

const tocItems = [
  { id: 'overview', label: 'Why Is My Smoke Detector Beeping?' },
  { id: 'types-of-beeps', label: 'Types of Beeps and What They Mean' },
  { id: 'low-battery', label: 'Low Battery Chirp' },
  { id: 'end-of-life', label: 'End of Life Warning' },
  { id: 'false-alarms', label: 'False Alarms and Nuisance Beeping' },
  { id: 'mains-powered', label: 'Mains-Powered Smoke Detectors' },
  { id: 'what-to-do', label: 'What to Do Step by Step' },
  { id: 'when-to-call', label: 'When to Call an Electrician' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'An intermittent chirp (every 30-60 seconds) almost always means a low battery. Replace the battery immediately — a smoke detector with a flat battery provides zero protection.',
  'A continuous alarm (loud, sustained) means the detector is sensing smoke, heat, or combustion particles. Take it seriously — check for fire, evacuate if necessary, and call 999 if there is a genuine fire.',
  'Smoke detectors have a limited lifespan, typically 10 years. After that, the sensor degrades and the unit must be replaced. An end-of-life chirp pattern (often different from the low battery chirp) indicates the detector itself needs replacing.',
  'Mains-powered (hardwired) smoke detectors with battery backup still need battery replacement. If the mains supply is interrupted, the backup battery takes over. When the backup battery is low, the detector chirps.',
  'In rented properties, the Smoke and Carbon Monoxide Alarm (Amendment) Regulations 2022 require landlords to ensure smoke alarms are installed on each storey and are in working order at the start of each tenancy.',
  'BS 5839-6 is the code of practice for fire detection and alarm systems in domestic premises. It covers system design, installation, and maintenance requirements for smoke and heat detectors.',
];

const faqs = [
  {
    question: 'Why is my smoke detector beeping every 30 seconds?',
    answer:
      'A chirp every 30 to 60 seconds is the standard low battery warning. The detector is telling you the battery is nearly flat and needs replacing. Most detectors use a 9V PP3 battery or AA lithium batteries. Replace the battery, press the test button to confirm operation, and the chirping will stop. If it continues after battery replacement, the detector may have reached its end of life and needs replacing entirely.',
  },
  {
    question: 'My smoke detector keeps beeping even with a new battery. Why?',
    answer:
      'If a new battery does not stop the chirping, there are several possibilities: the battery may not be seated correctly in the compartment; the battery contacts may be corroded or bent; the detector may have reached its end of life (check the manufacture date — replace after 10 years); there may be dust or insects inside the sensor chamber; or the detector may be faulty. Try removing the battery, pressing and holding the test button for 15 seconds to discharge residual charge, then inserting the new battery. If chirping continues, replace the detector.',
  },
  {
    question: 'How do I stop a hardwired smoke detector from beeping?',
    answer:
      'Mains-powered smoke detectors usually have a backup battery. If the detector is chirping, first try replacing the backup battery. If that does not work, turn off the power at the consumer unit for the lighting circuit that feeds the detector, remove the detector from its base plate, disconnect the wiring connector, wait 30 seconds, reconnect, reattach to the base plate, and restore power. If it still chirps, the detector likely needs replacing — call an electrician as hardwired detectors are connected to the mains supply.',
  },
  {
    question: 'Can I just remove the battery to stop the beeping?',
    answer:
      'You should never remove the battery without immediately replacing it. A smoke detector with no battery provides zero fire protection. House fires can start at any time — the risk of a fire while the battery is out is small on any given night, but the consequences are potentially fatal. If you remove the battery temporarily (to stop a nuisance alarm while cooking, for example), replace it immediately afterwards. Better yet, use the hush/silence button that most modern detectors have, which temporarily reduces sensitivity for a few minutes.',
  },
  {
    question: 'How often should I replace smoke detector batteries?',
    answer:
      'For detectors with replaceable batteries, replace 9V batteries at least once a year. A common recommendation is to change them when the clocks change in October. Some detectors use 10-year sealed lithium batteries that last the life of the detector — these do not need replacement, but the entire detector is replaced after 10 years. Test all smoke detectors monthly by pressing the test button, regardless of battery type.',
  },
  {
    question: 'What is the difference between ionisation and optical smoke detectors?',
    answer:
      'Ionisation detectors respond fastest to fast-flaming fires (burning paper, wood) but are more prone to false alarms from cooking. Optical (photoelectric) detectors respond fastest to slow-smouldering fires (overheating wiring, smouldering furniture) and are less prone to cooking false alarms. For best protection, use optical detectors near kitchens and either type elsewhere, or use multi-sensor detectors that combine both technologies. BS 5839-6 provides guidance on detector selection and placement.',
  },
  {
    question: 'Are landlords required to provide smoke detectors?',
    answer:
      'Yes. Under the Smoke and Carbon Monoxide Alarm (Amendment) Regulations 2022, landlords in England must install at least one smoke alarm on each storey of a rental property where there is a room used as living accommodation. The alarms must be in working order at the start of each new tenancy. Landlords must also install carbon monoxide alarms in any room with a fixed combustion appliance (excluding gas cookers). Failure to comply can result in a penalty of up to five thousand pounds.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/consumer-unit-upgrade',
    title: 'Consumer Unit Upgrade Guide',
    description:
      'Modern consumer units with RCBO protection for all circuits including smoke detector feeds.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Guide',
    description: 'How an EICR checks your fixed wiring including smoke detector circuits.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/downlights-flickering',
    title: 'Downlights Flickering',
    description:
      'Flickering lights can indicate wiring faults that also affect smoke detector circuits.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-fault-finding-guide',
    title: 'Electrical Fault Finding',
    description:
      'Systematic fault finding guide for electricians diagnosing detector circuit issues.',
    icon: Search,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Why Is My Smoke Detector Beeping?',
    content: (
      <>
        <p>
          A beeping smoke detector is one of the most common household annoyances — but every beep
          has a meaning. Understanding what your detector is telling you is important because smoke
          detectors save lives, and a detector that is beeping due to a fault or low battery is not
          providing the protection you depend on.
        </p>
        <p>
          There are several distinct types of sound a smoke detector makes, and each one indicates
          something different. This guide covers every common beeping pattern, what causes it, what
          you should do, and when you need an electrician.
        </p>
      </>
    ),
  },
  {
    id: 'types-of-beeps',
    heading: 'Types of Beeps and What They Mean',
    content: (
      <>
        <p>
          Smoke detectors produce different sound patterns for different conditions. Here are the
          most common:
        </p>
        <div className="space-y-3 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">Single chirp every 30-60 seconds</h4>
            <p className="text-white text-sm leading-relaxed">
              <strong>Low battery.</strong> The most common cause. The detector has enough power to
              chirp but not enough to function properly in a fire. Replace the battery immediately.
            </p>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <h4 className="font-bold text-white mb-2">
              Chirp pattern every 30 seconds (sometimes 2 or 3 chirps)
            </h4>
            <p className="text-white text-sm leading-relaxed">
              <strong>End of life.</strong> The detector sensor has degraded beyond acceptable
              limits. The entire unit needs replacing. Check the manufacture date on the back — if
              it is over 10 years old, this is almost certainly the cause.
            </p>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h4 className="font-bold text-white mb-2">Loud, continuous alarm</h4>
            <p className="text-white text-sm leading-relaxed">
              <strong>Smoke or fire detected.</strong> The detector is sensing combustion particles,
              smoke, or heat. Check for fire immediately. If there is a fire, evacuate and call 999.
              If there is no fire (cooking smoke, steam), ventilate the area and press the
              hush/silence button if available.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-2">Intermittent alarm (on and off)</h4>
            <p className="text-white text-sm leading-relaxed">
              <strong>Contamination or fault.</strong> Dust, insects, or moisture inside the sensor
              chamber can cause intermittent false alarms. The detector may need cleaning or
              replacement.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'low-battery',
    heading: 'Low Battery: The Most Common Cause',
    content: (
      <>
        <p>
          The overwhelming majority of beeping smoke detector calls are low battery warnings. The
          fix is simple: replace the battery. Here is how to do it properly:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Identify the battery type</strong> — most detectors use a 9V PP3 battery, AA
                batteries, or a sealed lithium cell. Check the detector's manual or the battery
                compartment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remove and replace</strong> — twist the detector off its base plate (most
                twist anti-clockwise). Open the battery compartment, remove the old battery, and
                insert the new one observing correct polarity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test the detector</strong> — press and hold the test button until the alarm
                sounds. This confirms the new battery is working and the detector is functional.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reattach</strong> — twist the detector back onto its base plate until it
                clicks into position. Ensure it is secure.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If the chirping continues after battery replacement, press and hold the test button for 15
          seconds to clear any residual charge, then release. If it still chirps, the detector is
          likely at end of life.
        </p>
      </>
    ),
  },
  {
    id: 'end-of-life',
    heading: 'End of Life: When the Detector Itself Needs Replacing',
    content: (
      <>
        <p>
          Smoke detectors do not last forever. The sensor element degrades over time, and after
          approximately 10 years, the detector can no longer reliably distinguish between smoke and
          normal air. At this point, it signals end of life with a distinctive chirp pattern.
        </p>
        <p>
          To check the age of your detector, look for a manufacture date on the back of the unit. If
          there is no date visible, and the detector has been in place for as long as you can
          remember, assume it needs replacing.
        </p>
        <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Replacement Guidelines</h3>
          <ul className="space-y-3 text-white text-sm">
            <li className="flex items-start gap-3">
              <BellRing className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                Replace all smoke detectors after 10 years, regardless of whether they appear to
                work
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BellRing className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>Replace heat detectors (typically used in kitchens) after 10 years</span>
            </li>
            <li className="flex items-start gap-3">
              <BellRing className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                Carbon monoxide detectors have a shorter lifespan — typically 5 to 7 years
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BellRing className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                When replacing, consider upgrading to interlinked detectors so all alarms sound when
                one detects smoke
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'false-alarms',
    heading: 'False Alarms and Nuisance Beeping',
    content: (
      <>
        <p>
          False alarms — where the detector sounds a full alarm with no fire present — are a
          significant safety concern. Not because the alarm itself is dangerous, but because
          repeated false alarms cause people to disconnect or ignore their detectors, removing
          life-saving protection.
        </p>
        <p>Common causes of false alarms include:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cooking fumes</strong> — the most common cause. Ionisation detectors are
                particularly sensitive to cooking particles. If your detector near the kitchen
                triggers often, consider replacing it with an optical detector or a heat detector.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Steam</strong> — from bathrooms, kettles, or showers can trigger some
                detector types. Position detectors away from steam sources.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dust and insects</strong> — particles inside the sensor chamber scatter
                light in optical detectors, mimicking smoke. Regular gentle vacuuming around the
                detector helps prevent this.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Temperature extremes</strong> — detectors in unheated lofts or garages may
                false alarm in very cold or very hot conditions.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The correct response to frequent false alarms is to relocate or replace the detector with
          an appropriate type — never to remove or disconnect it.
        </p>
      </>
    ),
  },
  {
    id: 'mains-powered',
    heading: 'Mains-Powered Smoke Detectors',
    content: (
      <>
        <p>
          Many UK homes, particularly those built or rewired since the 1990s, have mains-powered
          (hardwired) smoke detectors. These are connected to the home's electrical supply —
          typically on the lighting circuit — with a battery backup for power cuts.
        </p>
        <p>
          Mains-powered detectors can beep for the same reasons as battery-only units, plus some
          additional causes:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Backup battery low</strong> — even mains-powered detectors have a battery
                for power cut backup. When this battery is low, the detector chirps. Replace the
                backup battery.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mains supply interrupted</strong> — if the lighting circuit has been turned
                off at the consumer unit, or if there is a wiring fault, the detector runs on
                battery and will eventually chirp when the battery runs low.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wiring fault</strong> — a loose connection or damaged cable in the detector
                circuit can cause intermittent power loss. The detector switches between mains and
                battery, eventually draining the battery.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you have mains-powered detectors and cannot resolve the beeping by replacing the backup
          battery, the issue may be with the mains wiring. This requires an electrician.
        </p>
      </>
    ),
  },
  {
    id: 'what-to-do',
    heading: 'What to Do Step by Step',
    content: (
      <>
        <p>Follow this process to diagnose and resolve a beeping smoke detector:</p>
        <div className="space-y-3 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">
              Step 1: Identify which detector is beeping
            </h4>
            <p className="text-white text-sm leading-relaxed">
              If you have multiple detectors, stand beneath each one and listen. The chirp or alarm
              should be loudest directly below the offending unit. Some interlinked systems show a
              red LED on the detector that triggered.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">Step 2: Identify the type of sound</h4>
            <p className="text-white text-sm leading-relaxed">
              A regular chirp = low battery or end of life. A continuous alarm = smoke detected or
              fault. An intermittent alarm = contamination or nuisance trigger.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">Step 3: Replace the battery</h4>
            <p className="text-white text-sm leading-relaxed">
              For a chirp, replace the battery first. Use a quality branded battery — cheap
              batteries may not last or provide sufficient voltage. After replacing, hold the test
              button for 15 seconds to reset, then test.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">Step 4: Check the age</h4>
            <p className="text-white text-sm leading-relaxed">
              If a new battery does not resolve the chirping, check the manufacture date. If the
              detector is over 10 years old, replace the entire unit. For battery-only detectors,
              this is a straightforward swap. For hardwired detectors, call an electrician.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'when-to-call',
    heading: 'When to Call an Electrician',
    content: (
      <>
        <p>
          Battery-only smoke detectors can be replaced by a competent homeowner. However, you should
          call an electrician in these situations:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hardwired detector replacement</strong> — mains-powered detectors are
                connected to the electrical supply. Replacing them involves working with mains
                wiring and should be carried out by a qualified electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wiring fault suspected</strong> — if a hardwired detector keeps losing mains
                power (indicated by the mains LED going off), there may be a wiring fault in the
                detector circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installing new detectors</strong> — if you want to upgrade from battery-only
                to hardwired interlinked detectors, this involves new cabling and connection to the
                consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Interlinked system faults</strong> — if one detector in an interlinked
                system triggers all detectors when there is no smoke, there may be a wiring fault on
                the interconnect wire.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Compliance check</strong> — if you are a landlord and need to ensure your
                property meets the Smoke and Carbon Monoxide Alarm Regulations, an electrician can
                assess your current provision and install any additional detectors required.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Fire Detection Systems in Domestic Premises',
    content: (
      <>
        <p>
          When called to a beeping smoke detector, use the opportunity to assess the full fire
          detection provision. BS 5839-6 defines grades and categories for domestic fire detection:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Grade and Category Assessment</h4>
                <p className="text-white text-sm leading-relaxed">
                  BS 5839-6 defines Grade A (fire alarm panel + detectors), Grade D (mains-powered
                  interlinked with battery backup), Grade F (battery-only). Building Regulations
                  Approved Document B typically requires Grade D LD3 (escape routes) for new-build
                  dwellings. Recommend upgrades where appropriate.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Detector Selection</h4>
                <p className="text-white text-sm leading-relaxed">
                  Optical detectors for circulation areas and bedrooms (less prone to cooking false
                  alarms). Heat detectors for kitchens and garages. Multi-sensor detectors for
                  enhanced protection. Ensure detector type is appropriate for the location to
                  reduce nuisance alarms.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Documentation</h4>
                <p className="text-white text-sm leading-relaxed">
                  Installation of a new fire detection system is notifiable work under Part P of the
                  Building Regulations. Issue the appropriate certificate — an{' '}
                  <SEOInternalLink href="/eic-certificate">
                    Electrical Installation Certificate
                  </SEOInternalLink>{' '}
                  for new installations or a{' '}
                  <SEOInternalLink href="/tools/minor-works-certificate">
                    Minor Works Certificate
                  </SEOInternalLink>{' '}
                  for like-for-like replacements.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete fire alarm certificates on your phone"
          description="Elec-Mate's fire alarm certificate app lets you document BS 5839-6 compliant installations with system design, test schedules, and instant PDF export. Join 1,000+ UK electricians."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SmokeDetectorBeepingPage() {
  return (
    <GuideTemplate
      title="Smoke Detector Beeping | Why and What to Do"
      description="Why is your smoke detector beeping? Learn the causes — low battery, end of life, false alarms, wiring faults — what to do step by step, and when to call an electrician. UK guide for homeowners and electricians."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Safety"
      badgeIcon={Bell}
      heroTitle={
        <>
          Smoke Detector Beeping: <span className="text-yellow-400">Why and What to Do</span>
        </>
      }
      heroSubtitle="A beeping smoke detector is trying to tell you something. This guide explains every type of beep — low battery, end of life, false alarm — what to do step by step, and when you need an electrician."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Smoke Detector Beeping"
      relatedPages={relatedPages}
      ctaHeading="Document Fire Detection Systems on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for fire alarm certificates, BS 5839-6 compliance, and professional documentation. 7-day free trial, cancel anytime."
    />
  );
}
