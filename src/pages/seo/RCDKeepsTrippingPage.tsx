import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  AlertTriangle,
  Zap,
  ShieldCheck,
  ClipboardCheck,
  Calculator,
  Activity,
  CheckCircle2,
  Search,
  Wrench,
  Cable,
  FileText,
} from 'lucide-react';

export default function RCDKeepsTrippingPage() {
  return (
    <GuideTemplate
      title="RCD Keeps Tripping | Causes & How to Fix It"
      description="Why does your RCD keep tripping? Expert guide to diagnosing common causes including earth leakage, faulty appliances, moisture ingress, and deteriorated insulation. Learn when it's nuisance tripping vs a genuine fault."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Guides', href: '/guides' },
        { label: 'RCD Keeps Tripping', href: '/guides/rcd-keeps-tripping' },
      ]}
      tocItems={[
        { id: 'why-rcd-trips', label: 'Why Your RCD Keeps Tripping' },
        { id: 'common-causes', label: 'Common Causes' },
        { id: 'nuisance-vs-fault', label: 'Nuisance Tripping vs Genuine Fault' },
        { id: 'how-to-diagnose', label: 'How to Diagnose the Problem' },
        { id: 'rcd-types', label: 'RCD Types and Why They Matter' },
        { id: 'when-to-call', label: 'When to Call an Electrician' },
        { id: 'temporary-measures', label: 'Temporary Measures' },
        { id: 'how-to', label: 'Step-by-Step Diagnosis' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Guides' },
      ]}
      badge="Troubleshooting"
      badgeIcon={AlertTriangle}
      heroTitle={
        <>
          RCD Keeps Tripping?
          <br />
          <span className="text-yellow-400">Causes & How to Fix It</span>
        </>
      }
      heroSubtitle="A tripping RCD is one of the most common electrical faults in UK homes. This guide explains every cause — from a faulty kettle to deteriorated wiring — and walks you through the diagnostic process step by step."
      readingTime={14}
      keyTakeaways={[
        'The most common cause of RCD tripping is earth leakage from a faulty appliance — unplug everything and reconnect one by one to isolate it.',
        'Moisture ingress into external sockets, junction boxes, or light fittings causes earth leakage that trips RCDs, especially in wet weather.',
        'Nuisance tripping (no actual fault) can be caused by cumulative standing leakage from multiple appliances sharing one RCD — upgrading to individual RCBOs solves this.',
        'An insulation resistance test (minimum 1 MΩ at 500V DC) is the definitive way to confirm whether a circuit has deteriorated insulation causing earth leakage.',
        'If the RCD trips immediately on resetting with all appliances disconnected, the fault is in the fixed wiring — call a qualified electrician.',
      ]}
      sections={[
        {
          id: 'why-rcd-trips',
          heading: 'Why Your RCD Keeps Tripping',
          content: (
            <>
              <p>
                A Residual Current Device (RCD) monitors the balance between the current flowing out
                through the live conductor and the current returning through the neutral conductor.
                Under normal conditions, these are equal. If some current leaks to earth — through a
                person, a fault in an appliance, damaged cable insulation, or moisture — the RCD
                detects the imbalance and disconnects the circuit. A standard domestic RCD trips
                when the leakage reaches 30 milliamps (30 mA), which is the threshold considered
                safe enough to prevent fatal electric shock in most circumstances.
              </p>
              <p>
                When an RCD keeps tripping repeatedly, it means current is consistently leaking to
                earth somewhere on the circuits it protects. The challenge is finding <em>where</em>
                . The leakage could be in one of dozens of appliances plugged into the circuit, in
                the fixed wiring behind the walls, in an outdoor fitting exposed to rain, or even in
                the RCD itself. This guide covers every common cause and the systematic process for
                identifying the source.
              </p>
              <p>
                It is important to understand that the RCD is doing its job — it is detecting a
                genuine imbalance and disconnecting to protect you. The temptation to bypass or
                remove the RCD is extremely dangerous and illegal. The correct approach is to find
                and fix the source of the leakage.
              </p>
            </>
          ),
        },
        {
          id: 'common-causes',
          heading: 'Common Causes of RCD Tripping',
          content: (
            <>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">1. Faulty Appliance</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    The single most common cause. An appliance with damaged insulation, a faulty
                    heating element, or a worn motor allows current to leak from the live conductor
                    to the earthed metalwork of the appliance. Kettles, washing machines,
                    dishwashers, tumble dryers, and immersion heaters are the most frequent culprits
                    because they combine electricity with water or heat, both of which degrade
                    insulation over time. The fault may be intermittent — the appliance works fine
                    when cold but develops a leak when the heating element expands, or it only leaks
                    during the spin cycle when vibration moves a damaged cable.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">2. Moisture Ingress</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Water is an excellent conductor. When moisture gets into an electrical enclosure
                    — an outdoor socket, a junction box in the loft, a bathroom light fitting, or a
                    garden lighting connection — it creates a path for current to leak to earth.
                    This is particularly common after heavy rain, when condensation builds up in
                    cold weather, or when a bathroom extractor fan seal has failed. The tripping
                    pattern often correlates with weather conditions: the RCD trips during or after
                    rain, then stays on during dry spells.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Cable className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">
                      3. Deteriorated Cable Insulation
                    </h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    In older properties (pre-1970s), the cable insulation may be rubber rather than
                    modern PVC. Rubber insulation degrades over time, becoming brittle, cracked, and
                    losing its insulating properties. This allows current to leak through the
                    insulation to the cable sheath or surrounding materials, particularly where the
                    cable is in contact with damp plaster or masonry. Even modern PVC cables can
                    develop insulation faults if they have been damaged during building work (a nail
                    through a cable is a classic example) or if they have been subjected to
                    excessive heat from spotlights or appliances mounted too close.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">
                      4. Cumulative Standing Leakage (Nuisance Tripping)
                    </h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Every electrical device has a small amount of earth leakage during normal
                    operation — this is called standing leakage. Individually, each device leaks far
                    less than 30 mA, so no single appliance would trip the RCD. However, on a
                    split-load consumer unit where one RCD protects multiple circuits, the leakage
                    from all connected devices adds up. If the total standing leakage exceeds
                    approximately 10 mA (one-third of the 30 mA trip threshold), the RCD becomes
                    susceptible to tripping from any small additional transient — a fridge
                    compressor starting, a light switch being operated, or a motor drawing inrush
                    current. This is sometimes called "nuisance tripping" because there is no actual
                    fault.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">5. Faulty RCD</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Although less common, the RCD itself can become faulty. The toroidal core can
                    degrade, the trip mechanism can become overly sensitive due to corrosion or
                    mechanical wear, or internal component failure can cause the device to trip at
                    currents well below its rated 30 mA. A faulty RCD may trip at half-rated current
                    (15 mA or less), which would show up as frequent tripping even when there is no
                    significant earth leakage. The only way to confirm this is to test the RCD with
                    a calibrated multifunction test instrument — if it trips at half-rated current,
                    it needs replacing.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Wrench className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">
                      6. Incorrect RCD Type for the Load
                    </h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    A Type AC RCD (the traditional type) can only detect sinusoidal AC earth
                    leakage. Modern electronic equipment — EV chargers, inverter washing machines,
                    heat pumps, LED dimmers, and computer power supplies — can produce pulsating DC
                    or mixed-frequency earth leakage that a Type AC device cannot properly detect.
                    This can cause erratic tripping behaviour. Upgrading to a{' '}
                    <SEOInternalLink href="/guides/rcd-types-explained">
                      Type A or Type F RCD
                    </SEOInternalLink>{' '}
                    often resolves tripping caused by these types of load.
                  </p>
                </div>
              </div>
            </>
          ),
        },
        {
          id: 'nuisance-vs-fault',
          heading: 'Nuisance Tripping vs a Genuine Fault',
          content: (
            <>
              <p>
                Distinguishing between nuisance tripping and a genuine earth fault is critical. The
                approach to fixing each is very different. Nuisance tripping means the RCD is
                tripping due to the cumulative effect of normal standing leakage from multiple
                devices, with no actual insulation failure or dangerous condition. A genuine fault
                means there is real insulation breakdown, a damaged cable, a faulty appliance, or
                moisture creating a dangerous leakage path.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-yellow-400 text-lg mb-3">
                    Signs of Nuisance Tripping
                  </h3>
                  <ul className="space-y-2 text-white text-sm leading-relaxed">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>RCD trips at random times with no pattern</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Multiple circuits share the same RCD</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>
                        Tripping often occurs when a motor starts (fridge, washing machine)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>All insulation resistance tests pass (&gt;1 MΩ)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>RCD resets and holds with no appliances plugged in</span>
                    </li>
                  </ul>
                </div>
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-lg mb-3">
                    Signs of a Genuine Fault
                  </h3>
                  <ul className="space-y-2 text-white text-sm leading-relaxed">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>RCD trips immediately on resetting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Tripping consistently linked to one appliance or circuit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Burning smell, scorch marks, or discolouration visible</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Tripping correlates with rain or damp conditions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Insulation resistance test shows values below 1 MΩ</span>
                    </li>
                  </ul>
                </div>
              </div>
              <SEOAppBridge
                title="AI Fault Diagnosis in Elec-Mate"
                description="Describe the tripping pattern to the Elec-AI diagnostic agent and get guided troubleshooting steps tailored to your exact situation. It cross-references your symptoms against known fault patterns to help you zero in on the cause faster."
                icon={Search}
              />
            </>
          ),
        },
        {
          id: 'how-to-diagnose',
          heading: 'How to Diagnose the Problem',
          content: (
            <>
              <p>
                If you are a homeowner, you can carry out some basic diagnostic steps before calling
                an electrician. If you are a qualified electrician carrying out fault-finding, this
                section outlines the systematic approach and the instrument tests that confirm the
                diagnosis.
              </p>
              <h3 className="font-bold text-white text-lg mt-6 mb-3">
                For Homeowners: Basic Diagnosis
              </h3>
              <div className="space-y-3">
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    1
                  </span>
                  <p className="text-white text-sm leading-relaxed">
                    <strong className="text-white">Unplug everything.</strong> Go around every
                    socket on the affected circuits and unplug every appliance. This includes
                    anything that might be hidden — behind furniture, under worktops, in garages and
                    outbuildings.
                  </p>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    2
                  </span>
                  <p className="text-white text-sm leading-relaxed">
                    <strong className="text-white">Reset the RCD.</strong> Push the RCD switch back
                    to the ON position. If it stays on with nothing plugged in, the fault is in an
                    appliance. If it trips immediately, the fault is in the fixed wiring — call an
                    electrician.
                  </p>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    3
                  </span>
                  <p className="text-white text-sm leading-relaxed">
                    <strong className="text-white">Reconnect one appliance at a time.</strong> Plug
                    in each appliance individually, switch it on, and wait a few minutes. When the
                    RCD trips, the last appliance you plugged in is the likely culprit. Leave that
                    appliance disconnected and reconnect everything else.
                  </p>
                </div>
              </div>

              <h3 className="font-bold text-white text-lg mt-6 mb-3">
                For Electricians: Instrument Testing
              </h3>
              <p>
                The systematic approach for fault-finding on an RCD that keeps tripping involves
                isolating circuits one by one at the consumer unit and carrying out{' '}
                <SEOInternalLink href="/guides/insulation-resistance-testing">
                  insulation resistance tests
                </SEOInternalLink>{' '}
                on each circuit.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h4 className="font-bold text-white mb-3">Insulation Resistance Test Procedure</h4>
                <ul className="space-y-2 text-white text-sm leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Isolate the supply and prove dead using the safe isolation procedure
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Disconnect all loads and electronic equipment (500V DC test voltage will
                      damage them)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Test insulation resistance between L-E and N-E on each circuit at 500V DC
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Minimum acceptable value: 1.0 MΩ (BS 7671 Table 61). Values below this
                      indicate insulation breakdown
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      A circuit reading below 1 MΩ has a confirmed insulation fault — investigate
                      further to locate the exact point of failure
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                Also check the{' '}
                <SEOInternalLink href="/guides/earth-fault-loop-impedance">
                  earth fault loop impedance (Zs)
                </SEOInternalLink>{' '}
                on each circuit. An abnormally low Zs reading can indicate an earth fault, as the
                fault path provides a lower-impedance route to earth than the normal protective
                conductor.
              </p>
              <SEOAppBridge
                title="Insulation Resistance Validation in Elec-Mate"
                description="Enter your IR test results into Elec-Mate and the app instantly validates them against BS 7671 Table 61 minimum values. Failed results are flagged automatically and the app suggests the appropriate observation code for EICR reporting."
                icon={Calculator}
              />
            </>
          ),
        },
        {
          id: 'rcd-types',
          heading: 'RCD Types and Why They Matter for Tripping',
          content: (
            <>
              <p>
                The type of RCD installed can directly cause tripping problems if it does not match
                the type of load connected to it. BS 7671 Regulation 531.3.3 requires the RCD type
                to be selected based on the waveform of the residual current likely to occur under
                fault conditions.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-2">Type AC</h3>
                  <p className="text-white text-sm leading-relaxed">
                    Detects sinusoidal AC residual currents only. The most basic type. Cannot detect
                    DC leakage from electronic equipment. May behave erratically when DC fault
                    currents are present, causing both missed trips and nuisance trips. Now largely
                    superseded by Type A for new installations.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-lg mb-2">Type A</h3>
                  <p className="text-white text-sm leading-relaxed">
                    Detects sinusoidal AC and pulsating DC residual currents. Now the standard for
                    most domestic circuits. Handles the leakage waveforms from washing machines,
                    dishwashers, computers, and LED drivers. Required by BS 7671 Regulation 531.3.3
                    for circuits supplying equipment with rectifiers.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-2">Type F</h3>
                  <p className="text-white text-sm leading-relaxed">
                    Detects sinusoidal AC, pulsating DC, and composite residual currents from
                    single-phase frequency-controlled equipment. Designed for circuits supplying
                    heat pumps, air conditioning units, and inverter washing machines. Resolves
                    tripping caused by mixed-frequency leakage that Type A cannot handle cleanly.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-2">Type B</h3>
                  <p className="text-white text-sm leading-relaxed">
                    Detects all of the above plus smooth (pure) DC residual currents. Required for{' '}
                    <SEOInternalLink href="/guides/ev-charger-installation">
                      EV chargers
                    </SEOInternalLink>{' '}
                    without built-in DC detection, three-phase rectifier loads, and certain
                    industrial equipment. Significantly more expensive but essential where smooth DC
                    fault currents are possible.
                  </p>
                </div>
              </div>
              <p>
                If you have a Type AC RCD and are experiencing tripping when using modern electronic
                equipment, upgrading to a Type A RCBO (or Type F for inverter-driven loads) often
                resolves the problem completely. This is not a fault — it is a compatibility issue
                between the RCD type and the load characteristics.
              </p>
            </>
          ),
        },
        {
          id: 'when-to-call',
          heading: 'When to Call an Electrician',
          content: (
            <>
              <p>
                While basic appliance isolation can be done by a homeowner, many RCD tripping
                scenarios require a qualified electrician with calibrated test instruments. You
                should call an electrician if:
              </p>
              <ul className="space-y-3 my-4">
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    The RCD trips immediately on resetting, even with all appliances disconnected —
                    this indicates a fault in the fixed wiring
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    You can smell burning or see scorch marks on sockets, switches, or the consumer
                    unit
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    The tripping has started after building work, DIY, or a new appliance being
                    installed (a nail through a cable or a cross-connected neutral)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    The property has old wiring (rubber-insulated cable, rewirable fuses, no earth
                    wire) — an{' '}
                    <SEOInternalLink href="/guides/eicr-certificate">EICR</SEOInternalLink> is
                    recommended to assess the overall condition
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    The consumer unit has no circuit labels, making it impossible to identify which
                    circuit is causing the trip
                  </span>
                </li>
              </ul>
              <p>
                A competent electrician will carry out insulation resistance tests, earth fault loop
                impedance measurements, and RCD testing to identify the exact cause and location of
                the fault. If a periodic inspection is needed, the electrician will produce an{' '}
                <SEOInternalLink href="/guides/eicr-certificate">
                  Electrical Installation Condition Report (EICR)
                </SEOInternalLink>{' '}
                documenting all findings and recommendations.
              </p>
              <SEOAppBridge
                title="EICR Certificate Built Into Elec-Mate"
                description="If a periodic inspection is needed, Elec-Mate's digital EICR form lets you record all test results on site, validates values against BS 7671, and generates a professional PDF certificate. Complete the inspection, sign, and send to the client — all from your phone."
                icon={ClipboardCheck}
              />
            </>
          ),
        },
        {
          id: 'temporary-measures',
          heading: 'Temporary Measures While Waiting for a Repair',
          content: (
            <>
              <p>
                If the RCD keeps tripping and an electrician cannot attend immediately, there are
                some temporary measures to keep essential circuits operational. These are{' '}
                <strong className="text-white">temporary measures only</strong> — they do not fix
                the fault and the installation must be properly repaired as soon as possible.
              </p>
              <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5 my-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-white mb-2">Safety Warning</h4>
                    <p className="text-white text-sm leading-relaxed">
                      Never bypass, bridge out, or remove an RCD. This removes life-saving
                      protection and is illegal under the Electricity at Work Regulations 1989. The
                      measures below reduce the load on the RCD — they do not remove it from the
                      circuit.
                    </p>
                  </div>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">
                      Identify and disconnect the faulty appliance.
                    </strong>{' '}
                    If the isolation test identified a specific appliance, unplug it and leave it
                    disconnected until it can be repaired or replaced.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">
                      Reduce the number of appliances on the affected RCD.
                    </strong>{' '}
                    If cumulative leakage is causing nuisance tripping, reducing the number of
                    connected appliances lowers the total standing leakage and may stop the
                    tripping.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">
                      Switch off the circuit breaker for the faulty circuit.
                    </strong>{' '}
                    If you have identified which individual circuit is causing the RCD to trip
                    (e.g., the garden lighting circuit), switch off that circuit's MCB at the
                    consumer unit. The RCD should then stay on, keeping the other circuits live.
                  </span>
                </li>
              </ul>
            </>
          ),
        },
      ]}
      howToHeading="How to Diagnose an RCD That Keeps Tripping — Step by Step"
      howToSteps={[
        {
          name: 'Unplug all appliances on the affected circuits',
          text: 'Go to every socket outlet on the circuits protected by the tripping RCD and unplug every appliance. Include anything hidden behind furniture, in cupboards, garages, and outbuildings. This removes all appliance-based earth leakage from the circuits.',
        },
        {
          name: 'Reset the RCD',
          text: 'Push the RCD switch firmly to the ON position. If it stays on with all appliances disconnected, the fault is in an appliance (proceed to step 3). If it trips immediately, the fault is in the fixed wiring — do not proceed further; call a qualified electrician.',
        },
        {
          name: 'Reconnect appliances one at a time',
          text: 'Plug in each appliance individually, switch it on, and wait at least two minutes. If the RCD trips, the last appliance connected is the likely cause. Disconnect it and continue testing the remaining appliances. Some faults are intermittent (e.g., a washing machine may only leak during the heating cycle), so run appliances through a full cycle if possible.',
        },
        {
          name: 'Isolate circuits one by one (electricians)',
          text: 'If the RCD trips with no appliances connected, isolate each circuit individually at the consumer unit by switching off all MCBs on the RCD side, then switching them on one at a time. When the RCD trips, the last circuit energised contains the fault. This narrows the search to a single circuit.',
        },
        {
          name: 'Carry out insulation resistance testing (electricians)',
          text: 'With the faulty circuit identified, perform a 500V DC insulation resistance test between Live-Earth and Neutral-Earth with all loads disconnected. A reading below 1.0 MΩ confirms an insulation fault. Test at each accessory point along the circuit to pinpoint the exact location of the breakdown.',
        },
        {
          name: 'Repair or replace the faulty component',
          text: 'Once the fault location is identified — whether it is a damaged cable, a faulty connection, moisture in a fitting, or a deteriorated section of wiring — carry out the repair. After the repair, re-test insulation resistance to confirm the fault is cleared, then re-test the RCD to verify correct operation.',
        },
      ]}
      faqs={[
        {
          question: 'Why does my RCD trip when it rains?',
          answer:
            'Rain-related RCD tripping is almost always caused by moisture ingress into an external electrical enclosure. The most common culprits are outdoor socket outlets with damaged or missing weatherproof covers, garden lighting junction boxes with failed seals, security lights with cracked lenses, or external cable entries where the sealant has deteriorated. Water creates a conductive path that allows current to leak from live conductors to the earthed enclosure or cable sheath, exceeding the 30 mA RCD threshold. To diagnose, isolate circuits one by one during or immediately after rain to identify the affected circuit, then visually inspect all external fittings and connections on that circuit for evidence of water ingress. The fix typically involves replacing the damaged enclosure, resealing cable entries, or replacing the affected fitting with an IP-rated unit suitable for outdoor use.',
        },
        {
          question: 'Can a faulty RCD cause tripping even when there is no fault on the circuit?',
          answer:
            'Yes. An RCD can develop internal faults that cause it to trip at currents below its rated 30 mA threshold. The toroidal core can degrade over time, the mechanical trip mechanism can become overly sensitive due to corrosion, or electronic components in digital RCDs can fail. The definitive test is to carry out a half-rated current test (15 mA for a 30 mA device) using a calibrated multifunction test instrument. If the RCD trips at half-rated current, the device is oversensitive and must be replaced. During the replacement, consider upgrading to individual RCBOs rather than replacing a shared RCD, as this eliminates the cumulative leakage problem and provides better circuit discrimination.',
        },
        {
          question: 'What is the difference between an RCD tripping and an MCB tripping?',
          answer:
            'An RCD (Residual Current Device) trips when it detects an imbalance between the live and neutral currents — meaning some current is leaking to earth. This indicates an earth fault or insulation breakdown. An MCB (Miniature Circuit Breaker) trips when the current flowing through the circuit exceeds the MCB rating — this is caused by an overload (too many appliances on one circuit) or a short circuit (live and neutral touching directly). The two devices protect against different hazards. If your MCB trips, the issue is overcurrent. If your RCD trips, the issue is earth leakage. An RCBO combines both functions in one device, so it can trip for either reason — check the trip indicator on the device to determine which protection operated.',
        },
        {
          question: 'Will upgrading to RCBOs stop my RCD from nuisance tripping?',
          answer:
            'In most cases, yes. Nuisance tripping on a split-load consumer unit is caused by the cumulative standing earth leakage from all devices on one RCD exceeding the trip sensitivity threshold. When you upgrade to individual RCBOs, each circuit has its own independent residual current protection. The standing leakage from a single circuit (typically 1-3 mA) is well below the 30 mA trip threshold, so the chance of nuisance tripping is virtually eliminated. Upgrading to a full RCBO consumer unit is a common solution recommended by electricians and typically costs between £500 and £1,200 including labour and a new consumer unit. The work requires a full Electrical Installation Certificate (EIC) and Part P notification.',
        },
        {
          question: 'How do I know if the fault is in the wiring or an appliance?',
          answer:
            'The simplest test is the appliance isolation method: unplug every single appliance on the affected circuits and reset the RCD. If the RCD holds with nothing plugged in, the fault is in an appliance. If it trips immediately with everything unplugged, the fault is in the fixed wiring. For electricians, an insulation resistance test at 500V DC on each circuit (with loads disconnected) will confirm the state of the fixed wiring — any circuit reading below 1.0 MΩ between Live-Earth or Neutral-Earth has a confirmed insulation fault in the fixed wiring. Values between 1 MΩ and 2 MΩ, while technically passing, indicate deteriorating insulation that may cause intermittent tripping and should be investigated further.',
        },
        {
          question: 'My RCD only trips at night — what could cause this?',
          answer:
            'Nighttime-only RCD tripping is commonly caused by equipment that runs unattended overnight. Immersion heaters on a timer that switches on at night, electric storage heaters that charge during the Economy 7 off-peak period (typically midnight to 7am), or a fridge-freezer whose compressor cycles more frequently in a warm kitchen after cooking can all cause tripping. The pattern occurs because these devices draw current when you are asleep and not using other appliances, making the trip more noticeable. Condensation can also be a factor — as temperatures drop overnight, moisture can form inside poorly sealed external fittings or in damp loft spaces where junction boxes are located. Run each suspect appliance individually overnight to isolate the culprit.',
        },
      ]}
      relatedPages={[
        {
          href: '/guides/earth-fault-loop-impedance',
          title: 'Earth Fault Loop Impedance',
          description: 'Understanding Zs measurements and their role in fault protection.',
          icon: Activity,
          category: 'Testing',
        },
        {
          href: '/guides/insulation-resistance-testing',
          title: 'Insulation Resistance Testing',
          description: 'How to carry out IR testing and interpret the results.',
          icon: Calculator,
          category: 'Testing',
        },
        {
          href: '/guides/rcd-types-explained',
          title: 'RCD Types Explained',
          description: 'Type AC, A, B, and F — which one to use and when.',
          icon: ShieldCheck,
          category: 'Guide',
        },
        {
          href: '/guides/eicr-certificate',
          title: 'EICR Certificate',
          description: 'Complete guide to Electrical Installation Condition Reports.',
          icon: FileText,
          category: 'Certification',
        },
        {
          href: '/guides/testing-sequence',
          title: 'Testing Sequence Guide',
          description: 'The correct order of electrical tests for inspection and testing.',
          icon: ClipboardCheck,
          category: 'Testing',
        },
        {
          href: '/guides/circuit-breaker-tripping',
          title: 'Circuit Breaker Tripping',
          description: 'When the MCB trips instead of the RCD — causes and solutions.',
          icon: Zap,
          category: 'Troubleshooting',
        },
      ]}
      ctaHeading="Diagnose Electrical Faults Faster with Elec-Mate"
      ctaSubheading="70+ calculators, AI fault diagnosis, and digital EICR forms. Join 430+ UK electricians. 7-day free trial, cancel anytime."
    />
  );
}
