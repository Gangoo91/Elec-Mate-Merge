import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Fire Safety and Extinguishers - MOET Module 1 Section 6.1";
const DESCRIPTION = "Comprehensive guide to fire safety for electrical maintenance technicians: the fire triangle, classes of fire, extinguisher types and colour coding, electrical fire procedures, fire detection systems, alarm categories, BS 5839 and fire risk assessment.";

const quickCheckQuestions = [
  {
    id: "fire-triangle",
    question: "What three elements make up the fire triangle?",
    options: [
      "Fuel, water and oxygen",
      "Heat, fuel and oxygen",
      "Electricity, fuel and oxygen",
      "Heat, fuel and nitrogen"
    ],
    correctIndex: 1,
    explanation: "The fire triangle consists of heat, fuel and oxygen. All three must be present for a fire to start and continue burning. Removing any one element will extinguish the fire — this is the principle behind all firefighting methods."
  },
  {
    id: "electrical-fire-extinguisher",
    question: "Which extinguisher types are safe to use on an electrical fire once the supply has been isolated?",
    options: [
      "Water and foam only",
      "Wet chemical only",
      "CO2 and dry powder",
      "Any extinguisher type"
    ],
    correctIndex: 2,
    explanation: "CO2 (carbon dioxide) and dry powder extinguishers are safe to use on electrical fires. CO2 is preferred as it leaves no residue. Water, foam and wet chemical extinguishers must never be used on live electrical equipment as they conduct electricity. Always isolate the supply first if it is safe to do so."
  },
  {
    id: "fire-alarm-category-l",
    question: "What does an L-category fire alarm system protect?",
    options: [
      "Property only",
      "Life safety — protection of occupants",
      "Livestock in agricultural buildings",
      "Low-risk areas only"
    ],
    correctIndex: 1,
    explanation: "L-category fire alarm systems are designed for the protection of life. They range from L1 (detection throughout the building) to L5 (bespoke system engineered to satisfy specific fire safety objectives). L-categories focus on giving early warning to enable safe evacuation."
  },
  {
    id: "electrical-fire-cause",
    question: "Which of the following is the most common electrical cause of fire?",
    options: [
      "Using LED lighting",
      "Overloaded circuits and loose connections",
      "Having too many sockets in a room",
      "Using surge protectors"
    ],
    correctIndex: 1,
    explanation: "Overloaded circuits and loose connections are the most common electrical causes of fire. Overloading causes conductors to overheat beyond their rated capacity, while loose connections create high-resistance joints that generate localised heat — both can ignite surrounding combustible materials."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The fire triangle consists of which three elements?",
    options: [
      "Heat, fuel and oxygen",
      "Electricity, fuel and water",
      "Heat, fuel and carbon dioxide",
      "Oxygen, fuel and nitrogen"
    ],
    correctAnswer: 0,
    explanation: "The fire triangle requires heat, fuel and oxygen. All three must be present simultaneously for combustion to occur. Remove any one element and the fire will be extinguished."
  },
  {
    id: 2,
    question: "A Class B fire involves which type of material?",
    options: [
      "Solid combustible materials such as wood and paper",
      "Flammable liquids such as petrol and solvents",
      "Flammable gases such as propane and methane",
      "Cooking oils and fats"
    ],
    correctAnswer: 1,
    explanation: "Class B fires involve flammable liquids such as petrol, diesel, solvents and paints. They require extinguishing agents that can smother the liquid surface — foam, CO2 or dry powder are appropriate."
  },
  {
    id: 3,
    question: "What colour band identifies a CO2 fire extinguisher?",
    options: [
      "Red band on a red body",
      "Cream band on a red body",
      "Black band on a red body",
      "Blue band on a red body"
    ],
    correctAnswer: 2,
    explanation: "CO2 extinguishers have a black band on a red body, in accordance with BS EN 3. The all-red body is standard for all extinguisher types; the coloured band identifies the extinguishing agent."
  },
  {
    id: 4,
    question: "Before tackling an electrical fire, what should you do first if it is safe to do so?",
    options: [
      "Open windows to ventilate the area",
      "Isolate the electrical supply",
      "Apply water to cool the equipment",
      "Cover the fire with a fire blanket"
    ],
    correctAnswer: 1,
    explanation: "The first action for an electrical fire is to isolate the electrical supply if it is safe to do so. This removes the ignition source, makes the area safer for firefighting, and reduces the risk of electric shock to anyone tackling the fire."
  },
  {
    id: 5,
    question: "An aspirating smoke detection system works by:",
    options: [
      "Detecting visible flames using infrared sensors",
      "Measuring room temperature with thermocouples",
      "Continuously drawing air samples through a pipe network to a central detector",
      "Using water sprinklers that activate on smoke"
    ],
    correctAnswer: 2,
    explanation: "Aspirating smoke detection (ASD) systems, such as VESDA, continuously draw air samples through a pipe network to a highly sensitive central detector. They provide very early warning of smoke and are used in critical environments such as server rooms, switchrooms and data centres."
  },
  {
    id: 6,
    question: "Under BS 5839, a P1 fire alarm category provides:",
    options: [
      "Detection throughout the entire building for life safety",
      "Automatic detection throughout the building for property protection",
      "Detection in defined areas only for property protection",
      "Manual call point coverage only"
    ],
    correctAnswer: 1,
    explanation: "A P1 system provides automatic fire detection throughout all areas of the building for the purpose of property protection. This is distinct from L-categories which focus on life safety. P1 and P2 (selected areas) categories ensure early detection to minimise property damage."
  },
  {
    id: 7,
    question: "Fire doors are required to provide a minimum fire resistance of:",
    options: [
      "10 minutes (FD10)",
      "20 minutes (FD20)",
      "30 minutes (FD30)",
      "60 minutes (FD60)"
    ],
    correctAnswer: 2,
    explanation: "The minimum fire resistance for a fire door is typically 30 minutes (FD30), although FD60 doors are required in certain locations such as staircase enclosures in buildings over 18 metres. Fire doors must be properly maintained with intumescent strips and self-closing devices intact."
  },
  {
    id: 8,
    question: "Which regulation places a duty on employers to carry out fire risk assessments?",
    options: [
      "The Health and Safety at Work etc. Act 1974",
      "The Regulatory Reform (Fire Safety) Order 2005",
      "The Electricity at Work Regulations 1989",
      "The Building Regulations 2010 Part B"
    ],
    correctAnswer: 1,
    explanation: "The Regulatory Reform (Fire Safety) Order 2005 (RRFSO) requires the 'responsible person' (usually the employer or building owner) to carry out a fire risk assessment and implement appropriate fire safety measures. It applies to virtually all non-domestic premises in England and Wales."
  },
  {
    id: 9,
    question: "A fire marshal's responsibilities include:",
    options: [
      "Designing the fire alarm system for the building",
      "Sweeping their designated area and guiding occupants to the assembly point during an evacuation",
      "Carrying out annual fire alarm maintenance",
      "Issuing fire safety certificates to contractors"
    ],
    correctAnswer: 1,
    explanation: "Fire marshals (also called fire wardens) are responsible for sweeping their designated area during an evacuation, ensuring everyone has left, assisting persons with mobility difficulties, guiding occupants to the assembly point, and reporting to the chief fire marshal."
  },
  {
    id: 10,
    question: "Arcing at a loose terminal connection can cause a fire because:",
    options: [
      "The arc produces ultraviolet light which ignites plastics",
      "The high-resistance joint generates localised heat that can ignite surrounding combustible materials",
      "Arcing reduces the circuit voltage below safe levels",
      "The arc causes the fuse to operate too slowly"
    ],
    correctAnswer: 1,
    explanation: "A loose connection creates a high-resistance joint. Current flowing through this high resistance generates significant localised heat (P = I²R). Over time, this heat can carbonise insulation, melt plastic enclosures, and ignite surrounding combustible materials. This is one of the most common electrical causes of fire."
  },
  {
    id: 11,
    question: "BS 5839-1 covers the design, installation and maintenance of:",
    options: [
      "Emergency lighting systems",
      "Portable fire extinguishers",
      "Fire detection and fire alarm systems for buildings",
      "Sprinkler systems"
    ],
    correctAnswer: 2,
    explanation: "BS 5839-1 is the code of practice for the design, installation, commissioning and maintenance of fire detection and fire alarm systems in non-domestic buildings. It defines system categories (L and P), detector types, spacing requirements, and maintenance schedules."
  },
  {
    id: 12,
    question: "When installing cables through a fire compartment wall, you must:",
    options: [
      "Use plastic trunking to protect the cables",
      "Ensure fire stopping is applied to maintain the fire resistance of the wall",
      "Run the cables through the wall at the highest point",
      "Use steel conduit through the wall only"
    ],
    correctAnswer: 1,
    explanation: "When cables penetrate a fire compartment wall or floor, the openings must be sealed with approved fire stopping materials to maintain the fire resistance rating of the barrier. Failure to firestop penetrations is a major cause of fire spread in buildings and a common deficiency found during fire risk assessments."
  }
];

