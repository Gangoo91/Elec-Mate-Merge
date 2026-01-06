import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What type of contamination might you encounter on a former petrol station site?",
    options: [
      "Asbestos only",
      "Hydrocarbons and heavy metals",
      "Lead paint",
      "Silica dust"
    ],
    correctIndex: 1,
    explanation: "Former petrol stations are brownfield sites likely to contain hydrocarbon contamination from fuel storage and heavy metals from vehicle servicing activities."
  },
  {
    id: "check-2",
    question: "What IP rating indicates an enclosure is protected against powerful water jets?",
    options: [
      "IP44",
      "IP65",
      "IP68",
      "IP20"
    ],
    correctIndex: 1,
    explanation: "IP65 indicates protection against dust ingress (6) and powerful water jets (5). This rating is suitable for outdoor electrical installations exposed to rain and pressure washing."
  },
  {
    id: "check-3",
    question: "At what sustained wind speed should work on mobile elevating work platforms (MEWPs) typically cease?",
    options: [
      "10 mph",
      "17 mph (force 4)",
      "30 mph",
      "40 mph"
    ],
    correctIndex: 1,
    explanation: "Most MEWP manufacturers specify wind speed limits around 17 mph (force 4 on the Beaufort scale). This is because wind loading can destabilise platforms and endanger workers at height."
  },
  {
    id: "check-4",
    question: "Which disease caused by contaminated water is a particular risk when working near waterways?",
    options: [
      "Tetanus",
      "Legionella",
      "Leptospirosis (Weil's disease)",
      "Hepatitis A"
    ],
    correctIndex: 2,
    explanation: "Leptospirosis (Weil's disease) is contracted through contact with water contaminated by rat urine. Workers near canals, rivers, or in drainage systems are at particular risk."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is a 'brownfield' site in construction terminology?",
    options: [
      "A site covered in brown soil",
      "Previously developed land that may be contaminated",
      "Agricultural land ready for development",
      "A site with planning permission"
    ],
    correctAnswer: 1,
    explanation: "Brownfield sites are previously developed land that may have contamination from former industrial, commercial, or military use. They require investigation before construction work begins."
  },
  {
    id: 2,
    question: "What should be carried out before any ground works on a site with unknown history?",
    options: [
      "A desktop study only",
      "Soil sampling and contamination assessment",
      "Visual inspection",
      "Price comparison"
    ],
    correctAnswer: 1,
    explanation: "Soil sampling and contamination assessment identifies hazards like heavy metals, hydrocarbons, asbestos, and chemical contamination that could affect worker health and safety."
  },
  {
    id: 3,
    question: "When trenching in contaminated ground, what additional PPE might be required beyond standard site wear?",
    options: [
      "Safety glasses only",
      "Chemical-resistant suit, gloves, and respiratory protection",
      "High-visibility vest",
      "Steel-toe boots only"
    ],
    correctAnswer: 1,
    explanation: "Working in contaminated ground requires chemical-resistant PPE including appropriate suits, gloves, and respiratory protection to prevent skin contact and inhalation of hazardous substances."
  },
  {
    id: 4,
    question: "What does the second digit in an IP rating indicate?",
    options: [
      "Dust protection level",
      "Impact resistance",
      "Water ingress protection level",
      "Temperature rating"
    ],
    correctAnswer: 2,
    explanation: "The IP (Ingress Protection) rating has two digits: the first indicates solid particle protection (0-6), and the second indicates water protection (0-9K). For example, IP65 offers complete dust protection (6) and water jet protection (5)."
  },
  {
    id: 5,
    question: "What minimum IP rating is typically required for outdoor socket outlets in the UK?",
    options: [
      "IP20",
      "IP44",
      "IP65",
      "IP68"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 typically requires IP44 as a minimum for outdoor socket outlets (protected against solid objects >1mm and water splashing from all directions). Higher ratings may be needed in more exposed locations."
  },
  {
    id: 6,
    question: "During flooding conditions on a construction site, what is the FIRST priority?",
    options: [
      "Continue working in dry areas",
      "Isolate electrical supplies and evacuate affected areas",
      "Move equipment to higher ground",
      "Take photographs for insurance"
    ],
    correctAnswer: 1,
    explanation: "The combination of water and electricity is extremely dangerous. The first priority is always to isolate electrical supplies to prevent electrocution, then evacuate personnel from affected areas safely."
  },
  {
    id: 7,
    question: "What wind force on the Beaufort scale is typically the maximum for safe scaffold work?",
    options: [
      "Force 3 (gentle breeze)",
      "Force 5 (fresh breeze)",
      "Force 6 (strong breeze)",
      "Force 8 (gale)"
    ],
    correctAnswer: 2,
    explanation: "Force 6 (strong breeze, 25-31 mph) is typically the maximum for scaffold work. Above this, loose materials become dangerous, climbing is hazardous, and workers may struggle to maintain balance."
  },
  {
    id: 8,
    question: "What symptoms might indicate heat stress in a worker?",
    options: [
      "Shivering and blue lips",
      "Heavy sweating, dizziness, and nausea",
      "Dry cough and sneezing",
      "Joint pain and stiffness"
    ],
    correctAnswer: 1,
    explanation: "Heat stress symptoms include heavy sweating, dizziness, nausea, headache, confusion, and rapid heartbeat. These indicate the body cannot regulate temperature properly and immediate action is needed."
  },
  {
    id: 9,
    question: "When working in freezing conditions, what additional electrical hazard should you be aware of?",
    options: [
      "Cables become more flexible",
      "RCDs trip more easily",
      "Cable insulation can become brittle and crack",
      "Motors run more efficiently"
    ],
    correctAnswer: 2,
    explanation: "In freezing conditions, cable insulation (particularly PVC) can become brittle and crack if flexed or impacted. This can expose live conductors and create shock or fire risks."
  },
  {
    id: 10,
    question: "What precaution should be taken when storing electrical equipment in damp conditions?",
    options: [
      "Store on the ground for stability",
      "Cover with plastic sheeting only",
      "Use dry, ventilated storage with silica gel desiccants",
      "Store in sealed containers with no ventilation"
    ],
    correctAnswer: 2,
    explanation: "Electrical equipment should be stored in dry, ventilated areas. Desiccants (silica gel) help absorb moisture. Sealed containers can trap condensation, while adequate ventilation prevents moisture build-up."
  },
  {
    id: 11,
    question: "What biological hazard might be present when working in old farm buildings being converted?",
    options: [
      "Carbon monoxide",
      "Radon gas",
      "Histoplasmosis from bird or bat droppings",
      "Electromagnetic radiation"
    ],
    correctAnswer: 2,
    explanation: "Histoplasmosis is a fungal infection caused by disturbing dried bird or bat droppings common in old agricultural buildings. Appropriate respiratory protection is essential when working in such environments."
  },
  {
    id: 12,
    question: "Under the CDM Regulations 2015, who has primary responsibility for identifying environmental hazards on a construction site?",
    options: [
      "The electrician",
      "The principal contractor",
      "The client",
      "The local council"
    ],
    correctAnswer: 1,
    explanation: "Under CDM 2015, the principal contractor has primary responsibility for managing construction phase risks, including identifying and controlling environmental hazards. They must assess site conditions and implement appropriate controls."
  }
];

