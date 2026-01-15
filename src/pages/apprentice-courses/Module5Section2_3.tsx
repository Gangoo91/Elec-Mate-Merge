import { ArrowLeft, ArrowRight, Shield, Building2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";
import { useState } from "react";

const TITLE = "Selecting Suitable Protective Devices (MCBs, RCDs - Intro Only) - Module 5.2.3 | Level 2 Electrical Course";
const DESCRIPTION = "Learn the basics of selecting Miniature Circuit Breakers (MCBs) and Residual Current Devices (RCDs) for electrical installations, covering types, ratings, and BS 7671 compliance.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What do MCBs protect against?",
    options: ["Only overload", "Only short circuits", "Overload and short-circuit faults", "Electric shock"],
    correctIndex: 2,
    explanation: "MCBs protect against both overload and short-circuit faults."
  },
  {
    id: 2,
    question: "What is the typical RCD sensitivity for domestic installations?",
    options: ["10 mA", "30 mA", "100 mA", "300 mA"],
    correctIndex: 1,
    explanation: "30 mA is the typical trip sensitivity for domestic RCD installations."
  },
  {
    id: 3,
    question: "Which MCB type is most commonly used in domestic circuits?",
    options: ["Type A", "Type B", "Type C", "Type D"],
    correctIndex: 1,
    explanation: "Type B MCBs are most commonly used in domestic circuits as they trip at 3-5 times rated current."
  }
];