const faqs = [
  {
    question: "Can I use a water extinguisher on an electrical fire?",
    answer: "Never use a water extinguisher on live electrical equipment — water conducts electricity and you could receive a fatal electric shock. If you can safely isolate the supply first, the fire becomes a Class A, B or C fire depending on the materials involved. On live or potentially live electrical equipment, use only CO2 or dry powder extinguishers. CO2 is preferred as it leaves no residue that could damage sensitive electrical equipment."
  },
  {
    question: "How often should fire extinguishers be serviced?",
    answer: "Under the Regulatory Reform (Fire Safety) Order 2005 and BS 5306-3, fire extinguishers must receive a basic annual service by a competent person (typically a specialist contractor). Additionally, they should be visually inspected monthly by a responsible person on site to check for damage, correct pressure and accessibility. Extended service intervals apply depending on the extinguisher type — for example, CO2 extinguishers require a 10-year overhaul."
  },
  {
    question: "What is the difference between a fire alarm L3 and L1 system?",
    answer: "An L1 system provides automatic fire detection in all areas of the building — rooms, corridors, roof voids and floor voids. An L3 system provides detection only in escape routes (corridors, stairwells, landings) and rooms opening onto escape routes. L1 gives the highest level of life protection with earliest warning; L3 protects the means of escape but may not detect fires in remote rooms until smoke reaches the escape route."
  },
  {
    question: "As a maintenance electrician, what fire safety checks should I carry out?",
    answer: "During maintenance work, you should check for signs of overheating at connections (discolouration, melted insulation, burning smells), verify that circuit breakers and fuses are correctly rated, ensure fire stopping is intact where cables pass through compartment walls, confirm that fire alarm cables are undamaged, and report any electrical hazards that could pose a fire risk. You are not expected to carry out formal fire risk assessments, but you have a duty to report hazards."
  },
  {
    question: "What are the main electrical causes of fire in buildings?",
    answer: "The main electrical causes of fire include: overloaded circuits (cables carrying more current than their rated capacity), loose connections creating high-resistance joints, damaged or deteriorated insulation, arcing faults, misuse of extension leads and adaptors, faulty or poorly maintained equipment, and incorrect fuse/MCB ratings. Regular inspection, testing and maintenance — as required by BS 7671 — is the primary defence against electrical fires."
  }
];

