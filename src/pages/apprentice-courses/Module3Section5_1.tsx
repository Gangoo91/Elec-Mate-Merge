import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  Thermometer,
  Droplets,
  Zap,
  AlertTriangle,
  CheckCircle,
  FileText,
  Shield,
  Wind,
  Mountain,
} from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE =
  "Understanding External Influences (BS 7671 Overview) - Module 3.5.1 | Level 2 Electrical Course";
const DESCRIPTION =
  "Master BS 7671 external influence classification codes, environmental assessment, and their impact on electrical installation design and equipment selection.";

// Quiz questions for the end of the page
const quizQuestions = [
  {
    id: 1,
    question:
      "In BS 7671, what does the first letter of an external influence code represent?",
    options: [
      "The degree of severity",
      "The general category of influence",
      "The size of the cable",
      "The type of fuse required",
    ],
    correctAnswer: 1,
    explanation:
      "The first letter represents the general category of influence (A = environmental, B = utilisation, C = construction).",
  },
  {
    id: 2,
    question: "What does AD4 mean?",
    options: [
      "No water present",
      "Water splashes present",
      "Water jets present",
      "High humidity only",
    ],
    correctAnswer: 1,
    explanation:
      "AD4 indicates the presence of water splashes, commonly found in kitchens, laundries, and some outdoor areas.",
  },
  {
    id: 3,
    question: "True or False: All installations have at least one external influence classification.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. Even 'normal' environments have influence ratings, such as AD1 (no significant presence of water).",
  },
  {
    id: 4,
    question: "Give one example of a utilisation-related influence.",
    options: [
      "Temperature variation",
      "Mechanical stress and vibration",
      "Presence of water",
      "Building material type",
    ],
    correctAnswer: 1,
    explanation:
      "Utilisation influences (B category) include mechanical stress, vibration, movement of cables, and impact risks.",
  },
  {
    id: 5,
    question: "Which BS 7671 category covers corrosive substances?",
    options: ["AD", "AF", "BA", "CA"],
    correctAnswer: 1,
    explanation:
      "AF covers the presence of corrosive or polluting substances in the environment.",
  },
  {
    id: 6,
    question: "Why should influence codes be documented?",
    options: [
      "For warranty claims",
      "For compliance and future maintenance reference",
      "To make the installation look professional",
      "For cable colour coding",
    ],
    correctAnswer: 1,
    explanation:
      "BS 7671 requires that design decisions consider external influences, and this must be documented for compliance and future reference.",
  },
  {
    id: 7,
    question: "What might happen if a standard accessory is used in a high-humidity environment?",
    options: [
      "Better performance",
      "Premature failure due to corrosion",
      "Increased efficiency",
      "No effect",
    ],
    correctAnswer: 1,
    explanation:
      "Standard accessories in high-humidity environments can suffer premature failure due to corrosion or moisture ingress.",
  },
  {
    id: 8,
    question: "Give one example of a 'construction of premises' influence.",
    options: [
      "Water presence",
      "Ceiling height and wall material",
      "Temperature variation",
      "Mechanical vibration",
    ],
    correctAnswer: 1,
    explanation:
      "Construction influences (C category) include ceiling height, wall material, building layout, and structural features.",
  },
];

// Quick knowledge check questions
const quickCheckQuestions = [
  {
    id: "influence-code",
    question:
      "In BS 7671, what does the second letter in an external influence code represent?",
    options: [
      "The severity level",
      "The nature of the influence",
      "The cable type required",
      "The protection method",
    ],
    correctIndex: 1,
    explanation:
      "The second letter represents the nature of the influence (e.g., D = presence of water, F = corrosive substances).",
  },
  {
    id: "environmental-factor",
    question: "Which of these is an environmental factor that counts as an external influence?",
    options: [
      "Cable installation method",
      "Circuit protection rating",
      "Ambient temperature variation",
      "Electrical load type",
    ],
    correctIndex: 2,
    explanation:
      "Ambient temperature variation is an environmental factor (AA series) that significantly affects electrical installations.",
  },
  {
    id: "classification-importance",
    question: "Why is it important to classify external influences before installation?",
    options: [
      "To reduce material costs",
      "To ensure equipment and cable selection is appropriate",
      "To speed up installation time",
      "To simplify testing procedures",
    ],
    correctIndex: 1,
    explanation:
      "Proper classification ensures that equipment, cables, and protective measures are suitable for the environmental conditions they will face.",
  },
];

