import { ArrowLeft, Eye, AlertTriangle, FileText, Shield, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section2_1 = () => {
  useSEO(
    "What to Look for During Visual Checks - Level 2 Electrical Installation",
    "Comprehensive guide to visual inspection procedures and identifying defects in electrical installations"
  );

  // Quiz questions
  const quizQuestions = [
    {
      id: 1,
      question: "What is the main purpose of a visual inspection?",
      options: [
        "To test electrical continuity",
        "To identify defects before testing", 
        "To measure insulation resistance",
        "To calculate load requirements"
      ],
      correctAnswer: 1,
      explanation: "Visual inspection is carried out first to identify obvious defects, hazards, and poor workmanship before any electrical testing begins."
    },
    {
      id: 2,
      question: "Which regulation outlines cable routing safe zones?",
      options: [
        "BS 5839",
        "BS 7671",
        "Building Regs Part L", 
        "BS 6004"
      ],
      correctAnswer: 1,
      explanation: "BS 7671 (The IET Wiring Regulations) specifies the safe zones for cable installation in walls, floors, and ceilings."
    },
    {
      id: 3,
      question: "Name two defects to look for on socket outlets.",
      options: [
        "Colour and size",
        "Cracks and scorch marks",
        "Brand and model",
        "Age and warranty"
      ],
      correctAnswer: 1,
      explanation: "Physical damage like cracks and signs of overheating such as scorch marks indicate potential safety hazards that must be addressed."
    },
    {
      id: 4,
      question: "True or False: Minor scratches on accessories must always be recorded.",
      options: [
        "True - all defects must be recorded",
        "False - only safety-affecting defects",
        "True - for insurance purposes",
        "False - scratches are acceptable"
      ],
      correctAnswer: 1,
      explanation: "Only defects that affect safety, functionality, or compliance need to be recorded. Minor cosmetic issues that don't impact safety are not required to be documented."
    },
    {
      id: 5,
      question: "What safety device must be present in bathrooms and outdoor circuits?",
      options: [
        "MCB (Miniature Circuit Breaker)",
        "RCBO (RCD + MCB combined)",
        "RCD (Residual Current Device)",
        "SPD (Surge Protection Device)"
      ],
      correctAnswer: 2,
      explanation: "RCDs are mandatory in bathrooms and outdoor circuits to provide additional protection against electric shock in higher-risk environments."
    },
    {
      id: 6,
      question: "What is a key sign of poor workmanship in trunking installation?",
      options: [
        "Straight alignment",
        "Proper joint connections",
        "Uneven runs or missing fixings",
        "Adequate cable capacity"
      ],
      correctAnswer: 2,
      explanation: "Uneven trunking runs and missing fixings indicate poor installation practices that can lead to mechanical stress and potential failures."
    },
    {
      id: 7,
      question: "Why should earthing conductors be inspected?",
      options: [
        "To check conductor size",
        "To ensure safety and compliance",
        "To verify insulation colour",
        "To measure resistance"
      ],
      correctAnswer: 1,
      explanation: "Earthing conductors are critical for safety, providing a path for fault currents and ensuring effective operation of protective devices."
    },
    {
      id: 8,
      question: "At what stage should visual inspections be carried out?",
      options: [
        "After all testing is complete",
        "Before any testing or energising",
        "Only during commissioning",
        "When faults are suspected"
      ],
      correctAnswer: 1,
      explanation: "Visual inspection must be the first step, carried out before any electrical testing or energising to identify obvious hazards and defects safely."
    },
    {
      id: 9,
      question: "Which locations require IP-rated protection?",
      options: [
        "All domestic locations",
        "Bathrooms and outdoor areas",
        "Only industrial installations",
        "Bedrooms and lounges"
      ],
      correctAnswer: 1,
      explanation: "Locations exposed to moisture, dust, or other environmental factors require appropriate IP-rated equipment for protection against ingress."
    },
    {
      id: 10,
      question: "What tool is essential for ensuring no stage of inspection is missed?",
      options: [
        "Multimeter",
        "Insulation tester",
        "A checklist",
        "RCD tester"
      ],
      correctAnswer: 2,
      explanation: "A systematic checklist ensures all required inspection points are covered and nothing is overlooked during the visual inspection process."
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
            <div className="p-2 rounded-lg ">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 6.2.1
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            What to Look for During Visual Checks
          </h1>
          <p className="text-white">
            Comprehensive guide to visual inspection procedures and identifying defects in electrical installations
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-white" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Spot it in 30 Seconds</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Visual inspection is the first defence in electrical safety.</li>
                <li>Check for obvious damage: cracked sockets, scorched cables, loose accessories.</li>
                <li>Verify cables are in safe zones and properly supported.</li>
                <li>Confirm earthing, bonding, and safety devices are present.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Damaged enclosures, exposed conductors, poor workmanship, missing RCDs, incorrect IP ratings.</li>
                <li><strong>Use:</strong> Adequate lighting, systematic checklist, insulated tools, BS 7671 safe zone requirements.</li>
                <li><strong>Check:</strong> Never assume safety - always verify; document findings; complete before testing.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <p className="text-base text-white mb-4">
            Visual inspection is the first stage of ensuring an electrical installation is safe, compliant, and fit for use. Before any testing is carried out, installers must carefully check for obvious defects, hazards, and poor workmanship. A thorough visual inspection reduces the likelihood of electrical faults, improves safety, and ensures compliance with BS 7671.
          </p>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <p className="text-base text-white mb-4">By the end of this subsection, learners will be able to:</p>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Identify the main elements to check during a visual inspection.</li>
            <li>Recognise unsafe practices such as exposed conductors or damaged insulation.</li>
            <li>Understand the importance of checking workmanship quality.</li>
            <li>Apply BS 7671 requirements when carrying out visual checks.</li>
            <li>Record findings accurately for compliance.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content / Learning</h2>

          {/* 1. Condition of Equipment and Accessories */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">1. Condition of Equipment and Accessories</h3>
            <p className="text-base text-white mb-4">
              The first priority during visual inspection is checking the physical condition of all electrical equipment and accessories. This includes examining sockets, switches, distribution boards, and other electrical components for signs of damage, wear, or deterioration.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-elec-yellow mb-3">Equipment Condition Checks</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Socket Outlets and Switches:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Check for cracks, breaks, or damage to the faceplate or mounting box</li>
                          <li>Look for scorch marks or discolouration indicating overheating</li>
                          <li>Ensure mounting is secure with no loose fixings</li>
                          <li>Verify correct operation of switches (visual only - no electrical testing)</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Enclosures and Distribution Boards:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Check for missing covers or damaged enclosure integrity</li>
                          <li>Look for signs of moisture ingress or corrosion</li>
                          <li>Verify proper sealing and gasketing where required</li>
                          <li>Ensure adequate access space for maintenance and operation</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>General Equipment Checks:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Verify equipment is suitable for the installation environment</li>
                          <li>Check for proper manufacturer's markings and compliance symbols</li>
                          <li>Ensure protective devices are correctly rated and installed</li>
                          <li>Look for any obvious modifications or non-standard installations</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="equipment-condition-check"
            question="What are the main signs of damage to look for on electrical accessories?"
            options={["Age and manufacturer", "Cracks, breaks, and scorch marks", "Colour and style", "Installation date"]}
            correctIndex={1}
            explanation="Physical damage like cracks, breaks, and scorch marks indicate potential safety hazards that require immediate attention."
          />
          <Separator className="my-6" />

          {/* 2. Integrity of Cables and Conductors */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">2. Integrity of Cables and Conductors</h3>
            <p className="text-base text-white mb-4">
              Cable integrity is fundamental to electrical safety. During visual inspection, particular attention must be paid to the condition of cable insulation, sheathing, and mechanical protection throughout the installation.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-3">Cable and Conductor Inspection</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Cable Condition:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Look for cuts, nicks, or damage to cable sheathing or insulation</li>
                          <li>Check for exposed live conductors or damaged protective covering</li>
                          <li>Identify any signs of rodent damage or environmental degradation</li>
                          <li>Verify cables are suitable for the installation method and environment</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Cable Support and Installation:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Ensure cables are properly supported at appropriate intervals</li>
                          <li>Check that cables are not under mechanical strain or stress</li>
                          <li>Verify minimum bending radii are maintained</li>
                          <li>Confirm adequate protection where cables pass through structural elements</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Terminations and Connections:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Visual check of cable entry points into accessories and equipment</li>
                          <li>Ensure proper strain relief and cable glands are fitted</li>
                          <li>Look for any loose or poorly terminated connections (where visible)</li>
                          <li>Check that conductor colours comply with current standards</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="cable-integrity-check"
            question="Why is it important to check cable support and strain relief?"
            options={["For aesthetic appearance", "To prevent mechanical damage and maintain electrical integrity", "To comply with building regulations", "To reduce installation costs"]}
            correctIndex={1}
            explanation="Proper cable support prevents mechanical stress that could damage conductors or connections, maintaining both safety and electrical integrity."
          />
          <Separator className="my-6" />

          {/* Continue with other sections following the same pattern... */}
          
          {/* 3. Correct Selection and Installation */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">3. Correct Selection and Installation</h3>
            <p className="text-base text-white mb-4">
              Visual inspection must verify that all components are correctly selected for their intended application and installed according to manufacturer instructions and BS 7671 requirements.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3">Selection and Installation Verification</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Component Rating and Suitability:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Confirm accessories are correctly rated for their intended current and voltage</li>
                          <li>Verify protective devices match cable ratings and installation methods</li>
                          <li>Check that equipment specifications match design requirements</li>
                          <li>Ensure components are suitable for the operating environment</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Environmental Protection:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Verify appropriate IP ratings for location (bathrooms, outdoor areas)</li>
                          <li>Check sealing and weatherproofing where required</li>
                          <li>Confirm equipment can withstand expected environmental conditions</li>
                          <li>Ensure proper ventilation and heat dissipation arrangements</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="selection-installation-check"
            question="Which regulation requires specific IP ratings in bathroom zones?"
            options={["BS 5839", "BS 7671", "Building Regulations", "HSE Guidance"]}
            correctIndex={1}
            explanation="BS 7671 specifies IP rating requirements for different zones in locations containing a bath or shower."
          />
          <Separator className="my-6" />

          {/* Continue with remaining sections... */}
          
          {/* 4. Earthing and Bonding */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">4. Earthing and Bonding</h3>
            <p className="text-base text-white mb-4">
              Effective earthing and bonding systems are critical for electrical safety. Visual inspection must confirm that all earthing and bonding connections are present, accessible, and properly implemented according to BS 7671 requirements.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-3">Earthing and Bonding Systems</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Main Earthing Arrangements:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Verify presence and condition of main earthing conductor from MET to earth electrode</li>
                          <li>Check earth electrode connection is secure and accessible for testing</li>
                          <li>Ensure earthing conductor is correctly sized for the installation</li>
                          <li>Confirm protective conductor continuity throughout the installation</li>
                          <li>Check earth terminal connections are tight and properly identified</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Main Equipotential Bonding:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Water service pipes - bonding within 600mm of entry to building</li>
                          <li>Gas installation pipes - bonding at meter position or entry point</li>
                          <li>Oil fuel supply pipes - bonding at entry point to building</li>
                          <li>Structural steelwork - bonding to main steelwork framework</li>
                          <li>Lightning protection systems - bonding to earthing arrangements</li>
                          <li>Central heating and air conditioning systems - bonding as required</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Supplementary Bonding (Where Required):</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Bathroom zones - bonding of accessible metallic parts</li>
                          <li>Swimming pools - extensive bonding requirements</li>
                          <li>Special locations - as specified in BS 7671 Part 7</li>
                          <li>Check bonding conductor sizes meet minimum requirements</li>
                        </ul>
                      </div>

                      <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded border border-amber-200 dark:border-amber-800">
                        <p className="font-medium text-amber-700 dark:text-amber-400 mb-2">Critical Safety Point</p>
                        <p className="text-xs sm:text-sm text-white">
                          Missing or inadequate earthing and bonding can result in dangerous touch voltages during fault conditions. Always verify all required connections are present and properly terminated.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="earthing-bonding-check"
            question="What metallic services require main bonding connections?"
            options={["Only water pipes", "Water, gas, oil, and structural steelwork", "Only gas pipes", "Only central heating pipes"]}
            correctIndex={1}
            explanation="All extraneous-conductive-parts including water, gas, oil pipes and structural steelwork require main equipotential bonding."
          />
          <Separator className="my-6" />

          {/* 5. Safe Cable Routes and Zones */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">5. Safe Cable Routes and Zones</h3>
            <p className="text-base text-white mb-4">
              BS 7671 specifies safe zones for cable installation to reduce the risk of inadvertent damage during building work. Visual inspection must verify compliance with these critical safety requirements.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-elec-yellow mb-3">Safe Zone Compliance</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Permitted Safe Zones (BS 7671 Section 522):</strong></p>
                        <div className="bg-[#121212]/50 p-3 rounded border mb-2">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="font-medium text-white mb-2">Horizontal Zones:</p>
                              <ul className="text-xs sm:text-sm text-white space-y-1">
                                <li>• Within 150mm of top or bottom of wall</li>
                                <li>• Within 150mm horizontally from ceiling</li>
                                <li>• Within 150mm horizontally from floor</li>
                                <li>• Within 150mm from internal corner</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-white mb-2">Vertical Zones:</p>
                              <ul className="text-xs sm:text-sm text-white space-y-1">
                                <li>• Within 150mm of external corners</li>
                                <li>• Within 150mm either side of accessories</li>
                                <li>• Directly above or below accessories</li>
                                <li>• On same vertical line as accessories</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Cable Protection Requirements:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Minimum 50mm depth from surface OR RCD protection (≤30mA)</li>
                          <li>Mechanical protection where cables are shallow or vulnerable</li>
                          <li>Warning tape for buried cables in accessible areas</li>
                          <li>Adequate protection through structural elements (walls, floors)</li>
                          <li>Fire barriers and sealing where cables pass between compartments</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Special Considerations:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Partition walls - cables only in zones likely to be maintained</li>
                          <li>Thermal insulation - cables must not be covered unless suitably rated</li>
                          <li>Accessibility - maintain access for inspection and maintenance</li>
                          <li>Future alterations - consider likely building modifications</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="safe-zones-check"
            question="Which zones are permitted for concealed cables in walls?"
            options={["Anywhere in the wall", "150mm from corners and within 150mm of ceiling/floor", "Only in metal conduit", "Only behind socket outlets"]}
            correctIndex={1}
            explanation="BS 7671 allows concealed cables in walls within 150mm of the top, bottom, or corner of the wall or within 150mm of accessories."
          />
          <Separator className="my-6" />

          {/* 6. Signs of Poor Workmanship */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">6. Signs of Poor Workmanship</h3>
            <p className="text-base text-white mb-4">
              Poor workmanship can compromise both safety and compliance. Visual inspection should identify installation practices that do not meet professional standards or regulatory requirements.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">6</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-elec-yellow mb-3">Workmanship Quality Indicators</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Cable Management Issues:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Uneven trunking runs with poor alignment</li>
                          <li>Missing fixings or inadequate support spacing</li>
                          <li>Excessive bends that could damage cable insulation</li>
                          <li>Poorly fitted joints with visible gaps</li>
                          <li>Inconsistent installation methods throughout project</li>
                          <li>Cables under mechanical strain or stress</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Termination and Connection Problems:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Loose accessories or poor mounting</li>
                          <li>Inadequate cable entry sealing</li>
                          <li>Wrong terminal block types or ratings</li>
                          <li>Poor conductor preparation (damaged cores)</li>
                          <li>Inadequate strain relief arrangements</li>
                          <li>Multiple conductors forced into single terminals</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>General Installation Standards:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Inconsistent cable types within same circuit</li>
                          <li>Poor labelling or missing identification</li>
                          <li>Inadequate consideration of maintenance access</li>
                          <li>Use of inappropriate materials for environment</li>
                          <li>Failure to follow manufacturer instructions</li>
                        </ul>
                      </div>

                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                        <p className="font-medium text-red-700 dark:text-elec-yellow mb-2">Professional Standards</p>
                        <p className="text-xs sm:text-sm text-white">
                          Poor workmanship not only affects appearance but can lead to safety hazards, premature failure, and non-compliance with standards. Document all workmanship issues found during inspection.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="workmanship-check"
            question="What indicates poor workmanship in cable management systems?"
            options={["Perfect alignment", "Uneven runs and missing fixings", "Proper labelling", "Adequate support"]}
            correctIndex={1}
            explanation="Poor workmanship is indicated by uneven trunking runs, missing fixings, loose accessories, and inadequate cable support."
          />
          <Separator className="my-6" />

          {/* 7. Presence of Safety Devices */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">7. Presence of Safety Devices</h3>
            <p className="text-base text-white mb-4">
              Modern electrical installations include various safety devices mandated by BS 7671. Visual inspection must confirm these devices are present, correctly installed, and properly labelled.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-pink-500 bg-pink-500/5">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold">7</span>
                  <div className="flex-1">
                    <p className="font-semibold text-pink-600 dark:text-pink-400 mb-3">Safety Device Verification</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>RCD Protection Requirements:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>All socket outlets rated up to 20A (domestic and similar)</li>
                          <li>All circuits in bathrooms and shower rooms</li>
                          <li>All outdoor circuits and equipment</li>
                          <li>Cables concealed in walls at depth less than 50mm</li>
                          <li>Mobile equipment up to 32A when used outdoors</li>
                          <li>Swimming pools and other special locations</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Protective Device Checks:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Verify RCD ratings (typically 30mA for additional protection)</li>
                          <li>Check MCB/RCBO ratings match cable and load requirements</li>
                          <li>Confirm main switch and isolator arrangements</li>
                          <li>Ensure emergency switching devices where required</li>
                          <li>Check surge protection devices (SPDs) where mandated</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Labelling and Identification:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Clear circuit identification at distribution board</li>
                          <li>RCD test button labelling and access</li>
                          <li>Emergency switching clearly marked</li>
                          <li>Isolation point identification</li>
                          <li>Warning notices where required (e.g., voltage, non-standard arrangements)</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Additional Safety Measures:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Arc fault detection devices (AFDDs) where specified</li>
                          <li>Fire isolation switches for concealed wiring</li>
                          <li>Emergency lighting provision</li>
                          <li>Smoke and heat detection system integration</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Comprehensive Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Comprehensive Practical Guidance</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-white mb-3">Pre-Inspection Preparation</h3>
              <ul className="space-y-2 text-base text-white">
                <li>• <strong>Gather Documentation:</strong> Obtain installation drawings, specifications, and any previous inspection reports</li>
                <li>• <strong>Review Standards:</strong> Familiarise yourself with current BS 7671 requirements for the installation type</li>
                <li>• <strong>Prepare Tools:</strong> High-quality torch, magnifying glass, measuring tape, camera, inspection checklists</li>
                <li>• <strong>Safety Equipment:</strong> Appropriate PPE, voltage indicator, insulated tools, first aid kit</li>
                <li>• <strong>Access Arrangements:</strong> Ensure safe access to all areas requiring inspection including roof spaces and basements</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3">Systematic Inspection Approach</h3>
              <ul className="space-y-2 text-base text-white">
                <li>• <strong>Start at the Origin:</strong> Begin inspection at the main incoming supply and work systematically through the installation</li>
                <li>• <strong>Follow Circuit Paths:</strong> Trace each circuit from distribution board to final connections</li>
                <li>• <strong>Check All Zones:</strong> Inspect every accessible area including concealed spaces, loft areas, and service ducts</li>
                <li>• <strong>Document Everything:</strong> Take photographs of defects, note locations precisely, record all findings</li>
                <li>• <strong>Use Natural Light:</strong> Where possible, conduct inspections during daylight hours for best visibility</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3">Environmental Considerations</h3>
              <ul className="space-y-2 text-base text-white">
                <li>• <strong>Moisture and Humidity:</strong> Check for condensation, water ingress, corrosion in damp areas</li>
                <li>• <strong>Temperature Effects:</strong> Look for heat damage, thermal expansion effects, ventilation adequacy</li>
                <li>• <strong>Dust and Contamination:</strong> Assess cleanliness, filter condition, ingress protection effectiveness</li>
                <li>• <strong>Chemical Environment:</strong> Check for material degradation in aggressive environments</li>
                <li>• <strong>Vibration and Movement:</strong> Look for mechanical stress, loosening, fatigue in dynamic environments</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3">Common Problem Areas</h3>
              <ul className="space-y-2 text-base text-white">
                <li>• <strong>Junction Boxes:</strong> Often poorly accessible, inadequate sealing, overloaded terminals</li>
                <li>• <strong>Outdoor Equipment:</strong> Weather exposure, UV degradation, water ingress, corrosion</li>
                <li>• <strong>Concealed Wiring:</strong> Difficult to inspect, often damaged during building work</li>
                <li>• <strong>Service Areas:</strong> Kitchens, bathrooms, utility rooms - high-risk environments</li>
                <li>• <strong>Roof Spaces:</strong> Extreme temperatures, access difficulties, insulation burial</li>
                <li>• <strong>Basements:</strong> Moisture problems, limited access, service pipe interference</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3">Critical Safety Checks</h3>
              <ul className="space-y-2 text-base text-white">
                <li>• <strong>Never Assume:</strong> Always verify rather than assume compliance - look for evidence</li>
                <li>• <strong>Touch Test:</strong> Gently check for loose mountings, but never touch exposed conductors</li>
                <li>• <strong>Visual Clues:</strong> Burn marks, discoloration, unusual odours can indicate problems</li>
                <li>• <strong>Stop for Danger:</strong> If immediate danger is discovered, make safe and stop inspection</li>
                <li>• <strong>Question Everything:</strong> If something looks unusual, investigate further or seek advice</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3">Professional Standards and Compliance</h3>
              <ul className="space-y-2 text-base text-white">
                <li>• <strong>BS 7671 Compliance:</strong> Ensure all work meets current wiring regulations requirements</li>
                <li>• <strong>Building Regulations:</strong> Check compliance with Part P and other relevant building standards</li>
                <li>• <strong>Manufacturer Instructions:</strong> Verify installation follows equipment manufacturer guidance</li>
                <li>• <strong>Industry Best Practice:</strong> Apply recognised good practice even where not legally mandated</li>
                <li>• <strong>Future Maintenance:</strong> Consider accessibility and maintainability of the installation</li>
              </ul>
            </div>

            <div className="bg-emerald-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-700 dark:text-elec-yellow mb-2">Inspector Competence and Responsibility</h4>
              <p className="text-xs sm:text-sm text-white mb-2">
                Visual inspection requires significant knowledge and experience. The inspector must be competent to:
              </p>
              <ul className="text-xs sm:text-sm text-white space-y-1">
                <li>• Understand and apply current electrical standards and regulations</li>
                <li>• Recognise potentially dangerous situations and make appropriate safety decisions</li>
                <li>• Identify non-compliant work and understand its implications</li>
                <li>• Communicate findings clearly and provide appropriate recommendations</li>
                <li>• Maintain professional indemnity insurance and ongoing competence</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Advanced Troubleshooting Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Advanced Visual Inspection Techniques</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-white mb-3">Thermal Indicators</h3>
              <ul className="space-y-2 text-base text-white">
                <li>• <strong>Discoloration:</strong> Brown or black marks around terminals indicate overheating</li>
                <li>• <strong>Melting:</strong> Distorted plastic or cable sheathing suggests excessive temperature</li>
                <li>• <strong>Expansion:</strong> Thermal expansion can cause loose connections over time</li>
                <li>• <strong>Material Degradation:</strong> UV damage, heat aging, embrittlement of materials</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3">Mechanical Stress Indicators</h3>
              <ul className="space-y-2 text-base text-white">
                <li>• <strong>Cable Kinking:</strong> Sharp bends that exceed minimum radius requirements</li>
                <li>• <strong>Strain Relief:</strong> Missing or inadequate cable entry protection</li>
                <li>• <strong>Vibration Damage:</strong> Loose fixings, worn insulation at contact points</li>
                <li>• <strong>Settlement:</strong> Building movement affecting cable runs and equipment mounting</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3">Environmental Damage Assessment</h3>
              <ul className="space-y-2 text-base text-white">
                <li>• <strong>Corrosion:</strong> Metal degradation, particularly in coastal or industrial areas</li>
                <li>• <strong>Pest Damage:</strong> Rodent damage to cables, insect nests in equipment</li>
                <li>• <strong>Chemical Attack:</strong> Material degradation from cleaning products, industrial chemicals</li>
                <li>• <strong>Water Damage:</strong> Staining, mineral deposits, algae growth, rust</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Expanded Quick Knowledge Check */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Knowledge Check Questions</h2>
          <div className="space-y-4 text-base text-white">
            <div className="p-4 border-l-4 border-elec-yellow ">
              <p className="font-semibold mb-2">Q: Why must visual checks be completed before testing?</p>
              <p>A: To identify obvious safety hazards and defects that could pose danger during testing, and to ensure the installation is safe to energise.</p>
            </div>
            
            <div className="p-4 border-l-4 border-green-500 ">
              <p className="font-semibold mb-2">Q: What should you look for on socket outlets and switches?</p>
              <p>A: Cracks, scorch marks, loose mounting, damaged faceplates, missing screws, and signs of overheating or poor termination.</p>
            </div>
            
            <div className="p-4 border-l-4 border-purple-500 ">
              <p className="font-semibold mb-2">Q: Which regulation outlines permitted cable zones?</p>
              <p>A: BS 7671 Section 522 specifies safe zones within 150mm of corners, ceiling, floor, and accessories.</p>
            </div>
            
            <div className="p-4 border-l-4 border-orange-500 ">
              <p className="font-semibold mb-2">Q: What signs may indicate poor workmanship?</p>
              <p>A: Uneven trunking, missing fixings, excessive cable bends, loose accessories, poor cable management, and inconsistent installation methods.</p>
            </div>

            <div className="p-4 border-l-4 border-red-500 ">
              <p className="font-semibold mb-2">Q: When should you stop an inspection?</p>
              <p>A: Immediately upon discovering any condition that presents immediate danger, such as exposed live conductors or severely damaged equipment.</p>
            </div>
          </div>
        </Card>

        {/* Multiple Real-World Examples */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Real-World Case Studies</h2>
          
          <div className="space-y-6">
            <div className="p-4 border-l-4 border-amber-500 ">
              <h3 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Case Study 1: Kitchen Socket Fire Risk</h3>
              <p className="text-base text-white mb-2">
                <strong>Situation:</strong> During a domestic inspection, an electrician noticed slight scorch marks around a kitchen socket outlet that had been recently decorated over.
              </p>
              <p className="text-base text-white mb-2">
                <strong>Investigation:</strong> Closer inspection revealed the socket had been painted over multiple times, and the terminal screws were loose, causing arcing and overheating.
              </p>
              <p className="text-base text-white mb-2">
                <strong>Outcome:</strong> The socket was immediately isolated and replaced. The circuit was checked for other similar issues. This prevented a potential kitchen fire.
              </p>
              <p className="text-base text-white">
                <strong>Learning Point:</strong> Paint can hide early signs of electrical problems. Always look for subtle discoloration or other clues beneath surface finishes.
              </p>
            </div>

            <div className="p-4 border-l-4 border-red-500 ">
              <h3 className="font-semibold text-red-700 dark:text-elec-yellow mb-2">Case Study 2: Bathroom Bonding Failure</h3>
              <p className="text-base text-white mb-2">
                <strong>Situation:</strong> A bathroom renovation inspection revealed beautiful new fittings but missing supplementary bonding connections.
              </p>
              <p className="text-base text-white mb-2">
                <strong>Investigation:</strong> The installer had connected the electrical circuits but failed to bond the metal bath, towel rail, and pipework.
              </p>
              <p className="text-base text-white mb-2">
                <strong>Outcome:</strong> All metallic parts were properly bonded before the installation was certified. This prevented potential electrocution risk.
              </p>
              <p className="text-base text-white">
                <strong>Learning Point:</strong> Special locations require additional safety measures that are easily overlooked if not systematically checked.
              </p>
            </div>

            <div className="p-4 border-l-4 border-elec-yellow ">
              <h3 className="font-semibold text-blue-700 dark:text-elec-yellow mb-2">Case Study 3: Cable in Unsafe Zone</h3>
              <p className="text-base text-white mb-2">
                <strong>Situation:</strong> Office renovation work had required new socket outlets, but cable routing appeared to violate safe zone requirements.
              </p>
              <p className="text-base text-white mb-2">
                <strong>Investigation:</strong> Cables were routed diagonally across walls outside permitted safe zones with no RCD protection for concealed cables.
              </p>
              <p className="text-base text-white mb-2">
                <strong>Outcome:</strong> Installation was redesigned to use surface trunking and proper safe zone routing with RCD protection added.
              </p>
              <p className="text-base text-white">
                <strong>Learning Point:</strong> Convenience in cable routing must never override safety requirements. Always verify safe zone compliance.
              </p>
            </div>

            <div className="p-4 border-l-4 border-green-500 ">
              <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2">Case Study 4: Outdoor Equipment Failure</h3>
              <p className="text-base text-white mb-2">
                <strong>Situation:</strong> Garden lighting system showing signs of water ingress and corroded connections after two years.
              </p>
              <p className="text-base text-white mb-2">
                <strong>Investigation:</strong> IP ratings were inadequate for outdoor use, and cable glands were not properly sealed.
              </p>
              <p className="text-base text-white mb-2">
                <strong>Outcome:</strong> All outdoor equipment was upgraded to appropriate IP ratings with proper sealing and drainage.
              </p>
              <p className="text-base text-white">
                <strong>Learning Point:</strong> Environmental protection is critical for longevity and safety. IP ratings must match the actual conditions.
              </p>
            </div>
          </div>
        </Card>

        {/* Expanded FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Comprehensive FAQs</h2>
          <div className="space-y-4">
            <div>
              <p className="font-medium text-white mb-2">Q: Do I need to remove accessories during visual inspection?</p>
              <p className="text-base text-white">A: Not always, but covers may need to be removed for detailed inspection of connections, particularly if poor workmanship is suspected or there are signs of overheating.</p>
            </div>
            <Separator />
            
            <div>
              <p className="font-medium text-white mb-2">Q: Should minor cosmetic defects (e.g., scratches) be recorded?</p>
              <p className="text-base text-white">A: Only defects that affect safety, functionality, or compliance must be recorded. Minor cosmetic issues are not required to be documented unless they indicate underlying problems.</p>
            </div>
            <Separator />
            
            <div>
              <p className="font-medium text-white mb-2">Q: How often should visual inspections take place?</p>
              <p className="text-base text-white">A: At installation handover, during routine maintenance periods, whenever alterations are made, before any electrical testing, and when faults are suspected or reported.</p>
            </div>
            <Separator />
            
            <div>
              <p className="font-medium text-white mb-2">Q: What if I find a serious defect during visual inspection?</p>
              <p className="text-base text-white">A: Stop work immediately, make the installation safe, do not proceed with testing until the defect is rectified, document the finding and inform all relevant parties including the client.</p>
            </div>
            <Separator />
            
            <div>
              <p className="font-medium text-white mb-2">Q: Can I conduct a visual inspection on a live installation?</p>
              <p className="text-base text-white">A: While some visual checks can be done on live installations, it is much safer and more thorough to isolate supplies where possible. Never remove covers or access live parts during visual inspection.</p>
            </div>
            <Separator />
            
            <div>
              <p className="font-medium text-white mb-2">Q: What tools are essential for proper visual inspection?</p>
              <p className="text-base text-white">A: High-quality torch, magnifying glass, measuring tape, camera, inspection checklists, insulated tools, voltage indicator, appropriate PPE, and current copy of BS 7671.</p>
            </div>
            <Separator />
            
            <div>
              <p className="font-medium text-white mb-2">Q: How do I inspect concealed wiring effectively?</p>
              <p className="text-base text-white">A: Check accessible termination points, verify safe zone compliance, look for surface damage indicators, check for adequate RCD protection, and use thermal imaging where available and appropriate.</p>
            </div>
            <Separator />
            
            <div>
              <p className="font-medium text-white mb-2">Q: What should I do if the client pressures me to skip parts of the inspection?</p>
              <p className="text-base text-white">A: Never compromise on safety or professional standards. Explain the legal and safety requirements, document any limitations imposed, and consider whether you can ethically complete the work under the restrictions.</p>
            </div>
          </div>
        </Card>

        {/* Enhanced Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Professional Pocket Guide – Key Visual Checks</h2>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-white mb-2">Essential Safety Checks</h3>
                <ul className="space-y-1 text-xs sm:text-sm text-white">
                  <li>✅ Exposed live parts - immediate danger</li>
                  <li>✅ Damaged accessories and equipment</li>
                  <li>✅ Cable damage and strain relief</li>
                  <li>✅ Scorch marks and overheating signs</li>
                  <li>✅ Loose mountings and connections</li>
                  <li>✅ Missing covers and enclosure integrity</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Compliance Verification</h3>
                <ul className="space-y-1 text-xs sm:text-sm text-white">
                  <li>✅ Safe zone compliance (150mm rule)</li>
                  <li>✅ IP ratings for environment</li>
                  <li>✅ RCD protection where required</li>
                  <li>✅ Earthing and bonding connections</li>
                  <li>✅ Protective device ratings</li>
                  <li>✅ Circuit identification and labelling</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-white mb-2">Professional Standards</h3>
              <ul className="space-y-1 text-xs sm:text-sm text-white">
                <li>✅ Workmanship quality and consistency</li>
                <li>✅ Manufacturer instruction compliance</li>
                <li>✅ Future maintenance accessibility</li>
                <li>✅ Environmental protection adequacy</li>
                <li>✅ Documentation and certification requirements</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Enhanced Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Comprehensive Recap</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-white mb-2">Key Learning Points</h3>
              <ul className="space-y-2 text-base text-white">
                <li>• Visual inspections are the foundation of electrical safety - they must be thorough and systematic</li>
                <li>• Seven critical areas: equipment condition, cable integrity, selection/installation, earthing/bonding, safe zones, workmanship, safety devices</li>
                <li>• Environmental factors significantly affect installation longevity and safety</li>
                <li>• Professional competence and systematic approach are essential for effective inspection</li>
                <li>• Documentation and clear communication of findings are crucial for safety and compliance</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-2">Critical Safety Messages</h3>
              <ul className="space-y-2 text-base text-white">
                <li>• Never energise installations based on visual inspection alone - testing is also required</li>
                <li>• Stop immediately if immediate danger is discovered and make the installation safe</li>
                <li>• Question everything - if something appears unusual, investigate further</li>
                <li>• Maintain professional standards - poor workmanship can be dangerous</li>
                <li>• Stay current with regulations and best practices through continuing professional development</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Quiz Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-white" />
            <h2 className="text-2xl font-semibold text-white">Quiz (10 Questions)</h2>
          </div>
          <Quiz questions={quizQuestions} />
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between pt-8 border-t border-white/10">
          <Button variant="outline" className="sm:w-auto" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6.2
            </Link>
          </Button>
          <Button className="sm:w-auto" asChild>
            <Link to="../2-2">
              Next: Common Electrical Defects
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module6Section2_1;