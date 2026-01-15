import { ArrowLeft, ArrowRight, Cable, Building2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";
import { useState } from "react";

const TITLE = "Zoning, Environmental Considerations, and Cable Choice - Module 5.2.4 | Level 2 Electrical Course";
const DESCRIPTION = "Learn about safe cable routing zones, environmental factors affecting cable performance, and selecting appropriate cables for different applications in compliance with BS 7671.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What regulation in BS 7671 covers cable safe zones?",
    options: ["Regulation 522.6.201", "Regulation 522.6.202", "Regulation 522.6.203", "Regulation 522.7.202"],
    correctIndex: 1,
    explanation: "Regulation 522.6.202 covers cable safe zones in BS 7671."
  },
  {
    id: 2,
    question: "Within how many millimetres of a corner or ceiling can a cable be installed without extra protection?",
    options: ["100 mm", "150 mm", "200 mm", "250 mm"],
    correctIndex: 1,
    explanation: "Cables can be installed within 150 mm of corners, ceilings, or skirting boards without additional protection."
  },
  {
    id: 3,
    question: "Which cable type is most suitable for underground installations?",
    options: ["Twin & Earth (T&E)", "Flexible cables", "Steel Wire Armoured (SWA)", "LSZH cables"],
    correctIndex: 2,
    explanation: "Steel Wire Armoured (SWA) cables are most suitable for underground installations due to their mechanical protection."
  }
];

