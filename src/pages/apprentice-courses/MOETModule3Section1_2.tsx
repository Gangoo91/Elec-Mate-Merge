import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "HV/LV Switchgear Types - MOET Module 3 Section 1.2";
const DESCRIPTION = "Comprehensive guide to HV and LV switchgear types for electrical maintenance technicians: SF6 and vacuum circuit breakers, ring main units, HV voltage definitions, oil circuit breakers, HV safety rules, authorised persons and ST1426 compliance.";

const quickCheckQuestions = [
  {
    id: "hv-definition",
    question: "At what voltage does the definition of high voltage begin for AC systems in the UK?",
    options: [
      "230 V",
      "400 V",
      "Above 1000 V",
      "Above 3300 V"
    ],
    correctIndex: 2,
    explanation: "In the UK, high voltage is defined as any voltage exceeding 1000 V AC between conductors, or 600 V AC between conductors and earth. This definition is established by the Electricity at Work Regulations 1989 and is fundamental to the safety framework around HV systems."
  },
  {
    id: "sf6-gwp",
    question: "What is the approximate global warming potential of SF6 gas compared to CO2?",
    options: [
      "100 times",
      "1,000 times",
      "10,000 times",
      "23,500 times"
    ],
    correctIndex: 3,
    explanation: "SF6 has a global warming potential approximately 23,500 times that of CO2, making it one of the most potent greenhouse gases known. This is why its use is strictly regulated under EU F-Gas regulations, and alternatives such as vacuum technology and clean-air insulation are increasingly preferred."
  },
  {
    id: "rmu-teeoff",
    question: "In a typical ring main unit, what is the function of the tee-off panel?",
    options: [
      "Connects to the incoming ring cable",
      "Feeds and protects the transformer",
      "Connects to the outgoing ring cable",
      "Provides earthing only"
    ],
    correctIndex: 1,
    explanation: "The tee-off panel contains a circuit breaker or fuse-switch that feeds the HV/LV transformer. It provides fault protection for the transformer and can be opened to isolate the transformer for maintenance, whilst the ring cables remain energised."
  },
  {
    id: "hv-fifth-rule",
    question: "What is the fifth safety rule that applies to HV isolation but not typically to LV?",
    options: [
      "Disconnect",
      "Prove dead",
      "Apply portable protective earths",
      "Secure with locks"
    ],
    correctIndex: 2,
    explanation: "The fifth HV safety rule is to apply portable protective earths (PPEs) at the point of work. This step discharges any stored energy (e.g., from cable capacitance) and protects workers if the system is inadvertently re-energised. This additional step is beyond standard LV isolation procedures because of the much greater stored energy in HV systems."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "At what voltage does the UK definition of high voltage begin for AC systems?",
    options: [
      "Above 230 V",
      "Above 400 V",
      "Above 1000 V",
      "Above 3300 V"
    ],
    correctAnswer: 2,
    explanation: "High voltage in the UK is defined as exceeding 1000 V AC between conductors, as per the Electricity at Work Regulations 1989."
  },
  {
    id: 2,
    question: "What is the most common HV distribution voltage in the UK?",
    options: [
      "3.3 kV",
      "6.6 kV",
      "11 kV",
      "33 kV"
    ],
    correctAnswer: 2,
    explanation: "11 kV is the most common primary distribution voltage in the UK, used to supply local substations from grid substations."
  },
  {
    id: 3,
    question: "What arc-quenching medium is used in SF6 circuit breakers?",
    options: [
      "Oil",
      "Vacuum",
      "Sulphur hexafluoride gas",
      "Air"
    ],
    correctAnswer: 2,
    explanation: "SF6 circuit breakers use sulphur hexafluoride gas, which has approximately 2.5 times the dielectric strength of air at atmospheric pressure."
  },
  {
    id: 4,
    question: "How many operations can a modern vacuum circuit breaker typically perform?",
    options: [
      "100",
      "1,000",
      "10,000",
      "30,000"
    ],
    correctAnswer: 3,
    explanation: "Modern vacuum circuit breakers can typically perform up to 30,000 operations, giving them a very long electrical life with minimal maintenance."
  },
  {
    id: 5,
    question: "In a standard ring main unit, how many panels are there in a typical configuration?",
    options: [
      "Two",
      "Three",
      "Four",
      "Five"
    ],
    correctAnswer: 1,
    explanation: "A typical RMU has three panels: two ring switches (incoming and outgoing) and one tee-off panel (circuit breaker or fuse-switch) feeding the transformer."
  },
  {
    id: 6,
    question: "Who is authorised to carry out HV switching operations?",
    options: [
      "Any qualified electrician",
      "An Authorised Person (HV)",
      "A Competent Person (HV)",
      "The site manager"
    ],
    correctAnswer: 1,
    explanation: "Only a formally appointed Authorised Person (AP) may carry out HV switching operations and issue safety documents such as permits to work."
  },
  {
    id: 7,
    question: "What is the correct order of the five HV safety rules?",
    options: [
      "Isolate, Disconnect, Earth, Prove Dead, Secure",
      "Disconnect, Isolate, Secure, Prove Dead, Earth",
      "Prove Dead, Disconnect, Isolate, Secure, Earth",
      "Disconnect, Earth, Isolate, Secure, Prove Dead"
    ],
    correctAnswer: 1,
    explanation: "The correct order is: Disconnect, Isolate, Secure (lock off), Prove Dead, Earth. This sequence ensures safety at each stage before proceeding to the next."
  },
  {
    id: 8,
    question: "Why are portable protective earths applied during HV work?",
    options: [
      "To test the earth rod",
      "To discharge stored energy and protect against inadvertent re-energisation",
      "To reduce touch voltage only",
      "To improve power factor"
    ],
    correctAnswer: 1,
    explanation: "Portable protective earths discharge any stored energy (such as cable capacitance) and provide protection if the system is inadvertently re-energised during work."
  },
  {
    id: 9,
    question: "If the LV side of a transformer is isolated, what is the status of the HV side?",
    options: [
      "Also isolated automatically",
      "De-energised by default",
      "Still energised at 11 kV unless separately isolated",
      "Safe to touch"
    ],
    correctAnswer: 2,
    explanation: "Isolating the LV side does NOT isolate the HV winding. The HV primary remains energised until an Authorised Person carries out separate HV isolation."
  },
  {
    id: 10,
    question: "What type of HV circuit breaker uses no gas or oil and is most environmentally friendly?",
    options: [
      "SF6 breaker",
      "Oil circuit breaker",
      "Vacuum circuit breaker",
      "Air-blast breaker"
    ],
    correctAnswer: 2,
    explanation: "Vacuum circuit breakers use no gas or oil — the arc is extinguished in a sealed vacuum bottle. They are the most environmentally friendly option and are increasingly replacing SF6 types."
  },
  {
    id: 11,
    question: "What temperature can an HV arc flash exceed?",
    options: [
      "500 degrees Celsius",
      "2,000 degrees Celsius",
      "10,000 degrees Celsius",
      "20,000 degrees Celsius"
    ],
    correctAnswer: 3,
    explanation: "HV arc flash temperatures can exceed 20,000 degrees Celsius, causing severe burns, blast injuries and hearing damage even at a distance from the arc point."
  },
  {
    id: 12,
    question: "What advantage does a ring main configuration provide over a radial feeder?",
    options: [
      "Lower cost",
      "Simpler design",
      "Supply resilience if a cable section fails",
      "Higher voltage capacity"
    ],
    correctAnswer: 2,
    explanation: "A ring main provides resilience because each substation can be fed from either direction. If one cable section is faulted, the ring can be split and supply maintained from the other side."
  }
];