const MOETModule1Section6_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section6">
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
            <span>Module 1.6.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Fire Safety and Extinguishers
          </h1>
          <p className="text-white/80">
            Understanding fire hazards, prevention and response for electrical maintenance technicians
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Fire triangle:</strong> Heat + fuel + oxygen = fire</li>
              <li className="pl-1"><strong>Classes:</strong> A (solids), B (liquids), C (gases), D (metals), F (cooking oils)</li>
              <li className="pl-1"><strong>Electrical fires:</strong> Isolate first, CO2 or dry powder only</li>
              <li className="pl-1"><strong>Standards:</strong> BS 5839, RRFSO 2005, BS EN 3</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Common causes:</strong> Overloaded circuits, loose connections, arcing</li>
              <li className="pl-1"><strong>Detection:</strong> Smoke, heat, flame and aspirating detectors</li>
              <li className="pl-1"><strong>Alarm categories:</strong> L1-L5 (life), P1-P2 (property)</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to fire safety awareness KSBs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the fire triangle and how removing each element extinguishes fire",
              "Identify the six classes of fire (A-F) and appropriate extinguisher types",
              "Describe the colour coding system for fire extinguishers under BS EN 3",
              "Apply correct procedures for tackling electrical fires safely",
              "Differentiate between fire alarm categories L1-L5 and P1-P2 under BS 5839",
              "Recognise common electrical causes of fire and preventive maintenance measures"
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

        {/* Section 01: The Fire Triangle and Classes of Fire */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Fire Triangle and Classes of Fire
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding how fire starts, sustains and spreads is fundamental to fire safety. The fire triangle
              model explains the three elements required for combustion: heat (an ignition source), fuel (a combustible
              material) and oxygen (from the air). All three must be present simultaneously for a fire to burn. Remove
              any one element and the fire will be extinguished — this principle underpins all firefighting strategies.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Fire Triangle</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Heat (ignition source):</strong> Electrical arcing, overheated connections, sparks from grinding, hot surfaces, naked flames. In electrical work, heat is most commonly generated by high-resistance joints, overloaded conductors and arcing faults</li>
                <li className="pl-1"><strong>Fuel (combustible material):</strong> Cable insulation (PVC, XLPE, LSF), wooden trunking, cardboard packaging, dust accumulation, flammable liquids used for cleaning, building materials. Switchrooms often contain significant quantities of combustible material</li>
                <li className="pl-1"><strong>Oxygen (air):</strong> Normal atmospheric air contains approximately 21% oxygen — more than sufficient to support combustion. Forced ventilation systems in buildings can supply additional oxygen to a fire, accelerating its growth</li>
              </ul>
            </div>

            <p>
              For electrical maintenance technicians, the most relevant aspect of the fire triangle is the heat
              element. Electrical faults — particularly loose connections, overloaded circuits and arcing — generate
              sufficient heat to ignite surrounding combustible materials. Your role in preventing electrical fires
              is to identify and rectify these heat sources through proper installation, maintenance and testing.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Classes of Fire</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Class</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Material</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Examples</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Suitable Extinguishers</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">A</td>
                      <td className="border border-white/10 px-3 py-2">Solid combustible materials</td>
                      <td className="border border-white/10 px-3 py-2">Wood, paper, textiles, plastics</td>
                      <td className="border border-white/10 px-3 py-2">Water, foam, dry powder</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">B</td>
                      <td className="border border-white/10 px-3 py-2">Flammable liquids</td>
                      <td className="border border-white/10 px-3 py-2">Petrol, diesel, solvents, paints</td>
                      <td className="border border-white/10 px-3 py-2">Foam, CO2, dry powder</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">C</td>
                      <td className="border border-white/10 px-3 py-2">Flammable gases</td>
                      <td className="border border-white/10 px-3 py-2">Propane, butane, methane, natural gas</td>
                      <td className="border border-white/10 px-3 py-2">Dry powder (isolate gas supply first)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">D</td>
                      <td className="border border-white/10 px-3 py-2">Combustible metals</td>
                      <td className="border border-white/10 px-3 py-2">Magnesium, aluminium, sodium, lithium</td>
                      <td className="border border-white/10 px-3 py-2">Specialist dry powder only</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">F</td>
                      <td className="border border-white/10 px-3 py-2">Cooking oils and fats</td>
                      <td className="border border-white/10 px-3 py-2">Deep fat fryers, chip pans</td>
                      <td className="border border-white/10 px-3 py-2">Wet chemical only</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Electrical Fires — Special Considerations</p>
              <p className="text-sm text-white">
                Electrical fires are not a separate class under BS EN 2. Instead, once the electrical supply is isolated,
                the fire is classified according to the material that is burning (typically Class A — plastics and insulation).
                However, if the equipment is still live or potentially live, only CO2 or dry powder extinguishers may be used.
                Never use water, foam or wet chemical on live electrical equipment — these agents conduct electricity and will
                cause electric shock. The priority is always to isolate the supply first if it is safe to do so.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> As a maintenance electrician, you are likely to encounter Class A fires (burning
              insulation) caused by electrical faults. Your first action should always be to isolate the supply, then use
              a CO2 extinguisher if safe to do so. Never attempt to fight a fire that is beyond the initial stages — evacuate
              and call the fire brigade.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Fire Extinguishers — Types and Colour Coding */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Fire Extinguishers — Types and Colour Coding
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Under BS EN 3, all fire extinguishers in the UK have a red body with a coloured band or label identifying
              the extinguishing agent. Understanding which extinguisher to use in each situation is critical — using the
              wrong type can be ineffective at best and dangerous at worst. For electrical maintenance technicians, this
              knowledge could save your life or the lives of your colleagues.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Extinguisher Types and Colour Codes</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Colour Band</th>
                      <th className="border border-white/10 px-3 py-2 text-left">How It Works</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Safe on Electrics?</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Water</td>
                      <td className="border border-white/10 px-3 py-2">All red (no band)</td>
                      <td className="border border-white/10 px-3 py-2">Cools the fuel below ignition temperature</td>
                      <td className="border border-white/10 px-3 py-2">No — conducts electricity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Foam (AFFF)</td>
                      <td className="border border-white/10 px-3 py-2">Cream</td>
                      <td className="border border-white/10 px-3 py-2">Forms a film that smothers the fire, sealing vapours</td>
                      <td className="border border-white/10 px-3 py-2">No — conducts electricity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">CO2</td>
                      <td className="border border-white/10 px-3 py-2">Black</td>
                      <td className="border border-white/10 px-3 py-2">Displaces oxygen; does not leave residue</td>
                      <td className="border border-white/10 px-3 py-2">Yes — preferred for electrics</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Dry powder</td>
                      <td className="border border-white/10 px-3 py-2">Blue</td>
                      <td className="border border-white/10 px-3 py-2">Chemical reaction interrupts the combustion chain</td>
                      <td className="border border-white/10 px-3 py-2">Yes — but leaves residue</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Wet chemical</td>
                      <td className="border border-white/10 px-3 py-2">Yellow</td>
                      <td className="border border-white/10 px-3 py-2">Cools and forms a soap-like film (saponification)</td>
                      <td className="border border-white/10 px-3 py-2">No — conducts electricity</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">CO2 Extinguishers — The Electrician's Choice</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Safe on live electrical equipment up to 1000 V</li>
                  <li className="pl-1">Leaves no residue — important for protecting sensitive equipment</li>
                  <li className="pl-1">Horn becomes extremely cold during discharge — never hold it</li>
                  <li className="pl-1">Rapid dissipation — fire may re-ignite if heat source not removed</li>
                  <li className="pl-1">Not effective outdoors due to wind dispersal</li>
                  <li className="pl-1">Risk of asphyxiation in confined spaces — use with caution</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Dry Powder Extinguishers</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Multi-purpose — effective on Class A, B and C fires</li>
                  <li className="pl-1">Safe on electrical equipment</li>
                  <li className="pl-1">Leaves significant powder residue — damages equipment</li>
                  <li className="pl-1">Reduces visibility — can cause disorientation in enclosed spaces</li>
                  <li className="pl-1">Does not cool effectively — re-ignition risk</li>
                  <li className="pl-1">Not recommended for use indoors in occupied buildings</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Electrical Fire Procedure</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Step 1:</strong> Raise the alarm — activate the nearest manual call point</li>
                <li className="pl-1"><strong>Step 2:</strong> Isolate the electrical supply if it is safe to do so (use the local isolator, distribution board or emergency stop)</li>
                <li className="pl-1"><strong>Step 3:</strong> Only if the fire is small and you are trained, use a CO2 or dry powder extinguisher</li>
                <li className="pl-1"><strong>Step 4:</strong> If the fire cannot be controlled, evacuate immediately and close doors behind you</li>
                <li className="pl-1"><strong>Step 5:</strong> Call 999 and report to the assembly point</li>
                <li className="pl-1"><strong>Step 6:</strong> Do not re-enter the building until authorised by the fire brigade</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> You should only attempt to fight a fire if it is small (no bigger than a waste bin),
              you have a clear escape route behind you, and you have been trained in extinguisher use. Your life is worth
              more than any piece of equipment. If in doubt, get out.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Fire Detection Systems and Alarm Categories */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Fire Detection Systems and Alarm Categories
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              As an electrical maintenance technician, you will install, maintain and test fire detection and alarm
              systems. BS 5839-1 is the code of practice for fire detection and fire alarm systems in non-domestic
              buildings, and BS 5839-6 covers domestic premises. Understanding detector types, system categories and
              maintenance requirements is essential for your role.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Fire Detector</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Optical smoke detector:</strong> Uses a light source and photosensor; detects visible smoke particles from smouldering fires. Suitable for most general areas. Can be triggered by dust, steam or aerosols — consider the environment</li>
                <li className="pl-1"><strong>Ionisation smoke detector:</strong> Contains a small radioactive source; very sensitive to fast-flaming fires producing small smoke particles. Being phased out due to disposal concerns but still found in many existing installations</li>
                <li className="pl-1"><strong>Heat detector:</strong> Activates when temperature reaches a fixed threshold (typically 57°C or 90°C) or when temperature rises rapidly (rate of rise). Less prone to false alarms than smoke detectors. Used in kitchens, garages, boiler rooms and dusty environments</li>
                <li className="pl-1"><strong>Multi-sensor detector:</strong> Combines optical smoke and heat detection in a single unit. Uses algorithms to reduce false alarms while maintaining sensitivity. Increasingly common in modern installations</li>
                <li className="pl-1"><strong>Flame detector:</strong> Detects infrared (IR) or ultraviolet (UV) radiation from flames. Used in high-ceiling areas, outdoor installations and petrochemical facilities where smoke detection is impractical</li>
                <li className="pl-1"><strong>Aspirating smoke detection (ASD):</strong> Continuously draws air samples through a pipe network to a central laser-based detector. Extremely sensitive — can detect smoke at pre-combustion stage. Used in server rooms, switchrooms, data centres and heritage buildings</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS 5839-1 Fire Alarm Categories</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Coverage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">L1</td>
                      <td className="border border-white/10 px-3 py-2">Life protection</td>
                      <td className="border border-white/10 px-3 py-2">Detection throughout the entire building including roof voids and floor voids</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">L2</td>
                      <td className="border border-white/10 px-3 py-2">Life protection</td>
                      <td className="border border-white/10 px-3 py-2">Detection in escape routes plus rooms opening onto escape routes, plus high-risk areas</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">L3</td>
                      <td className="border border-white/10 px-3 py-2">Life protection</td>
                      <td className="border border-white/10 px-3 py-2">Detection in escape routes and rooms that open onto escape routes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">L4</td>
                      <td className="border border-white/10 px-3 py-2">Life protection</td>
                      <td className="border border-white/10 px-3 py-2">Detection in escape routes only (corridors, stairwells)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">L5</td>
                      <td className="border border-white/10 px-3 py-2">Life protection</td>
                      <td className="border border-white/10 px-3 py-2">Bespoke system designed to satisfy specific fire engineering objectives</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">P1</td>
                      <td className="border border-white/10 px-3 py-2">Property protection</td>
                      <td className="border border-white/10 px-3 py-2">Automatic detection throughout the entire building</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">P2</td>
                      <td className="border border-white/10 px-3 py-2">Property protection</td>
                      <td className="border border-white/10 px-3 py-2">Automatic detection in defined high-risk areas only</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Manual Call Points (Break Glass)</h3>
              <p className="text-sm text-white mb-2">
                In addition to automatic detection, all fire alarm systems include manual call points (MCPs) — the familiar
                red "break glass" units. BS 5839-1 requires MCPs to be installed on every storey at every exit point leading
                to a place of safety, at a height of 1.4 m from floor level. They must be clearly visible and accessible, with
                a maximum travel distance of 45 m from any point in the building to the nearest MCP.
              </p>
              <p className="text-sm text-white">
                An M-category system consists of manual call points only, with no automatic detection. This is the minimum
                standard for most non-domestic premises but may not be sufficient for buildings with sleeping risk or
                unattended operation.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> As a maintenance technician, you must understand fire detection systems well
              enough to carry out routine testing (weekly call point tests, monthly detector checks) and to identify
              faults. You are not expected to design fire alarm systems, but you must understand the categories and be
              able to follow BS 5839-1 maintenance schedules.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Fire Prevention — Compartmentation, Doors and Means of Escape */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Fire Prevention — Compartmentation, Doors and Means of Escape
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Passive fire protection — fire compartmentation, fire doors and maintained escape routes — is as important
              as detection and suppression. As an electrical maintenance technician, your work directly impacts the integrity
              of fire compartments every time you route cables through walls and floors. Understanding fire stopping
              requirements is an essential part of your competence.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Fire Compartmentation</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Buildings are divided into fire compartments by fire-resisting walls and floors</li>
                  <li className="pl-1">Compartments limit fire spread, giving occupants time to evacuate</li>
                  <li className="pl-1">Typical compartment walls provide 30, 60 or 120 minutes fire resistance</li>
                  <li className="pl-1">Any penetration through a compartment wall or floor must be fire-stopped</li>
                  <li className="pl-1">Cable penetrations are a major source of compartment breach — always fire-stop</li>
                  <li className="pl-1">Fire stopping must match the fire resistance period of the wall or floor</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Fire Doors</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Fire doors are rated FD30 (30 min) or FD60 (60 min)</li>
                  <li className="pl-1">Must have intumescent strips (expand in heat to seal gaps)</li>
                  <li className="pl-1">Cold smoke seals prevent smoke spread at ambient temperature</li>
                  <li className="pl-1">Must be self-closing — never wedge open unless held by automatic release</li>
                  <li className="pl-1">Electromagnetic holders release doors on fire alarm activation</li>
                  <li className="pl-1">Regular inspection: check strips, seals, closers, gaps (max 3 mm)</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Means of Escape</h3>
              <p className="text-sm text-white mb-3">
                Every building must have adequate means of escape — safe routes from any point in the building to a place
                of safety outside. Approved Document B of the Building Regulations sets out the requirements for means
                of escape, including maximum travel distances, minimum corridor and stairway widths, and the number of
                exits required.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Travel distances:</strong> Maximum distance from any point to the nearest exit varies by building type — typically 18 m in one direction, 45 m if alternative routes are available</li>
                <li className="pl-1"><strong>Escape routes:</strong> Must be clear of obstructions at all times — never store materials or equipment in corridors or stairways</li>
                <li className="pl-1"><strong>Emergency lighting:</strong> Required on all escape routes to provide illumination if the normal supply fails (BS 5266-1)</li>
                <li className="pl-1"><strong>Exit signage:</strong> Illuminated or photoluminescent exit signs to BS ISO 7010 / BS 5499 at every exit and change of direction</li>
                <li className="pl-1"><strong>Final exit doors:</strong> Must open in the direction of escape and be operable without a key from the inside</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Fire Risk Assessment</p>
              <p className="text-sm text-white mb-2">
                The Regulatory Reform (Fire Safety) Order 2005 requires the responsible person to carry out a fire risk
                assessment for all non-domestic premises. The assessment must identify fire hazards, identify persons at
                risk, evaluate the risks, record findings and implement appropriate fire safety measures. It must be
                reviewed regularly and whenever there is a significant change in the premises.
              </p>
              <p className="text-sm text-white">
                As a maintenance electrician, you should be aware that your work can introduce new fire hazards (e.g.,
                hot work during cable installation) and that you may identify existing fire hazards during your work
                (e.g., damaged fire stopping, overloaded circuits, combustible materials stored near electrical equipment).
                Report all fire hazards through the appropriate channels.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Fire marshals (fire wardens) are trained employees responsible for implementing
              the evacuation plan. Their duties include sweeping their designated area, checking rooms and toilets,
              guiding occupants to assembly points, assisting persons with disabilities, and reporting to the chief
              fire marshal. Fire marshals receive specific training and should be identifiable (e.g., hi-vis vest).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05: Electrical Causes of Fire and Prevention */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Electrical Causes of Fire and Prevention
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electrical faults are one of the leading causes of fire in commercial and industrial buildings. As an
              electrical maintenance technician, you are on the front line of fire prevention. Understanding how
              electrical faults cause fires — and how proper installation, maintenance and testing can prevent them —
              is a core competence under ST1426.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Electrical Causes of Fire</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Overloaded circuits:</strong> When conductors carry more current than their rated capacity, they overheat. The insulation degrades, softens and eventually ignites. Overloading is often caused by adding loads without upgrading the circuit, daisy-chaining extension leads, or bypassing protective devices</li>
                <li className="pl-1"><strong>Loose connections:</strong> A loose terminal or crimped connection creates a high-resistance joint. The power dissipated at the joint (P = I²R) generates localised heat. Over time, this heat carbonises the insulation, creating a conducting carbon track that can eventually ignite. Loose connections are the most insidious fire hazard because they develop gradually and may not trip protective devices</li>
                <li className="pl-1"><strong>Arcing faults:</strong> Arcing occurs when current jumps across a gap — typically at a damaged conductor, a corroded connection or a broken cable. Arc faults generate temperatures of several thousand degrees Celsius, easily igniting surrounding materials. Arc fault detection devices (AFDDs) are now recommended in BS 7671 for certain locations</li>
                <li className="pl-1"><strong>Damaged insulation:</strong> Cables that are physically damaged (by nails, screws, rodents or age) can develop insulation faults that lead to short circuits and arcing. Cables installed in thermal insulation without de-rating are also at risk of overheating</li>
                <li className="pl-1"><strong>Incorrect protective device ratings:</strong> If a fuse or MCB is rated higher than the cable's current-carrying capacity, it will not disconnect the supply before the cable overheats. Using 30 A fuse wire in a 5 A circuit is a classic example</li>
                <li className="pl-1"><strong>Faulty equipment:</strong> Poorly maintained equipment with worn bearings, blocked ventilation or internal faults can overheat and ignite. Regular PAT testing and maintenance programmes reduce this risk</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Preventive Measures for Maintenance Technicians</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Thermal imaging:</strong> Use infrared thermography during maintenance to identify hot spots at connections, busbars and cable joints before they become fire hazards. This is increasingly standard practice during periodic inspection</li>
                <li className="pl-1"><strong>Torque tightening:</strong> Use a torque screwdriver to tighten terminals to the manufacturer's specified torque. BS 7671 Regulation 526.2 requires connections to be mechanically and electrically sound</li>
                <li className="pl-1"><strong>Visual inspection:</strong> Look for signs of overheating — discolouration of conductors, melted insulation, burning smells, brown marks on enclosures. Report and rectify immediately</li>
                <li className="pl-1"><strong>Correct cable selection:</strong> Ensure cables are rated for the installed conditions — ambient temperature, grouping, thermal insulation, installation method (Appendix 4 of BS 7671)</li>
                <li className="pl-1"><strong>Fire stopping:</strong> After routing cables through compartment walls and floors, always apply appropriate fire stopping materials. Use approved proprietary systems — not expanding foam or general-purpose sealant</li>
                <li className="pl-1"><strong>AFDDs:</strong> Consider recommending arc fault detection devices for vulnerable locations — timber-framed buildings, premises with sleeping accommodation, locations with combustible construction</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Thermography Example</h3>
                <p className="text-sm text-white">
                  During a periodic inspection of a distribution board, a maintenance technician used thermal imaging
                  to identify a connection running at 85°C — well above the normal operating temperature. Investigation
                  revealed a loose busbar connection that had been gradually degrading for months. If left unchecked,
                  this would likely have resulted in a fire. The connection was re-torqued and the board returned to
                  service safely.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">BS 7671 Requirements</h3>
                <p className="text-sm text-white">
                  BS 7671:2018+A2:2022 includes specific requirements related to fire prevention: Regulation 421
                  covers protection against fire caused by electrical equipment; Regulation 422 addresses precautions
                  where particular risks of fire exist; and Section 527 covers measures to minimise the spread of
                  fire through wiring systems (fire barriers, fire stopping, selection of cable types).
                </p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> The Fire Statistics Monitor published by the Home Office shows that approximately
              14,000 fires per year in England are caused by electrical faults — representing around 50% of all
              accidental dwelling fires. Proper electrical installation, inspection and maintenance is the primary
              defence. As a maintenance technician, your work directly contributes to fire prevention.
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
                <p className="font-medium text-white mb-1">Fire Classes &amp; Extinguishers</p>
                <ul className="space-y-0.5">
                  <li>A (solids) — Water, foam, dry powder</li>
                  <li>B (liquids) — Foam, CO2, dry powder</li>
                  <li>C (gases) — Dry powder (isolate supply)</li>
                  <li>D (metals) — Specialist dry powder</li>
                  <li>F (cooking oils) — Wet chemical</li>
                  <li>Electrical — CO2 or dry powder (isolate first)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key References</p>
                <ul className="space-y-0.5">
                  <li>BS 5839-1 — Fire detection and alarm systems</li>
                  <li>BS EN 3 — Fire extinguisher colour coding</li>
                  <li>RRFSO 2005 — Fire risk assessment duty</li>
                  <li>BS 7671 — Regs 421, 422, Section 527</li>
                  <li>Approved Document B — Means of escape</li>
                  <li>ST1426 — Fire safety awareness KSBs</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section6-2">
              Next: First Aid for Electrical Incidents
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule1Section6_1;