const Module5Section2_4 = () => {
  useSEO(TITLE, DESCRIPTION);
  const [showFaqs, setShowFaqs] = useState(false);

  const quizQuestions = [
    {
      id: 1,
      question: "What regulation in BS 7671 covers cable safe zones?",
      options: ["Regulation 522.6.201", "Regulation 522.6.202", "Regulation 522.6.203", "Regulation 522.7.202"],
      correctAnswer: 1,
      explanation: "Regulation 522.6.202 covers cable safe zones in BS 7671."
    },
    {
      id: 2,
      question: "Within how many millimetres of a corner or ceiling can a cable be installed without extra protection?",
      options: ["100 mm", "150 mm", "200 mm", "250 mm"],
      correctAnswer: 1,
      explanation: "Cables can be installed within 150 mm of corners, ceilings, or skirting boards."
    },
    {
      id: 3,
      question: "True or False: It is acceptable to run T&E cables diagonally across a wall if they are deep enough.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False - cables must follow safe zones or be mechanically protected."
    },
    {
      id: 4,
      question: "Which type of cable is most suitable for underground installations?",
      options: ["Twin & Earth (T&E)", "Flexible cables", "Steel Wire Armoured (SWA)", "LSZH cables"],
      correctAnswer: 2,
      explanation: "Steel Wire Armoured (SWA) cables are most suitable for underground installations."
    },
    {
      id: 5,
      question: "What is the main risk of grouping too many cables together?",
      options: ["Increased installation cost", "Overheating due to reduced current-carrying capacity", "Difficulty in identification", "Voltage drop issues"],
      correctAnswer: 1,
      explanation: "Grouping cables together reduces their current-carrying capacity, leading to overheating risk."
    },
    {
      id: 6,
      question: "What type of sheath is recommended where chemical exposure is likely?",
      options: ["Standard PVC", "Chemically resistant sheath", "Rubber sheath", "Paper insulation"],
      correctAnswer: 1,
      explanation: "Chemically resistant sheath materials should be used where chemical exposure is likely."
    },
    {
      id: 7,
      question: "What percentage maximum volt drop is allowed for lighting circuits under BS 7671?",
      options: ["2%", "3%", "5%", "7%"],
      correctAnswer: 1,
      explanation: "Maximum voltage drop for lighting circuits is 3% under BS 7671."
    },
    {
      id: 8,
      question: "Why are LSZH cables used in schools or hospitals?",
      options: ["They are cheaper", "They limit toxic smoke in the event of a fire", "They have higher current capacity", "They are easier to install"],
      correctAnswer: 1,
      explanation: "LSZH cables limit toxic smoke production in fire situations, important for public buildings."
    },
    {
      id: 9,
      question: "Name one environmental factor that can derate a cable's capacity.",
      options: ["Cable colour", "Installation height", "High ambient temperature", "Cable manufacturer"],
      correctAnswer: 2,
      explanation: "High ambient temperature is a key environmental factor that derates cable capacity."
    },
    {
      id: 10,
      question: "If a 32 A MCB is protecting a circuit, what must be true about the cable's rating (Iz)?",
      options: ["Iz must be exactly 32 A", "Iz must be at least 32 A", "Iz can be less than 32 A", "Iz is not related to MCB rating"],
      correctAnswer: 1,
      explanation: "The cable's current-carrying capacity (Iz) must be at least equal to or greater than the protective device rating."
    }
  ];

  const faqs = [
    {
      question: "What happens if I install cables outside safe zones?",
      answer: "Cables outside safe zones must be mechanically protected (e.g., steel conduit or earthed metallic covering) to prevent damage from drilling or nails. This is required by BS 7671 Regulation 522.6.202."
    },
    {
      question: "How do I calculate derating factors for grouped cables?",
      answer: "Consult BS 7671 Appendix 4 tables. Apply grouping factors based on the number of loaded circuits, installation method, and ambient temperature. Multiple factors may need to be applied cumulatively."
    },
    {
      question: "When should I use SWA cables instead of T&E?",
      answer: "Use SWA for outdoor installations, underground runs, areas with high mechanical stress, or where cables need armoured protection. SWA provides both mechanical protection and earthing continuity."
    },
    {
      question: "What's the difference between LSF and LSZH cables?",
      answer: "LSF (Low Smoke and Fume) cables produce less smoke when burning. LSZH (Low Smoke Zero Halogen) cables produce minimal smoke and no halogenated gases, making them safer for evacuation routes and enclosed spaces."
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
              <span className="text-white/60">Section 5.2.4</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Zoning, Environmental Considerations, and Cable Choice
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Learn about safe cable routing zones, environmental factors, and selecting appropriate cables for different applications in compliance with BS 7671.
            </p>
          </header>

          {/* Quick Reference */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="font-semibold text-elec-yellow mb-3">Quick Reference</p>
            <div className="grid sm:grid-cols-2 gap-4 text-white/80 text-sm">
              <div>
                <p className="font-medium text-white mb-1">In 30 Seconds:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Safe zones = within 150mm of corners/accessories</li>
                  <li>Environment affects cable choice (heat, moisture, UV)</li>
                  <li>SWA for outdoors, T&E for domestic, LSZH for public buildings</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Spot it / Use it:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Spot:</strong> Cables outside zones need protection</li>
                  <li><strong>Use:</strong> BS 7671 Reg 522.6.202 and Appendix 4</li>
                  <li><strong>Check:</strong> Derating factors for grouping/temperature</li>
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
              Cables must be chosen and installed with regard to safety zones, environmental conditions, and the type of load they will serve. Incorrect cable choice or poor zoning practices can cause overheating, fire risk, or damage to property. This subsection introduces how installation zones, environmental factors, and cable selection work together to ensure safety and compliance with BS 7671.
            </p>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Learning Outcomes
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Identify the correct safe zones for cable routing</li>
              <li>Recognise how environment affects cable performance</li>
              <li>Select appropriate cables for different applications</li>
              <li>Apply BS 7671 guidance to cable zoning and environmental considerations</li>
              <li>Ensure installations are both safe and fit for purpose</li>
            </ul>
          </section>

          {/* Safe Zones for Cable Installation */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Safe Zones for Cable Installation
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>BS 7671 defines specific safe zones where cables can be installed to minimise risk of accidental damage:</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-elec-yellow mb-3">BS 7671 Safe Zone Requirements (Regulation 522.6.202)</p>

                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-white mb-2">Permitted Safe Zones:</p>
                    <ul className="text-sm list-disc ml-4 space-y-1">
                      <li><strong>Horizontally or vertically:</strong> From any point on an accessory to the boundary of the zone</li>
                      <li><strong>Within 150mm:</strong> Of the top of the wall (junction with ceiling)</li>
                      <li><strong>Within 150mm:</strong> Of the angle formed by two walls</li>
                      <li><strong>Accessory zones:</strong> Horizontally or vertically from switches, sockets, or other accessories</li>
                    </ul>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-white mb-2">Horizontal Zones:</p>
                      <ul className="space-y-1">
                        <li>• From accessories: Horizontal run to zone boundary</li>
                        <li>• Top zone: 150mm from ceiling/wall junction</li>
                        <li>• Above doors/windows: Within lintel zone</li>
                        <li>• Skirting level: 150mm from floor/wall junction</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-2">Vertical Zones:</p>
                      <ul className="space-y-1">
                        <li>• From accessories: Vertical run to zone boundary</li>
                        <li>• Corner zones: 150mm from wall/wall junction</li>
                        <li>• Party walls: Consider zones on both sides</li>
                        <li>• Structural walls: Account for beam positions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                <p className="font-medium text-orange-400 mb-2">Outside Safe Zones - Protection Requirements:</p>
                <ul className="text-sm ml-4 list-disc space-y-1">
                  <li><strong>Steel conduit:</strong> Earthed metallic conduit providing mechanical protection</li>
                  <li><strong>Steel trunking:</strong> Earthed metallic trunking systems</li>
                  <li><strong>Armoured cables:</strong> SWA or similar mechanically protected cables</li>
                  <li><strong>30mA RCD protection:</strong> Additional protection for concealed cables (Reg 522.6.203)</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <p className="font-medium text-red-400 mb-2">Critical Safety Points:</p>
                <ul className="text-sm ml-4 list-disc space-y-1">
                  <li><strong>Never assume:</strong> Always check zone compliance before installation</li>
                  <li><strong>Document routes:</strong> Provide clear cable route drawings for future reference</li>
                  <li><strong>Mark positions:</strong> Use cable route markers where practical</li>
                  <li><strong>Consider future work:</strong> Think about likely drilling positions</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="safe-zones-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* Environmental Factors */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Environmental Factors
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Environmental conditions significantly affect cable performance and longevity:</p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-elec-yellow mb-2">Temperature Effects</p>
                  <ul className="text-sm list-disc ml-4 space-y-1">
                    <li>High ambient temperature reduces cable capacity</li>
                    <li>Heat sources: boilers, heating pipes, direct sunlight</li>
                    <li>Derating required: Use BS 7671 Appendix 4</li>
                    <li>Thermal cycling causes insulation stress</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-elec-yellow mb-2">Moisture and Humidity</p>
                  <ul className="text-sm list-disc ml-4 space-y-1">
                    <li>Insulation degradation from moisture penetration</li>
                    <li>Corrosion risk to metal components</li>
                    <li>Special locations: bathrooms require IPX4 minimum</li>
                    <li>Outdoor: weather-resistant materials essential</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-elec-yellow mb-2">UV Exposure and Sunlight</p>
                  <ul className="text-sm list-disc ml-4 space-y-1">
                    <li>Standard PVC breaks down in sunlight</li>
                    <li>Black sheath: UV-resistant formulations available</li>
                    <li>Protect exposed cables from direct sunlight</li>
                    <li>Roof spaces: consider solar heating effects</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-elec-yellow mb-2">Chemical and Mechanical Hazards</p>
                  <ul className="text-sm list-disc ml-4 space-y-1">
                    <li>Chemical exposure: acids, alkalis, oils, solvents</li>
                    <li>Mechanical damage: impact, abrasion, crushing</li>
                    <li>Vibration effects: machinery causing cable fatigue</li>
                    <li>Rodent damage: animal attack on cable sheathing</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Environmental Classification System:</p>
                <div className="grid sm:grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="font-medium text-elec-yellow mb-1">Internal Environments</p>
                    <ul className="list-disc ml-4 space-y-1">
                      <li>Dry locations: normal domestic/office</li>
                      <li>Damp locations: kitchens, utility rooms</li>
                      <li>Wet locations: bathrooms, shower rooms</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-elec-yellow mb-1">External Environments</p>
                    <ul className="list-disc ml-4 space-y-1">
                      <li>Weather exposure: rain, snow, temperature</li>
                      <li>Underground: soil, drainage, chemicals</li>
                      <li>Overhead: wind loading, UV, birds</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-elec-yellow mb-1">Special Locations</p>
                    <ul className="list-disc ml-4 space-y-1">
                      <li>Hazardous areas: explosive atmospheres</li>
                      <li>Medical locations: hospital equipment</li>
                      <li>Agricultural: livestock, feed, cleaning</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="environmental-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* Cable Types and Applications */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Cable Types and Applications
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Different cable types are designed for specific applications and environmental conditions:</p>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-elec-yellow mb-2">Twin & Earth (T&E) - 6242Y/6243Y</p>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <ul className="list-disc ml-4 space-y-1">
                      <li><strong>Construction:</strong> 2 insulated conductors + bare CPC in PVC sheath</li>
                      <li><strong>Applications:</strong> Standard domestic fixed wiring</li>
                      <li><strong>Voltage rating:</strong> 300/500V</li>
                    </ul>
                    <ul className="list-disc ml-4 space-y-1">
                      <li><strong>Installation:</strong> Internal use only, must be protected</li>
                      <li><strong>Advantages:</strong> Cost-effective, easy to install</li>
                      <li><strong>Limitations:</strong> Not for damp or outdoor locations</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-elec-yellow mb-2">Steel Wire Armoured (SWA)</p>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <ul className="list-disc ml-4 space-y-1">
                      <li><strong>Construction:</strong> Insulated conductors + steel wire armouring + outer sheath</li>
                      <li><strong>Applications:</strong> Outdoor, underground, high mechanical stress</li>
                      <li><strong>Armouring benefits:</strong> Mechanical protection + earthing</li>
                    </ul>
                    <ul className="list-disc ml-4 space-y-1">
                      <li><strong>Voltage ratings:</strong> Available up to 11kV and beyond</li>
                      <li><strong>Installation:</strong> Direct burial, overhead, industrial</li>
                      <li><strong>Termination:</strong> Requires special glands and techniques</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-elec-yellow mb-2">Flexible Cables (H05VV-F, H07RN-F)</p>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <ul className="list-disc ml-4 space-y-1">
                      <li><strong>Construction:</strong> Stranded conductors for flexibility</li>
                      <li><strong>Applications:</strong> Appliances, temporary connections</li>
                      <li><strong>Types:</strong> Light duty (H05), heavy duty (H07)</li>
                    </ul>
                    <ul className="list-disc ml-4 space-y-1">
                      <li><strong>Benefits:</strong> Flexibility, various sheaths available</li>
                      <li><strong>Installation:</strong> Not suitable for permanent fixed wiring</li>
                      <li><strong>Standards:</strong> BS EN 50525 series</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-elec-yellow mb-2">LSF/LSZH Cables</p>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <ul className="list-disc ml-4 space-y-1">
                      <li><strong>LSF:</strong> Low Smoke and Fume - reduced smoke</li>
                      <li><strong>LSZH:</strong> Low Smoke Zero Halogen - no toxic gases</li>
                      <li><strong>Applications:</strong> Schools, hospitals, public buildings</li>
                    </ul>
                    <ul className="list-disc ml-4 space-y-1">
                      <li><strong>Fire performance:</strong> Better evacuation conditions</li>
                      <li><strong>Cost:</strong> Higher than standard PVC</li>
                      <li><strong>Standards:</strong> BS 7211, BS EN 50267</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="cable-types-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* Derating Factors */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Derating Factors
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Multiple factors can reduce a cable's current-carrying capacity and must be considered in design:</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-white mb-2">Primary Derating Factors:</p>
                    <ul className="space-y-1">
                      <li><strong>Grouping factor (Cg):</strong> Multiple cables together reduce heat dissipation</li>
                      <li><strong>Ambient temperature (Ca):</strong> Higher temperatures reduce capacity</li>
                      <li><strong>Thermal insulation (Ci):</strong> Surrounded by insulation materials</li>
                      <li><strong>Installation method:</strong> Different methods have different cooling</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-2">Calculation Process:</p>
                    <ul className="space-y-1">
                      <li><strong>Step 1:</strong> Determine base current-carrying capacity (Iz)</li>
                      <li><strong>Step 2:</strong> Apply all relevant correction factors</li>
                      <li><strong>Step 3:</strong> Derated capacity = Iz × Cg × Ca × Ci</li>
                      <li><strong>Step 4:</strong> Ensure derated capacity ≥ design current</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Coordination with Protective Devices */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Coordination with Protective Devices
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Cable selection must coordinate with protective devices and voltage drop requirements:</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <ul className="text-sm space-y-2">
                  <li><strong>Current coordination:</strong> Cable current-carrying capacity (Iz) must be ≥ protective device rating (In)</li>
                  <li><strong>Voltage drop limits:</strong> Maximum 3% for lighting, 5% for other uses per BS 7671</li>
                  <li><strong>Fault protection:</strong> Cable must withstand fault current until protective device operates</li>
                  <li><strong>Earth fault loop impedance:</strong> Must be low enough for protective device operation</li>
                  <li><strong>Selectivity:</strong> Consider discrimination between protective devices</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <Cable className="w-5 h-5 text-elec-yellow" />
              Practical Guidance
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <p className="font-semibold text-blue-400 mb-2 text-sm">Safe Zone Compliance</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>✅ Always route cables in safe zones unless mechanically protected</li>
                  <li>✅ Document cable routes for future maintenance</li>
                  <li>✅ Use cable detectors before drilling</li>
                  <li>✅ Mark cable positions where practical</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="font-semibold text-green-400 mb-2 text-sm">Environmental Selection</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>✅ Select cable sheath based on environmental exposure</li>
                  <li>✅ Consider all factors: heat, moisture, UV, chemicals</li>
                  <li>✅ Check IP ratings for adequate protection</li>
                  <li>✅ Plan for maintenance access</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                <p className="font-semibold text-purple-400 mb-2 text-sm">Derating and Calculations</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>✅ Check derating factors when grouping cables</li>
                  <li>✅ Use BS 7671 Appendix 4 for correction factors</li>
                  <li>✅ Consider ambient temperature (standard 30°C)</li>
                  <li>✅ Apply factors cumulatively</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                <p className="font-semibold text-orange-400 mb-2 text-sm">Special Applications</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>✅ Use LSZH cables where fire safety is critical</li>
                  <li>✅ Verify compliance using BS 7671 tables</li>
                  <li>✅ Consider future load increases</li>
                  <li>✅ Check local requirements</li>
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
              <p className="font-semibold text-orange-400 mb-2">The New-Build Site Cable Strike</p>
              <p className="text-white/80 text-sm mb-3">
                <strong>The Scenario:</strong> On a new-build site, an electrician ran T&E cables across a bathroom wall outside of safe zones. Later, when tiling, a worker drilled into the wall and hit a live cable. The installation should have either followed safe zones or used mechanical protection.
              </p>

              <div className="space-y-3">
                <div className="p-3 rounded bg-black/20">
                  <p className="font-medium text-white mb-2 text-sm">The Problem:</p>
                  <ul className="text-xs list-disc ml-4 space-y-1 text-white/70">
                    <li><strong>Poor route planning:</strong> Cables run diagonally to save cable length</li>
                    <li><strong>No zone compliance:</strong> Route was outside both horizontal and vertical safe zones</li>
                    <li><strong>No protection:</strong> Standard T&E cable used without mechanical protection</li>
                    <li><strong>Poor communication:</strong> Follow-on trades not informed of cable routes</li>
                  </ul>
                </div>

                <div className="p-3 rounded bg-red-500/10 border border-red-500/30">
                  <p className="font-medium text-red-400 mb-2 text-sm">The Consequences:</p>
                  <ul className="text-xs list-disc ml-4 space-y-1 text-white/70">
                    <li>Cable strike incident - live cable hit by drill</li>
                    <li>RCD tripped, affecting other circuits</li>
                    <li>Risk of electric shock to tile fixer</li>
                    <li>Damage costs: cable repair, wall repair, tile replacement</li>
                    <li>HSE investigation due to safety incident</li>
                  </ul>
                </div>

                <div className="p-3 rounded bg-green-500/10 border border-green-500/30">
                  <p className="font-medium text-green-400 mb-2 text-sm">The Correct Approach:</p>
                  <ul className="text-xs list-disc ml-4 space-y-1 text-white/70">
                    <li>Route horizontally from switch and vertically to ceiling</li>
                    <li>Use steel conduit if routing outside zones necessary</li>
                    <li>Mark cable routes on drawings for other trades</li>
                    <li>Brief all trades on electrical installation locations</li>
                  </ul>
                </div>
              </div>

              <div className="p-3 rounded bg-elec-yellow/10 border border-elec-yellow/30 mt-3">
                <p className="text-xs text-white/80">
                  <strong>Key lesson:</strong> Always follow BS 7671 safe zones or provide adequate mechanical protection. Proper coordination between trades prevents dangerous and costly incidents.
                </p>
              </div>
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <Cable className="w-5 h-5 text-elec-yellow" />
              Pocket Guide – Zoning & Cable Choice
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <p className="font-semibold text-blue-400 mb-2 text-sm">Safe Zone Rules</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>✅ Cables in safe zones only (150mm rule)</li>
                  <li>✅ Horizontal/vertical from accessories</li>
                  <li>✅ Mechanical protection outside zones</li>
                  <li>✅ BS 7671 Regulation 522.6.202</li>
                  <li>✅ Document cable routes for others</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                <p className="font-semibold text-purple-400 mb-2 text-sm">Cable Selection</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>🏠 T&E for domestic fixed wiring</li>
                  <li>🌧️ Use SWA outdoors or underground</li>
                  <li>🔥 LSZH cables in public buildings</li>
                  <li>⚡ Flexible cables for appliances only</li>
                  <li>🌡️ Consider environmental factors</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="font-semibold text-green-400 mb-2 text-sm">Environmental Factors</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>🌡️ Heat derates cable capacity</li>
                  <li>💧 Moisture requires special cable types</li>
                  <li>☀️ UV exposure needs resistant materials</li>
                  <li>⚗️ Chemical exposure needs protection</li>
                  <li>🔧 Mechanical damage risk assessment</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                <p className="font-semibold text-orange-400 mb-2 text-sm">Derating & Protection</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>📊 Apply derating factors for grouping/insulation</li>
                  <li>⚡ Match cable rating ≥ protective device rating</li>
                  <li>📉 Max voltage drop: 3% lighting, 5% other</li>
                  <li>📋 Use BS 7671 Appendix 4 tables</li>
                  <li>🔍 Consider all correction factors</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-white/10 mt-4">
              <p className="text-sm text-white/80 text-center">
                <strong>Remember:</strong> Safe cable installation requires proper zoning, environmental consideration, and appropriate cable selection.
                Always follow BS 7671 guidance and document routes for future reference.
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
              In this subsection, you learned about cable zoning requirements, environmental influences, and cable selection principles. You explored how heat, moisture, and mechanical damage can impact cable choice, how BS 7671 defines safe zones, and how derating factors affect current-carrying capacity. You also learned practical steps for ensuring safety and compliance in real-world installations.
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
              <Link to="../2-3">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../2-5">
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

export default Module5Section2_4;
