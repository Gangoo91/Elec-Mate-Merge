import { ArrowLeft, ArrowRight, Settings, AlertTriangle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";
import { useState } from "react";

const TITLE = "Designing for Expansion, Maintenance, and Accessibility - Module 5.2.5 | Level 2 Electrical Course";
const DESCRIPTION = "Learn to design electrical installations for future expansion, easy maintenance, and accessibility compliance with BS 7671 and Building Regulations Part M.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What percentage spare capacity should be left in distribution boards?",
    options: ["10-15%", "20-25%", "30-35%", "40-45%"],
    correctIndex: 1,
    explanation: "Leave at least 20-25% spare capacity in distribution boards for future expansion."
  },
  {
    id: 2,
    question: "At what height should sockets be installed to comply with Part M?",
    options: ["300-900 mm", "450-1200 mm", "600-1400 mm", "150-450 mm"],
    correctIndex: 1,
    explanation: "Part M requires sockets between 450-1200 mm above finished floor level for accessibility."
  },
  {
    id: 3,
    question: "What does BS 7671 Reg. 132.9 require?",
    options: ["Minimum costs", "Safe operation, maintenance, and repair", "Maximum efficiency", "Fastest installation"],
    correctIndex: 1,
    explanation: "Regulation 132.9 requires designs to allow for safe operation, maintenance, and repair."
  }
];