const Module5Section2_3 = () => {
  useSEO(TITLE, DESCRIPTION);
  const [showFaqs, setShowFaqs] = useState(false);

  const quizQuestions = [
    {
      id: 1,
      question: "What do MCBs protect against?",
      options: ["Only overload", "Only short circuits", "Overload and short-circuit faults", "Electric shock"],
      correctAnswer: 2,
      explanation: "MCBs protect against both overload and short-circuit faults."
    },
    {
      id: 2,
      question: "What do RCDs protect against?",
      options: ["Overload", "Short circuits", "Earth leakage currents and electric shock", "Voltage fluctuations"],
      correctAnswer: 2,
      explanation: "RCDs protect against earth leakage currents and reduce the risk of electric shock."
    },
    {
      id: 3,
      question: "What is the typical RCD sensitivity for domestic installations?",
      options: ["10 mA", "30 mA", "100 mA", "300 mA"],
      correctAnswer: 1,
      explanation: "30 mA is the typical trip sensitivity for domestic RCD installations."
    },
    {
      id: 4,
      question: "Which MCB type is most common in domestic circuits?",
      options: ["Type A", "Type B", "Type C", "Type D"],
      correctAnswer: 1,
      explanation: "Type B MCBs are most commonly used in domestic circuits."
    },
    {
      id: 5,
      question: "True or False: An MCB can provide protection against electric shock.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False - MCBs protect against overload and short circuits. RCDs provide shock protection."
    },
    {
      id: 6,
      question: "What BS 7671 regulation requires RCD protection for sockets ≤32 A?",
      options: ["Regulation 411.3.3", "Regulation 433.1", "Regulation 434.1", "Regulation 525.1"],
      correctAnswer: 0,
      explanation: "Regulation 411.3.3 requires RCD protection for sockets ≤32 A in domestic installations."
    },
    {
      id: 7,
      question: "A lighting circuit uses 1.5 mm² cable. What MCB rating would typically be used?",
      options: ["3 A", "6 A", "10 A", "16 A"],
      correctAnswer: 1,
      explanation: "6 A MCB is typically used for lighting circuits with 1.5 mm² cable."
    },
    {
      id: 8,
      question: "Which MCB type would you likely use for industrial machinery?",
      options: ["Type A", "Type B", "Type C", "Type D"],
      correctAnswer: 3,
      explanation: "Type D MCBs are typically used for industrial applications with heavy machinery."
    },
    {
      id: 9,
      question: "How often should RCDs be tested with the built-in test button?",
      options: ["Monthly", "Every 3 months", "Every 6 months", "Annually"],
      correctAnswer: 2,
      explanation: "RCDs should be tested every 6 months using the test button (or as per manufacturer guidance)."
    },
    {
      id: 10,
      question: "Why is it important to coordinate MCB and RCD selection?",
      options: ["To reduce costs", "To ensure protection against both overloads and electric shock without nuisance tripping", "To make installation easier", "To comply with aesthetics"],
      correctAnswer: 1,
      explanation: "Coordination ensures protection against both overloads and electric shock while preventing nuisance tripping."
    }
  ];

  const faqs = [
    {
      question: "What's the difference between MCBs and RCDs?",
      answer: "MCBs protect against overload and short-circuit faults by monitoring current flow. RCDs protect against earth leakage and electric shock by monitoring the balance between live and neutral currents."
    },
    {
      question: "Can I use a Type C MCB on domestic lighting circuits?",
      answer: "It's not recommended. Type C MCBs require higher fault currents to trip (5-10x rated current) which may not operate quickly enough with domestic fault levels. Type B is appropriate for domestic lighting."
    },
    {
      question: "Do I need RCD protection for all circuits?",
      answer: "BS 7671 requires RCD protection for socket outlets ≤32A in domestic installations, outdoor equipment, and circuits in bathrooms. Other circuits may also require RCD protection depending on the installation."
    },
    {
      question: "How do I know if my MCB rating is correct?",
      answer: "The MCB rating must not exceed the cable's current-carrying capacity and must be able to carry the expected load. Check cable tables in BS 7671 and consider installation method and ambient temperature."
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 5.2
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 5</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 5.2.3</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Selecting Suitable Protective Devices (MCBs, RCDs – Intro Only)
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Learn the basics of selecting Miniature Circuit Breakers (MCBs) and Residual Current Devices (RCDs) for safe electrical installations.
            </p>
          </header>

          {/* Quick Reference */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="font-semibold text-elec-yellow mb-3">Quick Reference</p>
            <div className="grid sm:grid-cols-2 gap-4 text-white/80 text-sm">
              <div>
                <p className="font-medium text-white mb-1">In 30 Seconds:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>MCBs protect against overload and short circuits</li>
                  <li>RCDs protect against earth leakage and electric shock</li>
                  <li>Type B (domestic), Type C (commercial), Type D (industrial)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Spot it / Use it:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Spot:</strong> 30mA RCD for domestic sockets ≤32A</li>
                  <li><strong>Use:</strong> BS 7671 Reg 411.3.3 and 433.1</li>
                  <li><strong>Check:</strong> MCB rating matches cable capacity</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">00</span>
              Introduction
            </h2>
            <p className="text-white/80 leading-relaxed">
              Protective devices are essential for safeguarding people, equipment, and cables from overloads, short circuits, and earth faults. Choosing the correct protective device ensures that circuits operate safely and comply with BS 7671 Wiring Regulations. This subsection introduces the basics of selecting Miniature Circuit Breakers (MCBs) and Residual Current Devices (RCDs).
            </p>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Learning Outcomes
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Explain the purpose of protective devices</li>
              <li>Identify when to use MCBs vs RCDs</li>
              <li>Recognise the different MCB ratings and applications</li>
              <li>Understand the role of RCDs in shock protection</li>
              <li>Apply BS 7671 guidance when selecting protective devices</li>
            </ul>
          </section>

          {/* Purpose of Protective Devices */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Purpose of Protective Devices
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Protective devices serve multiple critical functions in electrical installations:</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Essential Functions</p>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-elec-yellow">Prevent Overheating:</p>
                    <ul className="text-sm ml-4 list-disc space-y-1 mt-1">
                      <li>Stop cables and equipment from overheating due to excessive current</li>
                      <li>Prevent fire hazards and equipment damage</li>
                      <li>Maintain safe operating temperatures within design limits</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-elec-yellow">Automatic Disconnection:</p>
                    <ul className="text-sm ml-4 list-disc space-y-1 mt-1">
                      <li>Instantly disconnect supply when overload or fault current occurs</li>
                      <li>Operate without human intervention</li>
                      <li>Isolate faulty circuits to prevent spreading damage</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-elec-yellow">Electric Shock Protection:</p>
                    <ul className="text-sm ml-4 list-disc space-y-1 mt-1">
                      <li>RCDs detect earth leakage currents</li>
                      <li>Provide additional protection against indirect contact</li>
                      <li>Reduce risk of fatal electric shock incidents</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="font-medium text-green-400 mb-2">Key Principle</p>
                <p className="text-sm">
                  Protective devices must operate fast enough to prevent dangerous conditions but not so sensitive as to cause nuisance tripping during normal operation.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="protective-devices-purpose-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* MCBs */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Miniature Circuit Breakers (MCBs)
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>MCBs are the most common protective device for protecting against overload and short-circuit faults:</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">MCB Operating Principles</p>
                <ul className="text-sm list-disc ml-4 space-y-1">
                  <li><strong>Thermal protection:</strong> Bi-metallic strip responds to overload currents</li>
                  <li><strong>Magnetic protection:</strong> Electromagnetic coil responds to short-circuit currents</li>
                  <li><strong>Arc extinction:</strong> SF6 gas or vacuum chamber extinguishes the arc safely</li>
                  <li><strong>Mechanical indication:</strong> Clear ON/OFF position and trip indication</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">MCB Ratings (Amperes)</p>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-elec-yellow mb-2">Common Domestic Ratings:</p>
                    <ul className="space-y-1">
                      <li><strong>6 A:</strong> Lighting circuits (max 8 points)</li>
                      <li><strong>16 A:</strong> Immersion heaters, small appliances</li>
                      <li><strong>20 A:</strong> Radial socket circuits (max 20m²)</li>
                      <li><strong>32 A:</strong> Ring final circuits, small cookers</li>
                      <li><strong>40 A:</strong> Electric cookers up to 11kW</li>
                      <li><strong>45 A:</strong> Electric showers up to 10.5kW</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-elec-yellow mb-2">Commercial/Industrial:</p>
                    <ul className="space-y-1">
                      <li><strong>50 A:</strong> Large single-phase loads</li>
                      <li><strong>63 A:</strong> Maximum single-phase MCB rating</li>
                      <li><strong>80-125 A:</strong> Three-phase distribution</li>
                      <li><strong>Breaking capacity:</strong> 6kA, 10kA, or 25kA</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-medium text-white">MCB Types (Trip Characteristics):</p>

                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-elec-yellow mb-2">Type B - Domestic Applications</p>
                  <div className="text-sm grid sm:grid-cols-2 gap-3">
                    <ul className="list-disc ml-4 space-y-1">
                      <li><strong>Trip range:</strong> 3-5x rated current</li>
                      <li><strong>Magnetic trip:</strong> 3-5 × In (instantaneous)</li>
                      <li><strong>Applications:</strong> Resistive loads, domestic circuits</li>
                    </ul>
                    <ul className="list-disc ml-4 space-y-1">
                      <li>Lighting circuits (incandescent, LED)</li>
                      <li>Socket outlets in homes</li>
                      <li>Immersion heaters</li>
                    </ul>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-elec-yellow mb-2">Type C - Light Commercial</p>
                  <div className="text-sm grid sm:grid-cols-2 gap-3">
                    <ul className="list-disc ml-4 space-y-1">
                      <li><strong>Trip range:</strong> 5-10x rated current</li>
                      <li><strong>Higher immunity:</strong> To inrush currents</li>
                      <li><strong>Applications:</strong> Inductive loads, small motors</li>
                    </ul>
                    <ul className="list-disc ml-4 space-y-1">
                      <li>Fluorescent lighting with ballasts</li>
                      <li>Small motors (up to 2-3kW)</li>
                      <li>Transformers and power supplies</li>
                    </ul>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-elec-yellow mb-2">Type D - Industrial Applications</p>
                  <div className="text-sm grid sm:grid-cols-2 gap-3">
                    <ul className="list-disc ml-4 space-y-1">
                      <li><strong>Trip range:</strong> 10-20x rated current</li>
                      <li><strong>High inrush tolerance:</strong> For motor starting</li>
                      <li><strong>Applications:</strong> Large motors, welding</li>
                    </ul>
                    <ul className="list-disc ml-4 space-y-1">
                      <li>Large three-phase motors</li>
                      <li>Welding equipment</li>
                      <li>Heavy industrial machinery</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="font-medium text-green-400 mb-2">Practical Calculation Example</p>
                <div className="text-sm space-y-2">
                  <p><strong>Scenario:</strong> Selecting MCB for 2.5mm² cable feeding socket outlets</p>
                  <div className="bg-black/20 p-2 rounded">
                    <p><strong>Step 1:</strong> Cable capacity = 27A (Method C, 70°C cable)</p>
                    <p><strong>Step 2:</strong> Grouping factor = 0.8 (4 cables together)</p>
                    <p><strong>Step 3:</strong> Derated capacity = 27A × 0.8 = 21.6A</p>
                    <p><strong>Step 4:</strong> MCB selection = 20A (next size down)</p>
                    <p><strong>Result:</strong> 20A Type B MCB for radial socket circuit</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="mcb-types-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* RCDs */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Residual Current Devices (RCDs)
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>RCDs provide essential protection against earth leakage and electric shock:</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">How RCDs Work</p>
                <ul className="text-sm list-disc ml-4 space-y-1">
                  <li><strong>Core balance principle:</strong> Live and neutral conductors pass through a toroidal core</li>
                  <li><strong>Normal operation:</strong> Live and neutral currents are equal and opposite</li>
                  <li><strong>Earth fault detection:</strong> Imbalance creates a secondary current in the detection circuit</li>
                  <li><strong>Trip mechanism:</strong> Detection circuit energises the trip coil to open contacts</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">RCD Types and Ratings</p>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-elec-yellow mb-2">Sensitivity Ratings:</p>
                    <ul className="space-y-1">
                      <li><strong>10 mA:</strong> Special locations (medical, wet areas)</li>
                      <li><strong>30 mA:</strong> Personal protection (domestic standard)</li>
                      <li><strong>100 mA:</strong> Fire protection in TT earthing systems</li>
                      <li><strong>300 mA:</strong> Fire protection in larger installations</li>
                      <li><strong>500 mA:</strong> Equipment protection only (not personal)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-elec-yellow mb-2">RCD Types by Waveform:</p>
                    <ul className="space-y-1">
                      <li><strong>AC Type:</strong> Responds to AC residual currents only</li>
                      <li><strong>A Type:</strong> AC + pulsating DC residual currents</li>
                      <li><strong>B Type:</strong> AC + DC + high-frequency currents</li>
                      <li><strong>F Type:</strong> Mixed frequency applications</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">RCBO vs RCD + MCB</p>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 rounded bg-green-500/10 border border-green-500/30">
                    <p className="font-medium text-green-400 mb-1">RCBOs (Combined Protection)</p>
                    <ul className="list-disc ml-4 space-y-1">
                      <li><strong>Advantages:</strong> Single device, space-saving</li>
                      <li><strong>Selectivity:</strong> Fault affects only the faulty circuit</li>
                      <li><strong>Applications:</strong> Critical circuits, commercial</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded bg-blue-500/10 border border-blue-500/30">
                    <p className="font-medium text-blue-400 mb-1">RCD + MCB (Split Protection)</p>
                    <ul className="list-disc ml-4 space-y-1">
                      <li><strong>Advantages:</strong> Lower unit costs</li>
                      <li><strong>Disadvantage:</strong> Single RCD fault affects multiple circuits</li>
                      <li><strong>Typical use:</strong> Domestic installations</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                <p className="font-medium text-orange-400 mb-2">Nuisance Tripping - Causes and Solutions</p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="font-medium text-white mb-1">Common Causes:</p>
                    <ul className="list-disc ml-4 space-y-1">
                      <li>Moisture in cables or accessories</li>
                      <li>Damaged cable insulation</li>
                      <li>High earth leakage from IT equipment</li>
                      <li>Neutral-earth faults in circuits</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Solutions:</p>
                    <ul className="list-disc ml-4 space-y-1">
                      <li>Install type A or B RCDs for DC leakage</li>
                      <li>Use time-delayed RCDs for discrimination</li>
                      <li>Check and repair cable insulation</li>
                      <li>Install surge protection devices (SPDs)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <p className="font-medium text-red-400 mb-2">Critical Safety Points</p>
                <ul className="text-sm ml-4 list-disc space-y-1">
                  <li><strong>Not a substitute:</strong> RCDs do not protect against overload or short circuits</li>
                  <li><strong>Test regularly:</strong> Monthly testing ensures continued protection</li>
                  <li><strong>Professional testing:</strong> Annual calibration testing required</li>
                  <li><strong>Correct type:</strong> Ensure RCD type matches the connected equipment</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="rcd-sensitivity-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* Coordinating MCBs and RCDs */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Coordinating MCBs and RCDs
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>MCBs and RCDs are often used together in consumer units to provide comprehensive protection:</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Typical Coordination Examples:</p>
                <ul className="text-sm space-y-2">
                  <li><strong>Socket circuit:</strong> 32A MCB + 30mA RCD (overload + shock protection)</li>
                  <li><strong>Immersion heater:</strong> 16A MCB + 30mA RCD (fixed appliance protection)</li>
                  <li><strong>Lighting circuit:</strong> 6A MCB (RCD optional but recommended)</li>
                  <li><strong>Outdoor supplies:</strong> Appropriate MCB + 30mA RCD (mandatory)</li>
                </ul>

                <div className="p-3 rounded bg-blue-500/10 border border-blue-500/30 mt-4">
                  <p className="font-medium text-blue-400 mb-1">Design Principle</p>
                  <p className="text-sm">
                    Each protection type addresses different risks: MCBs for overload/short circuit, RCDs for earth leakage/shock.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* BS 7671 Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              BS 7671 Guidance
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-white mb-2">Core Protection Requirements:</p>
                    <ul className="space-y-1">
                      <li><strong>Regulation 411.3.3:</strong> RCD protection required for sockets ≤32 A (domestic)</li>
                      <li><strong>Regulation 433.1:</strong> MCBs must protect against overloads</li>
                      <li><strong>Regulation 434.1:</strong> Protection against fault currents</li>
                      <li><strong>Regulation 531.2:</strong> Devices must have adequate breaking capacity</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-2">Selection and Installation:</p>
                    <ul className="space-y-1">
                      <li><strong>Load compatibility:</strong> Based on load type, environment, and regulations</li>
                      <li><strong>Coordination:</strong> Devices must work together without conflicts</li>
                      <li><strong>Discrimination:</strong> Upstream devices should be selective</li>
                      <li><strong>Future expansion:</strong> Allow for load growth and additions</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <p className="font-medium text-blue-400 mb-2">Key BS 7671 Tables for Device Selection:</p>
                <ul className="text-sm space-y-1">
                  <li><strong>Table 41.5:</strong> Maximum disconnection times for shock protection</li>
                  <li><strong>Appendix 3:</strong> Current-carrying capacity of cables</li>
                  <li><strong>Appendix 4:</strong> Voltage drop calculations</li>
                  <li><strong>Section 536:</strong> Co-ordination of protective devices</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <Building2 className="w-5 h-5 text-orange-400" />
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="font-semibold text-orange-400 mb-2">The Wrong MCB Type Mistake</p>
              <p className="text-white/80 text-sm mb-3">
                <strong>The Scenario:</strong> In a small office installation, an electrician used a Type C MCB on a domestic lighting circuit. This caused nuisance tripping because Type C devices require higher fault currents to operate. The correct choice should have been a Type B MCB suitable for low domestic fault currents.
              </p>

              <div className="space-y-3">
                <div className="p-3 rounded bg-black/20">
                  <p className="font-medium text-white mb-2 text-sm">The Problem:</p>
                  <ul className="text-xs list-disc ml-4 space-y-1 text-white/70">
                    <li><strong>Wrong selection:</strong> 6A Type C MCB used for lighting circuit</li>
                    <li><strong>Load characteristics:</strong> Simple resistive loads (LED and fluorescent)</li>
                    <li><strong>Trip characteristic:</strong> Type C needs 5-10x rated current (30-60A) to trip</li>
                  </ul>
                </div>

                <div className="p-3 rounded bg-red-500/10 border border-red-500/30">
                  <p className="font-medium text-red-400 mb-2 text-sm">The Consequences:</p>
                  <ul className="text-xs list-disc ml-4 space-y-1 text-white/70">
                    <li>Nuisance tripping during normal switching operations</li>
                    <li>Slow fault clearance for small faults</li>
                    <li>Client complaints - lights going off during meetings</li>
                    <li>Delayed project - had to replace all lighting MCBs</li>
                  </ul>
                </div>

                <div className="p-3 rounded bg-green-500/10 border border-green-500/30">
                  <p className="font-medium text-green-400 mb-2 text-sm">The Solution:</p>
                  <ul className="text-xs list-disc ml-4 space-y-1 text-white/70">
                    <li>Replace with 6A Type B MCBs</li>
                    <li>Type B characteristics: Trips at 3-5x rated current (18-30A)</li>
                    <li>Reliable operation under all conditions</li>
                  </ul>
                </div>
              </div>

              <div className="p-3 rounded bg-elec-yellow/10 border border-elec-yellow/30 mt-3">
                <p className="text-xs text-white/80">
                  <strong>Key lesson:</strong> MCB type selection must match the installation type and expected fault levels. Type B for domestic, Type C for light commercial, Type D for heavy industrial.
                </p>
              </div>
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <Shield className="w-5 h-5 text-elec-yellow" />
              Pocket Guide – Protective Devices
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <p className="font-semibold text-blue-400 mb-2 text-sm">MCB Quick Reference</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>✅ MCBs = protect against overload/short circuit</li>
                  <li>✅ Type B (domestic), Type C (commercial), Type D (industrial)</li>
                  <li>✅ Rating must not exceed cable capacity</li>
                  <li>✅ 6A lighting, 16A immersion, 32A ring final</li>
                  <li>✅ Check breaking capacity vs fault current</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="font-semibold text-green-400 mb-2 text-sm">RCD Quick Reference</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>✅ RCDs = protect against earth leakage/shock</li>
                  <li>✅ 30mA sensitivity for domestic installations</li>
                  <li>✅ Required for sockets ≤32A (BS 7671)</li>
                  <li>✅ Test every 6 months using test button</li>
                  <li>✅ Must trip within 40ms at 5 × IΔn</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                <p className="font-semibold text-purple-400 mb-2 text-sm">BS 7671 Key Regulations</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>📋 Reg 411.3.3 - RCD protection for sockets ≤32A</li>
                  <li>⚡ Reg 433.1 - Overload protection</li>
                  <li>🔒 Reg 434.1 - Fault current protection</li>
                  <li>🎯 Match device to load and environment</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                <p className="font-semibold text-orange-400 mb-2 text-sm">Selection Checklist</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>🔍 Match device rating to cable capacity</li>
                  <li>⚡ Consider load type and characteristics</li>
                  <li>🏠 Choose correct MCB type for environment</li>
                  <li>🛡️ Apply RCD where required by regulations</li>
                  <li>📝 Document selections and reasons</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-white/10 mt-4">
              <p className="text-sm text-white/80 text-center">
                <strong>Remember:</strong> MCBs protect cables and equipment, RCDs protect people.
                Use both together for comprehensive protection in domestic installations.
              </p>
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Recap
            </h2>
            <p className="text-white/80 leading-relaxed">
              In this subsection, you learned about the role of protective devices in electrical installations. You explored the different types of MCBs and their trip characteristics, the importance of RCDs for shock protection, and the relevant BS 7671 regulations. You also saw practical examples of how to select the right device for the right environment.
            </p>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <button
              onClick={() => setShowFaqs(!showFaqs)}
              className="w-full flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors min-h-[48px] touch-manipulation"
            >
              <span className="font-semibold text-white">Frequently Asked Questions</span>
              <ChevronDown className={`w-5 h-5 text-white/60 transition-transform ${showFaqs ? 'rotate-180' : ''}`} />
            </button>

            {showFaqs && (
              <div className="mt-4 space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                    <p className="font-medium text-white mb-2">Q: {faq.question}</p>
                    <p className="text-sm text-white/70">A: {faq.answer}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Quiz */}
          <Quiz questions={quizQuestions} />

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10 mt-10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../2-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../2-4">
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module5Section2_3;
