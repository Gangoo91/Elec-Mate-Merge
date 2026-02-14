import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Lightbulb,
  Clock,
  CheckCircle2,
  FileText,
  ClipboardCheck,
  AlertTriangle,
  Calendar,
  ShieldCheck,
  Building,
  BookOpen,
  Zap,
  Flame,
} from 'lucide-react';

export default function EmergencyLightingTestingPage() {
  return (
    <GuideTemplate
      title="Emergency Lighting Testing | Monthly & Annual Guide"
      description="Complete guide to emergency lighting testing requirements under BS 5266. Covers monthly functional tests, annual 3-hour duration tests, recording results, common failures, and how to maintain compliance throughout the year."
      datePublished="2026-01-10"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Testing', href: '/guides' },
        { label: 'Emergency Lighting Testing', href: '/guides/emergency-lighting-testing' },
      ]}
      tocItems={[
        { id: 'bs5266-overview', label: 'BS 5266 Requirements' },
        { id: 'monthly-test', label: 'Monthly Functional Test' },
        { id: 'annual-test', label: 'Annual 3-Hour Duration Test' },
        { id: 'recording-results', label: 'Recording Results' },
        { id: 'common-failures', label: 'Common Failures' },
        { id: 'maintained-vs-non-maintained', label: 'Maintained vs Non-Maintained' },
        { id: 'how-to', label: 'Step-by-Step Testing' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Guides' },
      ]}
      badge="Guide"
      badgeIcon={Lightbulb}
      heroTitle={
        <>
          Emergency Lighting Testing
          <br />
          <span className="text-yellow-400">Monthly & Annual Guide to BS 5266</span>
        </>
      }
      heroSubtitle="Emergency lighting must be tested regularly to ensure it will function when needed most — during a power failure or fire. BS 5266 requires monthly functional tests and an annual full-duration test. This guide explains exactly what each test involves, how to record results, what to look for, and how to maintain compliance throughout the year."
      readingTime={11}
      keyTakeaways={[
        'BS 5266-1 requires a monthly functional test (brief operation to confirm each luminaire works) and an annual full-duration test (3 hours for escape route lighting, 1 hour for high-risk task area lighting).',
        'Monthly tests should be brief — just long enough to confirm each luminaire illuminates on battery power. The test should not drain the battery significantly, as the system must be ready for a genuine emergency immediately after the test.',
        'The annual 3-hour duration test must run the full rated duration of the batteries to verify they can sustain illumination for the required escape time. Every luminaire must be checked at the end of the 3-hour period.',
        'All test results must be recorded in a logbook — date, time, duration, results for each luminaire, any defects found, and corrective actions taken. This logbook is a legal document that may be inspected by the fire authority.',
        'Self-test emergency luminaires automatically perform monthly and annual tests, recording results internally. This reduces the manual testing burden but does not eliminate it — visual checks and logbook entries are still required.',
      ]}
      sections={[
        {
          id: 'bs5266-overview',
          heading: 'BS 5266 Emergency Lighting Requirements',
          content: (
            <>
              <p>
                BS 5266-1 is the British Standard that covers the emergency lighting of premises. It
                specifies the design, installation, commissioning, and maintenance requirements for
                emergency lighting systems. The standard applies to all non-domestic premises and
                common areas of residential buildings (corridors, stairwells, car parks).
              </p>
              <div className="space-y-4 mt-4">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Purpose of Emergency Lighting</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Emergency lighting serves two critical functions:{' '}
                    <strong className="text-white">escape lighting</strong> illuminates escape
                    routes, exit signs, and safety signs to enable safe evacuation during a mains
                    failure; <strong className="text-white">standby lighting</strong> provides
                    illumination for essential activities to continue (e.g., operating theatres,
                    control rooms). Escape lighting is by far the most common requirement for
                    standard commercial and residential premises.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Duration Requirements</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Escape route emergency lighting must operate for a minimum of{' '}
                    <strong className="text-white">3 hours</strong> in most premises. This can be
                    reduced to <strong className="text-white">1 hour</strong> only where the
                    premises are not used for sleeping and evacuation is expected to be rapid.
                    High-risk task area lighting (areas where specific processes must be safely shut
                    down) must operate for at least <strong className="text-white">1 hour</strong>{' '}
                    or the time required to make the process safe, whichever is longer.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Illumination Levels</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    BS 5266-1 specifies minimum illumination levels:{' '}
                    <strong className="text-white">1 lux</strong> at floor level along the centre
                    line of escape routes (minimum 0.5 lux on the central band),{' '}
                    <strong className="text-white">0.5 lux</strong> in open areas (anti-panic areas)
                    over the entire area excluding a 0.5m border, and{' '}
                    <strong className="text-white">15 lux</strong> at floor level in high-risk task
                    areas. Exit signs must be clearly visible and legible.
                  </p>
                </div>
              </div>
            </>
          ),
        },
        {
          id: 'monthly-test',
          heading: 'Monthly Functional Test',
          content: (
            <>
              <p>
                The monthly functional test is a brief operational check to confirm that every
                emergency luminaire switches on when the mains supply is interrupted. This test
                should take only as long as necessary to verify operation — typically a few seconds
                per luminaire.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">Monthly Test Procedure</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Simulate mains failure</strong> — Use the
                      test switch on each luminaire or the central test facility (if installed) to
                      switch the luminaires to battery operation. On self-contained luminaires, this
                      is usually a key switch or push-button on the unit. On central battery
                      systems, use the test panel.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Check every luminaire illuminates</strong>{' '}
                      — Walk the entire premises and visually confirm that every emergency luminaire
                      and exit sign is illuminated on battery power. Note any that fail to
                      illuminate, illuminate dimly, or flicker.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Check charge indicators</strong> — After
                      restoring mains supply, verify that the charging indicator (usually a green
                      LED) is lit on every self-contained luminaire. A non-functioning charge
                      indicator suggests a battery or charging circuit fault.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Keep the test brief</strong> — The monthly
                      test should last no more than a few minutes of battery operation. Running the
                      batteries for extended periods during monthly tests reduces their available
                      capacity for a genuine emergency. This is why the full-duration test is only
                      performed annually.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                The monthly test should be scheduled at the same time each month. Many facilities
                managers schedule it for the first Monday of each month to ensure regularity. In
                occupied premises, inform building users before testing — occupants may be alarmed
                if the normal lighting suddenly goes off without warning.
              </p>
              <SEOAppBridge
                title="Emergency Lighting Test Log in Elec-Mate"
                description="Elec-Mate's emergency lighting certificate includes built-in monthly test tracking. Record each luminaire's status, flag failures, set reminders for next month's test, and build up a complete 12-month test history — all from your phone on site."
                icon={ClipboardCheck}
              />
            </>
          ),
        },
        {
          id: 'annual-test',
          heading: 'Annual 3-Hour Duration Test',
          content: (
            <>
              <p>
                The annual full-duration test verifies that the batteries in every emergency
                luminaire can sustain illumination for the rated duration — typically 3 hours for
                escape route lighting. This is the most critical test and the one most frequently
                missed or performed incorrectly.
              </p>
              <div className="space-y-3 mt-4">
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    1
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Preparation</h4>
                    <p className="text-white text-sm leading-relaxed">
                      Schedule the test during a period when the building can safely operate with
                      reduced lighting. Inform all building users and occupants. Ensure no other
                      tests (fire alarm, etc.) are scheduled simultaneously. Prepare the test record
                      sheet with all luminaire locations listed.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    2
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Start the Test</h4>
                    <p className="text-white text-sm leading-relaxed">
                      Switch all emergency luminaires to battery operation simultaneously using the
                      test facility. Start a timer. On self-contained systems, each unit must be
                      individually switched to test mode unless a central test switch or automatic
                      test system is installed. On central battery systems, isolate the mains supply
                      to the central battery unit.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    3
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Check at Start and End</h4>
                    <p className="text-white text-sm leading-relaxed">
                      Walk the entire premises at the start of the test and confirm every luminaire
                      is illuminated. Return at the end of the 3-hour period (or 1-hour period for
                      short-duration systems) and check every luminaire again. The critical check is
                      at the end — any luminaire that has failed during the test period indicates a
                      battery at end-of-life or a charging fault.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    4
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Restore and Recharge</h4>
                    <p className="text-white text-sm leading-relaxed">
                      Restore the mains supply to all emergency luminaires. Verify that all charging
                      indicators illuminate. Allow at least 24 hours for full recharge before the
                      system is considered operational again. During the recharge period, the
                      building has reduced emergency lighting capacity — this should be noted in the
                      fire safety management plan.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-white mb-1">Important: Recharge Time</h4>
                    <p className="text-white text-sm leading-relaxed">
                      After the annual 3-hour test, batteries require up to 24 hours to fully
                      recharge. During this period, the emergency lighting system may not provide
                      full duration in a genuine emergency. The{' '}
                      <SEOInternalLink href="/guides/emergency-lighting-certificate">
                        emergency lighting certificate
                      </SEOInternalLink>{' '}
                      should note the date of the annual test so that the responsible person is
                      aware of the reduced capacity during the recharge period.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ),
        },
        {
          id: 'recording-results',
          heading: 'Recording Test Results',
          content: (
            <>
              <p>
                BS 5266-1 requires all test results to be recorded in a logbook. The logbook is a
                legal document that demonstrates compliance with fire safety regulations and may be
                inspected by the fire authority, insurers, or local authority at any time.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">What Must Be Recorded</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Date and time of test</strong> — When the
                      test was carried out and by whom.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Duration of test</strong> — Whether this
                      was a brief monthly functional test or the full annual duration test.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Status of each luminaire</strong> — Pass
                      or fail for every emergency luminaire and exit sign in the building. Use a
                      location reference or numbering system to identify each unit.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Defects found</strong> — Description of
                      any defects (failed luminaire, dim output, damaged diffuser, missing unit,
                      non-functional exit sign).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Corrective actions</strong> — What was
                      done to rectify any defects, and when. If a replacement is needed, note when
                      the replacement was ordered and fitted.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                Many electricians still use paper logbooks, but digital recording offers significant
                advantages — the test history is automatically timestamped, cannot be backdated, is
                backed up to the cloud, and can be shared with the responsible person immediately.
                The{' '}
                <SEOInternalLink href="/guides/emergency-lighting-certificate">
                  emergency lighting certificate
                </SEOInternalLink>{' '}
                forms in Elec-Mate are designed specifically for this purpose.
              </p>
              <SEOAppBridge
                title="Digital Emergency Lighting Logbook"
                description="Elec-Mate replaces the paper logbook with a digital emergency lighting record. Log monthly and annual tests on your phone, tag each luminaire by location, photograph defects, and generate professional BS 5266 reports. The cloud-synced logbook is always available and cannot be lost."
                icon={BookOpen}
              />
            </>
          ),
        },
        {
          id: 'common-failures',
          heading: 'Common Emergency Lighting Failures',
          content: (
            <>
              <p>
                Understanding the most common failure modes helps electricians carry out more
                effective testing and advise building owners on preventive maintenance.
              </p>
              <div className="space-y-4 mt-4">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Battery End-of-Life</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    The most common failure. NiCd batteries in emergency luminaires typically last
                    4-6 years. As batteries age, they lose capacity — the luminaire may illuminate
                    during the monthly test but fail during the annual 3-hour test because the
                    battery can no longer sustain the full duration. This is why the annual test is
                    essential. Replace batteries proactively at 4-year intervals to prevent
                    failures.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Charging Circuit Failure</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    If the mains supply to the emergency luminaire is interrupted (e.g., the
                    lighting circuit breaker has tripped and not been reset), the battery will
                    discharge over days. When the mains supply is eventually restored, the battery
                    may not fully recover. Check the mains supply and charging indicator on every
                    luminaire during monthly tests.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Lamp or LED Failure</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    On older fluorescent emergency luminaires, the tube may fail. On LED units,
                    individual LED failures are less common but can occur, reducing light output
                    below the required minimum. Damaged or yellowed diffusers also reduce light
                    output. Inspect the physical condition of each luminaire during testing.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">
                      Building Changes Affecting Coverage
                    </h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Building modifications — new partitions, changed room layouts, blocked escape
                    routes, additional furniture — can reduce emergency lighting coverage below the
                    required levels even though every luminaire is functioning correctly. Review the
                    emergency lighting layout against the current building configuration at least
                    annually and whenever significant building changes are made.
                  </p>
                </div>
              </div>
            </>
          ),
        },
        {
          id: 'maintained-vs-non-maintained',
          heading: 'Maintained vs Non-Maintained Emergency Lighting',
          content: (
            <>
              <p>
                Emergency luminaires are classified as either maintained or non-maintained,
                depending on whether they operate continuously or only during a mains failure.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <h4 className="font-bold text-white mb-2">Non-Maintained</h4>
                    <p className="text-white text-sm leading-relaxed">
                      The luminaire is off during normal conditions and only illuminates when the
                      mains supply fails. The battery charges continuously while the mains is
                      healthy. This is the most common type for corridors, stairwells, and general
                      escape routes. Non-maintained luminaires are easy to identify during testing —
                      if the light is on when the mains is off, it is working.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                    <h4 className="font-bold text-white mb-2">Maintained</h4>
                    <p className="text-white text-sm leading-relaxed">
                      The luminaire operates continuously — it is on during normal operation
                      (powered by mains) and remains on during a mains failure (powered by battery).
                      Maintained luminaires are required in specific locations: cinemas, theatres,
                      concert halls, and other places of entertainment where the lighting may be
                      deliberately dimmed or extinguished during performances. Maintained exit signs
                      are required in many premises to ensure escape routes are always clearly
                      identified, regardless of the status of other lighting.
                    </p>
                  </div>
                </div>
              </div>
              <p>
                Testing maintained luminaires requires more care because the transition from mains
                to battery may not be visible if the luminaire is already on. Use a lux meter or
                observe closely for any brief flicker or change in light output when switching to
                battery. Some maintained luminaires have a separate LED indicator to show whether
                they are running on mains or battery.
              </p>
              <p>
                The{' '}
                <SEOInternalLink href="/guides/pat-testing-guide-uk">
                  PAT testing guide
                </SEOInternalLink>{' '}
                covers testing requirements for portable appliances, but emergency lighting — as a
                fixed installation — falls under BS 5266 and is tested by an electrician as part of
                the building's fixed installation maintenance, not during PAT testing.
              </p>
            </>
          ),
        },
      ]}
      howToHeading="Emergency Lighting Testing — Step-by-Step"
      howToDescription="How to carry out monthly and annual emergency lighting tests to BS 5266."
      howToSteps={[
        {
          name: 'Prepare the test record and notify building users',
          text: 'Prepare a test record sheet listing every emergency luminaire and exit sign by location reference. Notify building occupants that emergency lighting testing will take place. Check the previous test records to identify any luminaires that have a history of failure.',
        },
        {
          name: 'Simulate mains failure to activate emergency luminaires',
          text: 'For monthly tests: activate the test switch on each luminaire individually, or use the central test facility if installed. For annual tests: isolate the mains supply to all emergency luminaires simultaneously and start a timer. On central battery systems, disconnect the mains supply at the battery unit.',
        },
        {
          name: 'Walk the premises and check every luminaire',
          text: 'Check every emergency luminaire and exit sign in the building. Confirm each is illuminated and providing adequate light output. Note any failures, dim units, damaged diffusers, or obscured signs. For annual tests, repeat the full walk-through at the end of the 3-hour period.',
        },
        {
          name: 'Restore mains and verify charging',
          text: 'Restore mains supply to all luminaires. Check that every charging indicator illuminates. For annual tests, note that 24 hours of recharging is required before the system returns to full capacity.',
        },
        {
          name: 'Record results and arrange repairs',
          text: 'Record the test date, duration, and individual results for every luminaire in the logbook. Report any defects to the responsible person. Arrange replacement of failed batteries or luminaires. Use Elec-Mate to generate the emergency lighting test certificate digitally.',
        },
      ]}
      faqs={[
        {
          question: 'How often should emergency lighting be tested?',
          answer:
            'BS 5266-1 requires monthly functional tests (brief operation to confirm each luminaire illuminates on battery) and an annual full-duration test (3 hours for escape lighting, 1 hour for high-risk task area lighting). The monthly test should be brief — just long enough to confirm operation. The annual test must run for the full rated battery duration. All results must be recorded in a logbook.',
        },
        {
          question: 'Who can test emergency lighting?',
          answer:
            'Monthly functional tests can be carried out by a competent person within the organisation — this does not need to be a qualified electrician. However, the annual full-duration test should be carried out by a competent person with sufficient knowledge of the emergency lighting system, ideally a qualified electrician. The installation, commissioning, and any repair or maintenance work must be carried out by a competent electrician.',
        },
        {
          question: 'What happens if emergency lighting fails the annual test?',
          answer:
            'If any luminaire fails to maintain illumination for the full 3-hour duration, its battery needs replacing. This is the most common cause of annual test failure. Replace the battery (or the entire luminaire if the battery is not user-replaceable) and retest that specific unit after allowing 24 hours for the new battery to fully charge. The defect and corrective action must be recorded in the logbook.',
        },
        {
          question: 'Do self-test emergency lights still need manual testing?',
          answer:
            'Self-test emergency luminaires automatically perform monthly and annual tests and record the results internally (usually via an LED indicator showing pass/fail). However, BS 5266-1 still requires a visual inspection at least monthly to check that the self-test indicators show a pass, that the luminaire is not damaged, and that the light output is adequate. The self-test results should still be recorded in the logbook. Self-test units do not eliminate the need for periodic visual inspection and record-keeping.',
        },
        {
          question: 'How long do emergency lighting batteries last?',
          answer:
            'Standard NiCd (nickel cadmium) batteries in emergency luminaires typically last 4-6 years, depending on the environment and number of test cycles. NiMH batteries may have a shorter life. The annual 3-hour test is the best indicator of battery condition — a battery that passes the annual test one year but fails the next has reached end-of-life and needs replacing. Proactive replacement at 4-year intervals prevents unexpected failures.',
        },
        {
          question: 'Can I use Elec-Mate for emergency lighting testing and certification?',
          answer:
            'Yes. Elec-Mate includes digital emergency lighting certificate forms that cover all BS 5266 requirements. You can record monthly functional tests and annual duration tests on your phone, tag each luminaire by location, photograph defects, and generate professional PDF reports. The cloud-synced logbook maintains a complete test history that can be shared with building owners, fire authorities, and insurers.',
        },
      ]}
      relatedPages={[
        {
          href: '/guides/emergency-lighting-certificate',
          title: 'Emergency Lighting Certificate',
          description: 'How to complete BS 5266 emergency lighting certificates.',
          icon: FileText,
          category: 'Certification',
        },
        {
          href: '/guides/networked-fire-alarm-system',
          title: 'Networked Fire Alarm Systems',
          description: 'Addressable vs conventional fire alarm systems explained.',
          icon: Flame,
          category: 'Guide',
        },
        {
          href: '/guides/fire-alarm-certificate',
          title: 'Fire Alarm Certificate',
          description: 'BS 5839 fire alarm commissioning certificates.',
          icon: ClipboardCheck,
          category: 'Certification',
        },
        {
          href: '/guides/eicr-certificate',
          title: 'EICR Certificate',
          description: 'Electrical installation condition reports for commercial premises.',
          icon: ClipboardCheck,
          category: 'Certification',
        },
        {
          href: '/guides/testing-sequence',
          title: 'Testing Sequence Guide',
          description: 'The correct sequence for all electrical testing procedures.',
          icon: ShieldCheck,
          category: 'Guide',
        },
        {
          href: '/guides/eicr-for-landlords',
          title: 'EICR for Landlords',
          description: 'Landlord responsibilities for emergency lighting in HMOs.',
          icon: Building,
          category: 'Guide',
        },
      ]}
      ctaHeading="Test and Certify Emergency Lighting With Elec-Mate"
      ctaSubheading="Digital emergency lighting certificates, monthly test tracking, annual duration test records, and fire alarm certification — all from your phone on site. 7-day free trial, cancel anytime."
    />
  );
}
