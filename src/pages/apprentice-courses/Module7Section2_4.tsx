import { ArrowLeft, ArrowRight, Zap, Shield, Settings, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Overload Current and Protection - Module 7 Section 2.4";
const DESCRIPTION = "Understanding overload currents, protection devices, and circuit design considerations";

// Quick check questions for inline verification
const quickCheckQuestions = [
  {
    id: "overload-definition",
    question: "What defines an overload current?",
    options: [
      "Current that exceeds the rated current but remains within normal circuit parameters",
      "Current that causes immediate circuit damage",
      "Current that trips the main breaker",
      "Current that creates a short circuit"
    ],
    correctIndex: 0,
    explanation: "An overload current exceeds the rated current of the circuit or equipment but operates within the normal parameters of the electrical installation, unlike a fault current."
  },
  {
    id: "protection-coordination",
    question: "What is the purpose of protection coordination?",
    options: [
      "To ensure all devices trip simultaneously",
      "To ensure only the closest protective device to the fault operates",
      "To prevent any protective devices from operating",
      "To increase the fault current level"
    ],
    correctIndex: 1,
    explanation: "Protection coordination ensures that only the protective device closest to the fault operates, maintaining supply to unaffected circuits."
  },
  {
    id: "cable-sizing-relationship",
    question: "What is the correct relationship for cable sizing under overload conditions?",
    options: [
      "Ib > In > Iz",
      "Ib less than or equal to In less than or equal to Iz",
      "Iz less than or equal to In less than or equal to Ib", 
      "In > Ib > Iz"
    ],
    correctIndex: 1,
    explanation: "The design current (Ib) must not exceed the nominal current (In) of the protective device, which must not exceed the current-carrying capacity (Iz) of the cable."
  },
  {
    id: "load-assessment",
    question: "When should load surveys be conducted?",
    options: [
      "Only when faults occur",
      "During initial design and periodic reviews",
      "Only for new installations",
      "When replacing protective devices"
    ],
    correctIndex: 1,
    explanation: "Load surveys should be conducted during initial design, after significant changes, and as part of periodic maintenance to ensure continued protection effectiveness."
  }
];

// Main quiz questions
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back to Section 2</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            2.4 Overload Current and Protection
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl">
            Understanding overload currents, protection devices, and circuit design considerations
          </p>
        </div>

        {/* In 30 seconds */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <CardContent className="p-0">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-400" />
              In 30 seconds
            </h2>
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 text-xs sm:text-sm text-foreground">
              <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/20">
                <h3 className="font-medium text-foreground mb-2">Spot it</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Warm cables, connections, or equipment</li>
                  <li>MCBs or fuses operating frequently</li>
                  <li>Voltage drop affecting equipment performance</li>
                  <li>Multiple appliances on single circuits</li>
                </ul>
              </div>
              
              <div className="rounded-lg p-3 sm:p-4 bg-card border border-emerald-500/30">
                <h3 className="font-medium text-foreground mb-2">Use it</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Clamp meter for current measurement</li>
                  <li>Thermal imaging for heat detection</li>
                  <li>Load calculation methods</li>
                  <li>Ib ≤ In ≤ Iz relationship verification</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <CardContent className="p-0">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-4">Learning Outcomes</h2>
            <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
              <li>Understand overload fundamentals and distinguish from fault conditions</li>
              <li>Select and coordinate appropriate protection systems and devices</li>
              <li>Apply current rating relationships and cable design principles</li>
              <li>Implement detection, testing and load management strategies</li>
            </ul>
          </CardContent>
        </Card>

        {/* Content Sections */}
        
        {/* Section 1: Overload Fundamentals and Characteristics */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-400" />
              1. Overload Fundamentals and Characteristics
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-4 text-xs sm:text-sm text-foreground">
            <div>
              <h4 className="font-medium mb-2">Definition and Nature</h4>
              <p className="mb-3">An overload condition occurs when a circuit carries more current than it is designed for, without a fault being present. Unlike short circuits which create very low resistance paths, overloads result from legitimate loads that exceed circuit capacity.</p>
              
              <div className="bg-card border border-border/30 rounded-lg p-3">
                <h5 className="font-medium text-emerald-400 dark:text-emerald-400 mb-2">Key Characteristics:</h5>
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong>Gradual development:</strong> Current builds up over time as loads are added</li>
                  <li><strong>Finite current levels:</strong> Higher than design but not infinite like short circuits</li>
                  <li><strong>Heating effects:</strong> I²R losses cause temperature rise in conductors</li>
                  <li><strong>Time dependency:</strong> Damage accumulates with duration of overload</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Common Causes</h4>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
                  <h5 className="font-medium text-emerald-400 dark:text-emerald-400 mb-2">Design Issues:</h5>
                  <ul className="list-disc pl-4 space-y-1 text-xs">
                    <li>Inadequate load calculations</li>
                    <li>Incorrect diversity factors</li>
                    <li>Undersized cable selection</li>
                    <li>Poor load distribution</li>
                  </ul>
                </div>
                <div className="bg-card border border-border/30 rounded-lg p-3">
                  <h5 className="font-medium text-orange-600 dark:text-emerald-400 mb-2">Operational Issues:</h5>
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
              <h4 className="font-medium mb-2">Effects and Consequences</h4>
              <p className="mb-3">Overload currents cause heating in conductors following the I²R relationship. Even small overloads can cause significant temperature rises over time, leading to insulation damage, connection deterioration, and fire risk.</p>
              
              <div className="bg-card border border-border/30 rounded-lg p-3">
                <h5 className="font-medium text-red-600 dark:text-emerald-400 mb-2">Progressive Damage:</h5>
                <ul className="list-disc pl-4 space-y-1">
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
          </CardContent>
        </Card>

        {/* Section 2: Protection Systems and Device Selection */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-400" />
              2. Protection Systems and Device Selection
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-4 text-xs sm:text-sm text-foreground">
            <div>
              <h4 className="font-medium mb-2">Time/Current Characteristics</h4>
              <p className="mb-3">Overload protection operates on inverse time characteristics - the higher the overload current, the faster the protective device operates. This allows for normal starting currents while protecting against sustained overloads.</p>
              
              <div className="bg-card border border-green-400/30 rounded-lg p-3">
                <h5 className="font-medium text-green-600 dark:text-green-400 mb-2">MCB Types and Applications:</h5>
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong>Type B (3-5 times In):</strong> General purpose, resistive and lightly inductive loads</li>
                  <li><strong>Type C (5-10 times In):</strong> Inductive loads, fluorescent lighting, motors</li>
                  <li><strong>Type D (10-20 times In):</strong> High inrush loads, transformers, large motors</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Device Selection Criteria</h4>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <h5 className="font-medium mb-2">Current Rating Selection:</h5>
                  <ul className="list-disc pl-4 space-y-1 text-xs">
                    <li>Must not exceed cable current-carrying capacity (In ≤ Iz)</li>
                    <li>Must be ≥ design current of circuit (In ≥ Ib)</li>
                    <li>Consider derating factors and grouping</li>
                    <li>Account for ambient temperature effects</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Breaking Capacity:</h5>
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
              <h4 className="font-medium mb-2">Protection Coordination</h4>
              <p className="mb-3">Proper coordination ensures only the protective device closest to the overload operates, maintaining supply to unaffected circuits. This requires careful selection of device ratings and characteristics.</p>
              
              <div className="bg-card border border-border/30 rounded-lg p-3">
                <h5 className="font-medium text-purple-600 dark:text-emerald-400 mb-2">Coordination Principles:</h5>
                <ul className="list-disc pl-4 space-y-1">
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
          </CardContent>
        </Card>

        {/* Section 3: Current Ratings and Cable Design */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground flex items-center gap-2">
              <Settings className="w-5 h-5 text-emerald-400" />
              3. Current Ratings and Cable Design
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-4 text-xs sm:text-sm text-foreground">
            <div>
              <h4 className="font-medium mb-2">Fundamental Design Relationship</h4>
              <div className="bg-card border border-border/30 rounded-lg p-4 mb-3">
                <h5 className="font-medium text-emerald-400 dark:text-emerald-400 mb-2 text-center">Ib ≤ In ≤ Iz</h5>
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong>Ib (Design current):</strong> Maximum current circuit will carry in normal service</li>
                  <li><strong>In (Nominal current):</strong> Current rating of protective device</li>
                  <li><strong>Iz (Current-carrying capacity):</strong> Current cable can carry continuously</li>
                </ul>
              </div>
              <p>This relationship ensures the protective device will operate before the cable reaches its thermal limit, providing effective overload protection.</p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Correction Factors</h4>
              <p className="mb-3">Cable current-carrying capacity must be adjusted for installation conditions. The corrected capacity (Iz) = It times Ca times Cg times Ci times Cc</p>
              
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
                  <h5 className="font-medium text-emerald-400 dark:text-emerald-400 mb-2">Environmental Factors:</h5>
                  <ul className="list-disc pl-4 space-y-1 text-xs">
                    <li><strong>Ca:</strong> Ambient temperature (0.87-1.15)</li>
                    <li><strong>Cs:</strong> Soil thermal resistivity (0.7-1.0)</li>
                    <li><strong>Cd:</strong> Depth of burial (0.9-1.0)</li>
                  </ul>
                </div>
                <div className="bg-card border border-border/30 rounded-lg p-3">
                  <h5 className="font-medium text-orange-600 dark:text-emerald-400 mb-2">Installation Factors:</h5>
                  <ul className="list-disc pl-4 space-y-1 text-xs">
                    <li><strong>Cg:</strong> Grouping factor (0.5-1.0)</li>
                    <li><strong>Ci:</strong> Installation method varies by type</li>
                    <li><strong>Cc:</strong> Conductor operating temperature</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Design Methodology</h4>
              <div className="space-y-3">
                <div className="bg-card border border-gray-400/30 rounded-lg p-3">
                  <h5 className="font-medium mb-2">Step-by-Step Process:</h5>
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
            </div>

            <div>
              <h4 className="font-medium mb-2">Practical Considerations</h4>
              <div className="bg-card border border-green-400/30 rounded-lg p-3">
                <h5 className="font-medium text-green-600 dark:text-green-400 mb-2">Design Tips:</h5>
                <ul className="list-disc pl-4 space-y-1">
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
              explanation="The protective device rating (In = 25A) exceeds the cable capacity (Iz = 23A), violating the In less than or equal to Iz requirement. A larger cable with capacity greater than or equal to 25A must be installed."
            />
          </CardContent>
        </Card>

        {/* Section 4: Detection, Testing and Load Management */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground flex items-center gap-2">
              <Search className="w-5 h-5 text-emerald-400" />
              4. Detection, Testing and Load Management
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-4 text-xs sm:text-sm text-foreground">
            <div>
              <h4 className="font-medium mb-2">Load Survey Techniques</h4>
              <p className="mb-3">Regular load surveys are essential for identifying potential overload conditions before they cause damage. These should be conducted during peak demand periods to capture maximum loading.</p>
              
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="bg-card border border-border/30 rounded-lg p-3">
                  <h5 className="font-medium text-emerald-400 dark:text-emerald-400 mb-2">Measurement Methods:</h5>
                  <ul className="list-disc pl-4 space-y-1 text-xs">
                    <li>Clamp meter readings on main cables</li>
                    <li>Data logging for 24-hour profiles</li>
                    <li>Power quality analyser recording</li>
                    <li>Thermal imaging of connections</li>
                  </ul>
                </div>
                <div className="bg-card border border-border/30 rounded-lg p-3">
                  <h5 className="font-medium text-purple-600 dark:text-emerald-400 mb-2">Key Parameters:</h5>
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
              <h4 className="font-medium mb-2">Verification and Testing</h4>
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium mb-2">Protection Effectiveness Testing:</h5>
                  <ul className="list-disc pl-4 space-y-1 text-xs">
                    <li>Verify protective device operation at 1.45 times In within 1 hour (conventional)</li>
                    <li>Check earth fault loop impedance for automatic disconnection times</li>
                    <li>Test RCD operation for additional protection where required</li>
                    <li>Confirm coordination between upstream and downstream devices</li>
                  </ul>
                </div>
                
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
                  <h5 className="font-medium text-emerald-400 dark:text-emerald-400 mb-2">Documentation Requirements:</h5>
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
              <h4 className="font-medium mb-2">Load Management Strategies</h4>
              <p className="mb-3">Effective load management prevents overload conditions and optimises installation capacity. This involves both design measures and operational controls.</p>
              
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="bg-card border border-green-400/30 rounded-lg p-3">
                  <h5 className="font-medium text-green-600 dark:text-green-400 mb-2">Design Strategies:</h5>
                  <ul className="list-disc pl-4 space-y-1 text-xs">
                    <li>Load balancing across phases</li>
                    <li>Dedicated circuits for high-power equipment</li>
                    <li>Appropriate diversity factor application</li>
                    <li>Future expansion provision</li>
                  </ul>
                </div>
                <div className="bg-card border border-border/30 rounded-lg p-3">
                  <h5 className="font-medium text-orange-600 dark:text-emerald-400 mb-2">Operational Controls:</h5>
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
              <h4 className="font-medium mb-2">Corrective Actions</h4>
              <div className="bg-card border border-border/30 rounded-lg p-3">
                <h5 className="font-medium text-red-600 dark:text-emerald-400 mb-2">When Overload is Detected:</h5>
                <ul className="list-disc pl-4 space-y-1">
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
          </CardContent>
        </Card>

        {/* Real-world Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <CardContent className="p-0">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-4">Real-world Example</h2>
            <div className="bg-card border border-border/30 rounded-lg p-4 text-xs sm:text-sm text-foreground">
              <h3 className="font-medium mb-3">Office Kitchen Circuit Overload</h3>
              <p className="mb-3"><strong>Situation:</strong> An office kitchen circuit rated at 20A (Type B MCB) serving a 2.5mm² cable keeps tripping during lunch periods when multiple appliances operate simultaneously.</p>
              
              <div className="grid gap-4 sm:grid-cols-2 mt-4">
                <div>
                  <h4 className="font-medium mb-2">Investigation findings:</h4>
                  <ul className="list-disc pl-4 space-y-1 text-xs">
                    <li>Microwave: 8A</li>
                    <li>Kettle: 10A</li>
                    <li>Toaster: 6A</li>
                    <li>Coffee machine: 4A</li>
                    <li>Total simultaneous load: 28A</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Solution implemented:</h4>
                  <ul className="list-disc pl-4 space-y-1 text-xs">
                    <li>Install second 20A circuit using 2.5mm² cable</li>
                    <li>Redistribute loads across both circuits</li>
                    <li>Label sockets clearly for load management</li>
                    <li>Provide user guidance on appliance use</li>
                  </ul>
                </div>
              </div>
              
              <p className="mt-3 text-xs italic">Result: Load balanced across two circuits (14A each), eliminating nuisance tripping and ensuring safe operation.</p>
            </div>
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <CardContent className="p-0">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-l-4 border-l-emerald-500 bg-card p-4 rounded-r-lg">
                  <h3 className="font-medium text-foreground mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-emerald-500/10 to-purple-500/10 border border-border/20">
          <CardContent className="p-0">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-4">Key Points Summary</h2>
            <div className="grid gap-4 sm:grid-cols-2 text-xs sm:text-sm text-foreground">
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
          </CardContent>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} />

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" asChild>
            <Link to="../2-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: 2.3
            </Link>
          </Button>
          <Button asChild>
            <Link to="../2-5">
              Next: 2.5
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Module7Section2_4;