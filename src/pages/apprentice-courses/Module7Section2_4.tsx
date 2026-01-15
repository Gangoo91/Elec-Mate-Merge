import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Overload Current and Protection - Module 7 Section 2.4";
const DESCRIPTION = "Understanding overload currents, protection devices, and circuit design considerations";

const quizQuestions = [
  {
    id: 1,
    question: "An installation has a design current (Ib) of 25A. The protective device has a nominal current (In) of 32A, and the cable has a current-carrying capacity (Iz) of 30A. Is this design compliant?",
    options: [
      "Yes, it meets all requirements",
      "No, the protective device rating is too high",
      "No, the cable capacity is insufficient",
      "No, both the device and cable are incorrectly sized"
    ],
    correctAnswer: 2,
    explanation: "The design fails because In (32A) exceeds Iz (30A). The relationship Ib ≤ In ≤ Iz must be maintained, so either a larger cable (Iz ≥ 32A) or smaller protective device (In ≤ 30A) is required."
  },
  {
    id: 2,
    question: "A Type B MCB has a magnetic trip setting of:",
    options: [
      "3-5 times rated current",
      "5-10 times rated current",
      "10-14 times rated current",
      "2-3 times rated current"
    ],
    correctAnswer: 0,
    explanation: "Type B MCBs have a magnetic trip characteristic of 3-5 times the rated current, making them suitable for general purpose applications with normal inrush currents."
  },
  {
    id: 3,
    question: "When applying correction factors for cable current-carrying capacity, the ambient temperature correction factor (Ca) for 35°C when the cable is rated at 30°C is:",
    options: [
      "1.0",
      "0.94",
      "1.06",
      "0.87"
    ],
    correctAnswer: 1,
    explanation: "For thermoplastic cables, the correction factor for 35°C ambient (5°C above the 30°C reference) is 0.94, reducing the cable's current-carrying capacity."
  },
  {
    id: 4,
    question: "The I²t characteristic of a protective device represents:",
    options: [
      "The energy let-through during operation",
      "The thermal stress on the cable",
      "The magnetic field strength",
      "The voltage drop across the device"
    ],
    correctAnswer: 0,
    explanation: "The I²t characteristic represents the energy let-through of the protective device, which must not exceed the cable's thermal capacity to prevent damage during fault conditions."
  },
  {
    id: 5,
    question: "Load diversity factors are applied to:",
    options: [
      "Account for the probability that all loads will not operate simultaneously",
      "Increase the safety margin in calculations",
      "Compensate for voltage drop",
      "Adjust for temperature variations"
    ],
    correctAnswer: 0,
    explanation: "Diversity factors account for the realistic probability that all connected loads will not operate at full load simultaneously, allowing for more economical circuit design."
  }
];

