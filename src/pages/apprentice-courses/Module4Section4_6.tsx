import { ArrowLeft, ArrowRight, Zap, Target, CheckCircle, AlertTriangle, Eye, TrendingUp, Shield, Settings, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Earthing of Metallic Containment Systems | Level 2 Electrical Course";
const DESCRIPTION = "Master professional earthing techniques for metallic containment systems. Learn BS 7671 requirements, CPC selection, testing procedures, and fault protection for safe electrical installations.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the main reason for earthing metallic containment?",
    options: ["To improve aesthetics", "To prevent corrosion", "To protect against electric shock", "To reduce installation cost"],
    correctIndex: 2,
    explanation: "Earthing metallic containment protects against electric shock by providing a low-resistance path for fault current to operate protective devices quickly."
  },
  {
    id: 2,
    question: "True or False: All metallic containment can automatically be used as a CPC.",
    options: ["True", "False"],
    correctIndex: 1,
    explanation: "False. Containment can only act as a CPC if it meets specific requirements for continuity, cross-sectional area, and mechanical robustness."
  },
  {
    id: 3,
    question: "What tool is used to check continuity in metallic containment?",
    options: ["Multimeter", "Low-resistance ohmmeter", "Insulation tester", "Voltage indicator"],
    correctIndex: 1,
    explanation: "A low-resistance ohmmeter is specifically designed to measure the very low resistance values required for earth continuity testing."
  }
];

