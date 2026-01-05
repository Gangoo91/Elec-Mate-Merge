import { ArrowLeft, Eye, AlertTriangle, FileText, Shield, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section2_3 = () => {
  useSEO(
    "Checking Cable Routes, Depths, and Zones - Level 2 Electrical Installation",
    "Understanding BS 7671 requirements for cable routing, depth requirements, and safe zones in electrical installations"
  );

  // Quiz questions
  const quizQuestions = [
    {
      id: 1,
      question: "What is the maximum distance from the top of a wall that a cable can run in a horizontal zone?",
      options: [
        "100 mm",
        "150 mm",
        "200 mm",
        "250 mm"
      ],
      correctAnswer: 1,
      explanation: "BS 7671 specifies horizontal zones within 150 mm from the top of a wall or above an accessory."
    },
    {
      id: 2,
      question: "True or False: Cables can be run diagonally if concealed in plaster.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 1,
      explanation: "False - cables must not be run diagonally when concealed. They must follow safe zones."
    },
    {
      id: 3,
      question: "What is the minimum depth for a concealed cable without RCD protection?",
      options: [
        "30 mm",
        "40 mm",
        "50 mm",
        "More than 50 mm"
      ],
      correctAnswer: 3,
      explanation: "Cables must be buried more than 50 mm deep to avoid requiring additional RCD protection."
    },
    {
      id: 4,
      question: "Give one reason why diagonal runs are unsafe.",
      options: [
        "They cost more",
        "They increase the chance of accidental drilling",
        "They look unprofessional",
        "They take longer to install"
      ],
      correctAnswer: 1,
      explanation: "Diagonal runs are unsafe because they increase the chance of accidental drilling into cables."
    },
    {
      id: 5,
      question: "Which regulation sets out safe zones for cables?",
      options: [
        "BS 7671",
        "Building Regulations",
        "HSE Guidelines",
        "IET Guidance"
      ],
      correctAnswer: 0,
      explanation: "BS 7671 (IET Wiring Regulations) sets out the requirements for safe cable zones."
    },
    {
      id: 6,
      question: "What additional protection is required for cables buried less than 50 mm deep?",
      options: [
        "Extra insulation",
        "RCD or mechanical protection",
        "Warning labels",
        "Deeper burial"
      ],
      correctAnswer: 1,
      explanation: "Cables less than 50 mm deep require RCD protection or mechanical protection like conduit/trunking."
    },
    {
      id: 7,
      question: "Name one tool used to verify cable routes during inspection.",
      options: [
        "Multimeter",
        "Cable detector",
        "Insulation tester",
        "Earth loop tester"
      ],
      correctAnswer: 1,
      explanation: "Cable detectors are used to locate and verify cable routes during inspections."
    },
    {
      id: 8,
      question: "Where should cables be installed in relation to sockets and switches?",
      options: [
        "Diagonally from accessories",
        "Randomly positioned",
        "Directly above or below in vertical zones",
        "At 45-degree angles"
      ],
      correctAnswer: 2,
      explanation: "Cables should run directly above or below sockets and switches in vertical zones."
    },
    {
      id: 9,
      question: "What is one common mistake made when installing cable routes?",
      options: [
        "Using too much cable",
        "Running cables diagonally",
        "Installing too many cables",
        "Using wrong colour cables"
      ],
      correctAnswer: 1,
      explanation: "Running cables diagonally or outside safe zones is a common and dangerous mistake."
    },
    {
      id: 10,
      question: "Why is it important to follow cable zone rules?",
      options: [
        "To save money",
        "For aesthetic reasons",
        "To ensure safety and compliance",
        "To use less cable"
      ],
      correctAnswer: 2,
      explanation: "Following cable zone rules ensures safety, compliance with BS 7671, and reduces future risks of damage."
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
              Back to Section 6.2
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
              <Eye className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              Section 6.2.3
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Checking Cable Routes, Depths, and Zones
          </h1>
          <p className="text-muted-foreground">
            Understanding BS 7671 requirements for cable routing, depth requirements, and safe zones
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-foreground" />
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Spot it in 30 Seconds</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Safe zones: horizontal within 150mm of top, vertical above/below accessories</li>
                <li>Depth requirements: &gt;50mm without RCD, ≤50mm needs protection</li>
                <li>Route violations: diagonal runs, cables outside zones</li>
                <li>Protection measures: RCD, conduit, trunking where required</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Diagonal cables, shallow runs, missing protection, overcrowded routes</li>
                <li><strong>Use:</strong> Cable detectors, as-built drawings, depth measurements, zone charts</li>
                <li><strong>Check:</strong> BS 7671 compliance; RCD protection; mechanical protection; documentation</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <p className="text-base text-foreground mb-4">
            Cables must be installed in specific zones, depths, and routes to ensure both safety and compliance with BS 7671. Incorrect routing can make future work hazardous, increase the chance of mechanical damage, and lead to non-compliance. A thorough visual inspection confirms that cable runs meet the required standards before testing and energising.
          </p>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning Outcomes</h2>
          <p className="text-base text-foreground mb-4">By the end of this subsection, learners will be able to:</p>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
            <li>Identify permitted cable zones in walls, floors, and ceilings.</li>
            <li>Understand depth requirements for concealed cables.</li>
            <li>Recognise risks of installing cables outside recognised zones.</li>
            <li>Apply BS 7671 rules for safe routing of cables.</li>
            <li>Inspect and verify cable runs against design and site drawings.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content / Learning</h2>

          {/* 1. Cable Zones */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">1. Cable Zones (BS 7671 Guidance)</h3>
            <p className="text-base text-foreground mb-4">
              BS 7671 defines specific safe zones where cables can be installed to ensure predictable routing and prevent accidental damage during future work.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-3">Safe Zone Requirements</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Horizontal Zones:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Within 150 mm from the top of a wall or ceiling</li>
                          <li>Within 150 mm above or below any accessory (socket, switch, etc.)</li>
                          <li>Must run parallel to wall edges</li>
                          <li>No diagonal runs permitted in concealed installations</li>
                          <li>Continuous horizontal runs preferred for multiple accessories</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Vertical Zones:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Directly above or below electrical accessories</li>
                          <li>Within 150 mm either side of corners or openings</li>
                          <li>Vertical alignment with visible accessories</li>
                          <li>Must run straight up or down from accessory position</li>
                          <li>Connection to horizontal zones at approved points</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Prohibited Areas:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Diagonal runs in concealed installations</li>
                          <li>Random positions not related to accessories</li>
                          <li>Areas without clear zone markings or documentation</li>
                          <li>Zones that conflict with structural elements</li>
                          <li>Routes through areas subject to heavy mechanical stress</li>
                        </ul>
                      </div>

                      <div className="bg-emerald-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
                        <p className="font-medium text-blue-700 dark:text-emerald-400 mb-2">Practical Tip</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          Use chalk or temporary markers to map out safe zones before cable installation. This helps visualise the permitted routes and prevents errors during the installation process.
                        </p>
                      </div>

                      <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded border border-emerald-200 dark:border-emerald-800 mt-3">
                        <p className="font-medium text-emerald-700 dark:text-emerald-400 mb-2">Inspector's Note</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          When inspecting renovations, pay special attention to areas where original safe zones may have been compromised by subsequent building work or changes to room layouts.
                        </p>
                      </div>

                      <div className="bg-emerald-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
                        <p className="font-medium text-blue-700 dark:text-emerald-400 mb-2">Zone Compliance Note</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          Safe zones ensure future workers can predict cable locations, reducing the risk of accidental damage during renovation or maintenance work.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="cable-zones-check"
            question="What is the maximum distance from the top of a wall for horizontal cable zones?"
            options={["100 mm", "150 mm", "200 mm", "250 mm"]}
            correctIndex={1}
            explanation="Horizontal zones extend up to 150 mm from the top of a wall or above accessories as specified in BS 7671."
          />
          <Separator className="my-6" />

          {/* 2. Depth Requirements */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">2. Depth Requirements</h3>
            <p className="text-base text-foreground mb-4">
              Cable burial depth affects the level of protection required against mechanical damage from drilling, nailing, or other penetration.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-3">Depth Protection Standards</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Shallow Installation (≤50 mm):</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Requires 30 mA RCD protection as minimum</li>
                          <li>Steel conduit or trunking provides mechanical protection</li>
                          <li>Warning tape installation recommended</li>
                          <li>Additional earthed screen or armouring may be required</li>
                          <li>Higher risk of accidental penetration by fixings</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Deep Installation (&gt;50 mm):</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>RCD protection still recommended as best practice</li>
                          <li>Reduced risk of accidental penetration</li>
                          <li>May still require mechanical protection in high-risk areas</li>
                          <li>Documentation of exact routes essential</li>
                          <li>Consider future building modifications and extensions</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Protection Methods:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Steel conduit or galvanised trunking systems</li>
                          <li>Protective covering tiles or channeling</li>
                          <li>30 mA RCD devices for additional safety</li>
                          <li>Warning tape positioned above cable runs</li>
                          <li>Earthed metallic screening or armouring</li>
                        </ul>
                      </div>

                      <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded border border-purple-200 dark:border-purple-800">
                        <p className="font-medium text-purple-700 dark:text-emerald-400 mb-2">Best Practice</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          Even when depth requirements are met, RCD protection and mechanical protection provide additional safety margins and should be considered for all installations.
                        </p>
                      </div>

                      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded border border-yellow-200 dark:border-yellow-800 mt-3">
                        <p className="font-medium text-yellow-700 dark:text-emerald-400 mb-2">Measurement Technique</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          Always measure cable depth from the finished surface, not from structural elements. Consider floor screeds, ceiling finishes, and wall plaster thickness in your calculations.
                        </p>
                      </div>

                      <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded border border-amber-200 dark:border-amber-800 mt-3">
                        <p className="font-medium text-amber-700 dark:text-amber-400 mb-2">RCD Selection</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          Use 30mA RCDs for additional protection of shallow cables. Consider 10mA RCDs in high-risk environments such as bathrooms or outdoor installations for enhanced safety.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="depth-requirements-check"
            question="What additional protection is required for cables less than 50 mm deep?"
            options={["Extra insulation only", "RCD or mechanical protection", "Warning tape only", "No additional protection needed"]}
            correctIndex={1}
            explanation="Cables less than 50 mm deep require RCD protection or mechanical protection like conduit to guard against accidental penetration."
          />
          <Separator className="my-6" />

          {/* 3. Risks of Incorrect Routing */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">3. Risks of Incorrect Routing</h3>
            <p className="text-base text-foreground mb-4">
              Improper cable routing creates safety hazards and compliance issues that can have serious consequences for electrical installations.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-emerald-400 mb-3">Safety and Compliance Risks</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Safety Hazards:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Drilling into concealed cables outside safe zones</li>
                          <li>Increased risk of electric shock during future maintenance</li>
                          <li>Fire risk from damaged cables and arc faults</li>
                          <li>Electrocution risk to maintenance workers and occupants</li>
                          <li>System failures due to mechanical damage</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Regulatory Issues:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Breach of BS 7671 wiring regulations</li>
                          <li>Non-compliance with Building Regulations Part P</li>
                          <li>Insurance implications for non-compliant installations</li>
                          <li>Legal liability for accidents and incidents</li>
                          <li>Requirement for complete rewiring in severe cases</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Economic Consequences:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Costly remedial work to correct routing errors</li>
                          <li>Damage to building fabric during correction</li>
                          <li>Potential property devaluation</li>
                          <li>Increased insurance premiums</li>
                          <li>Project delays and additional inspection requirements</li>
                        </ul>
                      </div>

                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                        <p className="font-medium text-red-700 dark:text-emerald-400 mb-2">Critical Risk Alert</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          Diagonal cable runs and routes outside safe zones significantly increase the probability of accidental damage during future building work.
                        </p>
                      </div>

                      <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded border border-orange-200 dark:border-orange-800 mt-3">
                        <p className="font-medium text-orange-700 dark:text-emerald-400 mb-2">Cost of Non-Compliance</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          Correcting routing violations often requires significant remedial work including: cable replacement, wall repairs, redecoration, and additional inspection costs. Prevention is always more cost-effective.
                        </p>
                      </div>

                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800 mt-3">
                        <p className="font-medium text-red-700 dark:text-emerald-400 mb-2">Emergency Response</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          If you discover cables outside safe zones during inspection, isolate affected circuits immediately and assess the risk. Mark areas clearly and arrange for immediate remedial action before system energisation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="routing-risks-check"
            question="What is the main safety risk of cables outside safe zones?"
            options={["Higher installation costs", "Accidental drilling and penetration", "Poor cable performance", "Difficult cable identification"]}
            correctIndex={1}
            explanation="The primary risk is accidental drilling or fixing penetration into concealed cables, which can cause electric shock, fires, and system failures."
          />
          <Separator className="my-6" />

          {/* 4. Inspection Points */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">4. Inspection Points</h3>
            <p className="text-base text-foreground mb-4">
              Systematic inspection of cable routes ensures compliance with routing requirements and identifies potential issues before system energisation.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3">Inspection Methodology</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Route Verification:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Compare installed routes against approved drawings</li>
                          <li>Verify compliance with safe zone requirements</li>
                          <li>Check for unauthorised deviations from design</li>
                          <li>Confirm connection points and junction locations</li>
                          <li>Document any approved variations or modifications</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Depth Measurement:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Use cable detection equipment to locate buried cables</li>
                          <li>Measure burial depths at key points along routes</li>
                          <li>Verify compliance with minimum depth requirements</li>
                          <li>Check for adequate separation from other services</li>
                          <li>Record measurements for future reference</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Protection Assessment:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Verify RCD protection where required for shallow cables</li>
                          <li>Check mechanical protection systems (conduit, trunking)</li>
                          <li>Inspect warning tape installation and positioning</li>
                          <li>Confirm earthing and bonding of metallic protection</li>
                          <li>Test RCD operation and sensitivity settings</li>
                        </ul>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                        <p className="font-medium text-green-700 dark:text-green-400 mb-2">Inspection Tools</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          Cable detectors, depth gauges, as-built drawings, and RCD testers are essential tools for comprehensive route inspection.
                        </p>
                      </div>

                      <div className="bg-teal-50 dark:bg-teal-900/20 p-3 rounded border border-teal-200 dark:border-teal-800 mt-3">
                        <p className="font-medium text-teal-700 dark:text-teal-400 mb-2">Detection Technique</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          Use multiple detection methods to confirm cable positions: electronic detectors, signal tracing, and visual inspection of entry/exit points. Cross-reference findings with design documentation.
                        </p>
                      </div>

                      <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded border border-emerald-200 dark:border-emerald-800 mt-3">
                        <p className="font-medium text-emerald-700 dark:text-emerald-400 mb-2">Documentation Standards</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          Create detailed as-built drawings showing actual cable routes, depths, and protection measures. This documentation is crucial for future maintenance and modifications.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="inspection-tools-check"
            question="Which tool is most important for verifying cable routes during inspection?"
            options={["Multimeter", "Cable detector/locator", "Insulation tester", "Earth loop impedance tester"]}
            correctIndex={1}
            explanation="Cable detectors are specifically designed to locate buried cables and verify their routing, making them essential for route inspection."
          />
          <Separator className="my-6" />

          {/* 5. Common Mistakes */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">5. Common Mistakes</h3>
            <p className="text-base text-foreground mb-4">
              Understanding frequent routing errors helps inspectors identify problems and prevents repeated mistakes in future installations.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-emerald-400 mb-3">Frequent Installation Errors</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Routing Violations:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Installing cables diagonally to save time and materials</li>
                          <li>Running cables outside recognised safe zones</li>
                          <li>Taking shortcuts that don't follow accessory alignment</li>
                          <li>Ignoring zone requirements in renovation work</li>
                          <li>Poor planning leading to complex unnecessary routes</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Depth and Protection Issues:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Installing cables too shallow without RCD protection</li>
                          <li>Omitting mechanical protection in high-risk areas</li>
                          <li>Using incorrect containment systems for the environment</li>
                          <li>Failing to install warning tape above buried cables</li>
                          <li>Inadequate separation from other building services</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Documentation Failures:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Poor or missing as-built drawings</li>
                          <li>Failure to record route variations and modifications</li>
                          <li>Inadequate marking of buried cable positions</li>
                          <li>Missing depth measurements and protection details</li>
                          <li>Lack of clear zone marking for future reference</li>
                        </ul>
                      </div>

                      <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded border border-orange-200 dark:border-orange-800">
                        <p className="font-medium text-orange-700 dark:text-emerald-400 mb-2">Prevention Strategy</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          Proper planning, clear drawings, and systematic inspection at key stages prevent most routing errors and ensure compliance.
                        </p>
                      </div>

                      <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded border border-indigo-200 dark:border-indigo-800 mt-3">
                        <p className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">Training Point</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          Many routing errors stem from inadequate understanding of BS 7671 requirements. Ensure all installation teams receive proper training on safe zone principles and depth requirements.
                        </p>
                      </div>

                      <div className="bg-violet-50 dark:bg-violet-900/20 p-3 rounded border border-violet-200 dark:border-violet-800 mt-3">
                        <p className="font-medium text-violet-700 dark:text-violet-400 mb-2">Quality Control</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          Implement staged inspections during installation: after first fix, before covering, and final inspection. This catches errors early when they are easier and cheaper to correct.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="common-mistakes-check"
            question="Which is the most common cable routing mistake in electrical installations?"
            options={["Using oversized cables", "Running cables diagonally outside safe zones", "Installing too many junction boxes", "Using wrong cable colours"]}
            correctIndex={1}
            explanation="Running cables diagonally outside safe zones is extremely common as installers try to save time and materials, but it creates serious safety risks."
          />
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Practical Guidance</h2>
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-emerald-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold text-blue-700 dark:text-emerald-400 mb-2">Detection and Verification</h3>
                <ul className="text-xs sm:text-sm text-foreground space-y-1">
                  <li>• Use multiple cable detection methods for accuracy</li>
                  <li>• Cross-reference with as-built drawings and specifications</li>
                  <li>• Mark confirmed positions with temporary indicators</li>
                  <li>• Document any deviations from original designs</li>
                  <li>• Verify detection equipment calibration regularly</li>
                </ul>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2">Safety Precautions</h3>
                <ul className="text-xs sm:text-sm text-foreground space-y-1">
                  <li>• Never assume logical routing - always verify physically</li>
                  <li>• Check RCD operation before and during inspection</li>
                  <li>• Ensure adequate protection on all shallow runs</li>
                  <li>• Verify mechanical protection system integrity</li>
                  <li>• Isolate circuits when in doubt about routing</li>
                </ul>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                <h3 className="font-semibold text-purple-700 dark:text-emerald-400 mb-2">Documentation Standards</h3>
                <ul className="text-xs sm:text-sm text-foreground space-y-1">
                  <li>• Create detailed route maps with measurements</li>
                  <li>• Record protection methods and RCD settings</li>
                  <li>• Note environmental conditions affecting cables</li>
                  <li>• Update drawings for future maintenance reference</li>
                  <li>• Include photographs of critical route sections</li>
                </ul>
              </div>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
              <h3 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Professional Tips for Route Inspection</h3>
              <div className="grid md:grid-cols-2 gap-4 mt-3">
                <div>
                  <p className="font-medium text-foreground mb-2">Before Starting:</p>
                  <ul className="text-xs sm:text-sm text-foreground space-y-1">
                    <li>• Obtain and review all design drawings and specifications</li>
                    <li>• Check cable detector batteries and calibration</li>
                    <li>• Identify potential interference sources (metal pipework, reinforcement)</li>
                    <li>• Plan inspection sequence to minimise disruption</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-2">During Inspection:</p>
                  <ul className="text-xs sm:text-sm text-foreground space-y-1">
                    <li>• Use multiple detection sweeps at different sensitivities</li>
                    <li>• Pay special attention to corners and junctions</li>
                    <li>• Verify findings using different detection methods</li>
                    <li>• Record measurements and positions immediately</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>


        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Real-World Example</h2>
          <div className="bg-emerald-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold text-blue-700 dark:text-emerald-400 mb-3">Case Study: Housing Development Cable Strike</h3>
            <p className="text-xs sm:text-sm text-foreground mb-3">
              During a housing development project, electricians installed cables diagonally across walls to save time and reduce cable usage. Later, during a kitchen renovation, a contractor drilling for wall units struck a live cable, resulting in:
            </p>
            <ul className="text-xs sm:text-sm text-foreground list-disc ml-6 space-y-1 mb-3">
              <li>Electric shock injury to the contractor</li>
              <li>Circuit damage requiring complete rewiring</li>
              <li>Fire risk from arcing at the damage point</li>
              <li>Project delays and additional safety investigations</li>
              <li>Insurance claims and potential legal action</li>
            </ul>
            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
              <p className="font-semibold text-red-700 dark:text-emerald-400 mb-1">Prevention</p>
              <p className="text-xs sm:text-sm text-foreground">
                This incident could have been prevented by following BS 7671 safe zone requirements and ensuring proper RCD protection for shallow cable runs.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-l-emerald-500 pl-4">
              <h4 className="font-semibold text-foreground mb-2">Q: Is it acceptable to run a cable diagonally if it's covered by trunking?</h4>
              <p className="text-xs sm:text-sm text-foreground">A: Only if the trunking is fully visible and provides complete mechanical protection. Hidden diagonal runs are not permitted under BS 7671.</p>
            </div>
            <div className="border-l-4 border-l-emerald-500 pl-4">
              <h4 className="font-semibold text-foreground mb-2">Q: Why is RCD protection required for shallow cable runs?</h4>
              <p className="text-xs sm:text-sm text-foreground">A: RCD protection guards against the risk of electric shock if cables are accidentally penetrated by drills, screws, or nails during future work.</p>
            </div>
            <div className="border-l-4 border-l-emerald-500 pl-4">
              <h4 className="font-semibold text-foreground mb-2">Q: Do safe zones apply to ceilings as well as walls?</h4>
              <p className="text-xs sm:text-sm text-foreground">A: Yes, similar safe zone principles apply to ceilings. Cables must run in recognised, predictable routes and be adequately protected against mechanical damage.</p>
            </div>
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Pocket Guide – Cable Zones & Depths</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className="text-xs sm:text-sm text-foreground">Horizontal: 150 mm from top of wall or above accessories</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className="text-xs sm:text-sm text-foreground">Vertical: directly above or below switches and sockets</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className="text-xs sm:text-sm text-foreground">Depth: &gt;50 mm without RCD; ≤50 mm needs RCD/protection</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">✗</span>
                <span className="text-xs sm:text-sm text-foreground">Never run cables diagonally when concealed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">✗</span>
                <span className="text-xs sm:text-sm text-foreground">Avoid routes outside recognised safe zones</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">✗</span>
                <span className="text-xs sm:text-sm text-foreground">Don't install shallow cables without protection</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Comprehensive Recap</h2>
          <div className="space-y-6">
            
            {/* Key Principles */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-5 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-700 dark:text-emerald-400 mb-3">Core Safety Principles</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1 font-bold">•</span>
                    <span className="text-xs sm:text-sm text-foreground"><strong>Predictable Routing:</strong> Safe zones ensure future workers can anticipate cable locations, preventing accidental damage during maintenance or building modifications.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1 font-bold">•</span>
                    <span className="text-xs sm:text-sm text-foreground"><strong>Depth Protection:</strong> Cables buried more than 50mm provide natural protection, but those ≤50mm require additional safeguards like RCD or mechanical protection.</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1 font-bold">•</span>
                    <span className="text-xs sm:text-sm text-foreground"><strong>BS 7671 Compliance:</strong> Following wiring regulations ensures legal compliance, insurance validity, and occupant safety.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1 font-bold">•</span>
                    <span className="text-xs sm:text-sm text-foreground"><strong>Risk Mitigation:</strong> Proper routing reduces fire risk, electric shock hazards, and costly remedial work.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Zone Requirements Summary */}
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-5 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <h3 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-3">Safe Zone Requirements</h3>
              <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <p className="font-medium text-foreground mb-2">Horizontal Zones</p>
                  <ul className="text-xs sm:text-sm text-foreground space-y-1">
                    <li>• Within 150mm of ceiling</li>
                    <li>• 150mm above/below accessories</li>
                    <li>• Parallel to wall edges</li>
                    <li>• No diagonal concealed runs</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-2">Vertical Zones</p>
                  <ul className="text-xs sm:text-sm text-foreground space-y-1">
                    <li>• Directly above/below accessories</li>
                    <li>• 150mm either side of corners</li>
                    <li>• Straight alignment required</li>
                    <li>• Connect at approved points</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-2">Prohibited Areas</p>
                  <ul className="text-xs sm:text-sm text-foreground space-y-1">
                    <li>• Diagonal concealed routes</li>
                    <li>• Random positioning</li>
                    <li>• Unmarked zone areas</li>
                    <li>• High mechanical stress zones</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Protection Standards */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-5 rounded-lg border border-amber-200 dark:border-amber-800">
              <h3 className="font-semibold text-amber-700 dark:text-amber-400 mb-3">Protection Requirements</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-foreground mb-2">Shallow Cables (≤50mm)</p>
                  <ul className="text-xs sm:text-sm text-foreground space-y-1">
                    <li>• <strong>Mandatory:</strong> 30mA RCD protection minimum</li>
                    <li>• <strong>Alternative:</strong> Steel conduit or trunking</li>
                    <li>• <strong>Additional:</strong> Warning tape recommended</li>
                    <li>• <strong>Enhanced:</strong> 10mA RCD in high-risk areas</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-2">Deep Cables (&gt;50mm)</p>
                  <ul className="text-xs sm:text-sm text-foreground space-y-1">
                    <li>• <strong>Recommended:</strong> RCD protection as best practice</li>
                    <li>• <strong>Consider:</strong> Mechanical protection in stressed areas</li>
                    <li>• <strong>Essential:</strong> Accurate route documentation</li>
                    <li>• <strong>Planning:</strong> Account for future modifications</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Inspection Best Practices */}
            <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 p-5 rounded-lg border border-purple-200 dark:border-purple-800">
              <h3 className="font-semibold text-purple-700 dark:text-emerald-400 mb-3">Professional Inspection Standards</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-foreground mb-2">Essential Tools & Techniques</p>
                  <ul className="text-xs sm:text-sm text-foreground space-y-1">
                    <li>• Calibrated cable detection equipment</li>
                    <li>• Multiple verification methods</li>
                    <li>• Accurate measurement instruments</li>
                    <li>• Comprehensive documentation systems</li>
                    <li>• RCD testing equipment</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-2">Critical Success Factors</p>
                  <ul className="text-xs sm:text-sm text-foreground space-y-1">
                    <li>• Never assume routing - always verify</li>
                    <li>• Cross-reference multiple information sources</li>
                    <li>• Document findings immediately and accurately</li>
                    <li>• Implement staged inspection processes</li>
                    <li>• Maintain up-to-date as-built drawings</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Key Takeaways */}
            <div className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20 p-5 rounded-lg border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-slate-700 dark:text-slate-400 mb-3">Critical Takeaways for Electrical Professionals</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">!</span>
                  <p className="text-xs sm:text-sm text-foreground"><strong>Safety First:</strong> Cable routing errors are a leading cause of electrical accidents. Proper inspection and compliance with BS 7671 safe zones can prevent serious injuries and fatalities.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold">$</span>
                  <p className="text-xs sm:text-sm text-foreground"><strong>Economic Impact:</strong> Prevention costs significantly less than correction. Proper routing and inspection prevent expensive remedial work, insurance claims, and project delays.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">✓</span>
                  <p className="text-xs sm:text-sm text-foreground"><strong>Professional Standards:</strong> Thorough route inspection demonstrates competence, ensures compliance, and protects both installer and client from future liability.</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Test Your Knowledge */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Test Your Knowledge</h2>
          <Quiz questions={quizQuestions} />
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" asChild>
            <Link to="../2-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Signs of Damage
            </Link>
          </Button>
          <Button asChild>
            <Link to="../2-4">
              Next: Terminations & Polarity
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module6Section2_3;