const faqs = [
  {
    question: "Can I enter an HV switchroom as an LV maintenance technician?",
    answer: "Only if specifically authorised and escorted by an Authorised Person. You must never enter an HV switchroom alone or without proper authorisation, even if the door is unlocked. HV areas are controlled access zones with strict safety rules governing entry."
  },
  {
    question: "Why is SF6 being phased out?",
    answer: "SF6 is a potent greenhouse gas with a global warming potential of approximately 23,500 times CO2. EU F-Gas regulations are progressively restricting its use. Manufacturers are developing alternatives using vacuum technology and clean-air insulation. Many new switchgear installations now specify SF6-free equipment."
  },
  {
    question: "If the LV supply is isolated, is the transformer safe to work on?",
    answer: "No. Isolating the LV side does not isolate the HV winding. The transformer primary remains energised at 11 kV until separately isolated by an Authorised Person from the HV side. Never assume the HV side is dead because the LV side has been isolated."
  },
  {
    question: "What is the difference between a ring main and a radial feeder?",
    answer: "A ring main forms a continuous loop so that each substation can be fed from either direction, providing resilience if a cable section is faulted. A radial feeder is a single cable from the source — if it fails, supply is lost. Ring main configurations are standard for commercial and industrial HV distribution."
  },
  {
    question: "How long do sealed-for-life SF6 switchgear units typically last?",
    answer: "Modern sealed-for-life SF6 switchgear typically has an operational lifespan of 25 to 30 years. During this period, no gas maintenance is required. The units include gas pressure monitoring and will lockout if the gas pressure drops below the minimum required for safe operation. At end of life, the SF6 gas must be recovered by trained personnel using approved gas handling equipment."
  }
];

