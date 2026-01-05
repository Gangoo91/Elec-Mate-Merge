import { ArrowLeft, ArrowRight, FileText, Target, CheckCircle, AlertTriangle, Users, BookOpen, Clipboard, Shield, Calculator, Zap, Gauge, Home, AlertCircle, TrendingUp, Settings, Building2, Lightbulb, Power, Cable, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

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
              <Cable className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              Section 5.2.4
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Zoning, Environmental Considerations, and Cable Choice
          </h1>
          <p className="text-muted-foreground">
            Learn about safe cable routing zones, environmental factors, and selecting appropriate cables for different applications in compliance with BS 7671.
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
                <li>Safe zones = within 150mm of corners/accessories.</li>
                <li>Environment affects cable choice (heat, moisture, UV).</li>
                <li>SWA for outdoors, T&E for domestic, LSZH for public buildings.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Cables outside zones need protection.</li>
                <li><strong>Use:</strong> BS 7671 Reg 522.6.202 and Appendix 4.</li>
                <li><strong>Check:</strong> Derating factors for grouping/temperature.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <p className="text-base text-foreground">
            Cables must be chosen and installed with regard to safety zones, environmental conditions, and the type of load they will serve. Incorrect cable choice or poor zoning practices can cause overheating, fire risk, or damage to property. This subsection introduces how installation zones, environmental factors, and cable selection work together to ensure safety and compliance with BS 7671.
          </p>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning Outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
            <li>Identify the correct safe zones for cable routing.</li>
            <li>Recognise how environment affects cable performance.</li>
            <li>Select appropriate cables for different applications.</li>
            <li>Apply BS 7671 guidance to cable zoning and environmental considerations.</li>
            <li>Ensure installations are both safe and fit for purpose.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content / Learning</h2>

          {/* Safe Zones for Cable Installation */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">1. Safe Zones for Cable Installation</h3>
            <p className="text-base text-foreground mb-4">
              BS 7671 defines specific safe zones where cables can be installed to minimise risk of accidental damage:
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-3">BS 7671 Safe Zone Requirements (Regulation 522.6.202)</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Permitted Safe Zones:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li><strong>Horizontally or vertically:</strong> From any point on an accessory to the boundary of the zone</li>
                          <li><strong>Within 150mm:</strong> Of the top of the wall (junction with ceiling)</li>
                          <li><strong>Within 150mm:</strong> Of the angle formed by two walls</li>
                          <li><strong>Accessory zones:</strong> Horizontally or vertically from switches, sockets, or other accessories</li>
                          <li><strong>Structural zones:</strong> Above or below structural members (beams, lintels)</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Zone Dimensions and Rules:</strong></p>
                        <div className="bg-background/50 p-3 rounded border mb-2">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="font-medium text-foreground mb-2">Horizontal Zones</p>
                              <ul className="text-xs sm:text-sm text-foreground space-y-1">
                                <li><strong>From accessories:</strong> Horizontal run to zone boundary</li>
                                <li><strong>Top zone:</strong> 150mm from ceiling/wall junction</li>
                                <li><strong>Above doors/windows:</strong> Within lintel zone</li>
                                <li><strong>Skirting level:</strong> 150mm from floor/wall junction</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-foreground mb-2">Vertical Zones</p>
                              <ul className="text-xs sm:text-sm text-foreground space-y-1">
                                <li><strong>From accessories:</strong> Vertical run to zone boundary</li>
                                <li><strong>Corner zones:</strong> 150mm from wall/wall junction</li>
                                <li><strong>Party walls:</strong> Consider zones on both sides</li>
                                <li><strong>Structural walls:</strong> Account for beam positions</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Outside Safe Zones - Protection Requirements:</strong></p>
                        <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded border border-orange-200 dark:border-orange-800">
                          <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                            <li><strong>Steel conduit:</strong> Earthed metallic conduit providing mechanical protection</li>
                            <li><strong>Steel trunking:</strong> Earthed metallic trunking systems</li>
                            <li><strong>Armoured cables:</strong> SWA or similar mechanically protected cables</li>
                            <li><strong>Earthed metallic covering:</strong> Cable with earthed metallic sheath or screen</li>
                            <li><strong>30mA RCD protection:</strong> Additional protection for concealed cables (Reg 522.6.203)</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Installation Depth Requirements:</strong></p>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div className="bg-background/30 p-3 rounded border">
                            <p className="font-medium text-foreground mb-1">Minimum Depths (from surface)</p>
                            <ul className="text-xs text-foreground list-disc ml-4 space-y-1">
                              <li><strong>Cables in safe zones:</strong> 50mm minimum depth</li>
                              <li><strong>With mechanical protection:</strong> Depth varies by protection type</li>
                              <li><strong>Solid walls:</strong> Consider wall construction thickness</li>
                              <li><strong>Hollow walls:</strong> Route through structured zones</li>
                            </ul>
                          </div>
                          <div className="bg-background/30 p-3 rounded border">
                            <p className="font-medium text-foreground mb-1">Special Considerations</p>
                            <ul className="text-xs text-foreground list-disc ml-4 space-y-1">
                              <li><strong>Thermal insulation:</strong> Avoid running through insulation where possible</li>
                              <li><strong>Plasterboard walls:</strong> Use appropriate fixings and depth</li>
                              <li><strong>Listed buildings:</strong> May have additional restrictions</li>
                              <li><strong>Party walls:</strong> Consider neighbour activities</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                        <p className="font-medium text-red-700 dark:text-emerald-400 mb-2">Critical Safety Points</p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li><strong>Never assume:</strong> Always check zone compliance before installation</li>
                          <li><strong>Document routes:</strong> Provide clear cable route drawings for future reference</li>
                          <li><strong>Mark positions:</strong> Use cable route markers where practical</li>
                          <li><strong>Consider future work:</strong> Think about likely drilling positions</li>
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
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Environmental Factors */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">2. Environmental Factors</h3>
            <p className="text-base text-foreground mb-4">
              Environmental conditions significantly affect cable performance and longevity:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Environmental Impact on Cable Performance</p>
                    
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-background/30 p-4 rounded border">
                          <p className="font-medium text-foreground mb-2">Temperature Effects</p>
                          <ul className="text-xs sm:text-sm text-foreground list-disc ml-4 space-y-1">
                            <li><strong>High ambient temperature:</strong> Reduces cable current-carrying capacity</li>
                            <li><strong>Heat sources:</strong> Boilers, heating pipes, direct sunlight</li>
                            <li><strong>Derating required:</strong> Use BS 7671 Appendix 4 correction factors</li>
                            <li><strong>Thermal cycling:</strong> Repeated heating/cooling causes stress</li>
                            <li><strong>Fire risk:</strong> Overheating can cause insulation breakdown</li>
                          </ul>
                        </div>
                        
                        <div className="bg-background/30 p-4 rounded border">
                          <p className="font-medium text-foreground mb-2">Moisture and Humidity</p>
                          <ul className="text-xs sm:text-sm text-foreground list-disc ml-4 space-y-1">
                            <li><strong>Insulation degradation:</strong> Moisture penetration reduces performance</li>
                            <li><strong>Corrosion risk:</strong> Metal components affected by dampness</li>
                            <li><strong>Special locations:</strong> Bathrooms require IPX4 minimum rating</li>
                            <li><strong>Outdoor exposure:</strong> Weather-resistant materials essential</li>
                            <li><strong>Condensation:</strong> Temperature differential areas need consideration</li>
                          </ul>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-background/30 p-4 rounded border">
                          <p className="font-medium text-foreground mb-2">UV Exposure and Sunlight</p>
                          <ul className="text-xs sm:text-sm text-foreground list-disc ml-4 space-y-1">
                            <li><strong>UV degradation:</strong> Standard PVC breaks down in sunlight</li>
                            <li><strong>Black sheath preference:</strong> UV-resistant formulations available</li>
                            <li><strong>Cover requirements:</strong> Protect exposed cables from direct sunlight</li>
                            <li><strong>Outdoor installations:</strong> Use UV-stable materials</li>
                            <li><strong>Roof spaces:</strong> Consider solar heating effects</li>
                          </ul>
                        </div>
                        
                        <div className="bg-background/30 p-4 rounded border">
                          <p className="font-medium text-foreground mb-2">Chemical and Mechanical Hazards</p>
                          <ul className="text-xs sm:text-sm text-foreground list-disc ml-4 space-y-1">
                            <li><strong>Chemical exposure:</strong> Acids, alkalis, oils, solvents</li>
                            <li><strong>Mechanical damage:</strong> Impact, abrasion, crushing forces</li>
                            <li><strong>Vibration effects:</strong> Machinery causing cable fatigue</li>
                            <li><strong>Rodent damage:</strong> Animal attack on cable sheathing</li>
                            <li><strong>Industrial environments:</strong> Multiple hazard combinations</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Environmental Classification System:</strong></p>
                        <div className="bg-background/50 p-3 rounded border mb-2">
                          <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                            <div>
                              <p className="font-medium text-foreground mb-1">Internal Environments</p>
                              <ul className="text-xs text-foreground list-disc ml-4 space-y-1">
                                <li><strong>Dry locations:</strong> Normal domestic/office areas</li>
                                <li><strong>Damp locations:</strong> Kitchens, utility rooms</li>
                                <li><strong>Wet locations:</strong> Bathrooms, shower rooms</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-foreground mb-1">External Environments</p>
                              <ul className="text-xs text-foreground list-disc ml-4 space-y-1">
                                <li><strong>Weather exposure:</strong> Rain, snow, temperature variation</li>
                                <li><strong>Underground:</strong> Soil conditions, drainage, chemicals</li>
                                <li><strong>Overhead:</strong> Wind loading, UV exposure, birds</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-foreground mb-1">Special Locations</p>
                              <ul className="text-xs text-foreground list-disc ml-4 space-y-1">
                                <li><strong>Hazardous areas:</strong> Explosive atmospheres</li>
                                <li><strong>Medical locations:</strong> Hospital equipment areas</li>
                                <li><strong>Agricultural:</strong> Livestock, feed materials, cleaning</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
          <Separator className="my-6" />

          {/* Cable Types and Applications */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">3. Cable Types and Applications</h3>
            <p className="text-base text-foreground mb-4">
              Different cable types are designed for specific applications and environmental conditions:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-1">Cable Selection for Different Applications</p>
                    
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-background/30 p-4 rounded border">
                          <p className="font-medium text-foreground mb-2">Twin & Earth (T&E) - 6242Y/6243Y</p>
                          <ul className="text-xs sm:text-sm text-foreground list-disc ml-4 space-y-1">
                            <li><strong>Construction:</strong> 2 insulated conductors + bare CPC in PVC sheath</li>
                            <li><strong>Applications:</strong> Standard domestic fixed wiring</li>
                            <li><strong>Voltage rating:</strong> 300/500V to earth/between conductors</li>
                            <li><strong>Installation:</strong> Internal use only, must be mechanically protected</li>
                            <li><strong>Advantages:</strong> Cost-effective, easy to install, widely available</li>
                            <li><strong>Limitations:</strong> Not suitable for damp or outdoor locations</li>
                          </ul>
                        </div>
                        
                        <div className="bg-background/30 p-4 rounded border">
                          <p className="font-medium text-foreground mb-2">Steel Wire Armoured (SWA)</p>
                          <ul className="text-xs sm:text-sm text-foreground list-disc ml-4 space-y-1">
                            <li><strong>Construction:</strong> Insulated conductors + steel wire armouring + outer sheath</li>
                            <li><strong>Applications:</strong> Outdoor, underground, high mechanical stress</li>
                            <li><strong>Armouring benefits:</strong> Mechanical protection + earthing conductor</li>
                            <li><strong>Voltage ratings:</strong> Available up to 11kV and beyond</li>
                            <li><strong>Installation:</strong> Direct burial, overhead, industrial environments</li>
                            <li><strong>Termination:</strong> Requires special glands and techniques</li>
                          </ul>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-background/30 p-4 rounded border">
                          <p className="font-medium text-foreground mb-2">Flexible Cables (H05VV-F, H07RN-F)</p>
                          <ul className="text-xs sm:text-sm text-foreground list-disc ml-4 space-y-1">
                            <li><strong>Construction:</strong> Stranded conductors for flexibility</li>
                            <li><strong>Applications:</strong> Appliances, temporary connections, portable equipment</li>
                            <li><strong>Types:</strong> Light duty (H05), heavy duty (H07), outdoor (H07RN-F)</li>
                            <li><strong>Benefits:</strong> Flexibility, various sheath materials available</li>
                            <li><strong>Installation:</strong> Not suitable for permanent fixed wiring</li>
                            <li><strong>Standards:</strong> BS EN 50525 series specifications</li>
                          </ul>
                        </div>
                        
                        <div className="bg-background/30 p-4 rounded border">
                          <p className="font-medium text-foreground mb-2">LSF/LSZH Cables</p>
                          <ul className="text-xs sm:text-sm text-foreground list-disc ml-4 space-y-1">
                            <li><strong>LSF:</strong> Low Smoke and Fume - reduced smoke emission</li>
                            <li><strong>LSZH:</strong> Low Smoke Zero Halogen - no toxic gases</li>
                            <li><strong>Applications:</strong> Schools, hospitals, public buildings, escape routes</li>
                            <li><strong>Fire performance:</strong> Better evacuation conditions during fire</li>
                            <li><strong>Cost:</strong> Higher than standard PVC but essential for safety</li>
                            <li><strong>Standards:</strong> BS 7211, BS EN 50267 for smoke/gas emission</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Specialised Cable Types:</strong></p>
                        <div className="grid md:grid-cols-3 gap-3">
                          <div className="bg-background/50 p-3 rounded border">
                            <p className="font-medium text-foreground mb-1">Fire Resistant Cables</p>
                            <ul className="text-xs text-foreground list-disc ml-4 space-y-1">
                              <li><strong>FP200:</strong> Mineral insulated fire survival cable</li>
                              <li><strong>Applications:</strong> Fire alarms, emergency lighting</li>
                              <li><strong>Performance:</strong> Maintains circuit integrity in fire</li>
                              <li><strong>Standards:</strong> BS 8434, BS EN 50200</li>
                            </ul>
                          </div>
                          <div className="bg-background/50 p-3 rounded border">
                            <p className="font-medium text-foreground mb-1">Data/Communications</p>
                            <ul className="text-xs text-foreground list-disc ml-4 space-y-1">
                              <li><strong>Cat5e/Cat6:</strong> Structured cabling systems</li>
                              <li><strong>Coaxial:</strong> TV, satellite, broadband applications</li>
                              <li><strong>Fibre optic:</strong> High-speed data transmission</li>
                              <li><strong>Installation:</strong> Separate from power cables</li>
                            </ul>
                          </div>
                          <div className="bg-background/50 p-3 rounded border">
                            <p className="font-medium text-foreground mb-1">High Temperature Cables</p>
                            <ul className="text-xs text-foreground list-disc ml-4 space-y-1">
                              <li><strong>Silicone insulation:</strong> High temperature applications</li>
                              <li><strong>PTFE cables:</strong> Chemical resistance</li>
                              <li><strong>Mineral insulated:</strong> Ultimate fire performance</li>
                              <li><strong>Applications:</strong> Industrial heating, kilns, ovens</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
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
          <Separator className="my-6" />

          {/* Derating Factors */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">4. Derating Factors</h3>
            <p className="text-base text-foreground mb-4">
              Multiple factors can reduce a cable's current-carrying capacity and must be considered in design:
            </p>
            
            <div className="bg-background/50 p-4 rounded-lg border border-border/20 mb-4">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <p className="font-medium text-foreground mb-2">Primary Derating Factors:</p>
                  <ul className="text-xs sm:text-sm text-foreground space-y-2">
                    <li><strong>Grouping factor (Cg):</strong> Multiple cables together reduce heat dissipation</li>
                    <li><strong>Ambient temperature (Ca):</strong> Higher temperatures reduce capacity</li>
                    <li><strong>Thermal insulation (Ci):</strong> Surrounded by insulation materials</li>
                    <li><strong>Installation method:</strong> Different methods have different cooling</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-2">Calculation Process:</p>
                  <ul className="text-xs sm:text-sm text-foreground space-y-2">
                    <li><strong>Step 1:</strong> Determine base current-carrying capacity (Iz)</li>
                    <li><strong>Step 2:</strong> Apply all relevant correction factors</li>
                    <li><strong>Step 3:</strong> Derated capacity = Iz × Cg × Ca × Ci</li>
                    <li><strong>Step 4:</strong> Ensure derated capacity ≥ design current</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Coordination with Protective Devices */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">5. Coordination with Protective Devices</h3>
            <p className="text-base text-foreground mb-4">
              Cable selection must coordinate with protective devices and voltage drop requirements:
            </p>
            
            <div className="bg-background/50 p-4 rounded-lg border border-border/20 mb-4">
              <ul className="text-xs sm:text-sm text-foreground space-y-2">
                <li><strong>Current coordination:</strong> Cable current-carrying capacity (Iz) must be ≥ protective device rating (In)</li>
                <li><strong>Voltage drop limits:</strong> Maximum 3% for lighting, 5% for other uses per BS 7671</li>
                <li><strong>Fault protection:</strong> Cable must withstand fault current until protective device operates</li>
                <li><strong>Earth fault loop impedance:</strong> Must be low enough for protective device operation</li>
                <li><strong>Selectivity:</strong> Consider discrimination between protective devices</li>
              </ul>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Practical Guidance</h3>
            
            <div className="space-y-4">
              <div className="bg-card p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="font-medium text-emerald-400 dark:text-emerald-400 mb-2">Safe Zone Compliance</p>
                <ul className="text-xs sm:text-sm text-foreground space-y-1">
                  <li>✅ <strong>Always route cables in safe zones</strong> unless mechanical protection is used</li>
                  <li>✅ <strong>Document cable routes:</strong> Provide drawings for future maintenance</li>
                  <li>✅ <strong>Use cable detectors:</strong> Check for existing cables before drilling</li>
                  <li>✅ <strong>Mark cable positions:</strong> Use appropriate cable route markers</li>
                </ul>
              </div>
              
              <div className="bg-card p-4 rounded-lg border border-green-200 dark:border-green-800">
                <p className="font-medium text-green-600 dark:text-green-400 mb-2">Environmental Selection</p>
                <ul className="text-xs sm:text-sm text-foreground space-y-1">
                  <li>✅ <strong>Select cable sheath type</strong> based on environmental exposure (e.g., SWA outdoors)</li>
                  <li>✅ <strong>Consider all environmental factors:</strong> Heat, moisture, UV, chemicals</li>
                  <li>✅ <strong>Check IP ratings:</strong> Ensure adequate protection for location</li>
                  <li>✅ <strong>Plan for maintenance access:</strong> Consider future inspection requirements</li>
                </ul>
              </div>
              
              <div className="bg-card p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                <p className="font-medium text-purple-600 dark:text-emerald-400 mb-2">Derating and Calculations</p>
                <ul className="text-xs sm:text-sm text-foreground space-y-1">
                  <li>✅ <strong>Check derating factors</strong> when grouping cables or running through insulation</li>
                  <li>✅ <strong>Use BS 7671 Appendix 4:</strong> Consult tables for correction factors</li>
                  <li>✅ <strong>Consider ambient temperature:</strong> Standard ratings assume 30°C ambient</li>
                  <li>✅ <strong>Apply factors cumulatively:</strong> Multiple factors multiply together</li>
                </ul>
              </div>
              
              <div className="bg-card p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                <p className="font-medium text-orange-600 dark:text-emerald-400 mb-2">Special Applications</p>
                <ul className="text-xs sm:text-sm text-foreground space-y-1">
                  <li>✅ <strong>Use LSZH cables</strong> where fire safety is critical (e.g., schools, hospitals)</li>
                  <li>✅ <strong>Verify compliance:</strong> Using BS 7671 tables and manufacturer data</li>
                  <li>✅ <strong>Consider future needs:</strong> Allow for potential load increases</li>
                  <li>✅ <strong>Check local requirements:</strong> Some areas have additional restrictions</li>
                </ul>
              </div>
            </div>
          </section>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Real-World Example</h2>
          <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-orange-600 dark:text-emerald-400 mb-2">The New-Build Site Cable Strike</p>
                <p className="text-base text-foreground mb-3">
                  <strong>The Scenario:</strong> On a new-build site, an electrician ran T&E cables across a bathroom wall outside of safe zones. Later, when tiling, a worker drilled into the wall and hit a live cable. The installation should have either followed safe zones or used mechanical protection.
                </p>
                
                <div className="bg-background/30 p-4 rounded-lg mb-3">
                  <p className="font-medium text-foreground mb-2">The Problem:</p>
                  <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                    <li><strong>Poor route planning:</strong> Cables run diagonally to save cable length</li>
                    <li><strong>No zone compliance:</strong> Route was outside both horizontal and vertical safe zones</li>
                    <li><strong>No protection:</strong> Standard T&E cable used without mechanical protection</li>
                    <li><strong>Inadequate depth:</strong> Cables only 25mm from surface</li>
                    <li><strong>Poor communication:</strong> Follow-on trades not informed of cable routes</li>
                  </ul>
                </div>
                
                <div className="bg-card p-4 rounded-lg mb-3 border border-red-500/20">
                  <p className="font-medium text-red-600 dark:text-emerald-400 mb-2">The Consequences:</p>
                  <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                    <li><strong>Cable strike incident:</strong> Live cable hit by drill during tiling work</li>
                    <li><strong>RCD tripped:</strong> Circuit lost power, affecting other bathroom circuits</li>
                    <li><strong>Safety hazard:</strong> Risk of electric shock to the tile fixer</li>
                    <li><strong>Damage costs:</strong> Cable repair, wall repair, tile replacement</li>
                    <li><strong>Project delays:</strong> Work stopped for safety investigation</li>
                    <li><strong>Regulatory issues:</strong> HSE investigation due to safety incident</li>
                  </ul>
                </div>
                
                <div className="bg-card p-4 rounded-lg border border-green-500/20">
                  <p className="font-medium text-green-600 dark:text-green-400 mb-2">The Correct Approach:</p>
                  <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                    <li><strong>Safe zone routing:</strong> Route horizontally from switch and vertically to ceiling</li>
                    <li><strong>Alternative protection:</strong> Use steel conduit if routing outside zones necessary</li>
                    <li><strong>Proper documentation:</strong> Mark cable routes on drawings for other trades</li>
                    <li><strong>Site coordination:</strong> Brief all trades on electrical installation locations</li>
                    <li><strong>Cable detection:</strong> Provide cable detection equipment for drilling work</li>
                  </ul>
                </div>
                
                <div className="text-xs sm:text-sm text-foreground bg-background/50 p-3 rounded border mt-3">
                  <strong>Key lesson:</strong> Always follow BS 7671 safe zones or provide adequate mechanical protection. Proper coordination between trades prevents dangerous and costly incidents.
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-6">
            <div className="flex items-center gap-3">
              <Clipboard className="w-6 h-6" />
              Pocket Guide – Zoning & Cable Choice
            </div>
          </h2>
          
          {/* Mobile: Stack vertically, Desktop: 2x2 Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {/* Top Left - Safe Zone Rules */}
            <div className="bg-card p-5 rounded-lg border border-blue-200 dark:border-blue-800 h-full">
              <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-3 text-base">Safe Zone Rules</p>
              <ul className="text-xs sm:text-sm text-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✅</span>
                  <span>Cables in safe zones only (150 mm rule)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✅</span>
                  <span>Horizontal/vertical from accessories</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✅</span>
                  <span>Mechanical protection outside zones</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✅</span>
                  <span>BS 7671 Regulation 522.6.202</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✅</span>
                  <span>Document cable routes for others</span>
                </li>
              </ul>
            </div>

            {/* Top Right - Cable Selection */}
            <div className="bg-card p-5 rounded-lg border border-purple-200 dark:border-purple-800 h-full">
              <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-3 text-base">Cable Selection</p>
              <ul className="text-xs sm:text-sm text-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">🏠</span>
                  <span>T&E for domestic fixed wiring</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">🌧️</span>
                  <span>Use SWA outdoors or underground</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">🔥</span>
                  <span>LSZH cables in public buildings for fire safety</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">⚡</span>
                  <span>Flexible cables for appliances only</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">🌡️</span>
                  <span>Consider environmental factors</span>
                </li>
              </ul>
            </div>

            {/* Bottom Left - Environmental Factors */}
            <div className="bg-card p-5 rounded-lg border border-green-200 dark:border-green-800 h-full">
              <p className="font-semibold text-green-600 dark:text-green-400 mb-3 text-base">Environmental Factors</p>
              <ul className="text-xs sm:text-sm text-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">🌡️</span>
                  <span>Heat derates cable capacity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">💧</span>
                  <span>Moisture requires special cable types</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">☀️</span>
                  <span>UV exposure needs resistant materials</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">⚗️</span>
                  <span>Chemical exposure needs protection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">🔧</span>
                  <span>Mechanical damage risk assessment</span>
                </li>
              </ul>
            </div>

            {/* Bottom Right - Derating & Protection */}
            <div className="bg-card p-5 rounded-lg border border-orange-200 dark:border-orange-800 h-full">
              <p className="font-semibold text-orange-600 dark:text-emerald-400 mb-3 text-base">Derating & Protection</p>
              <ul className="text-xs sm:text-sm text-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">📊</span>
                  <span>Apply derating factors for grouping/insulation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">⚡</span>
                  <span>Match cable rating ≥ protective device rating</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">📉</span>
                  <span>Max voltage drop: 3% lighting, 5% other</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">📋</span>
                  <span>Use BS 7671 Appendix 4 tables</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">🔍</span>
                  <span>Consider all correction factors</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Remember Section */}
          <div className="mt-6 p-4 bg-background/50 rounded-lg border border-border/20">
            <p className="text-xs sm:text-sm text-foreground text-center leading-relaxed">
              <strong>Remember:</strong> Safe cable installation requires proper zoning, environmental consideration, and appropriate cable selection. 
              Always follow BS 7671 guidance and document routes for future reference.
            </p>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Recap</h2>
          <p className="text-base text-foreground">
            In this subsection, you learned about cable zoning requirements, environmental influences, and cable selection principles. You explored how heat, moisture, and mechanical damage can impact cable choice, how BS 7671 defines safe zones, and how derating factors affect current-carrying capacity. You also learned practical steps for ensuring safety and compliance in real-world installations.
          </p>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-l-4 border-l-emerald-500 pl-4">
                <p className="font-medium text-foreground mb-2">Q: {faq.question}</p>
                <p className="text-sm text-muted-foreground">A: {faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-border/20">
          <Button variant="outline" asChild>
            <Link to="../2-3" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </Button>
          <Button asChild>
            <Link to="../2-5" className="flex items-center gap-2">
              Next
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module5Section2_4;