const faqs = [
  {
    question: "How do I know if a site has ground contamination?",
    answer: "Check the site investigation report provided before work starts. This should detail any contamination found through soil sampling. If no report exists, ask your supervisor. Former industrial sites (factories, petrol stations, gasworks), military land, and areas near landfill are high-risk. Never dig without knowing ground conditions."
  },
  {
    question: "Can I use my normal power tools in wet conditions?",
    answer: "Standard 230V tools should never be used in wet conditions. Use 110V CTE (Centre Tapped Earth) systems with splash-proof transformers, or battery-powered tools in wet environments. Ensure all equipment has appropriate IP ratings for the conditions. Check for damage to cables and connections before use."
  },
  {
    question: "What should I do if I discover unexpected contamination while working?",
    answer: "Stop work immediately and leave the area. Do not disturb the contamination further. Report to your supervisor at once. Do not eat, drink, or smoke until you have washed thoroughly. You may need decontamination procedures. The site must be reassessed before work continues."
  },
  {
    question: "How do extreme weather conditions affect my work as an electrician?",
    answer: "Hot weather can cause cable expansion and heat-related illness. Cold weather makes insulation brittle and affects battery performance. Rain creates electrical hazards and slip risks. High winds prevent working at height and can blow debris. Lightning requires work cessation. Always check weather forecasts and plan accordingly."
  },
  {
    question: "What is Weil's disease and how do I protect myself?",
    answer: "Weil's disease (leptospirosis) is a bacterial infection spread through rat urine, often found in contaminated water. It causes flu-like symptoms and can lead to serious illness. Protect yourself by covering cuts before work, wearing waterproof gloves near water, not touching your face, and washing thoroughly after work. Report any illness promptly."
  }
];

