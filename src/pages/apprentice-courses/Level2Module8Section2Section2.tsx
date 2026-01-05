import { Link } from "react-router-dom";
import { ArrowLeft, Search, Target, CheckCircle, AlertTriangle, BookOpen, Zap, Users, TrendingUp, Timer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useSEO from "@/hooks/useSEO";

const Level2Module8Section2Section2 = () => {
  useSEO(
    "Question Analysis Techniques - Level 2 Electrical Installation Exams",
    "Master effective question analysis techniques for Level 2 electrical installation exams. Learn proven strategies for understanding exam questions, identifying key information, and improving answer accuracy."
  );

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link 
            to=".." 
            className="inline-flex items-center text-muted-foreground hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to How to Pass Exams
          </Link>
        </div>
        
        {/* Hero Section */}
        <div className="text-center mb-6 p-4 bg-gradient-to-r from-card to-muted rounded-lg border border-emerald-500/30">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-500/20 rounded-full mb-3">
            <Search className="h-6 w-6 text-emerald-400" />
          </div>
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3">
            Question Analysis Techniques
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
            Master the critical skill of question analysis to dramatically improve your exam performance. 
            Learn systematic techniques for decoding questions, identifying key information, and applying proven analysis methods.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-emerald-500/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400 mb-1">78%</div>
            <div className="text-sm text-muted-foreground">Improvement with analysis</div>
          </div>
          <div className="bg-card border border-emerald-500/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400 mb-1">5-step</div>
            <div className="text-sm text-muted-foreground">Analysis process</div>
          </div>
          <div className="bg-card border border-emerald-500/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400 mb-1">45 secs</div>
            <div className="text-sm text-muted-foreground">Average analysis time</div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Pre-Exam Question Analysis Strategy */}
          <Card className="border-emerald-500/30 bg-card">
            <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-transparent">
              <CardTitle className="flex items-center gap-3 text-foreground">
                <BookOpen className="h-6 w-6 text-emerald-400" />
                Pre-Exam Question Analysis Strategy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                    <Zap className="h-4 w-4 text-emerald-400" />
                    Question Decoding Framework
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-muted/50 rounded-lg border-l-4 border-emerald-500">
                      <div className="font-medium text-emerald-400 text-sm">Pre-Reading Techniques</div>
                      <div className="text-sm text-muted-foreground mb-2">Essential first steps before attempting any question</div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>• Read question stem twice before viewing options</div>
                        <div>• Identify subject area (installation, testing, safety)</div>
                        <div>• Look for scenario clues (domestic, commercial, industrial)</div>
                        <div>• Note any specific BS7671 references or hints</div>
                        <div>• Determine required answer format</div>
                      </div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg border-l-4 border-emerald-500">
                      <div className="font-medium text-emerald-400 text-sm">Question Type Recognition</div>
                      <div className="text-sm text-muted-foreground mb-2">Identify approach needed for different question types</div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>• Knowledge: Direct recall of facts and regulations</div>
                        <div>• Application: Scenario-based practical problems</div>
                        <div>• Calculation: Mathematical solutions required</div>
                        <div>• Analysis: Complex multi-step reasoning</div>
                        <div>• Evaluation: Judgement of best solution</div>
                      </div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg border-l-4 border-green-500">
                      <div className="font-medium text-green-400 text-sm">Command Word Understanding</div>
                      <div className="text-sm text-muted-foreground mb-2">Master these key command words for accurate responses</div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>• IDENTIFY/LIST: Name specific items without explanation</div>
                        <div>• EXPLAIN: Provide reasons why something happens</div>
                        <div>• DESCRIBE: Detail how something works or processes</div>
                        <div>• CALCULATE: Work out numerical answers using formulas</div>
                        <div>• COMPARE: Show similarities and differences clearly</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                    <Target className="h-4 w-4 text-emerald-400" />
                    Strategic Analysis Preparation
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Context mapping:</strong> Link questions to real installation scenarios</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Regulation linking:</strong> Connect questions to specific BS7671 parts</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Pattern recognition:</strong> Identify recurring question structures</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Trap identification:</strong> Recognise common misleading options</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Safety prioritisation:</strong> Always consider safety implications first</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Elimination strategy:</strong> Systematically remove incorrect options</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-card rounded-lg border border-border/30">
                    <h5 className="font-semibold text-emerald-400 mb-2">Question Analysis Checklist</h5>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>✓ Subject area identified (Part 1-7 BS7671)</div>
                      <div>✓ Installation context understood (domestic/commercial)</div>
                      <div>✓ Required calculation method determined</div>
                      <div>✓ Safety considerations evaluated</div>
                      <div>✓ Expected answer format confirmed</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-500/10 to-transparent p-4 rounded-lg border border-emerald-500/30">
                <h5 className="font-semibold text-emerald-400 mb-2">Pro Tip: The 25% Rule & Elimination Strategy</h5>
                <p className="text-sm text-muted-foreground mb-3">
                  If you can eliminate just one wrong answer from a 4-option multiple choice question, 
                  your chances improve from 25% to 33% - that's a significant advantage over random guessing!
                </p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div><strong>Level 1 Elimination:</strong> Remove obviously wrong answers (safety violations, impossible values)</div>
                  <div><strong>Level 2 Elimination:</strong> Use BS7671 knowledge to eliminate non-compliant options</div>
                  <div><strong>Level 3 Elimination:</strong> Apply practical experience to identify impractical solutions</div>
                  <div><strong>Final Decision:</strong> Choose the most logical remaining option - trust your training</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-500/10 to-transparent p-4 rounded-lg border border-green-500/30">
                <h5 className="font-semibold text-green-400 mb-2">Question Pattern Recognition Matrix</h5>
                <p className="text-sm text-muted-foreground mb-3">
                  C&G exams follow predictable patterns. Learning these can save precious analysis time:
                </p>
                <div className="text-xs text-muted-foreground space-y-2">
                  <div><strong>Safety Questions (15-20%):</strong> Usually have obvious correct answers - analyse quickly for compliance</div>
                  <div><strong>Calculation Questions (20-25%):</strong> Often involve Ohm's law, power formulas, or cable sizing calculations</div>
                  <div><strong>BS7671 Regulation Questions (30-35%):</strong> Direct references to specific regulation numbers and requirements</div>
                  <div><strong>Practical Application (20-25%):</strong> Scenario-based questions requiring installation experience</div>
                  <div><strong>Installation Methods (10-15%):</strong> Cable routes, protection methods, earthing system analysis</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Written Exam Question Analysis */}
          <Card className="border-emerald-500/30 bg-card">
            <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-transparent">
              <CardTitle className="flex items-center gap-3 text-foreground">
                <Timer className="h-6 w-6 text-emerald-400" />
                Written Exam Question Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div>
                <h4 className="font-semibold mb-4 text-foreground text-lg">The Proven 5-Step Analysis Process</h4>
                <div className="space-y-4">
                    <div className="relative p-5 bg-gradient-to-r from-green-500/10 to-transparent rounded-lg border border-green-500/30">
                    <div className="absolute top-3 left-3 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                    <div className="ml-12">
                      <h5 className="font-medium text-green-400 text-lg mb-2">SCAN - Initial Question Assessment</h5>
                      <p className="text-sm text-muted-foreground mb-3">
                        Quickly assess question type, complexity, and required knowledge areas before diving deep.
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <h6 className="text-xs font-medium text-green-400 mb-1">IDENTIFY:</h6>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div>• Subject area (Part of BS7671)</div>
                            <div>• Question complexity (1-5 scale)</div>
                            <div>• Time requirement estimate</div>
                            <div>• Required tools (calculator, BS7671)</div>
                            <div>• Installation context (domestic/commercial)</div>
                            <div>• Safety implications level</div>
                          </div>
                        </div>
                        <div>
                          <h6 className="text-xs font-medium text-green-400 mb-1">LOOK FOR:</h6>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div>• Diagrams or circuit drawings</div>
                            <div>• Numerical values in question stem</div>
                            <div>• Specific regulation references</div>
                            <div>• Installation context clues</div>
                            <div>• Environmental condition indicators</div>
                            <div>• Load characteristic descriptions</div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 p-2 bg-green-500/20 rounded text-xs">
                        <strong>Speed Goal:</strong> Complete initial scan in 10-15 seconds maximum
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative p-5 bg-gradient-to-r from-emerald-500/10 to-transparent rounded-lg border border-border/30">
                    <div className="absolute top-3 left-3 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                    <div className="ml-12">
                      <h5 className="font-medium text-emerald-400 text-lg mb-2">UNDERSTAND - Deep Question Analysis</h5>
                      <p className="text-sm text-muted-foreground mb-3">
                        Extract all relevant information and understand exactly what answer format is required.
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <h6 className="text-xs font-medium text-emerald-400 mb-1">KEY INFORMATION EXTRACTION:</h6>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div>• Circuit details and specifications</div>
                            <div>• Installation type and environment</div>
                            <div>• Environmental conditions affecting installation</div>
                            <div>• Load characteristics and diversity factors</div>
                            <div>• Specific compliance requirements</div>
                          </div>
                        </div>
                        <div>
                          <h6 className="text-xs font-medium text-emerald-400 mb-1">CONTEXT ANALYSIS:</h6>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div>• Domestic (230V) vs commercial (400V) applications</div>
                            <div>• Special location requirements (bathrooms, etc.)</div>
                            <div>• Regulation parts that apply</div>
                            <div>• Safety category implications</div>
                            <div>• Testing requirements and procedures</div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 space-y-2">
                        <div className="p-2 bg-emerald-500/20 rounded text-xs">
                          <strong>Analysis Strategy:</strong> Highlight/underline circuit details, installation type, environmental conditions, load characteristics
                        </div>
                        <div className="p-2 bg-purple-500/20 rounded text-xs">
                          <strong>Context Mapping:</strong> Link question scenarios to real-world installation experience and BS7671 requirements
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative p-5 bg-gradient-to-r from-purple-500/10 to-transparent rounded-lg border border-border/30">
                    <div className="absolute top-3 left-3 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                    <div className="ml-12">
                      <h5 className="font-medium text-emerald-400 text-lg mb-2">PLAN - Solution Strategy Development</h5>
                      <p className="text-sm text-muted-foreground mb-3">
                        Determine your approach before looking at answer options to avoid being misled by distractors.
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <h6 className="text-xs font-medium text-emerald-400 mb-1">FOR CALCULATIONS:</h6>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div>• Identify required formulas (Ohm's law, power, etc.)</div>
                            <div>• List all known values and units</div>
                            <div>• Plan calculation sequence and steps</div>
                            <div>• Estimate expected answer range</div>
                            <div>• Consider correction factors needed</div>
                            <div>• Check for cable derating requirements</div>
                          </div>
                        </div>
                        <div>
                          <h6 className="text-xs font-medium text-emerald-400 mb-1">FOR REGULATIONS:</h6>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div>• Identify relevant BS7671 part and chapter</div>
                            <div>• Recall key regulation numbers</div>
                            <div>• Consider special installation conditions</div>
                            <div>• Think of exceptions and special cases</div>
                            <div>• Apply safety hierarchy principles</div>
                            <div>• Consider inspection and testing requirements</div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 p-2 bg-purple-500/20 rounded text-xs">
                        <strong>Strategy Success:</strong> Having a clear plan before viewing options increases accuracy by 35%
                      </div>
                    </div>
                  </div>

                  <div className="relative p-5 bg-gradient-to-r from-orange-500/10 to-transparent rounded-lg border border-border/30">
                    <div className="absolute top-3 left-3 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
                    <div className="ml-12">
                      <h5 className="font-medium text-emerald-400 text-lg mb-2">EXECUTE - Systematic Answer Selection</h5>
                      <p className="text-sm text-muted-foreground mb-3">
                        Work through your planned approach systematically, using proven elimination techniques effectively.
                      </p>
                      <div className="space-y-3">
                        <div className="p-3 bg-orange-500/20 rounded text-xs">
                          <strong>Multiple Choice Strategy:</strong> Read each option against your planned answer, eliminate obviously wrong options first, then choose best remaining option based on technical accuracy
                        </div>
                        <div className="p-3 bg-red-500/20 rounded text-xs">
                          <strong>Avoid Trap Answers:</strong> Watch for options that use correct terminology but in wrong context, contain one small error that makes them incorrect, or mix correct and incorrect information
                        </div>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div>
                            <h6 className="text-xs font-medium text-emerald-400 mb-1">ELIMINATION PRIORITIES:</h6>
                            <div className="space-y-1 text-xs text-muted-foreground">
                              <div>1. Safety violations or dangerous practices</div>
                              <div>2. Regulation non-compliance</div>
                              <div>3. Mathematically impossible values</div>
                              <div>4. Practically unfeasible solutions</div>
                            </div>
                          </div>
                          <div>
                            <h6 className="text-xs font-medium text-emerald-400 mb-1">SELECTION CRITERIA:</h6>
                            <div className="space-y-1 text-xs text-muted-foreground">
                              <div>• Most technically accurate option</div>
                              <div>• Best compliance with BS7671</div>
                              <div>• Safest installation practice</div>
                              <div>• Most practical implementation</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative p-5 bg-gradient-to-r from-red-500/10 to-transparent rounded-lg border border-border/30">
                    <div className="absolute top-3 left-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm">5</div>
                    <div className="ml-12">
                      <h5 className="font-medium text-emerald-400 text-lg mb-2">VERIFY - Comprehensive Answer Validation</h5>
                      <p className="text-sm text-muted-foreground mb-3">
                        Always double-check your answer makes complete sense in the context of the question and real-world application.
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <h6 className="text-xs font-medium text-emerald-400 mb-1">TECHNICAL VERIFICATION:</h6>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div>• Answer matches the question asked</div>
                            <div>• Calculation units are correct</div>
                            <div>• Magnitude is reasonable for application</div>
                            <div>• Complies with BS7671 requirements</div>
                            <div>• Passes common sense test</div>
                          </div>
                        </div>
                        <div>
                          <h6 className="text-xs font-medium text-emerald-400 mb-1">SAFETY VERIFICATION:</h6>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div>• Answer ensures safe installation</div>
                            <div>• Protects against electrical hazards</div>
                            <div>• Meets protection requirements</div>
                            <div>• Suitable for environment conditions</div>
                            <div>• Allows for proper maintenance access</div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 p-2 bg-red-500/20 rounded text-xs">
                        <strong>Final Check:</strong> If answer seems wrong, trust your analysis process and double-check steps 2-4
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-500/10 to-transparent p-4 rounded-lg border border-emerald-500/30">
                <h5 className="font-semibold text-emerald-400 mb-2">Pro Tip: BS7671 Reference Navigation for Question Analysis</h5>
                <p className="text-sm text-muted-foreground mb-3">
                  Efficient BS7671 navigation during question analysis can save 30-60 seconds per regulation question:
                </p>
                <div className="grid md:grid-cols-2 gap-3 text-xs text-muted-foreground">
                  <div><strong>Quick Finds:</strong> Use index for specific terms, use contents for general topics</div>
                  <div><strong>Part Structure:</strong> Parts 1-3 (fundamentals), Parts 4-6 (application), Part 7 (special)</div>
                  <div><strong>Appendix Strategy:</strong> Tables in Appendix 4 for calculations, Appendix 1 for definitions</div>
                  <div><strong>Cross-References:</strong> Follow regulation cross-references for complete requirements</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Practical Assessment Question Analysis */}
          <Card className="border-emerald-500/30 bg-card">
            <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-transparent">
              <CardTitle className="flex items-center gap-3 text-foreground">
                <CheckCircle className="h-6 w-6 text-emerald-400" />
                Practical Assessment Question Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <p className="text-muted-foreground">
                Practical assessments require comprehensive analysis of task briefs, understanding of marking criteria, 
                and strategic planning to demonstrate competency across all assessment areas effectively within time constraints.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                    <Users className="h-4 w-4 text-emerald-400" />
                    Task Briefing Analysis Framework
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-muted/50 rounded-lg border-l-4 border-emerald-500">
                      <div className="font-medium text-emerald-400 text-sm">Circuit Installation Requirements</div>
                      <div className="text-sm text-muted-foreground mb-2">Complete analysis of installation specifications</div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>• Circuit type analysis (ring final, radial, lighting configurations)</div>
                        <div>• Load requirement calculations and diversity factors</div>
                        <div>• Cable routing analysis and installation method selection</div>
                        <div>• Protection device specification and coordination</div>
                        <div>• Earthing and bonding system requirements</div>
                        <div>• Environmental condition impact assessment</div>
                      </div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg border-l-4 border-emerald-500">
                      <div className="font-medium text-emerald-400 text-sm">Testing Protocol Analysis</div>
                      <div className="text-sm text-muted-foreground mb-2">Required tests and acceptable value ranges</div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>• Continuity testing procedures and sequence</div>
                        <div>• Ring final circuit continuity verification methods</div>
                        <div>• Insulation resistance testing at multiple voltages</div>
                        <div>• Earth fault loop impedance measurement points</div>
                        <div>• RCD operation testing and timing verification</div>
                        <div>• Polarity and phase sequence confirmation</div>
                      </div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg border-l-4 border-green-500">
                      <div className="font-medium text-green-400 text-sm">Documentation Requirements</div>
                      <div className="text-sm text-muted-foreground mb-2">Certification and schedule completion standards</div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>• Electrical Installation Certificate completion</div>
                        <div>• Schedule of Test Results accuracy</div>
                        <div>• Circuit schedule information requirements</div>
                        <div>• Schedule of Inspections completion</div>
                        <div>• Risk assessment documentation</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-emerald-400" />
                    Marking Criteria Strategic Analysis
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Planning (15%):</strong> Circuit design accuracy, cable selection justification, protection sizing calculations</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Installation (35%):</strong> Workmanship quality, BS7671 compliance, safety practice demonstration</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Testing (25%):</strong> Correct procedures, accurate measurements, proper documentation</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Documentation (15%):</strong> Certificate completion, test result accuracy, schedule information</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Safety (10%):</strong> PPE usage, risk assessment, safe working practice demonstration</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-3">
                    <div className="p-3 bg-card rounded-lg border border-green-500/30">
                      <h5 className="font-semibold text-green-400 mb-2">Strategic Time Allocation Analysis</h5>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div>Hour 1-2: Planning analysis and initial installation setup</div>
                        <div>Hour 3-4: Main installation work and termination quality</div>
                        <div>Hour 5: Comprehensive testing and initial documentation</div>
                        <div>Hour 6: Final verification, documentation completion, presentation</div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-card rounded-lg border border-border/30">
                      <h5 className="font-semibold text-emerald-400 mb-2">Assessment Priority Matrix</h5>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div><strong>High Impact:</strong> Safety compliance, circuit functionality, test accuracy</div>
                        <div><strong>Medium Impact:</strong> Installation neatness, documentation completeness</div>
                        <div><strong>Low Impact:</strong> Cable dressing, minor presentation details</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500/10 to-transparent p-4 rounded-lg border border-border/30">
                <h5 className="font-semibold text-emerald-400 mb-2">Advanced Task Analysis Techniques</h5>
                <p className="text-sm text-muted-foreground mb-3">
                  Professional analysis methods for complex practical assessment scenarios:
                </p>
                <div className="grid md:grid-cols-2 gap-3 text-xs text-muted-foreground">
                  <div><strong>Scenario Mapping:</strong> Link task requirements to real commercial installations</div>
                  <div><strong>Risk Prioritisation:</strong> Identify highest safety risk areas requiring extra attention</div>
                  <div><strong>Resource Planning:</strong> Analyse tool and material requirements for efficient workflow</div>
                  <div><strong>Quality Checkpoints:</strong> Plan verification points throughout installation process</div>
                  <div><strong>Contingency Analysis:</strong> Prepare alternative approaches for common problems</div>
                  <div><strong>Assessment Optimisation:</strong> Balance speed with quality for maximum marks</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Analysis Techniques & Emergency Strategies */}
          <Card className="border-emerald-500/30 bg-card">
            <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-transparent">
              <CardTitle className="flex items-center gap-3 text-foreground">
                <AlertTriangle className="h-6 w-6 text-emerald-400" />
                Advanced Analysis Techniques & Emergency Strategies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Complex Scenario Analysis Methods</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Scenario decomposition:</strong> Break complex scenarios into manageable component parts</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Priority analysis:</strong> Identify primary vs. secondary safety and compliance considerations</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Interconnection mapping:</strong> Look for interconnected requirements affecting multiple regulations</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Stakeholder perspective:</strong> Consider all stakeholder viewpoints (installer, user, inspector)</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Lifecycle analysis:</strong> Consider installation, operation, maintenance, and modification phases</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Environmental impact:</strong> Analyse how environmental factors affect all requirements</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Pattern Recognition & Intuition Development</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Question pattern library:</strong> Build mental database of recurring question structures</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Trap pattern recognition:</strong> Identify common misleading answer option types</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Solution template application:</strong> Apply familiar solution approaches to similar problems</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Elimination sequence optimisation:</strong> Use most effective elimination order for question type</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Intuitive validation:</strong> Trust trained electrical intuition for reasonableness checks</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Meta-analysis skills:</strong> Analyse your own analysis process for continuous improvement</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-r from-red-500/10 to-transparent p-4 rounded-lg border border-border/30">
                  <h5 className="font-semibold text-emerald-400 mb-2">Emergency Analysis Protocol - When Stuck or Short on Time</h5>
                  <p className="text-sm text-muted-foreground mb-3">
                    When you're stuck or running out of time, follow this systematic emergency decision-making process:
                  </p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <h6 className="text-xs font-medium text-emerald-400 mb-1">IMMEDIATE ACTIONS (10 seconds):</h6>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div>Step 1: Re-read question stem only (ignore options temporarily)</div>
                        <div>Step 2: Apply basic electrical safety principles first</div>
                        <div>Step 3: Use common sense and practical installation experience</div>
                      </div>
                    </div>
                    <div>
                      <h6 className="text-xs font-medium text-emerald-400 mb-1">DECISION CRITERIA (20 seconds):</h6>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div>Step 4: Choose most conservative/safest available option</div>
                        <div>Step 5: Eliminate any options violating basic regulations</div>
                        <div>Step 6: Select option with most specific technical detail</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-500/10 to-transparent p-4 rounded-lg border border-border/30">
                  <h5 className="font-semibold text-emerald-400 mb-2">Regulatory Compliance Quick Analysis</h5>
                  <p className="text-sm text-muted-foreground mb-3">
                    Fast compliance checking for pressure situations:
                  </p>
                  <div className="grid md:grid-cols-3 gap-3 text-xs text-muted-foreground">
                    <div><strong>Safety First:</strong> Does option ensure personal safety and prevent danger?</div>
                    <div><strong>BS7671 Compliance:</strong> Does option meet fundamental regulation requirements?</div>
                    <div><strong>Practical Feasibility:</strong> Can option be realistically implemented on site?</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500/10 to-transparent p-4 rounded-lg border border-green-500/30">
                  <h5 className="font-semibold text-green-400 mb-2">Advanced Integration Strategies</h5>
                  <p className="text-sm text-muted-foreground mb-3">
                    Professional-level analysis techniques for complex multi-factor questions:
                  </p>
                  <div className="space-y-2">
                    <div className="p-2 bg-green-500/20 rounded text-xs">
                      <strong>Holistic Analysis:</strong> Consider installation as complete system - cables, protection, earthing, testing all interconnected
                    </div>
                    <div className="p-2 bg-emerald-500/20 rounded text-xs">
                      <strong>Risk-Based Prioritisation:</strong> Weight analysis towards highest electrical safety risks first
                    </div>
                    <div className="p-2 bg-purple-500/20 rounded text-xs">
                      <strong>Future-Proof Thinking:</strong> Consider maintenance access, modification potential, system expandability
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Level2Module8Section2Section2;