const Module7Section2_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  const faqs = [
    {
      question: "How do I determine if an existing installation is properly protected against overload?",
      answer: "Conduct a load survey to measure actual currents, verify the Ib ≤ In ≤ Iz relationship for all circuits, check protective device characteristics match the load types, and ensure coordination between protective devices is maintained."
    },
    {
      question: "What's the difference between overload and overcurrent protection?",
      answer: "Overload protection specifically addresses currents that exceed normal ratings but remain within circuit parameters. Overcurrent protection is broader, covering both overload and fault currents (short circuits and earth faults)."
    },
    {
      question: "Can I use a larger protective device to stop nuisance tripping?",
      answer: "No, the protective device rating must not exceed the cable's current-carrying capacity (In ≤ Iz). If nuisance tripping occurs, investigate the cause - it may indicate actual overload, incorrect device type, or installation issues."
    },
    {
      question: "How often should overload protection be reviewed?",
      answer: "Review protection annually during routine maintenance, after any load changes, when adding new circuits, if protective devices operate frequently, or following any electrical modifications to the installation."
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back to Section 2</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Title Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 7</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 2.4</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Overload Current and Protection
            </h1>
            <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
              Understanding overload currents, protection devices, and circuit design considerations
            </p>
          </header>

          {/* In 30 Seconds Summary */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <h2 className="text-lg font-semibold text-white mb-3">In 30 seconds</h2>
            <div className="grid gap-4 sm:grid-cols-2 text-sm text-white/80">
              <div>
                <h3 className="font-medium text-white mb-2">Spot it</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Warm cables, connections, or equipment</li>
                  <li>MCBs or fuses operating frequently</li>
                  <li>Voltage drop affecting equipment performance</li>
                  <li>Multiple appliances on single circuits</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-white mb-2">Use it</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Clamp meter for current measurement</li>
                  <li>Thermal imaging for heat detection</li>
                  <li>Load calculation methods</li>
                  <li>Ib ≤ In ≤ Iz relationship verification</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="p-4 rounded-lg bg-white/5 border border-white/10 mb-10">
            <h2 className="text-lg font-semibold text-white mb-3">Learning Outcomes</h2>
            <ul className="list-disc pl-6 space-y-2 text-sm text-white/80">
              <li>Understand overload fundamentals and distinguish from fault conditions</li>
              <li>Select and coordinate appropriate protection systems and devices</li>
              <li>Apply current rating relationships and cable design principles</li>
              <li>Implement detection, testing and load management strategies</li>
            </ul>
          </div>

          {/* Section 1 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Overload Fundamentals and Characteristics
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div>
                <h3 className="font-medium text-white mb-2">Definition and Nature</h3>
                <p className="mb-3">An overload condition occurs when a circuit carries more current than it is designed for, without a fault being present. Unlike short circuits which create very low resistance paths, overloads result from legitimate loads that exceed circuit capacity.</p>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10 mb-4">
                  <h4 className="font-medium text-elec-yellow mb-2">Key Characteristics:</h4>
                  <ul className="list-disc pl-4 space-y-1 text-sm">
                    <li><strong>Gradual development:</strong> Current builds up over time as loads are added</li>
                    <li><strong>Finite current levels:</strong> Higher than design but not infinite like short circuits</li>
                    <li><strong>Heating effects:</strong> I²R losses cause temperature rise in conductors</li>
                    <li><strong>Time dependency:</strong> Damage accumulates with duration of overload</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-white mb-2">Common Causes</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="p-3 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
                    <h4 className="font-medium text-elec-yellow mb-2 text-sm">Design Issues:</h4>
                    <ul className="list-disc pl-4 space-y-1 text-xs">
                      <li>Inadequate load calculations</li>
                      <li>Incorrect diversity factors</li>
                      <li>Undersized cable selection</li>
                      <li>Poor load distribution</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-medium text-orange-400 mb-2 text-sm">Operational Issues:</h4>
                    <ul className="list-disc pl-4 space-y-1 text-xs">
                      <li>Multiple portable appliances</li>
                      <li>Extension lead abuse</li>
                      <li>Equipment addition without assessment</li>
                      <li>Seasonal load variations</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-white mb-2">Effects and Consequences</h3>
                <p className="mb-3">Overload currents cause heating in conductors following the I²R relationship. Even small overloads can cause significant temperature rises over time, leading to insulation damage, connection deterioration, and fire risk.</p>

                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                  <h4 className="font-medium text-red-400 mb-2">Progressive Damage:</h4>
                  <ul className="list-disc pl-4 space-y-1 text-sm">
                    <li><strong>Immediate:</strong> Voltage drop, reduced performance, warm connections</li>
                    <li><strong>Short-term:</strong> Insulation softening, connection expansion</li>
                    <li><strong>Long-term:</strong> Insulation failure, fire risk, equipment damage</li>
                  </ul>
                </div>
              </div>

              <InlineCheck
                id="overload-fundamentals"
                question="What distinguishes an overload from a short circuit fault?"
                options={[
                  "Overload currents are always higher than short circuit currents",
                  "Overloads occur with legitimate loads exceeding capacity; short circuits create low-resistance fault paths",
                  "Short circuits cause more heating than overloads",
                  "There is no practical difference between them"
                ]}
                correctIndex={1}
                explanation="Overloads result from legitimate loads that exceed circuit design capacity, while short circuits create abnormal low-resistance paths that bypass the intended load."
              />
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Protection Systems and Device Selection
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div>
                <h3 className="font-medium text-white mb-2">Time/Current Characteristics</h3>
                <p className="mb-3">Overload protection operates on inverse time characteristics - the higher the overload current, the faster the protective device operates. This allows for normal starting currents while protecting against sustained overloads.</p>

                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 mb-4">
                  <h4 className="font-medium text-green-400 mb-2">MCB Types and Applications:</h4>
                  <ul className="list-disc pl-4 space-y-1 text-sm">
                    <li><strong>Type B (3-5 times In):</strong> General purpose, resistive and lightly inductive loads</li>
                    <li><strong>Type C (5-10 times In):</strong> Inductive loads, fluorescent lighting, motors</li>
                    <li><strong>Type D (10-20 times In):</strong> High inrush loads, transformers, large motors</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-white mb-2">Device Selection Criteria</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <h4 className="font-medium mb-2 text-sm">Current Rating Selection:</h4>
                    <ul className="list-disc pl-4 space-y-1 text-xs">
                      <li>Must not exceed cable current-carrying capacity (In ≤ Iz)</li>
                      <li>Must be ≥ design current of circuit (In ≥ Ib)</li>
                      <li>Consider derating factors and grouping</li>
                      <li>Account for ambient temperature effects</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-sm">Breaking Capacity:</h4>
                    <ul className="list-disc pl-4 space-y-1 text-xs">
                      <li>Must exceed prospective short circuit current</li>
                      <li>Consider fault levels at point of installation</li>
                      <li>Account for system impedance changes</li>
                      <li>Verify with supply authority data</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-white mb-2">Protection Coordination</h3>
                <p className="mb-3">Proper coordination ensures only the protective device closest to the overload operates, maintaining supply to unaffected circuits. This requires careful selection of device ratings and characteristics.</p>

                <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                  <h4 className="font-medium text-purple-400 mb-2">Coordination Principles:</h4>
                  <ul className="list-disc pl-4 space-y-1 text-sm">
                    <li>Downstream devices must operate before upstream devices</li>
                    <li>Time/current curves must not overlap in fault region</li>
                    <li>Consider I²t energy let-through characteristics</li>
                    <li>Verify operation under all fault conditions</li>
                  </ul>
                </div>
              </div>

              <InlineCheck
                id="protection-systems"
                question="Why is protection coordination important in electrical installations?"
                options={[
                  "It ensures all protective devices trip together for maximum safety",
                  "It prevents any protective device from operating during faults",
                  "It ensures only the device closest to the fault operates, maintaining supply elsewhere",
                  "It increases the fault current to improve protection sensitivity"
                ]}
                correctIndex={2}
                explanation="Protection coordination ensures selective operation - only the protective device closest to the fault should operate, maintaining electrical supply to unaffected parts of the installation."
              />
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Current Ratings and Cable Design
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div>
                <h3 className="font-medium text-white mb-2">Fundamental Design Relationship</h3>
                <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30 mb-4 text-center">
                  <h4 className="font-bold text-elec-yellow text-lg mb-2">Ib ≤ In ≤ Iz</h4>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-left">
                    <li><strong>Ib (Design current):</strong> Maximum current circuit will carry in normal service</li>
                    <li><strong>In (Nominal current):</strong> Current rating of protective device</li>
                    <li><strong>Iz (Current-carrying capacity):</strong> Current cable can carry continuously</li>
                  </ul>
                </div>
                <p>This relationship ensures the protective device will operate before the cable reaches its thermal limit, providing effective overload protection.</p>
              </div>

              <div>
                <h3 className="font-medium text-white mb-2">Correction Factors</h3>
                <p className="mb-3">Cable current-carrying capacity must be adjusted for installation conditions. The corrected capacity (Iz) = It × Ca × Cg × Ci × Cc</p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="p-3 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
                    <h4 className="font-medium text-elec-yellow mb-2 text-sm">Environmental Factors:</h4>
                    <ul className="list-disc pl-4 space-y-1 text-xs">
                      <li><strong>Ca:</strong> Ambient temperature (0.87-1.15)</li>
                      <li><strong>Cs:</strong> Soil thermal resistivity (0.7-1.0)</li>
                      <li><strong>Cd:</strong> Depth of burial (0.9-1.0)</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-medium text-orange-400 mb-2 text-sm">Installation Factors:</h4>
                    <ul className="list-disc pl-4 space-y-1 text-xs">
                      <li><strong>Cg:</strong> Grouping factor (0.5-1.0)</li>
                      <li><strong>Ci:</strong> Installation method varies by type</li>
                      <li><strong>Cc:</strong> Conductor operating temperature</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-white mb-2">Design Methodology</h3>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-medium mb-2 text-sm">Step-by-Step Process:</h4>
                  <ol className="list-decimal pl-4 space-y-1 text-xs">
                    <li>Calculate design current (Ib) from load requirements</li>
                    <li>Select protective device rating (In ≥ Ib)</li>
                    <li>Determine installation conditions and correction factors</li>
                    <li>Calculate required cable current-carrying capacity (It ≥ In/correction factors)</li>
                    <li>Select cable with adequate current rating</li>
                    <li>Verify voltage drop is within acceptable limits</li>
                    <li>Check earth fault loop impedance for automatic disconnection</li>
                  </ol>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-white mb-2">Practical Considerations</h3>
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                  <h4 className="font-medium text-green-400 mb-2">Design Tips:</h4>
                  <ul className="list-disc pl-4 space-y-1 text-sm">
                    <li>Always apply worst-case correction factors during design</li>
                    <li>Consider future load growth when sizing circuits</li>
                    <li>Use next standard cable size up when close to limits</li>
                    <li>Document all assumptions and calculation methods</li>
                  </ul>
                </div>
              </div>

              <InlineCheck
                id="current-ratings"
                question="A circuit has Ib = 20A, In = 25A, and Iz = 23A. What action is required?"
                options={[
                  "The design is acceptable as-is",
                  "Increase the protective device rating to 32A",
                  "Install a larger cable with Iz greater than or equal to 25A",
                  "Reduce the design current to below 23A"
                ]}
                correctIndex={2}
                explanation="The protective device rating (In = 25A) exceeds the cable capacity (Iz = 23A), violating the In ≤ Iz requirement. A larger cable with capacity ≥ 25A must be installed."
              />
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Detection, Testing and Load Management
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div>
                <h3 className="font-medium text-white mb-2">Load Survey Techniques</h3>
                <p className="mb-3">Regular load surveys are essential for identifying potential overload conditions before they cause damage. These should be conducted during peak demand periods to capture maximum loading.</p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-medium text-elec-yellow mb-2 text-sm">Measurement Methods:</h4>
                    <ul className="list-disc pl-4 space-y-1 text-xs">
                      <li>Clamp meter readings on main cables</li>
                      <li>Data logging for 24-hour profiles</li>
                      <li>Power quality analyser recording</li>
                      <li>Thermal imaging of connections</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-medium text-purple-400 mb-2 text-sm">Key Parameters:</h4>
                    <ul className="list-disc pl-4 space-y-1 text-xs">
                      <li>Maximum demand current per circuit</li>
                      <li>Load factor and diversity</li>
                      <li>Harmonic content and neutral currents</li>
                      <li>Power factor and reactive power</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-white mb-2">Verification and Testing</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-2 text-sm">Protection Effectiveness Testing:</h4>
                    <ul className="list-disc pl-4 space-y-1 text-xs">
                      <li>Verify protective device operation at 1.45 times In within 1 hour (conventional)</li>
                      <li>Check earth fault loop impedance for automatic disconnection times</li>
                      <li>Test RCD operation for additional protection where required</li>
                      <li>Confirm coordination between upstream and downstream devices</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
                    <h4 className="font-medium text-elec-yellow mb-2 text-sm">Documentation Requirements:</h4>
                    <ul className="list-disc pl-4 space-y-1 text-xs">
                      <li>Record actual load currents and diversity factors</li>
                      <li>Document any deviations from design assumptions</li>
                      <li>Note protective device operation history</li>
                      <li>Maintain schedule for periodic review</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-white mb-2">Load Management Strategies</h3>
                <p className="mb-3">Effective load management prevents overload conditions and optimises installation capacity. This involves both design measures and operational controls.</p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                    <h4 className="font-medium text-green-400 mb-2 text-sm">Design Strategies:</h4>
                    <ul className="list-disc pl-4 space-y-1 text-xs">
                      <li>Load balancing across phases</li>
                      <li>Dedicated circuits for high-power equipment</li>
                      <li>Appropriate diversity factor application</li>
                      <li>Future expansion provision</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-medium text-orange-400 mb-2 text-sm">Operational Controls:</h4>
                    <ul className="list-disc pl-4 space-y-1 text-xs">
                      <li>Load scheduling and peak shaving</li>
                      <li>Automatic load shedding systems</li>
                      <li>User education and guidelines</li>
                      <li>Regular monitoring and maintenance</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-white mb-2">Corrective Actions</h3>
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                  <h4 className="font-medium text-red-400 mb-2">When Overload is Detected:</h4>
                  <ul className="list-disc pl-4 space-y-1 text-sm">
                    <li><strong>Immediate:</strong> Reduce load by redistributing or disconnecting non-essential equipment</li>
                    <li><strong>Short-term:</strong> Install additional circuits to share loading</li>
                    <li><strong>Long-term:</strong> Upgrade cable sizes and protective devices as required</li>
                    <li><strong>Systematic:</strong> Review and update load calculations and design criteria</li>
                  </ul>
                </div>
              </div>

              <InlineCheck
                id="load-management"
                question="What is the primary purpose of conducting regular load surveys?"
                options={[
                  "To increase energy costs",
                  "To identify potential overload conditions before damage occurs",
                  "To reduce circuit protection",
                  "To eliminate the need for protective devices"
                ]}
                correctIndex={1}
                explanation="Regular load surveys help identify circuits approaching their capacity limits, allowing preventive action before overload conditions cause damage to equipment or create safety hazards."
              />
            </div>
          </section>

          {/* Real-world Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4">Real-world Example</h2>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="font-medium text-white mb-3">Office Kitchen Circuit Overload</h3>
              <p className="text-sm text-white/80 mb-3"><strong>Situation:</strong> An office kitchen circuit rated at 20A (Type B MCB) serving a 2.5mm² cable keeps tripping during lunch periods when multiple appliances operate simultaneously.</p>

              <div className="grid gap-4 sm:grid-cols-2 mt-4">
                <div>
                  <h4 className="font-medium text-white mb-2 text-sm">Investigation findings:</h4>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-white/70">
                    <li>Microwave: 8A</li>
                    <li>Kettle: 10A</li>
                    <li>Toaster: 6A</li>
                    <li>Coffee machine: 4A</li>
                    <li>Total simultaneous load: 28A</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-2 text-sm">Solution implemented:</h4>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-white/70">
                    <li>Install second 20A circuit using 2.5mm² cable</li>
                    <li>Redistribute loads across both circuits</li>
                    <li>Label sockets clearly for load management</li>
                    <li>Provide user guidance on appliance use</li>
                  </ul>
                </div>
              </div>

              <p className="mt-3 text-xs italic text-white/60">Result: Load balanced across two circuits (14A each), eliminating nuisance tripping and ensuring safe operation.</p>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <h3 className="font-medium text-white mb-2">{faq.question}</h3>
                  <p className="text-sm text-white/70">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Summary */}
          <section className="mb-10">
            <div className="p-4 rounded-lg bg-gradient-to-r from-elec-yellow/10 to-purple-500/10 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4">Key Points Summary</h2>
              <div className="grid gap-4 sm:grid-cols-2 text-sm text-white/80">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Overloads result from legitimate loads exceeding circuit design capacity</li>
                  <li>The relationship Ib ≤ In ≤ Iz must always be maintained</li>
                  <li>Protection coordination ensures selective operation of devices</li>
                  <li>Regular load surveys identify problems before damage occurs</li>
                </ul>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Correction factors adjust cable ratings for installation conditions</li>
                  <li>MCB types must match the characteristics of connected loads</li>
                  <li>Load management strategies prevent overload conditions</li>
                  <li>Documentation and periodic review ensure continued protection effectiveness</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quiz */}
          <Quiz questions={quizQuestions} />

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-10 pt-6 border-t border-white/10">
            <Button
              variant="ghost"
              className="w-full sm:w-auto text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../2-3">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Earth Faults
              </Link>
            </Button>
            <Button
              className="w-full sm:w-auto bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../2-5">
                Next: Incorrect Polarity
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module7Section2_4;
