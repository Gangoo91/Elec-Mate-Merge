import { ArrowLeft, ArrowRight, ShieldX, Target, CheckCircle, AlertTriangle, Eye, TrendingUp, Shield, Settings, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Preventing Damage to Cables During Installation | Level 2 Electrical Course";
const DESCRIPTION = "Master professional cable damage prevention techniques during installation. Learn protection methods, handling procedures, and BS 7671 compliance for safe electrical installations.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "Which is NOT a common cause of cable damage during installation?",
    options: ["Abrasion", "Over-bending", "Correct support spacing", "Excessive pulling tension"],
    correctIndex: 2,
    explanation: "Correct support spacing prevents damage, whilst abrasion, over-bending and excessive tension are common causes of cable damage."
  },
  {
    id: 2,
    question: "What is the primary purpose of cable rollers during installation?",
    options: ["Increase pulling speed", "Prevent dragging and abrasion", "Reduce installation cost", "Improve cable appearance"],
    correctIndex: 1,
    explanation: "Cable rollers prevent cables from dragging against surfaces, reducing abrasion and friction damage during pulling operations."
  },
  {
    id: 3,
    question: "Why should cable ties not be over-tightened?",
    options: ["To save time", "To prevent crushing the cable insulation", "To allow easy removal", "To reduce material costs"],
    correctIndex: 1,
    explanation: "Over-tightening cable ties can crush the cable insulation and conductors, potentially causing electrical faults and safety hazards."
  }
];