const Module5Section2_5 = () => {
  useSEO(TITLE, DESCRIPTION);
  const [showFaqs, setShowFaqs] = useState(false);

  const quizQuestions = [
    {
      id: 1,
      question: "Why should spare capacity be left in distribution boards?",
      options: [
        "To reduce installation costs",
        "To allow for future expansion and additional circuits",
        "To improve electrical efficiency",
        "To comply with colour coding requirements"
      ],
      correctAnswer: 1,
      explanation: "Spare capacity allows for future expansion without costly board replacements."
    },
    {
      id: 2,
      question: "True or False: Cable containment should always be filled to maximum capacity for efficiency.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 1,
      explanation: "False – leave 30–40% space for future use and heat dissipation."
    },
    {
      id: 3,
      question: "At what height should sockets be installed to comply with Part M?",
      options: [
        "300-900 mm above finished floor level",
        "450-1200 mm above finished floor level",
        "600-1400 mm above finished floor level",
        "150-450 mm above finished floor level"
      ],
      correctAnswer: 1,
      explanation: "Part M requires sockets between 450-1200 mm for accessibility."
    },
    {
      id: 4,
      question: "What does BS 7671 Reg. 132.9 require designs to allow for?",
      options: [
        "Maximum energy efficiency",
        "Minimum installation cost",
        "Safe operation, maintenance, and repair",
        "Fastest installation time"
      ],
      correctAnswer: 2,
      explanation: "Regulation 132.9 ensures designs facilitate safe servicing and maintenance."
    },
    {
      id: 5,
      question: "Why should isolator switches be installed near major appliances?",
      options: [
        "To improve aesthetics",
        "To reduce cable costs",
        "To allow safe isolation for maintenance and emergencies",
        "To comply with colour requirements"
      ],
      correctAnswer: 2,
      explanation: "Isolators enable safe maintenance and emergency disconnection."
    },
    {
      id: 6,
      question: "Give one example of future loads that should be considered in design.",
      options: [
        "Traditional lighting only",
        "EV chargers, solar PV, or heat pumps",
        "Basic socket outlets only",
        "Conventional heating systems"
      ],
      correctAnswer: 1,
      explanation: "Modern installations must consider EV charging, renewables, and heat pumps."
    },
    {
      id: 7,
      question: "True or False: Accessibility requirements apply only in domestic dwellings.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 1,
      explanation: "False – accessibility requirements apply across multiple building types."
    },
    {
      id: 8,
      question: "What does BS 7671 Reg. 314.1 require about circuit arrangement?",
      options: [
        "To maximise installation speed",
        "To minimise cable costs",
        "To minimise inconvenience during maintenance",
        "To use the shortest cable routes"
      ],
      correctAnswer: 2,
      explanation: "Circuits must be arranged to reduce disruption during maintenance work."
    },
    {
      id: 9,
      question: "What is a risk of not leaving spare ways in a distribution board?",
      options: [
        "Reduced electrical efficiency",
        "Costly upgrades or full DB replacement later",
        "Increased cable costs",
        "Poor circuit protection"
      ],
      correctAnswer: 1,
      explanation: "Lack of spare capacity leads to expensive upgrades when expansion is needed."
    },
    {
      id: 10,
      question: "Why must circuit labelling be clear and accurate?",
      options: [
        "To comply with colour coding",
        "To reduce installation time",
        "To aid safe maintenance and prevent confusion",
        "To improve aesthetics"
      ],
      correctAnswer: 2,
      explanation: "Clear labelling prevents dangerous confusion during maintenance work."
    }
  ];

  const faqs = [
    {
      question: "How much spare capacity should I leave in a domestic distribution board?",
      answer: "Minimum 2-3 spare ways, optimally 25% of total ways. For a 12-way board, include at least 3 spare ways. Consider specific future loads: EV charger (32A), heat pump (40A+), solar PV (16-32A), plus general spares."
    },
    {
      question: "Can I install sockets at any height for accessibility?",
      answer: "No. Part M requires sockets between 450-1200mm above finished floor level. The optimum height for wheelchair access is 600-1000mm. Kitchen sockets should be 15-45mm above worktop level, maintaining safe zones."
    },
    {
      question: "What working space is required around distribution boards?",
      answer: "BS 7671 Reg 132.12 requires minimum 1000mm clear space in front of distribution boards. Side access of 500mm where required. Adequate lighting (200 lux minimum) and 2000mm headroom are also essential."
    },
    {
      question: "What labelling standards should I follow for future maintenance?",
      answer: "Use permanent, weather-resistant labels with clear, legible text. Follow BS 7671 Section 514 requirements. Include circuit function, rating, and any special requirements. Update labels when modifications are made."
    }
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
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
              <span className="text-white/60">Section 5.2.5</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Designing for Expansion, Maintenance, and Accessibility
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Learn to design electrical installations for future expansion, easy maintenance, and accessibility compliance with BS 7671 and Building Regulations Part M.
            </p>
          </header>

          {/* Quick Reference */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="font-semibold text-elec-yellow mb-3">Quick Reference</p>
            <div className="grid sm:grid-cols-2 gap-4 text-white/80 text-sm">
              <div>
                <p className="font-medium text-white mb-1">In 30 Seconds:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Leave 20-25% spare capacity in distribution boards</li>
                  <li>Socket heights: 450-1200 mm (Part M compliance)</li>
                  <li>Switch heights: 900-1200 mm for accessibility</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Spot it / Use it:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Spot:</strong> 30-40% spare space in containment</li>
                  <li><strong>Use:</strong> BS 7671 Reg 132.9 and 314.1</li>
                  <li><strong>Check:</strong> Future loads (EV, solar, heat pumps)</li>
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
              Electrical installations should not only meet today's requirements but also allow for future expansion, easy maintenance, and user accessibility. A design that overlooks these factors may quickly become outdated, difficult to service, or even unsafe. This subsection explains how to integrate flexibility and practicality into electrical designs while complying with BS 7671 and Building Regulations.
            </p>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Learning Outcomes
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Recognise why planning for expansion is important</li>
              <li>Understand accessibility requirements under Building Regulations</li>
              <li>Design circuits and layouts that allow for safe maintenance</li>
              <li>Identify best practices for futureproofing installations</li>
              <li>Apply BS 7671 principles to accessible and adaptable design</li>
            </ul>
          </section>

          {/* Designing for Expansion */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Designing for Expansion
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Future-proofing electrical installations is essential for accommodating technological changes, increased electrical demand, and evolving user needs. Poor expansion planning leads to costly retrofits and potentially dangerous modifications.</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-elec-yellow mb-3">Distribution Board Expansion Planning</p>

                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-white mb-2">Domestic Installations:</p>
                    <ul className="space-y-1">
                      <li><strong>Minimum spare ways:</strong> 2-3 ways</li>
                      <li><strong>Optimal spare capacity:</strong> 25% of total ways</li>
                      <li><strong>Example:</strong> 12-way board = 3 spare ways minimum</li>
                      <li><strong>Consider:</strong> EV charger (32A), heat pump (40A+)</li>
                      <li><strong>Solar PV:</strong> Generation and battery storage circuits</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-2">Commercial/Industrial:</p>
                    <ul className="space-y-1">
                      <li><strong>Minimum spare ways:</strong> 20% of installed circuits</li>
                      <li><strong>High-growth areas:</strong> 30-40% spare capacity</li>
                      <li><strong>Future technologies:</strong> Smart systems, IoT devices</li>
                      <li><strong>Load growth:</strong> Business expansion plans</li>
                      <li><strong>Maintenance:</strong> Temporary supply requirements</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Main Supply Sizing Considerations</p>
                <ul className="text-sm list-disc ml-4 space-y-1">
                  <li><strong>Current capacity:</strong> Size main switch for expected maximum demand + 20%</li>
                  <li><strong>Supply cable:</strong> Consider voltage drop with increased load</li>
                  <li><strong>DNO coordination:</strong> Check available supply capacity early in design</li>
                  <li><strong>Three-phase conversion:</strong> Plan space for upgrade if single-phase insufficient</li>
                  <li><strong>Metering provision:</strong> Smart meters and sub-metering requirements</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="font-medium text-green-400 mb-3">Emerging Load Types</p>
                <div className="grid sm:grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="font-medium text-white mb-1">Electric Vehicle Charging</p>
                    <ul className="space-y-1">
                      <li>• 7kW single-phase (32A)</li>
                      <li>• 22kW three-phase (32A per phase)</li>
                      <li>• Smart charging integration</li>
                      <li>• Load balancing requirements</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Heat Pumps & HVAC</p>
                    <ul className="space-y-1">
                      <li>• Air source heat pumps (15-20A)</li>
                      <li>• Ground source systems (higher loads)</li>
                      <li>• Backup heating elements</li>
                      <li>• Smart thermostats and controls</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Renewable Energy</p>
                    <ul className="space-y-1">
                      <li>• Solar PV inverters (16-32A)</li>
                      <li>• Battery storage systems</li>
                      <li>• Generation meters</li>
                      <li>• Export limitation devices</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Cable Containment Planning</p>
                <ul className="text-sm list-disc ml-4 space-y-1">
                  <li><strong>Trunking fill factors:</strong> Maximum 45% fill ratio for singles, 35% for multicore</li>
                  <li><strong>Accessible routes:</strong> Plan routes that remain accessible for additional cables</li>
                  <li><strong>Segregation requirements:</strong> Allow space for data/telecom cables (300mm separation from power)</li>
                  <li><strong>Fire compartmentation:</strong> Maintain integrity when adding new cables</li>
                  <li><strong>Flexible systems:</strong> Use modular containment systems where possible</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <p className="font-medium text-blue-400 mb-2">Real-World Planning Example</p>
                <p className="text-sm">
                  <strong>Scenario:</strong> New build house with gas boiler. Design should include: 32A way for future EV charger,
                  40A way for heat pump conversion, 16A way for solar PV, plus 2 general spare ways. This ensures the
                  installation can adapt to the UK's net-zero transition without major rewiring.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="expansion-planning-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* Maintenance Considerations */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Maintenance Considerations
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Safe and accessible maintenance is crucial for both safety and regulatory compliance. BS 7671 requires that installations can be safely maintained, inspected, and tested throughout their operational life.</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Working Space Requirements (BS 7671 Reg 132.12)</p>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-elec-yellow mb-2">Distribution Boards & Panels:</p>
                    <ul className="space-y-1">
                      <li><strong>Front access:</strong> Minimum 1000mm clear space</li>
                      <li><strong>Side access:</strong> 500mm where required</li>
                      <li><strong>Height:</strong> Accessible from ground level or platform</li>
                      <li><strong>Lighting:</strong> Minimum 200 lux at working plane</li>
                      <li><strong>Headroom:</strong> 2000mm minimum above floor</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-elec-yellow mb-2">Switchgear & Control Gear:</p>
                    <ul className="space-y-1">
                      <li><strong>Access doors:</strong> Must open fully (min 90°)</li>
                      <li><strong>Maintenance platforms:</strong> For high-level equipment</li>
                      <li><strong>Safety zones:</strong> No live parts within 2.5m height</li>
                      <li><strong>Emergency access:</strong> Alternative routes considered</li>
                      <li><strong>Ventilation:</strong> Adequate for personnel safety</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Circuit Isolation and Labelling</p>
                <ul className="text-sm list-disc ml-4 space-y-1">
                  <li><strong>Local isolation:</strong> Within 3m of every item of fixed equipment</li>
                  <li><strong>Lockable isolators:</strong> For critical or dangerous equipment</li>
                  <li><strong>Emergency stops:</strong> Easily accessible in hazardous areas</li>
                  <li><strong>Clear labelling:</strong> Permanent, weather-resistant labels</li>
                  <li><strong>Circuit directories:</strong> Updated with modifications</li>
                  <li><strong>Safety signs:</strong> Warning notices at appropriate locations</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="font-medium text-green-400 mb-3">Maintenance Scheduling Considerations</p>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-white mb-1">Planned Maintenance Access</p>
                    <ul className="space-y-1">
                      <li>• Segregated circuits for partial shutdown</li>
                      <li>• Backup supplies for critical loads</li>
                      <li>• Scheduled outage coordination</li>
                      <li>• Temporary supply provisions</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Emergency Maintenance</p>
                    <ul className="space-y-1">
                      <li>• 24/7 accessible isolators</li>
                      <li>• Emergency contact information</li>
                      <li>• Bypass arrangements where critical</li>
                      <li>• Spares storage and access</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="font-medium text-green-400 mb-2">Maintenance Design Example</p>
                <p className="text-sm">
                  <strong>Commercial Building:</strong> Design distribution board layout with individual floor isolators,
                  allowing maintenance on one floor while others remain operational. Include local isolators for
                  major plant (lifts, HVAC, IT systems) to enable targeted maintenance without affecting other services.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="accessibility-heights-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* Accessibility for Users */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Accessibility for Users
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Building Regulations Part M sets specific requirements for accessibility in new buildings and major renovations. These requirements ensure electrical installations are usable by people with varying physical capabilities.</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-elec-yellow mb-3">Height Requirements (Approved Document M)</p>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-white mb-2">Socket Outlets:</p>
                    <ul className="space-y-1">
                      <li><strong>Standard height:</strong> 450-1200mm above FFL</li>
                      <li><strong>Optimum height:</strong> 600-1000mm for wheelchairs</li>
                      <li><strong>Kitchen worktops:</strong> 15-45mm above worktop</li>
                      <li><strong>Bathrooms:</strong> Avoid zones 1 & 2, maintain heights</li>
                      <li><strong>Outdoor sockets:</strong> 1000-1200mm preferred</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-2">Switches & Controls:</p>
                    <ul className="space-y-1">
                      <li><strong>Light switches:</strong> 900-1200mm above FFL</li>
                      <li><strong>Door entry:</strong> 900-1000mm preferred</li>
                      <li><strong>Emergency controls:</strong> 900-1100mm maximum</li>
                      <li><strong>Thermostats:</strong> 900-1200mm range</li>
                      <li><strong>Consumer units:</strong> Eye level for wheelchair users</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Positioning and Reach Considerations</p>
                <ul className="text-sm list-disc ml-4 space-y-1">
                  <li><strong>Forward reach:</strong> Maximum 500mm depth from wheelchair</li>
                  <li><strong>Side reach:</strong> Avoid high-level positioning above 1200mm</li>
                  <li><strong>Clear floor space:</strong> 800mm × 1200mm in front of controls</li>
                  <li><strong>Door proximity:</strong> Minimum 300mm from door frames</li>
                  <li><strong>Contrast requirements:</strong> Visible difference from background</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                <p className="font-medium text-purple-400 mb-3">Special Considerations by Building Type</p>
                <div className="grid sm:grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="font-medium text-white mb-1">Residential (Category 1-3)</p>
                    <ul className="space-y-1">
                      <li>• Cat 1: Basic accessibility</li>
                      <li>• Cat 2: Enhanced accessibility</li>
                      <li>• Cat 3: Wheelchair accessible</li>
                      <li>• Varying socket/switch requirements</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Commercial Buildings</p>
                    <ul className="space-y-1">
                      <li>• DDA compliance mandatory</li>
                      <li>• Accessible route requirements</li>
                      <li>• Emergency alarm systems</li>
                      <li>• Lift controls accessibility</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Public Buildings</p>
                    <ul className="space-y-1">
                      <li>• Hearing loops integration</li>
                      <li>• Visual alarm indicators</li>
                      <li>• Accessible emergency systems</li>
                      <li>• Assistance call systems</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                <p className="font-medium text-purple-400 mb-2">Accessibility Design Example</p>
                <p className="text-sm">
                  <strong>Wheelchair Accessible Kitchen:</strong> Socket outlets at 150mm above worktop (avoiding
                  splash zones), switches at 900-1000mm height, consumer unit relocated to accessible height
                  with clear approach space. All controls within easy reach from seated position.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="bs7671-requirements-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* BS 7671 Considerations */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              BS 7671 Considerations
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>BS 7671 contains specific regulations that directly impact design for expansion, maintenance, and accessibility. Understanding these requirements ensures legal compliance and safe operation.</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Regulation 132.9 - Maintenance Access</p>
                <ul className="text-sm space-y-2">
                  <li><strong>132.9.1:</strong> "An electrical installation shall be designed to facilitate safe operation, maintenance and repair."</li>
                  <li><strong>Practical application:</strong> All electrical equipment must be positioned for safe access</li>
                  <li><strong>Working space:</strong> Adequate space for maintenance operations</li>
                  <li><strong>Inspection access:</strong> All connections and terminations accessible</li>
                  <li><strong>Test access:</strong> Provision for periodic testing requirements</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Regulation 314.1 - Circuit Arrangement</p>
                <ul className="text-sm list-disc ml-4 space-y-1">
                  <li><strong>314.1.1:</strong> Every installation divided into circuits to avoid danger</li>
                  <li><strong>314.1.2:</strong> Circuits arranged to minimise inconvenience in fault conditions</li>
                  <li><strong>314.1.3:</strong> Separate circuits for different types of supply</li>
                  <li><strong>Maintenance implications:</strong> Allow partial shutdown for work</li>
                  <li><strong>Emergency arrangements:</strong> Critical circuits identified and protected</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                <p className="font-medium text-amber-400 mb-3">Additional Relevant Regulations</p>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-white mb-1">Expansion Considerations</p>
                    <ul className="space-y-1">
                      <li>• <strong>311.1:</strong> Assessment of general characteristics</li>
                      <li>• <strong>313.1:</strong> Supplies for safety services</li>
                      <li>• <strong>433.1:</strong> Protection against overload</li>
                      <li>• <strong>525.1:</strong> Voltage drop limitations</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Safety & Maintenance</p>
                    <ul className="space-y-1">
                      <li>• <strong>514.1:</strong> Identification and notices</li>
                      <li>• <strong>537.1:</strong> Isolation and switching</li>
                      <li>• <strong>610.1:</strong> Initial verification</li>
                      <li>• <strong>621.1:</strong> Periodic inspection and testing</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <p className="font-medium text-red-400 mb-2">Regulatory Priority Hierarchy</p>
                <p className="text-sm">
                  1. <strong>Safety first:</strong> BS 7671 safety requirements cannot be compromised<br/>
                  2. <strong>Accessibility second:</strong> Part M requirements where they do not conflict with safety<br/>
                  3. <strong>Convenience third:</strong> User convenience within safety and accessibility constraints<br/>
                  Always consult current regulations as they are regularly updated.
                </p>
              </div>
            </div>
          </section>

          {/* Risks of Ignoring These Principles */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              Risks of Ignoring These Principles
            </h2>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-red-500/10 rounded border border-red-500/30">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <span className="text-sm text-white/80">Costly upgrades in the future</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-red-500/10 rounded border border-red-500/30">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <span className="text-sm text-white/80">Unsafe working conditions for maintenance engineers</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-red-500/10 rounded border border-red-500/30">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <span className="text-sm text-white/80">Non-compliance with Building Regulations</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-red-500/10 rounded border border-red-500/30">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <span className="text-sm text-white/80">User dissatisfaction and accessibility issues</span>
              </div>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <Settings className="w-5 h-5 text-elec-yellow" />
              Practical Guidance
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <p className="font-semibold text-blue-400 mb-2 text-sm">Expansion Planning Checklist</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>• Leave at least 20–25% spare capacity in distribution boards</li>
                  <li>• Plan for EV charging (32A), heat pumps (40A+), solar PV (16-32A)</li>
                  <li>• Size main supply cable for 120% expected maximum demand</li>
                  <li>• Coordinate with DNO for future supply upgrades</li>
                  <li>• Document all future provisions on installation drawings</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="font-semibold text-green-400 mb-2 text-sm">Maintenance & Accessibility</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>• Avoid fully filling trunking — allow 30–40% spare space</li>
                  <li>• Install local isolators within 3m of fixed equipment</li>
                  <li>• Follow Part M socket heights: 450-1200mm above FFL</li>
                  <li>• Switch heights: 900-1200mm for accessibility compliance</li>
                  <li>• Label all circuits clearly with permanent, legible labels</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Real-World Examples */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Real-World Examples
            </h2>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-orange-500/10 border-l-2 border-orange-400">
                <p className="font-medium text-orange-400 mb-2">Example 1: Commercial Office Retrofit</p>
                <p className="text-sm text-white/70 italic">
                  A commercial office was designed with no spare ways in the distribution board. Two years later, the client
                  requested EV charging points, but there was no capacity. The entire board had to be replaced at great cost,
                  causing significant business disruption. A little foresight in design would have saved thousands of pounds.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-orange-500/10 border-l-2 border-orange-400">
                <p className="font-medium text-orange-400 mb-2">Example 2: Accessible Housing Design</p>
                <p className="text-sm text-white/70 italic">
                  A new housing development initially had standard socket heights (150mm above skirting). Following Part M
                  requirements, sockets were repositioned to 600mm height. This simple change eliminated the need for costly
                  adaptations and made the homes suitable for wheelchair users from day one.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-orange-500/10 border-l-2 border-orange-400">
                <p className="font-medium text-orange-400 mb-2">Example 3: Industrial Maintenance Access</p>
                <p className="text-sm text-white/70 italic">
                  A factory installation placed the main distribution board 3 meters high with no platform access. During an
                  emergency shutdown, maintenance staff could not safely reach the isolators. The installation was non-compliant
                  with BS 7671 Reg 132.9 and required expensive remedial work including platform installation.
                </p>
              </div>
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <Settings className="w-5 h-5 text-elec-yellow" />
              Pocket Guide – Expansion, Maintenance & Accessibility
            </h2>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <p className="font-semibold text-blue-400 mb-2 text-sm">Expansion Planning</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>• 20-25% spare ways minimum</li>
                  <li>• Size for future 3-phase upgrade</li>
                  <li>• EV charger: 32A way</li>
                  <li>• Heat pump: 40A+ way</li>
                  <li>• Solar PV: 16-32A way</li>
                  <li>• Main cable: 120% expected demand</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="font-semibold text-green-400 mb-2 text-sm">Maintenance Access</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>• Front: 1000mm minimum</li>
                  <li>• Side: 500mm where required</li>
                  <li>• Height: 2000mm headroom</li>
                  <li>• Lighting: 200 lux minimum</li>
                  <li>• Local isolators ≤3m from equipment</li>
                  <li>• 30-40% spare space in trunking</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                <p className="font-semibold text-purple-400 mb-2 text-sm">Accessibility (Part M)</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>• Sockets: 450-1200mm above FFL</li>
                  <li>• Optimum: 600-1000mm</li>
                  <li>• Light switches: 900-1200mm</li>
                  <li>• Door entry: 900-1000mm</li>
                  <li>• Emergency controls: ≤1100mm</li>
                  <li>• Clear space: 800×1200mm</li>
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                <p className="font-semibold text-amber-400 mb-2 text-sm">Key BS 7671 Regulations</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li><strong>132.9:</strong> Safe operation, maintenance & repair</li>
                  <li><strong>132.12:</strong> Accessibility for operation</li>
                  <li><strong>314.1:</strong> Circuit arrangement for maintenance</li>
                  <li><strong>514.9:</strong> Circuit identification required</li>
                  <li><strong>537.1:</strong> Isolation and switching provision</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                <p className="font-semibold text-purple-400 mb-2 text-sm">Building Categories (Part M)</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li><strong>Category 1:</strong> Basic accessibility (visitable)</li>
                  <li><strong>Category 2:</strong> Enhanced accessibility (adaptable)</li>
                  <li><strong>Category 3:</strong> Wheelchair accessible</li>
                  <li><strong>Commercial:</strong> DDA compliance mandatory</li>
                  <li><strong>Public:</strong> Enhanced accessibility features</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-white/10 mt-4">
              <p className="font-medium text-white mb-2 text-sm">Design Review Checklist</p>
              <div className="grid sm:grid-cols-4 gap-3 text-xs text-white/70">
                <div>
                  <p className="font-medium mb-1">Expansion Ready?</p>
                  <ul className="space-y-0.5">
                    <li>□ Spare DB ways (25%)</li>
                    <li>□ Future load provisions</li>
                    <li>□ Cable route capacity</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1">Maintenance Safe?</p>
                  <ul className="space-y-0.5">
                    <li>□ Working space adequate</li>
                    <li>□ All isolators accessible</li>
                    <li>□ Clear labelling in place</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1">Part M Compliant?</p>
                  <ul className="space-y-0.5">
                    <li>□ Socket heights correct</li>
                    <li>□ Switch heights compliant</li>
                    <li>□ Reach zones considered</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1">BS 7671 Compliant?</p>
                  <ul className="space-y-0.5">
                    <li>□ Reg 132.9 satisfied</li>
                    <li>□ Circuit arrangement OK</li>
                    <li>□ Documentation complete</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Recap
            </h2>
            <p className="text-white/80 leading-relaxed">
              In this subsection, you learned the importance of designing for future expansion, safe and easy maintenance, and user accessibility. You explored BS 7671 and Part M requirements, considered practical guidance for real-world installations, and saw the risks of ignoring these design principles. A good design is not only safe today but remains adaptable, serviceable, and user-friendly for years to come.
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
              <Link to="../2-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../../section3">
                Next Section
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module5Section2_5;
