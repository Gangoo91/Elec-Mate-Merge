import { ArrowLeft, ArrowRight, Target, CheckCircle, AlertTriangle, Settings, Lightbulb, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

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

  return (
    <div className="min-h-screen bg-background">
      {/* Top header bar */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2
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
              <Settings className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              Section 5.2.5
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Designing for Expansion, Maintenance, and Accessibility
          </h1>
          <p className="text-muted-foreground">
            Learn to design electrical installations for future expansion, easy maintenance, and accessibility compliance with BS 7671 and Building Regulations Part M.
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
                <li>Leave 20-25% spare capacity in distribution boards.</li>
                <li>Socket heights: 450-1200 mm (Part M compliance).</li>
                <li>Switch heights: 900-1200 mm for accessibility.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> 30-40% spare space in containment.</li>
                <li><strong>Use:</strong> BS 7671 Reg 132.9 and 314.1.</li>
                <li><strong>Check:</strong> Future loads (EV, solar, heat pumps).</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <p className="text-base text-foreground">
            Electrical installations should not only meet today's requirements but also allow for future expansion, easy maintenance, and user accessibility. A design that overlooks these factors may quickly become outdated, difficult to service, or even unsafe. This subsection explains how to integrate flexibility and practicality into electrical designs while complying with BS 7671 and Building Regulations.
          </p>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning Outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
            <li>Recognise why planning for expansion is important.</li>
            <li>Understand accessibility requirements under Building Regulations.</li>
            <li>Design circuits and layouts that allow for safe maintenance.</li>
            <li>Identify best practices for futureproofing installations.</li>
            <li>Apply BS 7671 principles to accessible and adaptable design.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content / Learning</h2>

          {/* Designing for Expansion */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">1. Designing for Expansion</h3>
            <p className="text-base text-foreground mb-4">
              Future-proofing electrical installations is essential for accommodating technological changes, increased electrical demand, and evolving user needs. Poor expansion planning leads to costly retrofits and potentially dangerous modifications.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-3">Distribution Board Expansion Planning</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Spare Way Calculations:</strong></p>
                        <div className="bg-background/50 p-3 rounded border mb-2">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="font-medium text-foreground mb-2">Domestic Installations:</p>
                              <ul className="text-xs sm:text-sm text-foreground space-y-1">
                                <li><strong>Minimum spare ways:</strong> 2-3 ways</li>
                                <li><strong>Optimal spare capacity:</strong> 25% of total ways</li>
                                <li><strong>Example:</strong> 12-way board = 3 spare ways minimum</li>
                                <li><strong>Consider:</strong> EV charger (32A), heat pump (40A+)</li>
                                <li><strong>Solar PV:</strong> Generation and battery storage circuits</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-foreground mb-2">Commercial/Industrial:</p>
                              <ul className="text-xs sm:text-sm text-foreground space-y-1">
                                <li><strong>Minimum spare ways:</strong> 20% of installed circuits</li>
                                <li><strong>High-growth areas:</strong> 30-40% spare capacity</li>
                                <li><strong>Future technologies:</strong> Smart systems, IoT devices</li>
                                <li><strong>Load growth:</strong> Business expansion plans</li>
                                <li><strong>Maintenance:</strong> Temporary supply requirements</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Main Supply Sizing Considerations:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li><strong>Current capacity:</strong> Size main switch for expected maximum demand + 20%</li>
                          <li><strong>Supply cable:</strong> Consider voltage drop with increased load</li>
                          <li><strong>DNO coordination:</strong> Check available supply capacity early in design</li>
                          <li><strong>Three-phase conversion:</strong> Plan space for upgrade if single-phase insufficient</li>
                          <li><strong>Metering provision:</strong> Smart meters and sub-metering requirements</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Emerging Load Types:</strong></p>
                        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                          <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                            <div>
                              <p className="font-medium text-green-700 dark:text-green-400 mb-2">Electric Vehicle Charging</p>
                              <ul className="text-xs text-foreground space-y-1">
                                <li>• 7kW single-phase (32A)</li>
                                <li>• 22kW three-phase (32A per phase)</li>
                                <li>• Smart charging integration</li>
                                <li>• Load balancing requirements</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-green-700 dark:text-green-400 mb-2">Heat Pumps & HVAC</p>
                              <ul className="text-xs text-foreground space-y-1">
                                <li>• Air source heat pumps (15-20A)</li>
                                <li>• Ground source systems (higher loads)</li>
                                <li>• Backup heating elements</li>
                                <li>• Smart thermostats and controls</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-green-700 dark:text-green-400 mb-2">Renewable Energy</p>
                              <ul className="text-xs text-foreground space-y-1">
                                <li>• Solar PV inverters (16-32A)</li>
                                <li>• Battery storage systems</li>
                                <li>• Generation meters</li>
                                <li>• Export limitation devices</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Cable Containment Planning:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li><strong>Trunking fill factors:</strong> Maximum 45% fill ratio for singles, 35% for multicore</li>
                          <li><strong>Accessible routes:</strong> Plan routes that remain accessible for additional cables</li>
                          <li><strong>Segregation requirements:</strong> Allow space for data/telecom cables (300mm separation from power)</li>
                          <li><strong>Fire compartmentation:</strong> Maintain integrity when adding new cables</li>
                          <li><strong>Flexible systems:</strong> Use modular containment systems where possible</li>
                        </ul>
                      </div>

                      <div className="bg-emerald-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
                        <p className="font-medium text-blue-700 dark:text-emerald-400 mb-2">Real-World Planning Example</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          <strong>Scenario:</strong> New build house with gas boiler. Design should include: 32A way for future EV charger, 
                          40A way for heat pump conversion, 16A way for solar PV, plus 2 general spare ways. This ensures the 
                          installation can adapt to the UK&apos;s net-zero transition without major rewiring.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
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
          <Separator className="my-6" />

          {/* Maintenance Considerations */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">2. Maintenance Considerations</h3>
            <p className="text-base text-foreground mb-4">
              Safe and accessible maintenance is crucial for both safety and regulatory compliance. BS 7671 requires that installations can be safely maintained, inspected, and tested throughout their operational life.
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Safe and Accessible Maintenance</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Working Space Requirements (BS 7671 Reg 132.12):</strong></p>
                        <div className="bg-background/50 p-3 rounded border mb-2">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="font-medium text-foreground mb-2">Distribution Boards & Panels:</p>
                              <ul className="text-xs sm:text-sm text-foreground space-y-1">
                                <li><strong>Front access:</strong> Minimum 1000mm clear space</li>
                                <li><strong>Side access:</strong> 500mm where required</li>
                                <li><strong>Height:</strong> Accessible from ground level or platform</li>
                                <li><strong>Lighting:</strong> Minimum 200 lux at working plane</li>
                                <li><strong>Headroom:</strong> 2000mm minimum above floor</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-foreground mb-2">Switchgear & Control Gear:</p>
                              <ul className="text-xs sm:text-sm text-foreground space-y-1">
                                <li><strong>Access doors:</strong> Must open fully (min 90°)</li>
                                <li><strong>Maintenance platforms:</strong> For high-level equipment</li>
                                <li><strong>Safety zones:</strong> No live parts within 2.5m height</li>
                                <li><strong>Emergency access:</strong> Alternative routes considered</li>
                                <li><strong>Ventilation:</strong> Adequate for personnel safety</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Circuit Isolation and Labelling:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li><strong>Local isolation:</strong> Within 3m of every item of fixed equipment</li>
                          <li><strong>Lockable isolators:</strong> For critical or dangerous equipment</li>
                          <li><strong>Emergency stops:</strong> Easily accessible in hazardous areas</li>
                          <li><strong>Clear labelling:</strong> Permanent, weather-resistant labels</li>
                          <li><strong>Circuit directories:</strong> Updated with modifications</li>
                          <li><strong>Safety signs:</strong> Warning notices at appropriate locations</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Testing and Inspection Access:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li><strong>Test points:</strong> Accessible for periodic testing</li>
                          <li><strong>Cable access:</strong> Points for insulation resistance testing</li>
                          <li><strong>RCD testing:</strong> Test buttons accessible and functional</li>
                          <li><strong>Earth fault loop:</strong> Test points at distribution boards</li>
                          <li><strong>Documentation:</strong> Test results storage at or near installation</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Maintenance Scheduling Considerations:</strong></p>
                        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="font-medium text-green-700 dark:text-green-400 mb-2">Planned Maintenance Access</p>
                              <ul className="text-xs text-foreground space-y-1">
                                <li>• Segregated circuits for partial shutdown</li>
                                <li>• Backup supplies for critical loads</li>
                                <li>• Scheduled outage coordination</li>
                                <li>• Temporary supply provisions</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-green-700 dark:text-green-400 mb-2">Emergency Maintenance</p>
                              <ul className="text-xs text-foreground space-y-1">
                                <li>• 24/7 accessible isolators</li>
                                <li>• Emergency contact information</li>
                                <li>• Bypass arrangements where critical</li>
                                <li>• Spares storage and access</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                        <p className="font-medium text-green-700 dark:text-green-400 mb-2">Maintenance Design Example</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          <strong>Commercial Building:</strong> Design distribution board layout with individual floor isolators, 
                          allowing maintenance on one floor while others remain operational. Include local isolators for 
                          major plant (lifts, HVAC, IT systems) to enable targeted maintenance without affecting other services.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
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
          <Separator className="my-6" />

          {/* Accessibility for Users */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">3. Accessibility for Users</h3>
            <p className="text-base text-foreground mb-4">
              Building Regulations Part M sets specific requirements for accessibility in new buildings and major renovations. These requirements ensure electrical installations are usable by people with varying physical capabilities.
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-1">Building Regulations Part M Compliance</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Height Requirements (Approved Document M):</strong></p>
                        <div className="bg-background/50 p-3 rounded border mb-2">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="font-medium text-foreground mb-2">Socket Outlets:</p>
                              <ul className="text-xs sm:text-sm text-foreground space-y-1">
                                <li><strong>Standard height:</strong> 450-1200mm above FFL</li>
                                <li><strong>Optimum height:</strong> 600-1000mm for wheelchairs</li>
                                <li><strong>Kitchen worktops:</strong> 15-45mm above worktop</li>
                                <li><strong>Bathrooms:</strong> Avoid zones 1 & 2, maintain heights</li>
                                <li><strong>Outdoor sockets:</strong> 1000-1200mm preferred</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-foreground mb-2">Switches & Controls:</p>
                              <ul className="text-xs sm:text-sm text-foreground space-y-1">
                                <li><strong>Light switches:</strong> 900-1200mm above FFL</li>
                                <li><strong>Door entry:</strong> 900-1000mm preferred</li>
                                <li><strong>Emergency controls:</strong> 900-1100mm maximum</li>
                                <li><strong>Thermostats:</strong> 900-1200mm range</li>
                                <li><strong>Consumer units:</strong> Eye level for wheelchair users</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Positioning and Reach Considerations:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li><strong>Forward reach:</strong> Maximum 500mm depth from wheelchair</li>
                          <li><strong>Side reach:</strong> Avoid high-level positioning above 1200mm</li>
                          <li><strong>Clear floor space:</strong> 800mm × 1200mm in front of controls</li>
                          <li><strong>Door proximity:</strong> Minimum 300mm from door frames</li>
                          <li><strong>Contrast requirements:</strong> Visible difference from background</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Special Considerations by Building Type:</strong></p>
                        <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded border border-purple-200 dark:border-purple-800">
                          <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                            <div>
                              <p className="font-medium text-purple-700 dark:text-emerald-400 mb-2">Residential (Category 1-3)</p>
                              <ul className="text-xs text-foreground space-y-1">
                                <li>• Cat 1: Basic accessibility</li>
                                <li>• Cat 2: Enhanced accessibility</li>
                                <li>• Cat 3: Wheelchair accessible</li>
                                <li>• Varying socket/switch requirements</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-purple-700 dark:text-emerald-400 mb-2">Commercial Buildings</p>
                              <ul className="text-xs text-foreground space-y-1">
                                <li>• DDA compliance mandatory</li>
                                <li>• Accessible route requirements</li>
                                <li>• Emergency alarm systems</li>
                                <li>• Lift controls accessibility</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-purple-700 dark:text-emerald-400 mb-2">Public Buildings</p>
                              <ul className="text-xs text-foreground space-y-1">
                                <li>• Hearing loops integration</li>
                                <li>• Visual alarm indicators</li>
                                <li>• Accessible emergency systems</li>
                                <li>• Assistance call systems</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Universal Design Principles:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li><strong>Intuitive operation:</strong> Controls should be self-explanatory</li>
                          <li><strong>Tactile feedback:</strong> Rocker switches preferred over flat panels</li>
                          <li><strong>Visual indicators:</strong> LED indicators for switch state</li>
                          <li><strong>Easy grip:</strong> Large switch plates and outlets with grip-friendly design</li>
                          <li><strong>Maintenance access:</strong> User-replaceable components accessible</li>
                        </ul>
                      </div>

                      <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded border border-purple-200 dark:border-purple-800">
                        <p className="font-medium text-purple-700 dark:text-emerald-400 mb-2">Accessibility Design Example</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          <strong>Wheelchair Accessible Kitchen:</strong> Socket outlets at 150mm above worktop (avoiding 
                          splash zones), switches at 900-1000mm height, consumer unit relocated to accessible height 
                          with clear approach space. All controls within easy reach from seated position.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
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
          <Separator className="my-6" />

          {/* BS 7671 Considerations */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">4. BS 7671 Considerations</h3>
            <p className="text-base text-foreground mb-4">
              BS 7671 contains specific regulations that directly impact design for expansion, maintenance, and accessibility. Understanding these requirements ensures legal compliance and safe operation.
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-amber-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-amber-600 dark:text-amber-400 mb-1">Key Regulatory Requirements</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Regulation 132.9 - Maintenance Access:</strong></p>
                        <div className="bg-background/50 p-3 rounded border mb-2">
                          <ul className="text-xs sm:text-sm text-foreground space-y-2">
                            <li><strong>132.9.1:</strong> "An electrical installation shall be designed to facilitate safe operation, maintenance and repair."</li>
                            <li><strong>Practical application:</strong> All electrical equipment must be positioned for safe access</li>
                            <li><strong>Working space:</strong> Adequate space for maintenance operations</li>
                            <li><strong>Inspection access:</strong> All connections and terminations accessible</li>
                            <li><strong>Test access:</strong> Provision for periodic testing requirements</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Regulation 314.1 - Circuit Arrangement:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li><strong>314.1.1:</strong> Every installation divided into circuits to avoid danger</li>
                          <li><strong>314.1.2:</strong> Circuits arranged to minimise inconvenience in fault conditions</li>
                          <li><strong>314.1.3:</strong> Separate circuits for different types of supply</li>
                          <li><strong>Maintenance implications:</strong> Allow partial shutdown for work</li>
                          <li><strong>Emergency arrangements:</strong> Critical circuits identified and protected</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Regulation 132.12 - Accessibility:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li><strong>General requirement:</strong> All equipment accessible for operation and maintenance</li>
                          <li><strong>Operating height:</strong> Controls within reach of intended users</li>
                          <li><strong>Safety considerations:</strong> No compromise on safety for accessibility</li>
                          <li><strong>Clear marking:</strong> All circuits and equipment clearly identified</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Additional Relevant Regulations:</strong></p>
                        <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded border border-amber-200 dark:border-amber-800">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="font-medium text-amber-700 dark:text-amber-400 mb-2">Expansion Considerations</p>
                              <ul className="text-xs text-foreground space-y-1">
                                <li>• <strong>311.1:</strong> Assessment of general characteristics</li>
                                <li>• <strong>313.1:</strong> Supplies for safety services</li>
                                <li>• <strong>433.1:</strong> Protection against overload</li>
                                <li>• <strong>525.1:</strong> Voltage drop limitations</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-amber-700 dark:text-amber-400 mb-2">Safety & Maintenance</p>
                              <ul className="text-xs text-foreground space-y-1">
                                <li>• <strong>514.1:</strong> Identification and notices</li>
                                <li>• <strong>537.1:</strong> Isolation and switching</li>
                                <li>• <strong>610.1:</strong> Initial verification</li>
                                <li>• <strong>621.1:</strong> Periodic inspection and testing</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Documentation Requirements (BS 7671 Section 514):</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li><strong>514.5.1:</strong> Diagrams, charts or tables for every installation</li>
                          <li><strong>514.8.1:</strong> Warning notices where required</li>
                          <li><strong>514.9.1:</strong> Circuit identification at distribution boards</li>
                          <li><strong>Expansion planning:</strong> Diagrams must show spare ways and future provisions</li>
                          <li><strong>Maintenance records:</strong> Space for recording modifications and tests</li>
                        </ul>
                      </div>

                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                        <p className="font-medium text-red-700 dark:text-emerald-400 mb-2">Regulatory Priority Hierarchy</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          1. <strong>Safety first:</strong> BS 7671 safety requirements cannot be compromised<br/>
                          2. <strong>Accessibility second:</strong> Part M requirements where they do not conflict with safety<br/>
                          3. <strong>Convenience third:</strong> User convenience within safety and accessibility constraints<br/>
                          Always consult current regulations as they are regularly updated.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Risks of Ignoring These Principles */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">5. Risks of Ignoring These Principles</h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-950/30 rounded border border-red-200 dark:border-red-800">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-foreground">Costly upgrades in the future</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-950/30 rounded border border-red-200 dark:border-red-800">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-foreground">Unsafe working conditions for maintenance engineers</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-950/30 rounded border border-red-200 dark:border-red-800">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-foreground">Non-compliance with Building Regulations</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-950/30 rounded border border-red-200 dark:border-red-800">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-foreground">User dissatisfaction</span>
              </div>
            </div>
          </section>
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-8 p-6 bg-emerald-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-6 h-6 text-emerald-400" />
            <h2 className="text-lg sm:text-xl font-semibold text-blue-800 dark:text-blue-200">Practical Guidance</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <p className="font-medium text-blue-700 dark:text-emerald-400 mb-3">Expansion Planning Checklist:</p>
              <ul className="space-y-2 text-blue-700 dark:text-emerald-400">
                <li>• Leave at least 20–25% spare capacity in distribution boards</li>
                <li>• Plan for EV charging (32A), heat pumps (40A+), solar PV (16-32A)</li>
                <li>• Size main supply cable for 120% expected maximum demand</li>
                <li>• Coordinate with DNO for future supply upgrades</li>
                <li>• Document all future provisions on installation drawings</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-blue-700 dark:text-emerald-400 mb-3">Maintenance & Accessibility:</p>
              <ul className="space-y-2 text-blue-700 dark:text-emerald-400">
                <li>• Avoid fully filling trunking — allow 30–40% spare space</li>
                <li>• Install local isolators within 3m of fixed equipment</li>
                <li>• Follow Part M socket heights: 450-1200mm above FFL</li>
                <li>• Switch heights: 900-1200mm for accessibility compliance</li>
                <li>• Label all circuits clearly with permanent, legible labels</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Multiple Real-World Examples */}
        <Card className="mb-8 p-6 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
          <h2 className="text-lg sm:text-xl font-semibold text-amber-800 dark:text-amber-200 mb-4">Real-World Examples</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-l-orange-400 pl-4">
              <p className="font-medium text-amber-800 dark:text-amber-200 mb-2">Example 1: Commercial Office Retrofit</p>
              <p className="text-amber-700 dark:text-amber-300 text-sm italic">
                A commercial office was designed with no spare ways in the distribution board. Two years later, the client 
                requested EV charging points, but there was no capacity. The entire board had to be replaced at great cost, 
                causing significant business disruption. A little foresight in design would have saved thousands of pounds.
              </p>
            </div>
            
            <div className="border-l-4 border-l-orange-400 pl-4">
              <p className="font-medium text-amber-800 dark:text-amber-200 mb-2">Example 2: Accessible Housing Design</p>
              <p className="text-amber-700 dark:text-amber-300 text-sm italic">
                A new housing development initially had standard socket heights (150mm above skirting). Following Part M 
                requirements, sockets were repositioned to 600mm height. This simple change eliminated the need for costly 
                adaptations and made the homes suitable for wheelchair users from day one.
              </p>
            </div>
            
            <div className="border-l-4 border-l-orange-400 pl-4">
              <p className="font-medium text-amber-800 dark:text-amber-200 mb-2">Example 3: Industrial Maintenance Access</p>
              <p className="text-amber-700 dark:text-amber-300 text-sm italic">
                A factory installation placed the main distribution board 3 meters high with no platform access. During an 
                emergency shutdown, maintenance staff could not safely reach the isolators. The installation was non-compliant 
                with BS 7671 Reg 132.9 and required expensive remedial work including platform installation.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQs Section */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="border-b border-border/20 pb-4">
              <p className="font-medium text-foreground mb-2">Q: How much spare capacity should I leave in a domestic distribution board?</p>
              <p className="text-sm text-muted-foreground">
                A: Minimum 2-3 spare ways, optimally 25% of total ways. For a 12-way board, include at least 3 spare ways. 
                Consider specific future loads: EV charger (32A), heat pump (40A+), solar PV (16-32A), plus general spares.
              </p>
            </div>
            
            <div className="border-b border-border/20 pb-4">
              <p className="font-medium text-foreground mb-2">Q: Can I install sockets at any height for accessibility?</p>
              <p className="text-sm text-muted-foreground">
                A: No. Part M requires sockets between 450-1200mm above finished floor level. The optimum height for 
                wheelchair access is 600-1000mm. Kitchen sockets should be 15-45mm above worktop level, maintaining safe zones.
              </p>
            </div>
            
            <div className="border-b border-border/20 pb-4">
              <p className="font-medium text-foreground mb-2">Q: What working space is required around distribution boards?</p>
              <p className="text-sm text-muted-foreground">
                A: BS 7671 Reg 132.12 requires minimum 1000mm clear space in front of distribution boards. Side access of 
                500mm where required. Adequate lighting (200 lux minimum) and 2000mm headroom are also essential.
              </p>
            </div>
            
            <div className="border-b border-border/20 pb-4">
              <p className="font-medium text-foreground mb-2">Q: How do I plan for three-phase upgrade in single-phase installations?</p>
              <p className="text-sm text-muted-foreground">
                A: Reserve space in the meter position for three-phase supply. Size the distribution board enclosure to 
                accommodate larger three-phase main switch and additional ways. Check DNO capacity early in design process.
              </p>
            </div>
            
            <div>
              <p className="font-medium text-foreground mb-2">Q: What labelling standards should I follow for future maintenance?</p>
              <p className="text-sm text-muted-foreground">
                A: Use permanent, weather-resistant labels with clear, legible text. Follow BS 7671 Section 514 requirements. 
                Include circuit function, rating, and any special requirements. Update labels when modifications are made.
              </p>
            </div>
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border-2 border-slate-300 dark:border-slate-600">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
              <Calculator className="w-5 h-5" />
              Pocket Guide – Expansion, Maintenance & Accessibility
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Expansion Planning */}
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm border-b border-slate-300 dark:border-slate-600 pb-1">
                  EXPANSION PLANNING
                </h4>
                <div className="space-y-3">
                  <div className="bg-white dark:bg-slate-700 p-3 rounded border border-slate-200 dark:border-slate-600">
                    <p className="font-medium text-xs text-slate-700 dark:text-slate-300 mb-1">Distribution Boards</p>
                    <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                      <li>• 20-25% spare ways minimum</li>
                      <li>• Size for future 3-phase upgrade</li>
                      <li>• Document spare provisions</li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-slate-700 p-3 rounded border border-slate-200 dark:border-slate-600">
                    <p className="font-medium text-xs text-slate-700 dark:text-slate-300 mb-1">Future Loads</p>
                    <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                      <li>• EV charger: 32A way</li>
                      <li>• Heat pump: 40A+ way</li>
                      <li>• Solar PV: 16-32A way</li>
                      <li>• Battery storage provisions</li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-slate-700 p-3 rounded border border-slate-200 dark:border-slate-600">
                    <p className="font-medium text-xs text-slate-700 dark:text-slate-300 mb-1">Supply Sizing</p>
                    <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                      <li>• Main cable: 120% expected demand</li>
                      <li>• DNO coordination essential</li>
                      <li>• Voltage drop considerations</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Maintenance Access */}
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm border-b border-slate-300 dark:border-slate-600 pb-1">
                  MAINTENANCE ACCESS
                </h4>
                <div className="space-y-3">
                  <div className="bg-white dark:bg-slate-700 p-3 rounded border border-slate-200 dark:border-slate-600">
                    <p className="font-medium text-xs text-slate-700 dark:text-slate-300 mb-1">Working Space (BS 7671)</p>
                    <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                      <li>• Front: 1000mm minimum</li>
                      <li>• Side: 500mm where required</li>
                      <li>• Height: 2000mm headroom</li>
                      <li>• Lighting: 200 lux minimum</li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-slate-700 p-3 rounded border border-slate-200 dark:border-slate-600">
                    <p className="font-medium text-xs text-slate-700 dark:text-slate-300 mb-1">Isolation & Control</p>
                    <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                      <li>• Local isolators ≤3m from equipment</li>
                      <li>• Lockable for dangerous equipment</li>
                      <li>• Emergency stops accessible</li>
                      <li>• Clear labelling mandatory</li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-slate-700 p-3 rounded border border-slate-200 dark:border-slate-600">
                    <p className="font-medium text-xs text-slate-700 dark:text-slate-300 mb-1">Cable Containment</p>
                    <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                      <li>• 30-40% spare space in trunking</li>
                      <li>• Accessible for additional cables</li>
                      <li>• Fire compartment integrity</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Accessibility Compliance */}
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm border-b border-slate-300 dark:border-slate-600 pb-1">
                  ACCESSIBILITY (PART M)
                </h4>
                <div className="space-y-3">
                  <div className="bg-white dark:bg-slate-700 p-3 rounded border border-slate-200 dark:border-slate-600">
                    <p className="font-medium text-xs text-slate-700 dark:text-slate-300 mb-1">Socket Heights</p>
                    <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                      <li>• General: 450-1200mm above FFL</li>
                      <li>• Optimum: 600-1000mm</li>
                      <li>• Kitchen: 15-45mm above worktop</li>
                      <li>• Avoid bathroom zones</li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-slate-700 p-3 rounded border border-slate-200 dark:border-slate-600">
                    <p className="font-medium text-xs text-slate-700 dark:text-slate-300 mb-1">Switch Heights</p>
                    <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                      <li>• Light switches: 900-1200mm</li>
                      <li>• Door entry: 900-1000mm</li>
                      <li>• Emergency controls: ≤1100mm</li>
                      <li>• Clear contrast required</li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-slate-700 p-3 rounded border border-slate-200 dark:border-slate-600">
                    <p className="font-medium text-xs text-slate-700 dark:text-slate-300 mb-1">Reach & Space</p>
                    <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                      <li>• Forward reach: 500mm max depth</li>
                      <li>• Clear space: 800×1200mm</li>
                      <li>• Door clearance: 300mm min</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Reference Tables */}
            <div className="mt-6 pt-4 border-t border-slate-300 dark:border-slate-600">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-emerald-50 dark:bg-blue-950/30 p-4 rounded border border-blue-200 dark:border-blue-800">
                  <h5 className="font-semibold text-sm text-blue-800 dark:text-blue-200 mb-2">Key BS 7671 Regulations</h5>
                  <div className="text-xs text-blue-700 dark:text-emerald-400 space-y-1">
                    <p><strong>132.9:</strong> Safe operation, maintenance & repair</p>
                    <p><strong>132.12:</strong> Accessibility for operation</p>
                    <p><strong>314.1:</strong> Circuit arrangement for maintenance</p>
                    <p><strong>514.9:</strong> Circuit identification required</p>
                    <p><strong>537.1:</strong> Isolation and switching provision</p>
                  </div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded border border-purple-200 dark:border-purple-800">
                  <h5 className="font-semibold text-sm text-purple-800 dark:text-purple-200 mb-2">Building Categories (Part M)</h5>
                  <div className="text-xs text-purple-700 dark:text-emerald-400 space-y-1">
                    <p><strong>Category 1:</strong> Basic accessibility (visitable)</p>
                    <p><strong>Category 2:</strong> Enhanced accessibility (adaptable)</p>
                    <p><strong>Category 3:</strong> Wheelchair accessible</p>
                    <p><strong>Commercial:</strong> DDA compliance mandatory</p>
                    <p><strong>Public:</strong> Enhanced accessibility features</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Quick Actions */}
            <div className="mt-6 pt-4 border-t border-slate-300 dark:border-slate-600">
              <h5 className="font-semibold text-sm text-slate-800 dark:text-slate-200 mb-3">Design Review Checklist ✓</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div>
                  <p className="font-medium text-slate-700 dark:text-slate-300 mb-1">Expansion Ready?</p>
                  <ul className="text-slate-600 dark:text-slate-400 space-y-0.5">
                    <li>□ Spare DB ways (25%)</li>
                    <li>□ Future load provisions</li>
                    <li>□ Cable route capacity</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-slate-700 dark:text-slate-300 mb-1">Maintenance Safe?</p>
                  <ul className="text-slate-600 dark:text-slate-400 space-y-0.5">
                    <li>□ Working space adequate</li>
                    <li>□ All isolators accessible</li>
                    <li>□ Clear labelling in place</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-slate-700 dark:text-slate-300 mb-1">Part M Compliant?</p>
                  <ul className="text-slate-600 dark:text-slate-400 space-y-0.5">
                    <li>□ Socket heights correct</li>
                    <li>□ Switch heights compliant</li>
                    <li>□ Reach zones considered</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-slate-700 dark:text-slate-300 mb-1">BS 7671 Compliant?</p>
                  <ul className="text-slate-600 dark:text-slate-400 space-y-0.5">
                    <li>□ Reg 132.9 satisfied</li>
                    <li>□ Circuit arrangement OK</li>
                    <li>□ Documentation complete</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Recap</h2>
          <p className="text-base text-foreground">
            In this subsection, you learned the importance of designing for future expansion, safe and easy maintenance, and user accessibility. You explored BS 7671 and Part M requirements, considered practical guidance for real-world installations, and saw the risks of ignoring these design principles. A good design is not only safe today but remains adaptable, serviceable, and user-friendly for years to come.
          </p>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-6">Quiz (10 Questions)</h2>
          <Quiz questions={quizQuestions} />
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-border/20">
          <Button variant="outline" asChild>
            <Link to="../2-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button asChild>
            <Link to="../2-6">
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module5Section2_5;