const Module4Section4_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "Which is NOT a common cause of cable damage during installation?",
      options: [
        "Abrasion",
        "Over-bending", 
        "Correct support spacing",
        "Excessive pulling tension"
      ],
      correctAnswer: 2,
      explanation: "Correct support spacing prevents damage, whilst abrasion, over-bending and excessive tension are common causes of cable damage."
    },
    {
      id: 2,
      question: "True or False: Cable ties can be tightened as much as possible for security.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "Cable ties should not be over-tightened as this can crush the cable insulation and damage conductors."
    },
    {
      id: 3,
      question: "Name two fittings that protect cables from sharp edges.",
      options: [
        "Bushes and grommets",
        "Nuts and bolts",
        "Washers and springs",
        "Clips and brackets"
      ],
      correctAnswer: 0,
      explanation: "Bushes, grommets, and trunking end caps protect cables from sharp edges at entry and exit points."
    },
    {
      id: 4,
      question: "What is the risk of exceeding a cable's maximum pulling tension?",
      options: [
        "Faster installation",
        "Damage to insulation and conductor stretching",
        "Better cable performance",
        "Reduced installation cost"
      ],
      correctAnswer: 1,
      explanation: "Exceeding pulling tension limits can stretch conductors, damage insulation, and compromise cable integrity."
    },
    {
      id: 5,
      question: "How should cables be stored before installation?",
      options: [
        "Flat on the ground",
        "On drums or reels, kept off the ground",
        "Coiled in corners",
        "Hanging from ceiling"
      ],
      correctAnswer: 1,
      explanation: "Cables should be stored on drums or reels to prevent kinks, damage, and contamination from ground contact."
    },
    {
      id: 6,
      question: "Why must outdoor cables be UV-rated?",
      options: [
        "To look better",
        "To prevent sheath degradation from sunlight",
        "To reduce cost",
        "To improve flexibility"
      ],
      correctAnswer: 1,
      explanation: "UV radiation from sunlight can degrade cable sheaths, making them brittle and prone to cracking."
    },
    {
      id: 7,
      question: "Name one method to prevent crushing during installation.",
      options: [
        "Use soft-edged cleats",
        "Pull cables faster",
        "Use smaller drums",
        "Install in wet conditions"
      ],
      correctAnswer: 0,
      explanation: "Soft-edged cleats or lined saddles prevent crushing of delicate cables during installation and support."
    },
    {
      id: 8,
      question: "Which regulation requires cables to be protected from damage during installation?",
      options: ["BS 6423", "BS 7671", "BS 5839", "BS 7909"],
      correctAnswer: 1,
      explanation: "BS 7671 requires cables to be installed so they are not subject to damage under normal service conditions."
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg ">
              <ShieldX className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 4.4.5
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Preventing Damage to Cables During Installation
          </h1>
          <p className="text-white">
            Master professional cable damage prevention techniques that protect expensive cables, maintain insulation integrity, and ensure BS 7671 compliance for safe installations.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Cables are expensive components that require protection during installation.</li>
                <li>Damage can occur from abrasion, crushing, over-bending, and excessive tension.</li>
                <li>Prevention strategies save time, money, and ensure electrical safety.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Sharp edges, excessive tension, tight bends, crushing points.</li>
                <li><strong>Use:</strong> Cable rollers, bushes, grommets, pulling lubricant, tension gauges.</li>
                <li><strong>Check:</strong> Sheath integrity, bend radius, support spacing, cleat tightness.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
            <li>Identify the most common causes of cable damage during electrical installation operations.</li>
            <li>Apply protective measures when handling, storing, and installing cables in various environments.</li>
            <li>Select appropriate tools, supports, and pulling methods to prevent mechanical cable damage.</li>
            <li>Understand the importance of bend radius, tension limits, and sheath integrity preservation.</li>
            <li>Follow BS 7671 and manufacturer guidelines to maintain cable safety and warranty compliance.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content</h2>

          {/* Common Causes of Cable Damage */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Common Causes of Cable Damage During Installation</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Understanding damage mechanisms allows preventive measures to be implemented effectively:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-1">Mechanical Damage Sources</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Abrasion damage mechanisms:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Sharp containment edges: File to 0.5mm radius minimum, deburr all cut edges</li>
                      <li>Cable-to-cable friction: Stagger different cable sizes, use separators</li>
                      <li>Dragging over surfaces: Use rollers every 3m, maintain 50mm ground clearance</li>
                      <li>Entry point damage: Install protective bushes with 3mm minimum wall thickness</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Crushing and impact prevention:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Cleat over-tightening: Maximum 40N/cm² contact pressure, use torque specifications</li>
                      <li>Support point pressure: Use soft-lined cleats, distribute loads across multiple points</li>
                      <li>Tool drop protection: Implement exclusion zones during installation</li>
                      <li>Heavy load placement: Never use cables as temporary supports or walkways</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Critical limit:</strong> Any visible sheath damage {'>'}10% thickness requires cable replacement
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-1">Bend Radius and Tension Control</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Minimum bend radius requirements:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>PVC insulated cables: 6× overall diameter during installation, 4× when fixed</li>
                      <li>XLPE cables: 8× overall diameter during installation, 6× when fixed</li>
                      <li>SWA cables: 12× overall diameter during installation, 8× when fixed</li>
                      <li>Special applications: Consult manufacturer datasheet for specific requirements</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Pulling tension control methods:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Tension limits: 7N/mm² for copper conductors, 5N/mm² for aluminium</li>
                      <li>Monitoring equipment: Calibrated tension gauges for pulls {'>'}500N force</li>
                      <li>Progressive pulling: Break long runs into 30m maximum sections</li>
                      <li>Team coordination: Constant communication between puller and feeder</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Professional tip:</strong> Use 80% of maximum tension as working limit for safety margin
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-1">Environmental and Chemical Damage</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Temperature damage prevention:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Installation temperature: PVC minimum 0°C, XLPE minimum -20°C</li>
                      <li>Heat source separation: 300mm minimum from equipment {'>'}70°C</li>
                      <li>Direct sunlight protection: Cover cables, avoid peak temperature periods</li>
                      <li>Thermal cycling damage: Account for expansion coefficients in support design</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Chemical and UV protection:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>UV exposure limits: Non-UV cables maximum 6 months outdoor exposure</li>
                      <li>Chemical compatibility: Check sheath material against environment chemicals</li>
                      <li>Contamination prevention: Seal entry points, use appropriate IP ratings</li>
                      <li>Long-term stability: Consider ozone resistance for outdoor applications</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Safety requirement:</strong> Environmental assessment mandatory before cable specification
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="damage-causes-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Protection During Handling and Storage */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Protection During Handling and Storage</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Proper handling and storage prevents pre-installation damage and maintains cable integrity:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Storage Requirements and Environment Control</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Drum storage specifications:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Ground clearance: 150mm minimum to prevent moisture ingress and contamination</li>
                      <li>Temperature control: Store between -20°C to +50°C, avoid thermal cycling</li>
                      <li>Humidity management: {'<'}85% RH, provide ventilation in storage areas</li>
                      <li>Rotation policy: First-in-first-out system, maximum 2-year storage for PVC</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Physical protection measures:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Drum condition: Inspect for damage, ensure intact flanges and bearings</li>
                      <li>Weather protection: Waterproof covers, UV shields for outdoor storage</li>
                      <li>Access control: Designated storage areas, trained personnel only</li>
                      <li>Documentation: Storage logs, environmental monitoring records</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Quality standard:</strong> Pre-installation inspection mandatory for all cable lengths
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Mechanical Handling Procedures</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Drum handling specifications:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Lifting capacity: 2-person team for drums {'>'}25kg, mechanical aids {'>'}100kg</li>
                      <li>Drum jack requirements: Load rating 150% of drum weight, brake control</li>
                      <li>Feed angle control: Maximum 45° deviation from straight line</li>
                      <li>Payout speed control: Prevent overrun, maintain back-tension</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Pre-installation inspection criteria:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Sheath integrity: No cuts {'>'}5% thickness, no compression marks</li>
                      <li>Visual assessment: Check for discolouration, surface contamination</li>
                      <li>Dimensional check: Verify against specification, check for crushing</li>
                      <li>End seal condition: Inspect for moisture ingress, reseal if necessary</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Rejection criteria:</strong> Any damage affecting conductor or insulation integrity
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="handling-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Protection During Pulling */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Protection During Cable Pulling Operations</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Pulling operations require specific protective measures to prevent damage during installation:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 text-elec-yellow mb-1">Mechanical Protection Systems</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Cable roller installation:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Horizontal runs: Position every 3-5m, align with cable direction</li>
                      <li>Bend locations: 1.5m spacing through curves, roller diameter {'>'}6× cable diameter</li>
                      <li>Vertical applications: Support every 2m, prevent side loading</li>
                      <li>Roller specifications: Smooth surface, free rotation, adequate load rating</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Entry and exit point protection:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Protective bushes: 3mm minimum wall thickness, appropriate material compatibility</li>
                      <li>Bell-mouth guides: Smooth radius transitions, no sharp edges</li>
                      <li>Grommet installation: Correct size selection, proper sealing</li>
                      <li>Trunking end caps: Rounded edges, secure fixing to prevent movement</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Installation standard:</strong> All containment entries must have protective fittings
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 text-elec-yellow mb-1">Pulling Lubricant Application and Techniques</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Lubricant selection and application:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Application conditions: Runs {'>'}30m, multiple bends {'>'}45°, cable bundles</li>
                      <li>Friction reduction: 60-80% reduction in pulling force when correctly applied</li>
                      <li>Compatible materials: Non-reactive with cable sheath, temperature stable</li>
                      <li>Application method: Even coating, avoid over-application causing slippage</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Tension monitoring and control:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Gauge requirements: Calibrated instruments for mechanical pulls {'>'}500N</li>
                      <li>Monitoring frequency: Continuous during pull, record maximum values</li>
                      <li>Working limits: 80% of manufacturer maximum, adjust for ambient conditions</li>
                      <li>Emergency procedures: Immediate stop protocols when limits approached</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Critical procedure:</strong> Stop pull immediately if tension limits exceeded
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 text-elec-yellow mb-1">Environmental Control and Timing</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Temperature and timing considerations:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Pull speed control: Maximum 1m/minute for SWA cables to prevent heating</li>
                      <li>Ambient temperature limits: Avoid pulls {'>'}35°C for thermoplastic cables</li>
                      <li>Thermal expansion: Allow for coefficient differences between containment and cable</li>
                      <li>Weather conditions: Wind loading on vertical pulls, rain affecting grip</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Support during vertical installations:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Intermediate supports: Every 2m for vertical drops {'>'}5m total height</li>
                      <li>Weight distribution: Support cable weight, not pulling system</li>
                      <li>Progressive installation: Install supports as cable advances</li>
                      <li>Emergency arrest: Quick-release clamps in case of equipment failure</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Safety requirement:</strong> Risk assessment mandatory for vertical pulls {'>'}10m
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="pulling-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Installation in Containment */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Protection During Installation in Containment</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Containment installation requires careful support design and installation practices:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 text-elec-yellow mb-1">Support System Design and Spacing</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>BS 7671 Table 4A2 support spacing:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Horizontal runs: 300mm for cables ≤9mm diameter, 600mm for cables {'>'}20mm</li>
                      <li>Vertical runs: 400mm maximum spacing, additional support at changes of direction</li>
                      <li>Heavy cables: Reduce spacing by 50% for SWA cables {'>'}35mm² conductor</li>
                      <li>Multiple cable installations: Consider cumulative loading effects</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Cleat selection and installation:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Material compatibility: Polymer-lined for PVC, stainless steel for corrosive environments</li>
                      <li>Contact pressure: Maximum 40N/cm², use soft-edged designs</li>
                      <li>Fixing torque: 2-4Nm for M6 fixings, follow manufacturer specifications</li>
                      <li>Thermal expansion: Allow movement in fixed supports, use sliding supports</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Design requirement:</strong> Support calculations must account for fault current forces
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 text-elec-yellow mb-1">Installation Quality Control and Documentation</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Installation quality standards:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Load distribution: Stagger heavy cables, avoid point loading</li>
                      <li>Segregation requirements: 50mm minimum between power and data cables</li>
                      <li>Accessibility: 150mm minimum clearance for future maintenance</li>
                      <li>Visual inspection: Check before concealment, photograph defects</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Documentation and compliance:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Installation records: Support types, spacings, loading calculations</li>
                      <li>Inspection certificates: Pre-energisation testing requirements</li>
                      <li>Warranty compliance: Follow manufacturer installation guidelines</li>
                      <li>Maintenance access: Document support access points and requirements</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Compliance standard:</strong> Installation must maintain cable current ratings
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Separator className="my-6" />

          {/* Compliance and Standards */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Compliance with BS 7671 and Industry Standards</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Legal and technical compliance ensures safety and maintains equipment warranties:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 text-elec-yellow mb-1">BS 7671 Regulatory Requirements</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Specific regulation compliance:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Regulation 522.6: Cables protected from damage under normal service conditions</li>
                      <li>Regulation 522.8: Mechanical damage protection during installation and service</li>
                      <li>Section 523: Current-carrying capacity not compromised by installation damage</li>
                      <li>Section 526: Electrical connections not stressed by installation procedures</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Manufacturer datasheet compliance:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Bend radius specifications: Typically 6-15× cable overall diameter</li>
                      <li>Pulling tension limits: Usually 7-10N/mm² for copper conductors</li>
                      <li>Environmental operating ranges: Temperature, humidity, chemical exposure</li>
                      <li>Installation procedures: Specific handling and support requirements</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Legal requirement:</strong> Installation must comply with BS 7671 for certification
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Enhanced Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Real-World Example: Industrial Cable Tray Damage Incident</h2>
          
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-4">
            <div>
              <h3 className="font-semibold text-white mb-2">The Incident</h3>
              <p className="text-xs sm:text-sm text-white mb-3">
                During a major industrial installation, a team was installing 50mm² 4-core SWA cables in a 100-metre cable tray run. To save time, they decided to pull all cables in one operation without using cable rollers or protective measures.
              </p>
              <p className="text-xs sm:text-sm text-white">
                The combined weight (8kg/metre per cable) and friction against the sharp aluminium tray edges caused severe abrasion damage. The pulling force exceeded 3000N, well above the 1500N manufacturer limit.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Discovery and Cost Impact</h3>
              <p className="text-xs sm:text-sm text-white mb-3">
                During final inspection before commissioning, severe damage was discovered:
              </p>
              <ul className="text-xs sm:text-sm text-white space-y-1">
                <li>• 15 cables with sheath damage {'>'}25% thickness</li>
                <li>• 3 cables with exposed steel wire armour</li>
                <li>• Direct costs: £12,000 cable replacement + £8,000 labour</li>
                <li>• Indirect costs: 2-week project delay + client penalties</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-2">Prevention Analysis</h3>
            <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <p className="font-medium text-white mb-1">Required Prevention</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• Cable rollers every 5m: £300</li>
                  <li>• Pulling lubricant: £50</li>
                  <li>• Protective bushes: £150</li>
                  <li>• <strong>Total: £500</strong></li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Actual Remedial Cost</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• Cable replacement: £12,000</li>
                  <li>• Additional labour: £8,000</li>
                  <li>• Project delays: £15,000</li>
                  <li>• <strong>Total: £35,000</strong></li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Return on Investment</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• Prevention investment: £500</li>
                  <li>• Damage avoided: £35,000</li>
                  <li>• <strong>ROI: 6,900%</strong></li>
                  <li>• Risk reduction: 99.8%</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Enhanced FAQ */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-white mb-2">Q: Are cable cleats always necessary for electrical installations?</h3>
              <p className="text-xs sm:text-sm text-white">
                <strong>A:</strong> Yes, cable cleats are required for most fixed installations to prevent movement during fault conditions (short-circuit forces) and provide mechanical support. However, they must be installed correctly to avoid crushing. Use torque-controlled installation (typically 2-4Nm for M6 fixings) and appropriate cleat materials for the cable type (polymer-lined for PVC cables).
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-2">Q: Can damaged cable sheathing be repaired with electrical tape?</h3>
              <p className="text-xs sm:text-sm text-white">
                <strong>A:</strong> Only minor superficial damage ({'<'}10% sheath thickness) can be temporarily repaired with appropriate insulating tape or heat-shrink sleeves. Deep cuts, exposed conductors, or damaged armouring usually require complete cable replacement. Always consult manufacturer guidelines and consider long-term reliability and warranty implications.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-2">Q: How do I determine the correct bend radius for any cable type?</h3>
              <p className="text-xs sm:text-sm text-white">
                <strong>A:</strong> Always refer to the manufacturer's datasheet first. Bend radius is typically expressed as multiples of cable overall diameter: PVC cables (6× for installation, 4× fixed), XLPE cables (8× installation, 6× fixed), SWA cables (12× installation, 8× fixed). For special applications or multi-core cables, specific manufacturer guidance supersedes general rules.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-2">Q: What should I do if pulling tension limits are exceeded during installation?</h3>
              <p className="text-xs sm:text-sm text-white">
                <strong>A:</strong> Stop the pull immediately, release tension carefully, and inspect the cable for damage. Reassess the installation method - consider using pulling lubricant (can reduce tension by 60-80%), additional cable rollers, or breaking the pull into shorter sections. Document any tension exceedance for quality records and warranty purposes.
              </p>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Summary</h2>
          <p className="text-xs sm:text-sm text-white leading-relaxed">
            Preventing cable damage during installation requires comprehensive planning, correct protective equipment, and strict adherence to manufacturer specifications and BS 7671 requirements. The key elements include proper storage and handling procedures, mechanical protection during pulling operations, correct support system design, and environmental control. Taking preventive measures from the start avoids electrical faults, costly rework, safety hazards, and warranty issues while ensuring long-term system reliability and compliance with electrical installation standards.
          </p>
        </Card>

        {/* Quiz */}
        <div className="mb-8">
          <Quiz questions={quizQuestions} title="Section 4.4.5 Quiz" />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-white/10">
          <Link to="../4-4">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Previous: Cable Pulling Techniques
            </Button>
          </Link>
          <Link to="../4-6">
            <Button className="flex items-center gap-2">
              Next: Section 4.6
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Module4Section4_5;