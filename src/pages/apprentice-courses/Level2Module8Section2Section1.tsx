import { Link } from "react-router-dom";
import { ArrowLeft, Clock, Target, CheckCircle, AlertTriangle, BookOpen, Timer, Zap, Users, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useSEO from "@/hooks/useSEO";

const Level2Module8Section2Section1 = () => {
  useSEO(
    "Time Management Mastery - Level 2 Electrical Installation Exams",
    "Master essential time management strategies for Level 2 electrical installation exams. Learn proven techniques for written and practical assessments, question analysis, and optimal time allocation methods."
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
            <Clock className="h-6 w-6 text-emerald-400" />
          </div>
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3">
            Time Management Mastery
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
            Master the essential time management strategies that separate successful candidates from the rest. 
            These proven techniques will help you excel in both written and practical electrical installation examinations.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-emerald-500/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400 mb-1">2 mins</div>
            <div className="text-sm text-muted-foreground">Average per question</div>
          </div>
          <div className="bg-card border border-emerald-500/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400 mb-1">85%</div>
            <div className="text-sm text-muted-foreground">Pass rate with good timing</div>
          </div>
          <div className="bg-card border border-emerald-500/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400 mb-1">15 mins</div>
            <div className="text-sm text-muted-foreground">Reserve for final review</div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Pre-Exam Planning */}
          <Card className="border-emerald-500/30 bg-card">
            <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-transparent">
              <CardTitle className="flex items-center gap-3 text-foreground">
                <BookOpen className="h-6 w-6 text-emerald-400" />
                Pre-Exam Planning Strategy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                    <Zap className="h-4 w-4 text-emerald-400" />
                    Know Your Exam Format Inside Out
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-muted/50 rounded-lg border-l-4 border-emerald-500">
                      <div className="font-medium text-emerald-400 text-sm">Written Exam (C&G 2365-02)</div>
                      <div className="text-sm text-muted-foreground mb-2">2 hours • 60 questions • 2 minutes per question</div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>• Multiple choice format with 4 options per question</div>
                        <div>• Covers all units: Health & Safety, Electrical Science, Installation Technology</div>
                        <div>• Pass mark: 60% (36 correct answers minimum)</div>
                        <div>• Open book exam - BS7671 allowed and essential</div>
                        <div>• No negative marking - wrong answers don't lose points</div>
                      </div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg border-l-4 border-emerald-500">
                      <div className="font-medium text-emerald-400 text-sm">Practical Assessment (C&G 2365-03)</div>
                      <div className="text-sm text-muted-foreground mb-2">5-6 hours • Multiple tasks • Skill demonstration</div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>• Circuit installation (ring final, radial, lighting circuits)</div>
                        <div>• Testing and inspection procedures</div>
                        <div>• Fault finding and diagnosis</div>
                        <div>• Documentation and certification completion</div>
                        <div>• Safe working practices demonstration</div>
                        <div>• Typically worth 100 marks total - need 60+ to pass</div>
                      </div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg border-l-4 border-emerald-500">
                      <div className="font-medium text-emerald-400 text-sm">Online Exam Environment</div>
                      <div className="text-sm text-muted-foreground mb-2">Timer on screen • Instant feedback • No going back</div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>• Questions appear one at a time in some formats</div>
                        <div>• Can't return to previous questions once submitted</div>
                        <div>• Timer counts down visibly - use this advantage</div>
                        <div>• Technical issues can be reported immediately</div>
                        <div>• Scratch paper usually provided for calculations</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                    <Target className="h-4 w-4 text-emerald-400" />
                    Advanced Time Allocation Strategies
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>90 seconds rule:</strong> Start with this target, adjust based on question complexity</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>15-20 minute buffer:</strong> Essential for review and panic prevention</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>3-minute maximum:</strong> Absolute ceiling - move on regardless of progress</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Flag system:</strong> Mark difficult questions with symbols (?, *, !) for prioritised return</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Never blank rule:</strong> Even wild guesses have 25% success rate in multiple choice</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Checkpoint system:</strong> Review progress every 15 questions (every 30 minutes)</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-card rounded-lg border border-border/30">
                    <h5 className="font-semibold text-emerald-400 mb-2">Time Allocation Calculator</h5>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>Question 1-15: 22.5 minutes (1.5 min each - easy wins)</div>
                      <div>Question 16-30: 30 minutes (2 min each - moderate difficulty)</div>
                      <div>Question 31-45: 37.5 minutes (2.5 min each - complex calculations)</div>
                      <div>Question 46-60: 30 minutes (2 min each - final push + review time)</div>
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
                <h5 className="font-semibold text-green-400 mb-2">Question Pattern Recognition</h5>
                <p className="text-sm text-muted-foreground mb-3">
                  C&G exams follow predictable patterns. Learning these can save precious seconds:
                </p>
                <div className="text-xs text-muted-foreground space-y-2">
                  <div><strong>Safety Questions (15-20%):</strong> Usually have obvious correct answers - answer quickly</div>
                  <div><strong>Calculation Questions (20-25%):</strong> Often involve Ohm's law, power formulas, or cable sizing</div>
                  <div><strong>BS7671 Regulation Questions (30-35%):</strong> Direct references to specific regulation numbers</div>
                  <div><strong>Practical Application (20-25%):</strong> Scenario-based questions requiring experience</div>
                  <div><strong>Installation Methods (10-15%):</strong> Cable routes, protection methods, earthing systems</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Written Exam Strategies */}
          <Card className="border-emerald-500/30 bg-card">
            <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-transparent">
              <CardTitle className="flex items-center gap-3 text-foreground">
                <Timer className="h-6 w-6 text-emerald-400" />
                Written Exam Time Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div>
                <h4 className="font-semibold mb-4 text-foreground text-lg">The Proven 3-Pass Strategy</h4>
                <div className="space-y-4">
                    <div className="relative p-5 bg-gradient-to-r from-green-500/10 to-transparent rounded-lg border border-green-500/30">
                    <div className="absolute top-3 left-3 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                    <div className="ml-12">
                      <h5 className="font-medium text-green-400 text-lg mb-2">Pass 1: Quick Wins (45-50 minutes)</h5>
                      <p className="text-sm text-muted-foreground mb-3">
                        Answer all questions you know immediately. This builds confidence and secures easy marks.
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <h6 className="text-xs font-medium text-green-400 mb-1">TARGET QUESTIONS:</h6>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div>• Basic safety regulations (Part 1 BS7671)</div>
                            <div>• Simple Ohm's law calculations</div>
                            <div>• Standard cable colour codes</div>
                            <div>• Basic earthing arrangements</div>
                            <div>• PPE requirements</div>
                            <div>• Standard circuit protection devices</div>
                          </div>
                        </div>
                        <div>
                          <h6 className="text-xs font-medium text-emerald-400 mb-1">SKIP FOR NOW:</h6>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div>• Complex cable calculations</div>
                            <div>• Voltage drop scenarios</div>
                            <div>• Discrimination calculations</div>
                            <div>• Detailed fault current analysis</div>
                            <div>• Complex installation methods</div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 p-2 bg-green-500/20 rounded text-xs">
                        <strong>Goal:</strong> Complete 35-40 questions in this pass, maintaining 85%+ accuracy
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative p-5 bg-gradient-to-r from-orange-500/10 to-transparent rounded-lg border border-border/30">
                    <div className="absolute top-3 left-3 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                    <div className="ml-12">
                      <h5 className="font-medium text-emerald-400 text-lg mb-2">Pass 2: Calculated Answers (45-50 minutes)</h5>
                      <p className="text-sm text-muted-foreground mb-3">
                        Return to skipped questions requiring calculations and BS7671 references.
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <h6 className="text-xs font-medium text-emerald-400 mb-1">CALCULATION PRIORITIES:</h6>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div>• Cable current-carrying capacity (Appendix 4)</div>
                            <div>• Voltage drop calculations (Appendix 4)</div>
                            <div>• Circuit protection coordination</div>
                            <div>• Earth fault loop impedance</div>
                            <div>• Power and energy calculations</div>
                          </div>
                        </div>
                        <div>
                          <h6 className="text-xs font-medium text-emerald-400 mb-1">BS7671 QUICK FINDS:</h6>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div>• Part 4: Protection for safety</div>
                            <div>• Part 5: Selection & erection</div>
                            <div>• Part 6: Inspection & testing</div>
                            <div>• Appendices: Tables & schedules</div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 space-y-2">
                        <div className="p-2 bg-orange-500/20 rounded text-xs">
                          <strong>Time Management:</strong> Allocate maximum 4 minutes per calculation question
                        </div>
                        <div className="p-2 bg-emerald-500/20 rounded text-xs">
                          <strong>Calculator Tip:</strong> Use memory functions for repeated values (cable factors, etc.)
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative p-5 bg-gradient-to-r from-emerald-500/10 to-transparent rounded-lg border border-border/30">
                    <div className="absolute top-3 left-3 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                    <div className="ml-12">
                      <h5 className="font-medium text-emerald-400 text-lg mb-2">Pass 3: Review & Strategic Guessing (15-20 minutes)</h5>
                      <p className="text-sm text-muted-foreground mb-3">
                        Review all answers, ensure no blanks, make educated guesses using elimination.
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <h6 className="text-xs font-medium text-emerald-400 mb-1">REVIEW CHECKLIST:</h6>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div>• Check for mathematical errors</div>
                            <div>• Verify units in calculations (mm², A, V, Ω)</div>
                            <div>• Look for reversed safety logic</div>
                            <div>• Check cable size recommendations</div>
                            <div>• Verify regulation references</div>
                          </div>
                        </div>
                        <div>
                          <h6 className="text-xs font-medium text-emerald-400 mb-1">GUESSING STRATEGY:</h6>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div>• Eliminate obviously dangerous options</div>
                            <div>• Choose compliant BS7671 answers</div>
                            <div>• Select conservative safety margins</div>
                            <div>• Trust your first elimination instinct</div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 p-2 bg-emerald-500/20 rounded text-xs">
                        <strong>Final Check:</strong> Ensure every question is answered - blank answers guarantee 0 marks
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Question Analysis Timing Breakdown</h4>
                  <div className="space-y-2">
                    {[
                      { task: "Read question carefully", time: "15-20 sec", color: "bg-emerald-500" },
                      { task: "Identify key requirements", time: "10-15 sec", color: "bg-green-500" },
                      { task: "Locate BS7671 reference", time: "30-45 sec", color: "bg-orange-500" },
                      { task: "Calculate/determine answer", time: "45-60 sec", color: "bg-red-500" },
                      { task: "Select and confirm", time: "10-15 sec", color: "bg-purple-500" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 bg-muted/30 rounded">
                        <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                        <span className="text-sm flex-1">{item.task}</span>
                        <span className="text-xs font-medium text-emerald-400">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Common Time Wasters to Avoid</h4>
                  <div className="space-y-2">
                    {[
                      "Re-reading questions multiple times",
                      "Second-guessing correct answers",
                      "Perfectionist calculations",
                      "Getting stuck on one difficult question",
                      "Changing answers without good reason"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 bg-card rounded border border-red-500/20">
                        <AlertTriangle className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Practical Assessment Timing */}
          <Card className="border-emerald-500/30 bg-card">
            <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-transparent">
              <CardTitle className="flex items-center gap-3 text-foreground">
                <Target className="h-6 w-6 text-emerald-400" />
                Practical Assessment Time Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h4 className="font-semibold mb-4 text-foreground">Advanced Task Prioritisation Matrix</h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-gradient-to-r from-green-500/10 to-transparent rounded-lg border border-green-500/30">
                      <h5 className="font-medium text-green-400 mb-2">Tier 1: Critical Foundation Tasks</h5>
                      <p className="text-sm text-muted-foreground mb-2">High marks, essential for progression - complete first</p>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>• <strong>Consumer unit installation:</strong> 15-20 marks typically</div>
                        <div>• <strong>Main earthing connections:</strong> 10-15 marks + safety critical</div>
                        <div>• <strong>Basic circuit wiring:</strong> Core competency demonstration</div>
                        <div>• <strong>Cable selection & sizing:</strong> Shows technical knowledge</div>
                      </div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-transparent rounded-lg border border-border/30">
                      <h5 className="font-medium text-emerald-400 mb-2">Tier 2: Major Circuit Work</h5>
                      <p className="text-sm text-muted-foreground mb-2">Substantial marks but time-intensive</p>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>• <strong>Ring final circuit:</strong> 20-25 marks, needs careful testing</div>
                        <div>• <strong>Radial circuits:</strong> 15-20 marks, simpler but still crucial</div>
                        <div>• <strong>Lighting circuits:</strong> 15-20 marks, multiple connection points</div>
                        <div>• <strong>Cooker circuit:</strong> 15-20 marks, higher current rating</div>
                      </div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-orange-500/10 to-transparent rounded-lg border border-border/30">
                      <h5 className="font-medium text-emerald-400 mb-2">Tier 3: Testing & Verification</h5>
                      <p className="text-sm text-muted-foreground mb-2">Essential but can be done efficiently</p>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>• <strong>Dead testing sequence:</strong> 10-15 marks, methodical approach</div>
                        <div>• <strong>Live testing procedures:</strong> 10-15 marks, safety critical</div>
                        <div>• <strong>Earth fault loop impedance:</strong> 5-10 marks per circuit</div>
                        <div>• <strong>RCD testing:</strong> 5-10 marks, multiple test requirements</div>
                      </div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-purple-500/10 to-transparent rounded-lg border border-border/30">
                      <h5 className="font-medium text-emerald-400 mb-2">Tier 4: Documentation & Finishing</h5>
                      <p className="text-sm text-muted-foreground mb-2">Important for completion but lower individual marks</p>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>• <strong>Electrical Installation Certificate:</strong> 5-10 marks</div>
                        <div>• <strong>Schedule of test results:</strong> 5-10 marks</div>
                        <div>• <strong>Cable labelling:</strong> 2-5 marks, easy wins</div>
                        <div>• <strong>Final presentation:</strong> 2-5 marks, professional finish</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-foreground">Detailed 6-Hour Assessment Breakdown</h4>
                  <div className="space-y-3">
                    {[
                      { 
                        task: "Initial planning & risk assessment", 
                        time: "15 mins", 
                        percentage: "4%", 
                        color: "bg-purple-500",
                        details: "Read brief, plan approach, identify hazards, set up tools"
                      },
                      { 
                        task: "Consumer unit & main connections", 
                        time: "45 mins", 
                        percentage: "12%", 
                        color: "bg-red-500",
                        details: "Mount CU, main earthing, main switch, initial RCD connections"
                      },
                      { 
                        task: "Circuit cable installation", 
                        time: "2.5 hrs", 
                        percentage: "42%", 
                        color: "bg-emerald-500",
                        details: "Ring final, radials, lighting - routing, fixing, terminations"
                      },
                      { 
                        task: "First fix completions", 
                        time: "30 mins", 
                        percentage: "8%", 
                        color: "bg-green-500",
                        details: "Switch drops, socket outlets, light fittings positioning"
                      },
                      { 
                        task: "Testing sequence (dead)", 
                        time: "45 mins", 
                        percentage: "12%", 
                        color: "bg-emerald-500",
                        details: "Continuity, polarity, insulation resistance tests"
                      },
                      { 
                        task: "Testing sequence (live)", 
                        time: "45 mins", 
                        percentage: "12%", 
                        color: "bg-orange-500",
                        details: "Earth fault loop, RCD, functional testing"
                      },
                      { 
                        task: "Documentation & completion", 
                        time: "30 mins", 
                        percentage: "8%", 
                        color: "bg-pink-500",
                        details: "Certificates, schedules, final checks, clean up"
                      },
                      { 
                        task: "Buffer time", 
                        time: "15 mins", 
                        percentage: "4%", 
                        color: "bg-gray-500",
                        details: "Contingency for overruns, final review"
                      }
                    ].map((item, index) => (
                      <div key={index} className="relative">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{item.task}</span>
                          <span className="text-xs text-emerald-400 font-bold">{item.time}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-3 mb-1">
                          <div className={`h-3 ${item.color} rounded-full`} style={{width: item.percentage}}></div>
                        </div>
                        <div className="text-xs text-muted-foreground mb-2">{item.details}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-500/10 to-transparent p-4 rounded-lg border border-emerald-500/30">
                <h5 className="font-semibold text-emerald-400 mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Time Boxing Technique
                </h5>
                <p className="text-sm text-muted-foreground mb-3">
                  Allocate specific time slots to each task. Set timers and stick to them. If running over, 
                  move on and return if time permits. This prevents one task from consuming your entire assessment time.
                </p>
                <div className="text-xs text-muted-foreground">
                  Example: "I will spend exactly 45 minutes on the ring final circuit installation, then move to testing regardless of completion status."
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Strategies */}
          <Card className="border-red-500/20 bg-gradient-to-br from-red-500/5 to-card">
            <CardHeader className="bg-gradient-to-r from-red-500/10 to-transparent">
              <CardTitle className="flex items-center gap-3 text-foreground">
                <AlertTriangle className="h-6 w-6 text-emerald-400" />
                Emergency Time Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Crisis Management Protocols</h4>
                  <div className="space-y-3">
                    {[
                      { 
                        priority: "IMMEDIATE", 
                        action: "Switch to triage mode - abandon perfectionism", 
                        color: "border-red-500 bg-card",
                        detail: "Focus only on tasks that will definitely gain marks. Stop any cosmetic work immediately."
                      },
                      { 
                        priority: "CRITICAL", 
                        action: "Complete highest-value incomplete tasks", 
                        color: "border-red-400 bg-red-400/10",
                        detail: "Prioritise ring final circuit completion over multiple radial circuits if marks are similar."
                      },
                      { 
                        priority: "HIGH", 
                        action: "Ensure safety-critical elements are complete", 
                        color: "border-orange-500 bg-card",
                        detail: "Earth connections, RCD functionality, and basic protective devices must work."
                      },
                      { 
                        priority: "MEDIUM", 
                        action: "Complete minimum viable testing sequence", 
                        color: "border-emerald-500 bg-emerald-500/10",
                        detail: "Dead tests first (continuity, polarity), then essential live tests (earth loop)."
                      },
                      { 
                        priority: "LOW", 
                        action: "Fill documentation with available results", 
                        color: "border-green-500 bg-card",
                        detail: "Partial certificates with 'N/A' entries score higher than blank forms."
                      }
                    ].map((item, index) => (
                      <div key={index} className={`p-3 rounded-lg border ${item.color} mb-3`}>
                        <div className="font-medium text-xs mb-1">{item.priority} PRIORITY</div>
                        <div className="text-sm font-medium mb-1">{item.action}</div>
                        <div className="text-xs text-muted-foreground">{item.detail}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 p-3 bg-card rounded-lg border border-border/30">
                    <h5 className="font-semibold text-emerald-400 mb-2">Last 30 Minutes Protocol</h5>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• Stop all new installation work</div>
                      <div>• Complete basic testing on installed circuits</div>
                      <div>• Fill out certificates with available data</div>
                      <div>• Ensure all connections are secure</div>
                      <div>• Take photos of completed work (if allowed)</div>
                      <div>• Clean workspace and secure tools</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Advanced BS7671 Navigation</h4>
                  <p className="text-sm text-muted-foreground mb-3">Master these shortcuts for lightning-fast regulation access:</p>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-card rounded-lg border border-border/30">
                      <h5 className="font-medium text-emerald-400 mb-2">Essential Bookmark Tabs</h5>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div><strong>Red Tab:</strong> Appendix 4 (Current-carrying capacity)</div>
                        <div><strong>Orange Tab:</strong> Section 433 (Overload protection)</div>
                        <div><strong>Yellow Tab:</strong> Section 411 (Protective measures)</div>
                        <div><strong>Green Tab:</strong> Part 6 (Inspection & testing)</div>
                        <div><strong>Blue Tab:</strong> Appendix 15 (Ring circuit tests)</div>
                        <div><strong>Purple Tab:</strong> Index (Quick reference finder)</div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-card rounded-lg border border-green-500/30">
                      <h5 className="font-medium text-green-400 mb-2">Speed Reference Tables</h5>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span>Standard cable sizes:</span>
                          <span className="text-emerald-400">1.5, 2.5, 4, 6, 10mm²</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Ring final protection:</span>
                          <span className="text-emerald-400">30A or 32A MCB/RCBO</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Socket radial 20A:</span>
                          <span className="text-emerald-400">2.5mm² cable maximum</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Lighting circuits:</span>
                          <span className="text-emerald-400">1.5mm² / 6A or 10A MCB</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cooker circuits:</span>
                          <span className="text-emerald-400">6mm² minimum / 32A+</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-card rounded-lg border border-border/30">
                      <h5 className="font-medium text-emerald-400 mb-2">Quick Calculation Formulas</h5>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div><strong>Voltage drop:</strong> (mV/A/m × Ib × L) ÷ 1000</div>
                        <div><strong>Earth fault loop:</strong> Zs = Ze + R1 + R2</div>
                        <div><strong>Ring final R1+R2:</strong> (R1+R2)/4 at midpoint</div>
                        <div><strong>Cable grouping:</strong> Apply derating factors from Table 4C</div>
                        <div><strong>Discrimination:</strong> Upstream device ≥ 2 × downstream</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Practice Techniques */}
          <Card className="border-emerald-500/30 bg-card">
            <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-transparent">
              <CardTitle className="flex items-center gap-3 text-foreground">
                <TrendingUp className="h-6 w-6 text-emerald-400" />
                Advanced Practice Techniques
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Mock Exam Mastery</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <h5 className="font-medium text-emerald-400 mb-2">Progressive Training Method</h5>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div>Week 1: Untimed practice (focus on accuracy)</div>
                        <div>Week 2: 2.5 hour limit (more time than real exam)</div>
                        <div>Week 3: 2 hour limit (exact exam time)</div>
                        <div>Week 4: 1.5 hour challenge (pressure training)</div>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Time yourself strictly during practice</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Simulate exact exam conditions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Track time per question to identify weaknesses</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Practice the 3-pass strategy until automatic</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Speed Reading BS7671</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-card rounded-lg border border-border/30">
                      <h5 className="font-medium text-emerald-400 mb-2">Structure Mastery</h5>
                      <div className="text-sm text-muted-foreground">
                        Learn the logical flow: Parts → Chapters → Sections → Regulations
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-emerald-400" />
                        <span>Use index efficiently - practice finding regulations in under 30 seconds</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-emerald-400" />
                        <span>Memorise key table locations (Appendix 4, etc.)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-emerald-400" />
                        <span>Use colour-coded tabs for frequent sections</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-emerald-400" />
                        <span>Practice scanning techniques for keywords</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-foreground">Mental Preparation & Exam Day Strategy</h4>
                <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                  <div className="p-4 bg-gradient-to-br from-green-500/10 to-transparent rounded-lg border border-green-500/30">
                    <h5 className="font-medium text-green-400 mb-2 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Before Exam
                    </h5>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>• Arrive 15-20 minutes early</div>
                      <div>• Bring reliable backup watch</div>
                      <div>• Review time allocation plan</div>
                      <div>• Do light warm-up questions</div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-lg border border-border/30">
                    <h5 className="font-medium text-emerald-400 mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      During Exam
                    </h5>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>• Check time every 15 questions</div>
                      <div>• Practice deep breathing if stressed</div>
                      <div>• Trust your preparation</div>
                      <div>• Stay hydrated and alert</div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-br from-purple-500/10 to-transparent rounded-lg border border-border/30">
                    <h5 className="font-medium text-emerald-400 mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Mindset
                    </h5>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>• Progress over perfection</div>
                      <div>• Partial marks count</div>
                      <div>• Every question matters</div>
                      <div>• Stay positive throughout</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Reminders */}
          <Card className="bg-gradient-to-br from-emerald-500/10 to-card border-emerald-500/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-emerald-400 text-center justify-center">
                <Clock className="h-6 w-6" />
                Essential Time Management Reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h4 className="font-semibold text-green-400 mb-3 text-center">✓ DO THESE</h4>
                  <div className="space-y-2">
                    {[
                      "Start with questions you know confidently",
                      "Keep one eye on the clock at all times",
                      "Move on quickly if stuck for too long",
                      "Use elimination techniques systematically",
                      "Review your work if time permits",
                      "Answer every single question"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 bg-card rounded border border-green-500/20">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-emerald-400 mb-3 text-center">✗ AVOID THESE</h4>
                  <div className="space-y-2">
                    {[
                      "Spending more than 3 minutes on one question",
                      "Leaving any answers completely blank",
                      "Panicking when running behind schedule",
                      "Changing answers without solid reasoning",
                      "Forgetting to check your work",
                      "Perfectionist tendencies under pressure"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 bg-card rounded border border-red-500/20">
                        <AlertTriangle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-emerald-500/20 to-transparent rounded-lg border border-emerald-500/50 text-center">
                <p className="font-medium text-emerald-400 mb-2">Remember: Time management is a skill that improves with practice</p>
                <p className="text-sm text-muted-foreground">
                  The difference between a pass and fail often comes down to effective time allocation, 
                  not just knowledge. Master these techniques and you'll significantly improve your chances of success.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Level2Module8Section2Section1;