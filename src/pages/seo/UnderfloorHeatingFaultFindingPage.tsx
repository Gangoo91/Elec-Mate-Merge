import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  Wrench,
  PoundSterling,
  ShieldCheck,
  Zap,
  ThermometerSun,
  FileCheck2,
  Gauge,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Fault Finding Guides', href: '/guides/fault-finding' },
  { label: 'Underfloor Heating Fault Finding', href: '/underfloor-heating-fault-finding' },
];

const tocItems = [
  { id: 'how-it-works', label: 'How Electric UFH Works' },
  { id: 'safe-isolation', label: 'Safe Isolation First' },
  { id: 'thermostat-faults', label: 'Thermostat Faults' },
  { id: 'sensor-issues', label: 'Floor Sensor Issues' },
  { id: 'damaged-mat', label: 'Damaged Heating Mat' },
  { id: 'ir-testing', label: 'Insulation Resistance Testing' },
  { id: 'repair-costs', label: 'Repair & Replacement Costs' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The thermostat is the most common cause of electric underfloor heating not working — it is also the easiest and cheapest component to replace, typically costing £60 to £150 fitted.',
  'The floor temperature sensor is a separate NTC (negative temperature coefficient) thermistor probe buried in the floor screed. Sensor failure causes inaccurate temperature readings or complete heating failure, and the sensor can usually be replaced via the thermostat back-box without lifting the floor.',
  'A damaged heating mat requires insulation resistance testing with a 500V DC test to identify whether the mat has failed. A healthy mat reads above 20MΩ; below 1MΩ indicates a fault requiring mat replacement.',
  'Heating mat damage during floor installation (tile laying, floor board fixing) is the most common cause of mat failure. Protect the mat by testing resistance before and after each floor covering stage.',
  'Replacing a damaged heating mat requires lifting the entire floor covering and screed, making it the most expensive UFH repair — typically £500 to £2,000 depending on room size and floor type.',
];

const faqs = [
  {
    question: 'Why is my electric underfloor heating not working?',
    answer:
      'The most common causes in order of frequency are: failed thermostat, failed floor sensor, programming error on the thermostat, tripped MCB or RCD, and damaged heating mat. Start by checking the thermostat display is showing the correct time and schedule, then check the consumer unit. If the circuit breaker has tripped, reset it and monitor. If the floor remains cold after a full heating cycle (allow 4 to 6 hours), call a qualified electrician to test the mat resistance and thermostat.',
  },
  {
    question: 'How do I test my underfloor heating mat resistance?',
    answer:
      'After safe isolation of the UFH circuit, disconnect the heating mat leads from the thermostat back-box. Using a multifunction tester set to ohms, measure the resistance between the two mat conductors. Compare the reading against the value stated on the mat label or installation certificate — it should be within 10% of the stated value. Then set the tester to 500V DC insulation resistance and measure between each conductor and the mat screen (earth). A healthy mat reads above 20MΩ. Below 1MΩ indicates damaged insulation requiring further investigation.',
  },
  {
    question: 'Can I replace the thermostat on my underfloor heating myself?',
    answer:
      'In England and Wales, replacing a like-for-like thermostat in a room other than a bathroom is not notifiable under Part P Building Regulations, provided the heating circuit itself is not modified. However, thermostat replacement involves working on the wiring at the back-box, which requires competence with electrical work. If the UFH circuit is in a bathroom or shower room, replacement is notifiable. We recommend using a qualified electrician to ensure the replacement thermostat is correctly programmed and the sensor is functioning.',
  },
  {
    question: 'How long does electric underfloor heating take to warm up?',
    answer:
      'Electric UFH under ceramic or porcelain tiles typically takes 30 to 60 minutes to reach set temperature. Under stone it can take 90 minutes. Under timber or vinyl it heats faster — typically 20 to 40 minutes. If the floor feels cool after the scheduled heating period has run for longer than these timescales, the system has a fault. Note that newly installed UFH in freshly laid screed should not be operated at full temperature for the first 4 weeks — a gradual commissioning programme must be followed to allow the screed to cure correctly.',
  },
  {
    question: 'My underfloor heating trips the RCD — what does this mean?',
    answer:
      'RCD tripping from a UFH circuit indicates current is leaking to earth. This almost always means the heating mat insulation has been damaged — either during floor installation (most common), by a nail or screw penetrating the cable, or by age and thermal cycling. An electrician must perform insulation resistance testing to confirm the mat has failed. A tripping RCD is a genuine electrical fault — do not continue resetting and using the system.',
  },
  {
    question: 'What is the floor sensor and why does it matter?',
    answer:
      'The floor sensor is an NTC thermistor probe, typically 4mm diameter and 1.5 to 2 metres long, that is laid in the floor screed between the heating cables during installation. It measures the actual floor temperature and feeds this information to the thermostat, preventing the floor from overheating. If the sensor fails (reads open circuit or short circuit), the thermostat typically displays an error code and may disable the heating as a safety measure. Most sensors are replaceable via the thermostat back-box without lifting the floor.',
  },
  {
    question: 'How much does it cost to replace an underfloor heating mat?',
    answer:
      'Heating mat replacement requires lifting the floor covering and the tile adhesive or screed layer, replacing the mat, re-screeding or re-laying adhesive, and re-laying the floor covering. The total cost for a typical bathroom (4 to 6 square metres) is £500 to £1,000. A larger kitchen or living room (15 to 25 square metres) costs £1,200 to £2,500 or more depending on the floor type. The electrical work element is a small proportion — the major cost is the floor covering and screed work.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/immersion-heater-fault-finding',
    title: 'Immersion Heater Fault Finding',
    description: 'Thermostat failure, element burn-out, anode checks, and repair costs.',
    icon: ThermometerSun,
    category: 'Fault Finding',
  },
  {
    href: '/electric-shower-fault-finding',
    title: 'Electric Shower Fault Finding',
    description: 'RCD tripping, heating element failure, flow switch faults, and repair costs.',
    icon: Zap,
    category: 'Fault Finding',
  },
  {
    href: '/guides/electrical-safety-check',
    title: 'Electrical Safety Check Guide',
    description: 'When to get an electrical installation checked and what is tested.',
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
    id: 'how-it-works',
    heading: 'How Electric Underfloor Heating Works',
    content: (
      <>
        <p>
          Electric underfloor heating (UFH) uses a resistance heating cable or mat laid beneath the
          floor covering to warm the floor surface from below. Unlike wet underfloor heating (which
          circulates heated water through pipes), electric UFH is entirely electrical and has no
          moving parts — making it highly reliable when correctly installed and protected.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ThermometerSun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heating mat or cable</strong> — a resistance cable woven into a fibreglass
                mesh mat, or a single twin-conductor cable laid in a serpentine pattern. The cable
                converts electrical energy to heat by resistance. Mats are rated in watts per square
                metre — typically 100 to 200W/m². A standard bathroom mat rated 150W/m² covering 4m²
                draws 600W.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ThermometerSun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thermostat</strong> — controls the heating schedule and set temperature.
                Most modern thermostats have a digital display, programmable weekly schedule, and
                dual-sensor control (air temperature and floor temperature). The thermostat is the
                most frequently replaced UFH component.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ThermometerSun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Floor sensor</strong> — an NTC thermistor probe buried in the floor during
                installation. Measures the actual floor temperature to prevent overheating and
                protect floor coverings. The thermostat uses this reading alongside (or instead of)
                the air temperature sensor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ThermometerSun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated circuit</strong> — the UFH system is fed from a dedicated radial
                circuit at the consumer unit, usually protected by a 6A or 10A MCB and an RCD.
                Larger systems may be on a 16A or 20A circuit. The thermostat is the switching
                device — it connects and disconnects the mat as required.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Most domestic electric UFH systems operate at 230V. The heating mat is a Class II
          (double-insulated) appliance in the floor but must be earthed via a screen conductor. The
          thermostat back-box contains the circuit connections and sensor wiring.
        </p>
      </>
    ),
  },
  {
    id: 'safe-isolation',
    heading: 'Safe Isolation Before Any Work',
    content: (
      <>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
            <div className="space-y-2 text-white">
              <p className="font-bold text-lg">Isolate before opening the thermostat back-box</p>
              <p>
                The thermostat back-box contains 230V live conductors connected directly to the
                heating mat. Always isolate at the consumer unit and prove dead at the back-box
                terminals before touching any wiring.
              </p>
            </div>
          </div>
        </div>
        <p>For UFH fault finding and thermostat replacement, isolation is straightforward:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-none">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400 text-sm font-bold">
                1
              </span>
              <span>
                <strong>Identify the UFH circuit at the consumer unit</strong> — it is usually
                labelled "Underfloor Heating," "UFH," or the room name. Switch off the MCB.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400 text-sm font-bold">
                2
              </span>
              <span>
                <strong>Remove the thermostat front plate</strong> — the front plate clips or screws
                off the back-box. The back-box remains fixed to the wall and contains the wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400 text-sm font-bold">
                3
              </span>
              <span>
                <strong>Prove dead at the back-box terminals</strong> — test with a GS38-compliant
                voltage indicator between L and N, L and E, and N and E. Only proceed when all tests
                confirm dead.
              </span>
            </li>
          </ol>
        </div>
      </>
    ),
  },
  {
    id: 'thermostat-faults',
    heading: 'Thermostat Faults',
    content: (
      <>
        <p>
          The thermostat is the most common cause of electric underfloor heating not working. It is
          also the easiest and most cost-effective component to replace. Before diagnosing a
          thermostat fault, check the programming — many apparent faults are simply incorrect
          schedule settings or a thermostat that has lost its programme after a power cut.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check the schedule and set temperature</strong> — the thermostat must be
                programmed to a heating period that covers the current time. The set temperature
                must be above the current floor or air temperature for the heater to activate. Check
                the current time on the thermostat is correct — many thermostats lose the time after
                a power interruption and default to 00:00.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Error codes</strong> — modern thermostats display error codes on the screen
                when a fault is detected. Common codes are: E1 or E2 (floor sensor fault), E3 (air
                sensor fault), Hi (floor overtemperature). Refer to the thermostat manual for the
                specific code meaning. E1/E2 codes mean the sensor must be tested or replaced.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Relay failure</strong> — inside the thermostat, a relay switches the mat
                circuit on and off. A failed relay (either stuck open or stuck closed) can cause no
                heat or continuous heat regardless of the set temperature. After safe isolation, the
                thermostat can be bypassed by connecting the supply live directly to the mat live —
                if the mat heats, the relay in the thermostat has failed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thermostat replacement</strong> — replacement thermostats are widely
                available and most brands follow a standard wiring layout (L, N, E supply; L, N load
                to mat; sensor terminals). Always record the existing wiring connections with a
                photograph before disconnecting. The replacement thermostat must be compatible with
                the mat wattage and the sensor type (NTC 10kΩ or 12kΩ depending on the
                manufacturer).
              </span>
            </li>
          </ul>
        </div>
        <p>
          Thermostat replacement costs £60 to £150 all-in (thermostat £30 to £100, labour £30 to £50
          for a straightforward like-for-like replacement). If the replacement thermostat is in a
          bathroom, the work is notifiable under Part P and an{' '}
          <SEOInternalLink href="/tools/minor-works-certificate">
            Minor Electrical Installation Works Certificate
          </SEOInternalLink>{' '}
          must be issued.
        </p>
      </>
    ),
  },
  {
    id: 'sensor-issues',
    heading: 'Floor Sensor Issues',
    content: (
      <>
        <p>
          The floor temperature sensor is a critical component that is often overlooked during fault
          finding. Sensor failure is the second most common cause of UFH not working and is
          frequently misdiagnosed as a mat fault.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing the sensor</strong> — after safe isolation, disconnect the sensor
                leads from the thermostat sensor terminals. Measure resistance between the two
                sensor wires with a multimeter set to ohms. A standard NTC 10kΩ sensor reads
                approximately 10,000 ohms at 25°C, decreasing as temperature rises (at 40°C it reads
                approximately 5,800 ohms). An open circuit (OL) means the sensor has failed. A
                reading close to zero means the sensor is shorted. Both require replacement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Replacing the sensor</strong> — the sensor probe sits in a conduit tube laid
                between the heating cables during installation. The conduit tube typically runs back
                to the thermostat back-box, allowing the sensor to be withdrawn and replaced without
                lifting the floor. Pull the old sensor out carefully (the conduit may be a tight fit
                in screed), thread the new sensor in, and reconnect at the thermostat. Replacement
                sensors cost £8 to £25.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sensor not in conduit</strong> — some older installations have the sensor
                laid directly in the screed without a conduit. If the sensor fails in these
                installations, it cannot be replaced without lifting the floor. As a workaround,
                some thermostats can be reconfigured to use air-temperature-only control, removing
                dependence on the floor sensor until the floor is lifted for another reason.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'damaged-mat',
    heading: 'Damaged Heating Mat',
    content: (
      <>
        <p>
          A damaged heating mat is the most serious UFH fault because it almost always requires
          lifting the floor to repair or replace. Mat damage occurs most commonly during floor
          installation — tiles being laid, adhesive being spread, or fixings penetrating the cable.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Common causes of mat damage</strong> — trowelling tile adhesive too
                aggressively, screws or nails penetrating the cable (particularly in timber floor
                installations), heavy tools or equipment dropped on the floor during installation,
                or subsequent fixings drilled through the floor into the cable after installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Symptoms of a damaged mat</strong> — RCD tripping when the heating is
                activated, low insulation resistance between the mat conductors and earth,
                resistance reading significantly different from the stated mat resistance, or
                partial heating (one section of the floor heats but another remains cold).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Locating the damage</strong> — a time-domain reflectometer (TDR) can locate
                a break or fault in the cable by measuring the time taken for a pulse to reflect
                back from the fault. TDR testing is specialist work, but can pinpoint the fault to
                within 0.5 metres, minimising the area of floor that must be lifted. Without TDR,
                the entire mat area must be uncovered to locate the damage.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Prevention is far preferable to cure. Always test mat resistance before and after laying
          tile adhesive, and again after grouting. Record the initial resistance on the installation
          certificate so you have a reference value for future testing.
        </p>
      </>
    ),
  },
  {
    id: 'ir-testing',
    heading: 'Insulation Resistance Testing of the Heating Mat',
    content: (
      <>
        <p>
          Insulation resistance (IR) testing is the definitive test for the condition of a UFH
          heating mat. It should be carried out during installation at each stage, on completion of
          installation, and when a fault is suspected.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test voltage</strong> — 500V DC is the standard test voltage for UFH heating
                cables. Some manufacturers specify 1000V DC for their cables — check the
                installation instructions. Do not exceed the specified test voltage as this can
                damage the cable insulation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test points</strong> — disconnect the mat cold tail from the thermostat
                back-box. Apply the IR test between: (1) the two mat conductors (live and neutral of
                the twin conductor); (2) each mat conductor and the mat screen/earth. All readings
                should be above 20MΩ for a new installation. A reading below 1MΩ indicates a serious
                fault.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Resistance check</strong> — in addition to the IR test, measure the mat
                resistance (ohms) between the two conductors with the tester set to the appropriate
                resistance range. Compare this against the value on the mat label or installation
                certificate. The reading should be within ±10% of the stated value. A significantly
                lower resistance can indicate a partial short; a higher resistance or open circuit
                indicates a break in the conductor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Record the results</strong> — record IR test results on the{' '}
                <SEOInternalLink href="/tools/eicr-certificate">
                  Electrical Installation Certificate
                </SEOInternalLink>{' '}
                or the manufacturer's installation record form. These records are essential if the
                floor is damaged in future and a fault must be assessed against the original
                installation data.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'repair-costs',
    heading: 'Repair & Replacement Costs — 2026 Prices',
    content: (
      <>
        <p>
          UFH repair costs vary enormously depending on whether the fault is in the thermostat,
          sensor, or the mat itself. Here are typical UK costs for 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thermostat replacement</strong> — £60 to £150 all-in. Thermostat £30 to
                £100, labour £30 to £50. Most cost-effective first repair — always start here.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Floor sensor replacement</strong> — £40 to £100 all-in. Sensor £8 to £25,
                labour £30 to £75. Requires the sensor conduit to be accessible from the thermostat
                back-box.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fault finding and IR testing</strong> — £60 to £120 for a diagnosis visit
                including mat resistance and IR testing. This confirms whether the mat has failed
                before committing to the cost of lifting the floor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heating mat replacement — bathroom (4 to 6m²)</strong> — £500 to £1,000
                all-in, including electrical work, lifting and re-laying tiles, and screed repair.
                The mat itself costs £80 to £200. The majority of cost is floor covering work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heating mat replacement — kitchen or living room (15 to 25m²)</strong> —
                £1,200 to £2,500 or more. Under engineered wood or LVT rather than tiles, the
                flooring replacement cost is higher.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If the floor is due to be replaced for other reasons (worn tiles, updated décor),
          combining UFH mat replacement with the floor refurbishment significantly reduces the total
          cost — the floor lifting work is shared between the two projects.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: UFH Work and Certification',
    content: (
      <>
        <p>
          Electric underfloor heating installation is notifiable work under Part P of the Building
          Regulations in England and Wales when installed in a bathroom, shower room, kitchen, or as
          a new circuit in any other location. Thermostat replacement in a non-bathroom room is
          generally not notifiable, but always check the specific installation.
        </p>
        <p>
          The key record for any UFH installation is the mat resistance and insulation resistance at
          each stage of installation. This data, recorded on the Electrical Installation
          Certificate, provides the baseline for all future fault finding and is invaluable if the
          customer reports a fault months or years later.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Record Test Results On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Elec-Mate Electrical Installation Certificate app
                  </SEOInternalLink>{' '}
                  to record mat resistance values, IR test results, and circuit details during
                  installation. The PDF is generated on site and sent to the customer immediately —
                  providing the critical baseline data for future fault finding.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote the Floor Replacement Scope</h4>
                <p className="text-white text-sm leading-relaxed">
                  When diagnosing a mat fault, use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to produce a detailed quote covering the electrical work element. Present it
                  alongside quotes from your preferred tiling contractor so the customer gets a
                  complete picture of the total project cost.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete UFH installation certificates on your phone"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site Electrical Installation Certificates, test result recording, and instant quoting. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function UnderfloorHeatingFaultFindingPage() {
  return (
    <GuideTemplate
      title="Electric Underfloor Heating Not Working | Fault Finding Guide"
      description="Electric underfloor heating fault finding guide for UK homeowners and electricians. Thermostat faults, floor sensor issues, damaged heating mat diagnosis, insulation resistance testing, and 2026 repair costs."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Fault Finding Guide"
      badgeIcon={Wrench}
      heroTitle={
        <>
          Electric Underfloor Heating Not Working:{' '}
          <span className="text-yellow-400">Fault Finding Guide</span>
        </>
      }
      heroSubtitle="Step-by-step fault finding for electric underfloor heating systems — thermostat faults, floor sensor failure, damaged heating mat diagnosis, insulation resistance testing, TDR fault location, and typical repair and replacement costs for 2026."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions — Underfloor Heating Faults"
      relatedPages={relatedPages}
      ctaHeading="Complete Electrical Certificates On Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for Electrical Installation Certificates, test result recording, and on-site quoting. 7-day free trial, cancel anytime."
    />
  );
}
