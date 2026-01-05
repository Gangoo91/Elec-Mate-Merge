import { Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle, TrendingDown, RefreshCw, Target, Brain, Clock, Zap, CheckCircle, XCircle, ArrowUp, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useSEO from "@/hooks/useSEO";

const Level2Module8Section2Section4 = () => {
  useSEO(
    "Common Pitfalls & Solutions - Level 2 Electrical Installation Exams",
    "Avoid common exam mistakes with proven solutions and recovery strategies. Expert guidance on knowledge gaps, time management errors, technical pitfalls, and success mindset for Level 2 electrical installation examinations."
  );

  return (
    <div className="min-h-screen bg-background p-3 sm:p-4 lg:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <Link 
            to=".." 
            className="inline-flex items-center text-muted-foreground hover:text-emerald-400 transition-colors text-sm sm:text-base touch-target"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Back to How to Pass Exams</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>
        
        {/* Hero Section */}
        <div className="text-center mb-4 sm:mb-6 p-3 sm:p-4 lg:p-6 bg-gradient-to-r from-card to-muted rounded-lg border border-emerald-500/30">
          <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500/20 rounded-full mb-2 sm:mb-3">
            <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 sm:mb-3 leading-tight">
            Common Pitfalls & Solutions
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-sm sm:text-base px-2">
            Learn from the most common exam mistakes and master the proven solutions to avoid them. 
            Turn potential failures into opportunities for success with expert recovery strategies.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-card border border-emerald-500/30 rounded-lg p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-emerald-400 mb-1">78%</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Of failures are avoidable</div>
          </div>
          <div className="bg-card border border-emerald-500/30 rounded-lg p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-emerald-400 mb-1">5 mins</div>
            <div className="text-xs sm:text-sm text-muted-foreground">To recover from mistakes</div>
          </div>
          <div className="bg-card border border-emerald-500/30 rounded-lg p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-emerald-400 mb-1">92%</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Success with preparation</div>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {/* Critical Exam Pitfalls */}
          <Card className="border-emerald-500/30 bg-card">
            <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-transparent p-4 sm:p-6">
              <CardTitle className="flex items-center gap-3 text-foreground text-lg sm:text-xl">
                <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400 flex-shrink-0" />
                Critical Exam Pitfalls
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                The most common mistakes that cost candidates marks, with proven prevention strategies.
              </p>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              
              {/* Answer Transfer & Recording Errors */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-foreground border-b border-emerald-500/30 pb-2">
                  Answer Transfer & Recording Errors
                </h3>
                
                <div className="grid gap-3 sm:gap-4">
                  <div className="p-3 sm:p-4 bg-card border border-border/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-emerald-400 text-sm sm:text-base mb-1">Answer transfer errors</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-2">Wrong answer selected despite correct calculation</p>
                        <div className="text-xs text-muted-foreground bg-card p-2 rounded border-l-2 border-red-400">
                          <strong>Prevention:</strong> Always double-check final answer matches your calculation before moving on
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 sm:p-4 bg-card border border-border/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-emerald-400 text-sm sm:text-base mb-1">Question numbering mistakes</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-2">Answering wrong question number</p>
                        <div className="text-xs text-muted-foreground bg-card p-2 rounded border-l-2 border-red-400">
                          <strong>Prevention:</strong> Mark question numbers clearly on answer sheet and check alignment regularly
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 sm:p-4 bg-card border border-border/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-emerald-400 text-sm sm:text-base mb-1">Changed answer confusion</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-2">Multiple erasures causing illegible responses</p>
                        <div className="text-xs text-muted-foreground bg-card p-2 rounded border-l-2 border-red-400">
                          <strong>Prevention:</strong> Think before writing; if changing, erase completely and rewrite clearly
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calculation & Unit Errors */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-foreground border-b border-emerald-500/30 pb-2">
                  Calculation & Unit Errors
                </h3>
                
                <div className="grid gap-3 sm:gap-4">
                  <div className="p-3 sm:p-4 bg-card border border-border/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-emerald-400 text-sm sm:text-base mb-1">Unit specification errors</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-2">Correct number but wrong units (A vs mA, V vs kV)</p>
                        <div className="text-xs text-muted-foreground bg-card p-2 rounded border-l-2 border-orange-400">
                          <strong>Prevention:</strong> Always write units next to your final answer and double-check question requirements
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 sm:p-4 bg-card border border-border/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-emerald-400 text-sm sm:text-base mb-1">Incomplete workings</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-2">No partial marks when final answer wrong</p>
                        <div className="text-xs text-muted-foreground bg-card p-2 rounded border-l-2 border-orange-400">
                          <strong>Prevention:</strong> Always show your working steps clearly - you can get marks even if final answer is wrong
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reading & Comprehension Errors */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-foreground border-b border-emerald-500/30 pb-2">
                  Reading & Comprehension Errors
                </h3>
                
                <div className="grid gap-3 sm:gap-4">
                  <div className="p-3 sm:p-4 bg-card border border-border/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-emerald-400 text-sm sm:text-base mb-1">Misreading question requirements</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-2">Answering what you think vs what's asked</p>
                        <div className="text-xs text-muted-foreground bg-card p-2 rounded border-l-2 border-purple-400">
                          <strong>Prevention:</strong> Read question twice, underline key words, ensure your answer matches exactly what's asked
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Recovery Protocol */}
              <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-transparent border border-green-500/30 rounded-lg">
                <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Emergency Recovery Protocol
                </h4>
                <div className="text-sm text-muted-foreground space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <strong className="text-green-400">When you realise a mistake:</strong>
                      <ul className="text-xs mt-1 space-y-1 pl-4">
                        <li>• Don't panic - stay calm</li>
                        <li>• Check if you have time to fix it</li>
                        <li>• Prioritise high-mark questions</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-green-400">Final 10 minutes:</strong>
                      <ul className="text-xs mt-1 space-y-1 pl-4">
                        <li>• Review answer sheet alignment</li>
                        <li>• Check units on all answers</li>
                        <li>• Ensure all questions attempted</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Time Management Pitfalls */}
          <Card className="border-emerald-500/30 bg-card">
            <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-transparent p-3 sm:p-6">
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-foreground text-lg sm:text-xl">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
                Time Management Pitfalls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 p-3 sm:p-6">
              <div>
                <h4 className="font-semibold mb-3 sm:mb-4 text-foreground text-base sm:text-lg">The Most Dangerous Time Traps</h4>
                <div className="space-y-3 sm:space-y-4">
                  <div className="relative p-3 sm:p-4 lg:p-5 bg-gradient-to-r from-red-500/10 to-transparent rounded-lg border border-border/30">
                    <div className="flex sm:block">
                      <div className="flex-shrink-0 w-8 h-8 sm:absolute sm:top-3 sm:left-3 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3 sm:mr-0">1</div>
                      <div className="flex-1 sm:ml-12">
                        <h5 className="font-medium text-emerald-400 text-base sm:text-lg mb-2">Perfectionism Paralysis</h5>
                        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                          Spending too long on single questions trying to achieve 100% certainty rather than moving forward.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div className="mb-4 sm:mb-0">
                            <h6 className="text-sm font-medium text-emerald-400 mb-2">WARNING SIGNS:</h6>
                            <div className="space-y-1.5 text-sm text-muted-foreground">
                              <div>• Spending over 4 minutes on single question</div>
                              <div>• Re-reading same regulation multiple times</div>
                              <div>• Checking calculations more than twice</div>
                              <div>• Second-guessing obvious answers</div>
                              <div>• Feeling "not certain enough" to proceed</div>
                            </div>
                          </div>
                          <div>
                            <h6 className="text-sm font-medium text-green-400 mb-2">RECOVERY ACTIONS:</h6>
                            <div className="space-y-1.5 text-sm text-muted-foreground">
                              <div>• Set 3-minute maximum per question alarm</div>
                              <div>• Flag question and move on at time limit</div>
                              <div>• Accept 80% certainty as "good enough"</div>
                              <div>• Trust your initial answer if it feels right</div>
                              <div>• Return to flagged questions only if time permits</div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 p-2 bg-orange-500/20 rounded text-xs">
                          <strong>Reality Check:</strong> You need 60% to pass - perfectionism costs marks on other questions
                        </div>
                       </div>
                     </div>
                   </div>
                  
                  <div className="relative p-5 bg-gradient-to-r from-orange-500/10 to-transparent rounded-lg border border-border/30">
                    <div className="absolute top-3 left-3 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                    <div className="ml-12">
                      <h5 className="font-medium text-emerald-400 text-lg mb-2">The "Panic Rush" Response</h5>
                      <p className="text-sm text-muted-foreground mb-3">
                        Realising time is short and then rushing through questions, making careless errors.
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <h6 className="text-xs font-medium text-emerald-400 mb-1">PANIC TRIGGERS:</h6>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div>• Looking at clock and seeing less time than expected</div>
                            <div>• Seeing other candidates finishing early</div>
                            <div>• Reaching halfway point with less than half time left</div>
                            <div>• Encountering difficult questions in sequence</div>
                            <div>• Calculator/system technical problems</div>
                          </div>
                        </div>
                        <div>
                          <h6 className="text-xs font-medium text-emerald-400 mb-1">PANIC PREVENTION:</h6>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div>• Check time every 15 questions (not more often)</div>
                            <div>• Never look at other candidates' progress</div>
                            <div>• Have predetermined "emergency time plan"</div>
                            <div>• Practice breathing reset technique</div>
                            <div>• Remember: quality over speed always wins</div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 space-y-2">
                        <div className="p-2 bg-orange-500/20 rounded text-xs">
                          <strong>Emergency Protocol:</strong> If panicking, stop for 30 seconds, breathe deeply, then continue
                        </div>
                        <div className="p-2 bg-emerald-500/20 rounded text-xs">
                          <strong>Time Crisis Plan:</strong> Answer all remaining questions with educated guesses, then review
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative p-5 bg-gradient-to-r from-purple-500/10 to-transparent rounded-lg border border-border/30">
                    <div className="absolute top-3 left-3 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                    <div className="ml-12">
                      <h5 className="font-medium text-emerald-400 text-lg mb-2">Poor Question Sequencing Strategy</h5>
                      <p className="text-sm text-muted-foreground mb-3">
                        Attempting questions in poor order, getting stuck on difficult questions early, leaving easy marks until last.
                      </p>
                      <div className="space-y-3">
                        <div className="p-3 bg-purple-500/20 rounded-lg">
                          <h6 className="font-medium text-emerald-400 text-sm mb-2">Optimal Sequencing Strategy</h6>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div><strong>Pass 1 (45 mins):</strong> All questions you can answer immediately</div>
                            <div><strong>Pass 2 (45 mins):</strong> Questions requiring calculations or BS7671 lookup</div>
                            <div><strong>Pass 3 (20 mins):</strong> Difficult questions and review all answers</div>
                            <div><strong>Final 10 mins:</strong> Ensure no blanks, make educated guesses</div>
                          </div>
                        </div>
                        <div className="p-3 bg-red-500/20 rounded-lg">
                          <h6 className="font-medium text-emerald-400 text-sm mb-2">Common Sequencing Mistakes</h6>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div>• Starting with question 1 regardless of difficulty</div>
                            <div>• Getting stuck on early difficult questions</div>
                            <div>• Leaving easy questions for when tired</div>
                            <div>• Not flagging questions for return</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500/10 to-transparent p-4 rounded-lg border border-green-500/30">
                <h5 className="font-semibold text-green-400 mb-2">Time Management Recovery Techniques</h5>
                <p className="text-sm text-muted-foreground mb-3">
                  When time management goes wrong, these techniques can salvage your performance:
                </p>
                <div className="grid md:grid-cols-2 gap-3 text-xs text-muted-foreground">
                  <div>
                    <h6 className="font-medium text-green-400 mb-1">IMMEDIATE ACTIONS:</h6>
                    <div className="space-y-1">
                      <div>• Assess remaining time vs remaining questions</div>
                      <div>• Switch to rapid-fire mode for easy questions</div>
                      <div>• Skip complex calculations temporarily</div>
                      <div>• Ensure every question has an answer</div>
                    </div>
                  </div>
                  <div>
                    <h6 className="font-medium text-green-400 mb-1">STRATEGIC ADJUSTMENTS:</h6>
                    <div className="space-y-1">
                      <div>• Reduce checking time to single review</div>
                      <div>• Use elimination on multiple choice</div>
                      <div>• Apply common-sense electrical knowledge</div>
                      <div>• Trust first instincts more than usual</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical and Practical Pitfalls */}
          <Card className="border-emerald-500/30 bg-card">
            <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-transparent">
              <CardTitle className="flex items-center gap-3 text-foreground">
                <Zap className="h-6 w-6 text-emerald-400" />
                Technical and Practical Pitfalls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-emerald-400" />
                    Equipment & System Failures
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-muted/50 rounded-lg border-l-4 border-red-500">
                      <div className="font-medium text-emerald-400 text-sm">PITFALL: Calculator Dependency</div>
                      <div className="text-xs text-muted-foreground mt-2 space-y-1">
                        <div>• Total reliance on calculator for simple calculations</div>
                        <div>• Panic when calculator fails or battery dies</div>
                        <div>• No backup calculation methods</div>
                        <div>• Unable to estimate reasonable answers</div>
                      </div>
                      <div className="mt-2 p-2 bg-green-500/20 rounded border border-green-500/30">
                        <div className="font-medium text-green-400 text-xs mb-1">SOLUTION:</div>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <div>• Always bring backup calculator</div>
                          <div>• Practice mental arithmetic for common calculations</div>
                          <div>• Learn estimation techniques (power of 10)</div>
                          <div>• Know basic formulas by heart</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-muted/50 rounded-lg border-l-4 border-orange-500">
                      <div className="font-medium text-emerald-400 text-sm">PITFALL: BS7671 Navigation Confusion</div>
                      <div className="text-xs text-muted-foreground mt-2 space-y-1">
                        <div>• Poor indexing/tabbing system</div>
                        <div>• Confusing similar section numbers</div>
                        <div>• Unable to find regulations quickly</div>
                        <div>• Getting lost in cross-references</div>
                      </div>
                      <div className="mt-2 p-2 bg-green-500/20 rounded border border-green-500/30">
                        <div className="font-medium text-green-400 text-xs mb-1">SOLUTION:</div>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <div>• Create consistent colour-coded tab system</div>
                          <div>• Practice finding regulations under time pressure</div>
                          <div>• Memorise key regulation number patterns</div>
                          <div>• Use index first, then navigate to section</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-muted/50 rounded-lg border-l-4 border-purple-500">
                      <div className="font-medium text-emerald-400 text-sm">PITFALL: Digital System Unfamiliarity</div>
                      <div className="text-xs text-muted-foreground mt-2 space-y-1">
                        <div>• Unfamiliar with computer-based testing interface</div>
                        <div>• Difficulty navigating between questions</div>
                        <div>• Problems with on-screen calculator</div>
                        <div>• Not knowing how to flag/review questions</div>
                      </div>
                      <div className="mt-2 p-2 bg-green-500/20 rounded border border-green-500/30">
                        <div className="font-medium text-green-400 text-xs mb-1">SOLUTION:</div>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <div>• Request practice session if available</div>
                          <div>• Arrive early to familiarise with system</div>
                          <div>• Ask invigilator about interface features</div>
                          <div>• Use scratch paper for backup calculations</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                    <TrendingDown className="h-4 w-4 text-emerald-400" />
                    Documentation & Answer Recording Errors
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                      <div className="text-sm">
                        <span className="font-medium text-emerald-400">Answer transfer errors:</span>
                        <span className="text-muted-foreground"> Wrong answer selected despite correct calculation</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                      <div className="text-sm">
                        <span className="font-medium text-emerald-400">Misreading question requirements:</span>
                        <span className="text-muted-foreground"> Answering what you think vs what's asked</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                      <div className="text-sm">
                        <span className="font-medium text-emerald-400">Unit specification errors:</span>
                        <span className="text-muted-foreground"> Correct number but wrong units (A vs mA)</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                      <div className="text-sm">
                        <span className="font-medium text-emerald-400">Incomplete workings:</span>
                        <span className="text-muted-foreground"> No partial marks when final answer wrong</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                      <div className="text-sm">
                        <span className="font-medium text-emerald-400">Question numbering mistakes:</span>
                        <span className="text-muted-foreground"> Answering wrong question number</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                      <div className="text-sm">
                        <span className="font-medium text-emerald-400">Changed answer confusion:</span>
                        <span className="text-muted-foreground"> Multiple erasures causing illegible responses</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-card rounded-lg border border-border/30">
                    <h5 className="font-semibold text-emerald-400 mb-2">Quality Control Checklist</h5>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>✓ Read question completely before calculating</div>
                      <div>✓ Underline what's being asked for</div>
                      <div>✓ Check answer format requirements</div>
                      <div>✓ Verify units match question requirements</div>
                      <div>✓ Show clear working for calculations</div>
                      <div>✓ Double-check answer transfer accuracy</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-card rounded-lg border border-border/30">
                    <h5 className="font-semibold text-emerald-400 mb-2">Answer Confidence Indicators</h5>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div><strong>HIGH:</strong> Immediate recognition, clear calculation path</div>
                      <div><strong>MEDIUM:</strong> Need to check BS7671 or recalculate</div>
                      <div><strong>LOW:</strong> Guessing between 2-3 options</div>
                      <div><strong>FLAG:</strong> Complete uncertainty - return if time permits</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-500/10 to-transparent p-4 rounded-lg border border-emerald-500/30">
                <h5 className="font-semibold text-emerald-400 mb-2">Pro Tip: The "Double-Check Without Doubt" Method</h5>
                <p className="text-sm text-muted-foreground mb-3">
                  For calculations: If you can't immediately see where an error might be, your answer is probably correct. Don't over-check.
                </p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div><strong>First check:</strong> Order of magnitude (is 250A reasonable for a lighting circuit?)</div>
                  <div><strong>Second check:</strong> Units consistency (all values in same units?)</div>
                  <div><strong>Third check:</strong> Common sense electrical knowledge</div>
                  <div><strong>Stop there:</strong> Additional checking rarely finds real errors</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recovery Strategies & Damage Control */}
          <Card className="border-emerald-500/30 bg-card">
            <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-transparent">
              <CardTitle className="flex items-center gap-3 text-foreground">
                <RefreshCw className="h-6 w-6 text-emerald-400" />
                Recovery Strategies & Damage Control
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div>
                <h4 className="font-semibold mb-4 text-foreground text-lg">When Things Go Wrong: Professional Recovery</h4>
                <div className="space-y-4">
                  <div className="relative p-5 bg-gradient-to-r from-green-500/10 to-transparent rounded-lg border border-green-500/30">
                    <div className="absolute top-3 left-3 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">✓</div>
                    <div className="ml-12">
                      <h5 className="font-medium text-green-400 text-lg mb-2">Immediate Damage Assessment</h5>
                      <p className="text-sm text-muted-foreground mb-3">
                        Quick evaluation to determine the best recovery strategy without panic.
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <h6 className="text-xs font-medium text-green-400 mb-1">ASSESS TIME SITUATION:</h6>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div>• How much time remains vs questions left?</div>
                            <div>• Which questions can be answered quickly?</div>
                            <div>• What's the minimum needed for pass mark?</div>
                            <div>• Are there easy marks being missed?</div>
                          </div>
                        </div>
                        <div>
                          <h6 className="text-xs font-medium text-green-400 mb-1">ASSESS KNOWLEDGE GAPS:</h6>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div>• Which topics are causing problems?</div>
                            <div>• Can elimination still work for difficult questions?</div>
                            <div>• What practical knowledge can substitute?</div>
                            <div>• Which BS7671 sections need quick review?</div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 p-2 bg-green-500/20 rounded text-xs">
                        <strong>Recovery Rule:</strong> Spend 2 minutes assessing, then 100% focus on recovery action
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative p-5 bg-gradient-to-r from-emerald-500/10 to-transparent rounded-lg border border-border/30">
                    <div className="absolute top-3 left-3 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm">⚡</div>
                    <div className="ml-12">
                      <h5 className="font-medium text-emerald-400 text-lg mb-2">Strategic Question Triage</h5>
                      <p className="text-sm text-muted-foreground mb-3">
                        Categorise remaining questions to maximise marks in available time.
                      </p>
                      <div className="space-y-3">
                        <div className="p-3 bg-emerald-500/20 rounded-lg">
                          <h6 className="font-medium text-emerald-400 text-sm mb-2">Priority 1: Quick Win Questions (15-30 seconds each)</h6>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div>• Basic safety regulations you know well</div>
                            <div>• Simple multiple choice with obvious wrong answers</div>
                            <div>• Standard values (cable colours, voltage levels)</div>
                            <div>• Questions where you can eliminate 2+ options immediately</div>
                          </div>
                        </div>
                        <div className="p-3 bg-emerald-500/20 rounded-lg">
                          <h6 className="font-medium text-emerald-400 text-sm mb-2">Priority 2: Medium Effort Questions (1-2 minutes each)</h6>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div>• Simple calculations with given formulas</div>
                            <div>• BS7671 lookups with known section numbers</div>
                            <div>• Practical experience questions</div>
                            <div>• Questions needing only one calculation step</div>
                          </div>
                        </div>
                        <div className="p-3 bg-emerald-500/20 rounded-lg">
                          <h6 className="font-medium text-emerald-400 text-sm mb-2">Priority 3: Complex Questions (educated guesses)</h6>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div>• Multi-step calculations</div>
                            <div>• Unfamiliar BS7671 regulation searches</div>
                            <div>• Questions requiring multiple table lookups</div>
                            <div>• Scenario-based problems with multiple factors</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative p-5 bg-gradient-to-r from-purple-500/10 to-transparent rounded-lg border border-border/30">
                    <div className="absolute top-3 left-3 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">🎯</div>
                    <div className="ml-12">
                      <h5 className="font-medium text-emerald-400 text-lg mb-2">Advanced Guessing Strategies</h5>
                      <p className="text-sm text-muted-foreground mb-3">
                        When you must guess, use logical elimination and electrical principles.
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <h6 className="text-xs font-medium text-emerald-400 mb-1">ELIMINATION HIERARCHY:</h6>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div>• Remove obviously unsafe options</div>
                            <div>• Eliminate answers violating basic electrical laws</div>
                            <div>• Remove options with incorrect units/magnitudes</div>
                            <div>• Choose most conservative/safe remaining option</div>
                          </div>
                        </div>
                        <div>
                          <h6 className="text-xs font-medium text-emerald-400 mb-1">COMMON SENSE CHECKS:</h6>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div>• Does answer match real-world experience?</div>
                            <div>• Is it consistent with BS7671 safety principles?</div>
                            <div>• Would this work in actual installation?</div>
                            <div>• Is it the most practical option?</div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 space-y-2">
                        <div className="p-2 bg-purple-500/20 rounded text-xs">
                          <strong>Statistical Tip:</strong> In C&G exams, "C" is often correct when guessing randomly
                        </div>
                        <div className="p-2 bg-purple-500/20 rounded text-xs">
                          <strong>Safety Principle:</strong> When in doubt, choose the safer, more conservative option
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative p-5 bg-gradient-to-r from-orange-500/10 to-transparent rounded-lg border border-border/30">
                    <div className="absolute top-3 left-3 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">🔄</div>
                    <div className="ml-12">
                      <h5 className="font-medium text-emerald-400 text-lg mb-2">Psychological Recovery Techniques</h5>
                      <p className="text-sm text-muted-foreground mb-3">
                        Maintain confidence and focus when the exam isn't going to plan.
                      </p>
                      <div className="space-y-3">
                        <div className="p-3 bg-orange-500/20 rounded-lg">
                          <h6 className="font-medium text-emerald-400 text-sm mb-2">Mindset Reset Protocol</h6>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div><strong>Step 1:</strong> Accept that perfect performance isn't required</div>
                            <div><strong>Step 2:</strong> Focus on getting 60% right, not 100%</div>
                            <div><strong>Step 3:</strong> Remember your training and practical experience</div>
                            <div><strong>Step 4:</strong> Use remaining time efficiently, not desperately</div>
                            <div><strong>Step 5:</strong> Trust that partial knowledge often leads to correct answers</div>
                          </div>
                        </div>
                        <div className="p-3 bg-orange-500/20 rounded-lg">
                          <h6 className="font-medium text-emerald-400 text-sm mb-2">Success Mantras for Crisis Moments</h6>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div>"I know more than I think I know"</div>
                            <div>"Partial credit is better than no credit"</div>
                            <div>"My practical experience guides my answers"</div>
                            <div>"Every educated guess has a 25% chance minimum"</div>
                            <div>"I can succeed even without perfect performance"</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500/10 to-transparent p-4 rounded-lg border border-green-500/30">
                <h5 className="font-semibold text-green-400 mb-2">Final Recovery Strategy: The 60% Rule</h5>
                <p className="text-sm text-muted-foreground mb-3">
                  You only need 36 correct answers out of 60 to pass. This means you can get 24 questions wrong and still succeed.
                </p>
                <div className="grid md:grid-cols-2 gap-3 text-xs text-muted-foreground">
                  <div>
                    <h6 className="font-medium text-green-400 mb-1">CONFIDENCE BUILDERS:</h6>
                    <div className="space-y-1">
                      <div>• You likely know 40+ questions with confidence</div>
                      <div>• Educated guesses on 10-15 questions probable</div>
                      <div>• Random guesses still have 25% success rate</div>
                      <div>• Your training covers all exam topics</div>
                    </div>
                  </div>
                  <div>
                    <h6 className="font-medium text-green-400 mb-1">FINAL ACTIONS:</h6>
                    <div className="space-y-1">
                      <div>• Ensure no questions left blank</div>
                      <div>• Quick review of flagged questions</div>
                      <div>• Trust your initial instincts</div>
                      <div>• Submit with confidence in your preparation</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Mistake Prevention Strategies */}
          <Card className="border-emerald-500/30 bg-card">
            <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-transparent">
              <CardTitle className="flex items-center gap-3 text-foreground">
                <Shield className="h-6 w-6 text-emerald-400" />
                Advanced Mistake Prevention Strategies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div>
                <h4 className="font-semibold mb-4 text-foreground text-lg">Systematic Error Prevention Protocols</h4>
                <div className="space-y-4">
                  <div className="relative p-5 bg-gradient-to-r from-emerald-500/10 to-transparent rounded-lg border border-border/30">
                    <div className="absolute top-3 left-3 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                    <div className="ml-12">
                      <h5 className="font-medium text-emerald-400 text-lg mb-2">The CRISP Method for Question Analysis</h5>
                      <p className="text-sm text-muted-foreground mb-3">
                        A systematic approach to prevent misreading and misunderstanding questions.
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <h6 className="text-xs font-medium text-emerald-400 mb-1">C - CAPTURE the question:</h6>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div>• Read the entire question twice before starting</div>
                            <div>• Identify the question type (calculation, regulation, practical)</div>
                            <div>• Note any diagrams or additional information</div>
                            <div>• Circle or underline key instruction words</div>
                          </div>
                        </div>
                        <div>
                          <h6 className="text-xs font-medium text-emerald-400 mb-1">R - RECOGNISE what's asked:</h6>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div>• What specific value or information is required?</div>
                            <div>• What units should the answer be in?</div>
                            <div>• Are there multiple parts to the question?</div>
                            <div>• Is this asking for a specific regulation reference?</div>
                          </div>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-3 mt-3">
                        <div>
                          <h6 className="text-xs font-medium text-emerald-400 mb-1">I - IDENTIFY given information:</h6>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div>• List all numerical values and units</div>
                            <div>• Note any conditions or constraints</div>
                            <div>• Identify installation method or environment</div>
                            <div>• Check for any assumptions stated</div>
                          </div>
                        </div>
                        <div>
                          <h6 className="text-xs font-medium text-emerald-400 mb-1">S - SELECT appropriate method:</h6>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div>• Choose correct formula or regulation</div>
                            <div>• Determine calculation sequence</div>
                            <div>• Select appropriate BS7671 section</div>
                            <div>• Plan the solution approach</div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <h6 className="text-xs font-medium text-emerald-400 mb-1">P - PERFORM and verify:</h6>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <div>• Execute the planned solution method</div>
                          <div>• Check units throughout calculation</div>
                          <div>• Verify answer magnitude makes sense</div>
                          <div>• Ensure answer format matches question requirements</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative p-5 bg-gradient-to-r from-green-500/10 to-transparent rounded-lg border border-green-500/30">
                    <div className="absolute top-3 left-3 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                    <div className="ml-12">
                      <h5 className="font-medium text-green-400 text-lg mb-2">Pattern Recognition for Common Question Types</h5>
                      <p className="text-sm text-muted-foreground mb-3">
                        Learn to quickly identify question patterns to avoid time-consuming mistakes.
                      </p>
                      <div className="space-y-3">
                        <div className="p-3 bg-green-500/20 rounded-lg">
                          <h6 className="font-medium text-green-400 text-sm mb-2">Cable Sizing Questions - Red Flags</h6>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div>• Watch for: Grouping factors, installation method, ambient temperature</div>
                            <div>• Common trap: Using tabulated value without correction factors</div>
                            <div>• Solution: Always check Appendix 4 correction factors</div>
                            <div>• Verification: Final rating must exceed design current</div>
                          </div>
                        </div>
                        <div className="p-3 bg-green-500/20 rounded-lg">
                          <h6 className="font-medium text-green-400 text-sm mb-2">Voltage Drop Questions - Red Flags</h6>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div>• Watch for: Circuit length, load diversity, cable type</div>
                            <div>• Common trap: Using wrong mV/A/m value from tables</div>
                            <div>• Solution: Match exact cable size and installation method</div>
                            <div>• Verification: Voltage drop must be &lt;5% for lighting, &lt;7% for power</div>
                          </div>
                        </div>
                        <div className="p-3 bg-green-500/20 rounded-lg">
                          <h6 className="font-medium text-green-400 text-sm mb-2">Earth Fault Loop Questions - Red Flags</h6>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div>• Watch for: System type (TN-S, TN-C-S, TT), circuit length</div>
                            <div>• Common trap: Using wrong impedance values or measurement points</div>
                            <div>• Solution: Calculate external + internal impedances separately</div>
                            <div>• Verification: Check against maximum Zs values in BS7671</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative p-5 bg-gradient-to-r from-purple-500/10 to-transparent rounded-lg border border-border/30">
                    <div className="absolute top-3 left-3 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                    <div className="ml-12">
                      <h5 className="font-medium text-emerald-400 text-lg mb-2">Cross-Checking and Validation Techniques</h5>
                      <p className="text-sm text-muted-foreground mb-3">
                        Multiple methods to verify answers and catch errors before submission.
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <h6 className="text-xs font-medium text-emerald-400 mb-1">NUMERICAL VALIDATION:</h6>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div>• Order of magnitude check (is 2.5kA reasonable?)</div>
                            <div>• Unit analysis (do the units cancel correctly?)</div>
                            <div>• Ratio checking (larger cable = lower resistance)</div>
                            <div>• Boundary testing (minimum/maximum values)</div>
                          </div>
                        </div>
                        <div>
                          <h6 className="text-xs font-medium text-emerald-400 mb-1">REGULATION VALIDATION:</h6>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div>• Does the regulation number exist?</div>
                            <div>• Is it the current edition (18th Edition)?</div>
                            <div>• Does the regulation content match the question?</div>
                            <div>• Are there any exemptions or special conditions?</div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 p-2 bg-purple-500/20 rounded text-xs">
                        <strong>Double-Check Priority List:</strong> 1) Units and decimal places, 2) Formula application, 3) Table values, 4) Final answer format
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Psychological Resilience & Mindset */}
          <Card className="border-emerald-500/30 bg-card">
            <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-transparent">
              <CardTitle className="flex items-center gap-3 text-foreground">
                <Target className="h-6 w-6 text-emerald-400" />
                Psychological Resilience & Success Mindset
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                    <Brain className="h-4 w-4 text-emerald-400" />
                    Cognitive Bias Prevention
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-muted/50 rounded-lg border-l-4 border-red-500">
                      <div className="font-medium text-emerald-400 text-sm">PITFALL: Confirmation Bias</div>
                      <div className="text-xs text-muted-foreground mt-2 space-y-1">
                        <div>• Seeing what you expect to see in answers</div>
                        <div>• Forcing calculations to match preconceived results</div>
                        <div>• Dismissing correct answers that seem unexpected</div>
                        <div>• Interpreting ambiguous information favourably</div>
                      </div>
                      <div className="mt-2 p-2 bg-green-500/20 rounded border border-green-500/30">
                        <div className="font-medium text-green-400 text-xs mb-1">SOLUTION:</div>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <div>• Approach each question with fresh perspective</div>
                          <div>• Question your initial assumptions</div>
                          <div>• Consider why unexpected answers might be correct</div>
                          <div>• Use systematic methods regardless of expectations</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-muted/50 rounded-lg border-l-4 border-orange-500">
                      <div className="font-medium text-emerald-400 text-sm">PITFALL: Anchoring Effect</div>
                      <div className="text-xs text-muted-foreground mt-2 space-y-1">
                        <div>• Over-relying on first piece of information seen</div>
                        <div>• Basing all subsequent decisions on initial value</div>
                        <div>• Difficulty adjusting from initial estimate</div>
                        <div>• Missing alternative interpretation paths</div>
                      </div>
                      <div className="mt-2 p-2 bg-green-500/20 rounded border border-green-500/30">
                        <div className="font-medium text-green-400 text-xs mb-1">SOLUTION:</div>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <div>• Read entire question before forming opinions</div>
                          <div>• Consider multiple solution approaches</div>
                          <div>• Challenge your initial interpretations</div>
                          <div>• Use independent verification methods</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-muted/50 rounded-lg border-l-4 border-purple-500">
                      <div className="font-medium text-emerald-400 text-sm">PITFALL: Overconfidence Effect</div>
                      <div className="text-xs text-muted-foreground mt-2 space-y-1">
                        <div>• Rushing through "easy" questions</div>
                        <div>• Skipping verification steps for familiar problems</div>
                        <div>• Underestimating time needed for complex questions</div>
                        <div>• Ignoring warning signs of errors</div>
                      </div>
                      <div className="mt-2 p-2 bg-green-500/20 rounded border border-green-500/30">
                        <div className="font-medium text-green-400 text-xs mb-1">SOLUTION:</div>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <div>• Maintain consistent checking procedures</div>
                          <div>• Allocate appropriate time for all questions</div>
                          <div>• Question "obvious" answers</div>
                          <div>• Stay humble about your knowledge</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                    <ArrowUp className="h-4 w-4 text-emerald-400" />
                    Resilience Building Techniques
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                      <div className="text-sm">
                        <span className="font-medium text-emerald-400">Growth mindset:</span>
                        <span className="text-muted-foreground"> View challenges as learning opportunities</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                      <div className="text-sm">
                        <span className="font-medium text-emerald-400">Error normalisation:</span>
                        <span className="text-muted-foreground"> Accept that mistakes are part of learning</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                      <div className="text-sm">
                        <span className="font-medium text-emerald-400">Adaptive thinking:</span>
                        <span className="text-muted-foreground"> Adjust strategies based on circumstances</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                      <div className="text-sm">
                        <span className="font-medium text-emerald-400">Self-compassion:</span>
                        <span className="text-muted-foreground"> Treat yourself with kindness during difficulties</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                      <div className="text-sm">
                        <span className="font-medium text-emerald-400">Focus control:</span>
                        <span className="text-muted-foreground"> Direct attention to what you can influence</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                      <div className="text-sm">
                        <span className="font-medium text-emerald-400">Stress inoculation:</span>
                        <span className="text-muted-foreground"> Practice under progressively challenging conditions</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-3">
                    <div className="p-3 bg-card rounded-lg border border-border/30">
                      <h5 className="font-semibold text-emerald-400 mb-2">The Champion's Mindset</h5>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div><strong>Before exam:</strong> "I am prepared and capable"</div>
                        <div><strong>During difficulties:</strong> "This is where I show my training"</div>
                        <div><strong>When uncertain:</strong> "I'll use my best judgement"</div>
                        <div><strong>Near end:</strong> "I've given my best effort"</div>
                        <div><strong>After submission:</strong> "I've done everything I could"</div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-card rounded-lg border border-green-500/30">
                      <h5 className="font-semibold text-green-400 mb-2">Pressure Management Protocol</h5>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>• Recognise pressure as normal and manageable</div>
                        <div>• Use pressure as energy for enhanced performance</div>
                        <div>• Maintain perspective: one exam doesn't define you</div>
                        <div>• Trust your preparation and training</div>
                        <div>• Focus on process, not just outcomes</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-500/10 to-transparent p-4 rounded-lg border border-emerald-500/30">
                <h5 className="font-semibold text-emerald-400 mb-2">Pro Tip: The "Good Enough" Principle</h5>
                <p className="text-sm text-muted-foreground mb-3">
                  Perfectionism is the enemy of progress. In exams, "good enough" answers that are submitted are infinitely better than perfect answers that run out of time.
                </p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div><strong>80% certainty:</strong> Move forward confidently - this is sufficient for most questions</div>
                  <div><strong>60% certainty:</strong> Make your best choice and flag for review if time allows</div>
                  <div><strong>Below 60%:</strong> Use elimination techniques and educated guessing</div>
                  <div><strong>Remember:</strong> Partial marks are better than blank answers</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Level2Module8Section2Section4;