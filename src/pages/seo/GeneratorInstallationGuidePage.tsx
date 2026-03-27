import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  AlertTriangle,
  Shield,
  Settings,
  FileCheck2,
  Activity,
  Building2,
  Clock,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Industrial Guides', href: '/industrial-electrical-installation' },
  { label: 'Generator Installation Guide', href: '/generator-installation-guide' },
];

const tocItems = [
  { id: 'standby-vs-prime', label: 'Standby vs Prime Power' },
  { id: 'automatic-transfer-switch', label: 'Automatic Transfer Switch (ATS)' },
  { id: 'manual-changeover', label: 'Manual Changeover Switch' },
  { id: 'dno-requirements', label: 'DNO Requirements (G99)' },
  { id: 'earthing-generator', label: 'Earthing the Generator' },
  { id: 'fuel-storage', label: 'Fuel Storage Regulations' },
  { id: 'testing-maintenance', label: 'Testing and Maintenance' },
  { id: 'load-bank-testing', label: 'Load Bank Testing' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Standby generators must never be connected in parallel with the mains supply without an approved isolation/changeover system — simultaneous connection causes phase opposition and can injure DNO personnel working on the network.',
  'An Automatic Transfer Switch (ATS) monitors the mains supply and automatically starts the generator and transfers the load within seconds of a mains failure — the switchover time depends on the engine start time (typically 10–30 seconds).',
  'Engineering Recommendation G99 applies to any generator connected to the distribution network that exports power (above 16 A per phase) — G99 mandates loss of mains (LoM) protection, anti-islanding, and DNO approval before connection.',
  'Generator earthing in a TN-S installation uses a separate earth electrode at the generator, with the generator neutral bonded to the electrode — the generator is not bonded to the site mains earth when operating in island mode.',
  'Diesel fuel storage above 1,500 litres requires Planning Permission and must comply with the Control of Pollution (Oil Storage) (England) Regulations 2001, including a secondary containment bund sized for 110% of the largest tank volume.',
  'Load bank testing at 100% rated load for a minimum of 2 hours annually verifies generator performance and burns off wet stacking deposits in diesel engines running on light load during routine weekly tests.',
];

const faqs = [
  {
    question: 'What is the difference between a standby generator and a prime power generator?',
    answer:
      'A standby generator is designed to provide temporary power during mains failures. It is rated for standby power (kVA/kW standby rating) which assumes the generator runs for a maximum of 200 hours per year, with typical average loads of 70–80% of standby rating. A prime power generator is designed for continuous operation as the primary source of power (e.g., off-grid sites, events, construction). It is rated for prime power (a lower kVA/kW rating than the same physical generator in standby mode) and can run continuously at 70–80% of prime rating, with brief peaks to the prime rating. Never operate a standby-rated generator continuously at high load — it will overheat and fail prematurely.',
  },
  {
    question: 'How long does an automatic transfer switch take to restore power?',
    answer:
      'The total changeover time depends on three components: the time for the ATS controller to detect the mains failure (typically 2–10 seconds, configurable), the engine start and warm-up time (typically 10–30 seconds for a diesel engine to reach stable voltage and frequency), and the transfer time (typically less than 1 second for the changeover contactors to operate). Total switchover time from mains failure to generator supply is therefore typically 15–45 seconds. For critical loads (data centres, hospitals, operating theatres), a UPS (Uninterruptible Power Supply) bridges this gap. On return of the mains supply, the ATS retransfers the load back to mains (typically after a 30–300 second stability timer confirms the mains has stabilised).',
  },
  {
    question: 'When does Engineering Recommendation G99 apply to a generator installation?',
    answer:
      'ER G99 applies to any generator connected to the distribution network that can export electricity to the network. The trigger threshold is above 16 A per phase (approximately 3.68 kW single phase, 11 kW three phase). Even a generator that is only intended for standby use (not for export) may need G99 compliance if it is connected to the mains in a way that could inadvertently export. Generators operating only in island mode (completely disconnected from the mains during generator operation, confirmed by a break-before-make changeover switch or interlocked ATS) do not require G99. However, generators connected via a static transfer switch that can operate in parallel with the mains, even briefly, require G99 notification and compliance.',
  },
  {
    question: 'How should a standby generator be earthed?',
    answer:
      'A standby generator operating in island mode (disconnected from the mains) should be earthed using a TN-S arrangement: the generator neutral is connected to a local earth electrode at the generator, and a protective earth conductor is run from this electrode to the changeover panel and connected to the installation PE conductors. The generator earth must not be bonded to the mains earth (via the MET) while the generator is operating in island mode — bonding the two earth systems together when the mains neutral is not present can create hazardous voltage between the two earth systems. The ATS wiring should include switching or interlock to manage the earthing. In practice, modern four-pole ATS (which switches neutral as well as the three phases) provides a clean solution for generator earthing.',
  },
  {
    question: 'What are the regulations for diesel fuel storage with a generator?',
    answer:
      'Diesel fuel storage for generators in England is regulated by the Control of Pollution (Oil Storage) (England) Regulations 2001 (for above-ground storage above 200 litres at non-domestic premises). Requirements include: a secondary containment bund with a capacity of at least 110% of the largest tank, or 25% of the total volume of all tanks (whichever is greater); bund must be impermeable, resistant to oil, and strong enough to retain oil in a leak; the bund must not have a drain valve that can be opened accidentally; tanks must be structurally sound and clearly labelled. Above 1,500 litres, Planning Permission is typically required. Above 3,000 litres in an SSSI or near a watercourse, additional Environment Agency guidance applies. Scotland has similar but separate regulations.',
  },
  {
    question: 'What is wet stacking in a diesel generator and how is it prevented?',
    answer:
      'Wet stacking occurs when a diesel engine is run for extended periods at very low load (typically below 30% of rated output). At low load, the engine does not reach full operating temperature, combustion is incomplete, and unburnt fuel and carbon deposits accumulate in the exhaust system, turbocharger, and cylinder walls. This reduces engine efficiency, increases fuel consumption, and can cause engine damage over time. Wet stacking is particularly common in standby generators that are only test-run at no-load or light load once a week. Prevention: run the generator at a minimum of 75% rated load during monthly or quarterly test runs, using a load bank if the connected site load is insufficient. Annual load bank testing at 100% rated load for 2 hours burns off wet stacking deposits.',
  },
  {
    question: 'What is the recommended maintenance schedule for a diesel standby generator?',
    answer:
      'A typical maintenance schedule for a diesel standby generator: weekly — automated self-test run (no-load, 15 minutes, log any alarms); monthly — manual test run under load if possible, check coolant level, battery electrolyte, fuel level, oil level, visual inspection; quarterly — oil and filter change (or per manufacturer hours — typically every 250 hours or 12 months whichever first), air filter inspection, coolant system inspection, fuel filter inspection, battery load test, exerciser clock setting; annually — full service per manufacturer schedule, load bank test at rated load for 2 hours, cooling system flush and inhibitor change, transfer switch operation test, ATEX inspection if in hazardous area. All maintenance should be recorded in a generator log.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/industrial-earthing-systems',
    title: 'Industrial Earthing Systems',
    description: 'TN-S, TN-C-S, and TT earthing for industrial premises, EMC earthing, and testing.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/transformer-installation-guide',
    title: 'Transformer Installation Guide',
    description: 'Oil-filled vs dry-type transformers, DNO notification, commissioning, and maintenance.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/power-factor-correction',
    title: 'Power Factor Correction',
    description: 'Capacitor banks, harmonic detuning, and payback calculation for industrial users.',
    icon: Activity,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-installation-certificate',
    title: 'Electrical Installation Certificate',
    description: 'Complete EICs on your phone and export PDF instantly for generator installations.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'standby-vs-prime',
    heading: 'Standby Power vs Prime Power: Choosing the Right Generator',
    content: (
      <>
        <p>
          The first step in any generator installation project is correctly specifying whether
          a standby or prime power machine is required. Specifying a standby-rated generator
          for an application that requires continuous running will result in premature failure
          and will almost certainly void the manufacturer's warranty. Standby generators are
          rated for limited annual hours at 100% load; prime power generators are rated for
          continuous operation.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standby power rating (ESP)</strong> — the output available for the
                duration of a power outage, typically assumed as no more than 200 hours per year.
                Average load should not exceed 70% of standby rating. No overload rating is
                available. Suitable for emergency power backup in commercial and industrial
                premises.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Prime power rating (PRP)</strong> — the maximum output available for
                continuous operation with a variable load. Prime rating is typically 80–90% of
                standby rating from the same physical generator. Suitable for off-grid sites,
                temporary power, events, and peak shaving installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Continuous power rating (COP)</strong> — the maximum output for
                unlimited hours at 100% load with no variable load capability. The lowest
                rating for a given engine. Suitable for base load generation and industrial
                power plant where the generator runs continuously at a constant output.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Load assessment</strong> — before specifying generator kVA, calculate the
                maximum coincident demand including motor starting (which can draw 6–8× running
                current). The generator must maintain stable voltage and frequency during the
                largest motor start. Generator sets are typically selected to be at least 1.5×
                the largest motor starting kVA to maintain voltage above 80% during starting.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'automatic-transfer-switch',
    heading: 'Automatic Transfer Switch (ATS)',
    content: (
      <>
        <p>
          An Automatic Transfer Switch (ATS) continuously monitors the mains supply voltage and
          frequency. On detection of a mains failure, the ATS sends a start signal to the
          generator, waits for the generator to reach stable voltage and frequency, then transfers
          the load from mains to generator. On mains restoration, the ATS retransfers the load
          back to mains after a stability timer has confirmed the mains supply has recovered.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Open transition ATS</strong> — the most common type. Load is disconnected
                from the mains before being connected to the generator (break-before-make). There
                is a brief interruption (typically less than 100 ms for the transfer contactor
                operation) plus the generator start time. Suitable for most commercial and
                industrial applications.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Closed transition ATS</strong> — the generator is synchronised to the
                mains supply (matched voltage, frequency, and phase angle) before the transfer,
                allowing a make-before-break transfer with zero interruption. Used for critical
                loads that cannot tolerate any interruption. Requires G99 compliance as the
                generator is momentarily paralleled with the mains.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-pole vs three-pole ATS</strong> — a four-pole ATS switches neutral
                as well as the three phases. This is required where the generator has a separate
                earth (TN-S) to prevent the mains neutral and generator neutral being connected
                together during the transfer, which would create a neutral-to-neutral current
                path. A three-pole ATS leaves the neutral connected to the mains throughout,
                which is only safe if the generator neutral is bonded to the same earth as the
                mains.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mains monitoring</strong> — the ATS controller monitors voltage on all
                three phases (configurable thresholds, typically trip below 85% and above 110%
                of nominal voltage), frequency (typically trip below 47.5 Hz or above 52 Hz),
                and optionally phase rotation. The mains failure detection time is configurable
                — a delay of 2–5 seconds prevents nuisance starts from brief transients.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'manual-changeover',
    heading: 'Manual Changeover Switch',
    content: (
      <>
        <p>
          Where automatic starting is not required or practical, a manual changeover switch
          (also called a generator changeover switch or transfer switch) provides a safe means
          of connecting a generator to the installation while ensuring that the mains and generator
          supplies can never be connected simultaneously. Manual changeover is common for smaller
          installations, domestic standby, and rental generator connections.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Break-before-make operation</strong> — the changeover switch must have
                a centre-off position (Mains — Off — Generator) or a mechanical interlock that
                positively prevents both mains and generator being connected simultaneously.
                Never use two separate isolators as a changeover arrangement — there is no
                guarantee both cannot be closed at the same time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rating</strong> — the changeover switch must be rated for the full
                prospective load current on both the mains and generator sides. Use a purpose-
                made generator changeover switch (e.g., from Socomec, ABB, Lewden), not a
                general-purpose isolator or double-pole switch. The switch must be AC-23 rated
                (motor load switching) if motor loads are connected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Temporary generator connections</strong> — temporary connections to
                rental generators (via a Ceeform inlet or MK7 inlet connector) must use a
                purpose-made changeover panel, not a trailing lead plugged into an existing
                socket outlet. The inlet connector must be lockable and protected from
                accidental contact when not in use.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Notification and labelling</strong> — the changeover panel must be
                clearly labelled to indicate the mains and generator positions and the
                changeover procedure. The generator connection point and the changeover switch
                must be included in the EICR inspection scope. The presence of a generator
                changeover must be noted in the Electrical Installation Certificate.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dno-requirements',
    heading: 'DNO Requirements: Engineering Recommendation G99',
    content: (
      <>
        <p>
          Engineering Recommendation G99 (Requirements for the Connection of Generation Equipment
          in Parallel with Public Distribution Networks Operated by Distribution Network Operators)
          governs the connection of all generators above 16 A per phase (approximately 11 kW
          three-phase) that are capable of operating in parallel with the mains supply. Compliance
          with G99 is a legal requirement under the Electricity Safety, Quality and Continuity
          Regulations 2002 (ESQCR) and must be achieved before connection.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Loss of mains (LoM) protection</strong> — G99 requires that generators
                above the threshold are fitted with loss of mains detection to disconnect from
                the network if the mains supply fails (anti-islanding protection). The generator
                must not continue to supply the network when mains power has been lost, as this
                creates a hazard for DNO staff working on the network under the belief that it
                is de-energised.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Frequency and voltage protection</strong> — G99 specifies minimum
                operating frequency and voltage ranges (Stage 1: 47.5–52 Hz, +10%/−15% voltage;
                Stage 2: 47.0–52 Hz, +10%/−20% voltage for Type A generators). Generators
                must automatically disconnect if operating conditions fall outside these ranges.
                Protection relay settings must be agreed with the DNO as part of the G99
                application.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Application process</strong> — submit a G99 connection application to
                the DNO before installation. The DNO assesses the impact on the network and
                provides connection conditions (protection relay settings, power factor
                requirements, monitoring requirements). The connection cannot be energised
                until the DNO has issued a connection agreement. Commissioning of the protection
                system must be witnessed or verified by the DNO or their representative.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Island mode generators — G99 applicability</strong> — a generator that
                only operates in island mode (no electrical connection to the mains at any time
                during operation, achieved by an interlocked break-before-make changeover switch)
                does not export to the network and does not require G99 compliance. The
                changeover interlock must be robust — a simultaneous connection, even briefly,
                brings G99 into scope.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'earthing-generator',
    heading: 'Earthing the Generator (TN-S Separate Earth)',
    content: (
      <>
        <p>
          Generator earthing requires careful design to ensure safe operation both when the
          generator is running in island mode (mains disconnected) and during changeover. The
          earthing approach depends on whether the ATS is three-pole or four-pole, and on the
          site mains earthing system (TN-S, TN-C-S, or TT).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Generator earth electrode</strong> — the generator neutral is connected
                to a local earth electrode sited near the generator (typically a driven copper-
                clad rod or a ring electrode). The electrode resistance must be low enough to
                allow earth fault protection to operate — typically less than 1 Ω for HV and
                less than 10 Ω for LV generators. The generator earth must be tested at
                commissioning.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-pole ATS earthing</strong> — with a four-pole ATS, the neutral
                is switched between mains and generator. When on mains, the installation neutral
                is connected to the mains PEN (TN-C-S) or mains neutral (TN-S). When on
                generator, the installation neutral is connected to the generator neutral.
                The generator neutral is bonded to the generator earth electrode via a removable
                link that is only closed when the generator is selected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-pole ATS earthing</strong> — with a three-pole ATS, the neutral
                remains permanently connected to the mains PEN terminal. The generator neutral
                is also connected to this same neutral bar. This is acceptable where both the
                mains and generator use the same earth (common on sites with private HV/LV
                substation where the generator shares the transformer earth). Not suitable
                where the generator has a separate independent earth.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>PME and generators</strong> — connecting a generator to a site with
                a TN-C-S (PME) supply requires special consideration. The generator neutral
                must not be bonded to the PME earth when operating in island mode, as the
                generator neutral voltage under unbalanced load would cause current to flow
                through the PME earth network. Consult the DNO earthing requirements and
                follow IET Guidance Note 7 (Special Locations) Section 3.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'fuel-storage',
    heading: 'Fuel Storage Regulations',
    content: (
      <>
        <p>
          Diesel fuel storage for generators is regulated in England primarily by the Control of
          Pollution (Oil Storage) (England) Regulations 2001 (for storage above 200 litres at
          non-domestic premises). Additional requirements apply for large storage volumes and
          storage near watercourses. Non-compliance can result in Environment Agency prosecution
          and significant clean-up costs if a fuel spill reaches a watercourse.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Secondary containment bund</strong> — must contain at least 110% of the
                capacity of the largest tank, or 25% of the total capacity of all tanks,
                whichever is greater. Bund must be impermeable to oil and water, resistant to
                attack by the stored oil, and strong enough to retain oil under all foreseeable
                conditions. The bund must not have a drain valve that is left open.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pipework and valves</strong> — all fill points must be within the
                bunded area or have a drip tray. Vent pipes must discharge safely. Sight
                gauges must be fitted with automatic shut-off valves. Fuel transfer pipes
                must be secure and where possible run above ground for visual inspection.
                Underground pipework must be double-skinned with leak detection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Planning permission threshold</strong> — diesel storage above 1,500 litres
                typically requires Planning Permission as permitted development rights do not
                extend to oil storage above this volume in most commercial and industrial
                situations. Check with the local planning authority before installing a large
                base tank.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire safety</strong> — diesel (Class C2 liquid, flash point above 55°C)
                has a relatively high flash point and is less volatile than petrol, but storage
                areas must still have adequate ventilation, no ignition sources, appropriate
                signage, and fire extinguishers. The generator room should have fire detection
                and, for large installations, automatic suppression.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'testing-maintenance',
    heading: 'Testing and Maintenance Schedule',
    content: (
      <>
        <p>
          Standby generators that are never tested cannot be relied upon when needed. A structured
          testing and maintenance regime is required under the Electricity at Work Regulations
          1989 (which require all electrical equipment to be maintained to prevent danger),
          and is typically a condition of the building insurance policy and business continuity
          planning for critical facilities.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Weekly automated test</strong> — modern ATS controllers include a
                programmable exerciser clock that starts and runs the generator for 15–30
                minutes once a week (typically at a low-impact time such as Saturday morning).
                This confirms the engine starts, oil pressure builds, and coolant temperature
                is normal. Results are logged. Alarms must be reviewed promptly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Monthly mains failure simulation test</strong> — physically simulate
                a mains failure (by opening the mains incomer) and verify the ATS operates
                correctly, the generator starts and reaches stable output, and the transfer
                occurs within the specified time. Then restore mains and verify the retransfer
                to mains. Record switchover times and voltage/frequency at transfer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Quarterly service</strong> — check engine oil level, coolant level and
                inhibitor concentration, battery state of charge and electrolyte level (flooded
                lead-acid), fuel level, fuel contamination (diesel bug), belt tension, and
                all fluid hoses. Run the generator under available building load for at least
                30 minutes. Change the oil filter and fuel filter per the engine manufacturer's
                hours-based schedule.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual service and load bank test</strong> — full engine service per
                manufacturer schedule, alternator insulation resistance test, ATS protection
                relay secondary injection test (confirm trip settings), fuel system inspection,
                load bank test at 100% rated load for minimum 2 hours. All results recorded
                in the generator maintenance log and compared to previous results for trending.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'load-bank-testing',
    heading: 'Load Bank Testing',
    content: (
      <>
        <p>
          Load bank testing applies a known resistive or resistive-inductive load to the generator
          to verify its rated output under controlled conditions. A dedicated portable load bank
          (resistive load units connected to the generator output) is used where the site load
          is insufficient or unavailable during the test. Load bank testing is the definitive
          verification of generator performance and is essential for burning off wet stacking
          deposits.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step loading protocol</strong> — apply load in steps: 25%, 50%, 75%,
                100% of rated kW. Allow voltage and frequency to stabilise at each step (typically
                5 minutes) before increasing. Record voltage, frequency, current (all three phases),
                coolant temperature, oil pressure, exhaust temperature, and fuel consumption at
                each step. This detects derating issues (overloaded cooling system, fuel starvation)
                that would not be apparent at light load.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>100% load duration</strong> — maintain 100% rated load for a minimum
                of 2 hours. This verifies the cooling system can sustain full-load operation
                and allows wet stacking deposits to burn off from the exhaust system. Coolant
                temperature should reach and maintain its normal operating temperature (typically
                82–90°C for modern diesel engines).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Transient response test</strong> — apply a step load change from 0% to
                at least 60% of rated load in a single step and record voltage and frequency
                dip and recovery time. Compare with the generator manufacturer's specification
                (typically voltage recovery within 10% dip in less than 3 seconds, frequency
                recovery within 2% in less than 5 seconds). Poor transient response indicates
                governor or AVR problems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Load bank connection</strong> — connect the load bank at the generator
                output terminals (or at the ATS generator bus when the ATS is in generator
                position and the building load is disconnected). Ensure the load bank is
                correctly rated and that the connection cables are sized for the full test
                current. Use temporary cable protection (rubber ramp covers or cable bridges)
                where cables cross access routes.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Generator Installation Certification',
    content: (
      <>
        <p>
          Generator installation work — including ATS panels, changeover switches, cable
          installation, and earthing — requires an Electrical Installation Certificate under
          BS 7671. Where a G99 connection is made, the commissioning of the G99 protection relay
          must be documented and a copy provided to the DNO. The EIC must note the presence
          of a generator and confirm that the changeover arrangement prevents simultaneous
          connection of mains and generator.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete the EIC on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-installation-certificate">
                    Elec-Mate EIC app
                  </SEOInternalLink>{' '}
                  to record generator installation test results — earth electrode resistance,
                  insulation resistance, loop impedance, ATS transfer time — and complete the
                  Electrical Installation Certificate on your phone. Export a professional PDF
                  certificate before you leave site, including notes on the G99 connection if applicable.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Certificate generator installations with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for on-site EIC completion, generator commissioning records, and instant PDF export. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function GeneratorInstallationGuidePage() {
  return (
    <GuideTemplate
      title="Generator Installation Guide UK | Standby Generator Electrical"
      description="Complete guide to standby generator installation in the UK. ATS and manual changeover switches, G99 DNO requirements, generator earthing, fuel storage regulations, testing schedules, and load bank testing for commercial and industrial generators."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Industrial Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Generator Installation Guide UK:{' '}
          <span className="text-yellow-400">Standby Generator Electrical</span>
        </>
      }
      heroSubtitle="Everything UK electricians need to know about standby generator installation — standby vs prime power ratings, automatic transfer switches, manual changeover, G99 DNO requirements, generator earthing in TN-S systems, fuel storage regulations, testing schedules, and load bank testing."
      readingTime={16}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Generator Installation"
      relatedPages={relatedPages}
      ctaHeading="Complete Generator Installation EICs on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site electrical installation certification, commissioning test records, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
