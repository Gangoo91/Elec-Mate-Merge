import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "RCDs and RCBOs - MOET Module 2 Section 4.2";
const DESCRIPTION = "Comprehensive guide to residual current devices and combined protection units for electrical maintenance technicians: RCD operating principles, sensitivity ratings, types AC/A/F/B, RCBOs, BS 7671 requirements and testing.";

const quickCheckQuestions = [
  {
    id: "rcd-operating-principle",
    question: "What physical principle does an RCD use to detect earth fault current?",
    options: [
      "It measures the voltage between line and earth",
      "It detects the imbalance between line and neutral currents using a current transformer",
      "It monitors the temperature of the conductors",
      "It measures the resistance of the earth path"
    ],
    correctIndex: 1,
    explanation: "An RCD uses a toroidal (ring-shaped) current transformer through which both the line and neutral conductors pass. Under normal conditions, the currents in line and neutral are equal and opposite, producing zero net flux. When an earth fault diverts current away from the neutral return path, an imbalance is detected, inducing a voltage in the sensing coil that triggers the trip mechanism."
  },
  {
    id: "rcd-30ma-purpose",
    question: "A 30 mA RCD is primarily intended to provide protection against:",
    options: [
      "Overload currents in the circuit",
      "Short-circuit faults between line and neutral",
      "Electric shock by contact with live parts (additional protection)",
      "Voltage surges from lightning"
    ],
    correctIndex: 2,
    explanation: "A 30 mA (0.03 A) rated residual operating current (I Delta n) is the threshold recognised as providing additional protection against electric shock. At 30 mA, the current is below the level that would typically cause ventricular fibrillation in a healthy adult, provided the device operates within its specified time (40 ms at 5 x I Delta n for Type AC)."
  },
  {
    id: "rcbo-advantage",
    question: "What is the key advantage of an RCBO over a separate MCB and RCD combination?",
    options: [
      "RCBOs are significantly cheaper to purchase",
      "An RCBO combines overcurrent and earth fault protection in a single device, allowing individual circuit protection",
      "RCBOs have higher breaking capacity than MCBs",
      "RCBOs do not require testing"
    ],
    correctIndex: 1,
    explanation: "An RCBO (Residual Current operated Circuit Breaker with integral Overcurrent protection) combines MCB and RCD functions in a single device. This allows each circuit to have individual earth fault protection — if one circuit develops an earth fault, only that circuit's RCBO trips, leaving all other circuits unaffected. With a shared RCD protecting multiple circuits, all circuits on that RCD lose supply when any one develops a fault."
  },
  {
    id: "rcd-type-a",
    question: "A Type A RCD is designed to detect which types of residual current?",
    options: [
      "AC sinusoidal residual currents only",
      "AC sinusoidal and pulsating DC residual currents",
      "Smooth DC residual currents only",
      "High-frequency residual currents above 1 kHz"
    ],
    correctIndex: 1,
    explanation: "A Type A RCD detects both AC sinusoidal residual currents and pulsating DC residual currents (which contain a DC component). Pulsating DC residual currents are commonly produced by rectifier circuits found in electronic equipment such as EV chargers, IT equipment and variable speed drives. BS 7671 requires Type A (minimum) for most applications."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The rated residual operating current (I Delta n) of an RCD is defined as:",
    options: [
      "The maximum continuous current the device can carry",
      "The value of residual current at which the device is designed to operate",
      "The maximum fault current the device can interrupt",
      "The leakage current of the protected circuit"
    ],
    correctAnswer: 1,
    explanation: "I Delta n (I∆n) is the rated residual operating current — the value of earth fault (residual) current at which the RCD is designed to operate and disconnect the supply. Standard values include 30 mA, 100 mA and 300 mA. The device must operate at or below this current within the time specified by its standard."
  },
  {
    id: 2,
    question: "Under BS 7671 Regulation 411.3.3, additional protection by means of a 30 mA RCD is required for:",
    options: [
      "All circuits in a dwelling regardless of rating",
      "Socket outlets rated up to 32 A and mobile equipment rated up to 32 A used outdoors",
      "Fixed lighting circuits in commercial premises only",
      "Circuits supplying electric showers only"
    ],
    correctAnswer: 1,
    explanation: "Regulation 411.3.3 requires additional protection by a 30 mA RCD for socket outlets with a rated current not exceeding 32 A (except where a risk assessment justifies otherwise) and for mobile equipment with a rated current not exceeding 32 A intended for use outdoors. Amendment 2 extended this to essentially all circuits in dwellings."
  },
  {
    id: 3,
    question: "A Type AC RCD will NOT reliably detect:",
    options: [
      "A 50 Hz sinusoidal earth fault current",
      "A pulsating DC earth fault current from a rectifier circuit",
      "An earth fault current at 60 Hz",
      "An earth fault of 30 mA on a resistive load"
    ],
    correctAnswer: 1,
    explanation: "Type AC RCDs are designed only for sinusoidal AC residual currents. They cannot reliably detect pulsating DC or smooth DC residual currents. Equipment containing rectifiers (single-phase or three-phase) can produce DC components in the fault current that may saturate a Type AC RCD's core, preventing it from operating. This is why Type A or Type F devices are required for such applications."
  },
  {
    id: 4,
    question: "An RCD must be tested by pressing its integral test button:",
    options: [
      "Only during periodic inspection",
      "At intervals not exceeding 6 months (quarterly recommended for domestic)",
      "Only when a fault is suspected",
      "Once a year during the annual service"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 and manufacturer guidance require that RCDs are tested using the integral test button at regular intervals — typically quarterly for domestic installations. The test button creates a controlled imbalance to verify the mechanical trip mechanism operates correctly. This functional test does not verify tripping time — that requires an RCD tester during formal inspection and testing."
  },
  {
    id: 5,
    question: "A 'time-delayed' or 'S-type' RCD is used to:",
    options: [
      "Provide faster tripping than a standard RCD",
      "Provide a deliberate time delay to achieve discrimination with downstream instantaneous RCDs",
      "Operate only on DC residual currents",
      "Reduce nuisance tripping caused by motor starting currents"
    ],
    correctAnswer: 1,
    explanation: "An S-type (selective, time-delayed) RCD has an intentional time delay (typically 40-500 ms depending on the fault current multiple) that allows a downstream instantaneous RCD to operate first on a fault in its zone. This achieves RCD discrimination — the upstream S-type remains closed, maintaining supply to other circuits, while the downstream device clears the fault."
  },
  {
    id: 6,
    question: "When testing an RCD with an instrument during periodic inspection, the device must trip within:",
    options: [
      "1 second at rated residual current (I Delta n)",
      "300 ms at rated residual current and 40 ms at 5 x I Delta n (for Type AC/A general purpose)",
      "5 seconds at any test current",
      "200 ms at half the rated residual current"
    ],
    correctAnswer: 1,
    explanation: "For a general-purpose (non-time-delayed) Type AC or Type A RCD: at I∆n the device must trip within 300 ms; at 5 x I∆n it must trip within 40 ms. The instrument test at 5 x I∆n verifies the fast disconnection required for additional protection against electric shock. The device must NOT trip at 50% of I∆n (non-trip test)."
  },
  {
    id: 7,
    question: "Which type of RCD is required by BS 7671 for circuits supplying EV charging equipment?",
    options: [
      "Type AC is sufficient",
      "Type A minimum, with Type B or Type A + Type B RDC-DD where smooth DC fault currents may occur",
      "Type S (time-delayed) in all cases",
      "No RCD is required for EV charging"
    ],
    correctAnswer: 1,
    explanation: "EV charging equipment may produce DC fault currents due to the rectification in the charger. BS 7671 and IET guidance require a minimum of Type A RCD protection, with Type B or Type A plus a Type B RDC-DD (residual direct current detecting device) where smooth DC fault currents greater than 6 mA may occur. Many EV charger manufacturers specify the required RCD type in their installation instructions."
  },
  {
    id: 8,
    question: "Nuisance tripping of an RCD may be caused by:",
    options: [
      "The circuit being underloaded",
      "Excessive standing earth leakage current from multiple items of equipment on the same RCD",
      "The cable being oversized for the load",
      "The MCB rating being too high"
    ],
    correctAnswer: 1,
    explanation: "Every electrical circuit and item of equipment has some inherent earth leakage current. When multiple items share the same RCD, their cumulative leakage can approach the RCD's operating threshold (I∆n). IET guidance recommends that standing leakage should not exceed 30% of I∆n. For a 30 mA RCD, this means total leakage should be below 9 mA. Excessive leakage causes nuisance tripping, particularly during transient events."
  },
  {
    id: 9,
    question: "An RCBO to BS EN 61009 combines the functions of:",
    options: [
      "An RCD and an isolator",
      "An RCD and an MCB in a single device",
      "A surge protection device and an MCB",
      "A time-delay relay and a contactor"
    ],
    correctAnswer: 1,
    explanation: "An RCBO (Residual Current operated Circuit Breaker with integral Overcurrent protection) to BS EN 61009 combines the earth fault detection of an RCD with the overcurrent (overload and short-circuit) protection of an MCB in a single device. This provides comprehensive protection — overcurrent, short-circuit and earth fault — on a per-circuit basis."
  },
  {
    id: 10,
    question: "Under BS 7671, what is the maximum disconnection time for a 30 mA RCD providing additional protection?",
    options: [
      "40 ms at I Delta n",
      "40 ms at 5 x I Delta n",
      "300 ms at 5 x I Delta n",
      "5 seconds at I Delta n"
    ],
    correctAnswer: 1,
    explanation: "For additional protection against electric shock, BS 7671 Regulation 415.1.1 requires that the RCD operates within 40 ms at a test current of 5 times I∆n (i.e., 150 mA for a 30 mA device). This ensures rapid disconnection that limits the duration of shock to a level considered survivable for most individuals."
  },
  {
    id: 11,
    question: "A Type F RCD is specifically designed for circuits supplying:",
    options: [
      "Fluorescent lighting only",
      "Equipment with single-phase variable-frequency drives that produce mixed-frequency residual currents",
      "Fire alarm systems",
      "Fixed heating installations"
    ],
    correctAnswer: 1,
    explanation: "Type F RCDs are designed for circuits supplying single-phase variable-frequency drives (VFDs/inverters) that may produce composite residual currents containing AC, pulsating DC and mixed-frequency components. They are more sensitive than Type A to these complex waveforms but less expensive than Type B devices. BS 7671 recognises Type F for specific applications."
  },
  {
    id: 12,
    question: "If an RCD trips and cannot be successfully reset, the most likely cause is:",
    options: [
      "The test button is stuck",
      "A persistent earth fault exists on the protected circuit",
      "The supply voltage is too high",
      "The neutral conductor is undersized"
    ],
    correctAnswer: 1,
    explanation: "If an RCD trips and cannot be reset (it trips again immediately when the operating lever is pushed to the ON position), a persistent earth fault exists on one of the circuits it protects. The fault must be located and rectified before the RCD can be successfully reset. Systematic isolation of individual circuits will identify which circuit carries the fault."
  }
];

const faqs = [
  {
    question: "What is the difference between an RCD and an RCCB?",
    answer: "In practical UK usage, the terms are often interchangeable. Technically, RCD (Residual Current Device) is the generic term for any device that detects residual current. RCCB (Residual Current operated Circuit Breaker) is a specific type of RCD that provides earth fault protection without integral overcurrent protection — it must be used in conjunction with a separate MCB or fuse. An RCBO provides both earth fault and overcurrent protection in one device."
  },
  {
    question: "Why does my RCD trip when I press the test button but my circuit has no fault?",
    answer: "The test button is designed to simulate an earth fault by passing a small current through an internal resistor from line to earth, bypassing the current transformer. This creates the imbalance the RCD detects. Pressing the test button should always cause the RCD to trip — that is its purpose. It confirms the mechanical trip mechanism is working correctly. It does not indicate a fault on your circuits."
  },
  {
    question: "Can I replace a 30 mA RCD with a 100 mA RCD to stop nuisance tripping?",
    answer: "You must not increase the rated residual operating current above 30 mA on circuits where BS 7671 requires 30 mA protection (such as socket outlets up to 32 A and circuits in dwellings). The correct approach is to reduce the number of circuits on a single RCD (splitting onto separate RCDs or RCBOs) or to investigate and reduce the standing earth leakage current. A 100 mA or 300 mA RCD does not provide additional protection against electric shock."
  },
  {
    question: "How often should RCDs be formally tested with an instrument?",
    answer: "Formal instrument testing of RCDs (measuring actual tripping time and tripping current) should be carried out during periodic inspection in accordance with BS 7671 and IET Guidance Note 3. The recommended maximum intervals depend on the installation type — typically 5 years for domestic, 3 years for commercial, and 1 year for industrial. The integral test button should be pressed quarterly by the user."
  },
  {
    question: "Do I need RCD protection on lighting circuits in a new dwelling?",
    answer: "Yes. BS 7671:2018 Amendment 2 effectively requires RCD protection (30 mA) for all circuits in dwellings, including lighting circuits. This can be achieved using RCBOs for each circuit, a split-load consumer unit with RCDs protecting groups of circuits, or a high-integrity arrangement with two RCDs and appropriate circuit distribution."
  },
  {
    question: "What is a Type B RCD and when is it needed?",
    answer: "A Type B RCD detects AC sinusoidal, pulsating DC, and smooth DC residual currents at frequencies up to 1 kHz. It is required where equipment may produce smooth DC fault currents that would not be detected by Type A or Type AC devices. Common applications include three-phase variable speed drives, some medical equipment, and certain EV charging installations. Type B RCDs are significantly more expensive than Type A."
  }
];

const MOETModule2Section4_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
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
            <span>Module 2.4.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            RCDs and RCBOs
          </h1>
          <p className="text-white/80">
            Residual current devices and combined protection units for earth fault protection
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>RCD:</strong> Detects current imbalance between L and N (earth leakage)</li>
              <li className="pl-1"><strong>30 mA:</strong> Additional protection against electric shock</li>
              <li className="pl-1"><strong>Types:</strong> AC (sinusoidal), A (+ pulsating DC), F (+ mixed freq), B (+ smooth DC)</li>
              <li className="pl-1"><strong>RCBO:</strong> RCD + MCB combined — individual circuit protection</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Technician Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Testing:</strong> Push-button quarterly; instrument test at periodic inspection</li>
              <li className="pl-1"><strong>Nuisance tripping:</strong> Investigate leakage — do not uprate I&#916;n</li>
              <li className="pl-1"><strong>Fault finding:</strong> Systematic circuit isolation to locate earth faults</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to protection and earthing KSBs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the operating principle of residual current devices using current balance detection",
              "Identify RCD types (AC, A, F, B) and their appropriate applications",
              "Describe the role of 30 mA RCDs in providing additional protection against electric shock",
              "Understand RCBO construction and the advantages of individual circuit protection",
              "Apply BS 7671 requirements for RCD selection and disconnection times",
              "Carry out functional testing of RCDs and diagnose nuisance tripping"
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

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            How an RCD Works — The Current Balance Principle
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The residual current device is one of the most important safety devices in modern electrical
              installations. Its purpose is to detect earth fault currents — current that is flowing to earth
              through an unintended path, such as through a person's body or through damaged insulation to
              an earthed metallic enclosure — and to disconnect the supply rapidly before serious harm occurs.
            </p>
            <p>
              The operating principle is elegantly simple. Both the line and neutral conductors of a circuit
              pass through a toroidal (ring-shaped) current transformer core. Under normal, healthy conditions,
              the current flowing out through the line conductor is exactly equal to the current returning
              through the neutral conductor. These equal and opposite currents produce equal and opposite
              magnetic fluxes in the core, which cancel each other out, resulting in zero net flux and
              therefore zero voltage induced in the sensing coil wound around the core.
            </p>
            <p>
              When an earth fault occurs, some of the current returns to the source via the earth path instead
              of through the neutral conductor. The line current is now greater than the neutral current by
              the amount of the fault current. This imbalance — the residual current — creates a net magnetic
              flux in the core, which induces a voltage in the sensing coil. When this residual current reaches
              the rated operating threshold (I&#916;n), the induced voltage is sufficient to energise a sensitive
              relay that releases the trip mechanism, disconnecting the circuit.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key RCD Parameters</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Rated residual operating current (I&#916;n):</strong> The earth fault current at which the device operates — 30 mA, 100 mA, or 300 mA are standard values</li>
                <li className="pl-1"><strong>Rated current (In):</strong> The maximum continuous load current — must be coordinated with upstream or integral overcurrent protection</li>
                <li className="pl-1"><strong>Operating time:</strong> Must not exceed 300 ms at I&#916;n and 40 ms at 5 &times; I&#916;n (for general-purpose non-delayed types)</li>
                <li className="pl-1"><strong>Non-operating current:</strong> The device must NOT trip at 50% of I&#916;n (15 mA for a 30 mA device)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Critical Understanding</p>
              <p className="text-sm text-white">
                An RCD does not protect against overload or short-circuit between line and neutral. It only
                detects current imbalance (earth leakage). It also cannot protect against shock from contact
                between line and neutral simultaneously (as no current flows to earth). An RCD provides
                additional protection — it is not a substitute for basic protection (insulation, barriers)
                or fault protection (automatic disconnection via overcurrent devices and earthing).
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            RCD Types — AC, A, F and B
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Not all earth fault currents are pure sinusoidal AC. Modern electronic equipment containing
              rectifiers, inverters and switch-mode power supplies can produce fault currents with DC
              components or complex waveforms. Different RCD types are designed to detect different forms
              of residual current, and selecting the correct type is essential for reliable protection.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Type AC</h3>
                <p className="text-sm text-white mb-2">
                  Detects sinusoidal AC residual currents only. This is the most basic type and is identified
                  by a sinusoidal wave symbol on the device. Type AC cannot reliably detect pulsating DC or
                  smooth DC residual currents. In fact, a DC component in the fault current can saturate the
                  magnetic core, preventing the device from operating even on a pure AC fault.
                </p>
                <p className="text-sm text-white/70">
                  <strong>Application:</strong> Very limited in modern installations. BS 7671 generally requires
                  Type A as a minimum. Type AC is only suitable where no electronic equipment is present.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Type A</h3>
                <p className="text-sm text-white mb-2">
                  Detects sinusoidal AC and pulsating DC residual currents. Pulsating DC is the waveform
                  produced by single-phase rectification (half-wave or full-wave). This type is identified by
                  a sinusoidal wave plus a pulsating DC symbol. Type A is the minimum requirement for most
                  circuits under current BS 7671 guidance.
                </p>
                <p className="text-sm text-white/70">
                  <strong>Application:</strong> General-purpose protection for circuits supplying equipment with
                  single-phase rectifiers — washing machines, dishwashers, IT equipment, LED drivers.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Type F</h3>
                <p className="text-sm text-white mb-2">
                  Detects sinusoidal AC, pulsating DC, and composite residual currents that contain
                  mixed frequencies. These complex waveforms are produced by single-phase variable-frequency
                  drives and inverter-based equipment. Type F provides enhanced sensitivity to these waveforms
                  compared to Type A.
                </p>
                <p className="text-sm text-white/70">
                  <strong>Application:</strong> Circuits supplying single-phase inverter drives (e.g., washing
                  machines with variable-speed motors, heat pumps, some air conditioning units).
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Type B</h3>
                <p className="text-sm text-white mb-2">
                  Detects sinusoidal AC, pulsating DC, smooth DC (up to 1 kHz) and composite residual
                  currents. This is the most comprehensive type, required where smooth DC fault currents
                  may be present — typically from three-phase rectifier circuits. Type B RCDs use a more
                  complex sensing arrangement, often incorporating electronic detection alongside the
                  magnetic core.
                </p>
                <p className="text-sm text-white/70">
                  <strong>Application:</strong> Three-phase variable speed drives, some EV charging equipment,
                  certain medical devices, three-phase UPS systems.
                </p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">RCD Type Selection Summary</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Detects</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">AC</td>
                      <td className="border border-white/10 px-3 py-2">Sinusoidal AC only</td>
                      <td className="border border-white/10 px-3 py-2">Purely resistive loads (limited use)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">A</td>
                      <td className="border border-white/10 px-3 py-2">AC + pulsating DC</td>
                      <td className="border border-white/10 px-3 py-2">General circuits, single-phase rectifier loads</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">F</td>
                      <td className="border border-white/10 px-3 py-2">AC + pulsating DC + mixed frequency</td>
                      <td className="border border-white/10 px-3 py-2">Single-phase inverter/VFD circuits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">B</td>
                      <td className="border border-white/10 px-3 py-2">AC + pulsating DC + smooth DC</td>
                      <td className="border border-white/10 px-3 py-2">Three-phase VFDs, some EV chargers</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance note:</strong> When replacing an RCD, always check that the replacement type
              matches or exceeds the original. Downgrading from Type A to Type AC, for example, would remove
              protection against pulsating DC faults and could be dangerous.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            RCBOs — Combined Protection Devices
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              An RCBO (Residual Current operated Circuit Breaker with integral Overcurrent protection) to
              BS EN 61009 combines the earth fault detection capability of an RCD with the overload and
              short-circuit protection of an MCB in a single compact device. This combination provides
              comprehensive protection for individual circuits and is increasingly the standard approach in
              modern consumer units and distribution boards.
            </p>
            <p>
              The key advantage of RCBOs over a shared RCD protecting multiple circuits is selectivity.
              When a single RCD protects, say, six circuits, an earth fault on any one of those circuits
              will trip the RCD and disconnect all six. In a domestic setting, this could mean losing
              lighting, heating and refrigeration because of a fault on one socket circuit. With individual
              RCBOs, only the circuit with the fault loses supply — all other circuits remain energised.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">RCBO Specifications</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Overcurrent rating (In):</strong> Same as MCB ratings — 6, 10, 16, 20, 25, 32, 40, 50 A</li>
                <li className="pl-1"><strong>Trip type:</strong> B, C or D (same characteristics as standalone MCBs)</li>
                <li className="pl-1"><strong>Residual current rating (I&#916;n):</strong> Typically 30 mA for final circuits</li>
                <li className="pl-1"><strong>RCD type:</strong> Type A as standard; Type F and Type B available for specialist applications</li>
                <li className="pl-1"><strong>Breaking capacity:</strong> Typically 6 kA or 10 kA</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Advantages of RCBOs</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Individual circuit earth fault protection</li>
                  <li className="pl-1">A fault on one circuit does not affect others</li>
                  <li className="pl-1">Easier fault finding — the tripped RCBO identifies the faulty circuit</li>
                  <li className="pl-1">Eliminates the need for separate RCDs and split-load boards</li>
                  <li className="pl-1">Compliance with BS 7671 high-integrity arrangement</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Considerations</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Higher cost per circuit than shared RCD arrangement</li>
                  <li className="pl-1">Consumer unit must be compatible (check busbar type)</li>
                  <li className="pl-1">Must still be tested both by push-button and instrument</li>
                  <li className="pl-1">Correct RCD type (A, F, B) must still be selected for the load</li>
                  <li className="pl-1">Replacement must match both MCB and RCD specifications</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Amendment 2 to BS 7671:2018 requires that all circuits in dwellings
              have RCD protection. A consumer unit populated entirely with RCBOs is one of the simplest ways
              to comply with this requirement whilst providing the best level of discrimination and continuity
              of supply.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            BS 7671 Requirements and Disconnection Times
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 addresses RCD requirements in several regulations. The main provisions relate to
              additional protection (Regulation 411.3.3), fault protection in TT systems (Regulation 411.5),
              and fire protection (Regulation 422.3.9 and 532.1). Understanding these requirements is
              essential for maintenance technicians who need to verify that existing RCD protection is
              adequate and correctly specified.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key BS 7671 RCD Regulations</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Reg 411.3.3 — Additional protection:</strong> 30 mA RCD required for socket outlets &le; 32 A, mobile equipment &le; 32 A outdoors, and (per Amendment 2) all circuits in dwellings</li>
                <li className="pl-1"><strong>Reg 411.5 — TT systems:</strong> RCDs are the primary means of fault protection in TT earthing systems where the earth fault loop impedance is too high for overcurrent devices to achieve disconnection within the required time</li>
                <li className="pl-1"><strong>Reg 422.3.9 — Fire protection:</strong> 300 mA RCD required where the risk of fire is increased (e.g., locations with combustible materials, cable routes through fire-risk areas)</li>
                <li className="pl-1"><strong>Reg 415.1.1 — Disconnection time:</strong> For additional protection, RCD must operate within 40 ms at 5 &times; I&#916;n</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">RCD Test Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Test</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Test Current</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Required Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Non-trip (no trip)</td>
                      <td className="border border-white/10 px-3 py-2">50% of I&#916;n</td>
                      <td className="border border-white/10 px-3 py-2">Device must NOT trip</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Trip at rated current</td>
                      <td className="border border-white/10 px-3 py-2">100% of I&#916;n</td>
                      <td className="border border-white/10 px-3 py-2">&le; 300 ms (general) or &le; 200 ms (Type S)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fast trip (5x)</td>
                      <td className="border border-white/10 px-3 py-2">5 &times; I&#916;n</td>
                      <td className="border border-white/10 px-3 py-2">&le; 40 ms (general purpose)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Nuisance Tripping — Diagnosis and Solutions</p>
              <p className="text-sm text-white mb-2">
                Nuisance tripping is one of the most common RCD-related issues that maintenance technicians
                face. It occurs when the cumulative standing earth leakage current from all connected equipment
                approaches the RCD's operating threshold.
              </p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                <li className="pl-1"><strong>IET guidance:</strong> Standing leakage should not exceed 30% of I&#916;n (9 mA for 30 mA RCD)</li>
                <li className="pl-1"><strong>Solution 1:</strong> Split circuits across multiple RCDs or use individual RCBOs</li>
                <li className="pl-1"><strong>Solution 2:</strong> Investigate specific equipment with high leakage (EMC filters, long cable runs)</li>
                <li className="pl-1"><strong>Solution 3:</strong> Check for deteriorating insulation resistance on the circuit</li>
                <li className="pl-1"><strong>Never:</strong> Uprate the I&#916;n to stop tripping where 30 mA protection is required</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard requires understanding of
              protection devices and their role in maintaining electrical safety. Being able to test, diagnose
              and replace RCDs correctly is a core maintenance skill assessed under the electrical engineering
              pathway.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            RCD Discrimination and Special Applications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In installations with multiple levels of RCD protection, it is important that only the device
              nearest to the fault operates, leaving the upstream RCD closed and maintaining supply to healthy
              circuits. This is RCD discrimination (selectivity), and it requires careful coordination of
              device ratings and time delays.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Achieving RCD Discrimination</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Time discrimination:</strong> The upstream RCD must be a time-delayed type (S-type or selective) with a deliberate operating delay. The downstream RCD is an instantaneous type that operates within 40 ms. The upstream S-type has a minimum non-operating time that exceeds the downstream device's maximum operating time.</li>
                <li className="pl-1"><strong>Current discrimination:</strong> The upstream RCD has a higher I&#916;n rating (e.g., 100 mA or 300 mA) than the downstream device (30 mA). However, current discrimination alone does not guarantee selectivity — the upstream device may still operate on high-magnitude faults.</li>
                <li className="pl-1"><strong>Combined approach:</strong> For reliable discrimination, both time and current discrimination should be employed — the upstream device should have both a higher I&#916;n and a time delay.</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Special Applications</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-white mb-1">EV Charging</p>
                  <p className="text-sm text-white/80">
                    Electric vehicle charging circuits require careful RCD selection due to the potential for
                    DC fault currents from the charging electronics. BS 7671 and IET guidance require Type A
                    as minimum, with Type B or Type A plus Type B RDC-DD where smooth DC faults exceeding
                    6 mA may occur. Many EV charger manufacturers incorporate DC protection within the unit
                    itself, allowing a standard Type A RCD or RCBO to be used upstream.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Fire Protection (300 mA)</p>
                  <p className="text-sm text-white/80">
                    A 300 mA RCD does not provide shock protection but can detect earth leakage currents that
                    could cause heating and ignition of combustible materials. BS 7671 Regulation 422.3.9
                    requires 300 mA RCD protection for cable routes in locations with increased fire risk.
                    This is a fire prevention measure, not a personnel protection measure.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">TT Earthing Systems</p>
                  <p className="text-sm text-white/80">
                    In TT systems, the earth fault loop impedance is typically too high for overcurrent devices
                    to achieve the required disconnection times. RCDs become the primary means of fault
                    protection (not just additional protection). The maximum earth fault loop impedance for an
                    RCD is calculated as Zs &le; 50 V / I&#916;n. For a 30 mA RCD, this gives Zs &le; 1667 ohms — easily
                    achievable even with a basic earth electrode.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> RCDs are life-saving devices. As a maintenance technician, ensuring that
              RCDs are present where required, correctly specified, and regularly tested is one of your most
              important responsibilities. Never bypass, remove or defeat an RCD — doing so removes a critical
              layer of protection and may constitute a criminal offence under the Electricity at Work
              Regulations 1989.
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
                <p className="font-medium text-white mb-1">RCD Types</p>
                <ul className="space-y-0.5">
                  <li>Type AC — sinusoidal AC only</li>
                  <li>Type A — AC + pulsating DC (minimum standard)</li>
                  <li>Type F — AC + pulsating DC + mixed frequency</li>
                  <li>Type B — AC + pulsating DC + smooth DC</li>
                  <li>Type S — time-delayed for discrimination</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key BS 7671 Regulations</p>
                <ul className="space-y-0.5">
                  <li>Reg 411.3.3 — Additional protection (30 mA)</li>
                  <li>Reg 411.5 — TT system fault protection</li>
                  <li>Reg 415.1.1 — 40 ms at 5 &times; I&#916;n</li>
                  <li>Reg 422.3.9 — Fire protection (300 mA)</li>
                  <li>BS EN 61008 — RCCBs; BS EN 61009 — RCBOs</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section4-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Fuses and Circuit Breakers
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section4-3">
              Next: Overcurrent and Short-Circuit Protection
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule2Section4_2;