const MOETModule3Section1_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section1">
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
            <span>Module 3.1.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            HV/LV Switchgear Types
          </h1>
          <p className="text-white/80">
            HV definitions, SF6 breakers, vacuum circuit breakers, ring main units and HV safety rules
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>HV:</strong> Exceeds 1000 V AC; UK distribution typically 11 kV</li>
              <li className="pl-1"><strong>SF6:</strong> Gas-insulated breakers, 23,500x CO2 warming potential</li>
              <li className="pl-1"><strong>Vacuum:</strong> Environmentally friendly, up to 30,000 operations</li>
              <li className="pl-1"><strong>RMU:</strong> 3-panel ring main unit at substation entry point</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Awareness:</strong> LV technicians must recognise HV equipment</li>
              <li className="pl-1"><strong>Safety rules:</strong> Disconnect, Isolate, Secure, Prove Dead, Earth</li>
              <li className="pl-1"><strong>Authorisation:</strong> Only APs may switch HV equipment</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to hazard awareness and safe working KSBs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define high voltage as per UK regulations and standards",
              "Describe the operating principles of SF6 and vacuum circuit breakers",
              "Explain ring main unit configurations and their purpose in distribution networks",
              "Outline the HV safety rules and the role of Authorised Persons",
              "Identify the key dangers associated with HV equipment",
              "Recognise the boundaries of LV maintenance technician responsibilities around HV systems"
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

        {/* Section 01: Defining High Voltage */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Defining High Voltage
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In the United Kingdom, high voltage (HV) is defined as any voltage exceeding 1000 V AC or 1500 V DC between conductors, or 600 V AC or 900 V DC between conductors and earth. This definition comes from the Electricity at Work Regulations 1989 and is fundamental to understanding the safety framework around HV systems.
            </p>
            <p>
              The most common HV distribution voltage in the UK is 11 kV (11,000 V), used for primary distribution from grid substations to local substations. Some larger commercial and industrial sites have their own 11 kV intake, while others may operate at 33 kV or even 132 kV for very large power consumers. Understanding these voltage levels is essential for recognising the equipment you may encounter on site.
            </p>
            <p>
              As a maintenance technician working to the ST1426 standard, you are not expected to work on HV equipment. However, you must understand the hazards, recognise HV apparatus, and know the safety rules that govern access and work near HV systems. Many commercial and industrial premises have HV switchrooms adjacent to or within the same building as LV equipment you will be maintaining.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">HV Voltage Categories</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Voltage Range</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical UK Usage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Low Voltage (LV)</td>
                      <td className="border border-white/10 px-3 py-2">Up to 1000 V AC / 1500 V DC</td>
                      <td className="border border-white/10 px-3 py-2">230/400 V distribution, final circuits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">High Voltage (HV)</td>
                      <td className="border border-white/10 px-3 py-2">Exceeding 1000 V AC / 1500 V DC</td>
                      <td className="border border-white/10 px-3 py-2">3.3 kV, 6.6 kV, 11 kV, 33 kV distribution</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Extra High Voltage (EHV)</td>
                      <td className="border border-white/10 px-3 py-2">Typically 66 kV and above</td>
                      <td className="border border-white/10 px-3 py-2">Sub-transmission networks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Super Grid</td>
                      <td className="border border-white/10 px-3 py-2">275 kV and 400 kV</td>
                      <td className="border border-white/10 px-3 py-2">National transmission network</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Dangers of High Voltage</p>
              <p className="text-sm text-white">
                The primary hazard of HV systems is the potential for fatal electric shock and severe arc flash. At 11 kV, an electric arc can form across an air gap of approximately 30 mm, but in practice, safety clearances are measured in hundreds of millimetres. Arc flash temperatures can exceed 20,000 degrees Celsius, causing severe burns, blast injuries and hearing damage even at a distance from the arc. Unlike LV systems where contact is typically required for shock, HV can cause flashover across air gaps — you do not need to physically touch an HV conductor to be electrocuted.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Approaching too closely to energised HV equipment is potentially fatal. Always respect HV warning signs and restricted areas, and never enter an HV switchroom without proper authorisation and escort.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: HV Circuit Breaker Types */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            HV Circuit Breaker Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              HV circuit breakers must safely interrupt fault currents that can reach tens of thousands of amperes at voltages of 11 kV or more. The energy that must be dissipated during fault clearance is enormous, requiring specialised arc-quenching technologies. The three main types you may encounter are SF6, vacuum and oil (legacy).
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">SF6 Circuit Breakers</h3>
              <p className="text-sm text-white mb-3">
                Sulphur hexafluoride (SF6) circuit breakers use SF6 gas as the arc-quenching medium. SF6 has exceptional dielectric properties — approximately 2.5 times the dielectric strength of air at atmospheric pressure. When the contacts separate, the arc is formed in the SF6 gas, which absorbs the energy and extinguishes the arc rapidly.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Compact, reliable and have long service intervals (25-30 years)</li>
                <li className="pl-1">Typically sealed-for-life units requiring no gas maintenance</li>
                <li className="pl-1">Include gas pressure monitoring and lockout on low pressure</li>
                <li className="pl-1">SF6 is a potent greenhouse gas (GWP ~23,500x CO2) — strict handling regulations apply</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Vacuum Circuit Breakers</h3>
              <p className="text-sm text-white mb-3">
                Vacuum circuit breakers (VCBs) use a vacuum interrupter to extinguish the arc. The contacts are enclosed in a sealed vacuum bottle. When the contacts separate, the arc forms in the residual metal vapour and is extinguished extremely quickly — typically within 10 milliseconds.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Environmentally friendly — no greenhouse gases or oil</li>
                <li className="pl-1">Minimal maintenance and very long electrical life (up to 30,000 operations)</li>
                <li className="pl-1">Compact design increasingly popular for 11 kV and 33 kV applications</li>
                <li className="pl-1">Many new installations now specify vacuum as the preferred technology</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">HV Circuit Breaker Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Feature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">SF6</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Vacuum</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Oil (Legacy)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Arc medium</td>
                      <td className="border border-white/10 px-3 py-2">SF6 gas</td>
                      <td className="border border-white/10 px-3 py-2">Vacuum</td>
                      <td className="border border-white/10 px-3 py-2">Mineral oil</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Environmental impact</td>
                      <td className="border border-white/10 px-3 py-2">High (greenhouse gas)</td>
                      <td className="border border-white/10 px-3 py-2">Low</td>
                      <td className="border border-white/10 px-3 py-2">Moderate (fire risk)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Maintenance</td>
                      <td className="border border-white/10 px-3 py-2">Minimal (sealed for life)</td>
                      <td className="border border-white/10 px-3 py-2">Minimal</td>
                      <td className="border border-white/10 px-3 py-2">Regular oil sampling</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Typical life</td>
                      <td className="border border-white/10 px-3 py-2">25-30 years</td>
                      <td className="border border-white/10 px-3 py-2">25-30 years</td>
                      <td className="border border-white/10 px-3 py-2">Being phased out</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Note:</strong> Although largely obsolete for new installations, oil circuit breakers (OCBs) may still be encountered in older substations. They use mineral oil both as an insulating medium and for arc quenching. OCBs require regular oil sampling and testing, present a fire risk, and are gradually being replaced by SF6 or vacuum types during refurbishment programmes.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Ring Main Units */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Ring Main Units
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A ring main unit (RMU) is a compact, sealed switchgear assembly used at the point where an 11 kV distribution cable enters a substation. RMUs are the most common type of HV switchgear you will encounter in commercial buildings and small industrial sites. Understanding their configuration is essential for recognising HV equipment on site.
            </p>
            <p>
              The typical RMU configuration is a three-panel arrangement providing both ring continuity and transformer protection. The ring configuration provides resilience — if one section of cable is damaged, the ring can be split and supply maintained from the other direction. This is why commercial and industrial HV distribution networks are almost always arranged as rings rather than radial feeders.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Three-Panel RMU Configuration</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Ring Switch 1 (incoming):</strong> A load-break switch connecting to the incoming ring cable from the upstream substation</li>
                <li className="pl-1"><strong>Circuit Breaker / Fuse Switch (tee-off):</strong> A circuit breaker or fuse-switch that feeds the transformer — this is the protective device for the transformer</li>
                <li className="pl-1"><strong>Ring Switch 2 (outgoing):</strong> A load-break switch connecting to the outgoing ring cable to the next substation in the ring</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Ring Main Advantages</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Supply resilience — dual feed path to each substation</li>
                  <li className="pl-1">Faulted sections can be isolated without total loss of supply</li>
                  <li className="pl-1">Maintenance can be planned without customer disconnection</li>
                  <li className="pl-1">Standard configuration for commercial HV distribution</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Maintenance Awareness</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Modern RMUs are gas-insulated, sealed for life</li>
                  <li className="pl-1">Include integral earthing facilities</li>
                  <li className="pl-1">An RMU is energised at 11 kV even if the LV side is isolated</li>
                  <li className="pl-1">Clean-air alternatives increasingly replacing SF6 types</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Always recognise that an RMU is energised at 11 kV — even if the transformer secondary (LV side) has been isolated. The ring cables passing through the RMU may be energised from either direction.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: HV Safety Rules and Authorisation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            HV Safety Rules and Authorisation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Work on or near HV systems is governed by strict safety rules. In the UK, the principal framework is the Electricity at Work Regulations 1989, supplemented by the Distribution Safety Rules (for DNO networks) and site-specific HV safety rules for private HV installations. Understanding these rules and the authorisation hierarchy is essential, even for LV maintenance technicians.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">HV Safety Roles</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Role</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Authority</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Competence Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Authorised Person (AP)</td>
                      <td className="border border-white/10 px-3 py-2">Carries out HV switching; issues and cancels safety documents</td>
                      <td className="border border-white/10 px-3 py-2">Specific HV training; formal written appointment by the duty holder</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Competent Person (CP)</td>
                      <td className="border border-white/10 px-3 py-2">Carries out work on HV equipment under a safety document</td>
                      <td className="border border-white/10 px-3 py-2">Trained in the work to be done; understands safety documentation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">LV Technician</td>
                      <td className="border border-white/10 px-3 py-2">May work on LV systems near HV; must not access HV equipment</td>
                      <td className="border border-white/10 px-3 py-2">Awareness of HV hazards; recognises HV areas and signage</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">The Five HV Safety Rules</h3>
              <p className="text-sm text-white mb-3">
                When HV equipment is to be worked on, the following five safety rules must be applied in strict order:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>1. Disconnect:</strong> The equipment must be disconnected from all sources of supply by opening the appropriate switching devices</li>
                <li className="pl-1"><strong>2. Isolate:</strong> The equipment must be isolated by creating a visible break in the circuit (isolation point)</li>
                <li className="pl-1"><strong>3. Secure:</strong> Apply locks and safety notices to prevent re-energisation; keys retained by the person controlling the work</li>
                <li className="pl-1"><strong>4. Prove Dead:</strong> The equipment must be proved dead at the point of work using approved HV voltage detection equipment</li>
                <li className="pl-1"><strong>5. Earth:</strong> Apply portable protective earths (PPEs) at the point of work to discharge stored energy and protect against inadvertent re-energisation</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">LV Technician Awareness Responsibilities</p>
              <p className="text-sm text-white">
                As an LV maintenance technician, your responsibilities around HV equipment include: never entering an HV switchroom unless authorised and escorted; recognising HV warning signs and restricted areas; understanding that isolating the LV side does not isolate the HV side; reporting any defects or damage to HV equipment immediately; and knowing the emergency procedures for HV incidents. If your LV work requires isolation of a transformer, remember that the HV side remains energised unless separately isolated by an Authorised Person.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The fifth HV safety rule — applying portable protective earths — is additional to standard LV isolation procedures. This is because HV systems have much greater stored energy and a risk of induced voltages on de-energised HV cables running parallel to energised ones.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05: HV Equipment Identification on Site */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            HV Equipment Identification on Site
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              As a maintenance technician, you should be able to recognise common HV equipment and understand the signage used to identify HV areas. This awareness is essential for your personal safety and for preventing inadvertent interference with HV systems during your LV maintenance activities.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Transformers</h3>
              <p className="text-sm text-white">
                The HV/LV transformer steps down the 11 kV supply to 400/230 V. Transformers may be oil-filled (with a conservator tank and cooling fins) or cast resin (dry type, often used indoors). The transformer will have HV cable terminations on one side and LV cable connections on the other. Always treat the transformer as HV equipment — even the LV terminals carry significant fault energy. Oil-filled transformers require regular oil sampling and testing as part of their maintenance regime.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">HV Cables and Cable Routes</h3>
              <p className="text-sm text-white">
                HV cables are typically identified by their larger diameter, red or black colour, trefoil arrangement, and prominent cable markers or labels. They may be routed through dedicated ducts or on dedicated cable trays. HV cable routes should be clearly marked with warning tape (buried cables) or labels (surface-mounted cables). When working near cable routes, always verify the cable voltage before proceeding.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Warning Signs and Access Restrictions</h3>
              <p className="text-sm text-white">
                HV switchrooms and substations must display standard safety signs including the yellow triangular "Danger of Death" sign, "Authorised Personnel Only" notices, and first aid and emergency procedure notices. Access to HV areas is typically controlled by locked doors with restricted key access. Never attempt to enter an HV area without proper authorisation — even if the door appears to be unlocked, entry without permission is a serious safety breach.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Substation Layouts</h3>
              <p className="text-sm text-white">
                A typical indoor substation in a commercial building contains the RMU, one or two transformers, and the LV main switchboard. The HV and LV sections may be in the same room or separated by a firewall. The HV section requires restricted access, whilst the LV switchboard may be more accessible for routine maintenance. Always check the room layout and identify the HV section boundaries before commencing any work in a substation environment.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Under the Electricity at Work Regulations 1989, no person shall be engaged in any work activity on or near any live conductor other than one suitably insulated unless it is reasonable for them to be at work on or near it. For HV systems, this means strict access control and formal safety documentation at all times.
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
                <p className="font-medium text-white mb-1">HV Safety Rules (5 Steps)</p>
                <ul className="space-y-0.5">
                  <li>1. Disconnect — open switching devices</li>
                  <li>2. Isolate — create visible break</li>
                  <li>3. Secure — lock off, retain keys</li>
                  <li>4. Prove Dead — approved HV tester</li>
                  <li>5. Earth — apply portable protective earths</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key References</p>
                <ul className="space-y-0.5">
                  <li>EAWR 1989 — HV definitions, safe systems</li>
                  <li>Distribution Safety Rules — DNO HV work</li>
                  <li>EU F-Gas Regulations — SF6 handling</li>
                  <li>IEC 62271 — HV switchgear standards</li>
                  <li>ST1426 — Hazard awareness KSBs</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section1-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Prev: LV Switchgear
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section1-3">
              Next: Circuit Breaker Operations
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule3Section1_2;
