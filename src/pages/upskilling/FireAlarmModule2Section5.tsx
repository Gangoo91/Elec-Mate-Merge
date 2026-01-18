import { ArrowLeft, Maximize2, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    question: "A warehouse has 15 m high ceilings and large skylights. What detection method might be suitable, and what installation consideration is important?",
    answer: "Beam detectors would be suitable for the high ceiling. Important consideration: position beams to avoid direct sunlight through skylights causing false alarms or signal interference."
  },
  {
    question: "A client requires fire detection in a frozen food warehouse operating at -25°C. Why would ASD be a better choice than point smoke detectors?",
    answer: "ASD is ideal because the detection unit can be located in a temperature-controlled environment outside the freezer, while only the sampling pipes are exposed to extreme cold. Point detectors may not function reliably at such low temperatures."
  },
  {
    question: "What ASD sensitivity class would you recommend for a data centre, and why?",
    answer: "Class A (very high sensitivity at 0.025% obs/m) would be recommended for a data centre because it provides very early warning, allowing time to investigate and respond before equipment damage occurs."
  }
];

const quizQuestions = [
  {
    question: "What type of environment is best suited for beam detectors?",
    options: [
      "Small offices",
      "Large open spaces with high ceilings (warehouses, atriums)",
      "Bedrooms",
      "Kitchens"
    ],
    correctAnswer: 1,
    explanation: "Beam detectors are ideal for large open spaces with high ceilings where point detectors would be impractical or ineffective due to stratification."
  },
  {
    question: "How does an optical beam detector work?",
    options: [
      "By measuring temperature changes",
      "By detecting infrared beam obscuration caused by smoke",
      "By ionising air particles",
      "By sampling air through pipes"
    ],
    correctAnswer: 1,
    explanation: "Beam detectors project an infrared beam from a transmitter to a receiver. Smoke reduces the beam signal strength, triggering an alarm when obscuration exceeds the threshold."
  },
  {
    question: "What is the typical maximum path length for a standard beam detector?",
    options: ["25 m", "50 m", "100 m", "200 m"],
    correctAnswer: 2,
    explanation: "Standard beam detectors typically cover path lengths up to 100 m, though extended range versions are available for longer distances."
  },
  {
    question: "What does ASD stand for in fire detection?",
    options: [
      "Automatic Sensor Device",
      "Aspirating Smoke Detection",
      "Advanced Safety Detector",
      "Addressable Smoke Detector"
    ],
    correctAnswer: 1,
    explanation: "ASD (Aspirating Smoke Detection) uses a fan to draw air samples through a network of pipes to a central detection chamber."
  },
  {
    question: "What is a key advantage of aspirating smoke detection systems?",
    options: [
      "Lower installation cost",
      "Very early warning with high sensitivity detection",
      "No maintenance required",
      "Works in any temperature"
    ],
    correctAnswer: 1,
    explanation: "ASD systems provide very early warning by detecting smoke at much lower levels than point detectors, making them ideal for high-value or mission-critical areas."
  },
  {
    question: "Why might beam detectors give false alarms in buildings with large windows?",
    options: [
      "They are affected by moisture",
      "Sunlight can interfere with the infrared beam",
      "Windows block the beam",
      "Glass causes reflections"
    ],
    correctAnswer: 1,
    explanation: "Direct sunlight can interfere with the infrared beam, causing false alarms. Careful positioning and consideration of sun paths is essential."
  },
  {
    question: "What is the purpose of the sampling network in an ASD system?",
    options: [
      "To distribute sound throughout the building",
      "To collect air samples from protected areas and transport them to the detector",
      "To provide power to detectors",
      "To cool the detection chamber"
    ],
    correctAnswer: 1,
    explanation: "The sampling network (pipes with small holes) continuously draws air from the protected area to the central detection unit for analysis."
  },
  {
    question: "In which environment would ASD be preferred over point detectors?",
    options: [
      "Standard offices",
      "Server rooms, clean rooms, and cold stores",
      "Bedrooms",
      "Corridors"
    ],
    correctAnswer: 1,
    explanation: "ASD is ideal for server rooms (very early warning), clean rooms (discrete sampling), and cold stores (detector can be in controlled environment)."
  },
  {
    question: "What is a reflective beam detector?",
    options: [
      "A beam detector with polished casing",
      "A beam detector with transmitter and receiver in one unit, using a remote reflector",
      "A detector that uses visible light",
      "A detector that reflects sound waves"
    ],
    correctAnswer: 1,
    explanation: "Reflective beam detectors have the transmitter and receiver combined in one unit, with the beam reflecting off a remote reflector prism, simplifying installation."
  },
  {
    question: "What maintenance consideration is important for ASD systems?",
    options: [
      "No maintenance is needed",
      "Regular filter cleaning/replacement and airflow verification",
      "Weekly battery replacement",
      "Daily calibration"
    ],
    correctAnswer: 1,
    explanation: "ASD systems require regular maintenance including filter cleaning or replacement and verification that sampling pipes are not blocked or damaged."
  }
];