export default function Module3Section5_1() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3.5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-card">
              <Eye className="w-6 h-6 text-foreground" />
            </div>
            <Badge
              variant="outline"
              className="border-emerald-500/30 text-emerald-400"
            >
              Section 3.5.1
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Understanding External Influences (BS 7671 Overview)
          </h1>
          <p className="text-muted-foreground">
            Master BS 7671 external influence classification codes, environmental assessment, and their critical impact on electrical installation design and equipment selection.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Electrical installations face environmental and operational challenges.</li>
                <li>BS 7671 requires assessment of external influences before equipment selection.</li>
                <li>Three-part coding system classifies environmental conditions.</li>
                <li>Proper assessment ensures safety, compliance, and equipment longevity.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Environmental conditions, operational factors, building characteristics.</li>
                <li><strong>Use:</strong> BS 7671 classification codes; appropriate equipment selection.</li>
                <li><strong>Check:</strong> Temperature, humidity, corrosion risk, mechanical stress.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning Outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
            <li>Define "external influence" in the context of BS 7671.</li>
            <li>Identify the three main categories of external influences.</li>
            <li>Interpret BS 7671 influence codes and apply them to design and installation decisions.</li>
            <li>Explain why assessing environmental conditions is essential for compliance and safety.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content / Learning</h2>

          {/* 1. Definition of External Influences */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5" /> 1. Definition of External Influences - Comprehensive Overview
            </h3>
            
            <div className="mb-6">
              <h4 className="font-medium text-foreground mb-3">What Constitutes an External Influence</h4>
              <div className="p-4 bg-card border border-border/30 rounded-lg mb-4">
                <p className="text-xs sm:text-sm text-foreground mb-3">
                  <strong>BS 7671 Definition:</strong> External influences are any environmental or operational factors that can affect the safety, performance, and durability of an electrical installation.
                </p>
                <p className="text-xs sm:text-sm text-foreground">
                  These influences must be identified and assessed during the design phase to ensure appropriate equipment selection, installation methods, and protective measures.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-card border border-amber-400/30 rounded-lg">
                  <h5 className="font-medium text-amber-400 mb-2">Environmental Factors</h5>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Thermometer className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Temperature extremes:</strong> -40°C to +70°C operating ranges</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Droplets className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Humidity and moisture:</strong> Condensation, direct water contact, splashing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Wind className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Foreign bodies:</strong> Dust, debris, particulate matter ingress</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Chemical exposure:</strong> Corrosive substances, salt spray, cleaning agents</span>
                    </li>
                  </ul>
                </div>
                <div className="p-4 bg-card border border-border/30 rounded-lg">
                  <h5 className="font-medium text-emerald-400 mb-2">Operational Factors</h5>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Mountain className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Mechanical stress:</strong> Vibration, impact, cable movement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Electromagnetic interference:</strong> RF fields, harmonic distortion</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Fire risk factors:</strong> Combustible materials, ignition sources</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Access limitations:</strong> Maintenance constraints, safety requirements</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-foreground mb-3">Impact on Installation Design</h4>
              <div className="space-y-3">
                <div className="p-3 bg-card border border-border/30 rounded-lg">
                  <h5 className="font-medium text-emerald-400 mb-2">Equipment Selection Criteria</h5>
                  <ul className="space-y-1 text-sm">
                    <li>• <strong>IP ratings:</strong> Ingress protection against solids and liquids</li>
                    <li>• <strong>Material compatibility:</strong> Corrosion resistance, UV stability</li>
                    <li>• <strong>Temperature ratings:</strong> Operating and storage temperature ranges</li>
                    <li>• <strong>Mechanical strength:</strong> Impact resistance (IK codes)</li>
                    <li>• <strong>Fire performance:</strong> Material flammability and toxicity ratings</li>
                  </ul>
                </div>
                <div className="p-3 bg-card border border-green-400/30 rounded-lg">
                  <h5 className="font-medium text-green-400 mb-2">Installation Method Considerations</h5>
                  <ul className="space-y-1 text-sm">
                    <li>• <strong>Cable routing:</strong> Protection from physical damage and environmental exposure</li>
                    <li>• <strong>Containment systems:</strong> Appropriate material selection and sealing</li>
                    <li>• <strong>Support methods:</strong> Vibration isolation, expansion compensation</li>
                    <li>• <strong>Access provisions:</strong> Maintenance and inspection requirements</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[0]} />
          <Separator className="my-6" />

          {/* 2. BS 7671 Classification System */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5" /> 2. BS 7671 Classification System - Detailed Code Structure
            </h3>
            
            <div className="mb-6">
              <h4 className="font-medium text-foreground mb-3">Three-Part Coding System Explained</h4>
              <div className="p-4 bg-card border border-border/20 rounded-lg mb-4">
                <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-400 mb-2">A</div>
                    <h5 className="font-medium text-foreground mb-1">First Letter</h5>
                    <p className="text-xs text-muted-foreground">General Category</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-400 mb-2">D</div>
                    <h5 className="font-medium text-foreground mb-1">Second Letter</h5>
                    <p className="text-xs text-muted-foreground">Nature of Influence</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-400 mb-2">3</div>
                    <h5 className="font-medium text-foreground mb-1">Number</h5>
                    <p className="text-xs text-muted-foreground">Severity Level</p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-card border border-border/30 rounded-lg">
                  <p className="text-sm text-center"><strong>Example: AD3</strong> = Environmental (A) + Water presence (D) + Splashing level (3)</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-card border border-border/30 rounded-lg">
                  <h5 className="font-medium text-emerald-400 mb-3">Category A: Environmental Conditions</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="font-medium text-foreground mb-2">AA - Ambient Temperature</h6>
                      <ul className="space-y-1 text-sm">
                        <li>• AA1: -60°C to +5°C (cold storage)</li>
                        <li>• AA2: -40°C to +5°C (unheated buildings)</li>
                        <li>• AA3: -25°C to +5°C (heated buildings)</li>
                        <li>• AA4: -5°C to +40°C (normal conditions)</li>
                        <li>• AA5: +5°C to +40°C (heated areas)</li>
                        <li>• AA6: +5°C to +60°C (hot areas)</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-medium text-foreground mb-2">AD - Presence of Water</h6>
                      <ul className="space-y-1 text-sm">
                        <li>• AD1: Negligible (dry locations)</li>
                        <li>• AD2: Dripping (condensation)</li>
                        <li>• AD3: Splashing water</li>
                        <li>• AD4: Spraying water</li>
                        <li>• AD5: Jetting water</li>
                        <li>• AD6: Waves/flooding</li>
                        <li>• AD7: Immersion</li>
                        <li>• AD8: Submersion</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-card border border-green-400/30 rounded-lg">
                  <h5 className="font-medium text-green-400 mb-3">Category B: Utilisation Conditions</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="font-medium text-foreground mb-2">BA - Mechanical Stress</h6>
                      <ul className="space-y-1 text-sm">
                        <li>• BA1: Low severity (fixed equipment)</li>
                        <li>• BA2: Medium severity (portable equipment)</li>
                        <li>• BA3: High severity (rough handling)</li>
                        <li>• BA4: Very high (mobile equipment)</li>
                        <li>• BA5: Extreme (severe impact risk)</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-medium text-foreground mb-2">BB - Impact</h6>
                      <ul className="space-y-1 text-sm">
                        <li>• BB1: Low energy (0.15J - AG1)</li>
                        <li>• BB2: Medium energy (0.35J - AG2)</li>
                        <li>• BB3: High energy (0.5J - AG3)</li>
                        <li>• BB4: Very high (2J - AG4)</li>
                        <li>• BB5: Extreme (&gt;2J - AG5)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-card border border-border/30 rounded-lg">
                  <h5 className="font-medium text-emerald-400 mb-3">Category C: Construction of Buildings</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="font-medium text-foreground mb-2">CA - Construction Materials</h6>
                      <ul className="space-y-1 text-sm">
                        <li>• CA1: Non-combustible</li>
                        <li>• CA2: Combustible</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-medium text-foreground mb-2">CB - Building Design</h6>
                      <ul className="space-y-1 text-sm">
                        <li>• CB1: Negligible fire risk</li>
                        <li>• CB2: Low fire risk</li>
                        <li>• CB3: Medium fire risk</li>
                        <li>• CB4: High fire risk</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[1]} />
          <Separator className="my-6" />

          {/* 3. Practical Application and Assessment */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" /> 3. Practical Application and Environmental Assessment
            </h3>

            <div className="mb-6">
              <h4 className="font-medium text-foreground mb-3">Site Assessment Methodology</h4>
              <div className="space-y-4">
                <div className="p-4 bg-card border border-amber-400/30 rounded-lg">
                  <h5 className="font-medium text-amber-400 mb-3">Step-by-Step Assessment Process</h5>
                  <ol className="list-decimal pl-6 space-y-2 text-sm">
                    <li><strong>Initial site survey:</strong> Document all environmental conditions and operational requirements</li>
                    <li><strong>Risk identification:</strong> Identify potential hazards and stress factors</li>
                    <li><strong>Code classification:</strong> Apply appropriate BS 7671 influence codes</li>
                    <li><strong>Equipment specification:</strong> Select suitable equipment based on classifications</li>
                    <li><strong>Installation method selection:</strong> Choose appropriate installation techniques</li>
                    <li><strong>Documentation:</strong> Record all decisions and justifications</li>
                    <li><strong>Periodic review:</strong> Reassess conditions during installation lifecycle</li>
                  </ol>
                </div>

                <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                  <div className="p-3 bg-card border border-border/30 rounded-lg">
                    <h5 className="font-medium text-emerald-400 mb-2">Environmental Monitoring</h5>
                    <ul className="space-y-1 text-xs">
                      <li>• Temperature logging over seasons</li>
                      <li>• Humidity measurement and trends</li>
                      <li>• Chemical exposure assessment</li>
                      <li>• UV radiation levels</li>
                      <li>• Salt spray concentration</li>
                      <li>• Air quality and pollutants</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-card border border-green-400/30 rounded-lg">
                    <h5 className="font-medium text-green-400 mb-2">Operational Analysis</h5>
                    <ul className="space-y-1 text-xs">
                      <li>• Mechanical stress evaluation</li>
                      <li>• Vibration frequency analysis</li>
                      <li>• Impact risk assessment</li>
                      <li>• Access requirements</li>
                      <li>• Maintenance constraints</li>
                      <li>• Emergency evacuation needs</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-card border border-border/30 rounded-lg">
                    <h5 className="font-medium text-emerald-400 mb-2">Structural Considerations</h5>
                    <ul className="space-y-1 text-xs">
                      <li>• Building material composition</li>
                      <li>• Fire load assessment</li>
                      <li>• Structural movement</li>
                      <li>• Ceiling height restrictions</li>
                      <li>• Wall construction type</li>
                      <li>• Foundation considerations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-foreground mb-3">Common Application Examples</h4>
              <div className="space-y-3">
                <div className="p-4 bg-card border border-border/20 rounded-lg">
                  <h5 className="font-medium text-foreground mb-2">Commercial Kitchen Installation</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="font-medium text-foreground mb-2">Influence Classifications</h6>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong>AA6:</strong> High temperature from cooking equipment</li>
                        <li>• <strong>AD4:</strong> Water spraying from cleaning</li>
                        <li>• <strong>AF2:</strong> Grease and cleaning chemical exposure</li>
                        <li>• <strong>BA3:</strong> Movement of heavy equipment</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-medium text-foreground mb-2">Equipment Requirements</h6>
                      <ul className="space-y-1 text-sm">
                        <li>• IP65-rated accessories minimum</li>
                        <li>• Stainless steel enclosures</li>
                        <li>• Heat-resistant cable types</li>
                        <li>• Enhanced RCD protection</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-card border border-border/20 rounded-lg">
                  <h5 className="font-medium text-foreground mb-2">Coastal Industrial Facility</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="font-medium text-foreground mb-2">Influence Classifications</h6>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong>AF3:</strong> High salt concentration</li>
                        <li>• <strong>AD5:</strong> Storm water exposure</li>
                        <li>• <strong>BB4:</strong> High impact from machinery</li>
                        <li>• <strong>AC2:</strong> High altitude effects</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-medium text-foreground mb-2">Protection Measures</h6>
                      <ul className="space-y-1 text-sm">
                        <li>• Marine-grade aluminium enclosures</li>
                        <li>• Sacrificial anodes for cathodic protection</li>
                        <li>• Sealed cable glands and joints</li>
                        <li>• Regular inspection and maintenance</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[2]} />
          <Separator className="my-6" />

          {/* 4. Documentation and Compliance */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5" /> 4. Documentation Requirements and Compliance Standards
            </h3>

            <div className="space-y-4">
              <div className="p-4 bg-card border border-border/30 rounded-lg">
                <h5 className="font-medium text-emerald-400 mb-3">BS 7671 Documentation Requirements</h5>
                <ul className="space-y-2 text-sm">
                  <li><strong>Design documentation:</strong> All external influence assessments must be recorded</li>
                  <li><strong>Installation certificates:</strong> Reference to relevant influence codes</li>
                  <li><strong>Operation and maintenance manuals:</strong> Environmental limitations and requirements</li>
                  <li><strong>Periodic inspection reports:</strong> Changes in environmental conditions</li>
                  <li><strong>Risk assessments:</strong> Ongoing evaluation of influence factors</li>
                </ul>
              </div>

              <div className="p-4 bg-card border border-green-400/30 rounded-lg">
                <h5 className="font-medium text-green-400 mb-3">Quality Assurance Procedures</h5>
                <ul className="space-y-2 text-sm">
                  <li><strong>Design review:</strong> Independent verification of influence classifications</li>
                  <li><strong>Material verification:</strong> Confirmation of equipment suitability</li>
                  <li><strong>Installation inspection:</strong> Compliance with specified methods</li>
                  <li><strong>Commissioning tests:</strong> Performance under actual conditions</li>
                  <li><strong>Handover documentation:</strong> Complete records for end user</li>
                </ul>
              </div>
            </div>
          </section>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Real-World Case Studies</h2>
          <div className="space-y-4">
            <div className="p-4 bg-card border border-amber-400/30 rounded-lg">
              <h3 className="font-medium text-amber-400 mb-3">Case Study 1: Coastal Café Installation Failure</h3>
              <p className="text-xs sm:text-sm text-foreground mb-3">
                <strong>Situation:</strong> Standard outdoor sockets were installed at a coastal café without considering the high salt content in the air (AF3 – corrosive environment).
              </p>
              <p className="text-xs sm:text-sm text-foreground mb-3">
                <strong>Outcome:</strong> Within six months, severe corrosion caused electrical failures, tripping RCDs and creating safety hazards.
              </p>
              <p className="text-xs sm:text-sm text-foreground">
                <strong>Solution:</strong> Replacement with marine-grade stainless steel fittings (316L grade), IP65-rated enclosures, and enhanced corrosion protection resolved the issues and provided long-term reliability.
              </p>
            </div>

            <div className="p-4 bg-card border border-border/30 rounded-lg">
              <h3 className="font-medium text-emerald-400 mb-3">Case Study 2: Industrial Vibration Problems</h3>
              <p className="text-xs sm:text-sm text-foreground mb-3">
                <strong>Situation:</strong> Cable terminations in a manufacturing facility were failing due to constant vibration (BA4 conditions) from heavy machinery.
              </p>
              <p className="text-xs sm:text-sm text-foreground mb-3">
                <strong>Analysis:</strong> Standard compression glands and rigid conduit systems couldn't accommodate the mechanical stress.
              </p>
              <p className="text-xs sm:text-sm text-foreground">
                <strong>Solution:</strong> Installation of flexible conduit systems, vibration-resistant cable glands, and spring-loaded support systems eliminated the failures.
              </p>
            </div>
          </div>
        </Card>

        {/* Enhanced FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="p-4 bg-card border border-border/20 rounded-lg">
              <h3 className="font-medium text-foreground mb-2">Q: Do I need to document external influences in the installation certificate?</h3>
              <p className="text-xs sm:text-sm text-foreground">
                A: Yes — BS 7671 requires that design decisions consider external influences, and this must be recorded in the design section of the electrical installation certificate for compliance and future reference.
              </p>
            </div>
            <div className="p-4 bg-card border border-border/20 rounded-lg">
              <h3 className="font-medium text-foreground mb-2">Q: Are all installations affected by external influences?</h3>
              <p className="text-xs sm:text-sm text-foreground">
                A: Yes — even 'normal' environments have influence ratings (e.g., AD1 = no significant presence of water, AA4 = normal temperature range). Every installation must be classified.
              </p>
            </div>
            <div className="p-4 bg-card border border-border/20 rounded-lg">
              <h3 className="font-medium text-foreground mb-2">Q: Can the classification change over time?</h3>
              <p className="text-xs sm:text-sm text-foreground">
                A: Yes — building extensions, change of use, environmental changes, or operational modifications can alter the influence category. Regular reassessment is recommended.
              </p>
            </div>
            <div className="p-4 bg-card border border-border/20 rounded-lg">
              <h3 className="font-medium text-foreground mb-2">Q: How often should external influence assessments be reviewed?</h3>
              <p className="text-xs sm:text-sm text-foreground">
                A: Formally during periodic inspection and testing (typically 1-5 years depending on installation type), and whenever significant changes occur to the building use or environment.
              </p>
            </div>
            <div className="p-4 bg-card border border-border/20 rounded-lg">
              <h3 className="font-medium text-foreground mb-2">Q: What happens if I use equipment with insufficient rating?</h3>
              <p className="text-xs sm:text-sm text-foreground">
                A: Equipment may fail prematurely, creating safety hazards and non-compliance with BS 7671. Insurance claims may be rejected, and legal liability could arise from inadequate design.
              </p>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Summary</h2>
          <p className="text-foreground/90">
            External influences, as defined by BS 7671, are environmental and operational factors that impact electrical installations. Understanding the three-category classification system and applying appropriate codes in design and installation ensures safety, compliance, and long-term durability. Proper assessment and documentation are essential for regulatory compliance and professional practice.
          </p>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Quiz (8 Questions)</h2>
          <Quiz questions={quizQuestions} />
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-border/20">
          <Button variant="outline" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3.5
            </Link>
          </Button>
          <Button asChild>
            <Link to="../5-2">
              Next: Subsection 5.2
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}