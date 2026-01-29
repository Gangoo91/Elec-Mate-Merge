import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Arc Fault Detection - HNC Module 4 Section 3.6";
const DESCRIPTION = "Master arc fault detection devices (AFDDs) for building services: BS EN 62606 requirements, applications, BS 7671 recommendations, installation guidelines, and practical limitations.";

const quickCheckQuestions = [
  {
    id: "afdd-purpose",
    question: "What is the primary purpose of an AFDD?",
    options: ["Overload protection", "Short-circuit protection", "Detection of dangerous arcing faults", "Earth fault protection"],
    correctIndex: 2,
    explanation: "AFDDs detect dangerous arcing faults that may not be detected by MCBs, RCDs, or other conventional protection. These arcing faults can generate sufficient heat to cause fires whilst drawing currents below device trip thresholds."
  },
  {
    id: "afdd-standard",
    question: "Which British Standard covers AFDDs?",
    options: ["BS EN 60898", "BS EN 61008", "BS EN 62606", "BS 7671"],
    correctIndex: 2,
    explanation: "BS EN 62606 specifies requirements for Arc Fault Detection Devices. It defines test methods, performance requirements, and marking for AFDDs used in AC circuits up to 240V and 63A."
  },
  {
    id: "afdd-arc-types",
    question: "What types of arcing can AFDDs detect?",
    options: ["Series arcs only", "Parallel arcs only", "Both series and parallel arcs", "Earth fault arcs only"],
    correctIndex: 2,
    explanation: "AFDDs detect both series arcs (within a single conductor, e.g., damaged cable) and parallel arcs (between conductors, e.g., L-N or L-E). Both types can cause fires if undetected."
  },
  {
    id: "bs7671-recommendation",
    question: "According to BS 7671, where are AFDDs particularly recommended?",
    options: ["Industrial installations only", "Premises with sleeping accommodation", "Outdoor circuits only", "Three-phase supplies only"],
    correctIndex: 1,
    explanation: "BS 7671 Regulation 421.1.7 recommends AFDDs particularly for locations with sleeping accommodation, locations with combustible construction materials, and locations where valuable or irreplaceable goods are stored."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is a series arc fault?",
    options: [
      "An arc between line and neutral conductors",
      "An arc within a single conductor due to damage or poor connection",
      "An arc between line and earth",
      "An arc across multiple circuits"
    ],
    correctAnswer: 1,
    explanation: "A series arc occurs within a single conductor, typically due to damaged insulation, broken strands, or loose connections. Current flows through the arc as part of the normal circuit, making it difficult to detect with conventional protection."
  },
  {
    id: 2,
    question: "Why can't MCBs reliably detect series arc faults?",
    options: [
      "They don't measure voltage",
      "The arc current may be less than the MCB rating",
      "MCBs only detect DC faults",
      "Series arcs only occur in three-phase systems"
    ],
    correctAnswer: 1,
    explanation: "Series arcs are in the load current path, so arc current is limited by the load. A 5A load with a series arc still draws approximately 5A - well below MCB trip thresholds. The arc can generate temperatures over 3000°C whilst current remains normal."
  },
  {
    id: 3,
    question: "How do AFDDs distinguish dangerous arcs from normal arcing (e.g., motor brushes)?",
    options: [
      "By measuring temperature",
      "By analysing high-frequency characteristics of the arc signature",
      "By current magnitude only",
      "They cannot distinguish - they trip on all arcs"
    ],
    correctAnswer: 1,
    explanation: "AFDDs analyse the high-frequency noise patterns superimposed on the AC waveform. Dangerous arcs have characteristic irregular, broadband noise signatures that differ from the regular, predictable arcing in motor brushes or switch contacts."
  },
  {
    id: 4,
    question: "What is the typical frequency range analysed by AFDDs for arc detection?",
    options: [
      "50-60 Hz only",
      "1-10 kHz",
      "10 kHz to several MHz",
      "Above 100 MHz"
    ],
    correctAnswer: 2,
    explanation: "AFDDs typically analyse frequencies from about 10 kHz to several MHz. Arc faults produce broadband noise across this range with characteristic patterns that sophisticated algorithms can identify."
  },
  {
    id: 5,
    question: "According to BS 7671 Regulation 421.1.7, in which locations are AFDDs recommended?",
    options: [
      "All domestic installations",
      "AC final circuits in buildings with sleeping accommodation, combustible construction, or irreplaceable goods",
      "Only industrial motor circuits",
      "Three-phase circuits only"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Regulation 421.1.7 recommends AFDD consideration for: premises with sleeping accommodation (HMOs, hotels); locations with combustible construction materials (timber frame); locations with valuable or irreplaceable goods (museums, heritage)."
  },
  {
    id: 6,
    question: "What is the maximum rated current for AFDDs to BS EN 62606?",
    options: [
      "16A",
      "32A",
      "40A",
      "63A"
    ],
    correctAnswer: 3,
    explanation: "BS EN 62606 covers AFDDs for AC circuits with rated voltage up to 240V and rated current up to 63A. This covers most single-phase final circuits in building services."
  },
  {
    id: 7,
    question: "Can AFDDs provide protection for circuits already protected by MCBs and RCDs?",
    options: [
      "No, they must be used alone",
      "Yes, they complement MCBs and RCDs as additional protection",
      "Only with MCBs, not RCDs",
      "Only in TT systems"
    ],
    correctAnswer: 1,
    explanation: "AFDDs provide complementary protection alongside MCBs and RCDs. Each protects against different hazards: MCBs for overcurrent, RCDs for earth faults, and AFDDs for arcing faults. Combined devices (AFDD+MCB or AFDD+RCBO) are available."
  },
  {
    id: 8,
    question: "Which of these is NOT a typical cause of unwanted AFDD tripping?",
    options: [
      "Universal motors (vacuum cleaners, power tools)",
      "LED dimmer switches",
      "Purely resistive loads like heaters",
      "Some types of electronic equipment"
    ],
    correctAnswer: 2,
    explanation: "Purely resistive loads produce clean, sinusoidal current draw without high-frequency components. Motors with brushes, dimmers with phase-cut switching, and some electronic equipment can produce signatures that early AFDDs may misidentify."
  },
  {
    id: 9,
    question: "Where should an AFDD be installed in a circuit?",
    options: [
      "At the load end of the circuit",
      "At the origin of the circuit (distribution board)",
      "At any accessible point",
      "Only at the consumer unit main switch"
    ],
    correctAnswer: 1,
    explanation: "AFDDs are installed at the origin of the circuit, typically at the distribution board. They protect the entire circuit from that point to the loads. Combined AFDD/MCB or AFDD/RCBO devices fit in standard consumer unit ways."
  },
  {
    id: 10,
    question: "What testing is required for AFDDs during periodic inspection?",
    options: [
      "No testing required",
      "Only visual inspection",
      "Operation of the test button",
      "Injection testing with special equipment"
    ],
    correctAnswer: 2,
    explanation: "BS 7671 requires operation of the AFDD test button during inspection and testing to verify the device's self-test function operates correctly. Specialised arc fault injection testing is not typically required for routine verification."
  }
];

const faqs = [
  {
    question: "Are AFDDs mandatory in the UK?",
    answer: "No, AFDDs are not mandatory in BS 7671. Regulation 421.1.7 uses 'recommendation' language, not requirements. However, designers should consider AFDDs where fire risk is elevated: sleeping accommodation, timber-frame buildings, heritage properties, and locations with valuable or irreplaceable contents. Some insurance requirements or client specifications may make them effectively mandatory for certain projects."
  },
  {
    question: "Can AFDDs cause nuisance tripping?",
    answer: "Early generation AFDDs could experience nuisance tripping with certain loads like vacuum cleaners, power tools, and some LED dimmers. Modern devices use sophisticated algorithms that significantly reduce false trips. However, it's important to select quality devices from reputable manufacturers and consider the connected loads. If nuisance tripping occurs, investigate the cause - it may indicate genuine wiring issues."
  },
  {
    question: "Do AFDDs replace the need for RCDs?",
    answer: "No. AFDDs and RCDs protect against different hazards and should be used together where both risks exist. RCDs detect earth fault currents for shock protection. AFDDs detect arcing for fire protection. Neither can fully replace the other. Combined AFDD/RCBO devices provide all three functions: overcurrent, earth fault, and arc fault protection in one unit."
  },
  {
    question: "How do parallel and series arc faults differ?",
    answer: "Series arcs occur within a single conductor (e.g., a damaged cable with broken strands or a loose terminal). Current is limited by the load, so conventional protection won't operate. Parallel arcs occur between conductors (L-N or L-E), potentially drawing high currents that may eventually trip conventional protection - but the delay could allow fire ignition. AFDDs detect both types before fire conditions develop."
  },
  {
    question: "What should I consider when specifying AFDDs for a project?",
    answer: "Consider: 1) Risk assessment - is fire risk elevated (sleeping, combustible construction, valuable goods)? 2) Load compatibility - check AFDD compatibility with connected equipment; 3) Combined devices - AFDD/MCB or AFDD/RCBO for space efficiency; 4) Client requirements - some insurers or specifications require them; 5) Cost-benefit - balance protection benefits against additional cost; 6) Future maintenance - ensure test button accessible."
  },
  {
    question: "Are there different types or classes of AFDD?",
    answer: "BS EN 62606 defines AFDDs that detect both series and parallel arcs. Some devices focus primarily on one type. Combined units (AFDD+MCB, AFDD+RCBO) are common, providing multiple protection functions. When selecting, verify the device is BS EN 62606 compliant and suitable for the specific application. Check manufacturer compatibility lists for sensitive loads."
  }
];

const HNCModule4Section3_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4.3.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Arc Fault Detection
          </h1>
          <p className="text-white/80">
            AFDDs for fire prevention - technology, applications, and BS 7671 recommendations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Purpose:</strong> Detect arcing faults that cause fires</li>
              <li className="pl-1"><strong>Standard:</strong> BS EN 62606 up to 240V/63A</li>
              <li className="pl-1"><strong>Detection:</strong> High-frequency arc signature analysis</li>
              <li className="pl-1"><strong>Types:</strong> Series arcs and parallel arcs</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>HMOs/Hotels:</strong> Sleeping accommodation</li>
              <li className="pl-1"><strong>Timber frame:</strong> Combustible construction</li>
              <li className="pl-1"><strong>Heritage:</strong> Irreplaceable contents</li>
              <li className="pl-1"><strong>Data centres:</strong> High-value equipment</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the purpose and operating principle of AFDDs",
              "Differentiate between series and parallel arc faults",
              "Apply BS 7671 recommendations for AFDD installation",
              "Identify appropriate applications for AFDDs in building services",
              "Understand AFDD limitations and potential nuisance tripping",
              "Specify combined AFDD devices for circuit protection"
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

        {/* Section 1: Arc Fault Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Arc Fault Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Arc faults occur when electrical current flows through an unintended path via ionised
              air. The arc generates extreme heat (3000-6000°C) that can ignite nearby materials,
              causing electrical fires.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Arc Faults</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Detection Challenge</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Series Arc</td>
                      <td className="border border-white/10 px-3 py-2">Arc within a single conductor (damaged cable, loose terminal)</td>
                      <td className="border border-white/10 px-3 py-2">Current limited by load - MCBs won't detect</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Parallel Arc (L-N)</td>
                      <td className="border border-white/10 px-3 py-2">Arc between line and neutral (damaged insulation)</td>
                      <td className="border border-white/10 px-3 py-2">May trip MCB eventually but delay allows ignition</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Parallel Arc (L-E)</td>
                      <td className="border border-white/10 px-3 py-2">Arc between line and earth (insulation failure)</td>
                      <td className="border border-white/10 px-3 py-2">RCD should detect but arc may be intermittent</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Causes of Arc Faults</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Installation Faults</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Loose terminal connections</li>
                    <li className="pl-1">Damaged cable during installation</li>
                    <li className="pl-1">Incorrectly tightened connections</li>
                    <li className="pl-1">Cable pinched by fixings</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Aging/Damage</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Insulation degradation over time</li>
                    <li className="pl-1">Rodent damage to cables</li>
                    <li className="pl-1">Physical damage (DIY, nails)</li>
                    <li className="pl-1">Thermal degradation from overloading</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why Conventional Protection Fails</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>MCBs:</strong> Series arc current is limited by load (e.g., 5A for a lamp) - well below trip threshold</li>
                <li className="pl-1"><strong>RCDs:</strong> Only detect earth leakage - series and L-N arcs don't involve earth</li>
                <li className="pl-1"><strong>Time delay:</strong> Even detectable faults may take seconds to trip - enough time for ignition</li>
                <li className="pl-1"><strong>Arc impedance:</strong> Arc itself adds impedance, further reducing fault current</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Fire statistics:</strong> Approximately 50% of electrical fires in dwellings are attributed to arcing faults in fixed wiring.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: AFDD Technology */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            AFDD Technology and Operation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              AFDDs use sophisticated electronic monitoring and algorithms to analyse the current
              waveform for characteristic arc signatures whilst distinguishing dangerous arcs from
              normal switching or motor operation.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Detection Principle</p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Current monitoring:</strong> High-bandwidth current sensor captures waveform including HF components</li>
                <li className="pl-1"><strong>Signal processing:</strong> Microprocessor analyses frequency spectrum (typically 10kHz - several MHz)</li>
                <li className="pl-1"><strong>Pattern recognition:</strong> Algorithms identify characteristic arc signatures (irregular, broadband noise)</li>
                <li className="pl-1"><strong>Discrimination:</strong> Filters distinguish dangerous arcs from normal switching, motor brushes, etc.</li>
                <li className="pl-1"><strong>Trip decision:</strong> If arc pattern persists, AFDD disconnects the circuit</li>
              </ol>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS EN 62606 Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Rated voltage</td>
                      <td className="border border-white/10 px-3 py-2">Up to 240V AC</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Rated current</td>
                      <td className="border border-white/10 px-3 py-2">Up to 63A</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Arc detection</td>
                      <td className="border border-white/10 px-3 py-2">Series and parallel arcs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Response time</td>
                      <td className="border border-white/10 px-3 py-2">Typically &lt;1 second for test arcs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Test function</td>
                      <td className="border border-white/10 px-3 py-2">Integral test button required</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Indicator</td>
                      <td className="border border-white/10 px-3 py-2">Visual indication of trip cause</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">AFDD Device Types</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>AFDD only:</strong> Arc detection, requires separate OCPD</li>
                  <li className="pl-1"><strong>AFDD + MCB:</strong> Combined arc and overcurrent</li>
                  <li className="pl-1"><strong>AFDD + RCBO:</strong> Arc, overcurrent, and earth fault</li>
                  <li className="pl-1"><strong>Modular AFDD:</strong> Mounts alongside existing MCB</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Module Width</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">AFDD only: 1-2 modules</li>
                  <li className="pl-1">AFDD + MCB: 2 modules</li>
                  <li className="pl-1">AFDD + RCBO: 2-3 modules</li>
                  <li className="pl-1">Consider board capacity in design</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Selection tip:</strong> Combined AFDD/RCBO devices provide comprehensive protection (arc, overcurrent, earth fault) in minimal space.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: BS 7671 Recommendations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            BS 7671 Recommendations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 Regulation 421.1.7 recommends consideration of AFDDs for specific applications
              where fire risk is elevated. This is advisory, not mandatory, but represents best practice.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 421.1.7 Recommendations</p>
              <p className="text-sm text-white/90 italic mb-3">
                "Arc Fault Detection Devices (AFDDs) conforming to BS EN 62606 are recommended in AC final circuits..."
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Sleeping accommodation:</strong> HMOs, hotels, care homes, student accommodation</li>
                <li className="pl-1"><strong>Combustible construction:</strong> Timber-frame buildings, thatched roofs</li>
                <li className="pl-1"><strong>Fire propagation risk:</strong> High-rise residential, locations with difficult evacuation</li>
                <li className="pl-1"><strong>Valuable contents:</strong> Museums, archives, heritage buildings, data centres</li>
                <li className="pl-1"><strong>Premises with risk:</strong> Where fire could cause serious harm or damage</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Recommended Applications in Building Services</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Building Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Risk Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">AFDD Recommendation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">HMO</td>
                      <td className="border border-white/10 px-3 py-2">Sleeping, shared facilities</td>
                      <td className="border border-white/10 px-3 py-2">Strongly recommended</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hotel/B&B</td>
                      <td className="border border-white/10 px-3 py-2">Sleeping, unfamiliar occupants</td>
                      <td className="border border-white/10 px-3 py-2">Strongly recommended</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Care home</td>
                      <td className="border border-white/10 px-3 py-2">Sleeping, vulnerable occupants</td>
                      <td className="border border-white/10 px-3 py-2">Strongly recommended</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Timber-frame house</td>
                      <td className="border border-white/10 px-3 py-2">Combustible construction</td>
                      <td className="border border-white/10 px-3 py-2">Recommended</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Listed building</td>
                      <td className="border border-white/10 px-3 py-2">Irreplaceable structure</td>
                      <td className="border border-white/10 px-3 py-2">Recommended</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Standard office</td>
                      <td className="border border-white/10 px-3 py-2">No elevated risk factors</td>
                      <td className="border border-white/10 px-3 py-2">Consider on risk assessment</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cost-Benefit Considerations</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Additional cost:</strong> AFDDs cost more than standard MCBs/RCBOs</li>
                <li className="pl-1"><strong>Board space:</strong> Combined devices minimise space impact</li>
                <li className="pl-1"><strong>Insurance:</strong> Some insurers offer premium reductions</li>
                <li className="pl-1"><strong>Liability:</strong> Demonstrates duty of care in design</li>
                <li className="pl-1"><strong>Life safety:</strong> Fire prevention in sleeping accommodation</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Designer note:</strong> Document risk assessment and AFDD consideration in the electrical design. If AFDDs are not used, record the reasoning.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 4: Installation and Limitations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Installation, Testing, and Limitations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Successful AFDD implementation requires appropriate installation, commissioning, and
              awareness of limitations to avoid nuisance tripping whilst maintaining protection.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Requirements</p>
              <div className="p-4 rounded-lg bg-white/5">
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Install at the origin of each protected circuit</li>
                  <li className="pl-1">Ensure test button is accessible for periodic testing</li>
                  <li className="pl-1">Label circuits protected by AFDDs</li>
                  <li className="pl-1">Consider space requirements in distribution board</li>
                  <li className="pl-1">Follow manufacturer's installation instructions</li>
                  <li className="pl-1">Verify compatibility with connected loads</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Testing and Verification</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Test</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Frequency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Commissioning</td>
                      <td className="border border-white/10 px-3 py-2">Initial</td>
                      <td className="border border-white/10 px-3 py-2">Test button operation, visual check</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">User testing</td>
                      <td className="border border-white/10 px-3 py-2">6 monthly (recommended)</td>
                      <td className="border border-white/10 px-3 py-2">Test button operation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Periodic inspection</td>
                      <td className="border border-white/10 px-3 py-2">Per EICR schedule</td>
                      <td className="border border-white/10 px-3 py-2">Test button, visual inspection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Arc injection test</td>
                      <td className="border border-white/10 px-3 py-2">Optional/specialist</td>
                      <td className="border border-white/10 px-3 py-2">Specialised test equipment</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Known Limitations and Challenges</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Potential Nuisance Trip Sources</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Universal motors (vacuum, tools)</li>
                    <li className="pl-1">Some LED dimmer switches</li>
                    <li className="pl-1">Older electronic equipment</li>
                    <li className="pl-1">Brush-type motors</li>
                    <li className="pl-1">Some power supplies</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Mitigation Strategies</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Select quality AFDD devices</li>
                    <li className="pl-1">Check manufacturer compatibility</li>
                    <li className="pl-1">Separate sensitive loads</li>
                    <li className="pl-1">Use latest generation AFDDs</li>
                    <li className="pl-1">Investigate trips - may be genuine</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-red-400/80 mb-2">Not Protected by AFDDs</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">DC circuits (AFDDs are AC only to BS EN 62606)</li>
                <li className="pl-1">Circuits above 63A</li>
                <li className="pl-1">Three-phase circuits (without neutral - check specific device)</li>
                <li className="pl-1">SELV/PELV circuits below AFDD threshold</li>
                <li className="pl-1">External wiring upstream of the AFDD</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Troubleshooting:</strong> If an AFDD trips repeatedly, investigate the circuit for genuine wiring faults before assuming nuisance tripping. The AFDD may be detecting a real problem.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: HMO Consumer Unit Specification</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Specify protection for a 6-bedroom HMO with sleeping accommodation on all floors. Supply is TN-C-S.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Risk assessment:</p>
                <p>- Sleeping accommodation: <strong>High risk</strong></p>
                <p>- Multiple occupants: <strong>High risk</strong></p>
                <p>- BS 7671 Reg 421.1.7 applies</p>
                <p className="mt-2">Recommendation:</p>
                <p>- All final circuits: AFDD protection</p>
                <p>- Socket outlets: AFDD/RCBO (30mA)</p>
                <p>- Lighting: AFDD/MCB or AFDD/RCBO</p>
                <p>- Kitchen/bathroom: AFDD/RCBO (30mA) mandatory</p>
                <p className="mt-2 text-green-400">✓ Comprehensive arc and shock protection</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Cost-Benefit Analysis</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Compare protection options for a 10-way consumer unit: standard RCBOs vs AFDD/RCBOs.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Cost comparison (approximate):</p>
                <p>- Standard RCBO: £25 × 10 = £250</p>
                <p>- AFDD/RCBO: £80 × 10 = £800</p>
                <p>- Additional cost: <strong>£550</strong></p>
                <p className="mt-2">Benefits:</p>
                <p>- Series arc protection (MCB/RCBO cannot provide)</p>
                <p>- Parallel arc detection before fire conditions</p>
                <p>- Compliance with Reg 421.1.7 recommendation</p>
                <p>- Potential insurance premium reduction</p>
                <p>- Demonstrates design due diligence</p>
                <p className="mt-2 text-white/60">→ For sleeping accommodation: cost justified</p>
                <p className="text-white/60">→ For standard office: discuss with client</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Nuisance Tripping Investigation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> An AFDD trips when a vacuum cleaner is used. How should this be investigated?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Investigation steps:</p>
                <p className="mt-2">1. <strong>Verify the fault:</strong></p>
                <p>   - Does AFDD trip every time?</p>
                <p>   - Does same vacuum trip other AFDDs?</p>
                <p>   - Do other vacuums trip this AFDD?</p>
                <p className="mt-2">2. <strong>If vacuum trips all AFDDs:</strong></p>
                <p>   - Vacuum may have internal fault</p>
                <p>   - Check vacuum flex for damage</p>
                <p>   - Test with different vacuum</p>
                <p className="mt-2">3. <strong>If only this AFDD/circuit:</strong></p>
                <p>   - Check for loose connections</p>
                <p>   - Inspect socket for damage</p>
                <p>   - Test insulation resistance</p>
                <p className="mt-2">4. <strong>If confirmed nuisance:</strong></p>
                <p>   - Modern AFDDs rarely false-trip</p>
                <p>   - Consider manufacturer guidance</p>
                <p className="text-yellow-400">⚠ Do not bypass AFDD without investigation</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">AFDD Specification Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Confirm BS EN 62606 compliance</li>
                <li className="pl-1">Select appropriate current rating (≤63A)</li>
                <li className="pl-1">Choose combined device (AFDD/MCB or AFDD/RCBO) where suitable</li>
                <li className="pl-1">Verify board capacity for module width</li>
                <li className="pl-1">Check compatibility with connected loads</li>
                <li className="pl-1">Consider RCD discrimination if multiple devices</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Points to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">BS EN 62606: up to <strong>240V AC, 63A</strong></li>
                <li className="pl-1">Detects: <strong>series and parallel arcs</strong></li>
                <li className="pl-1">BS 7671: <strong>recommended</strong>, not mandatory</li>
                <li className="pl-1">Priority: <strong>sleeping accommodation</strong></li>
                <li className="pl-1">Testing: <strong>test button operation</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Omitting AFDDs in high-risk locations</strong> — Document the decision</li>
                <li className="pl-1"><strong>Ignoring trips as nuisance</strong> — Investigate genuinely</li>
                <li className="pl-1"><strong>Inadequate board space</strong> — Plan for combined devices</li>
                <li className="pl-1"><strong>No user guidance</strong> — Inform occupants about test button</li>
              </ul>
            </div>
          </div>
        </section>

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
                <p className="font-medium text-white mb-1">AFDD Fundamentals</p>
                <ul className="space-y-0.5">
                  <li>Standard: BS EN 62606</li>
                  <li>Voltage: up to 240V AC</li>
                  <li>Current: up to 63A</li>
                  <li>Detects: series + parallel arcs</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Recommended Locations</p>
                <ul className="space-y-0.5">
                  <li>Sleeping accommodation (HMO, hotel)</li>
                  <li>Combustible construction (timber)</li>
                  <li>Valuable/irreplaceable contents</li>
                  <li>High fire propagation risk</li>
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
            <Link to="../h-n-c-module4-section3-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Earth Fault Protection
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section4">
              Next: Section 4
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule4Section3_6;
