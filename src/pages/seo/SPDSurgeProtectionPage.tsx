import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Zap,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Calculator,
  BookOpen,
  Brain,
  Cable,
  Flame,
  Activity,
  ClipboardCheck,
} from 'lucide-react';

export default function SPDSurgeProtectionPage() {
  return (
    <GuideTemplate
      title="SPD Surge Protection Guide | BS 7671 Requirements"
      description="Complete guide to Surge Protective Devices (SPDs) under BS 7671. Type 1, 2, and 3 SPDs, risk assessment under Regulation 443.4, installation at the consumer unit, earthing considerations for TN-C-S, TN-S, and TT systems, coordination with RCDs, and back-up protection requirements."
      datePublished="2025-05-15"
      dateModified="2026-02-14"
      breadcrumbs={[
        { label: 'Guides', href: '/guides' },
        { label: 'SPD Surge Protection', href: '/guides/spd-surge-protection' },
      ]}
      tocItems={[
        { id: 'what-are-spds', label: 'What Are SPDs?' },
        { id: 'risk-assessment', label: 'SPD Risk Assessment (Reg 443.4)' },
        { id: 'spd-types', label: 'Type 1, 2, and 3 SPDs' },
        { id: 'earthing-considerations', label: 'Earthing Considerations' },
        { id: 'installation', label: 'Installation at the Consumer Unit' },
        { id: 'backup-protection', label: 'Back-Up Protection' },
        { id: 'rcd-coordination', label: 'Coordination with RCDs' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Guides' },
      ]}
      badge="BS 7671 Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          SPD Surge Protection
          <br />
          <span className="text-yellow-400">BS 7671 Requirements & Installation</span>
        </>
      }
      heroSubtitle="Surge Protective Devices (SPDs) are now required in the majority of UK domestic installations following the strengthened requirements in BS 7671. This guide covers everything an electrician needs to know — what SPDs are, the risk assessment under Regulation 443.4, Type 1, 2, and 3 devices, earthing considerations, and installation at the consumer unit."
      readingTime={16}
      keyTakeaways={[
        'BS 7671 Regulation 443.4 requires a risk assessment for transient overvoltage protection. In practice, most domestic installations now require SPDs because the consequences of surge damage to modern electronic equipment are serious.',
        'Type 2 SPDs are the standard for domestic consumer unit installations. Type 1 is required where a lightning protection system (LPS) is fitted or the building has an overhead supply. Type 3 provides additional protection at specific equipment locations.',
        'SPDs require a dedicated back-up protective device (MCB or fuse) on their supply, typically 32A or 40A as specified by the SPD manufacturer. The SPD must be installed as close to the origin of the installation as possible.',
        'On TT earthing systems, SPDs require coordination with RCDs — a surge can cause the RCD to trip if not properly specified. SPDs with integrated spark gap technology or Type S (time-delayed) RCDs help prevent nuisance tripping.',
        'Elec-Mate certificate forms capture SPD details, calculators include SPD specification, and the AI Circuit Designer includes SPD selection in designs.',
      ]}
      sections={[
        {
          id: 'what-are-spds',
          heading: 'What Are Surge Protective Devices?',
          content: (
            <>
              <p>
                A Surge Protective Device (SPD) is a device designed to limit transient overvoltages
                and divert surge currents safely to earth, protecting the electrical installation
                and the equipment connected to it. Transient overvoltages are very short-duration
                voltage spikes — typically lasting microseconds to milliseconds — that can reach
                thousands of volts and are caused by lightning strikes (direct or nearby) and
                switching events on the supply network.
              </p>
              <p>
                Without SPD protection, a transient overvoltage propagating through the supply cable
                into the installation can damage or destroy any connected electronic equipment.
                Modern homes contain thousands of pounds worth of electronic devices — smart TVs,
                computers, broadband routers, smart home controllers, LED lighting drivers, heating
                controls, washing machine and dishwasher control boards, and EV charger electronics.
                A single surge event can damage multiple items simultaneously.
              </p>
              <p>
                SPDs work by providing a low-impedance path to earth for the transient overvoltage.
                Under normal operating conditions, the SPD has very high impedance and draws no
                current. When a transient overvoltage exceeds the SPD's clamping voltage (typically
                1.5 to 2.5 kV), the internal components switch to a low-impedance state, diverting
                the surge energy harmlessly to earth. Once the transient has passed, the SPD returns
                to its high-impedance standby state.
              </p>
              <p>
                The internal components vary by SPD type but typically include Metal Oxide Varistors
                (MOVs) and/or Gas Discharge Tubes (GDTs). MOVs respond rapidly (nanoseconds) and
                clamp the voltage to a safe level. GDTs can handle very high energy surges (such as
                direct lightning strikes) but have a slightly slower response time. Many SPDs
                combine both technologies for comprehensive protection.
              </p>
            </>
          ),
        },
        {
          id: 'risk-assessment',
          heading: 'SPD Risk Assessment (Regulation 443.4)',
          content: (
            <>
              <p>
                BS 7671 Section 443 covers protection against transient overvoltages of atmospheric
                origin (lightning) and due to switching. Regulation 443.4.1 requires the designer to
                carry out a risk assessment to determine whether SPD protection is necessary for the
                installation.
              </p>
              <p>
                The risk assessment considers the consequences of a transient overvoltage event.
                Regulation 443.4.1 states that where the consequence includes:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
                <h3 className="font-bold text-white text-lg mb-4">
                  Consequences Requiring SPD Protection
                </h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Risk to human life</strong> —
                      Installations in medical locations, safety services, or where loss of supply
                      could endanger life (fire detection systems, emergency lighting, security
                      systems, medical equipment).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Interruption of public services or cultural heritage
                      </strong>{' '}
                      — Installations supplying essential public infrastructure, telecommunications
                      equipment, or heritage buildings with irreplaceable contents.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Disruption of commercial or industrial activity
                      </strong>{' '}
                      — Where loss of equipment or data could cause significant financial loss — IT
                      installations, industrial process control, point-of-sale systems.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Large number of co-located individuals
                      </strong>{' '}
                      — HMOs, blocks of flats, student accommodation, care homes, hotels — where
                      multiple people are affected simultaneously by equipment failure.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                In practice, the risk assessment almost always concludes that SPDs should be
                installed in modern domestic installations. The average UK home now contains
                electronic equipment worth several thousand pounds, and much of it is essential for
                daily life (broadband router, heating controls, phone chargers). The cost of a Type
                2 SPD — typically £30 to £60 for the device plus £15 to £30 for the back-up MCB — is
                a fraction of the potential damage cost from a single surge event.
              </p>
              <p>
                Where the risk assessment determines that SPDs are not required — for example, in a
                simple installation with no valuable electronic equipment and no safety-critical
                systems — the designer must document this decision on the{' '}
                <SEOInternalLink href="/guides/eic-certificate">
                  Electrical Installation Certificate
                </SEOInternalLink>
                .
              </p>
              <SEOAppBridge
                title="AI Circuit Designer Includes SPD Specification"
                description="Elec-Mate's AI Circuit Designer automatically includes SPD specification when designing new installations. It selects the appropriate SPD type based on the earthing arrangement, supply characteristics, and the equipment to be protected — and includes the back-up protective device in the design."
                icon={Brain}
              />
            </>
          ),
        },
        {
          id: 'spd-types',
          heading: 'Type 1, Type 2, and Type 3 SPDs',
          content: (
            <>
              <p>
                SPDs are classified into three types based on their location in the installation and
                their ability to handle different levels of surge energy. The types correspond to
                specific test categories defined in BS EN 61643-11.
              </p>
              <div className="space-y-4 my-6">
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-lg mb-3">
                    Type 1 SPD (Class I Test)
                  </h3>
                  <p className="text-white text-sm leading-relaxed mb-3">
                    Designed to handle the highest energy surges — direct or nearby lightning
                    strikes. Type 1 SPDs are installed at the origin of the installation, between
                    the supply intake and the main distribution board. They use Gas Discharge Tube
                    (GDT) technology or a combination of GDT and MOV to dissipate very high surge
                    currents (up to 25 kA or more per pole).
                  </p>
                  <p className="text-white text-sm leading-relaxed">
                    <strong className="text-white">When required:</strong> Where the building has a
                    lightning protection system (LPS) fitted, where the building has an overhead
                    electricity supply (exposed to direct lightning strikes on the supply line), or
                    where a Type 1 SPD is specified by the risk assessment due to the building's
                    location or use.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-lg mb-3">
                    Type 2 SPD (Class II Test)
                  </h3>
                  <p className="text-white text-sm leading-relaxed mb-3">
                    The standard SPD for domestic and light commercial installations. Installed at
                    the main distribution board (consumer unit) to protect the entire installation
                    against transient overvoltages induced on the supply by distant lightning
                    strikes and switching events. Uses Metal Oxide Varistor (MOV) technology with
                    typical discharge capacities of 10 to 20 kA per pole.
                  </p>
                  <p className="text-white text-sm leading-relaxed">
                    <strong className="text-white">When required:</strong> In the vast majority of
                    installations where the risk assessment identifies the need for SPD protection.
                    This is the default SPD type for domestic consumer units. Many modern consumer
                    units include a dedicated SPD module position, and some come with a built-in
                    Type 2 SPD.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-3">Type 3 SPD (Class III Test)</h3>
                  <p className="text-white text-sm leading-relaxed mb-3">
                    Provides fine protection at the point of use — installed at or near specific
                    equipment that requires additional protection beyond what the Type 2 SPD at the
                    origin provides. Type 3 SPDs have lower energy handling capacity but provide
                    tighter voltage clamping. Common forms include plug-in surge protectors, socket
                    outlet strips with surge protection, and DIN-rail devices in sub-distribution
                    boards.
                  </p>
                  <p className="text-white text-sm leading-relaxed">
                    <strong className="text-white">When required:</strong> For equipment that is
                    particularly sensitive to transient overvoltages — medical equipment, IT
                    servers, laboratory instruments, telecommunications equipment. A Type 3 SPD
                    should always be used in conjunction with a Type 2 (or Type 1 + Type 2) at the
                    origin — it is not a standalone solution.
                  </p>
                </div>
              </div>
              <p>
                For most domestic installations, a single Type 2 SPD installed at the consumer unit
                provides adequate protection. Where the building has an overhead supply or a
                lightning protection system, a Type 1 + Type 2 combination is required. Where
                specific sensitive equipment needs additional protection, a Type 3 SPD is added at
                the equipment location.
              </p>
            </>
          ),
        },
        {
          id: 'earthing-considerations',
          heading: 'Earthing Considerations for SPDs',
          content: (
            <>
              <p>
                The earthing arrangement of the installation has a significant impact on SPD
                selection and installation. SPDs divert surge energy to earth, so the quality and
                type of earth connection directly affects their performance.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 my-6">
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-lg mb-3">TN-C-S (PME)</h3>
                  <p className="text-white text-sm leading-relaxed">
                    The most common domestic earthing arrangement. SPDs are connected between line
                    and earth, and between neutral and earth. The low impedance of the PME earth
                    provides an effective surge diversion path. However, the SPD must be compatible
                    with the PME system — some SPD configurations can draw neutral current to earth,
                    which may affect RCD operation. Use SPDs specifically designed for TN-C-S
                    systems.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-3">TN-S</h3>
                  <p className="text-white text-sm leading-relaxed">
                    Separate neutral and earth throughout. SPD installation is straightforward — the
                    dedicated earth conductor provides a reliable, separate path for surge
                    diversion. SPDs are connected between line and earth, and between neutral and
                    earth. TN-S systems generally provide the best SPD performance because the earth
                    path has low impedance and is independent of the neutral.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-3">TT</h3>
                  <p className="text-white text-sm leading-relaxed">
                    Earth via an electrode in the ground. TT systems present specific challenges for
                    SPD installation because the earth electrode resistance is typically much higher
                    than in TN systems. When the SPD operates and diverts surge current to earth
                    through the electrode, the voltage rise at the electrode can be significant.
                    This can cause RCDs to trip. SPDs for TT systems must be carefully coordinated
                    with RCD protection — see the RCD coordination section below.
                  </p>
                </div>
              </div>
              <p>
                The{' '}
                <SEOInternalLink href="/guides/earthing-arrangements">
                  earthing arrangement
                </SEOInternalLink>{' '}
                must be verified on site before specifying the SPD. The SPD manufacturer's
                installation instructions will specify the connection requirements for each earthing
                arrangement. Getting this wrong can result in the SPD not operating correctly, or
                causing nuisance tripping of protective devices during surge events.
              </p>
            </>
          ),
        },
        {
          id: 'installation',
          heading: 'Installation at the Consumer Unit',
          content: (
            <>
              <p>
                The SPD must be installed as close to the origin of the installation as possible —
                at or within the main consumer unit or distribution board. This minimises the length
                of the connection between the SPD and the main earthing terminal, which is critical
                because the inductance of long connecting leads reduces the effectiveness of the
                SPD.
              </p>
              <p>
                BS 7671 Regulation 534.4.4 requires that the total length of the connecting
                conductors (from the point of connection on the line/neutral bus-bars to the SPD,
                and from the SPD to the earth bus-bar) should not exceed 0.5 metres. This is known
                as the "0.5m rule" and is one of the most commonly overlooked installation
                requirements. If the connecting leads are too long, the voltage drop across them
                during a surge event means the voltage at the equipment is higher than the SPD's
                clamping voltage — defeating the purpose of the protection.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
                <h3 className="font-bold text-white text-lg mb-4">SPD Installation Checklist</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Location</strong> — Install at the origin,
                      within or immediately adjacent to the main consumer unit. If space permits,
                      use a consumer unit with a dedicated SPD module position.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Lead length</strong> — Total connecting
                      conductor length must not exceed 0.5 metres (Regulation 534.4.4). Keep
                      connections as short as possible. Some consumer units achieve this with a
                      direct plug-in SPD module.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Back-up protection</strong> — Install a
                      dedicated MCB or fuse on the supply to the SPD, sized according to the
                      manufacturer's specification (typically 32A or 40A).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Status indication</strong> — Check that
                      the SPD's green indicator is showing after installation, confirming the device
                      is operational. Explain to the client that when the indicator turns red, the
                      SPD needs replacing.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Documentation</strong> — Record the SPD
                      type, manufacturer, model, and connection arrangement on the Electrical
                      Installation Certificate. Note the SPD on the circuit chart.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                Many modern consumer units from manufacturers such as Hager, Schneider, and Siemens
                include a dedicated SPD module position with direct bus-bar connections, eliminating
                the lead length issue entirely. When specifying a new consumer unit, choosing one
                with an integrated SPD position simplifies installation and ensures compliance with
                the 0.5m rule.
              </p>
            </>
          ),
        },
        {
          id: 'backup-protection',
          heading: 'Back-Up Protection for SPDs',
          content: (
            <>
              <p>
                Every SPD installation requires a dedicated back-up protective device — a separate
                MCB or fuse — on the supply to the SPD. This back-up device serves two important
                functions.
              </p>
              <p>
                First, it provides overcurrent protection for the SPD. If the SPD fails
                short-circuit (which MOV-based SPDs can do at end of life), the back-up device
                disconnects the SPD from the supply, preventing a sustained short circuit at the
                origin of the installation. Without back-up protection, a failed SPD could cause the
                main switch or the supply fuse to trip, disconnecting the entire installation.
              </p>
              <p>
                Second, it provides a means of isolation for the SPD, allowing it to be replaced
                without disconnecting the entire installation.
              </p>
              <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5 my-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-white mb-2">Important: Back-Up Device Rating</h4>
                    <p className="text-white text-sm leading-relaxed">
                      The back-up MCB or fuse must be rated according to the SPD manufacturer's
                      instructions — not arbitrarily chosen. Most domestic Type 2 SPDs specify a 32A
                      or 40A back-up MCB. If the back-up device is rated too low, it may trip during
                      a surge event before the SPD has finished diverting the surge energy, leaving
                      the installation unprotected. If rated too high, it may not disconnect a
                      failed SPD quickly enough.
                    </p>
                  </div>
                </div>
              </div>
              <p>
                Some consumer unit manufacturers integrate the SPD and its back-up protection into a
                single plug-in module, eliminating the need for a separate MCB. This is the simplest
                and most reliable approach when available.
              </p>
              <SEOAppBridge
                title="Calculators and BS 7671 Regs Built In"
                description="Elec-Mate includes the full BS 7671 Section 534 requirements for SPD installation, plus calculators for maximum demand, cable sizing, and circuit design that factor in SPD back-up protection. All accessible on site, even offline."
                icon={Calculator}
              />
            </>
          ),
        },
        {
          id: 'rcd-coordination',
          heading: 'Coordination with RCDs',
          content: (
            <>
              <p>
                SPD operation can cause RCDs to trip, particularly on TT earthing systems.
                Understanding why this happens and how to prevent it is essential for reliable SPD
                installations.
              </p>
              <p>
                When a transient overvoltage occurs and the SPD operates, it diverts a large surge
                current to earth in a very short time. On TN systems, this current flows through the
                neutral-earth bond and does not create an imbalance that the RCD would detect.
                However, on TT systems, the surge current flows through the earth electrode, and the
                transient nature of the current can create a momentary imbalance that causes the RCD
                to trip.
              </p>
              <p>
                Additionally, some SPD technologies (particularly MOV-based devices) can produce a
                brief follow-through current after the surge has passed — this is mains-frequency
                current that flows through the SPD for a few milliseconds while the MOV returns to
                its high-impedance state. If this follow-through current flows to earth, it creates
                exactly the type of imbalance that an RCD is designed to detect.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
                <h3 className="font-bold text-white text-lg mb-4">
                  Solutions for RCD Coordination
                </h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">SPDs with integrated spark gap</strong> —
                      Some SPDs use a gas discharge tube (spark gap) in series with the MOV. The
                      spark gap has no follow-through current because it extinguishes cleanly once
                      the surge has passed, preventing RCD tripping.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Type S (time-delayed) RCDs</strong> — A
                      time-delayed RCD at the main switch ignores the very brief surge diversion
                      event because its delay exceeds the duration of the surge. Downstream
                      non-delayed RCBOs provide instantaneous personal protection on each circuit.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">SPD upstream of the RCD</strong> — If the
                      SPD is connected upstream of the main RCD (between the main switch and the
                      RCD), the surge current does not pass through the RCD and cannot cause
                      tripping. However, this requires the SPD to have its own separate back-up
                      protection device.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        3+1 or 1+1 connection configuration
                      </strong>{' '}
                      — Specific SPD connection arrangements that minimise the current flowing
                      through the RCD during surge events. Check the SPD manufacturer's guidance for
                      the correct configuration for your earthing system.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                The SPD manufacturer's installation manual will specify the recommended RCD
                coordination method for each earthing arrangement. Always follow the manufacturer's
                guidance — installing an SPD without considering RCD coordination can result in the
                main RCD tripping every time there is a storm, disconnecting the entire installation
                and leaving the occupants without power.
              </p>
              <SEOAppBridge
                title="Certificate Forms Capture SPD Details"
                description="Elec-Mate's EIC and EICR forms include dedicated fields for SPD type, manufacturer, connection configuration, back-up protection rating, and status indicator condition. Everything you need to document the SPD installation is built into the digital form."
                icon={ClipboardCheck}
              />
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'Are SPDs mandatory in domestic installations under BS 7671?',
          answer:
            'SPDs are not automatically mandatory in every domestic installation, but BS 7671 Regulation 443.4.1 requires a risk assessment to determine whether they are needed. The risk assessment considers the consequences of a transient overvoltage event — and for modern domestic installations containing valuable electronic equipment (smart TVs, computers, routers, heating controls, LED lighting, EV charger electronics), the conclusion is almost always that SPDs should be installed. The cost of a Type 2 SPD with back-up protection (typically £50 to £90 total) is trivial compared to the potential damage from a single surge event. In practice, most new domestic installations and consumer unit replacements now include SPDs as standard. Where the designer determines that SPDs are not required, this decision must be documented on the Electrical Installation Certificate.',
        },
        {
          question: 'What is the difference between Type 1 and Type 2 SPDs?',
          answer:
            'Type 1 and Type 2 SPDs differ in their energy handling capacity and their intended location in the installation. Type 1 SPDs (tested to Class I) are designed to handle very high energy surges — including partial lightning currents from a direct or very close lightning strike. They are installed at the origin of the installation and typically use Gas Discharge Tube (GDT) technology capable of handling surge currents of 25 kA or more per pole. Type 1 SPDs are required where the building has a lightning protection system (LPS) or an overhead electricity supply. Type 2 SPDs (tested to Class II) are designed for the majority of installations and handle the transient overvoltages induced on the supply by distant lightning and switching events. They use Metal Oxide Varistor (MOV) technology with typical capacities of 10 to 20 kA per pole. Type 2 is the standard choice for domestic consumer unit installations. Where both types are required (LPS installations), a Type 1 is installed at the origin and a Type 2 downstream to provide coordinated protection.',
        },
        {
          question: 'How do I know when an SPD needs replacing?',
          answer:
            'SPDs have a finite life and will eventually need replacing. There are several indicators. Most SPDs have a status indicator — typically a green window or LED that shows the device is operational. When the indicator turns red or disappears, the SPD has operated beyond its capacity and must be replaced. Some SPDs also include a remote signalling contact that can be connected to an alarm or building management system. The back-up MCB tripping is another indicator — if the SPD has failed short-circuit, the back-up protection will disconnect it. During periodic inspection (EICR), check the SPD status indicator and record it on the schedule of test results. If the indicator shows the SPD is exhausted, record this as an observation (typically C2 — Potentially Dangerous) and recommend replacement. SPDs that have been in service for many years should be checked more frequently, particularly after storms.',
        },
        {
          question:
            'Can I install an SPD on an existing consumer unit that does not have a dedicated SPD position?',
          answer:
            'Yes, but you need to address two practical challenges: space and lead length. If the existing consumer unit has a spare way, you can use it for the SPD back-up MCB and mount the SPD device adjacent to the board, keeping the total connecting lead length within the 0.5-metre limit specified by Regulation 534.4.4. Some SPD manufacturers offer compact DIN-rail SPDs that fit within the consumer unit enclosure. If there are no spare ways and the consumer unit is full, you have two options: replace the consumer unit with a larger board that includes an SPD module position, or install the SPD in a separate small enclosure immediately adjacent to the consumer unit. The key requirement is keeping the connecting leads as short as possible — long leads reduce the SPD effectiveness significantly.',
        },
        {
          question: 'Do SPDs protect against lightning strikes?',
          answer:
            'SPDs protect against transient overvoltages caused by lightning, but the level of protection depends on the SPD type and the proximity of the lightning strike. A Type 2 SPD protects against the surges induced on the supply by distant lightning strikes — the electromagnetic pulse from a lightning strike several hundred metres away can induce transient overvoltages of several thousand volts on the supply cables, and the SPD clamps these to a safe level. A Type 1 SPD provides protection against the much higher energy of a nearby or direct lightning strike — where a significant portion of the lightning current enters the supply system. No SPD can protect against a direct lightning strike on the building if the building does not have a lightning protection system (LPS). The LPS intercepts the lightning strike and conducts the current safely to earth via its own down conductors — the Type 1 SPD then handles any residual surge that enters the electrical supply. For buildings without an LPS, a Type 2 SPD provides the best available protection against lightning-induced surges.',
        },
        {
          question: 'What is the 0.5-metre rule for SPD installation?',
          answer:
            'BS 7671 Regulation 534.4.4 requires that the total length of the connecting conductors between the SPD and its connection points on the distribution board must not exceed 0.5 metres. This means the combined length of the conductor from the line bus-bar to the SPD, plus the conductor from the SPD to the earth bus-bar, should be 0.5 metres or less. The reason is inductance. The connecting leads have inductance, and when a fast-rising surge current flows through them, the voltage drop across the inductance adds to the voltage at the protected equipment. If the leads are too long, the voltage at the equipment can exceed the SPD clamping voltage even while the SPD is operating, defeating the purpose of the protection. Consumer units with built-in or plug-in SPD modules automatically satisfy this requirement. Where the SPD is mounted separately, keep all connections as short and direct as possible.',
        },
      ]}
      relatedPages={[
        {
          href: '/guides/consumer-unit-regulations',
          title: 'Consumer Unit Regulations',
          description: 'Metal CU, RCD protection, and SPD requirements in the board.',
          icon: ShieldCheck,
          category: 'Regulations',
        },
        {
          href: '/guides/earthing-arrangements',
          title: 'Earthing Arrangements',
          description: 'TN-S, TN-C-S, and TT systems and their impact on SPD selection.',
          icon: Cable,
          category: 'Guide',
        },
        {
          href: '/guides/rcd-types-explained',
          title: 'RCD Types Explained',
          description: 'Type AC, A, B, F — coordination with SPDs.',
          icon: Activity,
          category: 'Guide',
        },
        {
          href: '/guides/afdd-arc-fault-detection',
          title: 'AFDD Guide',
          description: 'Arc fault detection — another layer of circuit protection.',
          icon: Flame,
          category: 'Guide',
        },
        {
          href: '/guides/eic-certificate',
          title: 'EIC Certificate Guide',
          description: 'Documenting SPD installation on the certificate.',
          icon: FileText,
          category: 'Certification',
        },
        {
          href: '/guides/bs7671-eighteenth-edition',
          title: 'BS 7671 18th Edition',
          description: 'Full guide to the current Wiring Regulations.',
          icon: BookOpen,
          category: 'Regulations',
        },
      ]}
      ctaHeading="Specify and Certify SPDs With Confidence"
      ctaSubheading="SPD fields in every certificate, BS 7671 Section 534 accessible in-app, and AI Circuit Designer includes SPD in designs. Join 430+ UK electricians. 7-day free trial."
    />
  );
}
