import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Transfer Switches and Changeover Systems - MOET Module 3.5.4";
const DESCRIPTION = "Comprehensive guide to automatic transfer switches and changeover systems for electrical maintenance technicians: ATS types, operating principles, open and closed transition, testing, maintenance and BS 7671 compliance under ST1426.";

const quickCheckQuestions = [
  {
    id: "ats-purpose",
    question: "What is the primary function of an automatic transfer switch (ATS)?",
    options: [
      "To regulate voltage",
      "To automatically detect a mains supply failure and transfer the load to a standby source (typically a generator) without manual intervention, then retransfer when normal supply is restored",
      "To distribute load between phases",
      "To protect against lightning"
    ],
    correctIndex: 1,
    explanation: "An ATS continuously monitors the normal (mains) supply. When it detects a failure (loss of voltage, under-voltage, over-voltage or frequency deviation), it sends a start signal to the standby generator and, once the generator reaches stable voltage and frequency, automatically transfers the load. When the normal supply is restored and stable, the ATS retransfers the load back and signals the generator to shut down. This entire process occurs without manual intervention."
  },
  {
    id: "open-transition",
    question: "What is the key characteristic of an open-transition (break-before-make) transfer?",
    options: [
      "Both sources are connected simultaneously",
      "There is a brief interruption of supply (typically 100-500 ms) during transfer as the load is disconnected from one source before being connected to the other",
      "It requires manual operation",
      "It only works with UPS systems"
    ],
    correctIndex: 1,
    explanation: "In open-transition transfer, the ATS disconnects the load from the failing source before connecting it to the standby source. This creates a brief power interruption (typically 100-500 ms). This is the simplest and most common transfer method, suitable for most general loads. It prevents any possibility of paralleling the two sources, which is important when the sources are not synchronised. Critical loads that cannot tolerate even brief interruptions require UPS support or closed-transition transfer."
  },
  {
    id: "ats-testing",
    question: "How often should an ATS be tested under simulated mains failure conditions?",
    options: [
      "Only during annual servicing",
      "Monthly, with a full-load transfer test at least annually, to verify the complete sequence: mains failure detection, generator start, load transfer, retransfer and generator cooldown",
      "Every five years",
      "Testing is not required"
    ],
    correctIndex: 1,
    explanation: "ATS systems should be tested monthly by simulating a mains failure to verify the complete automatic sequence. This includes: mains failure detection, time delay, generator start signal, generator run-up, voltage and frequency verification, load transfer, stable operation on generator, mains restoration detection, retransfer delay, load retransfer and generator cooldown. Annual testing should include a full-load transfer to verify the ATS and generator perform correctly under actual load conditions."
  },
  {
    id: "bypass-isolation",
    question: "What is the purpose of a bypass-isolation facility on an ATS?",
    options: [
      "To increase the transfer speed",
      "To allow the ATS to be completely isolated from the circuit for maintenance or replacement without interrupting the power supply to the load",
      "To reduce the ATS cost",
      "To provide surge protection"
    ],
    correctIndex: 1,
    explanation: "A bypass-isolation facility provides a manual means of connecting the load directly to one supply source (usually the normal mains) while completely isolating the ATS from the circuit. This allows the ATS to be maintained, tested, repaired or replaced without interrupting the power supply to the load. It is an essential feature for ATS installations serving critical loads where power continuity is paramount. The bypass switch must be interlocked to prevent paralleling of sources."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The two main types of ATS contactor arrangement are:",
    options: [
      "AC and DC contactors",
      "Mechanically interlocked contactors (two contactors with mechanical and electrical interlocking) and motorised changeover switches (single device with motor-driven mechanism)",
      "Manual and automatic",
      "Indoor and outdoor"
    ],
    correctAnswer: 1,
    explanation: "Mechanically interlocked contactor pairs use two separate contactors with both mechanical interlock (a physical linkage preventing both closing simultaneously) and electrical interlock (auxiliary contacts in the control circuit). Motorised changeover switches use a single device with a motor-driven mechanism that moves between source 1 and source 2 positions. Motorised switches are generally more reliable for frequent operation and provide inherent source isolation in the mid-position."
  },
  {
    id: 2,
    question: "The time delay between mains failure detection and generator start signal is typically:",
    options: [
      "Zero — immediate start",
      "3-10 seconds, to avoid unnecessary starts during brief supply interruptions (voltage dips, transient faults) that are resolved by the DNO within seconds",
      "5 minutes",
      "1 hour"
    ],
    correctAnswer: 1,
    explanation: "A time delay (typically 3-10 seconds, adjustable) is programmed between the ATS detecting a supply abnormality and sending the generator start signal. This prevents unnecessary generator starts during brief supply disturbances such as voltage dips, auto-recloser operations on the DNO network, or transient faults that are cleared within seconds. Without this delay, the generator would start and stop frequently, causing wear and fuel waste."
  },
  {
    id: 3,
    question: "Closed-transition (make-before-break) transfer is used when:",
    options: [
      "Cost savings are the priority",
      "Zero interruption is required and the two sources can be momentarily paralleled (synchronised) during the transfer, typically for less than 100 ms",
      "The generator is very small",
      "Only manual operation is available"
    ],
    correctAnswer: 1,
    explanation: "Closed-transition transfer momentarily connects both sources in parallel (typically for less than 100 ms) so the load experiences zero interruption during transfer. This requires the two sources to be synchronised (matched in voltage, frequency and phase angle) at the moment of parallel connection. Synchronising relays and check-sync controls ensure the sources are sufficiently matched before allowing the transfer. This method is essential for sensitive loads but adds complexity and cost."
  },
  {
    id: 4,
    question: "BS 7671 Regulation 551.7 requires that:",
    options: [
      "All installations must have a generator",
      "Where an installation incorporates switching between sources of supply, the switching arrangement must prevent parallel operation of sources unless the installation is specifically designed for it",
      "Only one source of supply is permitted",
      "Transfer switches are not covered by BS 7671"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Section 551 covers low-voltage generating sets. Regulation 551.7 requires that where switching arrangements transfer between sources, they must prevent unintended parallel operation. Paralleling unsynchronised sources can cause massive fault currents, generator damage and supply network disturbance. The ATS interlock system (mechanical and electrical) is the primary means of compliance. Where intentional paralleling is required (closed transition), appropriate synchronising controls must be installed."
  },
  {
    id: 5,
    question: "During ATS maintenance, the most critical check is:",
    options: [
      "Cleaning the enclosure",
      "Verifying the mechanical and electrical interlocks operate correctly to prevent both source contactors closing simultaneously, which would parallel the sources",
      "Checking the paint finish",
      "Measuring the ambient temperature"
    ],
    correctAnswer: 1,
    explanation: "The interlock system is the primary safety feature of the ATS. If both contactors could close simultaneously, the generator and mains supply would be paralleled — potentially causing massive fault currents, generator destruction, and danger to DNO network operatives. During maintenance: manually operate the interlock to verify it physically prevents both contactors from closing; check electrical interlock auxiliary contacts; test the interlock under simulated failure conditions; and verify the mechanical linkage is in good condition."
  },
  {
    id: 6,
    question: "The retransfer time delay (after normal supply restoration) is typically set to:",
    options: [
      "Zero — immediate retransfer",
      "5-30 minutes, to ensure the normal supply has genuinely stabilised and is not experiencing intermittent faults that would cause repeated transfers",
      "24 hours",
      "The same as the initial transfer delay"
    ],
    correctAnswer: 1,
    explanation: "The retransfer delay (typically 5-30 minutes, adjustable) ensures the restored mains supply is genuinely stable before transferring the load back from the generator. Without this delay, intermittent supply faults (common during storm damage restoration) would cause repeated transfers and retransfers, stressing the ATS contacts, causing load disruption, and cycling the generator. The generator continues to run during this delay, providing backup if the mains fails again."
  },
  {
    id: 7,
    question: "A four-pole ATS is required instead of a three-pole ATS when:",
    options: [
      "The system is three-phase",
      "The installation uses a TN-S earthing arrangement with a separate neutral and earth, requiring the neutral to be switched along with the three phases to prevent neutral current circulating between sources",
      "The generator is diesel",
      "Cost is not a concern"
    ],
    correctAnswer: 1,
    explanation: "A four-pole ATS switches all three phases plus the neutral. This is required when the two supply sources have separate neutral-earth bonds (as in a TN-S system with a generator having its own earth electrode). Without switching the neutral, fault current could circulate between the two earth paths via the neutral connection, causing nuisance RCD tripping and creating shock hazards. BS 7671 Regulation 551.4 and the DNO connection requirements determine whether four-pole switching is needed."
  },
  {
    id: 8,
    question: "Load shedding in conjunction with an ATS is used to:",
    options: [
      "Reduce electricity bills",
      "Prioritise critical loads by disconnecting non-essential loads when the generator cannot support the full installation load, ensuring essential services continue to operate",
      "Test the generator",
      "Balance the phases"
    ],
    correctAnswer: 1,
    explanation: "Load shedding allows the ATS system to disconnect non-essential loads (e.g., HVAC non-essential circuits, general lighting in unoccupied areas) when operating on the generator, ensuring the generator can support all critical loads (emergency lighting, fire alarm, lifts, IT systems, medical equipment) without overloading. Load shedding is typically implemented through auxiliary contactors controlled by the ATS, with loads prioritised into tiers."
  },
  {
    id: 9,
    question: "The ATS control panel typically monitors which parameters on each supply source?",
    options: [
      "Only voltage",
      "Voltage (all phases), frequency, phase sequence and phase angle — comparing each against programmable thresholds to determine if the source is acceptable for load connection",
      "Only current",
      "Only power factor"
    ],
    correctAnswer: 1,
    explanation: "The ATS controller monitors: voltage on all three phases (detecting loss, under-voltage and over-voltage); frequency (detecting under-frequency and over-frequency); phase sequence (detecting phase reversal which could damage motor loads); and in closed-transition systems, the phase angle between sources (for synchronisation). Each parameter has adjustable thresholds — the source must be within all thresholds to be considered acceptable. This comprehensive monitoring ensures the load is only connected to a healthy supply."
  },
  {
    id: 10,
    question: "During a monthly ATS test, the technician should record:",
    options: [
      "Only whether the transfer occurred",
      "All timing parameters (mains failure to gen start, gen start to stable output, stable output to load transfer, retransfer delay), voltage and frequency readings from both sources, and any abnormalities in the mechanical operation",
      "Only the generator fuel level",
      "Only the date of the test"
    ],
    correctAnswer: 1,
    explanation: "Comprehensive test records enable trend analysis and early detection of degradation. Record: time from mains failure simulation to generator start signal; generator run-up time to stable voltage and frequency; ATS transfer time; voltage and frequency readings from both sources at transfer and retransfer; retransfer delay time; generator cooldown time; any unusual mechanical noise, contact arcing or hesitation; and the condition of indicator lights and alarms. Compare readings with previous tests and commissioning data."
  },
  {
    id: 11,
    question: "Soft-load transfer is a feature that:",
    options: [
      "Reduces the ATS purchase cost",
      "Gradually transfers load from one source to the other over several seconds (in closed-transition systems) to minimise transient voltage disturbances and mechanical stress on the generator",
      "Is only available on manual switches",
      "Increases the transfer time to 30 minutes"
    ],
    correctAnswer: 1,
    explanation: "Soft-load transfer gradually shifts the load from one source to the other over a controlled period (typically 5-30 seconds) while both sources are paralleled. This avoids the sudden load step that occurs with instantaneous transfer, reducing transient voltage dips, minimising mechanical stress on the generator, and preventing nuisance tripping of sensitive loads. It is a feature of more sophisticated closed-transition ATS systems used in critical power installations."
  },
  {
    id: 12,
    question: "If an ATS fails to transfer during a genuine mains failure, the maintenance technician should first check:",
    options: [
      "The paint condition",
      "The generator output voltage and frequency (confirming the generator has started and reached stable output), then the ATS control circuit, transfer contactor coils, interlock mechanism and control wiring for faults",
      "The building fire alarm",
      "The weather conditions"
    ],
    correctAnswer: 1,
    explanation: "Systematic fault-finding: (1) Confirm the generator has started and is producing correct voltage and frequency; (2) Check the ATS control unit for fault indications and alarm codes; (3) Verify the control circuit supply (fuses, MCBs); (4) Check the transfer contactor coil voltage; (5) Inspect the mechanical interlock for jamming or damage; (6) Check auxiliary contact operation in the interlock circuit; (7) Verify the mains failure detection is registering correctly. Most ATS failures are caused by control circuit faults rather than mechanical failure of the main contacts."
  }
];

const faqs = [
  {
    question: "What is the difference between an ATS and a manual changeover switch?",
    answer: "An ATS automatically detects supply failure and transfers the load without human intervention. A manual changeover switch requires a person to physically operate the switch to transfer the load. Manual switches are used where: the generator is manually started; the installation is small; or the consequences of a brief delay in transfer are acceptable. For critical installations (hospitals, data centres, emergency services), an ATS is essential to minimise the duration of power interruption."
  },
  {
    question: "Can an ATS be used with a UPS system?",
    answer: "Yes — ATS and UPS serve complementary roles. The UPS provides immediate, seamless power continuity (zero transfer time) for sensitive loads during the period between mains failure and generator startup. The ATS transfers the UPS input supply from mains to generator once the generator is stable, allowing the UPS batteries to recharge. This combination provides both zero-interruption power for critical IT loads and long-duration backup via the generator."
  },
  {
    question: "How do I determine if I need a three-pole or four-pole ATS?",
    answer: "The choice depends on the earthing arrangement and the DNO requirements. In a TN-C-S (PME) system where the generator neutral is connected to the mains neutral, a three-pole ATS may suffice. In a TN-S system where the generator has its own earth electrode and separate neutral-earth bond, a four-pole ATS is required to prevent circulating neutral currents. Always consult the DNO (Distribution Network Operator) connection requirements and BS 7671 Section 551 before specifying."
  },
  {
    question: "What maintenance does an ATS require?",
    answer: "Monthly: simulate mains failure and verify the complete automatic sequence (detection, start, transfer, retransfer, shutdown); record all timing parameters and voltage/frequency readings. Six-monthly: clean contacts, check mechanical interlock operation, verify control wiring connections, test alarm and indication circuits. Annually: full-load transfer test; thermographic survey of all power connections; exercise the bypass-isolation facility; verify protection settings and time delays against commissioning data; update maintenance records."
  },
  {
    question: "What happens if both the mains and generator fail simultaneously?",
    answer: "If both sources fail, the ATS has no acceptable supply to connect. The load remains disconnected (both contactors open). The ATS controller will typically indicate a double-source failure alarm. For installations with UPS systems, the UPS batteries provide power for their rated autonomy period (typically 10-30 minutes). For critical installations, the design should include redundancy — multiple generators, dual UPS systems, or connection to two independent mains supplies — to minimise the risk of total power loss."
  }
];

const MOETModule3Section5_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 3.5.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Transfer Switches and Changeover Systems
          </h1>
          <p className="text-white/80">
            Automatic transfer switches and changeover procedures for standby power systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>ATS:</strong> Automatic mains failure detection and load transfer</li>
              <li className="pl-1"><strong>Types:</strong> Open transition (break-before-make), closed transition (make-before-break)</li>
              <li className="pl-1"><strong>Interlock:</strong> Prevents paralleling of unsynchronised sources</li>
              <li className="pl-1"><strong>Standards:</strong> BS 7671 Section 551, IEC 60947-6-1</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Testing:</strong> Monthly simulated failure, annual full-load transfer</li>
              <li className="pl-1"><strong>Interlocks:</strong> Verify mechanical and electrical interlock every visit</li>
              <li className="pl-1"><strong>Bypass:</strong> Allows ATS isolation without load interruption</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to auxiliary systems maintenance KSBs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the operating principles of automatic transfer switches",
              "Distinguish between open-transition and closed-transition transfer methods",
              "Describe the interlock requirements preventing source paralleling",
              "Carry out monthly and annual ATS testing procedures",
              "Identify common ATS faults and systematic fault-finding techniques",
              "Apply BS 7671 Section 551 requirements for generator changeover systems"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 01: ATS Operating Principles */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            ATS Operating Principles
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              An automatic transfer switch is the critical link between the normal mains supply and a
              standby generator. It monitors the mains supply continuously, detects failure conditions,
              initiates generator start-up, and transfers the electrical load automatically. Understanding
              the complete transfer sequence — and the safety interlocks that prevent dangerous parallel
              operation — is essential for every maintenance technician working on standby power systems.
            </p>
            <p>
              The ATS must discriminate between genuine supply failures (requiring transfer to generator)
              and transient disturbances (brief voltage dips, supply interruptions lasting a few seconds)
              that do not warrant a full transfer. This discrimination is achieved through adjustable time
              delays and voltage/frequency thresholds programmed into the ATS controller.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">ATS Transfer Sequence</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Step 1:</strong> Mains failure detected (voltage below threshold on any phase)</li>
                <li className="pl-1"><strong>Step 2:</strong> Time delay (3-10 s adjustable) to filter transient disturbances</li>
                <li className="pl-1"><strong>Step 3:</strong> Generator start signal sent if mains not restored</li>
                <li className="pl-1"><strong>Step 4:</strong> Generator runs up to stable voltage and frequency (typically 10-15 s)</li>
                <li className="pl-1"><strong>Step 5:</strong> ATS verifies generator output is within acceptable parameters</li>
                <li className="pl-1"><strong>Step 6:</strong> Mains contactor opens, generator contactor closes (open transition)</li>
                <li className="pl-1"><strong>Step 7:</strong> Load supplied from generator; ATS monitors mains for restoration</li>
                <li className="pl-1"><strong>Step 8:</strong> Mains restored — retransfer delay (5-30 min) to confirm stability</li>
                <li className="pl-1"><strong>Step 9:</strong> Retransfer: generator contactor opens, mains contactor closes</li>
                <li className="pl-1"><strong>Step 10:</strong> Generator cooldown period (typically 5 min), then shutdown</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Critical Safety: Source Interlock</p>
              <p className="text-sm text-white">
                The ATS must never allow both the mains and generator contactors to be closed simultaneously
                (unless the system is specifically designed for closed-transition transfer with synchronising
                controls). Simultaneous closure would parallel two unsynchronised AC sources, causing massive
                circulating fault currents that could destroy the generator, trip upstream protection, and
                endanger lives. The interlock system uses both mechanical linkage (physical prevention) and
                electrical interlocking (auxiliary contacts in the control circuit) to achieve this.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The interlock is the single most important safety feature of the ATS.
              Every maintenance visit must include verification that both mechanical and electrical interlocks
              operate correctly.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Transfer Methods */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Transfer Methods: Open and Closed Transition
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The method of transferring load between sources directly affects the power quality experienced
              by the connected equipment. Open-transition transfer creates a brief interruption;
              closed-transition transfer provides seamless changeover. The choice depends on the criticality
              of the loads and the acceptable level of supply interruption.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Transfer Method Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Feature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Open Transition</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Closed Transition</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Interruption</td>
                      <td className="border border-white/10 px-3 py-2">100-500 ms break</td>
                      <td className="border border-white/10 px-3 py-2">Zero (make-before-break)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Paralleling</td>
                      <td className="border border-white/10 px-3 py-2">Never — sources separated</td>
                      <td className="border border-white/10 px-3 py-2">Brief parallel (under 100 ms)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Synchronisation</td>
                      <td className="border border-white/10 px-3 py-2">Not required</td>
                      <td className="border border-white/10 px-3 py-2">Required — voltage, frequency, phase</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Complexity</td>
                      <td className="border border-white/10 px-3 py-2">Simple</td>
                      <td className="border border-white/10 px-3 py-2">Complex (synch relay, check-sync)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cost</td>
                      <td className="border border-white/10 px-3 py-2">Lower</td>
                      <td className="border border-white/10 px-3 py-2">Higher</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Application</td>
                      <td className="border border-white/10 px-3 py-2">General loads, motor loads</td>
                      <td className="border border-white/10 px-3 py-2">Data centres, hospitals, critical IT</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Most commercial and industrial installations use open-transition
              transfer with UPS support for critical loads. Closed-transition transfer is specified for
              installations where even the brief interruption of open transition is unacceptable and where
              the additional complexity and cost of synchronisation is justified.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: ATS Maintenance and Testing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            ATS Maintenance and Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              An ATS that is not regularly tested may fail at the critical moment when it is needed. Unlike
              most electrical equipment that operates continuously, an ATS may sit dormant for months or
              years between genuine mains failures. Regular testing is essential to verify that every
              component of the transfer sequence — from mains failure detection through to generator
              shutdown — operates correctly.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Monthly Test Procedure</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Simulate mains failure using the test switch on the ATS (do not isolate the actual mains)</li>
                <li className="pl-1">Verify the generator receives start signal and runs up to stable output</li>
                <li className="pl-1">Confirm the ATS transfers the load to the generator</li>
                <li className="pl-1">Record voltage and frequency from both sources</li>
                <li className="pl-1">Record all timing parameters and compare with commissioning data</li>
                <li className="pl-1">Restore the test switch — verify retransfer occurs after the programmed delay</li>
                <li className="pl-1">Confirm the generator enters cooldown and shuts down automatically</li>
                <li className="pl-1">Check all alarm and indication lamps operate correctly</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Annual Maintenance Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Full-load transfer test (coordinate with building management for planned outage)</li>
                <li className="pl-1">Thermographic survey of all power connections and contacts</li>
                <li className="pl-1">Inspect and clean main contacts (silvered contacts — use approved cleaner only)</li>
                <li className="pl-1">Verify mechanical interlock operation by manual test</li>
                <li className="pl-1">Check electrical interlock auxiliary contacts</li>
                <li className="pl-1">Retorque all power and control terminations</li>
                <li className="pl-1">Exercise the bypass-isolation switch (if fitted)</li>
                <li className="pl-1">Verify all protection settings match commissioning data</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Never skip the interlock verification during testing. A failed
              interlock is an invisible hazard — the ATS will appear to work normally until the one occasion
              when a fault condition causes both contactors to attempt to close simultaneously.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Bypass-Isolation and System Configuration */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Bypass-Isolation and System Configuration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In critical power installations, the ATS itself must be maintainable without shutting down the
              load. A bypass-isolation facility provides this capability by allowing the load to be connected
              directly to one source (normally the mains) while the ATS is completely isolated from the
              circuit. Understanding the bypass procedure is essential for maintenance technicians working on
              critical power systems.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Bypass Procedure</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Confirm load is on normal mains supply</li>
                  <li className="pl-1">Close the bypass switch (load now on mains via bypass)</li>
                  <li className="pl-1">Open the ATS mains contactor</li>
                  <li className="pl-1">Open the ATS isolation switches</li>
                  <li className="pl-1">ATS is now fully isolated — safe to maintain</li>
                  <li className="pl-1">Reverse procedure to restore ATS to service</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Configuration Considerations</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Three-pole vs four-pole switching (earthing arrangement)</li>
                  <li className="pl-1">Load shedding tiers for generator capacity management</li>
                  <li className="pl-1">Multiple ATS for different load priority groups</li>
                  <li className="pl-1">Integration with building management systems (BMS)</li>
                  <li className="pl-1">Remote monitoring and alarm reporting</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Under ST1426, maintenance technicians must understand standby power
              systems including ATS operation, testing and maintenance. This is part of the electrical
              plant, equipment and systems knowledge area. Practical competence in ATS testing is assessed
              through workplace observation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05: ATS Fault-Finding and Commissioning Verification */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            ATS Fault-Finding and Commissioning Verification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Systematic fault-finding is essential when an ATS fails to operate correctly. Because the
              ATS is a safety-critical system that must work during genuine emergencies, faults must be
              identified and resolved promptly. The maintenance technician must approach ATS fault-finding
              methodically, starting with the control system and working through the mechanical and
              electrical components in a logical sequence.
            </p>
            <p>
              Commissioning verification is equally important. When an ATS is first installed or after any
              modification, the complete transfer sequence must be verified against the design
              specification. This includes all timing parameters, voltage and frequency thresholds,
              interlock operation, and load shedding sequences. Commissioning data forms the baseline
              against which all future test results are compared.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Systematic Fault-Finding Procedure</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Step 1:</strong> Check the ATS controller display for fault codes and alarm indications — most modern ATS units provide diagnostic information</li>
                <li className="pl-1"><strong>Step 2:</strong> Verify the generator has started and reached stable voltage and frequency — an ATS cannot transfer to a source that is not ready</li>
                <li className="pl-1"><strong>Step 3:</strong> Check the control circuit supply — fuses, MCBs and control transformer feeding the ATS logic</li>
                <li className="pl-1"><strong>Step 4:</strong> Verify contactor coil voltage — measure at the coil terminals to confirm the control circuit is commanding the transfer</li>
                <li className="pl-1"><strong>Step 5:</strong> Inspect the mechanical interlock — look for physical jamming, broken linkages or misalignment preventing contactor operation</li>
                <li className="pl-1"><strong>Step 6:</strong> Check electrical interlock auxiliary contacts — verify they are making and breaking correctly in the control circuit</li>
                <li className="pl-1"><strong>Step 7:</strong> Review the mains failure detection settings — voltage thresholds and time delays may have drifted from commissioning values</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Commissioning Verification Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Record all voltage and frequency thresholds for mains failure detection</li>
                <li className="pl-1">Verify time delays: mains failure to start signal, transfer delay, retransfer delay, cooldown period</li>
                <li className="pl-1">Confirm mechanical and electrical interlock operation under simulated fault conditions</li>
                <li className="pl-1">Perform full-load transfer and retransfer, recording voltage transients</li>
                <li className="pl-1">Verify load shedding sequence operates correctly on generator transfer</li>
                <li className="pl-1">Test the bypass-isolation procedure if fitted</li>
                <li className="pl-1">Record all commissioning data as the baseline for future maintenance comparisons</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Under ST1426, maintenance technicians must demonstrate competence in
              maintaining auxiliary power systems including transfer switches. This includes understanding
              the complete transfer sequence, carrying out monthly and annual testing, and systematic
              fault-finding when problems are identified. Practical workplace observation of ATS testing
              forms part of the end-point assessment evidence.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">ATS Transfer Sequence</p>
                <ul className="space-y-0.5">
                  <li>Mains failure detected (voltage threshold)</li>
                  <li>Time delay 3-10 s (filter transients)</li>
                  <li>Generator start signal sent</li>
                  <li>Generator runs up (10-15 s)</li>
                  <li>ATS verifies gen output acceptable</li>
                  <li>Load transferred to generator</li>
                  <li>Retransfer delay 5-30 min on mains return</li>
                  <li>Generator cooldown then shutdown</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Maintenance Points</p>
                <ul className="space-y-0.5">
                  <li>Monthly -- simulated mains failure test</li>
                  <li>Annual -- full-load transfer test</li>
                  <li>Interlock verification every visit</li>
                  <li>Open transition: 100-500 ms break</li>
                  <li>Closed transition: zero interruption</li>
                  <li>3-pole vs 4-pole: depends on earthing</li>
                  <li>Bypass-isolation for ATS maintenance</li>
                  <li>BS 7671 Section 551 compliance</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section5-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Prev: Emergency Generators
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section5-5">
              Next: Critical Load Management
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule3Section5_4;