const Module4Section4_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the main reason for earthing metallic containment?",
      options: [
        "To improve aesthetics",
        "To prevent corrosion",
        "To protect against electric shock",
        "To reduce installation cost"
      ],
      correctAnswer: 2,
      explanation: "Earthing metallic containment protects against electric shock by providing a low-resistance path for fault current to operate protective devices quickly."
    },
    {
      id: 2,
      question: "True or False: All metallic containment can automatically be used as a CPC.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. Containment can only act as a CPC if it meets specific requirements for continuity, cross-sectional area, and mechanical robustness."
    },
    {
      id: 3,
      question: "Name two methods of maintaining electrical continuity.",
      options: [
        "Earth straps and earth clamps",
        "Cable ties and tape",
        "Screws and bolts",
        "Paint and coating"
      ],
      correctAnswer: 0,
      explanation: "Earth straps, earth clamps, and internal earth links are proper methods for maintaining electrical continuity across joints and connections."
    },
    {
      id: 4,
      question: "What tool is used to check continuity?",
      options: [
        "Multimeter",
        "Low-resistance ohmmeter",
        "Insulation tester",
        "Voltage indicator"
      ],
      correctAnswer: 1,
      explanation: "A low-resistance ohmmeter is specifically designed to measure the very low resistance values required for earth continuity testing."
    },
    {
      id: 5,
      question: "When should you fit a separate CPC alongside containment?",
      options: [
        "Always for safety",
        "If containment is mechanically weak or has poor conductivity",
        "Only for outdoor installations",
        "When using steel containment"
      ],
      correctAnswer: 1,
      explanation: "A separate CPC is required when containment is mechanically weak, has mixed materials, or poor conductivity that doesn't meet BS 7671 requirements."
    },
    {
      id: 6,
      question: "Why should joint surfaces be cleaned before assembly?",
      options: [
        "For appearance only",
        "To ensure good metal-to-metal contact",
        "To prevent corrosion",
        "To reduce installation time"
      ],
      correctAnswer: 1,
      explanation: "Cleaning joint surfaces removes paint, rust, and debris to ensure good metal-to-metal contact for electrical continuity."
    },
    {
      id: 7,
      question: "What can happen if a painted surface interrupts continuity?",
      options: [
        "Improved appearance",
        "Better corrosion protection",
        "Increased resistance, breaking the CPC path",
        "Reduced installation cost"
      ],
      correctAnswer: 2,
      explanation: "Paint acts as an insulator, increasing resistance and potentially breaking the earth continuity path, creating a safety hazard."
    },
    {
      id: 8,
      question: "Which regulation provides guidance on using containment as a CPC?",
      options: ["BS 6423", "BS 7671", "BS 5839", "BS 7909"],
      correctAnswer: 1,
      explanation: "BS 7671 provides specific requirements and guidance for using metallic containment as a circuit protective conductor (CPC)."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top header bar */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
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
            <div className="p-2 rounded-lg bg-card">
              <Zap className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              Section 4.4.6
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Earthing of Metallic Containment Systems
          </h1>
          <p className="text-muted-foreground">
            Master professional earthing techniques for metallic containment systems to ensure fault protection, comply with BS 7671 requirements, and maintain electrical safety in installations.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Metallic containment can become live during faults, creating shock hazards.</li>
                <li>Proper earthing provides fault current paths and enables protective device operation.</li>
                <li>Containment can act as CPC only if it meets specific BS 7671 requirements.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Painted joints, flexible couplings, mixed materials, poor continuity.</li>
                <li><strong>Use:</strong> Earth clamps, bonding straps, internal links, continuity testers.</li>
                <li><strong>Check:</strong> Joint conductivity, resistance values, mechanical integrity.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
            <li>Explain the fundamental safety requirements for earthing metallic containment systems in electrical installations.</li>
            <li>Identify when containment systems can act as circuit protective conductors and when separate CPCs are required.</li>
            <li>Select and install appropriate earthing conductors, clamps, and bonding accessories for different containment types.</li>
            <li>Perform comprehensive continuity testing on metallic containment systems using appropriate test equipment.</li>
            <li>Apply BS 7671 regulations and manufacturer guidance for compliant earthing arrangement design and installation.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content</h2>

          {/* Purpose and Legal Requirements */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Purpose and Legal Requirements for Earthing Metallic Containment</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Metallic containment earthing is a critical safety measure required by law and electrical standards:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Safety Protection Functions</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Fault current management:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Low-resistance path: {'<'}0.5Ω for most installations, enables rapid fault clearing</li>
                      <li>Protective device operation: Ensures MCBs/RCDs operate within required disconnection times</li>
                      <li>Touch voltage limitation: Maintains safe potential differences {'<'}50V during faults</li>
                      <li>Step/touch potential control: Prevents dangerous voltage gradients around equipment</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Legal and compliance requirements:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>BS 7671 Regulation 411.3.1.2: All exposed-conductive-parts must be earthed</li>
                      <li>Electricity at Work Regulations 1989: Duty to prevent danger from electrical equipment</li>
                      <li>Building Regulations Part P: Compliance with electrical safety standards</li>
                      <li>Insurance requirements: Valid electrical certificates for property cover</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Critical requirement:</strong> Earth fault loop impedance must ensure protective device operation
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Fault Scenarios and Risk Assessment</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Common fault conditions:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Cable insulation failure: Direct contact with metallic containment surface</li>
                      <li>Termination faults: Poor connections causing arcing to containment</li>
                      <li>Mechanical damage: Cable damage during installation exposing live conductors</li>
                      <li>Environmental degradation: Moisture ingress causing tracking to metallic parts</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Risk factors without proper earthing:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Electric shock: 240V potential on containment surfaces during faults</li>
                      <li>Fire hazard: Arc faults sustained without protective device operation</li>
                      <li>Equipment damage: Sustained fault conditions damaging expensive equipment</li>
                      <li>Legal liability: Non-compliance with safety regulations and standards</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Safety standard:</strong> Disconnection times: {'<'}0.4s for final circuits, {'<'}5s for distribution
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="purpose-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* CPC Requirements and Assessment */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">When Containment Can Act as Circuit Protective Conductor</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Containment can serve as CPC only when specific technical and mechanical criteria are met:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Cross-Sectional Area and Current Rating Requirements</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>BS 7671 Table 54.7 minimum CPC areas:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Line conductor ≤16mm²: CPC minimum 16mm² equivalent cross-section</li>
                      <li>Line conductor 16-35mm²: CPC minimum equal to line conductor area</li>
                      <li>Line conductor {'>'}35mm²: CPC minimum 50% of line conductor area</li>
                      <li>Fault current rating: Must withstand prospective fault current for disconnection time</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Containment cross-section calculations:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Steel conduit 20mm: 1.2mm wall = ~70mm² effective area (suitable for 6mm² circuits)</li>
                      <li>Trunking 50×50mm: 1.5mm wall = ~290mm² effective area (suitable for 35mm² circuits)</li>
                      <li>Cable tray: Calculate based on actual steel cross-section, not overall dimensions</li>
                      <li>Basket tray: Wire cross-section may limit application to smaller circuits</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Design requirement:</strong> Calculate containment thermal capacity using k-factor method
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Electrical Continuity and Joint Requirements</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Joint and connection standards:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Mechanical connections: Minimum 4 bolts per joint for trunking, torque to specification</li>
                      <li>Contact resistance: {'<'}5mΩ per joint when measured during installation</li>
                      <li>Surface preparation: Clean to bright metal, remove paint/oxidation at contact points</li>
                      <li>Environmental protection: Use corrosion-resistant bolts, consider galvanic compatibility</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Continuity verification procedures:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>End-to-end testing: Maximum resistance varies with circuit length and cross-section</li>
                      <li>Joint-by-joint testing: Individual joint resistance measurements for quality control</li>
                      <li>Load testing: High-current testing to verify thermal performance under fault conditions</li>
                      <li>Documentation: Record all measurements and joint details for maintenance records</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Quality standard:</strong> Re-test annually or after any containment modifications
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Mechanical Robustness and Environmental Suitability</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Mechanical integrity requirements:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Impact resistance: IK08 minimum for accessible areas, IK10 for industrial environments</li>
                      <li>Corrosion protection: Hot-dip galvanised or equivalent coating system for 25+ year life</li>
                      <li>Thermal cycling: Designed for temperature range without joint loosening</li>
                      <li>Vibration resistance: Secure fixing design to prevent fatigue failure of connections</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Environmental assessment criteria:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Moisture exposure: IP54 minimum for damp locations, IP65 for wet areas</li>
                      <li>Chemical exposure: Material compatibility with cleaning agents and process chemicals</li>
                      <li>UV exposure: Coating stability for outdoor installations over design life</li>
                      <li>Temperature extremes: Expansion joint design for thermal movement accommodation</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Assessment requirement:</strong> Environmental conditions must not compromise CPC function
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="cpc-requirements-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Separate CPC Requirements */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">When to Install Separate Circuit Protective Conductors</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Separate CPCs are mandatory when containment cannot meet the technical requirements:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-emerald-400 mb-1">Mechanical and Material Limitations</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Insufficient mechanical robustness:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Thin-wall conduit: {'<'}1.2mm wall thickness insufficient for large circuit CPCs</li>
                      <li>Lightweight trunking: Domestic-grade systems not rated for commercial fault currents</li>
                      <li>Flexible systems: Any containment with intentional flexibility requires separate CPC</li>
                      <li>Temporary installations: Portable systems require dedicated CPC for reliability</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Mixed material system issues:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Steel/aluminium joints: Galvanic corrosion leads to high resistance connections</li>
                      <li>Metal/plastic transitions: No continuity through non-conductive sections</li>
                      <li>Coated/uncoated interfaces: Paint or plating preventing reliable electrical contact</li>
                      <li>Different manufacturers: Joint compatibility issues affecting electrical performance</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Design rule:</strong> Any break in material continuity requires separate CPC provision
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-emerald-400 mb-1">Environmental and Maintenance Factors</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Corrosive environment impacts:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Marine environments: Salt spray causing rapid degradation of joint surfaces</li>
                      <li>Industrial chemicals: Process fluids attacking protective coatings and base metals</li>
                      <li>Agricultural settings: Ammonia and organic acids compromising electrical contacts</li>
                      <li>External weather exposure: UV, temperature cycling, and moisture affecting performance</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Maintenance accessibility issues:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Concealed joints: Inaccessible connections cannot be verified or maintained</li>
                      <li>High-level installations: Safety risks preventing regular inspection and testing</li>
                      <li>Process-critical areas: Downtime restrictions limiting maintenance opportunities</li>
                      <li>Specialist access requirements: Additional safety systems needed for maintenance</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Maintenance requirement:</strong> All CPC systems must allow safe periodic verification
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Separator className="my-6" />

          {/* Earthing Methods and Installation */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Professional Earthing Methods and Installation Techniques</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Proper installation techniques ensure reliable long-term performance and compliance:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-1">Earth Clamps and Bonding Conductor Selection</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Earth clamp specifications and installation:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Clamp rating: Minimum 25A fault current capacity for final circuits, 63A+ for submains</li>
                      <li>Material compatibility: Brass/bronze for steel containment, avoid aluminium/steel contact</li>
                      <li>Surface preparation: Clean 50×50mm area to bright metal, remove all coatings</li>
                      <li>Installation torque: 10-15Nm for M8 bolts, use calibrated torque wrench</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Bonding conductor sizing and installation:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Main bonding: 10mm² minimum for domestic, 16mm² minimum for commercial</li>
                      <li>Supplementary bonding: Equal to largest CPC in the circuit being protected</li>
                      <li>Route protection: Mechanical protection where subject to damage, minimum bend radius 6×diameter</li>
                      <li>Identification: Green/yellow sleeve full length, 'SAFETY ELECTRICAL CONNECTION' labels</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Installation standard:</strong> All bonding connections must be accessible for inspection
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-1">Earth Straps and Expansion Joint Management</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Flexible earth strap applications:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Expansion joints: Braided copper strap rated for thermal movement range</li>
                      <li>Vibrating equipment: Flexible connection maintaining earth continuity during operation</li>
                      <li>Hinged covers: Earth strap across all opening joints in trunking systems</li>
                      <li>Removable sections: Quick-disconnect earth links for maintenance access panels</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Earth strap specification and installation:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Current rating: Match or exceed the containment CPC current rating</li>
                      <li>Flexibility: Tinned copper braid minimum 25mm wide for reliability</li>
                      <li>Length calculation: Maximum movement + 50% safety factor for routing</li>
                      <li>Termination method: Crimped lugs with heat-shrink sealing, no soldered joints</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Quality requirement:</strong> Earth straps must withstand 100,000 movement cycles minimum
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-1">Internal Earth Links and Specialist Solutions</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Internal earth link systems:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Trunking earth links: Proprietary systems maintaining continuity across joints</li>
                      <li>Busbar earth systems: Continuous copper busbar for high-fault-current applications</li>
                      <li>Spring-loaded contacts: Automatic earth connection for modular trunking systems</li>
                      <li>Bolt-on earth bars: Retrofit solutions for existing installations lacking continuity</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Specialist earthing techniques:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Welded earth connections: Permanent low-resistance connections for critical applications</li>
                      <li>Exothermic welding: Superior connection reliability for outdoor/corrosive environments</li>
                      <li>Compression connections: High-pressure mechanical joints for aluminium containment</li>
                      <li>Earth monitoring systems: Continuous monitoring of earth circuit integrity</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Selection criteria:</strong> Choose method based on fault current, environment, and maintenance requirements
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="testing-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Testing and Verification */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Comprehensive Testing and Verification Procedures</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Systematic testing ensures containment earthing meets all safety and performance requirements:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-emerald-400 mb-1">Continuity Testing Standards and Procedures</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Test equipment specifications:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Low-resistance ohmmeter: 200mA ± 10% test current minimum, 1mΩ resolution</li>
                      <li>Calibration requirements: Annual calibration with UKAS traceable certificate</li>
                      <li>Test lead resistance: Compensated measurement to eliminate lead resistance errors</li>
                      <li>Environmental conditions: Dry conditions, temperature 15-25°C for accurate readings</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Testing methodology and acceptance criteria:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>End-to-end testing: Full containment length, compare with calculated values</li>
                      <li>Maximum resistance: (ρ × length)/cross-sectional area + joint resistances</li>
                      <li>Joint testing: Individual joint resistance {'<'}5mΩ for bolted, {'<'}2mΩ for welded</li>
                      <li>Load testing: High-current test to verify thermal performance (where applicable)</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Acceptance standard:</strong> Earth fault loop impedance must enable protective device operation
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-emerald-400 mb-1">Documentation and Compliance Verification</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Test record requirements:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Installation certificate: BS 7671 compliance, test results, and limitations</li>
                      <li>Test schedule: All measurement points, values, and pass/fail criteria</li>
                      <li>Containment schedule: Lengths, cross-sections, joint types, and earth arrangements</li>
                      <li>Maintenance requirements: Re-test intervals and inspection procedures</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Quality assurance and handover:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Independent verification: Third-party testing for critical or complex installations</li>
                      <li>Photographic records: Document earth connections, clamp installations, and test points</li>
                      <li>Training provision: Operate and maintain instructions for client personnel</li>
                      <li>Warranty conditions: Performance guarantees and maintenance requirements</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Legal requirement:</strong> Electrical Installation Certificate required for all new work
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Enhanced Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Real-World Example: Commercial Lighting Project Earth Continuity Failure</h2>
          
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">The Installation Issue</h3>
              <p className="text-xs sm:text-sm text-foreground mb-3">
                A contractor installed 200 metres of metallic trunking for a commercial lighting system. To improve appearance, the entire system was painted after installation, including all joint surfaces and mating faces.
              </p>
              <p className="text-xs sm:text-sm text-foreground mb-3">
                The painting broke electrical continuity at every joint, making the trunking unusable as a CPC. During testing, earth continuity resistance measured {'>'}10Ω instead of the required {'<'}0.5Ω.
              </p>
              <p className="text-xs sm:text-sm text-foreground">
                The installation failed electrical inspection and could not be certified for use.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Cost Impact and Resolution</h3>
              <p className="text-xs sm:text-sm text-foreground mb-3">
                <strong>Remedial work required:</strong>
              </p>
              <ul className="text-xs sm:text-sm text-foreground space-y-1 mb-3">
                <li>• Strip paint from all 50 joint interfaces</li>
                <li>• Install separate 4mm² CPC throughout system</li>
                <li>• Additional earth clamps and connections</li>
                <li>• Re-testing and certification</li>
              </ul>
              <p className="text-xs sm:text-sm text-foreground">
                <strong>Additional costs:</strong> £8,000 labour + £2,000 materials + 2-week delay
              </p>
            </div>
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-semibold text-foreground mb-2">Prevention Analysis and Best Practice</h3>
            <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <p className="font-medium text-foreground mb-1">Correct Procedure</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Clean joint surfaces before assembly</li>
                  <li>• Test continuity before painting</li>
                  <li>• Mask joint areas during painting</li>
                  <li>• Use earth links across painted joints</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Technical Solution</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Internal earth link kit: £300</li>
                  <li>• Additional testing time: £200</li>
                  <li>• Proper joint preparation: £500</li>
                  <li>• <strong>Total prevention: £1,000</strong></li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Learning Outcomes</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Plan earth continuity before decoration</li>
                  <li>• Test before concealment or finishing</li>
                  <li>• Use appropriate earth link systems</li>
                  <li>• <strong>ROI: 1,000% cost saving</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Enhanced FAQ */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Q: Can cable tray be used as a CPC in all installations?</h3>
              <p className="text-xs sm:text-sm text-foreground">
                <strong>A:</strong> Cable tray can be used as a CPC only if it meets BS 7671 requirements for cross-sectional area, continuity, and mechanical robustness. The manufacturer must also approve its use as a CPC. Ladder-type trays often lack sufficient cross-sectional area for larger circuits, while solid-bottom trays generally provide adequate capacity. Always calculate the effective steel cross-section and verify against the required CPC area for your specific circuit.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-2">Q: How can I check if joints maintain good electrical continuity?</h3>
              <p className="text-xs sm:text-sm text-foreground">
                <strong>A:</strong> Use a low-resistance ohmmeter with a test current of at least 200mA to measure resistance across each joint. Individual joint resistance should be {'<'}5mΩ for bolted connections and {'<'}2mΩ for welded connections. Test immediately after installation and annually thereafter. High resistance indicates poor contact due to corrosion, loose connections, or paint/coating interference.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-2">Q: What should I do if measured earth resistance is too high?</h3>
              <p className="text-xs sm:text-sm text-foreground">
                <strong>A:</strong> First, identify the source of high resistance through section-by-section testing. Clean and re-make poor joints, install bonding conductors or earth straps across high-resistance sections, or fit internal earth links. If containment resistance cannot be reduced sufficiently, install a separate CPC of appropriate size alongside the containment. Document all remedial work and re-test to verify compliance.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-2">Q: Are earth monitoring systems required for containment earthing?</h3>
              <p className="text-xs sm:text-sm text-foreground">
                <strong>A:</strong> Earth monitoring is not mandatory for standard installations but is recommended for critical applications such as hospitals, data centres, or hazardous areas. These systems continuously monitor earth circuit integrity and provide alarms if continuity is lost. They are particularly valuable where earthing system failure could cause serious safety hazards or operational disruption.
              </p>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Summary</h2>
          <p className="text-xs sm:text-sm text-foreground leading-relaxed">
            Earthing metallic containment systems is a fundamental safety requirement that protects against electric shock and enables proper fault protection. Whether the containment acts as the CPC or requires a separate conductor, electrical continuity must be established, verified through testing, and maintained throughout the installation's life. Proper earthing methods, quality installation techniques, and comprehensive testing ensure compliance with BS 7671 requirements and provide reliable protection against electrical faults. Regular inspection and maintenance of earth connections are essential for continued safety and performance.
          </p>
        </Card>

        {/* Quiz */}
        <div className="mb-8">
          <Quiz questions={quizQuestions} title="Section 4.4.6 Quiz" />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-border/20">
          <Link to="../4-5">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Previous: Preventing Cable Damage
            </Button>
          </Link>
          <Link to="..">
            <Button className="flex items-center gap-2">
              Next: Section 5
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Module4Section4_6;