const Level3Module1Section4_6 = () => {
  useSEO(
    "4.6 Environmental Hazards - Level 3 Health & Safety",
    "Environmental factors affecting workplace safety including contaminated ground, water ingress, extreme weather, and biological hazards in the electrical trade"
  );

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Sticky Section Header */}
      <div className="sticky top-0 z-30 w-full bg-elec-yellow shadow-md">
        <div className="max-w-4xl mx-auto flex items-center gap-3 px-4 sm:px-6 py-3">
          <Link
            to="/apprentice-courses/level-3-health-safety/module-1/section-4"
            className="text-black hover:underline font-semibold text-sm flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" /> Section 4
          </Link>
          <span className="text-black/50">/</span>
          <span className="font-bold text-black text-lg">4.6 Environmental Hazards</span>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 text-gray-200">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            Environmental Hazards
          </h1>
          <p className="text-lg text-gray-300">
            Understanding how environmental factors create workplace risks and the controls needed to protect yourself and others.
          </p>
        </header>

        {/* Quick Summary Box */}
        <div className="bg-[#222] border-l-4 border-elec-yellow rounded p-5 mb-8">
          <h2 className="text-lg font-bold flex items-center gap-2 text-elec-yellow mb-2">
            <Zap className="h-5 w-5" /> Quick Summary
          </h2>
          <ul className="list-disc list-inside space-y-1 text-gray-300">
            <li>Environmental hazards include contaminated ground, water ingress, weather, and biological risks</li>
            <li>Brownfield sites require contamination assessment before work begins</li>
            <li>IP ratings indicate protection against dust and water for electrical equipment</li>
            <li>Weather conditions can make normal work activities dangerous</li>
            <li>Biological hazards like Weil's disease require specific precautions</li>
          </ul>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-[#282828] rounded-lg p-5 mb-8">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-elec-yellow" /> Learning Outcomes
          </h2>
          <p className="text-gray-300 mb-3">By the end of this section, you will be able to:</p>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">1.</span>
              <span>Identify contaminated ground risks on construction sites</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">2.</span>
              <span>Understand IP ratings and their application to electrical installations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">3.</span>
              <span>Recognise weather-related hazards and appropriate responses</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">4.</span>
              <span>Apply controls for biological hazards encountered on sites</span>
            </li>
          </ul>
        </div>

        {/* Section 01: Contaminated Ground */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
            <span className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center text-base font-bold">1</span>
            Contaminated Ground Hazards
          </h2>

          <div className="space-y-4 text-gray-300">
            <p>
              <strong className="text-white">Brownfield sites</strong> are previously developed land that may contain contamination from former industrial, commercial, or military use. Understanding ground conditions is essential before excavation or cable installation work.
            </p>

            <div className="bg-[#282828] border border-gray-700 rounded-lg p-5 my-4">
              <h4 className="font-semibold text-white mb-3">Common Ground Contaminants:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-elec-yellow">Heavy Metals</p>
                  <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                    <li>Lead - former paint works, battery plants</li>
                    <li>Arsenic - agricultural land, tanneries</li>
                    <li>Cadmium - metal finishing, batteries</li>
                    <li>Mercury - chemical works, hospitals</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow">Organic Compounds</p>
                  <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                    <li>Hydrocarbons - petrol stations, garages</li>
                    <li>Solvents - dry cleaners, engineering</li>
                    <li>PCBs - transformer sites, electrical works</li>
                    <li>Tar - gasworks, coal yards</li>
                  </ul>
                </div>
              </div>
            </div>

            <p>
              <strong className="text-white">Why this matters for electricians:</strong> When laying underground cables, you may excavate contaminated soil. Skin contact with contaminated material can cause chemical burns, dermatitis, or long-term health effects. Inhaling dust from contaminated ground can damage lungs and other organs.
            </p>

            <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-4 my-4">
              <p className="font-semibold text-elec-yellow mb-2">Site Investigation Requirements</p>
              <p className="text-sm">Under CDM Regulations 2015, clients must provide site investigation information to designers and contractors. This includes desk studies of historical land use and intrusive soil sampling where contamination is suspected. Never start excavation without this information.</p>
            </div>

            <h4 className="font-semibold text-white mt-6 mb-2">Control Measures for Contaminated Ground:</h4>
            <ul className="list-disc list-inside space-y-2">
              <li>Review site investigation reports before work begins</li>
              <li>Wear appropriate PPE: chemical-resistant gloves, coveralls, respiratory protection</li>
              <li>Use designated welfare facilities with wash stations</li>
              <li>Bag and dispose of contaminated material through licensed waste contractors</li>
              <li>Shower and change clothes before leaving site</li>
              <li>Report any skin irritation, unusual smells, or discoloured soil immediately</li>
            </ul>
          </div>
        </section>

        {/* InlineCheck 1 */}
        <div className="my-8">
          <InlineCheck
            id={quickCheckQuestions[0].id}
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
        </div>

        {/* Section 02: Water Ingress and Flooding */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
            <span className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center text-base font-bold">2</span>
            Water Ingress and Flooding
          </h2>

          <div className="space-y-4 text-gray-300">
            <p>
              Water and electricity are a dangerous combination. Understanding IP ratings and water hazards is essential for selecting appropriate equipment and working safely in damp or wet conditions.
            </p>

            <div className="bg-[#282828] border border-gray-700 rounded-lg p-5 my-4">
              <h4 className="font-semibold text-white mb-3">IP (Ingress Protection) Ratings Explained:</h4>
              <p className="text-sm mb-3">IP ratings have two digits: First digit = solid particle protection (0-6), Second digit = water protection (0-9K)</p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left py-2 text-elec-yellow">Rating</th>
                    <th className="text-left py-2 text-elec-yellow">Protection Level</th>
                    <th className="text-left py-2 text-elec-yellow">Typical Use</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700">
                    <td className="py-2">IP20</td>
                    <td className="py-2">Protected against fingers, no water protection</td>
                    <td className="py-2">Indoor domestic</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2">IP44</td>
                    <td className="py-2">Protected against splashing water</td>
                    <td className="py-2">Outdoor sockets, bathrooms</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2">IP65</td>
                    <td className="py-2">Dust tight, protected against water jets</td>
                    <td className="py-2">External, car washes</td>
                  </tr>
                  <tr>
                    <td className="py-2">IP68</td>
                    <td className="py-2">Dust tight, protected against immersion</td>
                    <td className="py-2">Submersible equipment</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              <strong className="text-white">Why this matters:</strong> Selecting the wrong IP rating can lead to equipment failure, earth faults, or electric shock. Water tracking into enclosures can cause flashover, fire, or corrosion leading to delayed failures.
            </p>

            <h4 className="font-semibold text-white mt-6 mb-2">Flooding and Emergency Procedures:</h4>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>First priority:</strong> Isolate electrical supplies to flooded areas immediately</li>
              <li>Never wade through floodwater where electrical equipment may be submerged</li>
              <li>Evacuate personnel to safe areas away from electrical hazards</li>
              <li>Do not re-energise equipment that has been flooded without proper inspection and testing</li>
              <li>Assume all floodwater is contaminated (sewage, chemicals, debris)</li>
            </ul>

            <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 my-4">
              <p className="font-semibold text-red-400 mb-2">Critical Warning</p>
              <p className="text-sm">Floodwater may appear clear but conduct electricity readily due to dissolved salts and contaminants. A fatal shock can occur even with apparently clean rainwater if it creates a path to earth through your body.</p>
            </div>

            <h4 className="font-semibold text-white mt-6 mb-2">Working in Damp Conditions:</h4>
            <ul className="list-disc list-inside space-y-2">
              <li>Use 110V CTE (Centre Tapped Earth) supply systems with splash-proof transformers</li>
              <li>Ensure all 110V equipment and leads are in good condition with no damaged insulation</li>
              <li>Consider battery-powered tools for wet environments</li>
              <li>Position temporary distribution equipment in dry, protected locations</li>
              <li>Use weather protection (canopies, temporary covers) over connection points</li>
            </ul>
          </div>
        </section>

        {/* InlineCheck 2 */}
        <div className="my-8">
          <InlineCheck
            id={quickCheckQuestions[1].id}
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
        </div>

        {/* Section 03: Extreme Weather Conditions */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
            <span className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center text-base font-bold">3</span>
            Extreme Weather Conditions
          </h2>

          <div className="space-y-4 text-gray-300">
            <p>
              UK weather can change rapidly. Electricians working outdoors or on construction sites must understand how different weather conditions affect both personal safety and the electrical work itself.
            </p>

            <div className="bg-[#282828] border border-gray-700 rounded-lg p-5 my-4">
              <h4 className="font-semibold text-white mb-3">Wind Speed Limits for Work Activities:</h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left py-2 text-elec-yellow">Activity</th>
                    <th className="text-left py-2 text-elec-yellow">Maximum Wind</th>
                    <th className="text-left py-2 text-elec-yellow">Beaufort Scale</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700">
                    <td className="py-2">MEWP/Cherry picker</td>
                    <td className="py-2">17 mph (28 km/h)</td>
                    <td className="py-2">Force 4</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2">Tower scaffold</td>
                    <td className="py-2">23 mph (37 km/h)</td>
                    <td className="py-2">Force 5</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2">General scaffold work</td>
                    <td className="py-2">25-31 mph</td>
                    <td className="py-2">Force 6</td>
                  </tr>
                  <tr>
                    <td className="py-2">Crane operations</td>
                    <td className="py-2">Varies by crane type</td>
                    <td className="py-2">Check specifications</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 className="font-semibold text-white mt-6 mb-2">Heat-Related Hazards:</h4>
            <p>Hot weather, particularly when combined with physical work, can cause heat stress. Working in plant rooms, roof spaces, or wearing heavy PPE increases risk significantly.</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li><strong>Heat exhaustion symptoms:</strong> Heavy sweating, weakness, dizziness, nausea, headache</li>
              <li><strong>Heat stroke symptoms (emergency):</strong> Hot dry skin, confusion, collapse, no sweating</li>
              <li><strong>Controls:</strong> Regular breaks in shade, adequate hydration (water, not caffeine), schedule heavy work for cooler times, acclimatise gradually</li>
            </ul>

            <h4 className="font-semibold text-white mt-6 mb-2">Cold Weather Hazards:</h4>
            <p>Cold conditions affect both workers and equipment. PVC cable insulation becomes brittle below freezing and can crack if flexed or impacted.</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li><strong>Hypothermia risk:</strong> Shivering, confusion, drowsiness - get medical help</li>
              <li><strong>Frostbite:</strong> Numbness in extremities, white/waxy skin</li>
              <li><strong>Cable handling:</strong> Warm cables before bending, avoid impacts, check for cracks</li>
              <li><strong>Battery tools:</strong> Reduced capacity in cold - carry spare batteries</li>
              <li><strong>Slip hazards:</strong> Ice on scaffolds, access routes, materials</li>
            </ul>

            <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4 my-4">
              <p className="font-semibold text-blue-400 mb-2">Lightning Safety</p>
              <p className="text-sm">If lightning is visible or thunder audible, cease all outdoor work immediately. Do not shelter under isolated trees or near tall metal structures. Move to a substantial building or vehicle. Wait 30 minutes after the last lightning/thunder before resuming work.</p>
            </div>
          </div>
        </section>

        {/* InlineCheck 3 */}
        <div className="my-8">
          <InlineCheck
            id={quickCheckQuestions[2].id}
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
        </div>

        {/* Section 04: Biological Hazards */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
            <span className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center text-base font-bold">4</span>
            Biological Hazards
          </h2>

          <div className="space-y-4 text-gray-300">
            <p>
              Biological hazards on construction sites include bacteria, viruses, fungi, and parasites that can cause illness. Electricians face particular risks when working in certain environments.
            </p>

            <div className="bg-[#282828] border border-gray-700 rounded-lg p-5 my-4">
              <h4 className="font-semibold text-white mb-3">Key Biological Hazards for Electricians:</h4>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-elec-yellow">Leptospirosis (Weil's Disease)</p>
                  <p className="text-sm mt-1">Bacterial infection from rat urine, transmitted through contaminated water or soil. High risk near waterways, drainage systems, and farms. Causes flu-like symptoms progressing to jaundice, kidney failure.</p>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow">Histoplasmosis</p>
                  <p className="text-sm mt-1">Fungal infection from disturbing dried bird or bat droppings. Risk in old buildings, agricultural conversions, roof spaces. Causes respiratory illness.</p>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow">Tetanus</p>
                  <p className="text-sm mt-1">Bacterial infection entering through wounds contaminated with soil or rust. Ensure tetanus vaccination is up to date. Causes muscle spasms and can be fatal.</p>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow">Legionella</p>
                  <p className="text-sm mt-1">Bacteria in water systems, especially where water has stagnated. Risk when working on systems that have been out of use. Causes severe pneumonia.</p>
                </div>
              </div>
            </div>

            <h4 className="font-semibold text-white mt-6 mb-2">Control Measures for Biological Hazards:</h4>
            <ul className="list-disc list-inside space-y-2">
              <li>Cover all cuts and grazes with waterproof dressings before work</li>
              <li>Wear appropriate gloves when handling potentially contaminated materials</li>
              <li>Use respiratory protection (FFP3) when disturbing bird/bat droppings</li>
              <li>Never eat, drink, or smoke before washing hands thoroughly</li>
              <li>Keep vaccination records up to date, particularly tetanus</li>
              <li>Report any illness, particularly flu-like symptoms after exposure to risk areas</li>
              <li>Wash hands and exposed skin before leaving site</li>
            </ul>

            <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-4 my-4">
              <p className="font-semibold text-elec-yellow mb-2">Practical Scenario</p>
              <p className="text-sm">You are rewiring a farmhouse that has been empty for years. The roof space contains evidence of nesting birds and bat activity. Before entering, you should: wet down droppings with disinfectant spray to reduce dust, wear FFP3 respiratory protection and disposable coveralls, ensure good ventilation, and bag contaminated material for safe disposal.</p>
            </div>
          </div>
        </section>

        {/* InlineCheck 4 */}
        <div className="my-8">
          <InlineCheck
            id={quickCheckQuestions[3].id}
            question={quickCheckQuestions[3].question}
            options={quickCheckQuestions[3].options}
            correctIndex={quickCheckQuestions[3].correctIndex}
            explanation={quickCheckQuestions[3].explanation}
          />
        </div>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-elec-yellow mb-4">Practical Guidance for Electricians</h2>
          <div className="bg-[#282828] border border-gray-700 rounded-lg p-5">
            <h4 className="font-semibold text-white mb-3">Environmental Hazard Checklist:</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">1.</span>
                <span><strong>Before starting work:</strong> Check site investigation reports, weather forecasts, and any biological hazard information</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">2.</span>
                <span><strong>Equipment selection:</strong> Choose appropriate IP ratings for the environment and conditions</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">3.</span>
                <span><strong>PPE assessment:</strong> Consider all environmental factors when selecting protective equipment</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">4.</span>
                <span><strong>During work:</strong> Monitor changing conditions - weather, ground conditions, water levels</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">5.</span>
                <span><strong>Hygiene:</strong> Maintain good hygiene practices throughout the working day</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">6.</span>
                <span><strong>Reporting:</strong> Report any unexpected hazards, symptoms, or concerns immediately</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-elec-yellow mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-[#282828] border border-gray-700 rounded-lg p-5">
                <h4 className="font-semibold text-white mb-2">Q: {faq.question}</h4>
                <p className="text-gray-300 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-elec-yellow mb-4">Quick Reference</h2>
          <div className="bg-[#282828] border border-gray-700 rounded-lg p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
              <div>
                <p className="font-semibold text-white mb-2">Key IP Ratings:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>IP44 - Minimum outdoor sockets</li>
                  <li>IP65 - Dust/water jet protection</li>
                  <li>IP67 - Temporary immersion</li>
                  <li>IP68 - Continuous immersion</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">Emergency Actions:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Flooding: Isolate power FIRST</li>
                  <li>Lightning: Cease outdoor work</li>
                  <li>Heat stress: Cool, hydrate, rest</li>
                  <li>Contamination: Stop, report, wash</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Section 4.6 Knowledge Check"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
          <Link to="/apprentice-courses/level-3-health-safety/module-1/section-4/4-5">
            <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2 bg-[#333] border-gray-700 hover:bg-gray-700 text-white">
              <ArrowLeft className="h-4 w-4" /> Previous: 4.5 Manual Handling
            </Button>
          </Link>
          <Link to="/apprentice-courses/level-3-health-safety/module-1/section-5">
            <Button className="w-full sm:w-auto flex items-center gap-2 bg-elec-yellow hover:bg-elec-yellow text-black font-semibold">
              Next: Section 5 - Safety Management <ArrowLeft className="h-4 w-4 rotate-180" />
            </Button>
          </Link>
        </div>
      </article>
    </div>
  );
};

export default Level3Module1Section4_6;