const faqs = [
  {
    question: "Can beam detectors be used in smoky environments?",
    answer: "No - environments with normal levels of smoke, dust or steam can cause false alarms. Consider alternative detection methods for such areas."
  },
  {
    question: "How do I know which ASD sensitivity class to specify?",
    answer: "Class A for very early warning (data centres), Class B for enhanced sensitivity (important areas), Class C for standard applications. The fire risk assessment should guide selection."
  },
  {
    question: "What happens if an ASD sampling pipe gets blocked?",
    answer: "Modern ASD systems monitor airflow and will indicate a fault condition if the flow drops below acceptable levels. Regular maintenance checks pipe integrity."
  },
  {
    question: "Can beam and ASD systems connect to addressable panels?",
    answer: "Yes - both can connect to addressable fire alarm systems. ASD systems can provide zone information based on which sampling points detected smoke."
  },
  {
    question: "Do beam detectors work in heritage buildings?",
    answer: "Yes - reflective beam detectors can be discrete. However, ASD may be preferred where visual impact must be minimised."
  },
  {
    question: "What is the maximum sampling pipe length for ASD?",
    answer: "Depends on the system - typically up to 100-200 m of pipe per detector, but transport time must be verified during design."
  }
];

const FireAlarmModule2Section5 = () => {
  useSEO({
    title: "Beam & Aspirating Detectors | Fire Alarm Systems",
    description: "Learn about optical beam detectors and aspirating smoke detection (ASD) systems for high spaces and challenging environments per BS 5839-1."
  });

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center">
          <Button variant="ghost" size="sm" asChild>
            <Link to="..">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module
            </Link>
          </Button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Maximize2 className="h-4 w-4" />
            Module 2 - Section 5 of 5
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">
            Beam & Aspirating Detectors
          </h1>
          <p className="text-white text-lg">
            Specialist detection technologies for large spaces and challenging environments
          </p>
        </div>

        {/* Quick Summary */}
        <div className="grid gap-3 sm:grid-cols-3 mb-8">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="font-semibold text-white text-sm">Beam Detectors</p>
            <p className="text-white text-sm mt-1">Ideal for large open spaces with high ceilings</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="font-semibold text-white text-sm">ASD Systems</p>
            <p className="text-white text-sm mt-1">Very early warning for mission-critical areas</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="font-semibold text-white text-sm">Overcome Stratification</p>
            <p className="text-white text-sm mt-1">Effective where point detectors cannot reach</p>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="mb-8 p-4 rounded-lg bg-slate-900/50 border border-white/10">
          <h2 className="font-semibold text-white mb-3">What You Will Learn</h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-white">
              <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              How optical beam detectors work and their applications
            </li>
            <li className="flex items-start gap-2 text-white">
              <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              Aspirating smoke detection principles and components
            </li>
            <li className="flex items-start gap-2 text-white">
              <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              ASD sensitivity classes under BS EN 54-20
            </li>
            <li className="flex items-start gap-2 text-white">
              <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              Installation and maintenance considerations for specialist detection
            </li>
          </ul>
        </div>

        {/* Section 01 - Introduction to Specialist Detection */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">01</span>
            Introduction to Specialist Detection
          </h2>

          <div className="space-y-4 text-white">
            <p>
              Standard point detectors are effective in most environments, but large open spaces and challenging conditions require specialist detection technologies. These systems overcome limitations that would make conventional detection impractical or unreliable.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="font-semibold text-white mb-2">When Specialist Detection Is Needed</p>
              <ul className="space-y-1 text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  High ceilings where smoke may stratify before reaching detectors
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Large open spaces - warehouses, atriums, aircraft hangars
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Very early warning required - server rooms, heritage buildings
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Extreme temperatures - cold stores, freezers, furnace areas
                </li>
              </ul>
            </div>

            <p>
              Smoke stratification occurs when rising smoke cools and reaches a layer of air at a similar temperature. At this point, the smoke stops rising and spreads horizontally. In buildings with high ceilings, this can happen well below ceiling-mounted detectors.
            </p>
          </div>
        </section>

        {/* Section 02 - Optical Beam Detectors */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">02</span>
            Optical Beam Detectors
          </h2>

          <div className="space-y-4 text-white">
            <p>
              Optical beam detectors project an infrared beam across the protected space from a transmitter to a receiver. When smoke enters the beam path, it reduces the received signal strength (obscuration). An alarm is triggered when the obscuration exceeds the preset threshold.
            </p>

            <div className="p-4 rounded-lg bg-slate-900/50 border border-white/10">
              <p className="font-semibold text-white mb-2">Two Main Types</p>
              <ul className="space-y-2 text-white">
                <li>
                  <span className="font-semibold text-elec-yellow">End-to-End:</span> Separate transmitter and receiver units mounted at opposite ends of the protected area. Requires power and wiring at both ends.
                </li>
                <li>
                  <span className="font-semibold text-elec-yellow">Reflective:</span> Combined transmitter/receiver unit with a remote reflector prism. The beam travels to the reflector and back. Simpler installation - only requires power at one end.
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="font-semibold text-white mb-2">Typical Specifications</p>
              <ul className="space-y-1 text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong>Path length:</strong> 5 m to 100 m (standard), extended range versions available</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong>Coverage width:</strong> 7.5 m to 15 m each side of beam</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong>Height:</strong> Typically used above 10.5 m (point detector height limit)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong>Alarm threshold:</strong> Typically 25-50% obscuration</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 03 - Beam Detector Applications */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">03</span>
            Beam Detector Applications
          </h2>

          <div className="space-y-4 text-white">
            <p>
              Beam detectors are ideal for large volume spaces where point detection would be impractical due to height, access difficulties, or smoke stratification.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 rounded-lg bg-slate-900/50 border border-white/10">
                <p className="font-semibold text-elec-yellow mb-2">Ideal Applications</p>
                <ul className="space-y-1 text-white">
                  <li>Warehouses and logistics centres</li>
                  <li>Atriums and shopping centres</li>
                  <li>Aircraft hangars</li>
                  <li>Churches and cathedrals</li>
                  <li>Sports halls and arenas</li>
                  <li>Exhibition halls</li>
                  <li>Manufacturing facilities</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-slate-900/50 border border-white/10">
                <p className="font-semibold text-elec-yellow mb-2">Design Considerations</p>
                <ul className="space-y-1 text-white">
                  <li>Building movement and vibration</li>
                  <li>Sunlight interference from windows</li>
                  <li>Steam, dust, or aerosol environments</li>
                  <li>Maintenance access at height</li>
                  <li>Beam path obstructions (cranes, racking)</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="font-semibold text-white mb-2">Multi-Level Detection</p>
              <p className="text-white">
                In very high spaces, consider installing beams at multiple heights. This provides detection regardless of where smoke stratifies. A beam near the ceiling catches fast-developing fires, while lower beams detect slower, smouldering fires that stratify at intermediate levels.
              </p>
            </div>
          </div>
        </section>

        {/* InlineCheck 1 */}
        <div className="mb-8">
          <InlineCheck
            question={quickCheckQuestions[0].question}
            answer={quickCheckQuestions[0].answer}
          />
        </div>

        {/* Section 04 - Aspirating Smoke Detection (ASD) */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">04</span>
            Aspirating Smoke Detection (ASD)
          </h2>

          <div className="space-y-4 text-white">
            <p>
              ASD systems use a fan to continuously draw air samples through a network of pipes with small sampling holes. The air is transported to a central detection unit containing a highly sensitive laser-based smoke detection chamber.
            </p>

            <div className="p-4 rounded-lg bg-slate-900/50 border border-white/10">
              <p className="font-semibold text-white mb-2">System Components</p>
              <ul className="space-y-2 text-white">
                <li>
                  <span className="font-semibold text-elec-yellow">Sampling Network:</span> Pipes (typically 25 mm diameter) with strategically placed sampling holes. Can cover large areas with discrete, unobtrusive pipework.
                </li>
                <li>
                  <span className="font-semibold text-elec-yellow">Aspirator Fan:</span> Draws air through the pipe network at a continuous rate. Typically 30-120 seconds transport time from furthest point.
                </li>
                <li>
                  <span className="font-semibold text-elec-yellow">Filter:</span> Removes dust and particles to prevent detector contamination and false alarms.
                </li>
                <li>
                  <span className="font-semibold text-elec-yellow">Detection Chamber:</span> Highly sensitive laser-based detector analyses sampled air for smoke particles.
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="font-semibold text-white mb-2">Sensitivity Classes (BS EN 54-20)</p>
              <ul className="space-y-2 text-white">
                <li>
                  <span className="font-semibold text-elec-yellow">Class A:</span> Very high sensitivity (0.025% obs/m) - Data centres, server rooms, clean rooms
                </li>
                <li>
                  <span className="font-semibold text-elec-yellow">Class B:</span> Enhanced sensitivity (0.10% obs/m) - Important commercial areas, heritage buildings
                </li>
                <li>
                  <span className="font-semibold text-elec-yellow">Class C:</span> Standard sensitivity (0.20% obs/m) - General applications requiring ASD benefits
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 05 - ASD Applications */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">05</span>
            ASD Applications
          </h2>

          <div className="space-y-4 text-white">
            <p>
              ASD provides very early warning and is essential for high-value and mission-critical applications where fire damage would be catastrophic or business interruption unacceptable.
            </p>

            <div className="p-4 rounded-lg bg-slate-900/50 border border-white/10">
              <p className="font-semibold text-white mb-2">Ideal Applications</p>
              <ul className="space-y-2 text-white">
                <li>
                  <span className="font-semibold text-elec-yellow">Data Centres and Server Rooms:</span> Very early warning to protect equipment and allow investigation before damage
                </li>
                <li>
                  <span className="font-semibold text-elec-yellow">Clean Rooms:</span> Discrete sampling without visible devices that could contaminate the environment
                </li>
                <li>
                  <span className="font-semibold text-elec-yellow">Cold Stores and Freezers:</span> Detection unit in controlled environment, only pipes exposed to extreme cold
                </li>
                <li>
                  <span className="font-semibold text-elec-yellow">Heritage Buildings:</span> Discrete protection with minimal visual impact, very early warning to protect irreplaceable items
                </li>
                <li>
                  <span className="font-semibold text-elec-yellow">High-Rise Atriums:</span> Sampling at multiple levels to detect smoke regardless of stratification height
                </li>
                <li>
                  <span className="font-semibold text-elec-yellow">Prisons and Secure Facilities:</span> Vandal-resistant (no exposed devices in protected areas)
                </li>
                <li>
                  <span className="font-semibold text-elec-yellow">Telecommunications Facilities:</span> Protection of critical infrastructure with early warning
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* InlineCheck 2 */}
        <div className="mb-8">
          <InlineCheck
            question={quickCheckQuestions[1].question}
            answer={quickCheckQuestions[1].answer}
          />
        </div>

        {/* Section 06 - Installation Considerations */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">06</span>
            Installation Considerations
          </h2>

          <div className="space-y-4 text-white">
            <p>
              Both beam and ASD systems require careful design and installation to ensure reliable operation. Specialist expertise is essential.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 rounded-lg bg-slate-900/50 border border-white/10">
                <p className="font-semibold text-elec-yellow mb-2">Beam Detector Installation</p>
                <ul className="space-y-1 text-white">
                  <li>Secure mounting to minimise movement</li>
                  <li>Avoid beam paths crossing windows</li>
                  <li>Consider automatic alignment features</li>
                  <li>Plan for maintenance access at height</li>
                  <li>Allow for future obstructions (racking)</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-slate-900/50 border border-white/10">
                <p className="font-semibold text-elec-yellow mb-2">ASD Installation</p>
                <ul className="space-y-1 text-white">
                  <li>Calculate transport times during design</li>
                  <li>Position sampling holes appropriately</li>
                  <li>Balance airflow across all sampling points</li>
                  <li>Locate detector for easy access</li>
                  <li>Consider pipe routing aesthetics</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="font-semibold text-white mb-2">Transport Time</p>
              <p className="text-white">
                ASD transport time is the time for air to travel from the furthest sampling point to the detector. BS 5839-1 requires this to be considered in system design. Typical maximum transport times are 60-120 seconds depending on application.
              </p>
            </div>
          </div>
        </section>

        {/* Section 07 - Maintenance Requirements */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">07</span>
            Maintenance Requirements
          </h2>

          <div className="space-y-4 text-white">
            <p>
              Regular maintenance is essential for reliable operation of specialist detection systems.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 rounded-lg bg-slate-900/50 border border-white/10">
                <p className="font-semibold text-elec-yellow mb-2">Beam Detector Maintenance</p>
                <ul className="space-y-1 text-white">
                  <li>Regular alignment checks</li>
                  <li>Lens cleaning (dust and dirt)</li>
                  <li>Signal strength verification</li>
                  <li>Annual functional testing</li>
                  <li>Check for new obstructions in beam path</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-slate-900/50 border border-white/10">
                <p className="font-semibold text-elec-yellow mb-2">ASD System Maintenance</p>
                <ul className="space-y-1 text-white">
                  <li>Filter cleaning or replacement</li>
                  <li>Airflow verification at all points</li>
                  <li>Pipe network integrity check</li>
                  <li>Transport time testing</li>
                  <li>Sensitivity verification</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <p className="font-semibold text-white mb-2">Important</p>
              <p className="text-white">
                ASD systems require specialist commissioning and maintenance. Ensure the installer and maintenance provider have appropriate training and experience with the specific system being used. Improper maintenance can compromise very early warning capability.
              </p>
            </div>
          </div>
        </section>

        {/* InlineCheck 3 */}
        <div className="mb-8">
          <InlineCheck
            question={quickCheckQuestions[2].question}
            answer={quickCheckQuestions[2].answer}
          />
        </div>

        {/* Practical Guidance */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Practical Guidance</h2>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-900/50 border border-white/10">
              <p className="font-semibold text-elec-yellow mb-2">Pro Tips</p>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Consider building movement when specifying beam detectors - auto-alignment features help maintain reliable operation
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  For ASD, calculate transport times during design to ensure detection within required timeframes
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Use multiple beams at different heights in very high spaces to detect smoke at different stratification levels
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Discuss ASD sensitivity class selection with the client based on risk assessment and asset value
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-slate-900/50 border border-white/10">
              <p className="font-semibold text-amber-400 mb-2">Common Mistakes</p>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 flex-shrink-0">!</span>
                  Ignoring sunlight paths when positioning beam detectors - causes false alarms
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 flex-shrink-0">!</span>
                  Failing to provide adequate access for beam detector alignment and maintenance
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 flex-shrink-0">!</span>
                  Neglecting ASD filter maintenance - blocked filters reduce sensitivity and airflow
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 flex-shrink-0">!</span>
                  Not considering future changes to the building that may obstruct beams or block pipes
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="p-4 rounded-lg bg-slate-900/50 border border-white/10">
                <p className="font-semibold text-white mb-2">{faq.question}</p>
                <p className="text-white">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Reference</h2>

          <div className="p-4 rounded-lg bg-slate-900/50 border border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full text-white text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 pr-4 font-semibold">Feature</th>
                    <th className="text-left py-2 pr-4 font-semibold">Beam Detectors</th>
                    <th className="text-left py-2 font-semibold">ASD Systems</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="py-2 pr-4 font-medium">Best For</td>
                    <td className="py-2 pr-4">Large open spaces</td>
                    <td className="py-2">High-value/critical areas</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 pr-4 font-medium">Detection Speed</td>
                    <td className="py-2 pr-4">Standard</td>
                    <td className="py-2">Very early warning</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 pr-4 font-medium">Coverage</td>
                    <td className="py-2 pr-4">Up to 100 m path length</td>
                    <td className="py-2">Up to 200 m pipe network</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 pr-4 font-medium">Visibility</td>
                    <td className="py-2 pr-4">Visible units at height</td>
                    <td className="py-2">Discrete small pipes</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Maintenance</td>
                    <td className="py-2 pr-4">Alignment, lens cleaning</td>
                    <td className="py-2">Filter, airflow, transport time</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-8">
          <Quiz
            title="Section 5 Knowledge Check"
            questions={quizQuestions}
            passingScore={70}
          />
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4 pt-6 border-t border-white/10">
          <Button variant="outline" asChild>
            <Link to="../fire-alarm-module-2-section-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button asChild className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
            <Link to="../fire-alarm-module-3">
              Module 3
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default FireAlarmModule2Section5;
